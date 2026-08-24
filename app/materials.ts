export type MaterialKind =
  | "Fotos"
  | "Vídeos"
  | "Músicas"
  | "Artes"
  | "Logos"
  | "Impressos"
  | "Documentos"
  | "Identidade";

export type Material = {
  id: string;
  title: string;
  kind: MaterialKind;
  format: string;
  theme: string;
  driveId?: string;
  folderId?: string;
  thumb?: string;
  localFile?: string;
  itemCount?: number;
  description?: string;
};

export const drivePreview = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;

export const driveView = (id: string) =>
  `https://drive.google.com/file/d/${id}/view?usp=sharing`;

export const driveDownload = (id: string) =>
  `https://drive.usercontent.google.com/download?id=${id}&export=download&confirm=t`;

export const driveFolder = (id: string) =>
  `https://drive.google.com/drive/folders/${id}?usp=sharing`;

export const driveThumb = (id: string, width = 900) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;

const photoFiles = [
  ["1sH_Ihl9fqgkYKjYvGd29VzwF6CjTGORD", "HM107856.jpg"],
  ["1_n2MepTo_yq5yQnU7-ret4TH1P5l3Oxr", "HM107858.jpg"],
  ["1dv3GNu2SEYb12sTsHJfN-GNXrQbnVSI9", "HM107859.jpg"],
  ["1X_vDUmPNECOZ9_5JvMtPe9qT_aInzyxL", "HM107860.jpg"],
  ["1YeqcmznsADiiOwftiIlb8Hl6RtKUqrhA", "HM107862.jpg"],
  ["18TT2lKmiVNJlI7KEz9vDRxNtAakuYR1N", "HM107863.jpg"],
  ["1tRRrUXcVul4ECL7meO7ffzPGA4OzWsRb", "HM107864.jpg"],
  ["1MWFlOZGrmaLOStbnx7e-AzLqXNWX8vdP", "HM107870.jpg"],
  ["1ebQbWp7ase5Ha_QOvZQDG7Q9wsWczFe7", "HM107872.jpg"],
  ["1WpfnLRaZCrp8U86_ibmtYSIc7BLARjnS", "HM107873.jpg"],
  ["1oexQBn6eMEv9qpvzuT_2tT1ItoABL-XR", "HM107878.jpg"],
  ["1PaA3V8mT_izp8i3OxrujLPAkWr8zVrw9", "HM107881.jpg"],
  ["1LWzGDccqtDBHTLs78fUAWHZUt-k9_kgC", "HM107883.jpg"],
  ["1a4KVNmQFT5cbNo0Exnyk9UeYzbhLN8nN", "HM107884.jpg"],
  ["14RXtUpwVl0H2qFMRDI7M4qs5Qxo2bdyq", "HM107886.jpg"],
  ["1FRGM9GqsvlNb7aebJ0PV9pRoo_8UOTU3", "HM107887.jpg"],
  ["1rspTcg_dGtTthUgRd40O1UkhQkRlcXan", "HM107891.jpg"],
  ["1T7z7L28UpPwCLLgc6JG-pUcq0rq22n9D", "HM107892.jpg"],
  ["1h0NSRNp_7op8gqOkUWFZhWhOe4suG-BE", "HM107895.jpg"],
  ["1uQAN1v_lP0SUITth0Hd9JQIWtDgvfPeU", "HM107899.jpg"],
  ["1rSvnvOlXcKxE0qwtK7C3fviSoRhKu9D2", "HM107900.jpg"],
  ["1VNRgqgzvsXPfZprgn4HOI1-Kkh1j5mmB", "HM107901.jpg"],
  ["17enikYZS1TFUT_w7tQ4BhqnAoEE8DL75", "HM107903.jpg"],
  ["16XoZBKQDQAyNyvOB-D_l1KeQksF1L6BE", "HM107906.jpg"],
  ["1v4Kw7WSDSXSW66f38ob11bPuSewPs8s9", "HM107909.jpg"],
  ["1VQPJZwAU5x9-k-ll0ei1FYkMqkizkpEk", "HM107910.jpg"],
  ["1c7rGsvVoezYZM9tBf3GQkcbBcUwewJsL", "HM107911.jpg"],
  ["1My-EKcweUr4Cijvub0oXdF-M1-JYe48L", "HM107913.jpg"],
  ["1uLlgkc4qfdxld-KVf4Liu75b4CcIRNTQ", "HM107914.jpg"],
  ["1ugvrXF1MzXow0iA2O4KAnDHMyFoUJFH9", "HM107915.jpg"],
  ["1m_VACS3phqoxBISQdFtPTVDPKu63Gr36", "HM107917.jpg"],
  ["1h9UA81lOZsv2xtfHqwm9rVdQNl3jGKQV", "HM107919.jpg"],
  ["1fHX7EVcU0MgoPzt4lL6UjdTqgvqtY2t7", "HM107921.jpg"],
  ["1EcBLC-cakV8xL1H2aW6aBrj9UrJNkuWq", "HM108094.jpg"],
  ["1m0PThl54L8N7J2iALMjEXB_QW9_HnKW_", "HM108095.jpg"],
  ["1V48Gbn1jVLqsG4-Pk5jNs1lKlOSP8BSE", "HM108096.jpg"],
  ["1MHGcT7SkfyqT8Hf6Jp7E2KPSSGuJKJWn", "HM108097.jpg"],
  ["1mKULwW86lCHzXQtL-mt3t632MRTAkRkW", "HM108098.jpg"],
  ["16Sr0pMBbiV7lFPCUdmTmSluR5vwYcy_l", "HM108099.jpg"],
  ["1TBYMiNkbFwM1qQn-BhMC9Kgm28heX_IO", "HM108101.jpg"],
  ["1OEIiy_OvpcHtJge210fCtd32iRE_QKzr", "HM108103.jpg"],
  ["1LMv2VRERC9JQynU6gZKPtaaR-bVUauA7", "HM108104.jpg"],
  ["1pPZTpcW_IOPflisM2scSbM1YrAHocGaN", "HM108106.jpg"],
  ["1U3jfOo5afX03A_Dv1GBerBqkvl_tI9DC", "HM108108.jpg"],
  ["1C2BnkhkgceKO4lgWo21JG5RpwvPT5Cge", "HM108109.jpg"],
  ["1sUAzH_n15oLOzHkUJ5AABuC213SxmtRp", "HM108112.jpg"],
  ["1a-RAuoC5nT1oyUMTKmxCEjJcnvOEdGXD", "HM108114.jpg"],
  ["163Hh0NqWNTwFbxu3rEzSWozW0zRI-UMb", "IMG_2053 2.DNG"],
  ["1TL_PZiAizsXmVBQ5e-GKF90m6ZUmK4Bk", "IMG_2054 2.DNG"],
  ["1FUPDZ2nYB9AYMqOUZfVgtkhKBXkMvqED", "IMG_2690.PNG"],
] as const;

