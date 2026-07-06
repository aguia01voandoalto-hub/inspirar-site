import { Reveal } from '../components/Reveal.jsx'
import Footer from '../sections/Footer.jsx'
import BadgesLojas from '../components/BadgesLojas.jsx'

// Página de retorno pós-pagamento. O link de assinatura do Asaas redireciona
// pra cá quando o pagamento confirma (successUrl). Objetivo: dizer que deu
// certo e levar pras lojas (Google Play + App Store) — reforçando o "mesmo
// e-mail" pro Premium ser reconhecido na conta.

export default function PaginaObrigado() {
  return (
    <main className="bg-creme">
      <section className="relative flex min-h-svh flex-col overflow-hidden bg-noite">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,168,95,0.18),transparent_70%)]" />

        <header className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          <a href="/">
            <img src="/logo.png" alt="inspirar.app" className="h-9 w-auto md:h-10" />
          </a>
        </header>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16 text-center md:px-12">
          <Reveal className="max-w-2xl">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-dourado/40 bg-dourado/10 text-4xl">
              ✓
            </div>

            <p className="text-sm font-medium tracking-[0.2em] text-dourado uppercase">
              Assinatura confirmada
            </p>
            <h1 className="mt-5 font-serif text-4xl font-light leading-[1.1] text-creme md:text-6xl">
              Bem-vindo ao{' '}
              <em className="text-dourado">inspirar.app.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed font-light text-creme/90">
              Seu acesso já está garantido. Agora é só baixar o app e entrar —
              sua caminhada com Deus começa hoje.
            </p>

            {/* Passo a passo curto */}
            <div className="mx-auto mt-10 max-w-md space-y-3 text-left">
              {[
                'Baixe o inspirar.app na Google Play ou App Store (botões abaixo).',
                'Crie sua conta com o MESMO e-mail que você usou no pagamento.',
                'Pronto — seu Premium já estará ativo.',
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-creme/15 bg-creme/5 px-4 py-3"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dourado text-xs font-bold text-noite">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-creme/85">{t}</p>
                </div>
              ))}
            </div>

            {/* Selos oficiais das lojas */}
            <div className="mt-10">
              <BadgesLojas className="h-14 md:h-16" />
            </div>

            <p className="mx-auto mt-10 max-w-md rounded-2xl border border-dourado/25 bg-dourado/5 px-5 py-4 text-sm text-creme/80">
              💡 Já tem o app instalado? Abra e faça login com o e-mail da
              assinatura — seu Premium já está lá.
            </p>

            {/* Cross-sell pós-compra: quem acabou de dizer "sim" é quem mais
                converte em presente (thank-you page). */}
            <p className="mx-auto mt-6 max-w-md text-sm text-creme/60">
              🎁 Conhece alguém que precisa dessa caminhada?{' '}
              <a
                href="/presente"
                className="text-dourado underline decoration-dourado/50 underline-offset-4 hover:brightness-110"
              >
                Presenteie o inspirar.app →
              </a>
            </p>

            <p className="mt-8 text-xs text-creme/50">
              Precisa de ajuda? Fale com a gente em{' '}
              <a
                href="mailto:suporte@inspirar.app"
                className="underline decoration-dourado/50 underline-offset-4 hover:text-creme"
              >
                suporte@inspirar.app
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  )
}
