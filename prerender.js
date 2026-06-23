// Pós-build: injeta o HTML pré-renderizado das páginas estáticas em dist/.
//   1. Home  → dist/index.html
//   2. Blog  → dist/blog/index.html + dist/blog/<slug>/index.html (1 por post)
// Roda após o build do cliente e o build SSR (ver script "build").
//
// Os posts vêm dos subsídios publicados (caderno_subsidios) no Supabase, lidos
// no momento do build. Sem credencial ou sem posts, o blog sai só com o índice
// vazio — o build NUNCA quebra por causa do blog.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { mapResumo, mapPost } from './src/blog/transform.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = (p) => path.resolve(__dirname, 'dist', p)

const { render, renderBlog } = await import('./dist-server/entry-server.js')

// ─── Helpers ────────────────────────────────────────────────────────────────

const escAttr = (s) =>
  String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

// Lê VITE_SUPABASE_* do ambiente; em build local, completa a partir do .env.local.
function carregarEnvSupabase() {
  let url = process.env.VITE_SUPABASE_URL
  let key = process.env.VITE_SUPABASE_ANON_KEY
  if (url && key) return { url, key }
  try {
    const envFile = fs.readFileSync(path.resolve(__dirname, '.env.local'), 'utf-8')
    for (const linha of envFile.split('\n')) {
      const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
      if (!m) continue
      const valor = m[2].replace(/^["']|["']$/g, '')
      if (m[1] === 'VITE_SUPABASE_URL' && !url) url = valor
      if (m[1] === 'VITE_SUPABASE_ANON_KEY' && !key) key = valor
    }
  } catch {
    /* sem .env.local — segue sem (CI/Vercel usa env de verdade) */
  }
  return { url, key }
}

async function buscarPostsPublicados() {
  const { url, key } = carregarEnvSupabase()
  if (!url || !key) {
    console.warn('prerender: VITE_SUPABASE_* ausente — blog sai sem posts.')
    return []
  }
  try {
    const r = await fetch(
      `${url}/rest/v1/caderno_subsidios?select=blog_slug,blog,updated_at&status=eq.publicado&blog_slug=not.is.null&order=updated_at.desc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    )
    if (!r.ok) {
      console.warn('prerender: fetch subsídios falhou (' + r.status + ') — blog sem posts.')
      return []
    }
    const rows = await r.json()
    return Array.isArray(rows) ? rows.filter((x) => x.blog_slug) : []
  } catch (e) {
    console.warn('prerender: erro ao buscar subsídios — blog sem posts:', e?.message)
    return []
  }
}

// Monta um HTML de blog a partir do template dist/blog.html: injeta o SSR, os
// dados pra hidratação e as meta tags de SEO.
function montarPaginaBlog(template, { ssr, dados, title, description, canonical, ogType }) {
  const dataJson = JSON.stringify(dados).replace(/</g, '\\u003c')
  const seo = [
    `<link rel="canonical" href="${escAttr(canonical)}" />`,
    `<meta property="og:type" content="${ogType}" />`,
    `<meta property="og:url" content="${escAttr(canonical)}" />`,
    `<meta property="og:title" content="${escAttr(title)}" />`,
    `<meta property="og:description" content="${escAttr(description)}" />`,
    `<meta property="og:image" content="https://inspirar.app/og-imagem-2.png" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ')

  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escAttr(title)}</title>`)
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escAttr(description)}" />`,
  )
  html = html.replace('<!--SEO-->', seo)
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${ssr}</div>\n    <script>window.__BLOG__=${dataJson}</script>`,
  )
  return html
}

function escrever(arquivo, conteudo) {
  fs.mkdirSync(path.dirname(arquivo), { recursive: true })
  fs.writeFileSync(arquivo, conteudo)
}

// ─── 1. Home ──────────────────────────────────────────────────────────────

const indexPath = dist('index.html')
const indexTemplate = fs.readFileSync(indexPath, 'utf-8')
const marcador = '<div id="root"></div>'
if (!indexTemplate.includes(marcador)) {
  throw new Error('prerender: marcador <div id="root"></div> não encontrado em dist/index.html')
}
const homeHtml = render()
fs.writeFileSync(indexPath, indexTemplate.replace(marcador, `<div id="root">${homeHtml}</div>`))
console.log('prerender: home injetada (' + homeHtml.length + ' chars)')

// ─── 2. Blog ────────────────────────────────────────────────────────────────

const blogTemplatePath = dist('blog.html')
if (!fs.existsSync(blogTemplatePath)) {
  console.warn('prerender: dist/blog.html ausente — pulei o blog.')
} else {
  const blogTemplate = fs.readFileSync(blogTemplatePath, 'utf-8')
  const rows = await buscarPostsPublicados()
  const resumos = rows.map(mapResumo)

  // Índice (paginado): página 1 em /blog, demais em /blog/pagina/N.
  const PAGINA_TAM = 12
  const totalPaginas = Math.max(1, Math.ceil(resumos.length / PAGINA_TAM))
  for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
    const fatia = resumos.slice((pagina - 1) * PAGINA_TAM, pagina * PAGINA_TAM)
    const dados = { tipo: 'index', posts: fatia, pagina, totalPaginas }
    const canonical =
      pagina === 1 ? 'https://inspirar.app/blog' : `https://inspirar.app/blog/pagina/${pagina}`
    const arquivo = pagina === 1 ? 'blog/index.html' : `blog/pagina/${pagina}/index.html`
    escrever(
      dist(arquivo),
      montarPaginaBlog(blogTemplate, {
        ssr: renderBlog(dados),
        dados,
        title: pagina === 1 ? 'Blog — inspirar.app' : `Blog (página ${pagina}) — inspirar.app`,
        description:
          'Subsídios pra sua reflexão: textos curtos que ajudam você a responder, com o coração, as perguntas do seu tempo com Deus.',
        canonical,
        ogType: 'website',
      }),
    )
  }

  // Posts
  for (const row of rows) {
    const post = mapPost(row)
    const ssr = renderBlog({ tipo: 'post', post })
    escrever(
      dist(`blog/${post.slug}/index.html`),
      montarPaginaBlog(blogTemplate, {
        ssr,
        dados: { tipo: 'post', post },
        title: `${post.titulo} — inspirar.app`,
        description: post.meta || post.titulo,
        canonical: `https://inspirar.app/blog/${post.slug}`,
        ogType: 'article',
      }),
    )
  }

  // Remove o template raiz pra não duplicar /blog.html com /blog/.
  fs.rmSync(blogTemplatePath, { force: true })
  console.log(`prerender: blog gerado — índice + ${rows.length} post(s).`)
}

// ─── Limpeza ────────────────────────────────────────────────────────────────

fs.rmSync(path.resolve(__dirname, 'dist-server'), { recursive: true, force: true })
