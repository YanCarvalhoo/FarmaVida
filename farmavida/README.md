# Farmavida

E-commerce de farmácia com assistente de compras por IA (dados e IA mockados).

## Rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build`.

## Estrutura

- `src/services/aiService.ts`: interface `IAIService` + `MockAIService`. A UI só conversa com essa interface; para usar um LLM real, implemente `IAIService` e troque o export `aiService`.
- `src/data/products.ts`: catálogo mock (24 produtos, 8 categorias).
- `src/context/`: carrinho, toasts e estado global do chat.
- `src/components/`: `ai/`, `cart/`, `home/`, `layout/`, `product/`, `search/`, `ui/`.
- `src/pages/`: Home, Produto, Categoria, Busca, Checkout, Confirmação, Conta/Pedidos (placeholders).

## Pendências conhecidas

Login e histórico de pedidos são placeholders; checkout não processa pagamento; cupons, endereço por CEP (ViaCEP) e persistência do carrinho ainda não existem.
