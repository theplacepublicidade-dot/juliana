"use client";

import {
  ArrowLeft,
  Check,
  FileUp,
  FolderKanban,
  LoaderCircle,
  LogOut,
  Search,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { materials as staticMaterials, type Material, type MaterialKind, type MaterialRegion } from "../materials";

const kinds: MaterialKind[] = ["Fotos", "Vídeos", "Músicas", "Artes", "Logos", "Impressos", "Documentos", "Identidade"];
const regionOptions: Array<{ value: MaterialRegion; label: string }> = [
  { value: "ambas", label: "As duas regiões" },
  { value: "norte", label: "Região Norte" },
  { value: "vale-do-araguaia", label: "Vale do Araguaia" },
];

type CatalogResponse = {
  uploaded: Material[];
  regions: Record<string, MaterialRegion>;
};

const regionLabel = (region?: MaterialRegion) => regionOptions.find((option) => option.value === (region ?? "ambas"))?.label ?? "As duas regiões";

export default function AdminDashboard({ userEmail, displayName }: { userEmail: string; displayName: string }) {
  const [catalog, setCatalog] = useState<Material[]>(staticMaterials);
  const [regions, setRegions] = useState<Record<string, MaterialRegion>>({});
  const [query, setQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState<MaterialRegion | "todos">("todos");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const loadCatalog = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/materials", { cache: "no-store" });
      const data = (await response.json()) as CatalogResponse & { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível carregar o acervo.");
      setRegions(data.regions ?? {});
      setCatalog([...data.uploaded, ...staticMaterials]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível carregar o acervo.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadCatalog(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadCatalog]);

  const materialRegion = (material: Material): MaterialRegion => material.uploaded ? (material.region ?? "ambas") : (regions[material.id] ?? material.region ?? "ambas");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return catalog.filter((material) => {
      const region = material.uploaded ? (material.region ?? "ambas") : (regions[material.id] ?? material.region ?? "ambas");
      const matchesRegion = filterRegion === "todos" || region === filterRegion;
      const matchesSearch = !normalized || `${material.title} ${material.kind} ${material.theme}`.toLocaleLowerCase("pt-BR").includes(normalized);
      return matchesRegion && matchesSearch;
    });
  }, [catalog, filterRegion, query, regions]);

  const counts = useMemo(() => ({
    total: catalog.length,
    north: catalog.filter((item) => ["norte", "ambas"].includes(materialRegion(item))).length,
    araguaia: catalog.filter((item) => ["vale-do-araguaia", "ambas"].includes(materialRegion(item))).length,
    uploads: catalog.filter((item) => item.uploaded).length,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [catalog, regions]);

  const upload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    setMessage("");
    try {
      const form = event.currentTarget;
      const response = await fetch("/api/admin/materials", { method: "POST", body: new FormData(form) });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível enviar o material.");
      form.reset();
      if (fileRef.current) fileRef.current.value = "";
      setMessage("Material publicado com sucesso.");
      await loadCatalog();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível enviar o material.");
    } finally {
      setUploading(false);
    }
  };

  const moveMaterial = async (material: Material, region: MaterialRegion) => {
    setSavingId(material.id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/materials/${encodeURIComponent(material.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível alterar a região.");
      if (material.uploaded) setCatalog((items) => items.map((item) => item.id === material.id ? { ...item, region } : item));
      else setRegions((current) => ({ ...current, [material.id]: region }));
      setMessage(`${material.title} foi movido para ${regionLabel(region)}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível alterar a região.");
    } finally {
      setSavingId("");
    }
  };

  const removeMaterial = async (material: Material) => {
    if (!material.uploaded || !window.confirm(`Excluir definitivamente “${material.title}”?`)) return;
    setSavingId(material.id);
    try {
      const response = await fetch(`/api/admin/materials/${encodeURIComponent(material.id)}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Não foi possível excluir o material.");
      setCatalog((items) => items.filter((item) => item.id !== material.id));
      setMessage("Material excluído.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível excluir o material.");
    } finally {
      setSavingId("");
    }
  };

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link href="/"><ArrowLeft /> Voltar à Central</Link>
        <img src="/media/juliana-logo.png" alt="Juliana 1020" />
        <div><span>{displayName}</span><small>{userEmail}</small><a href="/signout-with-chatgpt?return_to=%2F"><LogOut /> Sair</a></div>
      </header>

      <section className="admin-hero">
        <div><span><FolderKanban /> Painel administrativo</span><h1>Organize a Central<br />sem depender do código.</h1><p>Envie novos arquivos e escolha em qual região cada material deve aparecer.</p></div>
        <div className="admin-stats"><article><strong>{counts.total}</strong><span>materiais</span></article><article><strong>{counts.north}</strong><span>Região Norte</span></article><article><strong>{counts.araguaia}</strong><span>Vale do Araguaia</span></article><article><strong>{counts.uploads}</strong><span>envios pelo painel</span></article></div>
      </section>

      <section className="admin-layout">
        <form className="admin-upload-card" onSubmit={upload}>
          <div className="admin-card-title"><span><UploadCloud /></span><div><small>Novo material</small><h2>Adicionar arquivo</h2></div></div>
          <label className="admin-file-drop"><FileUp /><strong>Escolher arquivo</strong><span>Imagem, vídeo, áudio, PDF ou arquivo de gráfica • até 95 MB</span><input ref={fileRef} required name="file" type="file" accept="image/*,video/*,audio/*,.pdf,.zip,.ai,.psd,.cdr" /></label>
          <label><span>Título do material</span><input required name="title" placeholder="Ex.: Reunião em Sinop" /></label>
          <div className="admin-form-row"><label><span>Categoria</span><select required name="kind" defaultValue="Vídeos">{kinds.map((kind) => <option key={kind}>{kind}</option>)}</select></label><label><span>Região</span><select required name="region" defaultValue="ambas">{regionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label></div>
          <label><span>Tema</span><input required name="theme" defaultValue="Campanha" placeholder="Campanha, Saúde, Agro..." /></label>
          <label><span>Descrição breve</span><textarea name="description" rows={3} placeholder="Explique rapidamente o conteúdo do material." /></label>
          <button type="submit" disabled={uploading}>{uploading ? <LoaderCircle className="spin" /> : <UploadCloud />} {uploading ? "Enviando arquivo..." : "Publicar na Central"}</button>
          <small className="admin-upload-help">O material aparece automaticamente na região selecionada assim que o envio terminar.</small>
        </form>

        <section className="admin-catalog-card">
          <div className="admin-catalog-heading"><div><small>Gerenciar acervo</small><h2>Definir região dos materiais</h2></div><div className="admin-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar material..." /></div></div>
          <div className="admin-region-tabs"><button className={filterRegion === "todos" ? "active" : ""} onClick={() => setFilterRegion("todos")}>Todos</button>{regionOptions.map((option) => <button key={option.value} className={filterRegion === option.value ? "active" : ""} onClick={() => setFilterRegion(option.value)}>{option.label}</button>)}</div>
          {message ? <div className="admin-message" role="status"><Check /> {message}</div> : null}
          {loading ? <div className="admin-loading"><LoaderCircle className="spin" /> Carregando materiais...</div> : (
            <div className="admin-material-list">
              {filtered.map((material) => {
                const region = materialRegion(material);
                return <article key={material.id}><div className="admin-material-thumb">{material.thumb ? <img src={material.thumb} alt="" /> : <FileUp />}</div><div className="admin-material-copy"><span>{material.kind} • {material.theme}</span><strong>{material.title}</strong><small>{material.uploaded ? "Enviado pelo painel" : "Material original da Central"}</small></div><label><span>Onde aparece</span><select value={region} disabled={savingId === material.id} onChange={(event) => void moveMaterial(material, event.target.value as MaterialRegion)}>{regionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>{material.uploaded ? <button className="admin-delete" type="button" disabled={savingId === material.id} onClick={() => void removeMaterial(material)} aria-label={`Excluir ${material.title}`}>{savingId === material.id ? <LoaderCircle className="spin" /> : <Trash2 />}</button> : <span className="admin-saved">{savingId === material.id ? <LoaderCircle className="spin" /> : <Check />}</span>}</article>;
              })}
              {!filtered.length ? <div className="admin-empty">Nenhum material encontrado com esse filtro.</div> : null}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
