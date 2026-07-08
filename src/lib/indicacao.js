// Indicação de embaixador na /assinar. Lê o ?ref=<slug> e resolve o nome/foto
// público do influenciador (RPC anon) pra mostrar "Indicado por X" + o presente.
const URL_BASE = import.meta.env.VITE_SUPABASE_URL
const ANON = import.meta.env.VITE_SUPABASE_ANON_KEY

export function refDaUrl() {
  try {
    const r = new URLSearchParams(window.location.search).get('ref')
    return r ? r.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40) : ''
  } catch {
    return ''
  }
}

export async function buscarInfluenciador(slug) {
  if (!slug || !URL_BASE || !ANON) return null
  try {
    const r = await fetch(`${URL_BASE}/rest/v1/rpc/influencer_public_by_slug`, {
      method: 'POST',
      headers: {
        apikey: ANON,
        Authorization: `Bearer ${ANON}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_slug: slug }),
    })
    if (!r.ok) return null
    const rows = await r.json()
    return Array.isArray(rows) && rows[0] ? rows[0] : null
  } catch {
    return null
  }
}
