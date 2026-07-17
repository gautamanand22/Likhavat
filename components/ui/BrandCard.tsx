import clsx from "clsx";
import { business } from "@/content/business";

/**
 * The Likhavat show-card, drawn entirely in CSS and split into its honest
 * colour separations — each plate carries only the elements printed in that
 * ink, so the press showcase can lay them down one by one. Sizes use
 * container-query units: wrap the card in an element with
 * `container-type: inline-size` (AssembledCard does this itself).
 */

export function PlateCyan() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* fine concentric arcs bleeding off the right edge
          (cqw only — inline-size containment doesn't resolve cqh; card
          height = 62.8cqw at the 86:54 aspect) */}
      {[85, 65, 46].map((size, i) => (
        <span
          key={size}
          className="absolute rounded-full border border-cyan"
          style={{
            width: `${size}cqw`,
            height: `${size}cqw`,
            right: `${-size / 2.55}cqw`,
            top: `${31.4 - size / 2}cqw`,
            opacity: 0.5 - i * 0.1,
            borderWidth: "1.5px",
          }}
        />
      ))}
      {/* three micro dots under the contacts */}
      <span className="absolute bottom-[9%] right-[7%] flex gap-[1.2%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="block h-[0.9cqw] w-[0.9cqw] rounded-full bg-cyan/70" />
        ))}
      </span>
    </div>
  );
}

export function PlateMagenta() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* the लि tile */}
      <div
        className="absolute left-[7%] top-[12%] flex aspect-square w-[13.5%] items-center justify-center rounded-[18%] pb-[0.6%]"
        style={{ background: "linear-gradient(135deg, #e23a7f 0%, #b02a63 100%)" }}
      >
        <span className="font-hindi text-[4.6cqw] font-bold leading-none text-white">लि</span>
      </div>
    </div>
  );
}

export function PlateYellow() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* warm blush washing the top-right corner */}
      <div
        className="absolute right-[-12%] top-[-24%] h-[95%] w-[58%]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(246,181,30,0.26), rgba(246,181,30,0))",
        }}
      />
      {/* underline beneath the name — the rule the foil later covers */}
      <div className="absolute left-[7%] top-[60.5%] h-[1.3%] w-[21%] rounded-full bg-yellow/85" />
    </div>
  );
}

export function PlateKey({ name, role }: { name: string; role: string }) {
  return (
    <div className="absolute inset-0 text-ink" aria-hidden>
      {/* hairline ring behind the tile */}
      <span className="absolute left-[5.6%] top-[9.5%] aspect-square w-[16.3%] rounded-[20%] border border-ink/15" />

      {/* brand block, top right */}
      <div className="absolute right-[7%] top-[13%] text-right">
        <p className="font-spec text-[2.2cqw] font-semibold uppercase tracking-[0.32em] text-ink/80">
          {business.shortName}
        </p>
        <p className="mt-[0.35em] font-spec text-[1.55cqw] font-medium uppercase tracking-[0.3em] text-ink/45">
          Printing Press
        </p>
      </div>

      {/* name & role */}
      <div className="absolute left-[7%] top-[41%]">
        <p className="font-display text-[6.4cqw] font-semibold leading-none tracking-[-0.01em]">
          {name}
        </p>
        <p className="mt-[4.5%] font-spec text-[2cqw] font-medium uppercase tracking-[0.3em] text-ink/50">
          {role}
        </p>
      </div>

      {/* bottom hairline + contacts */}
      <span className="absolute inset-x-[7%] bottom-[20%] h-px bg-ink/12" />
      <div className="absolute inset-x-[7%] bottom-[8.5%] flex items-baseline justify-between">
        <span className="font-spec text-[2.3cqw] font-semibold tracking-[0.02em] text-ink/75">
          {business.phoneDisplay}
        </span>
        <span className="mr-[7%] font-spec text-[1.9cqw] font-medium uppercase tracking-[0.14em] text-ink/45">
          {business.address.line1} · {business.address.city}
        </span>
      </div>
    </div>
  );
}

/** The gold-foil rule pressed over the yellow underline in the finish stage. */
export function FoilRule({ className }: { className?: string }) {
  return (
    <div
      className={clsx("absolute left-[7%] top-[60.5%] h-[1.4%] w-[21%] rounded-full", className)}
      style={{
        background:
          "linear-gradient(105deg,#8a6d1c 0%,#e6c860 30%,#fdf0b0 50%,#d4af37 70%,#8a6d1c 100%)",
      }}
      aria-hidden
    />
  );
}

/** Fully-printed card (hero, mobile fallback) — self-contained container. */
export function AssembledCard({
  name,
  role,
  className,
  shadow = true,
}: {
  name: string;
  role: string;
  className?: string;
  shadow?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative aspect-[86/54] w-full overflow-hidden rounded-[4.5%_/_7%] bg-[#fffdf8]",
        shadow && "shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]",
        className,
      )}
      style={{ containerType: "inline-size" }}
    >
      <PlateYellow />
      <PlateCyan />
      <PlateMagenta />
      <PlateKey name={name} role={role} />
      <FoilRule />
    </div>
  );
}
