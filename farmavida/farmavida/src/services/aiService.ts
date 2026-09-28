import type { Product } from "@/types/product";
import type { ChatContext, ChatMessage, QuickReply } from "@/types/chat";
import type { CartItem } from "@/types/cart";
import { products, getProductById, searchProducts as searchCatalog } from "@/data/products";

/**
 * Abstraction layer for the shopping assistant.
 *
 * The UI only ever talks to this interface, never to a specific AI provider.
 * `MockAIService` below is a realistic, fully rule-based stand-in that can be
 * swapped later for an implementation backed by a real LLM API without any
 * changes to the components that consume it.
 */
export interface IAIService {
  sendMessage(
    text: string,
    context: ChatContext,
    cart: CartItem[]
  ): Promise<{ message: ChatMessage; context: ChatContext }>;
  getProductRecommendations(topic: string, filters?: Record<string, string>): Product[];
  compareProducts(productIds: string[]): NonNullable<ChatMessage["comparison"]>;
  searchProducts(query: string): Product[];
  getProductInformation(productId: string): string;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `msg-${Date.now()}-${idCounter}`;
}

function makeMessage(partial: Omit<ChatMessage, "id" | "createdAt" | "role"> & { role?: ChatMessage["role"] }): ChatMessage {
  return {
    id: nextId(),
    role: partial.role ?? "assistant",
    createdAt: Date.now(),
    ...partial,
  };
}

// ---------------------------------------------------------------------------
// Topic detection
// ---------------------------------------------------------------------------

type Topic =
  | "emagrecimento"
  | "sono"
  | "imunidade"
  | "treino"
  | "pele"
  | "bebe"
  | "higiene"
  | "geral";

const topicKeywords: Record<Topic, string[]> = {
  emagrecimento: ["emagrec", "perder peso", "peso", "dieta", "secar", "definição"],
  sono: ["dormir", "sono", "insônia", "insonia", "relaxar", "ansiedade leve", "estresse"],
  imunidade: ["imunidade", "gripe", "resfriado", "defesa", "imunológic"],
  treino: ["treino", "academia", "pós-treino", "pos treino", "proteína", "proteina", "massa muscular", "hipertrofia", "whey"],
  pele: ["pele", "acne", "espinha", "mancha", "rosto", "rugas", "sérum", "serum"],
  bebe: ["bebê", "bebe", "meu filho", "minha filha", "recém-nascido", "recem nascido", "fralda"],
  higiene: ["higiene", "mãos", "maos", "álcool em gel", "sabonete"],
  geral: [],
};

const safetyKeywords: { patterns: string[]; note: string }[] = [
  {
    patterns: ["grávida", "gravida", "gestante", "amamentando", "amamentação"],
    note:
      "Como você mencionou gravidez ou amamentação, é importante confirmar com seu médico ou obstetra antes de usar qualquer suplemento ou medicamento — mesmo os naturais podem não ser indicados nessa fase.",
  },
  {
    patterns: ["remédio contínuo", "remedio continuo", "uso contínuo", "tomo remédio", "tomo remedio", "medicamento controlado", "pressão alta", "pressao alta", "diabetes", "interação", "interacao"],
    note:
      "Como você mencionou o uso de outro medicamento, o ideal é confirmar com seu médico ou farmacêutico antes de combinar com um novo produto, para evitar interações.",
  },
  {
    patterns: ["febre alta", "dor forte", "dor intensa", "sangramento", "desmaio", "falta de ar", "dor no peito"],
    note:
      "Pelo que você descreveu, esse sintoma merece avaliação de um profissional de saúde o quanto antes — não é algo que um produto de prateleira deva resolver sozinho.",
  },
  {
    patterns: ["criança de colo", "recém-nascido com febre", "bebê com febre", "bebe com febre"],
    note:
      "Febre em bebês pequenos deve ser avaliada por um pediatra — posso ajudar com produtos de cuidado geral, mas não com o tratamento da febre em si.",
  },
];

function detectTopic(text: string): Topic {
  const t = text.toLowerCase();
  for (const topic of Object.keys(topicKeywords) as Topic[]) {
    if (topic === "geral") continue;
    if (topicKeywords[topic].some((kw) => t.includes(kw))) return topic;
  }
  return "geral";
}

