import { ArrowRight, FolderOpen, MapPin, ShieldCheck } from "lucide-react";

const CAMPAIGN_CNPJ = "68.545.092/0001-29";

export default function RegionGateway() {
  return (
    <main className="region-gateway">
      <div className="region-gateway-glow region-gateway-glow-one" />
      <div className="region-gateway-glow region-gateway-glow-two" />
      <header className="region-gateway-header">
        <img src="/media/juliana-logo.png" alt="Juliana 1020" />
        <span><ShieldCheck size={15} /> Central oficial de materiais</span>
      </header>
      <section className="region-gateway-content">
        <div className="region-gateway-copy">
          <span className="eyebrow"><span /> Escolha sua região</span>
          <h1>Conteúdo certo,<br /><em>mais perto de você.</em></h1>
          <p>Entre na central da sua região para encontrar fotos, vídeos, músicas, figurinhas e materiais organizados para cada equipe.</p>
        </div>
        <div className="region-choice-grid">
          <a className="region-choice region-choice-north" href="/central/norte">
            <span className="region-choice-icon"><MapPin /></span>
            <small>Central regional</small>
            <strong>Região Norte</strong>
            <p>Materiais e conteúdos organizados para os municípios da Região Norte de Mato Grosso.</p>
            <b>Acessar materiais <ArrowRight /></b>
          </a>
          <a className="region-choice region-choice-araguaia" href="/central/vale-do-araguaia">
            <span className="region-choice-icon"><FolderOpen /></span>
            <small>Central regional</small>
            <strong>Vale do Araguaia</strong>
            <p>Materiais e conteúdos direcionados às equipes e apoiadores do Vale do Araguaia.</p>
            <b>Acessar materiais <ArrowRight /></b>
          </a>
        </div>
        <p className="region-gateway-help">Você poderá trocar de região a qualquer momento.</p>
      </section>
      <footer className="region-gateway-footer">
        <span>Juliana • Candidata a deputada federal <a href="/admin">Painel administrativo</a></span>
        <small>CNPJ da campanha: {CAMPAIGN_CNPJ}</small>
      </footer>
    </main>
  );
}
