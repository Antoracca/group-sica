import { UserRound, Building2, Users, Briefcase, type LucideIcon } from "lucide-react";

export interface Profile {
  id: string;
  label: string;
  /** Phrase contextuelle affichée quand le profil est sélectionné. */
  need: string;
  icon: LucideIcon;
}

/* Sélection de parcours « Je suis… » — pattern Enterprise Gateway. */
export const PROFILES: Profile[] = [
  {
    id: "entrepreneur",
    label: "Entrepreneur",
    need: "Je veux créer ma société et démarrer mon activité sur des bases solides.",
    icon: UserRound,
  },
  {
    id: "pme",
    label: "PME",
    need: "Je veux confier ma comptabilité, mes déclarations et le suivi de ma société.",
    icon: Building2,
  },
  {
    id: "association",
    label: "Association",
    need: "Je veux structurer mon organisation et tenir mes obligations à jour.",
    icon: Users,
  },
  {
    id: "liberale",
    label: "Profession libérale",
    need: "Je veux un accompagnement administratif et fiscal adapté à mon exercice.",
    icon: Briefcase,
  },
];
