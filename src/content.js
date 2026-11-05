export const contact = {
  phone: '(47) 98845-5504',
  whatsapp: '5547988455504',
  email: 'filipimbarbosa@gmail.com',
  address: 'R. Minas Gerais, 1122 — Nova Brasília',
  city: 'Joinville — SC',
  google: 'https://share.google/r67MvaW0zk8jdfiZ9',
  instagram: 'https://www.instagram.com/filipi.barbosa.adv/',
};
export const areas = [
  { name: 'Direito Civil', icon: 'scale', summary: 'Defesa dos seus direitos nas relações do dia a dia.', detail: 'Orientação em questões de responsabilidade civil, indenizações, obrigações e defesa de direitos. Cada situação é analisada para identificar os caminhos jurídicos adequados ao seu caso.' },
  { name: 'Direito de Família', icon: 'users', summary: 'Divórcio, pensão e questões familiares.', detail: 'Atendimento em divórcio, guarda, convivência familiar e pensão alimentícia, com escuta, discrição e atenção às particularidades de cada família.' },
  { name: 'Direito Sucessório', icon: 'award', summary: 'Inventários e partilhas.', detail: 'Orientação em inventários, partilhas e questões relacionadas à sucessão patrimonial, com clareza sobre as etapas e os documentos necessários.' },
  { name: 'Direito Imobiliário', icon: 'house', summary: 'Usucapião e questões sobre imóveis.', detail: 'Análise de questões relacionadas à posse, propriedade, regularização de imóveis e usucapião, além de orientação em negociações imobiliárias.' },
  { name: 'Direito Bancário', icon: 'landmark', summary: 'Fraudes bancárias e práticas abusivas.', detail: 'Orientação em conflitos com instituições financeiras, fraudes bancárias, cobranças e análise de possíveis práticas abusivas em relações de consumo.' },
  { name: 'Contratos', icon: 'file', summary: 'Proteção contratual e análise de cláusulas.', detail: 'Elaboração, revisão e análise de contratos para que você compreenda direitos, obrigações e riscos antes de tomar uma decisão.' },
];
export function whatsappLink(message = 'Olá! Gostaria de conversar com um advogado sobre o meu caso.') {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function formMessage({name, phone, email, message}) {
  return `Olá! Meu nome é ${name.trim()}.\nWhatsApp: ${phone.trim()}\nE-mail: ${email.trim() || 'Não informado'}\n\n${message.trim()}`;
}