function detectSafetyNote(text: string): string | null {
  const t = text.toLowerCase();
  for (const entry of safetyKeywords) {
    if (entry.patterns.some((kw) => t.includes(kw))) return entry.note;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Clarifying questions + recommendation logic per topic
// ---------------------------------------------------------------------------

interface TopicScript {
  clarify: string;
  clarifyReplies: QuickReply[];
  recommend: (answer: string) => { text: string; productIds: string[] };
}

const topicScripts: Partial<Record<Topic, TopicScript>> = {
  emagrecimento: {
    clarify:
      "Posso te ajudar com isso. Para indicar os produtos certos: seu foco é mais controle de apetite, substituir uma refeição, ou apoio nos treinos? E você já usa algum suplemento hoje?",
    clarifyReplies: [
      { id: "apetite", label: "Controle de apetite" },
      { id: "refeicao", label: "Substituir refeição" },
      { id: "treino", label: "Apoio nos treinos" },
    ],
    recommend: (answer) => {
      const a = answer.toLowerCase();
      if (a.includes("refeição") || a.includes("refeicao") || a.includes("substituir")) {
        return {
          text: "Nesse caso, as fibras prebióticas ajudam a dar mais saciedade e a proteína vegetal é uma boa base para um shake substituto, já que sacia e tem baixo teor de gordura. Nenhuma delas promete emagrecimento sozinha — o resultado depende da rotina alimentar como um todo.",
          productIds: ["fibras-prebioticas", "proteina-vegetal"],
        };
      }
      if (a.includes("treino") || a.includes("apoio")) {
        return {
          text: "Para quem treina, o whey protein ajuda a manter a saciedade e preservar massa muscular durante um déficit calórico, e as fibras prebióticas contribuem para a digestão. Combinar isso com orientação nutricional tende a dar resultados mais consistentes.",
          productIds: ["whey-baunilha", "fibras-prebioticas"],
        };
      }
      return {
        text: "Para controle de apetite, as fibras prebióticas ajudam a dar mais saciedade ao longo do dia, e a proteína vegetal é uma opção leve para os lanches. Nenhum produto substitui uma reeducação alimentar, mas eles podem apoiar sua rotina.",
        productIds: ["fibras-prebioticas", "proteina-vegetal"],
      };
    },
  },
  sono: {
    clarify:
      "Entendi. É mais dificuldade para pegar no sono, ou você acorda com facilidade durante a noite? E prefere algo natural (chá/óleo) ou um suplemento como a melatonina?",
    clarifyReplies: [
      { id: "natural", label: "Prefiro algo natural" },
      { id: "melatonina", label: "Pode ser melatonina" },
      { id: "os-dois", label: "Qualquer um serve" },
    ],
    recommend: (answer) => {
      const a = answer.toLowerCase();
      if (a.includes("melatonina")) {
        return {
          text: "A melatonina 0,21mg segue a dosagem regulamentada no Brasil e ajuda a reduzir o tempo para adormecer, sem causar dependência. O chá de camomila com erva-cidreira é uma boa opção para o ritual antes de deitar, se quiser combinar.",
          productIds: ["melatonina-021", "cha-relaxante"],
        };
      }
      return {
        text: "O chá de camomila com erva-cidreira ajuda a criar um ritual relaxante antes de dormir, e o óleo essencial de lavanda no difusor complementa bem o ambiente. São opções naturais e suaves para começar.",
        productIds: ["cha-relaxante", "oleo-lavanda"],
      };
    },
  },
  imunidade: {
    clarify:
      "Você está se preparando para o período de frio/gripes, ou já está sentindo os primeiros sintomas? E tem preferência entre vitamina C, vitamina D ou complexo B?",
    clarifyReplies: [
      { id: "prevencao", label: "Prevenção" },
      { id: "primeiros-sintomas", label: "Primeiros sintomas" },
      { id: "sem-preferencia", label: "Sem preferência" },
    ],
    recommend: () => ({
      text: "A vitamina D3 e a vitamina C efervescente são as mais buscadas para apoiar o sistema imunológico no dia a dia. Se os sintomas já começaram, um profissional pode orientar melhor o que usar além dos suplementos.",
      productIds: ["vit-d3-2000", "vit-c-efervescente"],
    }),
  },
  treino: {
    clarify:
      "Você busca mais proteína para recuperação muscular, ou algo para a digestão/saciedade no dia a dia? Tem alguma restrição, como intolerância à lactose?",
    clarifyReplies: [
      { id: "lactose", label: "Tenho intolerância à lactose" },
      { id: "sem-restricao", label: "Sem restrições" },
      { id: "so-recuperacao", label: "Só quero recuperação" },
    ],
    recommend: (answer) => {
      const a = answer.toLowerCase();
      if (a.includes("lactose") || a.includes("vegan") || a.includes("vegetal")) {
        return {
          text: "Nesse caso, a proteína vegetal de ervilha é uma ótima escolha: sem lactose, com bom perfil de aminoácidos para recuperação muscular. O complexo B pode complementar apoiando o metabolismo energético dos treinos.",
          productIds: ["proteina-vegetal", "complexo-b"],
        };
      }
      return {
        text: "O whey protein concentrado tem 24g de proteína por dose e é uma das opções mais eficientes para recuperação pós-treino. O complexo B ajuda no metabolismo energético do dia a dia de quem treina com frequência.",
        productIds: ["whey-baunilha", "complexo-b"],
      };
    },
  },
  pele: {
    clarify:
      "Legal! Seu foco é mais proteção solar no dia a dia, ou tratamento — tipo manchas, oleosidade ou ressecamento?",
    clarifyReplies: [
      { id: "protecao", label: "Proteção solar" },
      { id: "manchas", label: "Manchas/luminosidade" },
      { id: "ressecamento", label: "Ressecamento" },
    ],
    recommend: (answer) => {
      const a = answer.toLowerCase();
      if (a.includes("mancha") || a.includes("luminos")) {
        return {
          text: "O sérum de vitamina C ajuda a uniformizar o tom da pele e dar mais luminosidade com o uso contínuo. Vale sempre usar protetor solar junto, já que a vitamina C sozinha não substitui a proteção.",
          productIds: ["serum-vitamina-c", "protetor-solar-fps60"],
        };
      }
      if (a.includes("resseca")) {
        return {
          text: "O hidratante corporal com ureia 10% é indicado justamente para peles secas e ásperas, com absorção rápida. Para o rosto, o sérum de vitamina C também ajuda a reforçar a barreira de hidratação.",
          productIds: ["hidratante-ureia", "serum-vitamina-c"],
        };
      }
      return {
        text: "O protetor solar facial FPS 60 tem toque seco e não deixa a pele oleosa nem esbranquiçada — ótimo para o uso diário, inclusive sob maquiagem.",
        productIds: ["protetor-solar-fps60", "serum-vitamina-c"],
      };
    },
  },
  bebe: {
    clarify:
      "Posso ajudar! Você está procurando itens de higiene do dia a dia (fralda, lenço, shampoo), ou algo específico como cuidado com assaduras?",
    clarifyReplies: [
      { id: "higiene-diaria", label: "Higiene do dia a dia" },
      { id: "assaduras", label: "Assaduras" },
      { id: "ambos", label: "Um pouco dos dois" },
    ],
    recommend: (answer) => {
      const a = answer.toLowerCase();
      if (a.includes("assadura")) {
        return {
          text: "A pomada para assaduras com óxido de zinco forma uma barreira protetora contra a umidade e ajuda tanto a prevenir quanto a tratar a irritação. Trocar a fralda com frequência também faz diferença.",
          productIds: ["pomada-assaduras", "fralda-rn", "lenco-umedecido"],
        };
      }
      return {
        text: "Para o dia a dia, essa combinação cobre bem: fralda tamanho RN com boa absorção, lenços umedecidos sem álcool e shampoo infantil com fórmula sem lágrimas.",
        productIds: ["fralda-rn", "lenco-umedecido", "shampoo-infantil"],
      };
    },
  },
};

// ---------------------------------------------------------------------------
// Free-text helpers (comparisons, greetings, fallback)
// ---------------------------------------------------------------------------

function findProductMentions(text: string): Product[] {
  const t = text.toLowerCase();

  const exact = products.filter((p) => t.includes(p.name.toLowerCase()));
  if (exact.length > 0) return exact;

  const scored = products
    .map((p) => {
      const keywords = [
        p.brand.toLowerCase(),
        ...p.tags.map((tag) => tag.toLowerCase()),
        ...p.name.toLowerCase().split(/\s+/).filter((w) => w.length >= 4),
      ];
      const score = keywords.reduce((best, kw) => (t.includes(kw) ? Math.max(best, kw.length) : best), 0);
      return { product: p, score };
    })
    .filter((entry) => entry.score >= 4)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((entry) => entry.product);
}

function isComparisonQuestion(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes("diferença") ||
    t.includes("diferenca") ||
    t.includes("comparar") ||
    t.includes("qual é melhor") ||
    t.includes("qual e melhor") ||
    (t.includes(" ou ") && t.includes("melhor"))
  );
}

function isCartQuestion(text: string): boolean {
  const t = text.toLowerCase();
  return (
    t.includes("carrinho") ||
    t.includes("tenho tudo") ||
    t.includes("falta algo") ||
    t.includes("o que falta")
  );
}

const greetingReplies: QuickReply[] = [
  { id: "emagrecer", label: "Quero emagrecer" },
  { id: "dormir-melhor", label: "Dormir melhor" },
  { id: "pos-treino", label: "Nutrição pós-treino" },
  { id: "imunidade", label: "Reforçar imunidade" },
];

function comparisonPoints(productsToCompare: Product[]) {
  const points: { label: string; values: string[] }[] = [
    { label: "Preço", values: productsToCompare.map((p) => formatPrice(p.promotionalPrice ?? p.price)) },
    { label: "Marca", values: productsToCompare.map((p) => p.brand) },
    { label: "Avaliação", values: productsToCompare.map((p) => `${p.rating.toFixed(1)} de 5`) },
  ];
  const charLabels = new Set<string>();
  productsToCompare.forEach((p) => p.characteristics.forEach((c) => charLabels.add(c.label)));
  Array.from(charLabels)
    .slice(0, 3)
    .forEach((label) => {
      points.push({
        label,
        values: productsToCompare.map((p) => p.characteristics.find((c) => c.label === label)?.value ?? "—"),
      });
    });
  return points;
}

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

// ---------------------------------------------------------------------------
// Mock AI Service implementation
// ---------------------------------------------------------------------------

class MockAIService implements IAIService {
  getProductRecommendations(topic: string, _filters?: Record<string, string>): Product[] {
    const script = topicScripts[topic as Topic];
    if (!script) return products.slice(0, 3);
    const { productIds } = script.recommend("");
    return productIds.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
  }

  compareProducts(productIds: string[]): NonNullable<ChatMessage["comparison"]> {
    const list = productIds.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
    return { products: list, points: comparisonPoints(list) };
  }

  searchProducts(query: string): Product[] {
    return searchCatalog(query);
  }

  getProductInformation(productId: string): string {
    const p = getProductById(productId);
    if (!p) return "Não encontrei esse produto no nosso catálogo.";
    return `${p.name} (${p.brand}) — ${p.shortDescription} ${p.usage ? `Modo de uso: ${p.usage}` : ""}`.trim();
  }

  async sendMessage(
    text: string,
    context: ChatContext,
    cart: CartItem[]
  ): Promise<{ message: ChatMessage; context: ChatContext }> {
    await delay(500 + Math.random() * 500);

    const trimmed = text.trim();
    const safetyNote = detectSafetyNote(trimmed);

    // Cart help
    if (isCartQuestion(trimmed)) {
      return { message: this.buildCartHelpMessage(cart), context: { ...context, stage: "cart-help" } };
    }

    // Stage: we already asked a clarifying question — this message is the answer.
    if (context.stage === "clarifying" && context.topic) {
      const script = topicScripts[context.topic as Topic];
      if (script) {
        const { text: recText, productIds } = script.recommend(trimmed);
        const recProducts = productIds.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
        const message = makeMessage({
          text: safetyNote ? recText : recText,
          products: recProducts,
          isSafetyNote: false,
        });
        const newContext: ChatContext = { ...context, stage: "recommending" };
        if (safetyNote) {
          return {
            message: makeMessage({
              text: `${safetyNote}\n\n${recText}`,
              products: recProducts,
            }),
            context: newContext,
          };
        }
        return { message, context: newContext };
      }
    }

    // Comparison question
    if (isComparisonQuestion(trimmed)) {
      const mentioned = findProductMentions(trimmed);
      let toCompare = mentioned;
      if (toCompare.length < 2 && context.topic) {
        toCompare = this.getProductRecommendations(context.topic).slice(0, 2);
      }
      if (toCompare.length < 2) {
        toCompare = products.slice(0, 2);
      }
      const comparison = this.compareProducts(toCompare.slice(0, 3).map((p) => p.id));
      const message = makeMessage({
        text: `Comparei ${comparison.products.map((p) => p.name).join(" e ")} para facilitar sua escolha:`,
        comparison,
      });
      return { message, context: { ...context, stage: "comparing" } };
    }

    // Direct product mention without comparison intent
    const mentioned = findProductMentions(trimmed);
    if (mentioned.length === 1) {
      const p = mentioned[0];
      const message = makeMessage({
        text: `${this.getProductInformation(p.id)}`,
        products: [p],
      });
      return { message, context: { ...context, stage: "free" } };
    }

    // Topic detection → ask a clarifying question first (unless safety-flagged)
    const topic = detectTopic(trimmed);
    if (topic !== "geral" && topicScripts[topic]) {
      const script = topicScripts[topic]!;
      const clarifyText = safetyNote ? `${safetyNote}\n\n${script.clarify}` : script.clarify;
      const message = makeMessage({
        text: clarifyText,
        quickReplies: script.clarifyReplies,
      });
      return { message, context: { ...context, stage: "clarifying", topic } };
    }

    // Safety-only message with no clear product topic
    if (safetyNote) {
      return {
        message: makeMessage({
          text: `${safetyNote}\n\nEnquanto isso, posso te ajudar a encontrar produtos gerais de bem-estar ou cuidado, se quiser.`,
        }),
        context: { ...context, stage: "free" },
      };
    }

    // Greeting / fallback
    if (context.stage === "greeting" || /^(oi|olá|ola|bom dia|boa tarde|boa noite)/i.test(trimmed)) {
      return {
        message: makeMessage({
          text: "Olá! Sou o assistente da Farmavida. Me conta o que você está buscando, ou escolha um dos temas abaixo:",
          quickReplies: greetingReplies,
        }),
        context: { ...context, stage: "clarifying" },
      };
    }

    return {
      message: makeMessage({
        text: "Posso ajudar a encontrar produtos, comparar opções ou tirar dúvidas sobre o que temos na loja. Me conta um pouco mais sobre o que você precisa?",
        quickReplies: greetingReplies,
      }),
      context: { ...context, stage: "free" },
    };
  }

  private buildCartHelpMessage(cart: CartItem[]): ChatMessage {
    if (cart.length === 0) {
      return makeMessage({
        text: "Seu carrinho está vazio no momento. Me conta o que você está buscando que eu te ajudo a encontrar.",
        quickReplies: greetingReplies,
      });
    }
    const categories = new Set(cart.map((i) => i.product.category));
    const suggestions: Product[] = [];
    cart.forEach((item) => {
      item.product.relatedIds.forEach((id) => {
        const p = getProductById(id);
        if (p && !cart.some((c) => c.product.id === p.id) && !suggestions.some((s) => s.id === p.id)) {
          suggestions.push(p);
        }
      });
    });
    const text =
      categories.size <= 2
        ? "Seu carrinho está concentrado em poucas categorias. Quem leva esses itens costuma levar também os abaixo — sem compromisso, só uma sugestão:"
        : "Seu carrinho já está bem completo. Aqui vão alguns itens complementares, caso façam sentido para você:";
    return makeMessage({ text, products: suggestions.slice(0, 3) });
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const aiService: IAIService = new MockAIService();

export function createInitialContext(): ChatContext {
  return { stage: "greeting" };
}

export function createGreetingMessage(): ChatMessage {
  return makeMessage({
    text: "Oi! Sou o assistente da Farmavida 🌿 Posso te ajudar a encontrar produtos certos pra você — me conta o que você está buscando, ou escolha um tema:",
    quickReplies: greetingReplies,
  });
}
