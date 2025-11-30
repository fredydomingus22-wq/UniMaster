import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CommunityCardProps = {
  name: string;
  slug: string;
  description: string;
  ownerName: string;
  ownerUniversity?: string | null;
  priceMonthly?: number | null;
  isPublic?: boolean;
  courses: number;
  members: number;
  accent?: "brand" | "emerald" | "blue" | "amber";
};

const accentToBadge = {
  brand: "bg-brand-500/15 text-brand-50 border-brand-500/30",
  emerald: "bg-emerald-500/15 text-emerald-50 border-emerald-500/30",
  blue: "bg-blue-500/15 text-blue-50 border-blue-500/30",
  amber: "bg-amber-500/15 text-amber-50 border-amber-500/30",
};

export function CommunityCard({
  name,
  slug,
  description,
  ownerName,
  ownerUniversity,
  priceMonthly,
  isPublic = true,
  courses,
  members,
  accent = "brand",
}: CommunityCardProps) {
  const badgeClass = accentToBadge[accent];
  const priceLabel = priceMonthly ? `AOA ${priceMonthly.toLocaleString("pt-AO")}/mês` : "Gratuita";

  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border bg-card/80 p-6 shadow-lg shadow-black/10 backdrop-blur">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn("border text-xs font-medium", badgeClass)}>
            {isPublic ? "Pública" : "Privada"}
          </Badge>
          <span className="text-xs text-muted-foreground">{priceLabel}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-slate-50">{name}</h3>
          <p className="text-sm text-muted-foreground leading-6">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-brand-200" />
          <span>{ownerName}</span>
          {ownerUniversity ? <span className="text-xs text-slate-400">· {ownerUniversity}</span> : null}
          <span className="ml-auto rounded-full bg-secondary/80 px-3 py-1 text-xs text-slate-200">
            {courses} cursos · {members} membros
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <Link
          href={`/communities/${slug}`}
          className="flex items-center gap-2 text-sm font-medium text-brand-100 hover:text-brand-50"
        >
          Ver comunidade
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Button size="sm" variant="outline">
          Assinar
        </Button>
      </div>
    </article>
  );
}
