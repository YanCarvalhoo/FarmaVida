# Farmavida

E-commerce de farmácia com assistente de compras por IA (dados e IA mockados).

## Rodar

```bash
npm install
npm run dev
```

Build de produção: `npm run build`.

## Publicar no GitHub Pages

O repositório já vem com um workflow em `.github/workflows/deploy.yml` que builda e publica sozinho a cada push.

1. Suba o projeto inteiro (não a pasta `dist`) para o repositório `FarmaVida` no GitHub, na branch `main`.
2. No repositório, vá em **Settings → Pages** e em "Source" escolha **GitHub Actions**.
3. Espere o workflow rodar (aba **Actions**). Quando terminar, o site fica em `https://SEU-USUARIO.github.io/FarmaVida/`.

Se o nome do repositório for diferente de `FarmaVida`, ajuste o valor de `base` em `vite.config.ts` para `/NOME-DO-REPO/` (com barra no início e no fim) antes de subir.

O roteamento usa `HashRouter` (URLs com `#`) de propósito — o GitHub Pages não sabe redirecionar rotas internas do React para o `index.html`, então com `BrowserRouter` qualquer link direto para `/produto/algo` ou um F5 na página dão 404. Com hash (`/#/produto/algo`) isso não acontece.

## Estrutura

- `src/services/aiService.ts`: interface `IAIService` + `MockAIService`. A UI só conversa com essa interface; para usar um LLM real, implemente `IAIService` e troque o export `aiService`.
- `src/data/products.ts`: catálogo mock (24 produtos, 8 categorias).
- `src/context/`: carrinho, toasts e estado global do chat.
- `src/components/`: `ai/`, `cart/`, `home/`, `layout/`, `product/`, `search/`, `ui/`.
- `src/pages/`: Home, Produto, Categoria, Busca, Checkout, Confirmação, Conta/Pedidos (placeholders).

## Pendências conhecidas

Login e histórico de pedidos são placeholders; checkout não processa pagamento; cupons, endereço por CEP (ViaCEP) e persistência do carrinho ainda não existem.
