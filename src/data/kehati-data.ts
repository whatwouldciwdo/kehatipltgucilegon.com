export interface IUCNStatus {
  code: 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD' | 'PROTECTED';
  labelId: string;
  labelEn: string;
  color: string;
}

export interface SpeciesItem {
  no: number;
  localName: string;
  scientificName: string;
  category?: 'flora' | 'fauna';
  iucn?: 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'DD';
  isProtectedIndo?: boolean;
  history: {
    [year: string]: number; // e.g. '2020': 5, '2021': 5, ...
  };
  unit: string;
}

export interface ProgramSummary {
  id: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  ring: string;
  landArea?: string;
  innovation?: boolean;
  history: {
    [year: string]: {
      count: number;
      budget?: number;
      hIndex?: number;
    };
  };
  unitId: string;
  unitEn: string;
  photoPlaceholder: string;
}

export interface ReportYearData {
  year: number;
  periodId: string;
  periodEn: string;
  authors: string[];
  approvers: {
    titleId: string;
    titleEn: string;
    name: string;
  }[];
  date: string;
  totalFlora: number;
  totalFauna: number;
  totalMangrove: number;
  totalAves: number;
  speciesCountFlora: number;
  speciesCountFauna: number;
  overallHIndexFlora?: number;
  overallHIndexFauna?: number;
  innovationHighlight?: {
    nameId: string;
    nameEn: string;
    taglineId: string;
    taglineEn: string;
    descId: string;
    descEn: string;
    impactNumber: string;
    impactLabelId: string;
    impactLabelEn: string;
    badgeId: string;
    badgeEn: string;
    photoPlaceholder: string;
  };
  programs: ProgramSummary[];
  statusHistory: {
    year: string;
    flora: number;
    fauna: number;
    hFlora?: number;
    hFauna?: number;
  }[];
  floraList: SpeciesItem[];
  faunaList: SpeciesItem[];
}

export const OVERVIEW_YEARS = [2023, 2024, 2025, 2026];

export const YOY_CHART_DATA = [
  { year: '2019', flora: 1696, fauna: 332, mangrove: 0, aves: 311 },
  { year: '2020', flora: 4135, fauna: 377, mangrove: 2300, aves: 335, hFlora: 2.882, hFauna: 2.704 },
  { year: '2021', flora: 4870, fauna: 459, mangrove: 3000, aves: 369, hFlora: 2.903, hFauna: 2.810 },
  { year: '2022', flora: 5469, fauna: 623, mangrove: 3500, aves: 487, hFlora: 3.026, hFauna: 2.908 },
  { year: '2023', flora: 5504, fauna: 657, mangrove: 7000, aves: 487, hFlora: 3.111, hFauna: 2.908 },
  { year: '2024', flora: 13462, fauna: 989, mangrove: 10500, aves: 624, hFlora: 3.196, hFauna: 3.006 },
  { year: '2025', flora: 17832, fauna: 766, mangrove: 14500, aves: 629, hFlora: 3.313, hFauna: 3.075 },
  { year: '2026', flora: 23670, fauna: 1268, mangrove: 19000, aves: 1122, hFlora: 3.374, hFauna: 3.267 },
];

