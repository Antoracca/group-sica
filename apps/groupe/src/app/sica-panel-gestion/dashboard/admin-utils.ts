export function frDate(iso?: string | null): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

export function fcfa(value?: number | string | null): string {
  const amount = Number(value ?? 0);
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number.isFinite(amount) ? amount : 0);
}

export function initials(prenom?: string | null, nom?: string | null, email?: string | null): string {
  const base = `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}` || email?.slice(0, 2) || "SI";
  return base.toUpperCase();
}

export function clientName(client?: { prenom?: string | null; nom?: string | null; email?: string | null } | null) {
  if (!client) return "Client non rattaché";
  return [client.prenom, client.nom].filter(Boolean).join(" ") || client.email || "Client SICA";
}

export function statusLabel(status?: string | null): string {
  if (!status) return "A definir";
  const labels: Record<string, string> = {
    "a-signer": "À signer",
    "en-attente": "En attente",
    "en-cours": "En cours",
    nouvelle: "Nouvelle",
    traitee: "Traitée",
    signe: "Signé",
    Livré: "Livré",
  };
  return labels[status] ?? status;
}

export function statusTone(_status?: string | null): string {
  return "bg-white text-slate-600 ring-slate-200";
}

export function countByOwner(items: Array<{ owner_id?: string | null }>) {
  return items.reduce<Record<string, number>>((acc, item) => {
    if (!item.owner_id) return acc;
    acc[item.owner_id] = (acc[item.owner_id] ?? 0) + 1;
    return acc;
  }, {});
}
