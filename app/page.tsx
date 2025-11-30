import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Comunidades multi-garimpeiro",
    body:
      "Cada garimpeiro cria uma comunidade com cursos, aulas em vídeo, PDFs e feed. Multi-tenant por community_id com RLS no Supabase.",
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
    <main className="relative">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-64 max-w-4xl rounded-full bg-gradient-to-r from-brand-500/25 via-cyan-400/20 to-transparent blur-3xl" />
      <div className="container max-w-5xl space-y-12 py-12 md:py-16">
        <header className="space-y-6 rounded-2xl border bg-card/70 p-8 shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-brand-500/15 text-brand-50">GarimpoCloud · Next.js 14 + Supabase</Badge>
            <Badge variant="outline" className="border-brand-500/50 text-brand-100">
              Tailwind + shadcn/ui prontos
            </Badge>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Construa comunidades de aulas com segurança multi-tenant
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">
              SaaS para garimpeiros e estudantes universitários em Angola. Conteúdo privado por comunidade, Supabase Auth, RLS e Server Actions desde o início.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg">Ver roadmap de entregas</Button>
            <Button size="lg" variant="outline">
              Stack obrigatória
            </Button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" id="stack">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex h-full flex-col gap-3 rounded-2xl border bg-card/70 p-6 shadow-xl shadow-black/20 backdrop-blur"
            >
              <div className="flex items-center gap-2 text-sm text-brand-100">
                <span className="inline-flex h-2 w-2 rounded-full bg-brand-400" />
                {feature.title}
              </div>
              <p className="text-sm text-muted-foreground leading-6">{feature.body}</p>
            </div>
          ))}
        </section>

        <section
          id="roadmap"
          className="space-y-4 rounded-2xl border bg-card/70 p-6 shadow-xl shadow-black/20 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide text-brand-100">Entrega incremental</p>
              <h2 className="text-2xl font-semibold text-slate-50">Roadmap imediato</h2>
            </div>
            <Badge variant="success">Foco em RSC + RLS</Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => (
              <div key={item.title} className="rounded-xl border border-border/70 bg-secondary/50 p-4">
                <div className="flex items-center justify-between text-sm text-brand-100">
                  <span>{item.phase}</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-50">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-6">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
