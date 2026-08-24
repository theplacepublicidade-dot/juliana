"use client";

import { FormEvent, useMemo, useRef, useState } from "react";

type MaterialType = "Artes" | "Vídeos" | "Fotos" | "Áudios" | "Impressos";

type Material = {
  id: string;
  title: string;
  type: MaterialType;
  format: string;
  theme: string;
  date: string;
  driveId: string;
  caption: string;
  image?: string;
  accent?: "blue" | "green" | "yellow";
};

const materials: Material[] = [
  {
    id: "tijolo",
    title: "A cada tijolo, um novo começo",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Habitação",
    date: "23 ago",
    driveId: "1eZzyWFi150ndfP-5rGTbjgrIVA5J79vb",
    caption:
      "Moradia digna transforma vidas. Com trabalho e compromisso, vamos construir novos caminhos para as famílias de Mato Grosso. Juliana 1020!",
    image: "/media/a-cada-tijolo.jpg",
  },
  {
    id: "agora",
    title: "Agora é a vez da mulher",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Mulheres",
    date: "23 ago",
    driveId: "1do57YPL8O644qbhI1260b1H1zZwFqpfk",
    caption:
      "Chegou a hora de ampliar a voz das mulheres e transformar coragem em ação. Eu estou com Juliana 1020!",
    image: "/media/agora-e-a-vez.webp",
  },
  {
    id: "araguaia",
    title: "Em defesa do Vale do Araguaia",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Araguaia",
    date: "23 ago",
    driveId: "1zFh-2DySkIEwRyVsamHIIVBk0AQtjL3Q",
    caption:
      "O Vale do Araguaia merece representação, investimento e respeito. A força do Araguaia em ação é Juliana 1020.",
    image: "/media/vale-do-araguaia.webp",
  },
  {
    id: "no-ar",
    title: "Juliana no ar",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Campanha",
    date: "23 ago",
    driveId: "1OMV6fysLgyU7SZZW4s0wWs0P3-Glv9xX",
    caption:
      "A nossa mensagem está no ar! Compartilhe com seus amigos e venha fazer parte desse movimento. Juliana 1020.",
    image: "/media/juliana-no-ar.webp",
  },
  {
    id: "melhor-idade",
    title: "Compromisso com a melhor idade",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Melhor idade",
    date: "23 ago",
    driveId: "1fcEoxTKIzFt8UMPa8RpKTaA8pchqJXJz",
    caption:
      "Cuidar de quem construiu nossa história é compromisso. Mais respeito, saúde e qualidade de vida para a melhor idade.",
    image: "/media/melhor-idade.webp",
  },
  {
    id: "vila-lilas",
    title: "Vila Lilás",
    type: "Artes",
    format: "Feed 1080 × 1350",
    theme: "Mulheres",
    date: "23 ago",
    driveId: "1jO6nkCNjYRdHn4ITjl10kWkPE4eMTEN6",
    caption:
      "A Vila Lilás é acolhimento, proteção e oportunidade para as mulheres. Vamos fazer essa ideia chegar mais longe.",
    image: "/media/vila-lilas.webp",
  },
  {
    id: "foto-1",
    title: "Foto oficial — Juliana",
    type: "Fotos",
    format: "JPG alta resolução",
    theme: "Fotos oficiais",
    date: "9 ago",
    driveId: "1sH_Ihl9fqgkYKjYvGd29VzwF6CjTGORD",
    caption:
      "A força da mulher em ação. Juliana, deputada federal, é 1020!",
    image: "/media/juliana-oficial-1.jpg",
  },
  {
    id: "foto-2",
    title: "Retrato oficial — Juliana",
    type: "Fotos",
    format: "JPG alta resolução",
    theme: "Fotos oficiais",
    date: "9 ago",
    driveId: "1WpfnLRaZCrp8U86_ibmtYSIc7BLARjnS",
    caption:
      "Coragem, experiência e trabalho por Mato Grosso. Eu estou com Juliana 1020!",
    image: "/media/juliana-oficial-2.jpg",
  },
  {
    id: "pronaf",
    title: "Pronaf: apoio a quem produz",
    type: "Vídeos",
    format: "Vídeo MP4",
    theme: "Agro",
    date: "20 ago",
    driveId: "1ziDWI5rXAyFJ8jwkYalgIlAMwRVusFrw",
    caption:
      "Crédito, apoio e oportunidade para quem coloca alimento na mesa dos brasileiros. Assista e compartilhe.",
    image: "/media/juliana-oficial-1.jpg",
    accent: "green",
  },
  {
    id: "habitacao-video",
    title: "Habitação é dignidade",
    type: "Vídeos",
    format: "Vídeo MP4",
    theme: "Habitação",
    date: "11 ago",
    driveId: "1z4L6jR26v5i2pxXC5skrkNIvDK2sehCw",
    caption:
      "Casa própria é segurança, dignidade e futuro. Conheça a proposta da Juliana para habitação.",
    image: "/media/juliana-hero.jpg",
    accent: "yellow",
  },
  {
    id: "jingle",
    title: "Jingle oficial — Juliana 1020",
    type: "Áudios",
    format: "Áudio MP3",
    theme: "Campanha",
    date: "22 ago",
    driveId: "1MEj_U1DON6sKNaMH0BhtdOOEhZvQN5PR",
    caption:
      "Dê o play, compartilhe e leve a força da Juliana 1020 para todo Mato Grosso!",
    accent: "blue",
  },
  {
    id: "grafica",
    title: "Kit para gráfica e mobilização",
    type: "Impressos",
    format: "PDF para impressão",
    theme: "Campanha",
    date: "23 ago",
    driveId: "folder:18Il6nfz7aQ_FWmCyG8IrU45PB3SJM8u5",
    caption:
      "Baixe os arquivos oficiais de adesivo, bandeira, praguinha, santinho e wind banner.",
    accent: "yellow",
  },
];

