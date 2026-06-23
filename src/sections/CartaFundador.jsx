import { Reveal, RevealImage } from '../components/Reveal.jsx'

export default function CartaFundador() {
  return (
    <section
      id="carta"
      className="relative overflow-hidden bg-noite px-6 py-36 md:px-12 md:py-60"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_10%_20%,rgba(201,168,95,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
            Carta do fundador
          </p>
          <h2 className="mt-6 max-w-3xl font-serif text-3xl font-light leading-snug text-creme md:text-5xl">
            O inspirar.app é um propósito{' '}
            <em className="text-dourado">antes de ser um app.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid items-start gap-12 md:mt-24 md:grid-cols-[1fr_1.5fr] md:gap-20">
          <Reveal className="relative">
            <RevealImage
              src="/prints/fundador.jpg"
              alt="Ero Machado com a família em um jardim florido ao entardecer"
              className="aspect-[4/5] rounded-3xl ring-1 ring-creme/15"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-t from-noite/60 via-transparent to-transparent" />
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-serif text-xl font-light italic leading-relaxed text-dourado md:text-2xl">
              O inspirar.app não nasceu de um plano de negócios. Nasceu de uma
              inquietação.
            </p>

            <div className="mt-8 space-y-6 text-base leading-loose text-creme/75">
              <p>
                Eu conseguia responder dezenas de mensagens por dia, dar conta
                de trabalho, trânsito e contas — e ainda assim passar uma
                semana inteira sem uma conversa de verdade com Deus. Não por
                falta de fé. Por falta de espaço.
              </p>
              <p>
                Eu não queria criar mais um aplicativo disputando a sua
                atenção. Queria o contrário: usar a tecnologia para devolver o
                que ela mesma tomou. Acredito que alguns minutos de presença
                real diante de Deus — uma palavra lida com calma, uma oração
                escrita à mão, um pedido levado por um irmão — mudam o tom do
                dia inteiro. O inspirar.app existe para guardar esse espaço na
                sua rotina.
              </p>
              <p>
                Se você chegou até aqui, talvez essa inquietação também seja
                sua. O inspirar.app está nascendo agora, e quem chega primeiro
                não é só usuário: é pioneiro. Cada devocional, cada oração e
                cada detalhe do app vai ser moldado junto com você. Esse é o
                meu compromisso — construir, com calma e com propósito, um
                lugar onde sobra espaço para Deus.
              </p>
            </div>

            <div className="mt-12 border-t border-dourado/40 pt-8">
              <p className="font-serif text-3xl font-light italic text-creme">
                Ero Machado
              </p>
              <p className="mt-2 text-xs font-medium tracking-[0.3em] text-dourado uppercase">
                Fundador
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
