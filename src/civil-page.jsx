import React, { useState } from "react";
import { Scale, MapPin, Phone, Mail, ArrowUpRight, MessageSquare, Check, Plus } from "lucide-react";
import { areas, contact } from "./content";
import { civilPath, civilMessage, civilServices, civilSteps, civilFaqs } from "./civil-content";
import { Header, Footer, WhatsApp, FloatingWhatsApp, AreaDialog, AreaLink } from "./shared";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Rua+Minas+Gerais+1122+Nova+Brasilia+Joinville+SC";
const pageLinks = [
  ["Sobre a atuação", "sobre-atuacao"],
  ["Situações atendidas", "situacoes-atendidas"],
  ["Atendimento", "atendimento"],
  ["Dúvidas frequentes", "duvidas-frequentes"],
  ["Contato", "contato"],
];

function ContactDetails({ email = false }) {
  return (
    <address className="civil-contact-details">
      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <MapPin size={19} aria-hidden="true" />
        <span>{contact.address}<br />{contact.city}</span>
      </a>
      <a href={`tel:+${contact.whatsapp}`}>
        <Phone size={18} aria-hidden="true" /><span>{contact.phone}</span>
      </a>
      {email && (
        <a href={`mailto:${contact.email}`}>
          <Mail size={18} aria-hidden="true" /><span>{contact.email}</span>
        </a>
      )}
    </address>
  );
}

