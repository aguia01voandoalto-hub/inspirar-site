import Footer from '../sections/Footer.jsx'

// ─── Infra de capa (foto do banco ou bloco de cor como fallback) ─────────────

const CORES_FALLBACK = [
  { bg: 'bg-roxo', fg: 'text-creme', ref: 'text-dourado' },
  { bg: 'bg-noite', fg: 'text-creme', ref: 'text-dourado' },
  { bg: 'bg-dourado', fg: 'text-noite', ref: 'text-noite/70' },
]

function hashSlug(slug) {
  let h = 0
  for (let i = 0; i < String(slug).length; i += 1) h = (h * 31 + String(slug).charCodeAt(i)) | 0
  return Math.abs(h)
}

// Decide foto vs. cor e quais classes de texto usar sobre a capa.
function capaInfo(post) {
  if (post.img) return { foto: true, fg: 'text-creme', ref: 'text-dourado' }
  return { foto: false, ...CORES_FALLBACK[hashSlug(post.slug) % CORES_FALLBACK.length] }
}

// ─── Header / CTA ────────────────────────────────────────────────────────────

function BlogHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-roxo/10 bg-creme/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="/" className="inline-block">
          <img src="/logo.png" alt="inspirar.app" className="h-8 w-auto" />
        </a>
        <nav className="flex items-center gap-5 text-sm text-roxo/70 md:gap-6">
          <a href="/" className="hidden transition-colors hover:text-roxo sm:inline">
            Início
          </a>
          <a href="/blog" className="font-medium text-roxo">
            Blog
          </a>
          <a
            href="https://app.inspirar.app"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-dourado px-5 py-2.5 text-xs font-medium text-noite transition-[filter] duration-300 hover:brightness-110"
          >
            Abrir o app
          </a>
        </nav>
      </div>
    </header>
  )
}

function ChamadaApp() {
  return (
    <section className="mx-auto mt-20 max-w-6xl px-6 md:px-10">
      <div className="rounded-3xl border border-dourado/30 bg-noite px-8 py-12 text-center md:py-14">
        <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug font-light text-creme md:text-3xl">
          Esses subsídios nascem dentro do{' '}
          <span className="text-dourado">Caderno com Deus</span>.
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-creme/70">
          No inspirar.app, eles aparecem na hora certa — sob a pergunta do dia,
          quando você precisa de um empurrãozinho pra escrever.
        </p>
        <a
          href="https://app.inspirar.app"
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-block rounded-full bg-dourado px-8 py-4 text-sm font-medium tracking-wide text-noite transition-[filter] duration-300 hover:brightness-110"
        >
          Abrir o inspirar.app &rarr;
        </a>
      </div>
    </section>
  )
}

// ─── Cards ───────────────────────────────────────────────────────────────────

