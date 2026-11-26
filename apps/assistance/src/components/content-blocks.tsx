import { Fragment } from "react";

/*
  Rendu de contenu éditorial riche pour les guides Ressources et les pages
  services détaillées. Modèle par blocs : chaque page décrit son contenu sous
  forme de données structurées (lib/guides.ts, lib/service-details.ts) et ce
  composant se charge du rendu, de la typographie et de l'espacement.

  Registre sobre, administratif. Couleurs de marque : brand-royal (#1E2F8A),
  brand-amber (#F39200). Aucune dépendance client : composants serveur.
*/

export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "deflist"; items: { term: string; def: string }[] }
  | { type: "steps"; items: { title: string; points: string[] }[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

function Lead({ text }: { text: string }) {
  return (
    <p className="text-pretty text-lg leading-relaxed text-slate sm:text-xl">
      {text}
    </p>
  );
}

function Paragraph({ text }: { text: string }) {
  return <p className="text-base leading-relaxed text-slate">{text}</p>;
}

function Heading({ text }: { text: string }) {
  return (
    <h3 className="font-display text-lg font-semibold tracking-[-0.01em] text-ink sm:text-xl">
      {text}
    </h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-slate">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-amber"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DefList({ items }: { items: { term: string; def: string }[] }) {
  return (
    <dl className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
          <dt className="font-semibold text-ink sm:w-1/3 sm:shrink-0">
            {item.term}
          </dt>
          <dd className="text-base leading-relaxed text-slate sm:flex-1">
            {item.def}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Steps({ items }: { items: { title: string; points: string[] }[] }) {
  return (
    <ol className="space-y-6">
      {items.map((step, i) => (
        <li key={i} className="relative pl-12">
          <span
            aria-hidden
            className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-xl bg-brand-royal/5 font-mono text-sm font-semibold text-brand-royal"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <h4 className="pt-1 font-display text-base font-semibold leading-snug text-ink sm:text-lg">
            {step.title}
          </h4>
          {step.points.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {step.points.map((point, j) => (
                <li
                  key={j}
                  className="flex gap-2.5 text-[0.95rem] leading-relaxed text-slate"
                >
                  <span
                    aria-hidden
                    className="mt-2 size-1 shrink-0 rounded-full bg-brand-royal/40"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function Table({
  caption,
  head,
  rows,
}: {
  caption?: string;
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-royal/10">
      <table className="w-full border-collapse text-left text-sm">
        {caption ? (
          <caption className="sr-only">{caption}</caption>
        ) : null}
        <thead>
          <tr className="bg-mist/60">
            {head.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className="px-4 py-3 font-display text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-brand-royal"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-brand-royal/8">
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "px-4 py-3 font-semibold text-ink"
                      : "px-4 py-3 leading-relaxed text-slate"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ title, text }: { title?: string; text: string }) {
  return (
    <div className="rounded-2xl border-l-[3px] border-brand-amber bg-mist/40 px-5 py-4">
      {title ? (
        <p className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-brand-royal">
          {title}
        </p>
      ) : null}
      <p className={title ? "mt-1.5 text-base leading-relaxed text-slate" : "text-base leading-relaxed text-slate"}>
        {text}
      </p>
    </div>
  );
}

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Fragment key={i}>
          {block.type === "lead" ? <Lead text={block.text} /> : null}
          {block.type === "paragraph" ? <Paragraph text={block.text} /> : null}
          {block.type === "heading" ? <Heading text={block.text} /> : null}
          {block.type === "list" ? <List items={block.items} /> : null}
          {block.type === "deflist" ? <DefList items={block.items} /> : null}
          {block.type === "steps" ? <Steps items={block.items} /> : null}
          {block.type === "table" ? (
            <Table caption={block.caption} head={block.head} rows={block.rows} />
          ) : null}
          {block.type === "callout" ? (
            <Callout title={block.title} text={block.text} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
