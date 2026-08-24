"use client";

import {
  ArrowDownToLine,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  Camera,
  Check,
  ChevronDown,
  CircleUserRound,
  Download,
  FileText,
  FolderOpen,
  HandHeart,
  HeartHandshake,
  Home as HomeIcon,
  Hospital,
  Image as ImageIcon,
  Leaf,
  Menu,
  MessageCircle,
  Music2,
  Play,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Tractor,
  Upload,
  UsersRound,
  Video,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  archiveCounts,
  collectionFolders,
  driveDownload,
  driveFolder,
  drivePreview,
  driveView,
  materials,
  type Material,
  type MaterialKind,
} from "./materials";

const typeFilters = [
  "Todos",
  "Vídeos",
  "Fotos",
  "Músicas",
  "Artes",
  "Logos",
  "Impressos",
  "Documentos",
  "Identidade",
] as const;

const featuredIds = [
  "video-1E6FsQ9OMpRsvIRNM1zia7rP6fzb80rQ2",
  "video-1XpusBENWqAQ1QRfntrbiGmvyc-aBFU02",
  "video-1gBd2krPZhqNqrcBuh3Ia5HxZxWrDolKE",
  "arte-1zFh-2DySkIEwRyVsamHIIVBk0AQtjL3Q",
  "foto-1m0PThl54L8N7J2iALMjEXB_QW9_HnKW_",
  "audio-1gsgmMbwnY1zwpzokl8j3sXeXN-v-U3yQ",
];

const proposals: Array<{
  id: string;
  title: string;
  kicker: string;
  summary: string;
  stat: string;
  statLabel: string;
  points: string[];
  image: string;
  icon: LucideIcon;
  tone: string;
}> = [
  {
    id: "mulheres",
    title: "Proteção e autonomia para mulheres",
    kicker: "Casa Lilás",
    summary:
      "Acolhimento seguro para mulheres com medida protetiva, unido a qualificação, renda e reconstrução de vida.",
    stat: "10",
    statLabel: "kitnets de acolhimento",
    points: [
      "Moradia temporária e proteção para vítimas de violência doméstica.",
      "Acesso integrado aos programas sociais do município.",
      "Capacitação técnica para autonomia e geração de renda.",
    ],
    image: "/media/vila-lilas.webp",
    icon: ShieldCheck,
    tone: "violet",
  },
  {
    id: "habitacao",
    title: "Habitação e casa própria",
    kicker: "Moradia digna",
    summary:
      "Trabalho para ampliar o acesso à casa própria e mudar a realidade de famílias de baixa renda.",
    stat: "110",
    statLabel: "moradias entregues ou em construção",
    points: [
      "50 unidades entregues em parceria com o Governo do Estado.",
      "Economia de recursos permitiu entregar outras 10 casas.",
      "Mais 50 unidades estão em construção.",
    ],
    image: "/media/a-cada-tijolo.jpg",
    icon: HomeIcon,
    tone: "yellow",
  },
  {
    id: "saude",
    title: "Saúde forte perto de casa",
    kicker: "Descentralização",
    summary:
      "Fortalecer o Hospital Regional de Água Boa para reduzir viagens e levar serviços complexos ao interior.",
    stat: "11",
    statLabel: "municípios atendidos pelo hospital",
    points: [
      "Ampliação dos serviços, incluindo hemodiálise.",
      "Perspectiva de procedimentos de maior complexidade.",
      "Menos deslocamentos para grandes centros e capitais.",
    ],
    image: "/media/juliana-31.jpg",
    icon: Hospital,
    tone: "green",
  },
  {
    id: "idosos",
    title: "Respeito e cuidado com a pessoa idosa",
    kicker: "Melhor idade",
    summary:
      "Convivência, lazer, acolhimento e uma estrutura regional preparada para cuidar de quem construiu nossa história.",
    stat: "1",
    statLabel: "ILPI regional em construção",
    points: [
      "Encontros, viagens, festas culturais e integração social.",
      "Ações permanentes para qualidade de vida e pertencimento.",
      "Instituição de Longa Permanência planejada como referência regional.",
    ],
    image: "/media/melhor-idade.webp",
    icon: HandHeart,
    tone: "orange",
  },
  {
    id: "araguaia",
    title: "Desenvolvimento com segurança jurídica",
    kicker: "Vale do Araguaia",
    summary:
      "Atuação firme contra o PL 909/2024 e seus possíveis impactos sobre cidades, produtores e áreas produtivas.",
    stat: "34 mil+",
    statLabel: "propriedades alcançadas pelo projeto",
    points: [
      "Solicitou análise também pela Comissão de Agricultura.",
      "Pediu audiência pública e foi relatora da proposta.",
      "Apresentou parecer pela rejeição do corredor ecológico.",
    ],
    image: "/media/vale-do-araguaia.webp",
    icon: Leaf,
    tone: "blue",
  },
  {
    id: "pronaf",
    title: "Crédito para a agricultura familiar",
    kicker: "Pronaf",
    summary:
      "Relatoria que ajudou a ampliar as garantias para quem produz alimento e movimenta a economia no campo.",
    stat: "R$ 500 mi",
    statLabel: "em garantias adicionais de crédito",
    points: [
      "Aporte adicional no Fundo Garantidor de Operações.",
      "Mais acesso ao financiamento para agricultores familiares.",
      "Texto aprovado e transformado na Lei nº 15.034/2024.",
    ],
    image: "/media/juliana-34.jpg",
    icon: Tractor,
    tone: "lime",
  },
];