export default function CivilPage() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" className="civil-page">
        <section className="civil-masthead" aria-labelledby="civil-title">
          <div className="container">
            <nav className="civil-breadcrumb" aria-label="Navegação estrutural">
              <ol>
                <li><a href="/">Início</a></li>
                <li><a href="/#atuacao">Áreas de atuação</a></li>
                <li aria-current="page">Direito Civil</li>
              </ol>
            </nav>
            <div className="civil-opening">
              <div className="civil-opening-copy">
                <p className="eyebrow">FILIPI BARBOSA ADVOGADOS</p>
                <h1 id="civil-title">Advogado de <span>Direito Civil</span> em Joinville</h1>
                <p className="civil-lead">Orientação jurídica em responsabilidade civil, indenizações e obrigações. Conheça nossa atuação e entenda como podemos analisar o seu caso.</p>
                <WhatsApp message={civilMessage}>Conversar sobre meu caso</WhatsApp>
                <p className="civil-location"><MapPin size={17} aria-hidden="true" />Joinville, Santa Catarina</p>
              </div>
              <div className="civil-symbol" aria-hidden="true">
                <Scale strokeWidth={0.85} />
                <p>Clareza para compreender.<br />Orientação para decidir.</p>
              </div>
            </div>
          </div>
        </section>

        <nav className="civil-page-nav" aria-label="Nesta página">
          <div className="container civil-page-nav-inner">
            <span>NESTA PÁGINA</span>
            <ul>{pageLinks.map(([label, id]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}</ul>
          </div>
        </nav>

        <div className="container civil-editorial">
          <div className="civil-article">
            <section id="sobre-atuacao" aria-labelledby="civil-about-title">
              <p className="eyebrow">SOBRE A ESPECIALIDADE</p>
              <h2 id="civil-about-title">Quando procurar um advogado de Direito Civil?</h2>
              <p>O Direito Civil está presente nas relações do dia a dia: em obrigações assumidas, conflitos entre particulares e situações que envolvem prejuízos. A orientação jurídica ajuda a compreender os direitos e deveres envolvidos em cada caso.</p>
              <p>Em Joinville, o escritório Filipi Barbosa oferece atendimento em questões de responsabilidade civil, indenizações e obrigações, com análise dos fatos e dos documentos apresentados.</p>
              <blockquote>Antes de definir um caminho, é preciso compreender a sua situação.</blockquote>
            </section>

            <section id="situacoes-atendidas" className="civil-situations" aria-labelledby="civil-services-title">
              <h2 id="civil-services-title">Como podemos ajudar no seu caso</h2>
              <p>A atuação é definida a partir da necessidade apresentada e das particularidades de cada situação.</p>
              <ol className="civil-service-list">
                {civilServices.map((service, index) => (
                  <li key={service.title}>
                    <span className="civil-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{service.title}</h3><p>{service.text}</p></div>
                  </li>
                ))}
              </ol>
              <div className="civil-case-note">
                <MessageSquare size={32} strokeWidth={1.25} aria-hidden="true" />
                <div><h3>Cada caso merece uma análise própria</h3><p>A orientação depende dos fatos e documentos apresentados. O atendimento não representa promessa de resultado.</p></div>
              </div>
            </section>
          </div>

          <aside className="civil-sidebar" aria-label="Especialidades e informações do escritório">
            <nav className="civil-sidebar-areas" aria-labelledby="civil-areas-title">
              <h2 id="civil-areas-title">Áreas de atuação</h2>
              <ul>
                {areas.map(area => (
                  <li key={area.name}>
                    <AreaLink area={area} onAreaSelect={setSelected} aria-current={area.href === civilPath ? "page" : undefined}>
                      {area.name}{area.href === civilPath && <ArrowUpRight size={16} aria-hidden="true" />}
                    </AreaLink>
                  </li>
                ))}
              </ul>
            </nav>
            <section className="civil-sidebar-contact" aria-labelledby="civil-sidebar-contact-title">
              <p className="eyebrow">ATENDIMENTO LOCAL</p>
              <h2 id="civil-sidebar-contact-title">Direito Civil em Joinville</h2>
              <ContactDetails />
              <WhatsApp message={civilMessage} gold>Entrar em contato</WhatsApp>
              <a className="civil-text-link" href={mapUrl} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight size={15} aria-hidden="true" /></a>
            </section>
            <section className="civil-lawyer" aria-labelledby="civil-lawyer-name">
              <img src="/images/filipi-barbosa.webp" alt="Filipi Marcelino Barbosa, advogado em Joinville, OAB/SC 60.331" width="1122" height="1402" loading="lazy" />
              <h2 id="civil-lawyer-name">Filipi Marcelino Barbosa</h2>
              <p className="civil-credential">ADVOGADO · OAB/SC 60.331</p>
              <p>Atendimento próximo, com comunicação clara e atenção aos detalhes do seu caso.</p>
              <a className="civil-text-link" href="/#escritorio">Conheça o escritório <ArrowUpRight size={15} aria-hidden="true" /></a>
            </section>
          </aside>
        </div>

        <section className="civil-process civil-section" id="atendimento" aria-labelledby="civil-process-title">
          <div className="container">
            <p className="eyebrow">ETAPAS DO ATENDIMENTO</p>
            <h2 id="civil-process-title">Entenda os próximos passos</h2>
            <ol className="civil-step-list">
              {civilSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="civil-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="civil-section civil-faq" id="duvidas-frequentes" aria-labelledby="civil-faq-title">
          <div className="container">
            <p className="eyebrow">PERGUNTAS FREQUENTES</p>
            <h2 id="civil-faq-title">Dúvidas sobre Direito Civil em Joinville</h2>
            <div className="civil-faq-grid">
              <div className="civil-accordions">
                {civilFaqs.map((faq, index) => (
                  <details className="civil-faq-item" name="civil-faq" key={faq.question}>
                    <summary id={`civil-question-${index}`}><span>{faq.question}</span><Plus size={19} strokeWidth={1.5} aria-hidden="true" /></summary>
                    <div className="civil-faq-answer" role="region" aria-labelledby={`civil-question-${index}`}><p>{faq.answer}</p></div>
                  </details>
                ))}
              </div>
              <aside className="civil-checklist" aria-labelledby="civil-checklist-title">
                <h3 id="civil-checklist-title">Para o primeiro contato</h3>
                <ul>{["Resumo do ocorrido", "Datas e informações relevantes", "Documentos relacionados"].map(item => <li key={item}><Check size={20} strokeWidth={1.7} aria-hidden="true" /><span>{item}</span></li>)}</ul>
                <p>A documentação necessária será orientada conforme o caso.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="civil-local civil-section" id="contato" aria-labelledby="civil-local-title">
          <div className="container">
            <div className="civil-local-grid">
              <div>
                <p className="eyebrow">JOINVILLE · SANTA CATARINA</p>
                <h2 id="civil-local-title">Orientação em Direito Civil,<br />perto de você.</h2>
                <p>Atendimento em Joinville, com escuta e clareza para compreender sua situação e avaliar os próximos passos.</p>
              </div>
              <div className="civil-local-contact">
                <ContactDetails email />
                <WhatsApp message={civilMessage} />
              </div>
            </div>
            <nav className="civil-related" aria-label="Outras especialidades">
              <span>Outras especialidades:</span>
              <ul>{areas.filter(area => area.href !== civilPath).map(area => <li key={area.name}><AreaLink area={area} onAreaSelect={setSelected}>{area.name}</AreaLink></li>)}</ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer onAreaSelect={setSelected} spacious />
      <FloatingWhatsApp message={civilMessage} />
      {selected && <AreaDialog area={selected} close={() => setSelected(null)} />}
    </>
  );
}