const videoFiles = [
  ["1v3V7OOXc5h0DVYZdqRNIHogZI86eBh7H", "0810(1).mp4"],
  ["1NmvfP7qeVK7y1n-aue5VcM7CgpiXOKny", "Água Boa Parabéns.mp4"],
  ["1YizsnDsPcm1Ovj7h2hE5qqFXIFjiWeyc", "BR-158 - Duplicação.mp4"],
  ["10mO-RUyXUrBTkyO1vMazSmTQCgHBVY7P", "BR-158.mp4"],
  ["1QfYr1VFe3a7NqttnRIR95OJNDJvfMGlO", "Bruno Amteck.mp4"],
  ["1G1EgYJjUVgxX633dtfGxPn9GzEUDEtYj", "Carol Detoni - candidata ao Senado.mp4"],
  ["1Mq8vmUEqsvpWSeIQZIASyanjK2hReAuh", "Convenção.mp4"],
  ["1ICiMXHgZklInkd1uE-aVVnEKEA6NUNTO", "Encontro de família.mp4"],
  ["1EnsN5skw-RyUA5YgJ2-POTLKlijiQDMP", "Feican.mp4"],
  ["17-mrfyoomR8ftGW7v47T7EnYJUus3A1H", "Gaúcha.mp4"],
  ["1z4L6jR26v5i2pxXC5skrkNIvDK2sehCw", "Habitação.mp4"],
  ["15z_y5qimgtIIXZuSTR3saVwVoqn2vqvy", "Juliana TV.mp4"],
  ["1gP_jHM_8jsfCeZmXkMPLvd1fUCbS1jT-", "Juliana em Porto Alegre do Norte.mp4"],
  ["1E6FsQ9OMpRsvIRNM1zia7rP6fzb80rQ2", "Corredor ecológico.mp4"],
  ["1jaOLCNUVuvo0W8ESxzeM-y6wiETAon3f", "Laticínios.mp4"],
  ["1vhi3A66qmL4xnjzJEsQ4XvXRm5U_BIjQ", "Juliana em Canarana.mp4"],
  ["1NNzgfAs9U294pvfxQpRuQr-4UtvlcPiQ", "Canarana - 16 de agosto.mp4"],
  ["1uRcNPCqHa-hbK3xvwvI5fsgUkglKgxMq", "Carreata.mp4"],
  ["1EYck19qXdt5JRBmOEMx4GutISqxxIr1l", "Juliana em Nova Nazaré.mp4"],
  ["1i0g3fyjueG0OJ3KCv12LSFiVUz4LimxQ", "Lançamento da campanha.mp4"],
  ["1Hl4I-Wjd_EX0AtmmKAF8M5xLcTL3PAqX", "Nova Xavantina.mp4"],
  ["1ziDWI5rXAyFJ8jwkYalgIlAMwRVusFrw", "Pronaf.mp4"],
  ["1QFr25YsbahAVf7i3_LVJFiKlIFyCCjjn", "Pivetta e Juliana.mp4"],
  ["176NEl6xbu6D1qG-wHiLE-vTaD31uYhFA", "Resumo Querência.mp4"],
  ["1XpusBENWqAQ1QRfntrbiGmvyc-aBFU02", "Posse na Câmara em 2024.mp4"],
  ["1gBd2krPZhqNqrcBuh3Ia5HxZxWrDolKE", "Vila Lilás - vídeo 1.mp4"],
  ["1NM_q3nzZWYf8QIftAqnJHBVG0pux5nRG", "Vila Lilás - vídeo 2.mp4"],
] as const;

