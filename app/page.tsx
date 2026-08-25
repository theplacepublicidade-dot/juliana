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
    stat: "quase 11 mi ha",
    statLabel: "estimados na faixa analisada pelo parecer",
    points: [
      "Conseguiu incluir a Comissão de Agricultura na análise.",
      "Pediu audiência pública e assumiu a relatoria da proposta.",
      "Seu parecer pela rejeição foi aprovado por 28 votos a 7 na comissão.",
    ],
    image: "/media/historia/juliana-plenario-collage.jpg",
    icon: Leaf,
    tone: "blue",
  },
  {
    id: "pronaf",
    title: "Crédito para a agricultura familiar",
    kicker: "Pronaf",
    summary:
      "Relatoria que ajudou a ampliar as garantias para quem produz alimento e movimenta a economia no campo.",
    stat: "R$ 1,5 bi",
    statLabel: "liberado em crédito Pronaf",
    points: [
      "R$ 500 milhões destinados ao Fundo Garantidor de Operações.",
      "Mais acesso ao financiamento para agricultores familiares.",
      "Texto aprovado e transformado na Lei nº 15.034/2024.",
    ],
    image: "/media/historia/agricultor-pronaf.jpg",
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
    text: "Ao lado do marido, o médico Mariano Kolankiewicz Filho, conheceu Água Boa por causa das raízes rurais de seu pai na região. O casal escolheu a cidade para viver e criar Nelson, José Pedro e Helena. Mariano é o atual prefeito, reeleito para o segundo mandato.",
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
          <audio controls preload="metadata" src={material.localFile ?? driveDownload(material.driveId!)}>
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

  const videoThemes = useMemo(
    () => Array.from(new Set(materials.filter((material) => material.kind === "Vídeos").map((material) => material.theme))).sort((a, b) => a.localeCompare(b, "pt-BR")),
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
          <a href="#historia" onClick={() => setMenuOpen(false)}>História</a>
          <a href="#mandato" onClick={() => setMenuOpen(false)}>O que já fez</a>
          <a href="#propostas" onClick={() => setMenuOpen(false)}>Propostas</a>
          <a href="#materiais" onClick={() => setMenuOpen(false)}>Materiais</a>
          <a href="#avatar" onClick={() => setMenuOpen(false)}>Minha foto</a>
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
          <div className="hero-photo main-photo"><img src="/media/juliana-39.jpg" alt="Juliana sorrindo, candidata a deputada federal" /></div>
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
          <div className="story-photo-stack"><figure className="story-photo story-photo-main family-photo"><img src="/media/historia/familia-juliana.jpg" alt="Juliana em um momento com sua família em Água Boa" /><figcaption>Família: a base de toda a sua caminhada</figcaption></figure><div className="story-photo story-photo-small"><img src="/media/juliana-31.jpg" alt="Juliana sorrindo" /></div><div className="story-stamp"><span>16.385</span><small>votos em sua<br />primeira eleição</small></div></div>
          <div className="story-copy"><span className="eyebrow dark"><span /> História e família</span><h2>Antes do mandato, vieram as raízes. Antes do discurso, veio o cuidado.</h2><p className="story-lead">Juliana Kolankiewicz é médica-veterinária, mãe de Nelson, José Pedro e Helena e candidata a deputada federal pelo Republicanos. Nascida em Palmas, no Paraná, filha de Ivete e Nelson Souza, cresceu em uma família de quatro mulheres e aprendeu cedo que coragem se demonstra fazendo.</p><p className="story-lead story-lead-second">Em 2007, ela e o marido, o médico Mariano Kolankiewicz Filho, escolheram Água Boa para viver. Mariano é o atual prefeito, reeleito para o segundo mandato, e foi ao lado da comunidade que Juliana transformou vocação social em trabalho público.</p><blockquote>“O que já mudou vidas em Água Boa pode alcançar todo Mato Grosso.”</blockquote><div className="story-tags"><span><HeartHandshake size={16} /> Família</span><span><UsersRound size={16} /> Assistência social</span><span><Building2 size={16} /> Gestão que entrega</span></div></div>
        </div>
        <div className="biography-timeline">{biographySteps.map((step, index) => <article key={step.year}><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span><small>{step.year}</small><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        <div className="story-manifesto"><div><span className="eyebrow light"><span /> Uma trajetória que ganhou escala</span><h3>Da assistência social de Água Boa ao plenário da Câmara: a mesma forma de trabalhar, perto de quem precisa.</h3></div><div className="manifesto-points"><span><strong>2007</strong> Água Boa virou casa</span><span><strong>2022</strong> 16.385 votos</span><span><strong>2024</strong> mandato federal</span><span><strong>Agora</strong> candidata federal</span></div></div>
      </section>

      <section className="federal-impact" id="mandato">
        <div className="federal-heading">
          <div><span className="eyebrow light"><span /> Quatro meses na Câmara</span><h2>Pouco tempo.<br /><em>Decisões gigantes.</em></h2></div>
          <p>Juliana mostrou que representação não é ocupar uma cadeira. É conhecer a região, estudar o impacto e agir quando o futuro do Araguaia e de quem produz está em jogo.</p>
        </div>

        <article className="federal-story corridor-story">
          <div className="impact-media"><img src="/media/historia/juliana-plenario-collage.jpg" alt="Juliana durante atuação no plenário da Câmara dos Deputados" /><span className="impact-photo-label"><Leaf size={17} /> Defesa do Vale do Araguaia</span></div>
          <div className="impact-copy">
            <span className="impact-kicker">PL 909/2024 • Corredor ecológico</span>
            <h3>Quando o Araguaia correu risco de parar, Juliana colocou a região no centro da decisão.</h3>
            <p>O texto original previa uma faixa contínua de <strong>20 km em cada margem</strong> dos rios Araguaia e Tocantins, atravessando áreas produtivas, zonas urbanas e de expansão em cinco estados. No parecer, a área potencial foi estimada em quase <strong>11 milhões de hectares</strong>.</p>
            <p>Juliana conseguiu levar a análise também à Comissão de Agricultura, pediu audiência pública, assumiu a relatoria e apresentou parecer pela rejeição. Em dezembro de 2024, o parecer foi aprovado na comissão por <strong>28 votos a 7</strong>.</p>
            <div className="impact-stats"><span><strong>40 km</strong> faixa total prevista</span><span><strong>5 estados</strong> alcançados pelo texto</span><span><strong>28 × 7</strong> aprovação do parecer</span></div>
            <div className="impact-alert"><ShieldCheck size={18} /><span><strong>O impacto que ela evidenciou:</strong> risco de restrições de uso, insegurança jurídica, entraves ao crescimento urbano e pressão sobre atividades produtivas sem os estudos prévios exigidos para uma unidade de conservação.</span></div>
            <div className="source-row"><span>A aprovação na Agricultura foi uma vitória importante; a tramitação do projeto continuou em outra comissão.</span><a href="https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2422648" target="_blank" rel="noreferrer">Ver tramitação oficial <ArrowRight size={14} /></a></div>
          </div>
        </article>

        <article className="federal-story pronaf-story">
          <div className="impact-copy">
            <span className="impact-kicker green-kicker">Lei 15.034/2024 • Pronaf</span>
            <h3>R$ 1,5 bilhão em crédito Pronaf liberado para quem produz.</h3>
            <p>Juliana foi relatora do projeto que destinou <strong>R$ 500 milhões ao Fundo Garantidor de Operações</strong>. Foi essa garantia pública que tornou possível liberar <strong>R$ 1,5 bilhão em crédito Pronaf</strong> para pequenos produtores.</p>
            <p>Os R$ 500 milhões não são o valor do crédito concedido: são a proteção financeira que dá segurança às instituições e abre a porta para agricultores familiares que não dispõem de patrimônio suficiente para oferecer como garantia. A lei permite cobertura de até <strong>100% por operação</strong>, conforme as regras do programa.</p>
            <div className="pronaf-big-number"><span>R$ 1,5 bi</span><strong>liberado em crédito Pronaf para fortalecer a agricultura familiar.</strong></div>
            <div className="pronaf-support"><strong>R$ 500 milhões</strong><span>conseguidos por meio da relatoria de Juliana para garantir as operações.</span></div>
            <ul className="impact-list"><li><Check />Mais portas abertas para o pequeno produtor</li><li><Check />Crédito para produzir, investir e gerar renda</li><li><Check />Texto transformado em lei federal</li></ul>
            <div className="source-row"><span>A Câmara registra a relatoria de Juliana e a destinação de R$ 500 milhões ao fundo garantidor do Pronaf.</span><a href="https://www.camara.leg.br/noticias/1091732-CAMARA-APROVA-MAIS-RECURSOS-PARA-GARANTIR-CREDITO-A-AGRICULTURA-FAMILIAR" target="_blank" rel="noreferrer">Ver atuação oficial <ArrowRight size={14} /></a></div>
          </div>
          <div className="pronaf-media"><div className="pronaf-photo juliana-photo"><img src="/media/historia/juliana-plenario.jpg" alt="Juliana discursando no plenário" /></div><div className="pronaf-photo farmer-photo"><img src="/media/historia/agricultor-pronaf.jpg" alt="Agricultor familiar em sua produção" /></div><span className="pronaf-seal"><Tractor size={22} /> Crédito que chega à roça</span></div>
        </article>
      </section>

      <section className="legacy-section" id="aguaboa">
        <div className="section-heading legacy-heading"><div><span className="eyebrow dark"><span /> Trabalho que já dá resultado</span><h2>Água Boa mostra o caminho.<br />Mato Grosso pode ir além.</h2></div><p>Como primeira-dama e secretária de Assistência Social, Juliana ajudou a construir políticas que cuidam da família inteira — da infância à melhor idade. O compromisso agora é ampliar esse alcance para todo o estado.</p></div>

        <div className="legacy-grid">
          <article className="legacy-card housing-card"><div className="legacy-image"><img src="/media/historia/casas-agua-boa.jpg" alt="Conjunto de moradias construídas para famílias de Água Boa" /><span><HomeIcon size={18} /> Habitação</span></div><div className="legacy-copy"><small>Casa própria sem dívida</small><h3>60 famílias já receberam. Outras 50 casas estão em construção.</h3><p>São <strong>110 moradias</strong> no total, destinadas a famílias de baixa renda. As primeiras 60 foram entregues gratuitamente; a nova etapa amplia um projeto que devolve segurança, endereço e futuro.</p><div className="mini-gallery"><img src="/media/historia/ser-familia.jpg" alt="Famílias e equipe do programa Ser Família em Água Boa" /><img src="/media/historia/agua-boa.jpg" alt="Vista aérea de Água Boa" /></div><a href="https://www.aguaboa.mt.gov.br/noticias/11-assistencia-social/7071-prefeitura-de-agua-boa-entrega-mais-10-casas-pelo-programa-ser-familia-habitacao" target="_blank" rel="noreferrer">Ver dados oficiais <ArrowRight size={14} /></a></div></article>

          <article className="legacy-card seniors-card"><div className="legacy-collage"><img src="/media/historia/ilpi-render.jpg" alt="Projeto da Instituição de Longa Permanência para Idosos" /><img src="/media/historia/hidroginastica.jpg" alt="Atividade de hidroginástica" /><img src="/media/historia/escola-coluna.jpg" alt="Atividade da Escola da Coluna" /></div><div className="legacy-copy"><small>Cuidado com a pessoa idosa</small><h3>Convivência hoje. Acolhimento permanente em construção.</h3><p>Cerca de <strong>300 idosos</strong> participam do grupo da Melhor Idade, com pilates, hidroginástica, culinária, passeios e viagens. A ILPI regional está em obras para oferecer acolhimento digno a quem precisa de acompanhamento permanente e não tem retaguarda familiar.</p><a href="https://aguaboa.mt.gov.br/noticias/192-planejamento-obras-e-engenharia/6872-obra-da-ilpi-avanca-e-sera-marco-no-cuidado-com-idosos-em-agua-boa" target="_blank" rel="noreferrer">Conhecer a ILPI <ArrowRight size={14} /></a></div></article>

          <article className="legacy-card inclusion-card"><div className="legacy-image"><img src="/media/historia/sala-multissensorial.jpg" alt="Sala multissensorial para crianças neurodivergentes" /><span><Sparkles size={18} /> Inclusão</span></div><div className="legacy-copy"><small>Aprender do seu jeito</small><h3>Ambientes multissensoriais para acolher crianças neurodivergentes.</h3><p>Estruturas especializadas ajudam no desenvolvimento, na aprendizagem e no atendimento integrado, respeitando o ritmo e as necessidades de cada criança.</p><a href="https://www.aguaboa.mt.gov.br/saude/3868-prefeitura-inaugura-centro-de-atendimento-do-espectro-autista-em-agua-boa" target="_blank" rel="noreferrer">Ver iniciativa <ArrowRight size={14} /></a></div></article>

          <article className="legacy-card culture-card"><div className="culture-gallery"><img src="/media/historia/voz-agua-boa.jpg" alt="Premiação do festival A Voz de Água Boa" /><img src="/media/historia/festrilha.jpg" alt="Apresentação da Festrilha" /><img src="/media/historia/natal-agua-boa.jpg" alt="Espetáculo de Natal em Água Boa" /><img src="/media/historia/pascoa-agua-boa.jpg" alt="Decoração de Páscoa em Água Boa" /></div><div className="legacy-copy"><small>Cultura que aproxima</small><h3>Da Páscoa ao Natal, da Festrilha ao festival A Voz de Água Boa.</h3><p>Eventos gratuitos ocupam a cidade, valorizam artistas locais, movimentam famílias e transformam cultura em pertencimento. O festival A Voz de Água Boa revela e premia talentos musicais em diferentes categorias.</p><a href="https://www.aguaboa.mt.gov.br/noticias/6927-festival-a-voz-de-agua-boa-2026-emociona-publico-e-revela-grandes-talentos-em-tres-noites-inesqueciveis" target="_blank" rel="noreferrer">Conhecer o festival <ArrowRight size={14} /></a></div></article>
        </div>

        <div className="statewide-callout"><img src="/media/historia/agua-boa.jpg" alt="Vista aérea de Água Boa" /><div><span className="eyebrow light"><span /> Próximo passo</span><h3>Não é só contar o que foi feito. É mostrar o que pode ser multiplicado.</h3><p>Habitação gratuita, cuidado com idosos, inclusão, cultura e proteção à produção: experiências locais que podem inspirar políticas públicas para municípios de todo Mato Grosso.</p><a className="button button-yellow" href="#propostas">Ver propostas para o estado <ArrowRight size={17} /></a></div></div>
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
        <div className="video-theme-board"><div><span><Video size={18} /> Videoteca por assunto</span><strong>Escolha um tema e assista à sequência completa.</strong></div><div>{videoThemes.map((theme) => <button type="button" key={theme} className={typeFilter === "Vídeos" && themeFilter === theme ? "active" : ""} onClick={() => { setTypeFilter("Vídeos"); setThemeFilter(theme); setVisibleCount(18); }}><span>{theme}</span><small>{materials.filter((material) => material.kind === "Vídeos" && material.theme === theme).length} vídeos</small></button>)}</div></div>
        <div className="filter-scroll" aria-label="Filtrar por formato">{typeFilters.map((type) => <button type="button" key={type} className={typeFilter === type ? "active" : ""} onClick={() => { setTypeFilter(type); setVisibleCount(18); }}>{type}</button>)}</div>
        <div className="theme-scroll" aria-label="Filtrar por tema">{themes.map((theme) => <button type="button" key={theme} className={themeFilter === theme ? "active" : ""} onClick={() => { setThemeFilter(theme); setVisibleCount(18); }}>{theme}</button>)}</div>
        <div className="result-line"><strong>{filteredMaterials.length}</strong> itens ou coleções encontrados<span />Mostrando {Math.min(visibleCount, filteredMaterials.length)} agora</div>
        {filteredMaterials.length ? <div className="archive-grid">{filteredMaterials.slice(0, visibleCount).map((material) => <MaterialCard key={material.id} material={material} onPreview={setModalMaterial} onShare={shareMaterial} />)}</div> : <div className="empty-results"><Search /><h3>Nenhum material encontrado</h3><p>Tente outra palavra ou limpe os filtros.</p><button type="button" onClick={() => { setQuery(""); setTypeFilter("Todos"); setThemeFilter("Todos"); setVisibleCount(18); }}>Limpar filtros</button></div>}
        {visibleCount < filteredMaterials.length ? <button className="load-more" type="button" onClick={() => setVisibleCount((value) => value + 18)}>Mostrar mais 18 arquivos <ChevronDown /></button> : null}
        <div className="folder-shortcuts"><span><FolderOpen /> Pastas originais do Drive</span><a href={driveFolder(collectionFolders.photos)} target="_blank" rel="noreferrer">Fotos</a><a href={driveFolder(collectionFolders.videos)} target="_blank" rel="noreferrer">Vídeos</a><a href={driveFolder(collectionFolders.audios)} target="_blank" rel="noreferrer">Músicas</a><a href={driveFolder(collectionFolders.arts)} target="_blank" rel="noreferrer">Artes</a><a href={driveFolder(collectionFolders.logos)} target="_blank" rel="noreferrer">Logos</a><a href={driveFolder(collectionFolders.prints)} target="_blank" rel="noreferrer">Gráfica</a></div>
      </section>

      <section className="stickers-section"><div className="sticker-bubbles"><span>1020</span><span>💙</span><span>EU TÔ COM ELA</span><span>ARAGUAIA</span></div><div><span className="eyebrow light"><span /> Figurinhas no WhatsApp</span><h2>Coloque a Juliana nas suas conversas.</h2><p>Acesse o canal oficial, salve as figurinhas e compartilhe com seus contatos.</p></div><a className="button button-yellow" href="https://whatsapp.com/channel/0029Vb8J3XW8F2p68rcnif34" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Abrir canal de figurinhas</a></section>

      <footer><a className="footer-brand" href="#inicio"><img src="/media/juliana-logo.png" alt="Juliana 1020" /></a><p>Central oficial de materiais da campanha Juliana 1020 • Republicanos</p><div><a href="#historia">História</a><a href="#mandato">O que já fez</a><a href="#propostas">Propostas</a><a href="#materiais">Materiais</a><a href="#avatar">Minha foto</a></div></footer>

      {modalMaterial ? <MaterialModal material={modalMaterial} onClose={() => setModalMaterial(null)} /> : null}
      {toast ? <div className="toast" role="status"><Check /> {toast}</div> : null}
    </main>
  );
}
