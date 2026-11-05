export const contact = {
  phone: "(47) 98845-5504",
  whatsapp: "5547988455504",
  email: "filipimbarbosa@gmail.com",
  address: "R. Minas Gerais, 1122 — Nova Brasília",
  city: "Joinville — SC",
  google: "https://share.google/r67MvaW0zk8jdfiZ9",
  instagram: "https://www.instagram.com/filipi.barbosa.adv/",
};
export const areas = [
  {
    name: "Direito Civil",
    icon: "scale",
    summary: "Defesa dos seus direitos nas relações do dia a dia.",
    detail:
      "Orientação em questões de responsabilidade civil, indenizações, obrigações e defesa de direitos. Cada situação é analisada para identificar os caminhos jurídicos adequados ao seu caso.",
  },
  {
    name: "Direito de Família",
    icon: "users",
    summary: "Divórcio, pensão e questões familiares.",
    detail:
      "Atendimento em divórcio, guarda, convivência familiar e pensão alimentícia, com escuta, discrição e atenção às particularidades de cada família.",
  },
  {
    name: "Direito Sucessório",
    icon: "award",
    summary: "Inventários e partilhas.",
    detail:
      "Orientação em inventários, partilhas e questões relacionadas à sucessão patrimonial, com clareza sobre as etapas e os documentos necessários.",
  },
  {
    name: "Direito Imobiliário",
    icon: "house",
    summary: "Usucapião e questões sobre imóveis.",
    detail:
      "Análise de questões relacionadas à posse, propriedade, regularização de imóveis e usucapião, além de orientação em negociações imobiliárias.",
  },
  {
    name: "Direito Bancário",
    icon: "landmark",
    summary: "Fraudes bancárias e práticas abusivas.",
    detail:
      "Orientação em conflitos com instituições financeiras, fraudes bancárias, cobranças e análise de possíveis práticas abusivas em relações de consumo.",
  },
  {
    name: "Contratos",
    icon: "file",
    summary: "Proteção contratual e análise de cláusulas.",
    detail:
      "Elaboração, revisão e análise de contratos para que você compreenda direitos, obrigações e riscos antes de tomar uma decisão.",
  },
];
export function whatsappLink(
  message = "Olá! Gostaria de conversar com um advogado sobre o meu caso.",
) {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function formMessage({ name, phone, email, message }) {
  return `Olá! Meu nome é ${name.trim()}.\nWhatsApp: ${phone.trim()}\nE-mail: ${email.trim() || "Não informado"}\n\n${message.trim()}`;
}

// Textos preservados conforme o widget Google/Trustindex do site oficial.
// Fonte: https://filipibarbosa.adv.br — consulta em 05/11/2026.
// As datas são das publicações originais, não da consulta.
export const reviews = [
  {
    name: "luiz claudino",
    initials: "LC",
    date: "2022-07-20",
    dateLabel: "20 de julho de 2022",
    rating: 5,
    text: "Responde rápido suas duvidas, no momento de muita angustia, me ajudou muito.",
  },
  {
    name: "Marcelo Lima",
    initials: "ML",
    date: "2022-07-12",
    dateLabel: "12 de julho de 2022",
    rating: 5,
    text: "A principio antes de entrar com uma açao, consultei o dr Filipe e fui muito bel instruído",
  },
  {
    name: "Luana Luh",
    initials: "LL",
    date: "2022-07-05",
    dateLabel: "5 de julho de 2022",
    rating: 5,
    text: "Otimo proficional",
  },
];

// Preencher somente com uma quantidade confirmada pelo escritório.
// null mantém a apresentação sem número até a confirmação.
export const clientStats = { satisfiedClients: null };