const audioFiles = [
  ["1gsgmMbwnY1zwpzokl8j3sXeXN-v-U3yQ", "Deputada Federal Juliana 1020"],
  ["1Tk4SK7gdZMBNBhb-AvSXeUjwGBLzNAve", "É 10 20 - versão 1"],
  ["1bmMMbTUids54JnRARY4wiNA2uQxhkA7R", "É 10 20 - versão 2"],
  ["1Psn-oTbpv3x9UtGCw-RfGoAUdNNw9E2J", "Jingle Mina Juliana - master"],
  ["1UQ1wdzieqSnS6vgmMuNWWDVTkbODYh-M", "Juliana - 2 minutos"],
  ["1zExZWjS8chEZMBD5-x78iR1lBClPy1HC", "Juliana 30 - vaneira gaúcha"],
  ["10dE_7oBCJagCFu4btg7JtAQ0IHMC8qRB", "Juliana 30 - vaneira"],
  ["1y1n9QFMmaDh25HMJTNH2RzD1bhy2U7P9", "Juliana 33 - médio"],
  ["1dhXaFerJ5bKkHbPrpJhuZEPevLA9OfPc", "Juliana 50 - pagode"],
  ["1WJcYVnyvznQFzzJvLJPVBg3fOcgG0E4M", "Juliana 55 - pagode"],
  ["1RijmURFn9kxzLDW8RMVObCcePXW619v1", "Juliana 100 - pagode"],
  ["1e7nARuND2b4HNEUTmR6LGzMI1A8JXrny", "Juliana Federal"],
  ["1zl-QIHbvJNwhxVuYqoibG3U5PNewfaPk", "Juliana - master"],
] as const;

