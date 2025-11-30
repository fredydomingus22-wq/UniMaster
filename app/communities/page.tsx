import { CommunityCard } from "@/components/community/community-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const communities = [
  {
    name: "Cálculo I Turbo",
    slug: "calculo-i-turbo",
    description: "Trilhas semanais, listas resolvidas e lives de dúvidas para caloiros destravarem Cálculo I sem depender da sala lotada.",
    ownerName: "Prof. Mário Pinto",
    ownerUniversity: "Universidade Católica de Angola",
    priceMonthly: 8500,
    isPublic: true,
    courses: 3,
    members: 184,
    accent: "brand" as const,
  },
  {
    name: "Física para Eng. Civil",
    slug: "fisica-eng-civil",
    description: "Aulas práticas com exemplos de obras reais, PDFs com diagramas e simulados focados em provas finais.",
    ownerName: "Eng. Cátia Lourenço",
    ownerUniversity: "Universidade Agostinho Neto",
    priceMonthly: 12000,
    isPublic: true,
    courses: 4,
    members: 132,
    accent: "emerald" as const,
  },
  {
    name: "Química Orgânica Express",
    slug: "quimica-organica-express",
    description: "Mapa visual de reações, flashcards de mecanismos e lives rápidas para tirar dúvidas em tempo real.",
    ownerName: "Dra. Mbanza Chaves",
    ownerUniversity: "Universidade Lusíada de Angola",
    priceMonthly: 9500,
    isPublic: true,
    courses: 2,
    members: 210,
    accent: "blue" as const,
  },
  {
    name: "Dados & Estatística",
    slug: "dados-estatistica",
    description: "Introdução a estatística aplicada para ciências sociais com datasets locais e exercícios corrigidos em vídeo.",
    ownerName: "Prof. João Vieira",
    ownerUniversity: "Universidade Óscar Ribas",
    priceMonthly: 7800,
    isPublic: true,
    courses: 3,
    members: 98,
    accent: "amber" as const,
  },
];

export default function CommunitiesPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/80">
      <div className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-gradient-to-r from-brand-500/20 via-cyan-400/15 to-transparent blur-3xl" />
      <div className="container max-w-6xl space-y-10 py-12 md:py-16">
        <header className="flex flex-col gap-4 rounded-3xl border bg-card/80 p-8 shadow-2xl shadow-black/20 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <Badge className="bg-brand-500/15 text-brand-50">Comunidades públicas</Badge>
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Encontre um garimpeiro e assine a comunidade certa para você
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              Cada comunidade tem cursos, aulas em vídeo, PDFs, feed e eventos ao vivo. Assinando, você desbloqueia todo o conteúdo privado
              e participa das discussões sem vazamento entre comunidades.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <Button size="lg">Fazer login</Button>
            <Button size="lg" variant="outline">
              Criar conta
            </Button>
          </div>
        </header>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-brand-100">Multi-comunidade</p>
              <h2 className="text-2xl font-semibold text-slate-50">Comunidades abertas para assinatura</h2>
            </div>
            <Badge variant="outline" className="border-brand-500/40 text-brand-100">
              Filtrar por universidade em breve
            </Badge>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {communities.map((community) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
