import { diaDosPaisAtivo } from '../lib/campanhas.js'

export default function Footer() {
  const pais = diaDosPaisAtivo()
  return (
    <footer className="border-t border-creme/10 bg-noite px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <a href="#" className="inline-block">
              <img
                src="/logo.png"
                alt="inspirar.app"
                className="h-9 w-auto"
              />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-creme/60">
              Espaço diário de conexão espiritual, oração e reflexão.
              Construindo uma rotina de fé que dura — uma palavra de cada vez.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] text-dourado uppercase">
              App
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-creme/60">
              <li>
                <a
                  href="/assinar"
                  className="font-medium text-dourado transition-colors hover:brightness-125"
                >
                  Assinar
                </a>
              </li>
              <li>
                <a href="/presente" className="transition-colors hover:text-creme">
                  Presentear
                </a>
              </li>
              {pais && (
                <li>
                  <a href="/pais" className="transition-colors hover:text-creme">
                    🎁 Dia dos Pais
                  </a>
                </li>
              )}
              <li>
                <a href="#manifesto" className="transition-colors hover:text-creme">
                  Manifesto
                </a>
              </li>
              <li>
                <a href="#funcionalidades" className="transition-colors hover:text-creme">
                  Recursos
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="transition-colors hover:text-creme">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="/blog" className="transition-colors hover:text-creme">
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://app.inspirar.app"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-creme"
                >
                  Entrar no app
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] text-dourado uppercase">
              Comunidade
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-creme/60">
              <li>
                <a
                  href="https://app.inspirar.app/prayer"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-creme"
                >
                  Mural de orações
                </a>
              </li>
              <li>
                <a
                  href="https://app.inspirar.app/bible"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-creme"
                >
                  Bíblia
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/inspirarapp"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-creme"
                >
                  @inspirarapp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-[0.25em] text-dourado uppercase">
              Legal
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-creme/60">
              <li>
                <a href="#/privacidade" className="transition-colors hover:text-creme">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#/termos" className="transition-colors hover:text-creme">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@inspirar.app"
                  className="transition-colors hover:text-creme"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-creme/10 pt-8 text-xs text-creme/40 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 INSPIRAR SOLUÇÕES EM TECNOLOGIA LTDA · CNPJ
            66.326.453/0001-10 · Brasil
          </p>
          <p>Feito com 💚 para Sua glória</p>
        </div>
      </div>
    </footer>
  )
}
