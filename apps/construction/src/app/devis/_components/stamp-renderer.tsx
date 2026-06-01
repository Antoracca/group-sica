import type { StampConfig } from "@/lib/devis/types";

/*
  Rendu SVG d'un cachet. Géré 100 % en SVG → s'imprime parfaitement
  net dans le PDF, indépendant du DPI. Supporte 4 formes et un texte
  courbé (top/bottom) pour les cachets ronds et ovales.
*/

export function StampRenderer({
  config,
  size = config.size,
}: {
  config: StampConfig;
  size?: number;
}) {
  const w = size;
  const h =
    config.shape === "rectangle"
      ? size * 0.55
      : config.shape === "oval"
        ? size * 0.7
        : size;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      style={{ overflow: "visible" }}
      aria-label="Cachet officiel"
    >
      <ShapeBorder config={config} w={w} h={h} />
      <ShapeContent config={config} w={w} h={h} />
    </svg>
  );
}

function ShapeBorder({ config, w, h }: { config: StampConfig; w: number; h: number }) {
  const { color, borderWidth, shape } = config;
  const stroke = { stroke: color, strokeWidth: borderWidth, fill: "none" } as const;

  switch (shape) {
    case "circle":
      return (
        <>
          <circle cx={w / 2} cy={h / 2} r={w / 2 - borderWidth} {...stroke} />
          <circle
            cx={w / 2}
            cy={h / 2}
            r={w / 2 - borderWidth - 6}
            stroke={color}
            strokeWidth={borderWidth * 0.4}
            fill="none"
          />
        </>
      );
    case "oval":
      return (
        <>
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={w / 2 - borderWidth}
            ry={h / 2 - borderWidth}
            {...stroke}
          />
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={w / 2 - borderWidth - 6}
            ry={h / 2 - borderWidth - 5}
            stroke={color}
            strokeWidth={borderWidth * 0.4}
            fill="none"
          />
        </>
      );
    case "square":
      return (
        <>
          <rect
            x={borderWidth / 2}
            y={borderWidth / 2}
            width={w - borderWidth}
            height={h - borderWidth}
            rx={6}
            {...stroke}
          />
          <rect
            x={borderWidth / 2 + 5}
            y={borderWidth / 2 + 5}
            width={w - borderWidth - 10}
            height={h - borderWidth - 10}
            rx={4}
            stroke={color}
            strokeWidth={borderWidth * 0.4}
            fill="none"
          />
        </>
      );
    case "rectangle":
      return (
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={w - borderWidth}
          height={h - borderWidth}
          rx={4}
          {...stroke}
        />
      );
  }
}

function ShapeContent({ config, w, h }: { config: StampConfig; w: number; h: number }) {
  const { color, lines, shape, curvedTop, curvedBottom, size } = config;
  const round = shape === "circle" || shape === "oval";
  const fontSize = Math.max(8, size / 16);

  return (
    <g fill={color} fontFamily="'Geist Mono', ui-monospace, monospace">
      {/* Texte courbé haut (rond / ovale uniquement) */}
      {round && curvedTop ? (
        <>
          <defs>
            <path
              id={`curve-top-${size}`}
              d={`M ${w * 0.18} ${h / 2} A ${w / 2 - 18} ${h / 2 - 18} 0 0 1 ${w * 0.82} ${h / 2}`}
              fill="none"
            />
          </defs>
          <text
            fontSize={fontSize * 1.05}
            fontWeight={700}
            letterSpacing={size / 60}
            textAnchor="middle"
          >
            <textPath href={`#curve-top-${size}`} startOffset="50%">
              {curvedTop.toUpperCase()}
            </textPath>
          </text>
        </>
      ) : null}

      {/* Texte courbé bas */}
      {round && curvedBottom ? (
        <>
          <defs>
            <path
              id={`curve-bot-${size}`}
              d={`M ${w * 0.18} ${h / 2} A ${w / 2 - 18} ${h / 2 - 18} 0 0 0 ${w * 0.82} ${h / 2}`}
              fill="none"
            />
          </defs>
          <text
            fontSize={fontSize * 0.9}
            fontWeight={500}
            letterSpacing={size / 80}
            textAnchor="middle"
          >
            <textPath href={`#curve-bot-${size}`} startOffset="50%">
              {curvedBottom.toUpperCase()}
            </textPath>
          </text>
        </>
      ) : null}

      {/* Lignes centrales */}
      <g textAnchor="middle">
        {lines.filter(Boolean).map((line, i, arr) => {
          const center = h / 2;
          const spacing = fontSize * 1.4;
          const totalH = (arr.length - 1) * spacing;
          const y = center - totalH / 2 + i * spacing + fontSize * 0.35;
          const isFirst = i === 0;
          return (
            <text
              key={i}
              x={w / 2}
              y={y}
              fontSize={isFirst ? fontSize * 1.15 : fontSize * 0.85}
              fontWeight={isFirst ? 700 : 500}
              letterSpacing={size / 90}
            >
              {line.toUpperCase()}
            </text>
          );
        })}
      </g>

      {/* Filets décoratifs au-dessus/dessous (rectangle/carré) */}
      {!round && lines.length > 1 ? (
        <>
          <line
            x1={w * 0.18}
            y1={h / 2 - fontSize * 1.6}
            x2={w * 0.82}
            y2={h / 2 - fontSize * 1.6}
            stroke={color}
            strokeWidth={1}
          />
          <line
            x1={w * 0.18}
            y1={h / 2 + fontSize * 1.6}
            x2={w * 0.82}
            y2={h / 2 + fontSize * 1.6}
            stroke={color}
            strokeWidth={1}
          />
        </>
      ) : null}
    </g>
  );
}
