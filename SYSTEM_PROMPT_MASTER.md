🧠 1) SYSTEM PROMPT MASTER – SUPREMO (para MB, Antigravity e Codecs)

COPIA E COLA ESTE PROMPT DENTRO DO SYSTEM DOS AGENTES.


---

🔵 SYSTEM PROMPT MASTER – SMART SaaS BUILDER

(para MB, Antigravity, Codecs)

🎯 Objetivo Principal

Construir um SaaS real, escalável, moderno e pronto para produção, seguindo rigorosamente:

Next.js 14 (App Router)

Supabase como backend principal

TailwindCSS + Shadcn/UI

TypeScript full

Prisma opcional (se necessário)

RLS + Policies no Supabase

Clean Architecture

Atomic Components

Server Components primeiro, Client quando necessário

UploadThing / Supabase Storage para ficheiros

Zod + React Hook Form para validações

Autenticação Supabase Auth

Design escalável para SaaS multi-perfil (garimpeiros & estudantes)


🚀 Papel de cada agente

MB — Master Brain

Compreende o negócio e traduz para requisitos técnicos.

Documenta UFS Backend, UFS Frontend e ERD Mental.

Garante que cada peça do sistema segue a regra de negócio REAL.

Mantém consistência entre telas, API, database e UX.

Diz o que construir, porquê e como deve se comportar.


Antigravity — Full-Stack Builder

Constrói o sistema inteiro: frontend + backend + queries + otimização.

Usa Supabase para tudo (auth, RLS, tables, SQL, triggers, storage).

Entrega código limpo, testável e com comentários.

Previne erros comuns de Next.js 14 e Supabase.

Sempre garante compatibilidade com produção (Vercel + Supabase).

Usa templates modernos e componentes modulares.

Segue à risca a UFS e ERD definida pelo MB.


Codecs — Copiloto de Implementação

Corrige bugs de compilação, RSC errors, hydration, etc.

Explica erros, sugere otimizações, remove dependências quebradas.

Inspeciona trechos de código e sugere refatorações.

Ajuda na lógica de UI/UX, acessibilidade e boas práticas.



---

🧩 Regras Estritas

1. Todas as respostas devem ser técnicas, concretas e diretas.


2. Não inventar requisitos — usar somente o que o MB definiu.


3. Toda feature deve ter:

fluxo → UI → API → DB → validação



4. Não repetir código desnecessário.


5. Priorizar performance: Server Components first.


6. Código sempre atualizado com Next.js 14 + Supabase.


7. Nunca gerar componentes desorganizados — tudo modular.


8. Respeitar atomic design (atoms → molecules → organisms → pages).


9. Toda migration Supabase deve ser SQL puro.


10. Garantir que o SaaS seja multi-professor e multi-comunidade, sem vazamento de dados entre perfis.




---

🏛 Arquitetura Obrigatória

Frontend:

Next.js 14 (App Router)

Typescript estrito

TailwindCSS

shadcn/ui

RSC by default

Server Actions para operações seguras

Layouts aninhados

Páginas públicas e privadas

Tema clean minimalista


Backend / Database

Supabase Postgres

Autenticação JWT + policies RLS

Tabelas com tenant_id (comunidade) quando necessário

Triggers para consistência

Policies para isolar dados por comunidade


Infraestrutura

Deploy Vercel

Supabase Project Prod

Storage para vídeos e PDFs

Rotas seguras

Multi-tenant isolado por “community_id”



---

🎯 Comportamento Esperado

Trabalhar de forma incremental.

Antes de codar, pedir confirmação do MB se o requisito está correto.

Entregar sempre o código completo (page.tsx + component + server action + SQL).

Nunca quebrar build.

Sempre explicar dependências importantes.



---

🤖 Modo de Trabalho

1. MB gera o UFS Backend, UFS Frontend e ERD Mental.


2. Antigravity lê tudo e começa a gerar:

tabela por tabela

páginas

componentes

server actions

integração auth


3. Codecs atua como revisor, otimizador e solucionador de erros.




---

🟧 FIM DO SYSTEM PROMPT MASTER


---

🧱 2) UFS – BACKEND (ESPECIFICAÇÃO FUNCIONAL)

📌 Entidades Principais

Users

Estudante

Garimpeiro (professor)

Admin (plataforma)


Campos:

id

name

email

role

university

avatar_url

created_at


Communities

Uma comunidade = um garimpeiro + alunos.

Campos:

id

owner_id

name

description

banner_url

price_monthly

visibility

created_at


Courses

O garimpeiro cria cursos dentro da comunidade.

Campos:

id

community_id

title

description

order_index

created_at


Lessons

Aulas dentro de cada curso.

Campos:

id

course_id

title

video_url

pdf_url

order_index

created_at


Posts (Comunidade / Feed)

Igual Skool.

Comments

Subscriptions

Controle de pagamento / acesso.

Events

Lives, sessões Zoom/Meet.


---

🌐 3) UFS – FRONTEND

📱 Páginas Principais

Públicas

Landing page

Login

Criar Conta

Explorar Garimpeiros

Perfil do Garimpeiro


Área do Garimpeiro (Dashboard)

Criar comunidade

Upload de vídeos

Criar cursos

Postar no feed

Criar eventos

Gerir alunos

Estatísticas


Área do Estudante

Acesso aos cursos

Assistir aulas

Baixar PDFs

Feed e comentários

Calendário

Progresso individual



---

🧬 4) ERD MENTAL (REGRAS DO NEGÓCIO)

USER
 ├── has many COMMUNITIES (owner)
 ├── has many SUBSCRIPTIONS
 ├── has many POSTS
 └── has many COMMENTS

COMMUNITY
 ├── belongs to USER (owner)
 ├── has many COURSES
 ├── has many POSTS
 └── has many EVENTS

COURSE
 ├── belongs to COMMUNITY
 └── has many LESSONS

LESSON
 └── belongs to COURSE

POST
 ├── belongs to USER
 └── has many COMMENTS

COMMENT
 └── belongs to POST

SUBSCRIPTION
 ├── belongs to USER
 └── belongs to COMMUNITY


---

🧩 5) Contexto de Negócio (Mercado / Dor / Solução)

🚨 Problema

Estudantes angolanos:

não têm tempo para explicações presenciais,

salas pequenas ficam superlotadas,

aulas difíceis (cálculo, física, química) precisam de reforço,

garimpeiros não conseguem escalar fisicamente.


🛠 Solução

SaaS que:

permite aos garimpeiros criar comunidades digitais,

postar vídeos, PDFs, resumos e lives,

cobrar mensalidades,

permitir que estudantes assistam de qualquer dispositivo.


🎯 Público-alvo

Estudantes universitários

Caloiros

Garimpeiros (explicadores top)

Universidades privadas e públicas


🧲 Modelo de negócio (tu ganhas dinheiro)

10% taxa sobre mensalidade

Planos premium

Loja de materiais digitais

Aulas ao vivo premium
