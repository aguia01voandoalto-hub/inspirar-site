import { markdownToHtml } from './markdown.js'
import { imagemParaSlug } from './imagens.js'

// Compartilhado entre o prerender (Node) e o fallback do cliente (browser).
// A linha vem de caderno_subsidios: { blog_slug, blog, updated_at }. O versículo
// é gravado no próprio payload (blog.versiculo / blog.versiculo_ref) na geração
// — o blog é auto-suficiente e não depende de ler a tabela de conteúdo (que a
// RLS anon não expõe por completo).

export function formatarData(iso) {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

// Remove aspas que vêm embutidas no texto do versículo (o componente já põe as
// suas próprias “”).
const limparAspas = (s) => String(s || '').replace(/^["'“”]+|["'“”]+$/g, '').trim()

function base(row) {
  const blog = row.blog || {}
  return {
    slug: row.blog_slug,
    titulo: blog.titulo || 'Sem título',
    meta: blog.meta || '',
    data: formatarData(row.updated_at),
    img: imagemParaSlug(row.blog_slug),
    versiculo: limparAspas(blog.versiculo),
    ref: limparAspas(blog.versiculo_ref),
  }
}

// Resumo pro índice (sem corpo).
export function mapResumo(row) {
  return base(row)
}

// Post completo (com corpo já convertido pra HTML).
export function mapPost(row) {
  const blog = row.blog || {}
  return { ...base(row), corpo_html: markdownToHtml(blog.corpo_md || '') }
}
