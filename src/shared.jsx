import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Scale, UsersRound, House, Landmark, FilePenLine, FileBadge, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { areas, contact, whatsappLink } from "./content";
const icons = { scale: Scale, users: UsersRound, award: FileBadge, house: House, landmark: Landmark, file: FilePenLine };
const links = [["Início", "/#inicio"], ["O escritório", "/#escritorio"], ["Áreas de atuação", "/#atuacao"], ["Contato", "/#contato"]];
export function Brand({ footer = false }) {
  return (
    <a
      className={`brand ${footer ? "brand-light" : ""}`}
      href="/#inicio"
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
export function Button({
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
export function WhatsApp({ children = "Fale com um advogado", message, ...props }) {
  return (
    <Button
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </Button>
  );
}
export function AreaDialog({ area, close }) {
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
export function AreaLink({ area, onAreaSelect, children, ...props }) {
  if (area.href) return <a href={area.href} {...props}>{children}</a>;
  return <button type="button" onClick={() => onAreaSelect(area)} aria-haspopup="dialog" {...props}>{children}</button>;
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => {
    if (!menu) return;
    const key = (event) => {
      if (event.key === "Escape") { setMenu(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [menu]);
  return (      <header className="site-header">
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
);
}
export function Footer({ onAreaSelect, spacious = false }) {
  return (      <footer className={`site-footer ${spacious ? "service-footer" : ""}`}>
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
              <AreaLink key={a.name} area={a} onAreaSelect={onAreaSelect}>
                {a.name}
              </AreaLink>
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
);
}
export function FloatingWhatsApp({ message }) {
  return (      <a
        className="floating-whatsapp"
        href={whatsappLink(message)}
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
);
}
