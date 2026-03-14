# J.Phillipe Portfolio

Portfólio pessoal construído com Next.js 16, React 19 e Prisma, com foco em performance, SEO e uma experiência de administração simples para cadastrar, editar e destacar projetos.

O projeto combina vitrine pública, internacionalização PT/EN, métricas por projeto e um painel privado para gerenciar o conteúdo sem depender de arquivos estáticos.

## Visão geral

- Página inicial com seções de hero, sobre, experiência, stack e projetos em destaque.
- Página de projetos com listagem completa e navegação para detalhes.
- Painel administrativo com autenticação, CRUD de projetos e marcação de destaque.
- Internacionalização com `next-intl` em português e inglês.
- SEO completo com metadata dinâmica, Open Graph, sitemap e robots.
- Upload de capa de projeto via Cloudinary.
- Persistência com PostgreSQL + Prisma.
- Contagem de likes e visualizações por projeto.

## Stack

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM com PostgreSQL
- `next-intl` para i18n
- `next-safe-action` para server actions tipadas
- `jose` para sessão JWT
- `bcryptjs` para autenticação
- `next-cloudinary` para upload de imagens
- shadcn/ui + Radix UI para componentes

## Estrutura principal

```text
app/
	admin/                 rotas públicas e privadas do painel
	api/og/                geração da imagem Open Graph
	projects/              listagem e detalhe de projetos
components/
	pages/home/            seções da landing page
	navbar/ footer/ ui/    layout e componentes reutilizáveis
lib/
	prisma.ts              cliente Prisma com adapter PostgreSQL
	safe-action.ts         autenticação das server actions
	seo.ts                 helpers de metadata e URLs canônicas
messages/
	pt.json                conteúdo em português
	en.json                conteúdo em inglês
prisma/
	schema.prisma          modelos de User, Project, View e Like
```

## Requisitos

- Node.js 20+
- PostgreSQL
- Conta no Cloudinary para upload das imagens


## Instalação

```bash
npm install
```

## Banco de dados

Gere o client do Prisma e aplique as migrations:

```bash
npx prisma migrate dev
```

Se quiser abrir o banco visualmente:

```bash
npx prisma studio
```

## Criando o usuário admin

O projeto espera um usuário na tabela `User`. Como não existe seed configurado, a forma mais simples é:

1. Gerar um hash da senha.
2. Inserir o usuário no banco usando Prisma Studio ou SQL.

Gerando o hash:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('sua-senha', 10).then(console.log)"
```

Depois crie um registro em `User` com:

- `email`: e-mail do administrador
- `password`: hash retornado pelo comando acima


## Rodando em desenvolvimento

```bash
npm run dev
```

Aplicação disponível em `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Fluxo do painel admin

1. Acesse a rota de login do admin.
2. Faça autenticação com o usuário salvo no banco.
3. Crie, edite ou remova projetos.
4. Marque projetos como destaque para aparecerem na home.

Os dados são revalidados após alterações, refletindo automaticamente na home e no painel.

## Funcionalidades de SEO

- Metadata dinâmica por página
- Open Graph com imagem gerada em `/api/og`
- Sitemap
- `robots.ts`
- Canonical URLs
- Alternância de locale com mapeamento de `og:locale`

## Internacionalização

O projeto usa duas localidades:

- `pt` como padrão
- `en` como secundária

As mensagens ficam centralizadas em `messages/pt.json` e `messages/en.json`.