const typeFilters = ["Todos", "Artes", "Vídeos", "Fotos", "Áudios", "Impressos"];
const themeFilters = ["Todos", "Mulheres", "Araguaia", "Agro", "Habitação", "Campanha"];

const driveDownload = (id: string) =>
  id.startsWith("folder:")
    ? `https://drive.google.com/drive/folders/${id.replace("folder:", "")}`
    : `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function MaterialVisual({ material }: { material: Material }) {
  if (material.image) {
    return (
      <div className={`material-visual ${material.type === "Vídeos" ? "is-video" : ""}`}>
        <img src={material.image} alt="" />
        {material.type === "Vídeos" ? <span className="play-button" aria-hidden="true">▶</span> : null}
        <span className="material-format">{material.type}</span>
      </div>
    );
  }

  return (
    <div className={`material-visual abstract ${material.accent ?? "blue"}`}>
      <div className="abstract-rings" />
      <span className="abstract-symbol" aria-hidden="true">
        {material.type === "Áudios" ? "♪" : "PDF"}
      </span>
      <strong>{material.type === "Áudios" ? "JULIANA 1020" : "MATERIAIS OFICIAIS"}</strong>
      <span className="material-format">{material.type}</span>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [themeFilter, setThemeFilter] = useState("Todos");
  const [toast, setToast] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [frame, setFrame] = useState<"azul" | "verde" | "amarelo">("azul");
  const [zoom, setZoom] = useState(1);
  const materialsRef = useRef<HTMLElement>(null);

  const filteredMaterials = useMemo(() => {
    const search = normalize(query.trim());
    return materials.filter((material) => {
      const matchesType = typeFilter === "Todos" || material.type === typeFilter;
      const matchesTheme = themeFilter === "Todos" || material.theme === themeFilter;
      const haystack = normalize(
        `${material.title} ${material.type} ${material.format} ${material.theme} ${material.caption}`,
      );
      return matchesType && matchesTheme && (!search || haystack.includes(search));
    });
  }, [query, typeFilter, themeFilter]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    materialsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseTheme = (theme: string) => {
    setThemeFilter(theme);
    materialsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyCaption = async (material: Material) => {
    await navigator.clipboard.writeText(material.caption);
    notify("Legenda copiada. Agora é só compartilhar!");
  };

  const shareMaterial = async (material: Material) => {
    const url = driveDownload(material.driveId);
    try {
      if (navigator.share) {
        await navigator.share({ title: material.title, text: material.caption, url });
        return;
      }
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${material.caption}\n\n${url}`)}`,
        "_blank",
        "noopener,noreferrer",
      );
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        notify("Não foi possível abrir o compartilhamento.");
      }
    }
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(URL.createObjectURL(file));
    setZoom(1);
  };

  const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });

  const downloadPersonalizedPhoto = async () => {
    if (!photoUrl) return;
    const [photo, logo] = await Promise.all([
      loadImage(photoUrl),
      loadImage("/media/juliana-logo.png"),
    ]);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const context = canvas.getContext("2d");
    if (!context) return;

    const scale = Math.max(canvas.width / photo.width, canvas.height / photo.height) * zoom;
    const width = photo.width * scale;
    const height = photo.height * scale;
    context.drawImage(photo, (1080 - width) / 2, (1080 - height) / 2, width, height);

    const colors = {
      azul: ["#0d326f", "#194891"],
      verde: ["#126a34", "#229e49"],
      amarelo: ["#194891", "#194891"],
    };
    const gradient = context.createLinearGradient(0, 620, 0, 1080);
    gradient.addColorStop(0, "rgba(8, 28, 60, 0)");
    gradient.addColorStop(0.34, `${colors[frame][0]}cc`);
    gradient.addColorStop(1, colors[frame][1]);
    context.fillStyle = gradient;
    context.fillRect(0, 540, 1080, 540);

    context.fillStyle = frame === "amarelo" ? "#f7e02a" : frame === "verde" ? "#f7e02a" : "#229e49";
    context.beginPath();
    context.moveTo(760, 1080);
    context.lineTo(1080, 820);
    context.lineTo(1080, 1080);
    context.closePath();
    context.fill();

    const logoWidth = 760;
    const logoHeight = (logo.height / logo.width) * logoWidth;
    context.drawImage(logo, 68, 1080 - logoHeight - 58, logoWidth, logoHeight);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "eu-estou-com-juliana-1020.png";
      link.click();
      URL.revokeObjectURL(link.href);
      notify("Sua foto ficou pronta!");
    }, "image/png");
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Central Juliana 1020">
          <img src="/media/juliana-logo.png" alt="Juliana 1020" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#historia">Quem é Juliana</a>
          <a href="#materiais">Materiais</a>
          <a href="#propostas">Propostas</a>
          <a href="#foto">Minha foto</a>
          <a href="https://whatsapp.com/channel/0029Vb8J3XW8F2p68rcnif34" target="_blank" rel="noreferrer">Figurinhas</a>
        </nav>
        <a className="header-action" href="#materiais">Explorar materiais</a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <span className="eyebrow"><i /> Central oficial de conteúdos</span>
          <h1>Tudo para você apoiar, compartilhar e fazer parte.</h1>
          <p>
            Encontre fotos, vídeos, artes, propostas e conteúdos prontos da
            Juliana 1020 em poucos segundos.
          </p>
          <form className="hero-search" role="search" onSubmit={submitSearch}>
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Buscar materiais"
              placeholder="Busque por saúde, mulheres, Araguaia..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
          <div className="quick-links" aria-label="Atalhos de conteúdo">
            {[
              ["Fotos", "Fotos"],
              ["Artes", "Artes"],
              ["Vídeos", "Vídeos"],
              ["Propostas", "Todos"],
            ].map(([label, filter]) => (
              <button
                type="button"
                key={label}
                onClick={() => {
                  setTypeFilter(filter);
                  materialsRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Juliana 1020">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <img className="hero-person" src="/media/juliana-hero.jpg" alt="Juliana sorrindo e mostrando o número 10 com as mãos" />
          <div className="floating-card latest-pill">
            <span>Novos materiais</span>
            <strong>Atualizados hoje</strong>
          </div>
          <div className="floating-card content-count">
            <strong>+100</strong>
            <span>conteúdos prontos</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Vantagens da central">
        <div><span aria-hidden="true">✓</span><strong>Conteúdo oficial</strong><small>Materiais da campanha</small></div>
        <div><span aria-hidden="true">↻</span><strong>Sempre atualizado</strong><small>Novidades em um só lugar</small></div>
        <div><span aria-hidden="true">↗</span><strong>Pronto para compartilhar</strong><small>Baixe, copie e envie</small></div>
      </section>

      <section className="about-section" id="historia" aria-labelledby="about-title">
        <div className="about-portrait">
          <div className="about-photo-wrap">
            <img src="/media/juliana-oficial-2.jpg" alt="Retrato de Juliana Kolankiewicz" />
            <span className="about-number">1020</span>
          </div>
          <div className="about-slogan">
            <small>Um projeto para representar a região</small>
            <strong>A deputada do Araguaia.</strong>
          </div>
        </div>

        <div className="about-intro">
          <span className="eyebrow"><i /> Quem é Juliana</span>
          <h2 id="about-title">Trabalho, família e compromisso com o Vale do Araguaia.</h2>
          <p className="about-lead">
            Juliana Rosa de Souza Kolankiewicz é médica-veterinária, mãe de
            três filhos e pré-candidata a deputada federal pelo Republicanos.
            Sua trajetória une cuidado com as pessoas, experiência pública e
            a defesa de uma região que quer ter voz presente em Brasília.
          </p>

          <div className="about-stats" aria-label="Destaques da trajetória de Juliana">
            <div><strong>16.385</strong><span>votos em sua primeira eleição</span></div>
            <div><strong>4 meses</strong><span>de mandato na Câmara Federal</span></div>
            <div><strong>1ª mulher</strong><span>do Araguaia na Câmara</span></div>
            <div><strong>Republicanos</strong><span>pré-candidata federal</span></div>
          </div>
        </div>

        <div className="about-story">
          <div className="story-heading">
            <span>Uma história construída passo a passo</span>
            <h3>Das raízes no Paraná ao trabalho pelo Araguaia.</h3>
          </div>
          <ol className="story-timeline">
            <li>
              <span>Raízes</span>
              <div>
                <strong>Família, coragem e formação</strong>
                <p>
                  Nascida em Palmas, no Paraná, é filha de Ivete Souza e
                  Nelson Souza e cresceu em uma família de quatro mulheres.
                  Formou-se em Medicina Veterinária e aprendeu cedo a enfrentar
                  desafios com trabalho e responsabilidade.
                </p>
              </div>
            </li>
            <li>
              <span>2007</span>
              <div>
                <strong>Água Boa virou casa</strong>
                <p>
                  Mudou-se para Água Boa com o marido, o médico Mariano
                  Kolankiewicz Filho. Foi na cidade que o casal construiu sua
                  vida e criou Nelson, José Pedro e Helena.
                </p>
              </div>
            </li>
            <li>
              <span>Serviço</span>
              <div>
                <strong>Cuidar e criar oportunidades</strong>
                <p>
                  Na Secretaria Municipal de Assistência Social, atuou em
                  habitação para famílias de baixa renda, atenção aos idosos e
                  oficinas de qualificação profissional para mulheres — com
                  foco em autonomia e transformação duradoura.
                </p>
              </div>
            </li>
            <li>
              <span>2022–24</span>
              <div>
                <strong>Do primeiro voto à Câmara Federal</strong>
                <p>
                  Em sua primeira disputa, recebeu 16.385 votos e ficou na
                  suplência. Exerceu o mandato entre maio e outubro de 2024,
                  levando as prioridades do Vale do Araguaia ao Congresso.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="about-cause">
          <div>
            <span className="eyebrow light">Atuação que deixou marca</span>
            <h3>Desenvolvimento com responsabilidade e voz regional.</h3>
            <p>
              Na Câmara, Juliana pediu que o projeto do Corredor Ecológico
              Onça-Pintada também fosse analisado pela Comissão de Agricultura,
              promoveu o debate público e apresentou parecer pela rejeição da
              proposta, apontando riscos para municípios, produtores e famílias
              às margens dos rios Araguaia e Tocantins.
            </p>
          </div>
          <div className="cause-points">
            <article>
              <span aria-hidden="true">◎</span>
              <strong>Araguaia em primeiro plano</strong>
              <p>Representação presente para infraestrutura, produção e qualidade de vida.</p>
            </article>
            <article>
              <span aria-hidden="true">↗</span>
              <strong>Experiência para fazer</strong>
              <p>Um mandato completo para transformar quatro meses de trabalho em quatro anos de resultados.</p>
            </article>
          </div>
          <small className="about-sources">
            Dados eleitorais e legislativos conferidos na Câmara dos Deputados.
            Informações familiares fornecidas pela campanha.
          </small>
        </div>
      </section>

      <section className="section latest-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><i /> Acabou de sair</span>
            <h2 id="latest-title">Últimos materiais</h2>
            <p>Conteúdos novos, organizados e prontos para circular.</p>
          </div>
          <button type="button" className="text-action" onClick={() => materialsRef.current?.scrollIntoView({ behavior: "smooth" })}>
            Ver biblioteca completa <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="latest-grid">
          {materials.slice(0, 4).map((material) => (
            <article className="latest-card" key={material.id}>
              <MaterialVisual material={material} />
              <div className="latest-card-body">
                <span>{material.theme} · {material.date}</span>
                <h3>{material.title}</h3>
                <div className="mini-actions">
                  <a href={driveDownload(material.driveId)} target="_blank" rel="noreferrer">Baixar</a>
                  <button type="button" onClick={() => shareMaterial(material)}>Compartilhar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="photo-builder" id="foto" aria-labelledby="photo-title">
        <div className="photo-builder-copy">
          <span className="eyebrow light">Sua foto, nossa força</span>
          <h2 id="photo-title">Mostre que você está com a Juliana 1020.</h2>
          <p>
            Escolha uma foto, ajuste o enquadramento e baixe sua arte oficial.
            Tudo acontece no seu aparelho, com privacidade.
          </p>

          <div className="builder-steps" aria-label="Como criar sua foto">
            <div><b>1</b><span><strong>Envie sua foto</strong><small>JPG ou PNG do seu aparelho</small></span></div>
            <div><b>2</b><span><strong>Escolha a moldura</strong><small>Azul, verde ou amarela</small></span></div>
            <div><b>3</b><span><strong>Baixe e compartilhe</strong><small>Pronta para Feed e WhatsApp</small></span></div>
          </div>

          <label className="upload-button">
            <input type="file" accept="image/png,image/jpeg" onChange={(event) => handlePhoto(event.target.files?.[0])} />
            <span aria-hidden="true">＋</span>
            {photoUrl ? "Trocar foto" : "Escolher minha foto"}
          </label>
          <small className="privacy-note">🔒 Sua imagem não é enviada nem armazenada.</small>
        </div>

        <div className="builder-workspace">
          <div className={`photo-frame ${frame}`}>
            {photoUrl ? (
              <img src={photoUrl} alt="Prévia da sua foto" style={{ transform: `scale(${zoom})` }} />
            ) : (
              <div className="empty-photo">
                <span aria-hidden="true">◎</span>
                <strong>Sua foto aparece aqui</strong>
                <small>Escolha uma imagem para começar</small>
              </div>
            )}
            <div className="frame-gradient" />
            <img className="frame-logo" src="/media/juliana-logo.png" alt="" />
            <div className="frame-accent" />
          </div>

          <div className="builder-controls">
            <div className="frame-options" aria-label="Escolher cor da moldura">
              {(["azul", "verde", "amarelo"] as const).map((color) => (
                <button
                  type="button"
                  key={color}
                  className={`${color} ${frame === color ? "active" : ""}`}
                  aria-label={`Moldura ${color}`}
                  aria-pressed={frame === color}
                  onClick={() => setFrame(color)}
                />
              ))}
            </div>
            <label className="zoom-control">
              <span>Enquadramento</span>
              <input
                type="range"
                min="1"
                max="1.6"
                step="0.05"
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                disabled={!photoUrl}
              />
            </label>
            <button type="button" className="download-photo" disabled={!photoUrl} onClick={downloadPersonalizedPhoto}>
              Baixar minha arte <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </section>

      <section className="section library-section" id="materiais" ref={materialsRef} aria-labelledby="library-title">
        <div className="section-heading library-heading">
          <div>
            <span className="eyebrow"><i /> Encontre em segundos</span>
            <h2 id="library-title">Biblioteca de materiais</h2>
            <p>Filtre por formato ou assunto. Cada item já vem com legenda pronta.</p>
          </div>
          <form className="library-search" role="search" onSubmit={submitSearch}>
            <span aria-hidden="true">⌕</span>
            <input aria-label="Buscar na biblioteca" placeholder="Buscar material..." value={query} onChange={(event) => setQuery(event.target.value)} />
          </form>
        </div>

        <div className="filter-group" aria-label="Filtrar por formato">
          {typeFilters.map((filter) => (
            <button type="button" className={typeFilter === filter ? "active" : ""} key={filter} onClick={() => setTypeFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <div className="theme-filter" aria-label="Filtrar por assunto">
          <span>Por assunto:</span>
          {themeFilters.map((filter) => (
            <button type="button" className={themeFilter === filter ? "active" : ""} key={filter} onClick={() => setThemeFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>

        {filteredMaterials.length ? (
          <div className="material-grid">
            {filteredMaterials.map((material) => (
              <article className="material-card" key={material.id}>
                <MaterialVisual material={material} />
                <div className="material-card-body">
                  <div className="material-meta">
                    <span>{material.theme}</span>
                    <time>{material.date}</time>
                  </div>
                  <h3>{material.title}</h3>
                  <small>{material.format}</small>
                  <div className="card-actions">
                    <a className="download-action" href={driveDownload(material.driveId)} target="_blank" rel="noreferrer">
                      <span aria-hidden="true">↓</span> Baixar
                    </a>
                    <button type="button" aria-label={`Compartilhar ${material.title}`} onClick={() => shareMaterial(material)}>↗</button>
                    <button type="button" aria-label={`Copiar legenda de ${material.title}`} onClick={() => copyCaption(material)}>Aa</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <span aria-hidden="true">⌕</span>
            <h3>Nenhum material encontrado</h3>
            <p>Tente outra palavra ou limpe os filtros.</p>
            <button type="button" onClick={() => { setQuery(""); setTypeFilter("Todos"); setThemeFilter("Todos"); }}>Limpar filtros</button>
          </div>
        )}
      </section>

      <section className="proposals" id="propostas" aria-labelledby="proposals-title">
        <div className="proposal-intro">
          <span className="eyebrow light">Ideias que viram ação</span>
          <h2 id="proposals-title">Conheça as prioridades da Juliana.</h2>
          <p>Informação clara para entender, conversar e compartilhar.</p>
          <a href="#materiais">Ver todos os conteúdos <span aria-hidden="true">→</span></a>
        </div>
        <div className="proposal-grid">
          {[
            ["🌾", "Agro e produtor rural", "Crédito, infraestrutura e segurança para quem produz.", "Agro"],
            ["♀", "Força das mulheres", "Proteção, autonomia e oportunidades em todas as regiões.", "Mulheres"],
            ["♡", "Saúde perto de você", "Atendimento digno e estrutura para cuidar das pessoas.", "Todos"],
            ["✦", "Vale do Araguaia", "Representação presente para destravar o desenvolvimento.", "Araguaia"],
          ].map(([icon, title, description, theme]) => (
            <button type="button" className="proposal-card" key={title} onClick={() => chooseTheme(theme)}>
              <span aria-hidden="true">{icon}</span>
              <strong>{title}</strong>
              <small>{description}</small>
              <i aria-hidden="true">→</i>
            </button>
          ))}
        </div>
      </section>

      <section className="stickers-cta">
        <div className="sticker-stack" aria-hidden="true">
          <span>1020</span><span>JULIANA</span><span>✓</span>
        </div>
        <div>
          <span className="eyebrow"><i /> Espalhe essa ideia</span>
          <h2>Figurinhas oficiais no seu WhatsApp.</h2>
          <p>Entre no canal, salve as suas favoritas e compartilhe com o time.</p>
        </div>
        <a href="https://whatsapp.com/channel/0029Vb8J3XW8F2p68rcnif34" target="_blank" rel="noreferrer">
          Abrir canal de figurinhas <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/media/juliana-logo.png" alt="Juliana 1020" />
          <p>A força da mulher. A força do Araguaia. Em ação.</p>
        </div>
        <div className="footer-links">
          <a href="#inicio">Início</a>
          <a href="#historia">Quem é Juliana</a>
          <a href="#materiais">Materiais</a>
          <a href="#propostas">Propostas</a>
          <a href="#foto">Minha foto</a>
        </div>
        <div className="footer-legal">
          <strong>Central oficial Juliana 1020</strong>
          <span>Propaganda eleitoral · Conteúdo demonstrativo</span>
        </div>
      </footer>

      {toast ? <div className="toast" role="status">✓ {toast}</div> : null}
    </main>
  );
}
