const CONTEUDO = {
  privacidade: {
    titulo: 'Política de Privacidade',
    atualizacao: 'Última atualização: junho de 2026',
    secoes: [
      {
        titulo: '1. Quem somos',
        texto: [
          'O inspirar.app é um aplicativo devocional cristão brasileiro, criado para ajudar você a cultivar constância na fé por meio de devocionais diários, leitura da Bíblia, oração e um caderno pessoal. Esta política explica como tratamos os seus dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).',
          'O serviço é operado pela INSPIRAR SOLUÇÕES EM TECNOLOGIA LTDA, CNPJ 66.326.453/0001-10, Brasil.',
        ],
      },
      {
        titulo: '2. Quais dados coletamos',
        texto: [
          'Neste site, coletamos apenas o que você nos fornece voluntariamente: o seu endereço de e-mail, caso entre na lista de pioneiros.',
          'No aplicativo, quando lançado, poderemos coletar dados de cadastro (nome e e-mail), conteúdo que você criar (anotações do Caderno com Deus e pedidos publicados no Mural de Orações) e dados de uso necessários para o funcionamento do serviço.',
        ],
      },
      {
        titulo: '3. Como usamos os seus dados',
        texto: [
          'Usamos os seus dados exclusivamente para operar o inspirar.app: avisar você sobre o lançamento e novidades, manter a sua conta, sincronizar o seu conteúdo entre dispositivos e melhorar a experiência do aplicativo.',
          'Não vendemos os seus dados. Não compartilhamos as suas anotações pessoais com ninguém — o que você escreve no Caderno com Deus é seu.',
        ],
      },
      {
        titulo: '4. Compartilhamento',
        texto: [
          'Compartilhamos dados apenas com provedores de infraestrutura essenciais ao funcionamento do serviço (como hospedagem e envio de e-mails), sempre limitados ao mínimo necessário, e quando exigido por lei.',
        ],
      },
      {
        titulo: '5. Seus direitos',
        texto: [
          'Nos termos da LGPD, você pode solicitar a qualquer momento o acesso, a correção ou a exclusão dos seus dados, bem como a retirada do consentimento. Basta entrar em contato pelo e-mail abaixo e atenderemos no menor prazo possível.',
        ],
      },
      {
        titulo: '6. Cookies',
        texto: [
          'Este site não utiliza cookies de rastreamento nem ferramentas de publicidade de terceiros.',
        ],
      },
      {
        titulo: '7. Contato',
        texto: [
          'Para qualquer assunto relacionado a privacidade, fale conosco: contato@inspirar.app ou pelo perfil @inspirarapp.',
        ],
      },
    ],
  },
  termos: {
    titulo: 'Termos de Uso',
    atualizacao: 'Última atualização: junho de 2026',
    secoes: [
      {
        titulo: '1. Aceitação',
        texto: [
          'Ao usar este site ou o aplicativo inspirar.app, você concorda com estes Termos de Uso. Se não concordar com algum ponto, pedimos que não utilize o serviço.',
        ],
      },
      {
        titulo: '2. O serviço',
        texto: [
          'O inspirar.app oferece conteúdo devocional, leitura bíblica, espaço de oração comunitária e um caderno pessoal. O serviço está em fase de pré-lançamento: funcionalidades podem mudar, ser adicionadas ou removidas durante esse período.',
          'O conteúdo do inspirar.app tem propósito devocional e não substitui aconselhamento pastoral, psicológico ou médico profissional.',
        ],
      },
      {
        titulo: '3. Conta de pioneiro',
        texto: [
          'O acesso de pioneiro é gratuito. Você é responsável por manter a confidencialidade da sua conta e por toda atividade realizada nela.',
        ],
      },
      {
        titulo: '4. Conduta no Mural de Orações',
        texto: [
          'O Mural de Orações é um espaço de intercessão e cuidado mútuo. Não são permitidos conteúdos ofensivos, discriminatórios, comerciais ou que exponham terceiros sem consentimento. Pedidos que violem estas regras poderão ser removidos e contas reincidentes, suspensas.',
        ],
      },
      {
        titulo: '5. Seu conteúdo',
        texto: [
          'Tudo o que você escreve no Caderno com Deus permanece seu e privado. Ao publicar no Mural de Orações, você nos autoriza a exibir esse conteúdo dentro do aplicativo, para o fim a que ele se destina.',
        ],
      },
      {
        titulo: '6. Propriedade intelectual',
        texto: [
          'A marca inspirar.app, o design do aplicativo e os conteúdos devocionais produzidos por nós são protegidos por direitos autorais e não podem ser reproduzidos comercialmente sem autorização.',
        ],
      },
      {
        titulo: '7. Limitação de responsabilidade',
        texto: [
          'Trabalhamos para manter o serviço estável e disponível, mas, em fase de pré-lançamento, não garantimos disponibilidade ininterrupta nem ausência de erros.',
        ],
      },
      {
        titulo: '8. Alterações',
        texto: [
          'Estes termos podem ser atualizados. Mudanças relevantes serão comunicadas pelo site ou pelo aplicativo, com a data de atualização sempre indicada no topo desta página.',
        ],
      },
      {
        titulo: '9. Contato',
        texto: [
          'Dúvidas sobre estes termos: contato@inspirar.app ou pelo perfil @inspirarapp.',
        ],
      },
    ],
  },
}

export default function PaginaLegal({ tipo }) {
  const pagina = CONTEUDO[tipo]

  return (
    <main className="min-h-svh bg-creme px-6 pb-28 md:px-12">
      <header className="mx-auto flex max-w-3xl items-center justify-between pt-8">
        <a href="#" className="font-serif text-2xl font-light lowercase text-roxo">
          inspirar.app
        </a>
        <a
          href="#"
          className="text-sm text-roxo/60 transition-colors hover:text-roxo"
        >
          ← Voltar ao início
        </a>
      </header>

      <article className="mx-auto max-w-3xl pt-20 md:pt-28">
        <h1 className="font-serif text-4xl font-light leading-tight text-roxo md:text-5xl">
          {pagina.titulo}
        </h1>
        <p className="mt-4 text-xs tracking-widest text-roxo/50 uppercase">
          {pagina.atualizacao}
        </p>

        <div className="mt-14 space-y-10">
          {pagina.secoes.map((s) => (
            <section key={s.titulo}>
              <h2 className="font-serif text-xl font-normal text-roxo">
                {s.titulo}
              </h2>
              {s.texto.map((t, i) => (
                <p key={i} className="mt-3 text-sm leading-loose text-roxo/75">
                  {t}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  )
}