const biographySteps = [
  {
    year: "Raízes",
    title: "Do Paraná para uma vida de desafios",
    text: "Nascida em Palmas, no Paraná, Juliana é filha de Ivete Souza e Nelson Souza e cresceu em uma família de quatro mulheres. Desde cedo aprendeu o valor do trabalho, da coragem e da união.",
  },
  {
    year: "2007",
    title: "Água Boa virou casa",
    text: "Ao lado do marido, o médico Mariano Kolankiewicz Filho, conheceu Água Boa por causa das raízes rurais de seu pai na região. O casal escolheu a cidade para viver e criar Nelson, José Pedro e Helena.",
  },
  {
    year: "Gestão",
    title: "Política feita perto das pessoas",
    text: "Como secretária de Assistência Social, liderou ações de habitação, cuidado com idosos e oficinas de qualificação para mulheres, sempre com a ideia de criar autonomia e novas oportunidades.",
  },
  {
    year: "2022",
    title: "16.385 votos e uma voz que ganhou força",
    text: "A convite de Otaviano Pivetta, disputou sua primeira eleição para deputada federal. A votação a colocou como suplente e confirmou a força de um projeto nascido no Vale do Araguaia.",
  },
  {
    year: "2024",
    title: "Quatro meses de mandato, trabalho que ficou",
    text: "Assumiu uma cadeira na Câmara dos Deputados e atuou em pautas decisivas: foi relatora do Pronaf e enfrentou projetos com potencial de travar o desenvolvimento regional.",
  },
  {
    year: "Agora",
    title: "A candidata a Deputada do Araguaia",
    text: "Veterinária, mãe e candidata a deputada federal pelo Republicanos, Juliana trabalha para garantir quatro anos de representação permanente ao Vale do Araguaia em Brasília.",
  },
];

