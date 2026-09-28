import type { Product, ProductCategory, ProductReview } from "@/types/product";
import { productPlaceholder } from "@/utils/placeholder";

function reviews(entries: [string, number, string, string][]): ProductReview[] {
  return entries.map(([author, rating, comment, date], i) => ({
    id: `r${i}`,
    author,
    rating,
    comment,
    date,
    verified: true,
  }));
}

interface Draft {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  shortDescription: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  ingredients?: string[];
  characteristics: [string, string][];
  usage?: string;
  stock: number;
  reviews: ProductReview[];
  tags: string[];
  requiresPrescription?: boolean;
  relatedIds: string[];
}

function build(d: Draft): Product {
  const rating =
    d.reviews.length > 0
      ? Math.round((d.reviews.reduce((s, r) => s + r.rating, 0) / d.reviews.length) * 10) / 10
      : 4.5;
  return {
    id: d.id,
    name: d.name,
    brand: d.brand,
    category: d.category,
    shortDescription: d.shortDescription,
    description: d.description,
    price: d.price,
    promotionalPrice: d.promotionalPrice,
    images: [productPlaceholder(d.name, d.category), productPlaceholder(d.brand + " " + d.name, d.category)],
    ingredients: d.ingredients,
    characteristics: d.characteristics.map(([label, value]) => ({ label, value })),
    usage: d.usage,
    stock: d.stock,
    rating,
    reviewCount: d.reviews.length,
    reviews: d.reviews,
    tags: d.tags,
    requiresPrescription: d.requiresPrescription,
    relatedIds: d.relatedIds,
  };
}

