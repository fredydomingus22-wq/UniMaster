const features = [
  {
    title: "Comunidades multi-garimpeiro",
    body: "Cada garimpeiro cria uma comunidade com cursos, aulas em vídeo, PDFs e feed. Multi-tenant por community_id com RLS no Supabase.",
  },
  {
    title: "Fluxo completo de assinatura",
    body: "Students ativam subscriptions e destravam cursos, posts e eventos privados sem vazamento entre comunidades.",
  },
  {
    title: "Arquitetura Server-first",
    body: "Next.js 14 (App Router) com Server Components, Server Actions e Supabase Auth Helpers para dados sensíveis.",
  },
];

const roadmap = [
  {
    phase: "Fase 1",
    title: "Setup base",
    detail: "Next.js 14 + Tailwind + shadcn/ui, layout público, fontes e linting estrito.",
  },
  {
    phase: "Fase 2",
    title: "Auth Supabase",
    detail: "Supabase Auth helpers, páginas /login e /signup, contexto server-side, perfis.",
  },
  {
    phase: "Fase 3",
    title: "Modelagem + RLS",
    detail: "SQL puro para communities, courses, lessons, posts, comments, subscriptions e policies multi-tenant.",
  },
  {
    phase: "Fase 4",
    title: "Área pública",
    detail: "Landing + exploração de comunidades com CTA de assinatura e SEO pronto para produção.",
  },
];

export default function HomePage() {
  return (
    <main className="container">
      <header className="card" style={{ marginBottom: "1.5rem" }}>
        <p className="badge">GarimpoCloud · Next.js 14 + Supabase</p>
        <h1 style={{ fontSize: "2.4rem", margin: "0.5rem 0" }}>
          Construa comunidades de aulas com segurança multi-tenant
        </h1>
        <p className="text-muted" style={{ lineHeight: 1.6 }}>
          SaaS para garimpeiros e estudantes universitários em Angola. Conteúdo privado por comunidade,
          Supabase Auth, RLS e Server Actions desde o início.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
          <a
            className="badge"
            style={{ background: "rgba(34,197,94,0.14)", color: "#bbf7d0" }}
            href="#roadmap"
          >
            Ver roadmap de entregas
          </a>
          <a
            className="badge"
            style={{ background: "rgba(14,165,233,0.16)", color: "#bae6fd" }}
            href="#stack"
          >
            Stack obrigatória
          </a>
        </div>
      </header>

      <section className="grid grid-3" id="stack" style={{ marginBottom: "1.5rem" }}>
        {features.map((feature) => (
          <div key={feature.title} className="card">
            <h3 className="section-title" style={{ marginBottom: "0.35rem" }}>
              {feature.title}
            </h3>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>{feature.body}</p>
          </div>
        ))}
      </section>

      <section className="card" id="roadmap" style={{ marginBottom: "1.5rem" }}>
        <h2 className="section-title">Fases de implementação</h2>
        <p className="section-subtitle">
          Trabalho incremental garantindo build saudável e compatibilidade com Vercel + Supabase.
        </p>
        <div className="grid grid-2">
          {roadmap.map((item) => (
            <div key={item.phase} className="card" style={{ padding: "1.25rem" }}>
              <p className="badge" style={{ marginBottom: "0.75rem" }}>
                {item.phase}
              </p>
              <h3 className="section-title" style={{ marginBottom: "0.35rem" }}>
                {item.title}
              </h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Próximos passos</h2>
        <p className="section-subtitle">
          Adicionar helpers do Supabase, páginas de autenticação e scripts SQL para communities, courses, lessons, posts,
          comments, subscriptions e events com RLS multi-tenant.
        </p>
        <div className="grid grid-2">
          <div>
            <h4 className="section-title" style={{ fontSize: "1.15rem" }}>Público</h4>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>
              Landing page com lista de comunidades públicas, perfil do garimpeiro e CTA de assinatura.
            </p>
          </div>
          <div>
            <h4 className="section-title" style={{ fontSize: "1.15rem" }}>Autenticado</h4>
            <p className="text-muted" style={{ lineHeight: 1.6 }}>
              Dashboards separados para teacher e student usando layouts aninhados, server actions para CRUD seguro
              e componentes client para formulários com React Hook Form + Zod.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
