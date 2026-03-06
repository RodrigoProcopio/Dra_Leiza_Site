// React import removed because the new JSX transform (React 17+) handles it automatically. There is no need to import React unless using named exports.

type Props = {
  active?: boolean;
};

export default function EcgUnderline({ active = false }: Props) {
  return (
    <span
      className={[
        "pointer-events-none absolute left-0 -bottom-3 w-full overflow-hidden",
        active ? "opacity-100" : "opacity-0",
        "transition-opacity duration-300",
      ].join(" ")}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 300 24"
        preserveAspectRatio="none"
        className="h-[16px] w-full"
      >
        {/* trilha MUITO sutil (fica sempre) */}
        <path
          d="
            M0 12 
            L20 12 
            L28 6 
            L36 18 
            L44 9 
            L52 12 
            L90 12
            L98 5 
            L106 19 
            L114 8 
            L122 12
            L160 12
            L168 6 
            L176 18 
            L184 9 
            L192 12
            L300 12
          "
          fill="none"
          stroke="rgba(139,115,85,0.12)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* traço que DESENHA e APAGA */}
        <path
          d="
            M0 12 
            L20 12 
            L28 6 
            L36 18 
            L44 9 
            L52 12 
            L90 12
            L98 5 
            L106 19 
            L114 8 
            L122 12
            L160 12
            L168 6 
            L176 18 
            L184 9 
            L192 12
            L300 12
          "
          fill="none"
          stroke="#8B7355"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={active ? "ecg-draw" : ""}
        />
      </svg>
    </span>
  );
}