export const REPORTS_DATA: Record<number, ReportYearData> = {
  2023: {
    year: 2023,
    periodId: 'Januari 2019 – Juni 2023',
    periodEn: 'January 2019 – June 2023',
    authors: ['Insan Taufik', 'Masenda Dea Arista', 'A. Mustakin'],
    approvers: [
      { titleId: 'Assistant Manager K3L', titleEn: 'Assistant Manager HSE', name: 'Arif Sarifudin' }
    ],
    date: '7 Agustus 2023',
    totalFlora: 5504,
    totalFauna: 657,
    totalMangrove: 3500,
    totalAves: 487,
    speciesCountFlora: 71,
    speciesCountFauna: 30,
    overallHIndexFlora: 3.111,
    overallHIndexFauna: 2.908,
    innovationHighlight: {
      nameId: 'Green Hidroponik System',
      nameEn: 'Green Hydroponics System',
      taglineId: 'Inovasi Pertanian Vertikal Ramah Lingkungan Ring 1',
      taglineEn: 'Eco-friendly Vertical Farming Innovation in Ring 1',
      descId: 'Pemanfaatan instalasi hidroponik modern di area PLTGU Cilegon untuk memperkaya jenis flora hijau bernilai gizi tinggi seperti Pokcoy, Selada, dan Kangkung sekaligus mendukung ketahanan pangan komunitas sekitar.',
      descEn: 'Modern hydroponic setup within the power plant area to enrich green flora varieties with high nutritional value such as Pak Choi, Lettuce, and Water Spinach while supporting community food security.',
      impactNumber: '384 Batang',
      impactLabelId: 'Total Panen & Bibit Sayur',
      impactLabelEn: 'Total Harvest & Seedlings',
      badgeId: 'Inisiatif Baru 2023',
      badgeEn: 'New Initiative 2023',
      photoPlaceholder: '[FOTO: Dokumentasi_Green_Hidroponik_2023.jpg]'
    },
    statusHistory: [
      { year: '2019', flora: 1696, fauna: 332 },
      { year: '2020', flora: 4154, fauna: 377 },
      { year: '2021', flora: 4889, fauna: 459 },
      { year: '2022', flora: 5392, fauna: 623 },
      { year: '2023', flora: 5504, fauna: 657 }
    ],
    programs: [
      {
        id: 'pelestarian-alami',
        nameId: 'Pelestarian Alami Flora Kawasan Konservasi',
        nameEn: 'Natural Flora Preservation in Conservation Zone',
        descId: 'Konservasi regenerasi alami pepohonan pelindung, buah langka, dan tanaman endemik di areal hijau Ring 1 seluas 17,7 Hektar.',
        descEn: 'Natural regeneration and conservation of protective, rare fruit, and endemic trees across 17.7 Ha Ring 1 green zone.',
        ring: 'Ring 1 (17,7 Ha)',
        history: {
          '2019': { count: 1696, budget: 30000000 },
          '2020': { count: 1816, budget: 30000000, hIndex: 2.882 },
          '2021': { count: 1851, budget: 30000000, hIndex: 2.976 },
          '2022': { count: 1854, budget: 30000000, hIndex: 2.985 },
          '2023': { count: 1858, budget: 30000000, hIndex: 2.994 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Pelestarian_Flora_2023.jpg]'
      },
      {
        id: 'mangrove',
        nameId: 'Penanaman Mangrove Pesisir Serang',
        nameEn: 'Coastal Mangrove Restoration Serang Regency',
        descId: 'Sinergi restorasi ekosistem pesisir bersama DLH Kabupaten Serang dan komunitas lokal di Desa Lontar, Kec. Tirtayasa untuk menahan abrasi.',
        descEn: 'Coastal ecosystem restoration in partnership with Serang Environmental Agency and local community in Lontar Village, Tirtayasa.',
        ring: 'Pesisir Desa Lontar (2 Ha)',
        history: {
          '2020': { count: 2300, budget: 17000000, hIndex: 0.281 },
          '2021': { count: 3000, budget: 17000000, hIndex: 0.315 },
          '2022': { count: 3500, budget: 17000000, hIndex: 0.268 },
          '2023': { count: 3500, budget: 17000000, hIndex: 0.352 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Penanaman_Mangrove_2023.jpg]'
      },
      {
        id: 'aves',
        nameId: 'Peningkatan Populasi Aves via RTH',
        nameEn: 'Aves Population Enhancement via Green Open Space',
        descId: 'Pengayaan habitat alami pakan buah dan tajuk tinggi untuk perkembangbiakan aneka burung pesisir dan migratori di Ring 1 & 2.',
        descEn: 'Enrichment of natural fruit food sources and high canopies for coastal and migratory birds in Ring 1 & 2.',
        ring: 'Ring 1 & Ring 2',
        history: {
          '2019': { count: 311 },
          '2020': { count: 335 },
          '2021': { count: 369 },
          '2022': { count: 487, budget: 30000000, hIndex: 2.908 },
          '2023': { count: 487, budget: 30000000, hIndex: 2.908 }
        },
        unitId: 'Ekor',
        unitEn: 'Birds',
        photoPlaceholder: '[FOTO: Dokumentasi_Monitoring_Aves_2023.jpg]'
      },
      {
        id: 'apotek-hidup',
        nameId: 'Penanaman & Perawatan Apotek Hidup',
        nameEn: 'Herbal Medicinal Garden (Apotek Hidup)',
        descId: 'Pelestarian tanaman obat keluarga (TOGA) seperti Temulawak, Lidah Buaya, Jahe, dan Kunyit untuk edukasi herbal dan kesehatan.',
        descEn: 'Conservation of family medicinal plants like Curcuma, Aloe Vera, Ginger, and Turmeric for health education.',
        ring: 'Ring 1 (0,006 Ha)',
        history: {
          '2020': { count: 19, budget: 10000000 },
          '2021': { count: 19, budget: 10000000 },
          '2022': { count: 19, budget: 10000000 },
          '2023': { count: 73, budget: 10000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Apotek_Hidup_2023.jpg]'
      },
      {
        id: 'plasma-farming',
        nameId: 'Plasma and Green Farming Cycle (Domba)',
        nameEn: 'Plasma & Green Farming Cycle (Sheep)',
        descId: 'Pemberdayaan peternakan terpadu domba garut dengan pemanfaatan rumput odot dan gajah mini di Ring 3.',
        descEn: 'Integrated Garut sheep farming empowerment utilizing Odot grass and miniature elephant grass in Ring 3.',
        ring: 'Ring 3 (0,1 Ha)',
        history: {
          '2019': { count: 21, budget: 50000000, hIndex: 0.105 },
          '2020': { count: 42, budget: 50000000, hIndex: 0.168 },
          '2021': { count: 90, budget: 50000000, hIndex: 0.263 },
          '2022': { count: 136, budget: 50000000, hIndex: 0.318 },
          '2023': { count: 170, budget: 50000000, hIndex: 0.343 }
        },
        unitId: 'Ekor',
        unitEn: 'Heads',
        photoPlaceholder: '[FOTO: Dokumentasi_Plasma_Domba_2023.jpg]'
      },
      {
        id: 'green-hidroponik',
        nameId: 'Green Hidroponik',
        nameEn: 'Green Hydroponics',
        descId: 'Budidaya tanaman pangan bergizi tinggi seperti Pokcoy, Selada, dan Kangkung melalui metode hidroponik di area Ring 1.',
        descEn: 'High-nutrition vegetable cultivation including Pak Choi, Lettuce, and Water Spinach through hydroponic method in Ring 1.',
        ring: 'Ring 1',
        innovation: true,
        history: {
          '2022': { count: 96 },
          '2023': { count: 384 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Green_Hidroponik_2023.jpg]'
      }
    ],
    floraList: [
      { no: 1, localName: 'Pohon Pelangi', scientificName: 'Eucalyptus deglupta', iucn: 'VU', history: { '2023': 289 }, unit: 'Batang' },
      { no: 2, localName: 'Pucuk Merah', scientificName: 'Syzygium oleana', iucn: 'LC', history: { '2023': 260 }, unit: 'Batang' },
      { no: 3, localName: 'Mangga', scientificName: 'Mangifera indica', iucn: 'LC', history: { '2023': 237 }, unit: 'Batang' },
      { no: 4, localName: 'Lamtoro', scientificName: 'Leucaena leucocephala', iucn: 'LC', history: { '2023': 160 }, unit: 'Batang' },
      { no: 5, localName: 'Mahoni', scientificName: 'Swietenia mahagoni', iucn: 'NT', history: { '2023': 101 }, unit: 'Batang' },
      { no: 6, localName: 'Palem Merah', scientificName: 'Cyrtostachys renda', iucn: 'LC', history: { '2023': 100 }, unit: 'Batang' },
      { no: 7, localName: 'Trembesi', scientificName: 'Albizia saman', iucn: 'LC', history: { '2023': 78 }, unit: 'Batang' },
      { no: 8, localName: 'Angsana', scientificName: 'Pterocarpus indicus', iucn: 'EN', history: { '2023': 76 }, unit: 'Batang' },
      { no: 9, localName: 'Glodokan Tiang', scientificName: 'Polyalthia longifolia', iucn: 'LC', history: { '2023': 72 }, unit: 'Batang' },
      { no: 10, localName: 'Tabebuya', scientificName: 'Tabebuia chrysantha', iucn: 'LC', history: { '2023': 63 }, unit: 'Batang' },
      { no: 11, localName: 'Biola Cantik', scientificName: 'Ficus lyrata', iucn: 'LC', history: { '2023': 56 }, unit: 'Batang' },
      { no: 12, localName: 'Kelengkeng', scientificName: 'Dimocarpus longan', iucn: 'LC', history: { '2023': 34 }, unit: 'Batang' },
      { no: 13, localName: 'Cemara', scientificName: 'Casuarina sp.', iucn: 'LC', history: { '2023': 34 }, unit: 'Batang' },
      { no: 14, localName: 'Kelapa', scientificName: 'Cocos nucifera', iucn: 'LC', history: { '2023': 24 }, unit: 'Batang' },
      { no: 15, localName: 'Jambu Air', scientificName: 'Syzygium aqueum', iucn: 'LC', history: { '2023': 23 }, unit: 'Batang' },
      { no: 16, localName: 'Jati', scientificName: 'Tectona grandis', iucn: 'EN', history: { '2023': 18 }, unit: 'Batang' },
      { no: 17, localName: 'Ketapang Kencana', scientificName: 'Terminalia mantaly', iucn: 'LC', history: { '2023': 13 }, unit: 'Batang' },
      { no: 18, localName: 'Buni', scientificName: 'Antidesma bunius', iucn: 'LC', history: { '2023': 12 }, unit: 'Batang' },
      { no: 19, localName: 'Kersen', scientificName: 'Muntingia calabura', iucn: 'LC', history: { '2023': 11 }, unit: 'Batang' },
      { no: 20, localName: 'Pohon Mangrove', scientificName: 'Rhizophora apiculata', iucn: 'LC', history: { '2023': 3500 }, unit: 'Batang' },
    ],
    faunaList: [
      { no: 1, localName: 'Burung gereja Erasia', scientificName: 'Passer montanus', history: { '2023': 64 }, unit: 'Ekor' },
      { no: 2, localName: 'Cucak Kutilang', scientificName: 'Pycnonotus aurigaster', history: { '2023': 60 }, unit: 'Ekor' },
      { no: 3, localName: 'Bondol Peking', scientificName: 'Lonchura punctulata', history: { '2023': 59 }, unit: 'Ekor' },
      { no: 4, localName: 'Walet Linci', scientificName: 'Collocalia linchi', history: { '2023': 54 }, unit: 'Ekor' },
      { no: 5, localName: 'Bondol Jawa', scientificName: 'Lonchura leucogastroides', history: { '2023': 27 }, unit: 'Ekor' },
      { no: 6, localName: 'Ibis Rokoroko', scientificName: 'Plegadis falcinellus', isProtectedIndo: true, history: { '2023': 25 }, unit: 'Ekor' },
      { no: 7, localName: 'Bondol Haji', scientificName: 'Lonchura maja', history: { '2023': 22 }, unit: 'Ekor' },
      { no: 8, localName: 'Tekukur Biasa', scientificName: 'Spilopelia chinensis', history: { '2023': 17 }, unit: 'Ekor' },
      { no: 9, localName: 'Layang-Layang Batu', scientificName: 'Hirundo tahitica', history: { '2023': 14 }, unit: 'Ekor' },
      { no: 10, localName: 'Burung madu Sriganti', scientificName: 'Cinnyris jugularis', history: { '2023': 14 }, unit: 'Ekor' },
      { no: 11, localName: 'Cabai Jawa', scientificName: 'Dicaeum trochileum', history: { '2023': 14 }, unit: 'Ekor' },
      { no: 12, localName: 'Kekep Babi', scientificName: 'Artamus leucoryn', history: { '2023': 13 }, unit: 'Ekor' },
      { no: 13, localName: 'Cinenen Pisang', scientificName: 'Orthotomus sutorius', history: { '2023': 12 }, unit: 'Ekor' },
      { no: 14, localName: 'Kapinis Rumah', scientificName: 'Apus nipalensis', history: { '2023': 11 }, unit: 'Ekor' },
      { no: 15, localName: 'Remetuk Laut', scientificName: 'Gerygone sulphurea', history: { '2023': 11 }, unit: 'Ekor' },
      { no: 16, localName: 'Alap-alap Sapi', scientificName: 'Falco moluccensis', isProtectedIndo: true, history: { '2023': 1 }, unit: 'Ekor' },
      { no: 17, localName: 'Domba Garut', scientificName: 'Ovis aries', history: { '2023': 170 }, unit: 'Ekor' },
    ]
  },
  2024: {
    year: 2024,
    periodId: 'Januari 2020 – Juni 2024',
    periodEn: 'January 2020 – June 2024',
    authors: ['Insan Taufik', 'Masenda Dea Arista', 'A. Mustakin'],
    approvers: [
      { titleId: 'Assistant Manager K3L', titleEn: 'Assistant Manager HSE', name: 'Arif Sarifudin' }
    ],
    date: '12 Agustus 2024',
    totalFlora: 13462,
    totalFauna: 989,
    totalMangrove: 10500,
    totalAves: 624,
    speciesCountFlora: 103,
    speciesCountFauna: 44,
    overallHIndexFlora: 3.196,
    overallHIndexFauna: 3.006,
    innovationHighlight: {
      nameId: 'Amoniak for Dogar',
      nameEn: 'Amoniak for Dogar App',
      taglineId: 'Aplikasi Monitoring Ternak Pintar Domba Garut Terpadu',
      taglineEn: 'Smart Livestock Monitoring Application for Garut Sheep',
      descId: 'Pengembangan platform digital cerdas untuk memonitor perkembangan bobot harian, rekam jejak kesehatan, dan database silsilah genetik ternak domba Garut guna mencegah inbreeding (perkawinan sedarah) peternak binaan Desa Cikeusal.',
      descEn: 'Smart digital platform developed to track daily weight gain, health records, and pedigree genetics database of Garut sheep to prevent inbreeding among local breeders in Cikeusal Village.',
      impactNumber: '244 Ekor',
      impactLabelId: 'Populasi Domba Terpantau Digital',
      impactLabelEn: 'Sheep Monitored Digitally',
      badgeId: 'Inovasi Digital 2024',
      badgeEn: 'Digital Innovation 2024',
      photoPlaceholder: '[FOTO: Dokumentasi_Aplikasi_Amoniak_Dogar_2024.jpg]'
    },
    statusHistory: [
      { year: '2020', flora: 4135, fauna: 377 },
      { year: '2021', flora: 4870, fauna: 459 },
      { year: '2022', flora: 5469, fauna: 623 },
      { year: '2023', flora: 9315, fauna: 657 },
      { year: '2024', flora: 13462, fauna: 989 }
    ],
    programs: [
      {
        id: 'pelestarian-alami',
        nameId: 'Pelestarian Alami Flora PLTGU Cilegon',
        nameEn: 'Natural Flora Preservation PLTGU Cilegon',
        descId: 'Pemantauan indeks keanekaragaman dan pemulihan tajuk pohon alami di area 17,7 Ha dengan penambahan 33 jenis pohon baru.',
        descEn: 'Diversity index monitoring and natural tree canopy recovery across 17.7 Ha area with 33 new recorded tree species.',
        ring: 'Ring 1 & 2 (17,7 Ha)',
        history: {
          '2020': { count: 1816, budget: 30000000, hIndex: 2.882 },
          '2021': { count: 1851, budget: 30000000, hIndex: 2.976 },
          '2022': { count: 1854, budget: 30000000, hIndex: 2.985 },
          '2023': { count: 1858, budget: 30000000, hIndex: 2.994 },
          '2024': { count: 2712, budget: 30000000, hIndex: 3.346 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Pelestarian_Alami_2024.jpg]'
      },
      {
        id: 'mangrove',
        nameId: 'Penanaman Mangrove Pesisir Serang',
        nameEn: 'Serang Coastal Mangrove Planting Initiative',
        descId: 'Kolaborasi bersama LSM Harapan Abadi dan KTH Segara Biru menanam mangrove Rhizophora apiculata di lahan kritis pesisir Desa Lontar.',
        descEn: 'Collaboration with Harapan Abadi NGO & Segara Biru Forest Farmer Group planting Rhizophora apiculata in critical coastlines.',
        ring: 'Pesisir Desa Lontar (0,35 Ha)',
        history: {
          '2020': { count: 2300, budget: 17000000, hIndex: 0.281 },
          '2021': { count: 3000, budget: 17000000, hIndex: 0.315 },
          '2022': { count: 3500, budget: 17000000, hIndex: 0.268 },
          '2023': { count: 7000, budget: 17000000, hIndex: 0.352 },
          '2024': { count: 10500, budget: 17000000, hIndex: 0.367 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Mangrove_Serang_2024.jpg]'
      },
      {
        id: 'aves',
        nameId: 'Peningkatan Populasi Aves via Penambahan RTH',
        nameEn: 'Aves Population Growth via Green Space Expansion',
        descId: 'Pengamatan terdata 30 jenis burung dengan keberadaan spesies langka seperti Alap-alap Sapi dan Ibis Rokoroko.',
        descEn: 'Recorded 30 bird species including sightings of protected species such as Moluccan Kestrel and Glossy Ibis.',
        ring: 'Ring 1 & 2 (17,7 Ha)',
        history: {
          '2020': { count: 335 },
          '2021': { count: 369 },
          '2022': { count: 487, budget: 30000000 },
          '2023': { count: 487, budget: 30000000 },
          '2024': { count: 624, budget: 30000000 }
        },
        unitId: 'Ekor',
        unitEn: 'Birds',
        photoPlaceholder: '[FOTO: Dokumentasi_Pengamatan_Aves_2024.jpg]'
      },
      {
        id: 'amoniak-dogar',
        nameId: 'Amoniak for Dogar (Plasma Farming Digital)',
        nameEn: 'Amoniak for Dogar (Digital Plasma Farming)',
        descId: 'Program monitoring digital peternakan plasma domba Garut yang mencatat 244 ekor sehat dan produktif.',
        descEn: 'Digital livestock monitoring program for Garut sheep plasma recording 244 healthy and productive sheep.',
        ring: 'Ring 3 (0,1 Ha)',
        innovation: true,
        history: {
          '2022': { count: 136, budget: 50000000, hIndex: 0.295 },
          '2023': { count: 170, budget: 50000000, hIndex: 0.323 },
          '2024': { count: 244, budget: 50000000, hIndex: 0.359 }
        },
        unitId: 'Ekor',
        unitEn: 'Heads',
        photoPlaceholder: '[FOTO: Dokumentasi_Amoniak_Dogar_Ternak_2024.jpg]'
      },
      {
        id: 'apotek-hidup',
        nameId: 'Apotek Hidup Konservasi Ring 1',
        nameEn: 'Herbal Garden Ring 1 Conservation',
        descId: 'Pemberdayaan budidaya 12 jenis herbal obat termasuk Rosela, Bidara, Kumis Kucing, dan Sambiloto.',
        descEn: 'Empowerment and cultivation of 12 medicinal herb varieties including Roselle, Bidara, and Java Tea.',
        ring: 'Ring 1 (0,006 Ha)',
        history: {
          '2020': { count: 19, budget: 10000000 },
          '2021': { count: 19, budget: 10000000 },
          '2022': { count: 19, budget: 10000000 },
          '2023': { count: 73, budget: 10000000 },
          '2024': { count: 85, budget: 10000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Apotek_Hidup_2024.jpg]'
      },
      {
        id: 'green-hidroponik',
        nameId: 'Green Hidroponik',
        nameEn: 'Green Hydroponics',
        descId: 'Budidaya Pokcoy, Selada, dan Kangkung melalui sistem hidroponik modern di area Ring 1 PLTGU Cilegon.',
        descEn: 'Pak Choi, Lettuce, and Water Spinach cultivation through modern hydroponic system in Ring 1 PLTGU Cilegon.',
        ring: 'Ring 1 (0,01 Ha)',
        history: {
          '2022': { count: 96, budget: 3000000 },
          '2023': { count: 384, budget: 3000000 },
          '2024': { count: 384, budget: 3000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Green_Hidroponik_2024.jpg]'
      },
      {
        id: 'plasma-farming',
        nameId: 'Plasma n Green Farming Cycle',
        nameEn: 'Plasma & Green Farming Cycle',
        descId: 'Program pemberdayaan peternakan terpadu domba garut di Desa Cikeusal, pemanfaatan rumput odot dan gajah mini untuk nutrisi ternak.',
        descEn: 'Integrated Garut sheep farming program in Cikeusal Village, utilizing Odot and miniature elephant grass for livestock nutrition.',
        ring: 'Ring 3 (0,1 Ha)',
        history: {
          '2020': { count: 42, budget: 50000000, hIndex: 0.168 },
          '2021': { count: 90, budget: 50000000, hIndex: 0.263 },
          '2022': { count: 136, budget: 50000000, hIndex: 0.318 },
          '2023': { count: 170, budget: 50000000, hIndex: 0.343 },
          '2024': { count: 244, budget: 50000000, hIndex: 0.367 }
        },
        unitId: 'Ekor',
        unitEn: 'Heads',
        photoPlaceholder: '[FOTO: Dokumentasi_Plasma_Farming_2024.jpg]'
      }
    ],
    floraList: [
      { no: 1, localName: 'Pohon Pelangi', scientificName: 'Eucalyptus deglupta', iucn: 'VU', history: { '2024': 417 }, unit: 'Batang' },
      { no: 2, localName: 'Pucuk Merah', scientificName: 'Syzygium oleana', iucn: 'LC', history: { '2024': 324 }, unit: 'Batang' },
      { no: 3, localName: 'Mangga', scientificName: 'Mangifera indica', iucn: 'LC', history: { '2024': 274 }, unit: 'Batang' },
      { no: 4, localName: 'Lamtoro', scientificName: 'Leucaena leucocephala', iucn: 'LC', history: { '2024': 245 }, unit: 'Batang' },
      { no: 5, localName: 'Palem Raja', scientificName: 'Roystonea regia', iucn: 'LC', history: { '2024': 160 }, unit: 'Batang' },
      { no: 6, localName: 'Mahoni', scientificName: 'Swietenia mahagoni', iucn: 'NT', history: { '2024': 103 }, unit: 'Batang' },
      { no: 7, localName: 'Angsana', scientificName: 'Pterocarpus indicus', iucn: 'EN', history: { '2024': 96 }, unit: 'Batang' },
      { no: 8, localName: 'Glodokan Tiang', scientificName: 'Polyalthia longifolia', iucn: 'LC', history: { '2024': 92 }, unit: 'Batang' },
      { no: 9, localName: 'Tabebuya', scientificName: 'Handroanthus chrysotrichus', iucn: 'LC', history: { '2024': 86 }, unit: 'Batang' },
      { no: 10, localName: 'Trembesi', scientificName: 'Albizia saman', iucn: 'LC', history: { '2024': 84 }, unit: 'Batang' },
      { no: 11, localName: 'Biola Cantik', scientificName: 'Ficus lyrata', iucn: 'LC', history: { '2024': 63 }, unit: 'Batang' },
      { no: 12, localName: 'Anting Putri', scientificName: 'Wrightia religiosa', iucn: 'LC', history: { '2024': 29 }, unit: 'Batang' },
      { no: 13, localName: 'Jambu Air', scientificName: 'Syzygium aqueum', iucn: 'LC', history: { '2024': 28 }, unit: 'Batang' },
      { no: 14, localName: 'Palem Ekor Tupai', scientificName: 'Wodyetia bifurcata', iucn: 'LC', history: { '2024': 27 }, unit: 'Batang' },
      { no: 15, localName: 'Delima', scientificName: 'Punica granatum', iucn: 'LC', history: { '2024': 27 }, unit: 'Batang' },
      { no: 16, localName: 'Kelapa', scientificName: 'Cocos nucifera', iucn: 'LC', history: { '2024': 25 }, unit: 'Batang' },
      { no: 17, localName: 'Kelengkeng', scientificName: 'Dimocarpus longan', iucn: 'LC', history: { '2024': 24 }, unit: 'Batang' },
      { no: 18, localName: 'Pandan Bali', scientificName: 'Cordyline australis', iucn: 'LC', history: { '2024': 23 }, unit: 'Batang' },
      { no: 19, localName: 'Jati', scientificName: 'Tectona grandis', iucn: 'EN', history: { '2024': 18 }, unit: 'Batang' },
      { no: 20, localName: 'Cemara Kipas', scientificName: 'Thuja occidentalis', iucn: 'LC', history: { '2024': 18 }, unit: 'Batang' },
      { no: 21, localName: 'Pohon Mangrove', scientificName: 'Rhizophora apiculata', iucn: 'LC', history: { '2024': 10500 }, unit: 'Batang' }
    ],
    faunaList: [
      { no: 1, localName: 'Burung gereja Erasia', scientificName: 'Passer montanus', history: { '2024': 67 }, unit: 'Ekor' },
      { no: 2, localName: 'Cucak Kutilang', scientificName: 'Pycnonotus aurigaster', history: { '2024': 67 }, unit: 'Ekor' },
      { no: 3, localName: 'Bondol Peking', scientificName: 'Lonchura punctulata', history: { '2024': 64 }, unit: 'Ekor' },
      { no: 4, localName: 'Walet Linci', scientificName: 'Collocalia linchi', history: { '2024': 61 }, unit: 'Ekor' },
      { no: 5, localName: 'Blekok Sawah', scientificName: 'Ardeola speciosa', history: { '2024': 34 }, unit: 'Ekor' },
      { no: 6, localName: 'Bondol Haji', scientificName: 'Lonchura maja', history: { '2024': 34 }, unit: 'Ekor' },
      { no: 7, localName: 'Kekep Babi', scientificName: 'Artamus leucoryn', history: { '2024': 34 }, unit: 'Ekor' },
      { no: 8, localName: 'Layang-Layang Batu', scientificName: 'Hirundo tahitica', history: { '2024': 29 }, unit: 'Ekor' },
      { no: 9, localName: 'Bondol Jawa', scientificName: 'Lonchura leucogastroides', history: { '2024': 28 }, unit: 'Ekor' },
      { no: 10, localName: 'Bunglon Kebun', scientificName: 'Calotes versicolor', history: { '2024': 27 }, unit: 'Ekor' },
      { no: 11, localName: 'Dederuk Jawa', scientificName: 'Streptopelia bitorquata', history: { '2024': 24 }, unit: 'Ekor' },
      { no: 12, localName: 'Ibis Rokoroko', scientificName: 'Plegadis falcinellus', isProtectedIndo: true, history: { '2024': 23 }, unit: 'Ekor' },
      { no: 13, localName: 'Biawak Air', scientificName: 'Varanus salvator', history: { '2024': 18 }, unit: 'Ekor' },
      { no: 14, localName: 'Penyu Lekang', scientificName: 'Lepidochelys olivacea', iucn: 'VU', isProtectedIndo: true, history: { '2024': 2 }, unit: 'Ekor' },
      { no: 15, localName: 'Alap-alap Sapi', scientificName: 'Falco moluccensis', isProtectedIndo: true, history: { '2024': 1 }, unit: 'Ekor' },
      { no: 16, localName: 'Domba Garut', scientificName: 'Ovis aries', history: { '2024': 244 }, unit: 'Ekor' },
    ]
  },
  2025: {
    year: 2025,
    periodId: 'Januari 2021 – Juni 2025',
    periodEn: 'January 2021 – June 2025',
    authors: ['Insan Taufik', 'Dea Arista', 'A. Mustakin'],
    approvers: [
      { titleId: 'Manager Operasi', titleEn: 'Operation Manager', name: 'Hendra Surya Kusumah' },
      { titleId: 'Assistant Manager K3L', titleEn: 'Assistant Manager HSE', name: 'Arif Sarifudin' },
      { titleId: 'Tim Keanekaragaman Hayati', titleEn: 'Biodiversity Team Lead', name: 'Insan Taufik' }
    ],
    date: '7 Juli 2025',
    totalFlora: 17832,
    totalFauna: 766,
    totalMangrove: 14500,
    totalAves: 629,
    speciesCountFlora: 100,
    speciesCountFauna: 47,
    overallHIndexFlora: 3.313,
    overallHIndexFauna: 3.075,
    innovationHighlight: {
      nameId: 'C – Flora & Iron Mus IoT',
      nameEn: 'C – Flora & Iron Mus IoT',
      taglineId: 'Internet on Module Smart Watering & Sustainable Flora Cycle',
      taglineEn: 'Internet on Module Smart Watering & Sustainable Flora Cycle',
      descId: 'Implementasi sistem integrated planting system berbasis IoT (Internet on Module Smart Watering System - Iron Mus) untuk automasi penyiraman dan optimalisasi pembibitan pohon buah dan peneduh secara masif, menghasilkan tingkat kelangsungan hidup bibit hingga 94%.',
      descEn: 'Implementation of an IoT-based integrated planting system (Iron Mus Smart Watering) for automated watering and massive tree nursery propagation, achieving up to 94% seedling survival rate.',
      impactNumber: '1.280 Batang',
      impactLabelId: 'Bibit Tumbuh via Smart Watering',
      impactLabelEn: 'Seedlings Thriving via Smart IoT',
      badgeId: 'Inovasi IoT 2025',
      badgeEn: 'IoT Innovation 2025',
      photoPlaceholder: '[FOTO: Dokumentasi_Sistem_IoT_Iron_Mus_2025.jpg]'
    },
    statusHistory: [
      { year: '2021', flora: 4870, fauna: 369 },
      { year: '2022', flora: 5373, fauna: 487 },
      { year: '2023', flora: 8931, fauna: 487 },
      { year: '2024', flora: 13078, fauna: 745 },
      { year: '2025', flora: 17832, fauna: 766 }
    ],
    programs: [
      {
        id: 'pelestarian-alami',
        nameId: 'Pelestarian Alami Flora Konservasi',
        nameEn: 'Natural Flora Preservation in Conservation Zone',
        descId: 'Pengayaan vegetasi pohon pelangi, angsana, trembesi, dan buah endemik dengan indeks keanekaragaman H’ mencapai 3,209.',
        descEn: 'Vegetation enrichment of rainbow eucalyptus, angsana, rain trees, and endemic fruits reaching H’ index of 3.209.',
        ring: 'Ring 1 (17,7 Ha)',
        history: {
          '2021': { count: 1851, budget: 30000000, hIndex: 2.903 },
          '2022': { count: 1854, budget: 30000000, hIndex: 2.985 },
          '2023': { count: 1858, budget: 30000000, hIndex: 2.994 },
          '2024': { count: 2493, budget: 30000000, hIndex: 3.094 },
          '2025': { count: 3120, budget: 30000000, hIndex: 3.209 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Pelestarian_Flora_2025.jpg]'
      },
      {
        id: 'c-flora',
        nameId: 'C – Flora: Smart Watering System (Iron Mus)',
        nameEn: 'C – Flora: Smart Watering System (Iron Mus)',
        descId: 'Sistem pembibitan terintegrasi penyiraman otomatis untuk mempercepat pertumbuhan tanaman konservasi dan penghijauan pemukiman.',
        descEn: 'Integrated automated watering nursery system to accelerate growth of conservation plants and neighborhood greening.',
        ring: 'Ring 1 & Pemukiman',
        innovation: true,
        history: {
          '2024': { count: 1132, budget: 57000000, hIndex: 1.508 },
          '2025': { count: 1280, budget: 57000000, hIndex: 1.773 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_C_Flora_Iron_Mus_2025.jpg]'
      },
      {
        id: 'mangrove',
        nameId: 'Penanaman Mangrove Pesisir Serang',
        nameEn: 'Coastal Mangrove Conservation Serang',
        descId: 'Akumulasi 14.500 batang pohon mangrove ditanam di lahan pesisir seluas 0,40 Ha Desa Lontar.',
        descEn: 'Cumulative 14,500 mangrove trees planted across 0.40 Ha coastal area in Lontar Village.',
        ring: 'Pesisir Desa Lontar (0,40 Ha)',
        history: {
          '2021': { count: 3000, budget: 17000000 },
          '2022': { count: 3500, budget: 17000000 },
          '2023': { count: 7000, budget: 17000000 },
          '2024': { count: 10500, budget: 17000000 },
          '2025': { count: 14500, budget: 17000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Mangrove_Lontar_2025.jpg]'
      },
      {
        id: 'aves',
        nameId: 'Peningkatan Populasi Aves via Luas RTH',
        nameEn: 'Aves Population Enhancement in Green Space',
        descId: 'Monitoring berkala mencatat 629 ekor burung dari 32 spesies yang aktif bersarang di tajuk pohon PLTGU Cilegon.',
        descEn: 'Periodic monitoring recorded 629 birds from 32 species actively nesting in the canopies of PLTGU Cilegon.',
        ring: 'Ring 1 & 2 (17,7 Ha)',
        history: {
          '2021': { count: 369, budget: 30000000, hIndex: 2.704 },
          '2022': { count: 487, budget: 30000000, hIndex: 2.908 },
          '2023': { count: 487, budget: 30000000, hIndex: 2.908 },
          '2024': { count: 624, budget: 30000000, hIndex: 2.978 },
          '2025': { count: 629, budget: 30000000, hIndex: 3.023 }
        },
        unitId: 'Ekor',
        unitEn: 'Birds',
        photoPlaceholder: '[FOTO: Dokumentasi_Monitoring_Aves_2025.jpg]'
      },
      {
        id: 'budidaya-ikan',
        nameId: 'Budidaya Ikan Lele dan Nila Air Tawar',
        nameEn: 'Freshwater Catfish & Tilapia Aquaculture',
        descId: 'Pemanfaatan air non-produktif ramah lingkungan untuk budidaya ikan pangan lokal guna mendukung ketahanan pangan (SDGs poin 2 & 14).',
        descEn: 'Eco-friendly water reuse for local aquaculture supporting food security and SDG targets.',
        ring: 'Ring 2 PLTGU',
        innovation: true,
        history: {
          '2025': { count: 31, budget: 1000000, hIndex: 0.650 }
        },
        unitId: 'Ekor',
        unitEn: 'Fish',
        photoPlaceholder: '[FOTO: Dokumentasi_Budidaya_Ikan_2025.jpg]'
      },
      {
        id: 'apotek-hidup',
        nameId: 'Apotek Hidup Ring 1',
        nameEn: 'Ring 1 Herbal Garden',
        descId: 'Ekspansi koleksi tanaman obat herbal menjadi 96 batang yang terkelola rapi.',
        descEn: 'Expansion of herbal medicine collection reaching 96 well-maintained plants.',
        ring: 'Ring 1 (0,006 Ha)',
        history: {
          '2021': { count: 19, budget: 10000000 },
          '2022': { count: 19, budget: 10000000 },
          '2023': { count: 73, budget: 10000000 },
          '2024': { count: 85, budget: 10000000 },
          '2025': { count: 96, budget: 10000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '[FOTO: Dokumentasi_Apotek_Hidup_2025.jpg]'
      }
    ],
    floraList: [
      { no: 1, localName: 'Pohon Pelangi', scientificName: 'Eucalyptus deglupta', iucn: 'VU', history: { '2025': 428 }, unit: 'Batang' },
      { no: 2, localName: 'Pucuk Merah', scientificName: 'Syzygium oleana', iucn: 'LC', history: { '2025': 342 }, unit: 'Batang' },
      { no: 3, localName: 'Lamtoro', scientificName: 'Leucaena leucocephala', iucn: 'LC', history: { '2025': 308 }, unit: 'Batang' },
      { no: 4, localName: 'Mangga', scientificName: 'Mangifera indica', iucn: 'LC', history: { '2025': 299 }, unit: 'Batang' },
      { no: 5, localName: 'Glodokan Tiang', scientificName: 'Polyalthia longifolia', iucn: 'LC', history: { '2025': 222 }, unit: 'Batang' },
      { no: 6, localName: 'Trembesi', scientificName: 'Albizia saman', iucn: 'LC', history: { '2025': 170 }, unit: 'Batang' },
      { no: 7, localName: 'Palem Raja', scientificName: 'Roystonea regia', iucn: 'LC', history: { '2025': 160 }, unit: 'Batang' },
      { no: 8, localName: 'Mahoni', scientificName: 'Swietenia mahagoni', iucn: 'NT', history: { '2025': 153 }, unit: 'Batang' },
      { no: 9, localName: 'Angsana', scientificName: 'Pterocarpus indicus', iucn: 'EN', history: { '2025': 135 }, unit: 'Batang' },
      { no: 10, localName: 'Tabebuya', scientificName: 'Handroanthus chrysotrichus', iucn: 'VU', history: { '2025': 116 }, unit: 'Batang' },
      { no: 11, localName: 'Asam Jawa', scientificName: 'Tamarindus indica', iucn: 'LC', history: { '2025': 65 }, unit: 'Batang' },
      { no: 12, localName: 'Biola Cantik', scientificName: 'Ficus lyrata', iucn: 'LC', history: { '2025': 63 }, unit: 'Batang' },
      { no: 13, localName: 'Jambu Air', scientificName: 'Syzygium aqueum', iucn: 'LC', history: { '2025': 62 }, unit: 'Batang' },
      { no: 14, localName: 'Kelapa', scientificName: 'Cocos nucifera', iucn: 'LC', history: { '2025': 43 }, unit: 'Batang' },
      { no: 15, localName: 'Kelengkeng', scientificName: 'Dimocarpus longan', iucn: 'LC', history: { '2025': 39 }, unit: 'Batang' },
      { no: 16, localName: 'Delima', scientificName: 'Punica granatum', iucn: 'LC', history: { '2025': 38 }, unit: 'Batang' },
      { no: 17, localName: 'Ketapang', scientificName: 'Terminalia catappa', iucn: 'LC', history: { '2025': 32 }, unit: 'Batang' },
      { no: 18, localName: 'Anting Putri', scientificName: 'Wrightia religiosa', iucn: 'LC', history: { '2025': 29 }, unit: 'Batang' },
      { no: 19, localName: 'Palem Bambu', scientificName: 'Chamaedorea seifrizii', iucn: 'LC', history: { '2025': 28 }, unit: 'Batang' },
      { no: 20, localName: 'Pohon Mangrove', scientificName: 'Rhizophora apiculata', iucn: 'LC', history: { '2025': 14500 }, unit: 'Batang' },
    ],
    faunaList: [
      { no: 1, localName: 'Burung gereja Erasia', scientificName: 'Passer montanus', history: { '2025': 77 }, unit: 'Ekor' },
      { no: 2, localName: 'Cucak Kutilang', scientificName: 'Pycnonotus aurigaster', history: { '2025': 67 }, unit: 'Ekor' },
      { no: 3, localName: 'Bondol Peking', scientificName: 'Lonchura punctulata', history: { '2025': 66 }, unit: 'Ekor' },
      { no: 4, localName: 'Walet Linci', scientificName: 'Collocalia linchi', history: { '2025': 47 }, unit: 'Ekor' },
      { no: 5, localName: 'Bondol Haji', scientificName: 'Lonchura maja', history: { '2025': 37 }, unit: 'Ekor' },
      { no: 6, localName: 'Layang-Layang Batu', scientificName: 'Hirundo tahitica', history: { '2025': 34 }, unit: 'Ekor' },
      { no: 7, localName: 'Walet Sarang putih', scientificName: 'Aerodramus fuciphagus', history: { '2025': 32 }, unit: 'Ekor' },
      { no: 8, localName: 'Blekok Sawah', scientificName: 'Ardeola speciosa', history: { '2025': 25 }, unit: 'Ekor' },
      { no: 9, localName: 'Bondol Jawa', scientificName: 'Lonchura leucogastroides', history: { '2025': 24 }, unit: 'Ekor' },
      { no: 10, localName: 'Kapinis Laut', scientificName: 'Apus pacificus', history: { '2025': 23 }, unit: 'Ekor' },
      { no: 11, localName: 'Kapinis Rumah', scientificName: 'Apus nipalensis', history: { '2025': 21 }, unit: 'Ekor' },
      { no: 12, localName: 'Biawak Air', scientificName: 'Varanus salvator', history: { '2025': 21 }, unit: 'Ekor' },
      { no: 13, localName: 'Remetuk Laut', scientificName: 'Gerygone sulphurea', history: { '2025': 20 }, unit: 'Ekor' },
      { no: 14, localName: 'Ikan Nila', scientificName: 'Oreochromis niloticus', history: { '2025': 20 }, unit: 'Ekor' },
      { no: 15, localName: 'Ikan Lele', scientificName: 'Clarias batrachus', history: { '2025': 11 }, unit: 'Ekor' },
      { no: 16, localName: 'Penyu Lekang', scientificName: 'Lepidochelys olivacea', iucn: 'VU', isProtectedIndo: true, history: { '2025': 2 }, unit: 'Ekor' },
      { no: 17, localName: 'Alap-alap Sapi', scientificName: 'Falco moluccensis', isProtectedIndo: true, history: { '2025': 1 }, unit: 'Ekor' }
    ]
  },
  2026: {
    year: 2026,
    periodId: 'Januari 2022 – Juni 2026',
    periodEn: 'January 2022 – June 2026',
    authors: ['Insan Taufik', 'Dea Arista', 'A. Mustakin'],
    approvers: [
      { titleId: 'Manager Operasi', titleEn: 'Operation Manager', name: 'Hendra Surya Kusumah' },
      { titleId: 'Assistant Manager K3L', titleEn: 'Assistant Manager HSE', name: 'Fuji Juhairil Hamdalah' },
      { titleId: 'Tim Keanekaragaman Hayati', titleEn: 'Biodiversity Team Lead', name: 'Insan Taufik' }
    ],
    date: '7 Juli 2026',
    totalFlora: 23670,
    totalFauna: 1268,
    totalMangrove: 19000,
    totalAves: 1122,
    speciesCountFlora: 137,
    speciesCountFauna: 52,
    overallHIndexFlora: 3.374,
    overallHIndexFauna: 3.267,
    innovationHighlight: {
      nameId: 'BIOWING CONNECT',
      nameEn: 'BIOWING CONNECT AI SYSTEM',
      taglineId: 'Natural Bird-Assisted Biodiversity Regeneration System Berbasis Digital',
      taglineEn: 'Digital Natural Bird-Assisted Biodiversity Regeneration System',
      descId: 'Terobosan sistem pemantauan dan pencatatan vegetasi alami yang tumbuh melalui peran aves (burung) sebagai agen penyebar benih (vector dispersal). Aplikasi ini mencatat kemunculan 4.471 individu flora baru secara akurat dan real-time di kawasan Ring 1 & Ring 2.',
      descEn: 'Breakthrough monitoring and digital recording system of natural vegetation regenerated through avian seed dispersal vectors. The application tracks 4,471 new flora individuals accurately and in real-time across Ring 1 & Ring 2.',
      impactNumber: '4.471 Batang',
      impactLabelId: 'Vegetasi Alami Terpencatat Real-time',
      impactLabelEn: 'Natural Seedlings Tracked Digitally',
      badgeId: 'Inovasi Unggulan 2026',
      badgeEn: 'Flagship Innovation 2026',
      photoPlaceholder: '[FOTO: Dokumentasi_Aplikasi_Biowing_Connect_2026.jpg]'
    },
    statusHistory: [
      { year: '2022', flora: 5373, fauna: 487, hFlora: 3.026, hFauna: 2.908 },
      { year: '2023', flora: 8920, fauna: 487, hFlora: 3.111, hFauna: 2.908 },
      { year: '2024', flora: 13065, fauna: 745, hFlora: 3.196, hFauna: 3.006 },
      { year: '2025', flora: 17565, fauna: 755, hFlora: 3.313, hFauna: 3.075 },
      { year: '2026', flora: 23670, fauna: 1268, hFlora: 3.374, hFauna: 3.267 }
    ],
    programs: [
      {
        id: 'biowing-connect',
        nameId: 'BIOWING CONNECT: Natural Bird-Assisted Regeneration',
        nameEn: 'BIOWING CONNECT: Natural Bird-Assisted Regeneration',
        descId: 'Digitalisasi pencatatan flora liar yang tumbuh alami dibantu penyebaran benih oleh populasi burung di kawasan konservasi.',
        descEn: 'Digital recording system for flora species naturally regenerating through bird seed dispersal across the reserve.',
        ring: 'Ring 1 & Ring 2',
        innovation: true,
        history: {
          '2026': { count: 4471, budget: 2000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '/img/laporan/2026/biowing-connect-system.png'
      },
      {
        id: 'pelestarian-alami',
        nameId: 'Pelestarian Alami Flora PLTGU Cilegon',
        nameEn: 'Natural Flora Preservation in PLTGU Cilegon',
        descId: 'Pemantauan komprehensif 137 spesies pohon dengan keberadaan 1 spesies Kritis (CR: Palem Botol) dan 6 spesies Terancam Punah (EN).',
        descEn: 'Comprehensive monitoring of 137 tree species including 1 Critically Endangered (CR: Bottle Palm) and 6 Endangered (EN) species.',
        ring: 'Ring 1 (17,7 Ha)',
        history: {
          '2022': { count: 1854, budget: 30000000, hIndex: 3.026 },
          '2023': { count: 1858, budget: 30000000, hIndex: 3.111 },
          '2024': { count: 2493, budget: 30000000, hIndex: 3.196 },
          '2025': { count: 2983, budget: 30000000, hIndex: 3.313 },
          '2026': { count: 4471, budget: 30000000, hIndex: 3.374 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '/img/laporan/2026/pelestarian-alami-kehati-2026.png'
      },
      {
        id: 'mangrove',
        nameId: 'Penanaman Mangrove Pesisir Serang',
        nameEn: 'Serang Coastal Mangrove Restoration',
        descId: 'Total kumulatif mencapai 19.000 batang bibit mangrove Rhizophora apiculata di lahan konservasi seluas 0,45 Ha Desa Lontar.',
        descEn: 'Cumulative 19,000 Rhizophora apiculata mangrove trees flourishing across 0.45 Ha conservation zone in Lontar Village.',
        ring: 'Pesisir Desa Lontar (0,45 Ha)',
        history: {
          '2022': { count: 3500, budget: 17000000 },
          '2023': { count: 7000, budget: 17000000 },
          '2024': { count: 10500, budget: 17000000 },
          '2025': { count: 14500, budget: 17000000 },
          '2026': { count: 19000, budget: 17000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '/img/laporan/2026/penanaman-mangrove-2026.png'
      },
      {
        id: 'aves',
        nameId: 'Peningkatan Populasi Aves via Luas RTH',
        nameEn: 'Aves Population Growth in Green Open Space',
        descId: 'Lonjakan populasi burung mencapai 1.122 ekor dari 37 jenis burung, termasuk spesies baru seperti Cinenen Jawa dan Merbah Cerukcuk.',
        descEn: 'Surge in bird population reaching 1,122 birds from 37 species, including newly documented species like Javan Tailorbird.',
        ring: 'Ring 1 & 2 (17,7 Ha)',
        history: {
          '2022': { count: 487, budget: 30000000, hIndex: 2.908 },
          '2023': { count: 487, budget: 30000000, hIndex: 2.908 },
          '2024': { count: 624, budget: 30000000, hIndex: 3.006 },
          '2025': { count: 629, budget: 30000000, hIndex: 3.075 },
          '2026': { count: 1122, budget: 30000000, hIndex: 3.267 }
        },
        unitId: 'Ekor',
        unitEn: 'Birds',
        photoPlaceholder: '/img/laporan/2026/peningkatan-pengamatan-jumlah-aves-2026.png'
      },
      {
        id: 'c-flora',
        nameId: 'C – Flora: Sustainable Cycle Smart Watering',
        nameEn: 'C – Flora: Sustainable Cycle Smart Watering',
        descId: 'Pengembangan bibit mandiri berbasis IoT Iron Mus mencapai 1.840 bibit siap tanam untuk masyarakat dan unit kerja.',
        descEn: 'IoT Iron Mus seedling development yielding 1,840 ready-to-plant trees for local community and company area.',
        ring: 'Ring 1 & Pemukiman',
        innovation: true,
        history: {
          '2024': { count: 1132, budget: 57000000 },
          '2025': { count: 1276, budget: 57000000 },
          '2026': { count: 1840, budget: 2000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '/img/laporan/2026/sustainable-cycle-smart-watering.png'
      },
      {
        id: 'apotek-hidup',
        nameId: 'Apotek Hidup Ring 1',
        nameEn: 'Apotek Hidup Ring 1 Herbal Sanctuary',
        descId: 'Penambahan varietas obat tradisional seperti Keji Beling, Temu Ireng, Brotowali, dan Lemon hingga total 179 tanaman.',
        descEn: 'Addition of traditional herbal varieties reaching a total of 179 medicinal plants.',
        ring: 'Ring 1 (0,006 Ha)',
        history: {
          '2022': { count: 19, budget: 10000000 },
          '2023': { count: 73, budget: 10000000 },
          '2024': { count: 84, budget: 10000000 },
          '2025': { count: 96, budget: 10000000 },
          '2026': { count: 179, budget: 10000000 }
        },
        unitId: 'Batang',
        unitEn: 'Stems',
        photoPlaceholder: '/img/laporan/2026/Apotek-hidup.png'
      },
      {
        id: 'budidaya-nila',
        nameId: 'Budidaya Ikan Nila Air Tawar Ramah Lingkungan',
        nameEn: 'Eco-friendly Tilapia Aquaculture',
        descId: 'Optimalisasi pemanfaatan air sirkulasi ramah lingkungan untuk kolam bioflok ikan nila produktif.',
        descEn: 'Optimized circulation water reuse for biofloc tilapia aquaculture.',
        ring: 'Ring 2 PLTGU',
        history: {
          '2025': { count: 20, budget: 1000000 },
          '2026': { count: 42, budget: 1000000 }
        },
        unitId: 'Ekor',
        unitEn: 'Fish',
        photoPlaceholder: '/img/laporan/2026/Kolam-Nila.png'
      }
    ],
    floraList: [
      { no: 1, localName: 'Lamtoro', scientificName: 'Leucaena leucocephala', iucn: 'LC', history: { '2026': 857 }, unit: 'Batang' },
      { no: 2, localName: 'Mangga', scientificName: 'Mangifera indica', iucn: 'LC', history: { '2026': 661 }, unit: 'Batang' },
      { no: 3, localName: 'Pohon Pelangi', scientificName: 'Eucalyptus deglupta', iucn: 'VU', history: { '2026': 437 }, unit: 'Batang' },
      { no: 4, localName: 'Pucuk Merah', scientificName: 'Syzygium oleana', iucn: 'LC', history: { '2026': 331 }, unit: 'Batang' },
      { no: 5, localName: 'Angsana', scientificName: 'Pterocarpus indicus', iucn: 'EN', history: { '2026': 172 }, unit: 'Batang' },
      { no: 6, localName: 'Jambu Air', scientificName: 'Syzygium aqueum', iucn: 'LC', history: { '2026': 124 }, unit: 'Batang' },
      { no: 7, localName: 'Palem Raja', scientificName: 'Roystonea regia', iucn: 'LC', history: { '2026': 124 }, unit: 'Batang' },
      { no: 8, localName: 'Mahoni', scientificName: 'Swietenia mahagoni', iucn: 'NT', history: { '2026': 123 }, unit: 'Batang' },
      { no: 9, localName: 'Tabebuya', scientificName: 'Handroanthus chrysotrichus', iucn: 'VU', history: { '2026': 118 }, unit: 'Batang' },
      { no: 10, localName: 'Beringin Biola', scientificName: 'Ficus lyrata', iucn: 'LC', history: { '2026': 115 }, unit: 'Batang' },
      { no: 11, localName: 'Delima', scientificName: 'Punica granatum', iucn: 'LC', history: { '2026': 101 }, unit: 'Batang' },
      { no: 12, localName: 'Pleomele', scientificName: 'Dracaena reflexa Lam.', iucn: 'LC', history: { '2026': 92 }, unit: 'Batang' },
      { no: 13, localName: 'Glodokan Tiang', scientificName: 'Polyalthia longifolia', iucn: 'LC', history: { '2026': 85 }, unit: 'Batang' },
      { no: 14, localName: 'Trembesi', scientificName: 'Albizia saman', iucn: 'LC', history: { '2026': 85 }, unit: 'Batang' },
      { no: 15, localName: 'Kelengkeng', scientificName: 'Dimocarpus longan', iucn: 'LC', history: { '2026': 81 }, unit: 'Batang' },
      { no: 16, localName: 'Jambu Biji', scientificName: 'Psidium guajava', iucn: 'LC', history: { '2026': 63 }, unit: 'Batang' },
      { no: 17, localName: 'Lengkuas', scientificName: 'Alpinia galanga', iucn: 'LC', history: { '2026': 44 }, unit: 'Batang' },
      { no: 18, localName: 'Kamboja Merah', scientificName: 'Plumeria rubra', iucn: 'LC', history: { '2026': 45 }, unit: 'Batang' },
      { no: 19, localName: 'Dracena Bintik Emas', scientificName: 'Dracaena surculosa', iucn: 'LC', history: { '2026': 43 }, unit: 'Batang' },
      { no: 20, localName: 'Anting Putri', scientificName: 'Wrightia religiosa', iucn: 'LC', history: { '2026': 40 }, unit: 'Batang' },
      { no: 21, localName: 'Pandan Bali', scientificName: 'Cordyline australis', iucn: 'LC', history: { '2026': 34 }, unit: 'Batang' },
      { no: 22, localName: 'Kaliandra Merah', scientificName: 'Calliandra calothyrsus', iucn: 'LC', history: { '2026': 30 }, unit: 'Batang' },
      { no: 23, localName: 'Jamblang / Juwet', scientificName: 'Syzygium cumini', iucn: 'LC', history: { '2026': 29 }, unit: 'Batang' },
      { no: 24, localName: 'Palem Botol', scientificName: 'Hyophorbe lagenicaulis', iucn: 'CR', history: { '2026': 9 }, unit: 'Batang' },
      { no: 25, localName: 'Keruing Bunga', scientificName: 'Dipterocarpus hasseltii', iucn: 'EN', history: { '2026': 2 }, unit: 'Batang' },
      { no: 26, localName: 'Mersawa Daun Lebar', scientificName: 'Anisoptera costata', iucn: 'EN', history: { '2026': 3 }, unit: 'Batang' },
      { no: 27, localName: 'Damar Mata Kucing', scientificName: 'Shorea javanica', iucn: 'EN', history: { '2026': 3 }, unit: 'Batang' },
      { no: 28, localName: 'Jati', scientificName: 'Tectona grandis', iucn: 'EN', history: { '2026': 15 }, unit: 'Batang' },
      { no: 29, localName: 'Pohon Mangrove', scientificName: 'Rhizophora apiculata', iucn: 'LC', history: { '2026': 19000 }, unit: 'Batang' },
    ],
    faunaList: [
      { no: 1, localName: 'Burung gereja Erasia', scientificName: 'Passer montanus', history: { '2026': 161 }, unit: 'Ekor' },
      { no: 2, localName: 'Cucak Kutilang', scientificName: 'Pycnonotus aurigaster', history: { '2026': 155 }, unit: 'Ekor' },
      { no: 3, localName: 'Bondol Peking', scientificName: 'Lonchura punctulata', history: { '2026': 136 }, unit: 'Ekor' },
      { no: 4, localName: 'Walet Linci', scientificName: 'Collocalia linchi', history: { '2026': 92 }, unit: 'Ekor' },
      { no: 5, localName: 'Bondol Haji', scientificName: 'Lonchura maja', history: { '2026': 80 }, unit: 'Ekor' },
      { no: 6, localName: 'Bondol Jawa', scientificName: 'Lonchura leucogastroides', history: { '2026': 62 }, unit: 'Ekor' },
      { no: 7, localName: 'Layang-Layang Batu', scientificName: 'Hirundo tahitica', history: { '2026': 38 }, unit: 'Ekor' },
      { no: 8, localName: 'Walet Sarang putih', scientificName: 'Aerodramus fuciphagus', history: { '2026': 35 }, unit: 'Ekor' },
      { no: 9, localName: 'Cabai Jawa', scientificName: 'Dicaeum trochileum', history: { '2026': 29 }, unit: 'Ekor' },
      { no: 10, localName: 'Blekok Sawah', scientificName: 'Ardeola speciosa', history: { '2026': 28 }, unit: 'Ekor' },
      { no: 11, localName: 'Kapinis Laut', scientificName: 'Apus pacificus', history: { '2026': 27 }, unit: 'Ekor' },
      { no: 12, localName: 'Kapinis Rumah', scientificName: 'Apus nipalensis', history: { '2026': 25 }, unit: 'Ekor' },
      { no: 13, localName: 'Remetuk Laut', scientificName: 'Gerygone sulphurea', history: { '2026': 23 }, unit: 'Ekor' },
      { no: 14, localName: 'Cinenen Pisang', scientificName: 'Orthotomus sutorius', history: { '2026': 22 }, unit: 'Ekor' },
      { no: 15, localName: 'Biawak Air', scientificName: 'Varanus salvator', history: { '2026': 22 }, unit: 'Ekor' },
      { no: 16, localName: 'Perkutut Jawa', scientificName: 'Geopelia striata', history: { '2026': 21 }, unit: 'Ekor' },
      { no: 17, localName: 'Bunglon Kebun', scientificName: 'Calotes versicolor', history: { '2026': 21 }, unit: 'Ekor' },
      { no: 18, localName: 'Burung madu Sriganti', scientificName: 'Cinnyris jugularis', history: { '2026': 20 }, unit: 'Ekor' },
      { no: 19, localName: 'Cekakak Laut', scientificName: 'Todiramphus chloris', history: { '2026': 20 }, unit: 'Ekor' },
      { no: 20, localName: 'Layang-layang Loreng', scientificName: 'Cecropis striolata', history: { '2026': 19 }, unit: 'Ekor' },
      { no: 21, localName: 'Kekep Babi', scientificName: 'Artamus leucoryn', history: { '2026': 17 }, unit: 'Ekor' },
      { no: 22, localName: 'Merbah Cerukcuk', scientificName: 'Pycnonotus goiavier', history: { '2026': 15 }, unit: 'Ekor' },
      { no: 23, localName: 'Kuntul Kecil', scientificName: 'Egretta garzetta', history: { '2026': 14 }, unit: 'Ekor' },
      { no: 24, localName: 'Ibis Rokoroko', scientificName: 'Plegadis falcinellus', isProtectedIndo: true, history: { '2026': 13 }, unit: 'Ekor' },
      { no: 25, localName: 'Kokokan Laut', scientificName: 'Butorides striatus', history: { '2026': 12 }, unit: 'Ekor' },
      { no: 26, localName: 'Cinenen Jawa', scientificName: 'Orthotomus sepium', history: { '2026': 9 }, unit: 'Ekor' },
      { no: 27, localName: 'Alap-alap Sapi', scientificName: 'Falco moluccensis', isProtectedIndo: true, history: { '2026': 3 }, unit: 'Ekor' },
      { no: 28, localName: 'Penyu Lekang', scientificName: 'Lepidochelys olivacea', iucn: 'VU', isProtectedIndo: true, history: { '2026': 2 }, unit: 'Ekor' },
      { no: 29, localName: 'Ikan Nila', scientificName: 'Oreochromis niloticus', history: { '2026': 42 }, unit: 'Ekor' },
    ]
  }
};
