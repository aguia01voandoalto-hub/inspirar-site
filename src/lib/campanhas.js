// Datas de campanha do site. O site é reconstruído todo dia (deploy hook do
// blog), então o prerender acompanha a data real — e o cliente recalcula ao
// hidratar. Depois do Dia dos Pais, tudo que depende disso troca sozinho.

// Dia dos Pais 2026: domingo, 9 de agosto (fim do dia, horário de Brasília).
const FIM_DIA_DOS_PAIS = new Date('2026-08-09T23:59:59-03:00')

export const diaDosPaisAtivo = () => new Date() <= FIM_DIA_DOS_PAIS
