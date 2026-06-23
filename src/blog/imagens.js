// Pool curado de fundos do banco da marca (backgroundImages, tag "geral").
// A atribuição é estável por slug: cada post recebe sempre a mesma foto, sem
// depender de consultar o banco no build (resiliência + zero "troca de foto"
// entre builds). Pra trocar/curar, basta editar esta lista.

const B =
  'https://qywemhkqrpjtrcdorxub.supabase.co/storage/v1/object/public/admin-uploads/backgrounds/'

export const IMAGENS_BLOG = [
  B + '1781881178337_13_pexels_tiago_bellato_1677269835_36816856.jpg',
  B + '1781881174977_12_pexels_serjosoza_30346171.jpg',
  B + '1781881171684_11_pexels_saidpexels_12591406.jpg',
  B + '1781881168159_10_pexels_parimoofarhaan_35004932.jpg',
  B + '1781881164697_9_pexels_parimoofarhaan_33446808.jpg',
  B + '1781881161099_8_pexels_parimoofarhaan_29625344.jpg',
  B + '1781881157083_7_pexels_ketut_subiyanto_4657903.jpg',
  B + '1781881153341_6_pexels_guilherme_stecanella_173739360_11080088.jpg',
  B + '1781881147834_5_pexels_gojolley_12002608.jpg',
  B + '1781881143532_4_pexels_drone_leo_62573884_8101433.jpg',
  B + '1781881137923_3_pexels_davi_bruno_2153386644_35024437.jpg',
  B + '1781881134413_2_pexels_coloristgabs_11625966.jpg',
  B + '1781881129352_1_pexels_carlos_augusto_dias_de_menezes_3048501_4624253.jpg',
  B + '1781881124910_0_pexels_baris_26577027.jpg',
  B + '1777216569562_19_pexels_valeriya_36183149.jpg',
  B + '1777216560469_18_pexels_raymond_petrik_1448389535_36540591.jpg',
]

function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

// Foto estável pro slug. null se não houver pool (cai pro bloco de cor).
export function imagemParaSlug(slug) {
  if (!slug || IMAGENS_BLOG.length === 0) return null
  return IMAGENS_BLOG[hash(String(slug)) % IMAGENS_BLOG.length]
}
