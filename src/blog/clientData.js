import { mapResumo, mapPost } from './transform.js'

// Fallback de runtime: usado quando a página NÃO veio prerenderizada (dev, ou
// hit direto sem dados embutidos). A RLS de caderno_subsidios só devolve
// status='publicado', então a anon key é segura aqui. O versículo já vem no
// payload (blog.versiculo), então basta ler caderno_subsidios.

const URL_BASE = import.meta.env.VITE_SUPABASE_URL
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY
const headers = ANON ? { apikey: ANON, Authorization: `Bearer ${ANON}` } : null

const SELECT = 'select=blog_slug,blog,updated_at'

export async function fetchIndex() {
  if (!URL_BASE || !headers) return []
  try {
    const r = await fetch(
      `${URL_BASE}/rest/v1/caderno_subsidios?${SELECT}&status=eq.publicado&blog_slug=not.is.null&order=updated_at.desc`,
      { headers },
    )
    if (!r.ok) return []
    const rows = await r.json()
    return rows.filter((x) => x.blog_slug).map(mapResumo)
  } catch {
    return []
  }
}

export async function fetchPost(slug) {
  if (!URL_BASE || !headers || !slug) return null
  try {
    const r = await fetch(
      `${URL_BASE}/rest/v1/caderno_subsidios?${SELECT}&status=eq.publicado&blog_slug=eq.${encodeURIComponent(slug)}&limit=1`,
      { headers },
    )
    if (!r.ok) return null
    const rows = await r.json()
    return rows[0] ? mapPost(rows[0]) : null
  } catch {
    return null
  }
}
