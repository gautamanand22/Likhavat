import clsx from "clsx";
import { business } from "@/content/business";

/**
 * The Likhavat show-card, drawn entirely in CSS and split into its honest
 * colour separations — each plate carries only the elements printed in that
 * ink, so the press showcase can lay them down one by one. Sizes use
 * container-query units: wrap the card in an element with
 * `container-type: inline-size` (AssembledCard does this itself).
 *
 * The brand mark is the site logo itself — ink tile, knocked-out लि, CMYK
 * strip along its base — so the logo literally assembles plate by plate:
 * C, M and Y each drop their strip segment, K brings the tile and type.
 */

/** Bare domain for the card's contact line. */
const siteHost = business.siteUrl.replace(/^https?:\/\//, "");

/* Logo tile geometry (% of card box) — shared across plates */
const TILE = { left: 7, top: 12, w: 13.5, h: 21.5, stripH: 3.2 };
const SEG_W = TILE.w / 4;
const STRIP_TOP = TILE.top + TILE.h - TILE.stripH;

function StripSeg({
  i,
  className,
  style,
}: {
  i: number;
  className: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={clsx("absolute", className)}
      style={{
        left: `${TILE.left + SEG_W * i}%`,
        top: `${STRIP_TOP}%`,
        width: `${SEG_W}%`,
        height: `${TILE.stripH}%`,
        ...style,
      }}
    />
  );
}

export function PlateCyan() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* fine concentric arcs bleeding off the right edge
          (cqw only — inline-size containment doesn't resolve cqh; card
          height = 62.8cqw at the 86:54 aspect) */}
      {[85, 46].map((size, i) => (
        <span
          key={size}
          className="absolute rounded-full border border-cyan"
          style={{
            width: `${size}cqw`,
            height: `${size}cqw`,
            right: `${-size / 2.55}cqw`,
            top: `${31.4 - size / 2}cqw`,
            opacity: 0.5 - i * 0.14,
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
      {/* logo strip — cyan segment */}
      <StripSeg i={0} className="bg-cyan" style={{ borderBottomLeftRadius: "2.4cqw" }} />
    </div>
  );
}

export function PlateMagenta() {
  return (
    <div className="absolute inset-0" aria-hidden>
      {/* the middle arc runs magenta — a quiet two-ink mix on the right edge */}
      <span
        className="absolute rounded-full border border-magenta"
        style={{
          width: "65cqw",
          height: "65cqw",
          right: `${-65 / 2.55}cqw`,
          top: `${31.4 - 65 / 2}cqw`,
          opacity: 0.4,
          borderWidth: "1.5px",
        }}
      />
      {/* logo strip — magenta segment */}
      <StripSeg i={1} className="bg-magenta" />
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
      {/* logo strip — yellow segment */}
      <StripSeg i={2} className="bg-yellow" />
    </div>
  );
}

export function PlateKey({ name, role }: { name: string; role: string }) {
  return (
    <div className="absolute inset-0 text-ink" aria-hidden>
      {/* the logo tile — ink block above the CMYK strip row, so the C/M/Y
          segments (printed by their own plates) stay visible beneath it */}
      <div
        className="absolute flex items-center justify-center bg-ink"
        style={{
          left: `${TILE.left}%`,
          top: `${TILE.top}%`,
          width: `${TILE.w}%`,
          height: `${TILE.h - TILE.stripH}%`,
          borderRadius: "2.4cqw 2.4cqw 0 0",
        }}
      >
        <span className="font-hindi text-[4.4cqw] font-bold leading-none text-[#fffdf8]">
          लि
        </span>
      </div>
      {/* knockout (unprinted) fourth strip segment */}
      <StripSeg i={3} className="bg-[#fffdf8]" style={{ borderBottomRightRadius: "2.4cqw" }} />
      {/* hairline ring framing the tile */}
      <span
        className="absolute rounded-[20%] border border-ink/15"
        style={{
          left: `${TILE.left - 1.4}%`,
          top: `${TILE.top - 2.3}%`,
          width: `${TILE.w + 2.8}%`,
          height: `${TILE.h + 4.6}%`,
        }}
      />

      {/* establishment block, top right */}
      <div className="absolute right-[7%] top-[13%] text-right">
        <p className="font-spec text-[2.2cqw] font-semibold uppercase tracking-[0.32em] text-ink/80">
          Est. {business.foundedYear}
        </p>
        <p className="mt-[0.35em] font-spec text-[1.55cqw] font-medium uppercase tracking-[0.3em] text-ink/45">
          {business.address.line1} · {business.address.city}
        </p>
      </div>

      {/* the press's own name & trade line */}
      <div className="absolute left-[7%] top-[41%]">
        <p className="whitespace-nowrap font-display text-[5.4cqw] font-semibold leading-none tracking-[-0.01em]">
          {name}
        </p>
        <p className="mt-[4.5%] font-spec text-[1.95cqw] font-medium uppercase tracking-[0.26em] text-ink/50">
          {role}
        </p>
      </div>

      {/* bottom hairline + contacts */}
      <span className="absolute inset-x-[7%] bottom-[20%] h-px bg-ink/12" />
      <div className="absolute inset-x-[7%] bottom-[8.5%] flex items-baseline justify-between">
        <span className="font-spec text-[2.3cqw] font-semibold tracking-[0.02em] text-ink/75">
          {business.phoneDisplay}
        </span>
        <span className="mr-[7%] font-spec text-[1.9cqw] font-medium lowercase tracking-[0.14em] text-ink/45">
          {siteHost}
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
