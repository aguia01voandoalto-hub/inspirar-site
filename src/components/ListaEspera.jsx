import { useState } from 'react'

// Remove BOM, espaços e qualquer caractere não-ASCII que possa ter entrado
// na variável de ambiente — senão o navegador recusa o valor no header.
const limpar = (v) => (v || '').replace(/[^\x20-\x7E]/g, '').trim()
const URL = limpar(import.meta.env.VITE_SUPABASE_URL)
const KEY = limpar(import.meta.env.VITE_SUPABASE_ANON_KEY)

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export default function ListaEspera() {
  const [email, setEmail] = useState('')
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | jaExiste | erro

  async function enviar(e) {
    e.preventDefault()
    const valor = email.trim()
    if (!EMAIL_RE.test(valor)) {
      setEstado('emailInvalido')
      return
    }

    if (!URL || !KEY) {
      setEstado('erro')
      return
    }

    setEstado('enviando')
    try {
      const res = await fetch(`${URL}/rest/v1/site_waitlist`, {
        method: 'POST',
        headers: {
          apikey: KEY,
          Authorization: `Bearer ${KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: valor,
          source: 'site',
          user_agent: navigator.userAgent,
        }),
      })

      if (res.ok) setEstado('ok')
      else if (res.status === 409) setEstado('jaExiste')
      else setEstado('erro')
    } catch {
      setEstado('erro')
    }
  }

  if (estado === 'ok' || estado === 'jaExiste') {
    return (
      <div className="mt-10 max-w-md">
        <p className="font-serif text-2xl font-light italic text-dourado">
          {estado === 'ok'
            ? 'Pronto, você está na lista. 🙌'
            : 'Esse e-mail já está na lista. 🙌'}
        </p>
        <p className="mt-3 text-sm text-creme/60">
          Assim que os cadastros reabrirem, você será um dos primeiros a saber.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-10 max-w-md">
      <p className="text-sm font-medium tracking-wide text-creme">
        Os cadastros estão temporariamente fechados.
      </p>
      <p className="mt-1 text-sm text-creme/60">
        Deixe seu e-mail e avisamos assim que o inspirar.app reabrir.
      </p>

      <form onSubmit={enviar} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (estado === 'erro' || estado === 'emailInvalido') setEstado('idle')
          }}
          placeholder="seu@email.com"
          aria-label="Seu e-mail"
          className="w-full rounded-full border border-creme/20 bg-creme/10 px-6 py-4 text-sm text-creme placeholder:text-creme/40 focus:border-dourado focus:outline-none"
        />
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="shrink-0 rounded-full bg-dourado px-8 py-4 text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110 disabled:opacity-60"
        >
          {estado === 'enviando' ? 'Enviando…' : 'Entrar na lista'}
        </button>
      </form>

      {estado === 'emailInvalido' && (
        <p className="mt-3 text-sm text-dourado">
          Verifique o e-mail e tente novamente.
        </p>
      )}
      {estado === 'erro' && (
        <p className="mt-3 text-sm text-dourado">
          Não foi possível enviar agora. Tente novamente em instantes.
        </p>
      )}
    </div>
  )
}