const categoryCards: Array<{
  label: MaterialKind;
  count: number;
  description: string;
  icon: LucideIcon;
}> = [
  { label: "Vídeos", count: archiveCounts.videos, description: "Agenda, propostas e mobilização", icon: Video },
  { label: "Fotos", count: archiveCounts.photos, description: "Retratos oficiais em alta", icon: Camera },
  { label: "Músicas", count: archiveCounts.audios, description: "Jingles e versões oficiais", icon: Music2 },
  { label: "Artes", count: archiveCounts.arts, description: "Posts prontos para compartilhar", icon: ImageIcon },
  { label: "Logos", count: archiveCounts.logos, description: "Assinaturas da identidade", icon: BadgeCheck },
  { label: "Impressos", count: archiveCounts.prints, description: "Arquivos prontos para gráfica", icon: FileText },
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

const materialHref = (material: Material) => {
  if (material.localFile) return material.localFile;
  if (material.folderId) return driveFolder(material.folderId);
  if (material.driveId) return driveView(material.driveId);
  return "#";
};

const materialDownloadHref = (material: Material) => {
  if (material.localFile) return material.localFile;
  if (material.folderId) return driveFolder(material.folderId);
  if (material.driveId) return driveDownload(material.driveId);
  return "#";
};

const kindIcon: Record<MaterialKind, LucideIcon> = {
  Fotos: Camera,
  Vídeos: Video,
  Músicas: Music2,
  Artes: ImageIcon,
  Logos: BadgeCheck,
  Impressos: FileText,
  Documentos: BookOpen,
  Identidade: Sparkles,
};

function MaterialArtwork({ material }: { material: Material }) {
  const Icon = kindIcon[material.kind];

  if (material.thumb) {
    return (
      <div className={`archive-artwork ${material.kind === "Logos" ? "logo-artwork" : ""}`}>
        <img src={material.thumb} alt={`Prévia de ${material.title}`} loading="lazy" />
        {material.kind === "Vídeos" ? (
          <span className="play-orb" aria-hidden="true"><Play size={19} fill="currentColor" /></span>
        ) : null}
        <span className="kind-chip">{material.kind}</span>
      </div>
    );
  }

  return (
    <div className={`archive-artwork abstract-artwork abstract-${material.kind.toLowerCase()}`}>
      <span className="abstract-number">1020</span>
      <Icon size={34} strokeWidth={1.8} />
      <strong>{material.kind}</strong>
      <span className="kind-chip">{material.format}</span>
    </div>
  );
}

function MaterialCard({
  material,
  onPreview,
  onShare,
}: {
  material: Material;
  onPreview: (material: Material) => void;
  onShare: (material: Material) => void;
}) {
  const canPreview = material.kind === "Vídeos" || Boolean(material.thumb);
  const isAudio = material.kind === "Músicas" && material.driveId;

  return (
    <article className="archive-card">
      <button
        className="artwork-button"
        type="button"
        onClick={() => (canPreview ? onPreview(material) : window.open(materialHref(material), "_blank", "noopener,noreferrer"))}
        aria-label={`${canPreview ? "Visualizar" : "Abrir"} ${material.title}`}
      >
        <MaterialArtwork material={material} />
      </button>
      <div className="archive-card-body">
        <div className="archive-meta">
          <span>{material.theme}</span>
          <small>{material.format}</small>
        </div>
        <h3>{material.title}</h3>
        {material.description ? <p>{material.description}</p> : null}
        {isAudio ? (
          // Jingles are music files; there is no spoken-word caption track.
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio controls preload="none" src={driveDownload(material.driveId!)}>
            Seu navegador não suporta áudio.
          </audio>
        ) : null}
        <div className="archive-actions">
          <a href={materialDownloadHref(material)} target="_blank" rel="noreferrer" download={Boolean(material.localFile)}>
            <Download size={15} /> Baixar
          </a>
          <button type="button" onClick={() => onShare(material)} aria-label={`Compartilhar ${material.title}`}>
            <Share2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function MaterialModal({ material, onClose }: { material: Material; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="media-modal" role="dialog" aria-modal="true" aria-label={material.title}>
      <div className="media-dialog">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar visualização"><X /></button>
        <div className="modal-stage">
          {material.kind === "Vídeos" && material.driveId ? (
            <iframe src={drivePreview(material.driveId)} title={material.title} allow="autoplay; fullscreen" />
          ) : material.thumb ? (
            <img src={material.thumb.replace(/sz=w\d+/, "sz=w1600")} alt={material.title} />
          ) : null}
        </div>
        <div className="modal-copy">
          <span>{material.kind} • {material.theme}</span>
          <h3>{material.title}</h3>
          <div>
            <a className="button button-primary" href={materialDownloadHref(material)} target="_blank" rel="noreferrer"><Download size={17} /> Baixar arquivo</a>
            <a className="button button-soft" href={materialHref(material)} target="_blank" rel="noreferrer"><FolderOpen size={17} /> Abrir no Drive</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]>("Todos");
  const [themeFilter, setThemeFilter] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(18);
  const [activeProposal, setActiveProposal] = useState(proposals[0].id);
  const [modalMaterial, setModalMaterial] = useState<Material | null>(null);
  const [toast, setToast] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const archiveRef = useRef<HTMLElement>(null);

  const featured = useMemo(
    () => featuredIds.map((id) => materials.find((material) => material.id === id)).filter(Boolean) as Material[],
    [],
  );

  const themes = useMemo(
    () => ["Todos", ...Array.from(new Set(materials.map((material) => material.theme))).sort((a, b) => a.localeCompare(b, "pt-BR"))],
    [],
  );

  const filteredMaterials = useMemo(() => {
    const search = normalize(query.trim());
    return materials.filter((material) => {
      const matchesType = typeFilter === "Todos" || material.kind === typeFilter;
      const matchesTheme = themeFilter === "Todos" || material.theme === themeFilter;
      const haystack = normalize(`${material.title} ${material.kind} ${material.format} ${material.theme} ${material.description ?? ""}`);
      return matchesType && matchesTheme && (!search || haystack.includes(search));
    });
  }, [query, themeFilter, typeFilter]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const chooseCategory = (kind: MaterialKind) => {
    setTypeFilter(kind);
    setThemeFilter("Todos");
    setVisibleCount(18);
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const shareMaterial = async (material: Material) => {
    const url = materialHref(material);
    const text = `${material.title} — material oficial Juliana 1020`;
    try {
      if (navigator.share) {
        await navigator.share({ title: material.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        notify("Link copiado para compartilhar!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") notify("Não foi possível compartilhar agora.");
    }
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });

  const downloadAvatar = async () => {
    if (!photoUrl) return;
    const [photo, logo] = await Promise.all([
      loadImage(photoUrl),
      loadImage("/media/juliana-logo.png"),
    ]);
    const size = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) return;

    const center = size / 2;
    const radius = 496;
    const diameter = radius * 2;
    context.clearRect(0, 0, size, size);
    context.save();
    context.beginPath();
    context.arc(center, center, radius - 18, 0, Math.PI * 2);
    context.clip();
    context.fillStyle = "#eaf1f9";
    context.fillRect(0, 0, size, size);
    const imageScale = Math.max(diameter / photo.width, diameter / photo.height) * zoom;
    const drawWidth = photo.width * imageScale;
    const drawHeight = photo.height * imageScale;
    const offsetX = (panX / 100) * diameter * 0.36;
    const offsetY = (panY / 100) * diameter * 0.36;
    context.drawImage(photo, center - drawWidth / 2 + offsetX, center - drawHeight / 2 + offsetY, drawWidth, drawHeight);
    const shade = context.createLinearGradient(0, 570, 0, 1030);
    shade.addColorStop(0, "rgba(13,50,111,0)");
    shade.addColorStop(1, "rgba(13,50,111,.54)");
    context.fillStyle = shade;
    context.fillRect(0, 530, size, 550);
    context.restore();

    context.lineWidth = 34;
    context.strokeStyle = "#194891";
    context.beginPath();
    context.arc(center, center, radius, 0, Math.PI * 2);
    context.stroke();
    context.lineWidth = 18;
    context.strokeStyle = "#F7E02A";
    context.beginPath();
    context.arc(center, center, radius - 17, -Math.PI * 0.88, -Math.PI * 0.15);
    context.stroke();
    context.strokeStyle = "#229E49";
    context.beginPath();
    context.arc(center, center, radius - 17, Math.PI * 0.12, Math.PI * 0.77);
    context.stroke();

    const badgeX = 180;
    const badgeY = 785;
    const badgeWidth = 720;
    const badgeHeight = 190;
    context.fillStyle = "rgba(13,50,111,.96)";
    context.beginPath();
    context.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 48);
    context.fill();
    context.fillStyle = "#F7E02A";
    context.font = "800 27px Arial";
    context.textAlign = "center";
    context.fillText("EU TÔ COM A DEPUTADA DO ARAGUAIA", center, badgeY + 43);
    const logoScale = Math.min(610 / logo.width, 122 / logo.height);
    const logoWidth = logo.width * logoScale;
    const logoHeight = logo.height * logoScale;
    context.drawImage(logo, center - logoWidth / 2, badgeY + 55, logoWidth, logoHeight);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "avatar-juliana-1020.png";
      link.click();
      URL.revokeObjectURL(url);
      notify("Avatar pronto! Agora é só usar no seu perfil.");
    }, "image/png");
  };

  const selectedProposal = proposals.find((proposal) => proposal.id === activeProposal) ?? proposals[0];
  const ProposalIcon = selectedProposal.icon;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Central Juliana 1020"><img src="/media/juliana-logo.png" alt="Juliana 1020" /></a>
        <nav className={menuOpen ? "open" : ""} aria-label="Navegação principal">
          <a href="#materiais" onClick={() => setMenuOpen(false)}>Materiais</a>
          <a href="#propostas" onClick={() => setMenuOpen(false)}>Propostas</a>
          <a href="#historia" onClick={() => setMenuOpen(false)}>Quem é Juliana</a>
          <a href="#avatar" onClick={() => setMenuOpen(false)}>Minha foto</a>
          <a href="https://whatsapp.com/channel/0029Vb8J3XW8F2p68rcnif34" target="_blank" rel="noreferrer">Figurinhas</a>
        </nav>
        <a className="header-cta" href="#materiais"><Download size={17} /> Baixar materiais</a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="hero-copy">
          <span className="eyebrow"><span /> Central oficial de campanha</span>
          <h1>Tudo da Juliana.<br /><em>Pronto para usar.</em></h1>
          <p>Fotos, vídeos, músicas, propostas, artes e arquivos oficiais para levar a força do Vale do Araguaia ainda mais longe.</p>
          <form className="hero-search" onSubmit={submitSearch}>
            <Search size={22} /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(18); }} placeholder="Busque por vídeo, saúde, Araguaia, jingle..." aria-label="Buscar materiais" /><button type="submit">Encontrar</button>
          </form>
          <div className="hero-actions">
            <a className="button button-yellow" href="#materiais"><FolderOpen size={18} /> Explorar {archiveCounts.total} arquivos</a>
            <a className="button button-ghost-light" href="#avatar"><CircleUserRound size={18} /> Criar meu avatar</a>
          </div>
          <div className="hero-proof"><span><Check size={14} /> Download direto</span><span><Check size={14} /> Organizado por tema</span><span><Check size={14} /> Feito para celular</span></div>
        </div>
        <div className="hero-visual" aria-label="Fotos oficiais de Juliana">
          <span className="hero-number">1020</span>
          <div className="hero-photo main-photo"><img src="/media/juliana-34.jpg" alt="Juliana, candidata a deputada federal" /></div>
          <div className="hero-photo mini-photo photo-a"><img src="/media/juliana-17.jpg" alt="Juliana em foto oficial" /></div>
          <div className="hero-photo mini-photo photo-b"><img src="/media/juliana-45.jpg" alt="Juliana em foto oficial" /></div>
          <div className="floating-label label-top"><Sparkles size={15} /> Deputada do Araguaia</div>
          <div className="floating-label label-bottom"><strong>{archiveCounts.videos}</strong><span>vídeos para assistir<br />e compartilhar</span></div>
          <img className="hero-symbol" src="/media/juliana-simbolo.png" alt="" />
        </div>
      </section>

      <section className="archive-summary" aria-label="Resumo do acervo">
        <div><strong>{archiveCounts.total}</strong><span>arquivos<br />mapeados</span></div><div><strong>{archiveCounts.photos}</strong><span>fotos<br />oficiais</span></div><div><strong>{archiveCounts.videos}</strong><span>vídeos<br />completos</span></div><div><strong>{archiveCounts.audios}</strong><span>músicas<br />e jingles</span></div><div><strong>{archiveCounts.fonts}</strong><span>arquivos<br />de fonte</span></div>
      </section>

      <section className="section category-section">
        <div className="section-heading"><div><span className="eyebrow dark"><span /> Vá direto ao que precisa</span><h2>Uma central feita para<br />encontrar em segundos.</h2></div><p>Escolha uma categoria e veja cada arquivo disponível — sem pedir no grupo, sem esperar a equipe responder.</p></div>
        <div className="category-grid">
          {categoryCards.map((category, index) => { const Icon = category.icon; return <button type="button" className={`category-card category-${index + 1}`} key={category.label} onClick={() => chooseCategory(category.label)}><span className="category-icon"><Icon /></span><span className="category-count">{String(category.count).padStart(2, "0")}</span><strong>{category.label}</strong><small>{category.description}</small><span className="category-arrow"><ArrowRight size={17} /></span></button>; })}
        </div>
      </section>

      <section className="blue-showcase">
        <div className="showcase-heading"><div><span className="eyebrow light"><span /> Seleção da campanha</span><h2>Conteúdo que já<br />está em movimento.</h2></div><p>Assista, baixe e encaminhe. Os materiais abrem aqui e os arquivos originais continuam seguros no Drive.</p></div>
        <div className="featured-track">
          {featured.map((material, index) => <article className={`featured-card featured-${index + 1}`} key={material.id}>{material.thumb ? <img src={material.thumb} alt={`Prévia de ${material.title}`} /> : <div className="music-cover"><Music2 /><span>JULIANA</span><strong>1020</strong></div>}<div className="featured-overlay"><span>{material.kind}</span><h3>{material.title}</h3><button type="button" onClick={() => material.kind === "Músicas" ? window.open(materialHref(material), "_blank", "noopener,noreferrer") : setModalMaterial(material)}>{material.kind === "Vídeos" ? <Play size={16} fill="currentColor" /> : <ArrowDownToLine size={16} />}{material.kind === "Vídeos" ? "Assistir" : "Abrir"}</button></div></article>)}
        </div>
      </section>

      <section className="story-section" id="historia">
        <div className="story-intro">
          <div className="story-photo-stack"><div className="story-photo story-photo-main"><img src="/media/juliana-27.jpg" alt="Retrato de Juliana" /></div><div className="story-photo story-photo-small"><img src="/media/juliana-39.jpg" alt="Juliana em foto oficial" /></div><div className="story-stamp"><span>16.385</span><small>votos em sua<br />primeira eleição</small></div></div>
          <div className="story-copy"><span className="eyebrow dark"><span /> Quem é Juliana</span><h2>Uma história de família, trabalho e coragem para agir.</h2><p className="story-lead">Juliana Kolankiewicz é médica-veterinária, mãe de três filhos e candidata a deputada federal pelo Republicanos. Sua vida pública nasceu do trabalho social em Água Boa e ganhou o Vale do Araguaia.</p><blockquote>“O Araguaia merece uma voz presente todos os dias em Brasília.”</blockquote><div className="story-tags"><span><HeartHandshake size={16} /> Família</span><span><UsersRound size={16} /> Trabalho social</span><span><Building2 size={16} /> Experiência</span></div></div>
        </div>
        <div className="biography-timeline">{biographySteps.map((step, index) => <article key={step.year}><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span><small>{step.year}</small><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        <div className="story-manifesto"><div><span className="eyebrow light"><span /> Presença em Brasília</span><h3>Quatro meses mostraram o que é possível. Agora, o trabalho é por quatro anos.</h3></div><div className="manifesto-points"><span><strong>2024</strong> assumiu na Câmara</span><span><strong>PL 909</strong> defesa do Araguaia</span><span><strong>Pronaf</strong> relatoria aprovada</span><span><strong>Agora</strong> candidata federal</span></div></div>
      </section>

      <section className="proposals-section" id="propostas">
        <div className="section-heading proposals-heading"><div><span className="eyebrow dark"><span /> Projetos e bandeiras</span><h2>Propostas para ver,<br />entender e compartilhar.</h2></div><div className="heading-actions"><p>Informação direta, organizada por impacto — sem transformar a página em um texto longo.</p><a className="button button-primary" href="/media/propostas-juliana.pdf" target="_blank" rel="noreferrer"><FileText size={17} /> Baixar propostas em PDF</a></div></div>
        <div className="proposal-selector">{proposals.map((proposal) => { const Icon = proposal.icon; const active = proposal.id === activeProposal; return <button type="button" key={proposal.id} className={`${proposal.tone} ${active ? "active" : ""}`} onClick={() => setActiveProposal(proposal.id)} aria-expanded={active}><span><Icon /></span><small>{proposal.kicker}</small><strong>{proposal.title}</strong><ChevronDown size={17} /></button>; })}</div>
        <article className={`proposal-detail detail-${selectedProposal.tone}`}><div className="proposal-image"><img src={selectedProposal.image} alt={`Material sobre ${selectedProposal.title}`} /><span><ProposalIcon /> {selectedProposal.kicker}</span></div><div className="proposal-copy"><span className="proposal-overline">O que muda na prática</span><h3>{selectedProposal.title}</h3><p>{selectedProposal.summary}</p><div className="proposal-stat"><strong>{selectedProposal.stat}</strong><span>{selectedProposal.statLabel}</span></div><ul>{selectedProposal.points.map((point) => <li key={point}><Check />{point}</li>)}</ul></div></article>
      </section>

      <section className="avatar-section" id="avatar">
        <div className="avatar-copy"><span className="eyebrow light"><span /> Minha foto com Juliana</span><h2>Seu perfil também pode vestir essa campanha.</h2><p>Agora a montagem foi pensada para foto de perfil: formato circular, enquadramento protegido e assinatura oficial dentro da área que aparece no WhatsApp e no Instagram.</p><div className="avatar-steps"><span><b>1</b><i><strong>Envie sua foto</strong><small>Nada sai do seu aparelho</small></i></span><span><b>2</b><i><strong>Ajuste o rosto</strong><small>Zoom e posição em três controles</small></i></span><span><b>3</b><i><strong>Baixe o avatar</strong><small>PNG pronto para o perfil</small></i></span></div><label className="upload-button"><Upload size={18} /> Escolher minha foto<input type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} /></label><span className="privacy-note"><ShieldCheck size={14} /> Sua foto é processada apenas no navegador.</span></div>
        <div className="avatar-workspace"><div className="avatar-preview-shell"><div className="avatar-preview">{photoUrl ? <img src={photoUrl} alt="Prévia da sua foto com a identidade Juliana" style={{ transform: `translate(${panX * 0.33}%, ${panY * 0.33}%) scale(${zoom})` }} /> : <div className="avatar-empty"><CircleUserRound /><strong>Sua foto aqui</strong><small>O recorte final será circular</small></div>}<div className="avatar-shade" /><div className="avatar-ring ring-yellow" /><div className="avatar-ring ring-green" /><div className="avatar-badge"><small>EU TÔ COM A DEPUTADA DO ARAGUAIA</small><img src="/media/juliana-logo.png" alt="Juliana 1020" /></div></div></div><div className="avatar-controls"><label><span>Zoom</span><input type="range" min="1" max="2.2" step="0.02" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} /></label><label><span>Horizontal</span><input type="range" min="-55" max="55" step="1" value={panX} onChange={(event) => setPanX(Number(event.target.value))} /></label><label><span>Vertical</span><input type="range" min="-55" max="55" step="1" value={panY} onChange={(event) => setPanY(Number(event.target.value))} /></label></div><button className="button button-yellow download-avatar" type="button" disabled={!photoUrl} onClick={downloadAvatar}><Download size={18} /> Baixar avatar redondo</button></div>
      </section>

      <section className="library-section" id="materiais" ref={archiveRef}>
        <div className="library-heading"><div><span className="eyebrow dark"><span /> Acervo completo</span><h2>Nada escondido.<br />Tudo em um só lugar.</h2><p>{archiveCounts.total} arquivos mapeados nas pastas oficiais, incluindo {archiveCounts.videos} vídeos, {archiveCounts.photos} fotos e {archiveCounts.audios} músicas.</p></div><form className="library-search" onSubmit={submitSearch}><Search size={20} /><input value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(18); }} placeholder="Buscar no acervo..." aria-label="Buscar no acervo" />{query ? <button type="button" onClick={() => { setQuery(""); setVisibleCount(18); }} aria-label="Limpar busca"><X size={17} /></button> : null}</form></div>
        <div className="filter-scroll" aria-label="Filtrar por formato">{typeFilters.map((type) => <button type="button" key={type} className={typeFilter === type ? "active" : ""} onClick={() => { setTypeFilter(type); setVisibleCount(18); }}>{type}</button>)}</div>
        <div className="theme-scroll" aria-label="Filtrar por tema">{themes.map((theme) => <button type="button" key={theme} className={themeFilter === theme ? "active" : ""} onClick={() => { setThemeFilter(theme); setVisibleCount(18); }}>{theme}</button>)}</div>
        <div className="result-line"><strong>{filteredMaterials.length}</strong> itens ou coleções encontrados<span />Mostrando {Math.min(visibleCount, filteredMaterials.length)} agora</div>
        {filteredMaterials.length ? <div className="archive-grid">{filteredMaterials.slice(0, visibleCount).map((material) => <MaterialCard key={material.id} material={material} onPreview={setModalMaterial} onShare={shareMaterial} />)}</div> : <div className="empty-results"><Search /><h3>Nenhum material encontrado</h3><p>Tente outra palavra ou limpe os filtros.</p><button type="button" onClick={() => { setQuery(""); setTypeFilter("Todos"); setThemeFilter("Todos"); setVisibleCount(18); }}>Limpar filtros</button></div>}
        {visibleCount < filteredMaterials.length ? <button className="load-more" type="button" onClick={() => setVisibleCount((value) => value + 18)}>Mostrar mais 18 arquivos <ChevronDown /></button> : null}
        <div className="folder-shortcuts"><span><FolderOpen /> Pastas originais do Drive</span><a href={driveFolder(collectionFolders.photos)} target="_blank" rel="noreferrer">Fotos</a><a href={driveFolder(collectionFolders.videos)} target="_blank" rel="noreferrer">Vídeos</a><a href={driveFolder(collectionFolders.audios)} target="_blank" rel="noreferrer">Músicas</a><a href={driveFolder(collectionFolders.arts)} target="_blank" rel="noreferrer">Artes</a><a href={driveFolder(collectionFolders.logos)} target="_blank" rel="noreferrer">Logos</a><a href={driveFolder(collectionFolders.prints)} target="_blank" rel="noreferrer">Gráfica</a></div>
      </section>

      <section className="stickers-section"><div className="sticker-bubbles"><span>1020</span><span>💙</span><span>EU TÔ COM ELA</span><span>ARAGUAIA</span></div><div><span className="eyebrow light"><span /> Figurinhas no WhatsApp</span><h2>Coloque a Juliana nas suas conversas.</h2><p>Acesse o canal oficial, salve as figurinhas e compartilhe com seus contatos.</p></div><a className="button button-yellow" href="https://whatsapp.com/channel/0029Vb8J3XW8F2p68rcnif34" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Abrir canal de figurinhas</a></section>

      <footer><a className="footer-brand" href="#inicio"><img src="/media/juliana-logo.png" alt="Juliana 1020" /></a><p>Central oficial de materiais da campanha Juliana 1020 • Republicanos</p><div><a href="#materiais">Materiais</a><a href="#propostas">Propostas</a><a href="#historia">Quem é Juliana</a><a href="#avatar">Minha foto</a></div></footer>

      {modalMaterial ? <MaterialModal material={modalMaterial} onClose={() => setModalMaterial(null)} /> : null}
      {toast ? <div className="toast" role="status"><Check /> {toast}</div> : null}
    </main>
  );
}
