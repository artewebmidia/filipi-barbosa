import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Menu,
  X,
  Scale,
  UsersRound,
  ShieldCheck,
  Target,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  House,
  Landmark,
  FilePenLine,
  FileBadge,
  Check,
  Instagram,
} from "lucide-react";
import {
  areas,
  contact,
  whatsappLink,
  formMessage,
  reviews,
  clientStats,
} from "./content";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "./styles.css";
const icons = {
  scale: Scale,
  users: UsersRound,
  award: FileBadge,
  house: House,
  landmark: Landmark,
  file: FilePenLine,
};
const links = [
  ["Início", "#inicio"],
  ["O escritório", "#escritorio"],
  ["Áreas de atuação", "#atuacao"],
  ["Contato", "#contato"],
];
function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? "brand-light" : ""}`}
      href="#inicio"
      aria-label="Filipi Barbosa Advogados — início"
    >
      <span className="monogram" aria-hidden="true">
        FB
      </span>
      <span className="brand-name">
        Filipi Barbosa<span>ADVOGADOS</span>
      </span>
    </a>
  );
}
function Button({
  children,
  href,
  secondary = false,
  gold = false,
  className = "",
  ...props
}) {
  return (
    <a
      href={href}
      className={`button ${secondary ? "button-outline" : ""} ${gold ? "button-gold" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
function WhatsApp({ children = "Fale com um advogado", ...props }) {
  return (
    <Button
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Button>
  );
}
function GoogleWord() {
  return (
    <img
      className="google-word"
      src="/images/brands/google-wordmark.png"
      alt="Google"
      width="112"
      height="38"
      loading="lazy"
    />
  );
}
function AreaDialog({ area, close }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    d.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, []);
  const Icon = icons[area.icon];
  return (
    <dialog
      ref={ref}
      className="area-dialog"
      aria-labelledby="area-title"
      onCancel={close}
      onClick={(e) => {
        if (e.target === ref.current) close();
      }}
    >
      <button
        className="dialog-close"
        onClick={close}
        aria-label="Fechar detalhes"
      >
        <X />
      </button>
      <Icon size={44} strokeWidth={1.25} className="gold-icon" />
      <p className="eyebrow">ÁREAS DE ATUAÇÃO</p>
      <h2 id="area-title">{area.name}</h2>
      <p>{area.detail}</p>
      <p className="dialog-note">
        A orientação jurídica depende da análise individual da situação e dos
        documentos apresentados.
      </p>
      <Button
        href={whatsappLink(`Olá! Gostaria de orientação sobre ${area.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        Conversar sobre meu caso
      </Button>
    </dialog>
  );
}
function App() {
  const [menu, setMenu] = useState(false),
    [selected, setSelected] = useState(null),
    [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const menuButton = useRef(null);
  useEffect(() => {
    if (!menu) return;
    const key = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [menu]);
  function submit(e) {
    e.preventDefault();
    const url = whatsappLink(formMessage(form));
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <button
            ref={menuButton}
            className="menu-toggle"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="main-nav"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
          <nav
            id="main-nav"
            className={menu ? "nav open" : "nav"}
            aria-label="Navegação principal"
          >
            {links.map(([label, url]) => (
              <a key={url} href={url} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <WhatsApp className="nav-cta" />
          </nav>
        </div>
      </header>
      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-visual">
            <img
              className="hero-photo"
              src="/images/filipi-barbosa.webp"
              alt="Filipi Marcelino Barbosa, advogado em Joinville"
              width="1122"
              height="1402"
              fetchPriority="high"
            />
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">SEUS DIREITOS. NOSSO COMPROMISSO.</p>
              <h1>
                Advogado Especialista em <span>Direito Civil</span> em Joinville
              </h1>
              <p className="hero-description">
                Orientação jurídica com transparência e atenção ao seu caso.
                Clareza para decidir e segurança para seguir em frente.
              </p>
              <div className="hero-actions">
                <WhatsApp gold />
                <Button href="#atuacao" secondary>
                  Conheça nossa atuação
                </Button>
              </div>
              <div className="hero-proof">
                <div className="client-proof">
                  <div className="client-avatars" aria-hidden="true">
                    {[1, 2, 3].map((person) => (
                      <img
                        key={person}
                        src={`/images/people/person-${person}.jpg`}
                        alt=""
                        width="48"
                        height="48"
                      />
                    ))}
                  </div>
                  <div>
                    {clientStats.satisfiedClients !== null && (
                      <strong className="client-count">
                        +{clientStats.satisfiedClients.toLocaleString("pt-BR")}
                      </strong>
                    )}
                    <span>Clientes satisfeitos</span>
                    <a href="#avaliacoes">
                      Conheça suas experiências <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
                <a
                  className="hero-review-link"
                  href={contact.google}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hero-stars" aria-hidden="true">
                    ★★★★★
                  </span>
                  <span>
                    Avaliações no Google <ArrowUpRight size={12} />
                  </span>
                </a>
              </div>
              <p className="location">
                <MapPin size={16} />
                Atendimento em Joinville e em todo o Brasil
              </p>
            </div>
            <div className="hero-identity">
              <p>Filipi Marcelino Barbosa</p>
              <span>ADVOGADO · OAB/SC 60.331</span>
            </div>
          </div>
        </section>
        <div className="container benefits" aria-label="Nossos diferenciais">
          <div>
            <UsersRound />
            <h3>
              Atendimento <br />
              personalizado
            </h3>
          </div>
          <div>
            <ShieldCheck />
            <h3>
              Transparência <br />
              em cada etapa
            </h3>
          </div>
          <div>
            <Target />
            <h3>
              Abordagem <br />
              moderna e objetiva
            </h3>
          </div>
        </div>
        <section className="container section practice" id="atuacao">
          <div className="section-heading">
            <p className="eyebrow">ÁREAS DE ATUAÇÃO</p>
            <h2>Como podemos ajudar você</h2>
            <p>Atuação em diferentes áreas do Direito.</p>
          </div>
          <div className="area-grid">
            {areas.map((a) => {
              const Icon = icons[a.icon];
              return (
                <button
                  className="area-card"
                  key={a.name}
                  onClick={() => setSelected(a)}
                  aria-haspopup="dialog"
                >
                  <Icon size={46} strokeWidth={1.25} />
                  <h3>{a.name}</h3>
                  <p>{a.summary}</p>
                  <span>
                    Saiba mais <ArrowUpRight size={16} />
                  </span>
                </button>
              );
            })}
          </div>
        </section>
        <section className="container section about" id="escritorio">
          <div className="about-visual">
            <img
              src="/images/office.webp"
              alt="Pasta de documentos de Filipi Barbosa Advogados"
              loading="lazy"
            />
          </div>
          <div className="about-copy">
            <p className="eyebrow">O ESCRITÓRIO</p>
            <h2>
              Advocacia próxima.
              <br />
              <span>Compromisso com você.</span>
            </h2>
            <p>
              Um escritório jovem e dinâmico, com atuação pautada pelo
              profissionalismo, pela transparência e por uma abordagem moderna e
              objetiva.
            </p>
            <ul className="check-list">
              <li>
                <Check />
                Atenção às particularidades de cada caso
              </li>
              <li>
                <Check />
                Comunicação clara em cada etapa
              </li>
              <li>
                <Check />
                Orientação para decisões mais seguras
              </li>
            </ul>
            <Button href="#contato">Conheça o escritório</Button>
          </div>
        </section>
        <section className="section reviews-band" id="avaliacoes">
          <div className="container reviews">
            <div className="section-heading">
              <p className="eyebrow">DEPOIMENTOS</p>
              <h2>O que nossos clientes dizem</h2>
              <div className="google-title">
                <GoogleWord />
                <span>Avaliações no Google</span>
              </div>
            </div>
            <div className="review-grid">
              {reviews.map((review) => (
                <article className="review-card" key={review.name}>
                  <div className="review-top">
                    <span className="quote-mark" aria-hidden="true">
                      “
                    </span>
                    <img
                      className="google-letter"
                      src="/images/brands/google-g.png"
                      alt=""
                      aria-hidden="true"
                      width="24"
                      height="24"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="review-stars"
                    aria-label={`${review.rating} de 5 estrelas`}
                  >
                    {"★".repeat(review.rating)}
                  </div>
                  <blockquote>{review.text}</blockquote>
                  <div className="review-author">
                    <span className="review-avatar" aria-hidden="true">
                      {review.initials}
                    </span>
                    <div>
                      <h3>{review.name}</h3>
                      <time dateTime={review.date}>{review.dateLabel}</time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="reviews-source">
              Avaliações do Google reproduzidas do{" "}
              <a
                href="https://filipibarbosa.adv.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                site do escritório
              </a>
              . Consulte as avaliações atuais no Google.
            </p>
            <Button
              secondary
              href={contact.google}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver avaliações no Google
            </Button>
          </div>
        </section>
        <section
          className="container section conversation"
          aria-labelledby="conversation-title"
        >
          <MessageCircle
            className="conversation-icon"
            size={52}
            strokeWidth={1.2}
          />
          <div>
            <h2 id="conversation-title">Vamos conversar sobre o seu caso?</h2>
            <p>Entre em contato com nossa equipe.</p>
          </div>
          <WhatsApp gold>Conversar pelo WhatsApp</WhatsApp>
        </section>
        <section className="container section contact" id="contato">
          <div className="contact-copy">
            <p className="eyebrow">CONTATO</p>
            <h2>Fale com nossa equipe</h2>
            <p className="contact-intro">
              Estamos aqui para ouvir você e entender
              <br className="desktop-break" /> como podemos ajudar.
            </p>
            <a href={`tel:+${contact.whatsapp}`}>
              <Phone />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail />
              {contact.email}
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Rua+Minas+Gerais+1122+Nova+Brasilia+Joinville+SC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin />
              <span>
                {contact.address}
                <br />
                {contact.city}
              </span>
            </a>
            <a
              className="instagram-link"
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
              <span>
                Acompanhe no Instagram <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
          <form className="contact-form" onSubmit={submit}>
            <div className="form-grid">
              <label htmlFor="name">
                Nome
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    setSent(false);
                  }}
                  required
                  maxLength={100}
                />
              </label>
              <label htmlFor="phone">
                WhatsApp
                <input
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    setSent(false);
                  }}
                  required
                  pattern="[+() 0-9-]{10,20}"
                  title="Informe um telefone com DDD, entre 10 e 20 caracteres."
                  maxLength={20}
                />
              </label>
            </div>
            <label htmlFor="email">
              E-mail <span>(opcional)</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="seuemail@exemplo.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={150}
              />
            </label>
            <label htmlFor="message">
              Mensagem
              <textarea
                id="message"
                name="message"
                placeholder="Conte brevemente como podemos ajudar você"
                rows={4}
                value={form.message}
                onChange={(e) => {
                  setForm({ ...form, message: e.target.value });
                  setSent(false);
                }}
                required
                maxLength={2000}
              />
            </label>
            <p className="form-hint">
              Ao continuar, sua mensagem será aberta no WhatsApp para você
              revisar e enviar. Evite incluir dados sensíveis.
            </p>
            <button className="button" type="submit">
              Preparar mensagem <ArrowUpRight size={17} />
            </button>
            {sent && (
              <p role="status" className="form-status">
                Mensagem preparada. Conclua o envio no WhatsApp. Se a janela não
                abriu,{" "}
                <a
                  href={whatsappLink(formMessage(form))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clique aqui
                </a>
                .
              </p>
            )}
          </form>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand footer />
            <p>
              Advocacia com transparência
              <br />e proximidade.
            </p>
            <a
              href={contact.instagram}
              aria-label="Instagram de Filipi Barbosa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={19} />
            </a>
          </div>
          <div>
            <h3>Navegação</h3>
            {links.map(([label, url]) => (
              <a key={url} href={url}>
                {label}
              </a>
            ))}
          </div>
          <div>
            <h3>Áreas de atuação</h3>
            {areas.map((a) => (
              <button key={a.name} onClick={() => setSelected(a)}>
                {a.name}
              </button>
            ))}
          </div>
          <div className="footer-contact">
            <h3>Contato</h3>
            <a href={`tel:+${contact.whatsapp}`}>
              <Phone />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <Mail />
              {contact.email}
            </a>
            <p>
              <MapPin />
              <span>
                {contact.address}
                <br />
                {contact.city}
              </span>
            </p>
          </div>
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} Filipi Barbosa Advogados. Todos os
          direitos reservados.
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com a equipe pelo WhatsApp"
      >
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M26.5 15.6a10.8 10.8 0 0 1-15.9 9.6L5 27l1.8-5.4A10.8 10.8 0 1 1 26.5 15.6Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M11.8 10.5c-.4-.9-1.2-.7-1.6-.2-1.1 1.3-.8 3.1.5 5 1.6 2.5 3.6 4.1 6.3 5 .9.3 2.8.6 3.7-.8.4-.6.5-1.2 0-1.5l-2.4-1.2c-.4-.2-.7.2-1.3.9-.3.4-.5.3-1 .1-1.6-.7-2.8-1.9-3.6-3.4-.2-.3-.2-.4.1-.7.7-.7.9-.9.6-1.5l-1.3-1.7Z"
            fill="currentColor"
          />
        </svg>
      </a>
      {selected && (
        <AreaDialog area={selected} close={() => setSelected(null)} />
      )}
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
