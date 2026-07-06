import { Reveal } from '../components/Reveal.jsx'
import { diaDosPaisAtivo } from '../lib/campanhas.js'

// Seção compacta de presente na home — a "saída" pra persona que compra PRA
// ALGUÉM (não pra si). Fica logo após o bloco de planos: é ali que o
// presenteador percebe que os planos são "pra mim" e procura a alternativa.
// Compacta de propósito: o funil principal continua sendo a assinatura.
export default function Presentear() {
  const pais = diaDosPaisAtivo()

  return (
    <section className="relative overflow-hidden bg-noite px-6 py-20 md:px-12 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,rgba(201,168,95,0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            Presenteie
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl font-light leading-snug text-creme md:text-4xl">
            Fé também se dá <em className="text-dourado">de presente.</em>
          </h2>
        </Reveal>

        <div className={`mt-10 grid gap-4 ${pais ? 'md:grid-cols-2' : 'md:max-w-xl'}`}>
          {pais && (
            <Reveal>
              <a
                href="/pais"
                className="group flex h-full flex-col rounded-3xl border border-dourado/40 bg-dourado/5 p-7 transition-colors hover:bg-dourado/10"
              >
                <span className="self-start rounded-full bg-dourado px-3 py-1 text-[0.65rem] font-medium tracking-widest text-noite uppercase">
                  Dia dos Pais · até 9/8
                </span>
                <h3 className="mt-4 font-serif text-2xl font-light text-creme">
                  Dê a ele mais que um presente. Dê um caminho.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-creme/70">
                  12 meses de inspirar.app por 12× de R$ 14,90 — com a trilha
                  Jornada do Pai e o 13º mês de bônus.
                </p>
                <span className="mt-auto pt-5 text-sm font-medium text-dourado group-hover:underline">
                  Presentear no Dia dos Pais →
                </span>
              </a>
            </Reveal>
          )}
          <Reveal delay={pais ? 0.12 : 0}>
            <a
              href="/presente"
              className="group flex h-full flex-col rounded-3xl border border-creme/15 bg-creme/5 p-7 transition-colors hover:bg-creme/10"
            >
              <span className="self-start rounded-full bg-creme/10 px-3 py-1 text-[0.65rem] font-medium tracking-widest text-creme/80 uppercase">
                🎁 Para quem você ama
              </span>
              <h3 className="mt-4 font-serif text-2xl font-light text-creme">
                Presenteie alguém com crescimento espiritual.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-creme/70">
                Um amigo começando na fé, alguém voltando, alguém cansado.
                Entrega digital na hora, com código de resgate.
              </p>
              <span className="mt-auto pt-5 text-sm font-medium text-dourado group-hover:underline">
                Ver presente →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
