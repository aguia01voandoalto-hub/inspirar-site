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
            Quem está por trás
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
                que ela mesma tomou. Acredito que um espaço de presença
                real diante de Deus — uma palavra lida com calma, uma oração
                escrita à mão, um pedido levado por um irmão — muda o tom do
                dia inteiro. O inspirar.app existe para guardar esse espaço na
                sua rotina.
              </p>
              <p>
                Se você chegou até aqui, talvez essa inquietação também seja
                sua. O inspirar.app está no ar — na Google Play e no seu
                navegador — e já faz parte da manhã de quem caminha com a
                gente. Cada devocional, cada oração e cada detalhe continua
                sendo moldado junto com quem usa. Esse é o meu compromisso —
                construir, com calma e com propósito, um lugar onde sobra
                espaço para Deus.
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

        {/* Co-fundador — a autoridade teológica do projeto. Padrão
            "construtor + especialista": o Ero conta a origem; o Pr. Pesset
            responde pela fidelidade bíblica do conteúdo. */}
        <Reveal delay={0.15}>
          <div className="mt-16 grid items-center gap-8 rounded-3xl border border-dourado/25 bg-dourado/5 p-8 md:mt-24 md:grid-cols-[1fr_1.9fr] md:gap-12 md:p-10">
            <div className="relative">
              <RevealImage
                src="/prints/pesset.jpg"
                alt="Pr. Pesset com a família"
                className="aspect-[4/3] rounded-2xl ring-1 ring-creme/15"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-noite/40 via-transparent to-transparent" />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.3em] text-dourado uppercase">
                Cuidado teológico
              </p>
              <blockquote className="mt-5 font-serif text-xl font-light italic leading-relaxed text-creme md:text-2xl">
                “Meu compromisso aqui é um só: zelar para que cada palavra seja
                fiel às Escrituras e aponte sempre para Cristo.”
              </blockquote>
              <div className="mt-7 border-t border-dourado/40 pt-6">
                <p className="font-serif text-2xl font-light italic text-creme">
                  Pr. Pesset
                </p>
                <p className="mt-2 text-xs font-medium tracking-[0.3em] text-dourado uppercase">
                  Co-fundador · Cuidado teológico
                </p>
                <p className="mt-3 text-sm leading-relaxed text-creme/60">
                  Mestre em Teologia Sistemático-Pastoral (PUC-Rio) e doutorando
                  em Teologia. Pastor titular da Segunda Igreja Batista em
                  Rondonópolis-MT e docente nacional do Instituto Haggai.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