const logoFiles = [
  ["1GDX1FvcICt9HpyM1-vEwjCbe7_4va2fk", "Logo completa 01"],
  ["1Vs8jDZIIeE1gQdG39MhUDyHfsG2-HPJd", "Logo completa 02"],
  ["1EAe7r5dvkSzhz5aCHq1cq2Fn6uF_hKUL", "Logo completa 03"],
  ["1wOylrt37JUt4pbpoOilpysRSahyIPYXy", "Marca A força da mulher"],
  ["1jpVc7uZmhjYSssr5FUPHakhF0Onm9L6T", "Marca Deputada do Araguaia"],
  ["1Om7LksoVPOcxR6G9w_xNrkmjyaZPcO30", "Assinatura horizontal"],
  ["164Jc6YZDr52jeZvUotex5ic06alhx_hu", "Logo alternativa 07"],
  ["1xo9AyViwDADvV5dyZuVCniQZMRVmTvLk", "Logo alternativa 08"],
  ["1sfzCuqxGyXcBOdLRTnr7RhjxgYKQcQdt", "Marca do Araguaia"],
  ["1rZGZ5wQY31aiNTJpHIOr982lKnM4fMXl", "Símbolo da campanha"],
] as const;

const inferVideoTheme = (title: string) => {
  const value = title.toLocaleLowerCase("pt-BR");
  if (value.includes("corredor") || value.includes("araguaia")) return "Araguaia";
  if (value.includes("pronaf") || value.includes("laticínio")) return "Agro";
  if (value.includes("habitação")) return "Habitação";
  if (value.includes("lilás")) return "Mulheres";
  if (value.includes("br-158")) return "Infraestrutura";
  if (/canarana|querência|xavantina|nazaré|água boa|porto alegre/.test(value)) return "Municípios";
  return "Campanha";
};

const photos: Material[] = photoFiles.map(([id, name], index) => ({
  id: `foto-${id}`,
  title: `Foto oficial ${String(index + 1).padStart(2, "0")} - ${name}`,
  kind: "Fotos",
  format: name.toLowerCase().endsWith(".dng") ? "DNG original" : "Imagem em alta resolução",
  theme: "Fotos oficiais",
  driveId: id,
  thumb: driveThumb(id),
}));

const videos: Material[] = videoFiles.map(([id, title]) => ({
  id: `video-${id}`,
  title: title.replace(/\.mp4$/i, ""),
  kind: "Vídeos",
  format: "Vídeo MP4",
  theme: inferVideoTheme(title),
  driveId: id,
  thumb: driveThumb(id),
}));

const audios: Material[] = audioFiles.map(([id, title]) => ({
  id: `audio-${id}`,
  title,
  kind: "Músicas",
  format: "Áudio MP3",
  theme: "Jingles",
  driveId: id,
}));

const logos: Material[] = logoFiles.map(([id, title]) => ({
  id: `logo-${id}`,
  title,
  kind: "Logos",
  format: "PNG com transparência",
  theme: "Identidade visual",
  driveId: id,
  thumb: driveThumb(id),
}));

