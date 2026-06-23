// Conversor Markdown → HTML mínimo, sem dependência. O corpo dos posts vem do
// Gemini em markdown limpo (títulos, parágrafos, listas, ênfase, citações,
// links). Roda só no build (prerender + SSR), nunca no cliente — o HTML pronto
// é injetado via dangerouslySetInnerHTML, idêntico nos dois lados.

const escapeHtml = (s) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Inline: negrito, itálico e links. Aplicado depois do escape, então as tags
// que inserimos aqui são as únicas no texto.
const inline = (s) => {
  let t = escapeHtml(s);
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, txt, url) => {
    const safe = url.replace(/"/g, '%22');
    return `<a href="${safe}" target="_blank" rel="noreferrer" class="text-roxo underline decoration-dourado/60 underline-offset-4 hover:decoration-dourado">${txt}</a>`;
  });
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  return t;
};

// Block-level: separa por linhas em branco e classifica cada bloco.
export function markdownToHtml(md) {
  if (!md || typeof md !== 'string') return '';
  const linhas = md.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0;

  const flushLista = (ordenada) => {
    const itens = [];
    const re = ordenada ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*]\s+(.*)$/;
    while (i < linhas.length && re.test(linhas[i])) {
      itens.push(`<li class="leading-relaxed">${inline(linhas[i].match(re)[1])}</li>`);
      i++;
    }
    const tag = ordenada ? 'ol' : 'ul';
    const cls = ordenada
      ? 'list-decimal pl-6 space-y-2 text-roxo/90'
      : 'list-disc pl-6 space-y-2 text-roxo/90';
    out.push(`<${tag} class="${cls}">${itens.join('')}</${tag}>`);
  };

  while (i < linhas.length) {
    const linha = linhas[i];

    if (!linha.trim()) {
      i++;
      continue;
    }

    // Títulos #..######
    const h = linha.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const nivel = h[1].length;
      const tag = nivel <= 2 ? 'h2' : 'h3';
      const cls =
        nivel <= 2
          ? 'font-serif text-2xl md:text-3xl font-light text-roxo mt-12 mb-4 leading-snug'
          : 'font-serif text-xl md:text-2xl font-light text-roxo mt-8 mb-3';
      out.push(`<${tag} class="${cls}">${inline(h[2])}</${tag}>`);
      i++;
      continue;
    }

    // Citação > ...
    if (/^\s*>\s?/.test(linha)) {
      const buf = [];
      while (i < linhas.length && /^\s*>\s?/.test(linhas[i])) {
        buf.push(linhas[i].replace(/^\s*>\s?/, ''));
        i++;
      }
      out.push(
        `<blockquote class="border-l-2 border-dourado/60 pl-5 my-6 font-serif text-xl italic text-roxo/90">${inline(buf.join(' '))}</blockquote>`,
      );
      continue;
    }

    // Listas
    if (/^\s*[-*]\s+/.test(linha)) {
      flushLista(false);
      continue;
    }
    if (/^\s*\d+\.\s+/.test(linha)) {
      flushLista(true);
      continue;
    }

    // Parágrafo: agrega linhas até a próxima em branco/bloco.
    const buf = [];
    while (
      i < linhas.length &&
      linhas[i].trim() &&
      !/^(#{1,6}\s|>\s?|\s*[-*]\s+|\s*\d+\.\s+)/.test(linhas[i])
    ) {
      buf.push(linhas[i]);
      i++;
    }
    out.push(
      `<p class="text-base md:text-lg leading-relaxed text-roxo/90 my-5 indent-8 text-justify hyphens-auto">${inline(buf.join(' '))}</p>`,
    );
  }

  return out.join('\n');
}