const drafts: Draft[] = [
  // VITAMINAS
  {
    id: "vit-d3-2000",
    name: "Vitamina D3 2000 UI",
    brand: "Vitalab",
    category: "vitaminas",
    shortDescription: "Suporte à imunidade, ossos e músculos, 60 cápsulas.",
    description:
      "Suplemento de vitamina D3 (colecalciferol) em cápsulas de fácil deglutição. Contribui para a manutenção de ossos e dentes saudáveis e para o funcionamento normal do sistema imunológico. Ideal para quem tem pouca exposição solar.",
    price: 39.9,
    promotionalPrice: 32.9,
    ingredients: ["Colecalciferol (vitamina D3) 2000 UI", "Óleo de girassol", "Cápsula de gelatina bovina"],
    characteristics: [
      ["Forma", "Cápsulas softgel"],
      ["Quantidade", "60 cápsulas"],
      ["Duração aproximada", "60 dias"],
      ["Restrições", "Não recomendado para gestantes sem orientação médica"],
    ],
    usage: "1 cápsula ao dia, junto de uma refeição, ou conforme orientação profissional.",
    stock: 84,
    reviews: reviews([
      ["Camila R.", 5, "Uso há 3 meses, meu exame de vitamina D melhorou bastante.", "12/08/2026"],
      ["Eduardo M.", 4, "Cápsula grande, mas fácil de engolir com água.", "02/07/2026"],
    ]),
    tags: ["imunidade", "ossos", "vitamina d", "sol"],
    relatedIds: ["complexo-b", "vit-c-efervescente", "melatonina-021"],
  },
  {
    id: "complexo-b",
    name: "Complexo B Ativo",
    brand: "NutriBem",
    category: "vitaminas",
    shortDescription: "Energia e sistema nervoso, 60 comprimidos.",
    description:
      "Combinação das vitaminas do complexo B (B1, B2, B6, B12 e ácido fólico), que contribuem para o metabolismo energético normal e para o funcionamento do sistema nervoso.",
    price: 29.9,
    ingredients: ["Vitamina B1", "Vitamina B2", "Vitamina B6", "Vitamina B12", "Ácido fólico"],
    characteristics: [
      ["Forma", "Comprimidos revestidos"],
      ["Quantidade", "60 comprimidos"],
      ["Duração aproximada", "60 dias"],
    ],
    usage: "1 comprimido ao dia, pela manhã, com um copo de água.",
    stock: 120,
    reviews: reviews([
      ["Paulo H.", 5, "Notei diferença na disposição depois de duas semanas.", "20/06/2026"],
      ["Larissa T.", 4, "Bom custo-benefício.", "14/05/2026"],
    ]),
    tags: ["energia", "disposição", "sistema nervoso"],
    relatedIds: ["vit-d3-2000", "cha-relaxante", "whey-baunilha"],
  },
  {
    id: "vit-c-efervescente",
    name: "Vitamina C 1g Efervescente",
    brand: "EssenVida",
    category: "vitaminas",
    shortDescription: "Antioxidante e imunidade, sabor laranja, 10 comprimidos.",
    description:
      "Vitamina C em comprimidos efervescentes de sabor laranja. Contribui para a proteção das células contra o estresse oxidativo e para o funcionamento normal do sistema imunológico.",
    price: 18.5,
    promotionalPrice: 15.9,
    ingredients: ["Ácido ascórbico (vitamina C) 1000mg", "Aromatizante natural de laranja"],
    characteristics: [
      ["Forma", "Comprimido efervescente"],
      ["Quantidade", "10 comprimidos"],
      ["Sabor", "Laranja"],
    ],
    usage: "Dissolver 1 comprimido em um copo de água (200ml) por dia.",
    stock: 200,
    reviews: reviews([
      ["Fernanda O.", 5, "Sabor muito bom, uso todo inverno.", "05/06/2026"],
      ["Ricardo A.", 4, "Prático para levar na bolsa.", "22/04/2026"],
    ]),
    tags: ["imunidade", "antioxidante", "gripes e resfriados"],
    relatedIds: ["vit-d3-2000", "cha-relaxante", "analgesico-paracetamol"],
  },

  // SUPLEMENTOS
  {
    id: "whey-baunilha",
    name: "Whey Protein Concentrado Baunilha 900g",
    brand: "BioNutri",
    category: "suplementos",
    shortDescription: "24g de proteína por dose, recuperação muscular.",
    description:
      "Whey protein concentrado sabor baunilha, rico em aminoácidos essenciais. Auxilia na recuperação muscular após o treino e complementa a ingestão diária de proteínas.",
    price: 139.9,
    promotionalPrice: 119.9,
    ingredients: ["Concentrado proteico do soro do leite (Whey)", "Aromatizante de baunilha", "Lecitina de soja", "Adoçante sucralose"],
    characteristics: [
      ["Proteína por dose", "24g"],
      ["Peso", "900g"],
      ["Porções", "30 doses de 30g"],
      ["Sabor", "Baunilha"],
      ["Contém", "Leite e derivados, soja"],
    ],
    usage: "1 dose (30g) diluída em 200ml de água ou leite, preferencialmente após o treino.",
    stock: 46,
    reviews: reviews([
      ["Bruno S.", 5, "Dissolve bem e o sabor não é enjoativo.", "18/09/2026"],
      ["Ana Paula V.", 4, "Bom para quem malha e quer completar a proteína do dia.", "30/08/2026"],
    ]),
    tags: ["proteína", "pós-treino", "hipertrofia", "recuperação muscular"],
    relatedIds: ["proteina-vegetal", "fibras-prebioticas", "complexo-b"],
  },
  {
    id: "proteina-vegetal",
    name: "Proteína Vegetal de Ervilha 600g",
    brand: "Naturama",
    category: "suplementos",
    shortDescription: "Proteína 100% vegetal, sem lactose, sabor cacau.",
    description:
      "Proteína isolada de ervilha, ideal para quem tem restrição a laticínios ou segue dieta vegetariana/vegana. Boa fonte de aminoácidos de cadeia ramificada (BCAA).",
    price: 99.9,
    ingredients: ["Proteína isolada de ervilha", "Cacau em pó", "Adoçante natural (stevia)"],
    characteristics: [
      ["Proteína por dose", "20g"],
      ["Peso", "600g"],
      ["Sabor", "Cacau"],
      ["Restrições", "Sem lactose, sem glúten"],
    ],
    usage: "1 dose (25g) diluída em água, bebida vegetal ou batida com frutas.",
    stock: 33,
    reviews: reviews([
      ["Juliana K.", 5, "Finalmente uma proteína vegetal com sabor gostoso.", "10/09/2026"],
      ["Marcelo D.", 4, "Mistura fácil, não empelota.", "25/07/2026"],
    ]),
    tags: ["proteína vegetal", "vegano", "sem lactose"],
    relatedIds: ["whey-baunilha", "fibras-prebioticas", "oleo-lavanda"],
  },
  {
    id: "fibras-prebioticas",
    name: "Fibras Prebióticas em Pó 300g",
    brand: "NutriBem",
    category: "suplementos",
    shortDescription: "Saúde intestinal, sabor neutro, 300g.",
    description:
      "Mistura de fibras solúveis (inulina e FOS) que auxiliam no funcionamento do intestino e servem de alimento para a microbiota intestinal. Sabor neutro, pode ser adicionado a qualquer preparo.",
    price: 54.9,
    ingredients: ["Inulina", "Fruto-oligossacarídeos (FOS)"],
    characteristics: [
      ["Peso", "300g"],
      ["Porções", "60 doses de 5g"],
      ["Sabor", "Neutro"],
    ],
    usage: "1 colher de sobremesa (5g) por dia, misturada em água, suco ou iogurte.",
    stock: 58,
    reviews: reviews([
      ["Tatiane M.", 5, "Ajudou muito meu funcionamento intestinal.", "01/09/2026"],
      ["Diego F.", 4, "Sabor neutro mesmo, não interfere nas receitas.", "12/06/2026"],
    ]),
    tags: ["fibras", "intestino", "digestão"],
    relatedIds: ["whey-baunilha", "cha-relaxante", "proteina-vegetal"],
  },

  // CUIDADOS PESSOAIS
  {
    id: "protetor-solar-fps60",
    name: "Protetor Solar Facial FPS 60",
    brand: "DermoPure",
    category: "cuidados-pessoais",
    shortDescription: "Toque seco, sem oleosidade, 50g.",
    description:
      "Protetor solar facial com FPS 60 e toque seco, formulado para uso diário sob maquiagem. Textura leve que não deixa a pele oleosa nem esbranquiçada.",
    price: 69.9,
    promotionalPrice: 59.9,
    ingredients: ["Filtros UVA/UVB", "Niacinamida", "Ácido hialurônico"],
    characteristics: [
      ["FPS", "60"],
      ["Peso", "50g"],
      ["Acabamento", "Toque seco"],
      ["Tipo de pele", "Todos os tipos"],
    ],
    usage: "Aplicar generosamente no rosto pela manhã e reaplicar a cada 3 horas de exposição solar.",
    stock: 70,
    reviews: reviews([
      ["Renata C.", 5, "Não deixa a pele branca e segura o dia todo.", "15/09/2026"],
      ["Igor P.", 5, "Ótimo sob o protetor... digo, sob a maquiagem.", "03/08/2026"],
    ]),
    tags: ["protetor solar", "rosto", "toque seco"],
    relatedIds: ["hidratante-ureia", "serum-vitamina-c", "mascara-capilar"],
  },
  {
    id: "hidratante-ureia",
    name: "Hidratante Corporal Ureia 10% 400ml",
    brand: "DermoPure",
    category: "cuidados-pessoais",
    shortDescription: "Para peles muito secas, absorção rápida.",
    description:
      "Loção hidratante corporal com 10% de ureia, indicada para peles secas e ásperas. Absorção rápida e sem sensação pegajosa.",
    price: 34.9,
    ingredients: ["Ureia 10%", "Glicerina", "Manteiga de karité"],
    characteristics: [
      ["Volume", "400ml"],
      ["Concentração de ureia", "10%"],
      ["Fragância", "Suave"],
    ],
    usage: "Aplicar no corpo após o banho, com a pele ainda úmida.",
    stock: 90,
    reviews: reviews([
      ["Silvia N.", 5, "Resolveu minha pele ressecada do inverno.", "28/07/2026"],
      ["Otávio L.", 4, "Textura boa, absorve rápido.", "19/06/2026"],
    ]),
    tags: ["pele seca", "hidratação", "corpo"],
    relatedIds: ["protetor-solar-fps60", "serum-vitamina-c", "sabonete-antisseptico"],
  },
  {
    id: "kit-barba",
    name: "Kit Barba Completo",
    brand: "ActivaFit",
    category: "cuidados-pessoais",
    shortDescription: "Óleo, shampoo e pente para barba.",
    description:
      "Kit completo para cuidados com a barba: óleo hidratante, shampoo específico e pente de madeira. Ajuda a amaciar os fios e cuidar da pele abaixo da barba.",
    price: 79.9,
    ingredients: ["Óleo de argan", "Óleo de jojoba", "Tensoativos suaves"],
    characteristics: [
      ["Itens no kit", "Óleo 30ml, shampoo 150ml, pente"],
      ["Indicação", "Barbas médias a longas"],
    ],
    usage: "Aplicar o óleo diariamente após o banho e usar o shampoo 2-3x por semana.",
    stock: 40,
    reviews: reviews([
      ["Vinícius A.", 5, "Barba ficou bem mais macia em uma semana.", "22/08/2026"],
      ["Henrique B.", 4, "Cheiro discreto e agradável.", "10/07/2026"],
    ]),
    tags: ["barba", "masculino", "kit"],
    relatedIds: ["hidratante-ureia", "sabonete-antisseptico", "batom-hidratante"],
  },

  // HIGIENE
  {
    id: "sabonete-antisseptico",
    name: "Sabonete Líquido Antisséptico 500ml",
    brand: "PureCare",
    category: "higiene",
    shortDescription: "Limpeza e proteção para as mãos, refil 500ml.",
    description:
      "Sabonete líquido com ação antisséptica para higienização das mãos, sem ressecar a pele. Embalagem econômica de 500ml.",
    price: 19.9,
    ingredients: ["Tensoativos suaves", "Triclosan", "Glicerina"],
    characteristics: [
      ["Volume", "500ml"],
      ["Ação", "Antisséptica"],
    ],
    usage: "Aplicar nas mãos molhadas, esfregar por 20 segundos e enxaguar.",
    stock: 150,
    reviews: reviews([
      ["Cristina F.", 5, "Não resseca as mãos mesmo usando várias vezes ao dia.", "01/09/2026"],
      ["Douglas R.", 4, "Rende bastante.", "14/08/2026"],
    ]),
    tags: ["higiene das mãos", "antisséptico"],
    relatedIds: ["alcool-gel", "escova-dental", "hidratante-ureia"],
  },
  {
    id: "escova-dental",
    name: "Escova Dental Macia (kit 3 unidades)",
    brand: "PureCare",
    category: "higiene",
    shortDescription: "Cerdas macias, cabeça compacta, kit com 3.",
    description:
      "Kit com 3 escovas dentais de cerdas macias e cabeça compacta, indicada para limpeza eficiente sem agredir a gengiva.",
    price: 24.9,
    characteristics: [
      ["Quantidade", "3 unidades"],
      ["Tipo de cerdas", "Macias"],
    ],
    usage: "Escovar os dentes após as refeições, substituindo a escova a cada 3 meses.",
    stock: 200,
    reviews: reviews([
      ["Patrícia G.", 5, "Ótimo custo-benefício, cerdas realmente macias.", "05/07/2026"],
      ["Sérgio M.", 4, "Cabo confortável de segurar.", "20/05/2026"],
    ]),
    tags: ["higiene bucal", "escova de dente"],
    relatedIds: ["sabonete-antisseptico", "alcool-gel", "lenco-umedecido"],
  },
  {
    id: "alcool-gel",
    name: "Álcool em Gel 70% 500g",
    brand: "PureCare",
    category: "higiene",
    shortDescription: "Antisséptico para as mãos, sem enxágue.",
    description:
      "Álcool em gel 70° INPM com glicerina, para higienização das mãos sem necessidade de enxágue. Ação antisséptica de amplo espectro.",
    price: 14.9,
    promotionalPrice: 11.9,
    ingredients: ["Álcool etílico 70%", "Glicerina", "Carbopol"],
    characteristics: [
      ["Peso", "500g"],
      ["Concentração", "70° INPM"],
    ],
    usage: "Aplicar uma quantidade nas mãos e esfregar até secar.",
    stock: 300,
    reviews: reviews([
      ["Adriano V.", 5, "Não resseca e o gatilho funciona bem.", "18/09/2026"],
      ["Bianca S.", 5, "Compro sempre, ótimo preço.", "02/09/2026"],
    ]),
    tags: ["álcool em gel", "higienização"],
    relatedIds: ["sabonete-antisseptico", "escova-dental", "lenco-umedecido"],
  },

  // BEM-ESTAR
  {
    id: "cha-relaxante",
    name: "Chá Relaxante Camomila e Erva-cidreira",
    brand: "Floravita",
    category: "bem-estar",
    shortDescription: "Blend natural para relaxar, caixa com 20 sachês.",
    description:
      "Blend de camomila e erva-cidreira, tradicionalmente utilizado para promover relaxamento antes de dormir. Caixa com 20 sachês.",
    price: 16.9,
    ingredients: ["Camomila", "Erva-cidreira"],
    characteristics: [
      ["Quantidade", "20 sachês"],
      ["Cafeína", "Não contém"],
    ],
    usage: "1 sachê em água quente por 5 a 10 minutos, preferencialmente à noite.",
    stock: 110,
    reviews: reviews([
      ["Marisa T.", 5, "Virou parte da minha rotina antes de dormir.", "29/08/2026"],
      ["Felipe C.", 4, "Sabor suave e agradável.", "11/07/2026"],
    ]),
    tags: ["chá", "relaxamento", "sono"],
    relatedIds: ["oleo-lavanda", "melatonina-021", "complexo-b"],
  },
  {
    id: "oleo-lavanda",
    name: "Óleo Essencial de Lavanda 30ml",
    brand: "Floravita",
    category: "bem-estar",
    shortDescription: "100% natural, para difusor ou massagem.",
    description:
      "Óleo essencial de lavanda 100% natural, indicado para uso em difusores de ambiente ou diluído para massagem relaxante.",
    price: 44.9,
    ingredients: ["Óleo essencial de Lavandula angustifolia"],
    characteristics: [
      ["Volume", "30ml"],
      ["Uso", "Difusor ou diluído em óleo carreador"],
    ],
    usage: "3-5 gotas no difusor, ou diluído em óleo neutro para massagem.",
    stock: 65,
    reviews: reviews([
      ["Camile A.", 5, "Aroma muito bom, uso no difusor à noite.", "06/09/2026"],
      ["Rodrigo N.", 4, "Vidro escuro protege bem o óleo.", "22/06/2026"],
    ]),
    tags: ["óleo essencial", "aromaterapia", "relaxamento"],
    relatedIds: ["cha-relaxante", "melatonina-021", "proteina-vegetal"],
  },
  {
    id: "melatonina-021",
    name: "Melatonina 0,21mg",
    brand: "Vitalab",
    category: "bem-estar",
    shortDescription: "Auxilia a adormecer, 30 cápsulas.",
    description:
      "Suplemento de melatonina na dosagem regulamentada no Brasil, que auxilia a reduzir o tempo para adormecer. Não causa dependência.",
    price: 32.9,
    ingredients: ["Melatonina 0,21mg"],
    characteristics: [
      ["Quantidade", "30 cápsulas"],
      ["Dosagem", "0,21mg por cápsula"],
    ],
    usage: "1 cápsula, 30 minutos antes de dormir.",
    stock: 75,
    reviews: reviews([
      ["Gustavo P.", 4, "Ajudou a regular meu sono em viagens.", "14/09/2026"],
      ["Isabela F.", 5, "Não deixa sonolência no dia seguinte.", "30/07/2026"],
    ]),
    tags: ["sono", "melatonina", "insônia leve"],
    relatedIds: ["cha-relaxante", "oleo-lavanda", "vit-d3-2000"],
  },

  // MEDICAMENTOS (isentos de prescrição)
  {
    id: "analgesico-paracetamol",
    name: "Paracetamol 750mg",
    brand: "EssenVida",
    category: "medicamentos",
    shortDescription: "Alívio de dores leves e febre, 20 comprimidos.",
    description:
      "Analgésico e antitérmico para alívio de dores leves a moderadas e febre. Medicamento isento de prescrição — leia a bula antes de usar.",
    price: 12.9,
    ingredients: ["Paracetamol 750mg"],
    characteristics: [
      ["Quantidade", "20 comprimidos"],
      ["Classe", "Analgésico/antitérmico"],
    ],
    usage: "1 comprimido a cada 6-8 horas, sem exceder 4 doses em 24h. Consulte a bula.",
    stock: 180,
    reviews: reviews([
      ["Marcos T.", 5, "Sempre tenho em casa, eficaz para dor de cabeça.", "10/09/2026"],
      ["Priscila M.", 4, "Bom preço comparado a outras marcas.", "25/08/2026"],
    ]),
    tags: ["dor de cabeça", "febre", "analgésico"],
    requiresPrescription: false,
    relatedIds: ["antialergico-loratadina", "vit-c-efervescente", "cha-relaxante"],
  },
  {
    id: "antialergico-loratadina",
    name: "Loratadina 10mg",
    brand: "EssenVida",
    category: "medicamentos",
    shortDescription: "Alívio de sintomas de alergia, 12 comprimidos.",
    description:
      "Antialérgico indicado para rinite alérgica e urticária. Não costuma causar sonolência na dose recomendada. Medicamento isento de prescrição.",
    price: 18.9,
    ingredients: ["Loratadina 10mg"],
    characteristics: [
      ["Quantidade", "12 comprimidos"],
      ["Classe", "Antialérgico (anti-histamínico)"],
    ],
    usage: "1 comprimido ao dia. Consulte a bula para contraindicações.",
    stock: 130,
    reviews: reviews([
      ["Aline D.", 5, "Funciona bem para minha rinite de estação.", "01/09/2026"],
      ["Thiago V.", 4, "Não senti sonolência.", "19/07/2026"],
    ]),
    tags: ["alergia", "rinite", "antialérgico"],
    requiresPrescription: false,
    relatedIds: ["analgesico-paracetamol", "sabonete-antisseptico", "alcool-gel"],
  },
  {
    id: "pomada-assaduras",
    name: "Pomada para Assaduras 45g",
    brand: "MaterVita",
    category: "medicamentos",
    shortDescription: "Protege e trata a pele sensível do bebê.",
    description:
      "Pomada à base de óxido de zinco que forma uma barreira protetora contra a umidade, auxiliando na prevenção e tratamento de assaduras.",
    price: 24.9,
    ingredients: ["Óxido de zinco", "Óleo mineral", "Lanolina"],
    characteristics: [
      ["Peso", "45g"],
      ["Indicação", "Pele sensível de bebês"],
    ],
    usage: "Aplicar camada fina a cada troca de fralda.",
    stock: 95,
    reviews: reviews([
      ["Fabiana L.", 5, "Resolveu a assadura do meu filho em 2 dias.", "12/09/2026"],
      ["Rafael K.", 5, "Não sai facilmente com a água, protege bem.", "28/06/2026"],
    ]),
    tags: ["bebê", "assadura", "pele sensível"],
    requiresPrescription: false,
    relatedIds: ["fralda-rn", "shampoo-infantil", "lenco-umedecido"],
  },

  // BEBÊ
  {
    id: "fralda-rn",
    name: "Fralda Descartável Tamanho RN",
    brand: "MaterVita",
    category: "bebe",
    shortDescription: "Pacote com 40 unidades, toque macio.",
    description:
      "Fraldas descartáveis tamanho recém-nascido, com camada absorvente e toque macio. Indicador de umidade.",
    price: 29.9,
    characteristics: [
      ["Quantidade", "40 unidades"],
      ["Tamanho", "RN (até 5kg)"],
      ["Indicador de umidade", "Sim"],
    ],
    usage: "Trocar a cada 3 horas ou quando necessário.",
    stock: 140,
    reviews: reviews([
      ["Natália B.", 5, "Não vazou nenhuma vez, super macia.", "08/09/2026"],
      ["Leandro O.", 4, "Bom custo-benefício para recém-nascido.", "15/07/2026"],
    ]),
    tags: ["fralda", "recém-nascido"],
    relatedIds: ["shampoo-infantil", "lenco-umedecido", "pomada-assaduras"],
  },
  {
    id: "shampoo-infantil",
    name: "Shampoo Infantil Suave 400ml",
    brand: "MaterVita",
    category: "bebe",
    shortDescription: "Fórmula sem lágrimas, testado dermatologicamente.",
    description:
      "Shampoo infantil de fórmula suave e sem lágrimas, testado dermatologicamente. Limpa sem ressecar o couro cabeludo do bebê.",
    price: 22.9,
    ingredients: ["Tensoativos suaves", "Pantenol", "Extrato de camomila"],
    characteristics: [
      ["Volume", "400ml"],
      ["Fórmula", "Sem lágrimas"],
    ],
    usage: "Aplicar no cabelo molhado, massagear suavemente e enxaguar.",
    stock: 100,
    reviews: reviews([
      ["Camila S.", 5, "Cheirinho gostoso e não arde os olhos.", "20/08/2026"],
      ["Wagner P.", 4, "Rende bastante o frasco.", "03/06/2026"],
    ]),
    tags: ["bebê", "shampoo", "sem lágrimas"],
    relatedIds: ["fralda-rn", "lenco-umedecido", "pomada-assaduras"],
  },
  {
    id: "lenco-umedecido",
    name: "Lenço Umedecido (pacote 3x50un)",
    brand: "MaterVita",
    category: "bebe",
    shortDescription: "Pele sensível, sem álcool, kit econômico.",
    description:
      "Lenços umedecidos para higiene do bebê, sem álcool e testados dermatologicamente. Kit econômico com 3 pacotes de 50 unidades.",
    price: 27.9,
    characteristics: [
      ["Quantidade", "150 unidades (3x50)"],
      ["Contém álcool", "Não"],
    ],
    usage: "Usar para limpeza durante a troca de fraldas ou higiene geral.",
    stock: 160,
    reviews: reviews([
      ["Débora M.", 5, "Textura grossa, não rasga fácil.", "17/09/2026"],
      ["Anderson C.", 5, "Ótimo para levar na bolsa maternidade.", "04/08/2026"],
    ]),
    tags: ["bebê", "lenço umedecido", "higiene"],
    relatedIds: ["fralda-rn", "shampoo-infantil", "pomada-assaduras"],
  },

  // BELEZA
  {
    id: "serum-vitamina-c",
    name: "Sérum Facial Vitamina C 30ml",
    brand: "DermoPure",
    category: "beleza",
    shortDescription: "Uniformiza o tom da pele e dá luminosidade.",
    description:
      "Sérum facial com vitamina C estabilizada, antioxidante, que auxilia a uniformizar o tom da pele e dar mais luminosidade ao rosto.",
    price: 89.9,
    promotionalPrice: 74.9,
    ingredients: ["Ácido ascórbico estabilizado", "Ácido hialurônico", "Vitamina E"],
    characteristics: [
      ["Volume", "30ml"],
      ["Concentração de vitamina C", "10%"],
    ],
    usage: "Aplicar 2-3 gotas no rosto limpo pela manhã, antes do protetor solar.",
    stock: 55,
    reviews: reviews([
      ["Simone R.", 5, "Pele muito mais uniforme depois de um mês.", "13/09/2026"],
      ["Vanessa H.", 4, "Textura leve, absorve rápido.", "27/07/2026"],
    ]),
    tags: ["sérum", "vitamina c", "luminosidade"],
    relatedIds: ["protetor-solar-fps60", "hidratante-ureia", "mascara-capilar"],
  },
  {
    id: "mascara-capilar",
    name: "Máscara Capilar Reparadora 300g",
    brand: "Naturama",
    category: "beleza",
    shortDescription: "Repõe nutrientes e reduz o frizz.",
    description:
      "Máscara de tratamento capilar com ativos nutritivos, indicada para cabelos ressecados ou danificados por química e calor. Reduz o frizz e devolve o brilho.",
    price: 42.9,
    ingredients: ["Óleo de argan", "Manteiga de karité", "Proteína de trigo"],
    characteristics: [
      ["Peso", "300g"],
      ["Indicação", "Cabelos secos e danificados"],
    ],
    usage: "Aplicar nos fios lavados, deixar agir 5-10 minutos e enxaguar.",
    stock: 62,
    reviews: reviews([
      ["Beatriz L.", 5, "Cabelo ficou muito mais macio e brilhoso.", "09/09/2026"],
      ["Caroline S.", 5, "Reduziu bastante o frizz do meu cabelo.", "21/06/2026"],
    ]),
    tags: ["cabelo", "hidratação capilar", "frizz"],
    relatedIds: ["serum-vitamina-c", "oleo-lavanda", "protetor-solar-fps60"],
  },
  {
    id: "batom-hidratante",
    name: "Batom Hidratante Vegano",
    brand: "Belline",
    category: "beleza",
    shortDescription: "Cor natural com cuidado labial, vegano.",
    description:
      "Batom com fórmula vegana que hidrata enquanto colore. Cor natural que valoriza os lábios sem ressecar.",
    price: 29.9,
    ingredients: ["Manteiga de karité", "Óleo de coco", "Pigmentos minerais"],
    characteristics: [
      ["Fórmula", "Vegana, sem testes em animais"],
      ["Acabamento", "Semi-brilho"],
    ],
    usage: "Aplicar diretamente nos lábios, reaplicando conforme necessário.",
    stock: 88,
    reviews: reviews([
      ["Milena F.", 5, "Não resseca os lábios, cor linda no dia a dia.", "16/09/2026"],
      ["Yasmin G.", 4, "Ótima duração para um batom natural.", "02/08/2026"],
    ]),
    tags: ["batom", "vegano", "lábios"],
    relatedIds: ["serum-vitamina-c", "mascara-capilar", "kit-barba"],
  },
];

export const products: Product[] = drafts.map(build);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [
      p.name,
      p.brand,
      p.shortDescription,
      p.category,
      ...(p.ingredients ?? []),
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