const arts: Material[] = [
  ["1eZzyWFi150ndfP-5rGTbjgrIVA5J79vb", "A cada tijolo, um novo começo", "Habitação", "/media/a-cada-tijolo.jpg"],
  ["1do57YPL8O644qbhI1260b1H1zZwFqpfk", "Agora é a vez da mulher", "Mulheres", "/media/agora-e-a-vez.webp"],
  ["1zFh-2DySkIEwRyVsamHIIVBk0AQtjL3Q", "Em defesa do Vale do Araguaia", "Araguaia", "/media/vale-do-araguaia.webp"],
  ["1OMV6fysLgyU7SZZW4s0wWs0P3-Glv9xX", "Juliana no ar", "Campanha", "/media/juliana-no-ar.webp"],
  ["1fcEoxTKIzFt8UMPa8RpKTaA8pchqJXJz", "Compromisso com a melhor idade", "Pessoa idosa", "/media/melhor-idade.webp"],
  ["1jO6nkCNjYRdHn4ITjl10kWkPE4eMTEN6", "Vila Lilás", "Mulheres", "/media/vila-lilas.webp"],
].map(([id, title, theme, thumb]) => ({
  id: `arte-${id}`,
  title,
  kind: "Artes",
  format: "Post para redes sociais",
  theme,
  driveId: id,
  thumb,
}));

const printFiles = [
  ["1O_vGTOxw9-0h46PHdc5qeMMhIVHDu2K_", "Adesivo redondo 40 × 40 cm"],
  ["1ppkjuaq3E296Ncx8sUI9nGJECX40QCbA", "Bandeira 140 × 100 cm"],
  ["1MtQXKjhmS-sGRXLTOqx5qPXq6H44-o5f", "Adesivo perfurado"],
  ["1hQZ9W9eN68a_zKrm9P77vt79Yd-aD6WD", "Praguinha 5 × 5 cm"],
  ["1XQ17k-FlHaxUOqOxi7FD575AOhKa7X7Z", "Santinho com QR Code"],
  ["1UfME7YCi2_Uyl6UFnImT1tckBW11wLlS", "Wind banner"],
] as const;

const prints: Material[] = printFiles.map(([id, title]) => ({
  id: `impresso-${id}`,
  title,
  kind: "Impressos",
  format: "PDF para gráfica",
  theme: "Mobilização",
  driveId: id,
}));

const documents: Material[] = [
  {
    id: "propostas-juliana",
    title: "Principais projetos, ações e bandeiras",
    kind: "Documentos",
    format: "PDF • 2 páginas",
    theme: "Propostas",
    localFile: "/media/propostas-juliana.pdf",
    description: "Documento completo com as seis principais frentes de atuação.",
  },
  {
    id: "manual-identidade",
    title: "Manual visual da campanha",
    kind: "Documentos",
    format: "PDF",
    theme: "Identidade visual",
    driveId: "1T3tKhYr65xnSrRwzjDYzEDDXPd3avsYd",
  },
  {
    id: "fonte-remora",
    title: "Família tipográfica Remora Sans",
    kind: "Identidade",
    format: "50 arquivos OTF",
    theme: "Identidade visual",
    folderId: "1eu4PIEE-feiOOz7M_lKCNj0JpVGM6gjj",
    itemCount: 50,
    description: "Pesos, larguras e versões itálicas da fonte oficial.",
  },
];

export const materials: Material[] = [
  ...arts,
  ...videos,
  ...photos,
  ...audios,
  ...logos,
  ...prints,
  ...documents,
];

export const archiveCounts = {
  photos: photos.length,
  videos: videos.length,
  audios: audios.length,
  arts: arts.length,
  logos: logos.length,
  prints: prints.length,
  documents: 2,
  fonts: 50,
  total:
    photos.length +
    videos.length +
    audios.length +
    arts.length +
    logos.length +
    prints.length +
    2 +
    50,
};

export const collectionFolders = {
  photos: "14hlCzw_3hCHgfOcunOiHucigheSBumQP",
  videos: "1FqZ7thLjtkFU0LT720Rz6DC4i8Fk6KF7",
  audios: "11kbYv4LDPwmQbWl_oukaVi04lK0VxqN6",
  logos: "1E4LMbhO-5ve14zvxwzN4T8jnjkvQ5Ck_",
  arts: "1CRA4XYmi0Ac0gHtUpsGQ_Y_xA7WAEtYI",
  prints: "18Il6nfz7aQ_FWmCyG8IrU45PB3SJM8u5",
};