function Card({ post, eager = false }) {
  const c = capaInfo(post)
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-roxo/10 bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {c.foto ? (
          <>
            <img
              src={post.img}
              alt=""
              loading={eager ? 'eager' : 'lazy'}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-roxo/90 via-roxo/35 to-roxo/5" />
          </>
        ) : (
          <div className={`absolute inset-0 ${c.bg}`} />
        )}
        {post.versiculo && (
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className={`line-clamp-3 font-serif text-lg leading-snug italic ${c.fg}`}>
              “{post.versiculo}”
            </p>
            {post.ref && (
              <p className={`mt-2 text-[11px] tracking-[0.25em] uppercase ${c.ref}`}>
                {post.ref}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-[11px] tracking-[0.2em] text-roxo/45 uppercase">{post.data}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-roxo">{post.titulo}</h3>
        {post.meta && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-roxo/70">
            {post.meta}
          </p>
        )}
        <span className="mt-3 inline-block border-b-2 border-dourado pb-0.5 text-sm font-medium text-roxo">
          Ler &rarr;
        </span>
      </div>
    </a>
  )
}

function Destaque({ post }) {
  const c = capaInfo(post)
  return (
    <a href={`/blog/${post.slug}`} className="group relative block overflow-hidden rounded-3xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
        {c.foto ? (
          <>
            <img
              src={post.img}
              alt=""
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noite/92 via-roxo/50 to-roxo/15" />
          </>
        ) : (
          <div className={`absolute inset-0 ${c.bg}`} />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12">
          {post.versiculo && (
            <p className={`line-clamp-4 font-serif text-xl leading-snug italic md:text-2xl ${c.fg}`}>
              “{post.versiculo}”
            </p>
          )}
          {post.ref && (
            <p className={`mt-3 text-[11px] tracking-[0.3em] uppercase ${c.ref}`}>
              {post.ref} · Destaque
            </p>
          )}
          <h2 className={`mt-4 max-w-2xl font-serif text-3xl leading-tight md:text-4xl ${c.fg}`}>
            {post.titulo}
          </h2>
          {post.meta && (
            <p className={`mt-3 max-w-xl text-sm leading-relaxed md:text-base ${c.foto ? 'text-creme/80' : c.fg}`}>
              {post.meta}
            </p>
          )}
          <span className={`mt-5 inline-block w-fit border-b-2 border-dourado pb-0.5 text-sm font-medium ${c.fg}`}>
            Ler subsídio &rarr;
          </span>
        </div>
      </div>
    </a>
  )
}

function Paginacao({ pagina, total }) {
  if (!total || total <= 1) return null
  const href = (p) => (p === 1 ? '/blog' : `/blog/pagina/${p}`)
  const paginas = Array.from({ length: total }, (_, i) => i + 1)
  return (
    <nav className="mt-14 flex items-center justify-center gap-2 pb-4" aria-label="Paginação">
      {pagina > 1 && (
        <a href={href(pagina - 1)} className="flex h-10 w-10 items-center justify-center rounded-full text-roxo/60 transition-colors hover:bg-roxo/5" aria-label="Página anterior">
          &larr;
        </a>
      )}
      {paginas.map((p) =>
        p === pagina ? (
          <span key={p} aria-current="page" className="flex h-10 w-10 items-center justify-center rounded-full bg-roxo text-sm text-creme">
            {p}
          </span>
        ) : (
          <a key={p} href={href(p)} className="flex h-10 w-10 items-center justify-center rounded-full text-sm text-roxo/60 transition-colors hover:bg-roxo/5">
            {p}
          </a>
        ),
      )}
      {pagina < total && (
        <a href={href(pagina + 1)} className="flex h-10 w-10 items-center justify-center rounded-full text-roxo/60 transition-colors hover:bg-roxo/5" aria-label="Próxima página">
          &rarr;
        </a>
      )}
    </nav>
  )
}

// ─── Índice ─────────────────────────────────────────────────────────────────

export function BlogIndex({ posts = [], pagina = 1, totalPaginas = 1 }) {
  const naPrimeira = pagina === 1
  const destaque = naPrimeira ? posts[0] : null
  const resto = naPrimeira ? posts.slice(1) : posts

  return (
    <main className="min-h-svh bg-creme">
      <BlogHeader />

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 md:px-10 md:pt-24">
        <p className="text-[11px] font-medium tracking-[0.3em] text-dourado uppercase">
          Blog do inspirar
        </p>
        <h1 className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-roxo md:text-6xl">
          Subsídios pra sua reflexão.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-roxo/70">
          Textos curtos que ajudam você a responder, com o coração, as perguntas
          do seu tempo com Deus — uma palavra de cada vez.
        </p>
      </section>

      {posts.length === 0 ? (
        <section className="mx-auto max-w-6xl px-6 md:px-10">
          <div className="rounded-3xl border border-roxo/10 bg-white/50 px-8 py-20 text-center">
            <p className="font-serif text-2xl font-light text-roxo">Em breve.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-roxo/60">
              Os primeiros subsídios estão a caminho. Enquanto isso, comece sua
              jornada no app.
            </p>
          </div>
        </section>
      ) : (
        <>
          {destaque && (
            <section className="mx-auto max-w-6xl px-6 md:px-10">
              <Destaque post={destaque} />
            </section>
          )}

          <section className="mx-auto max-w-6xl px-6 pt-14 md:px-10">
            <div className="flex items-baseline justify-between border-b border-roxo/10 pb-4">
              <h2 className="font-serif text-2xl text-roxo">Últimos subsídios</h2>
              <span className="text-xs tracking-wide text-roxo/50">Atualizado todo dia</span>
            </div>

            {resto.length > 0 && (
              <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {resto.map((p, i) => (
                  <Card key={p.slug} post={p} eager={i < 3} />
                ))}
              </div>
            )}

            <Paginacao pagina={pagina} total={totalPaginas} />
          </section>
        </>
      )}

      <ChamadaApp />
      <Footer />
    </main>
  )
}

// ─── Post ───────────────────────────────────────────────────────────────────

export function BlogPost({ post }) {
  if (!post) return <BlogIndex posts={[]} />
  const c = capaInfo(post)
  return (
    <main className="min-h-svh bg-creme">
      <BlogHeader />

      <section className="relative overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[24/9]">
          {c.foto ? (
            <>
              <img src={post.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-noite/92 via-roxo/55 to-roxo/20" />
            </>
          ) : (
            <div className={`absolute inset-0 ${c.bg}`} />
          )}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-3xl flex-col justify-end px-6 pb-8 md:px-0 md:pb-12">
              {post.versiculo && (
                <p className={`font-serif text-xl leading-snug italic md:text-2xl ${c.fg}`}>
                  “{post.versiculo}”
                </p>
              )}
              {post.ref && (
                <p className={`mt-3 text-[11px] tracking-[0.3em] uppercase ${c.ref}`}>{post.ref}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-2xl px-6 pt-10 md:px-0">
        <a href="/blog" className="text-sm text-roxo/60 transition-colors hover:text-roxo">
          &larr; Todos os subsídios
        </a>

        {post.data && (
          <p className="mt-8 text-xs tracking-widest text-roxo/60 uppercase">{post.data}</p>
        )}
        <h1 className="mt-3 font-serif text-4xl leading-tight text-roxo md:text-5xl">
          {post.titulo}
        </h1>
        {post.meta && (
          <p className="mt-5 text-lg leading-relaxed text-roxo/80">{post.meta}</p>
        )}

        <div
          className="mt-10 border-t border-roxo/10 pt-10"
          dangerouslySetInnerHTML={{ __html: post.corpo_html || '' }}
        />
      </article>

      <ChamadaApp />
      <Footer />
    </main>
  )
}
