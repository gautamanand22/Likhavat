import clsx from "clsx";
import { business } from "@/content/business";

/**
 * HERO DIORAMA — a running offset unit, built in CSS. Blank sheets feed from
 * the top slot, pass under the ink roller and come out printed: a letterhead
 * and a doctor's prescription pad alternate on a 12s loop (see .press-sheet /
 * .press-cover in globals.css for the nip-reveal mechanics). Decorative and
 * aria-hidden; sits on the hero's right on lg+ screens.
 */

/** The site logo, miniature — ink tile, knocked-out लि, CMYK base strip. */
function MiniLogo({ className }: { className?: string }) {
  return (
    <span
      className={clsx(
        "relative flex flex-col items-center justify-start overflow-hidden rounded-[22%] bg-ink",
        className,
      )}
    >
      <span className="font-hindi pt-[8%] text-[0.62em] font-bold leading-none text-paper">
        लि
      </span>
      <span className="absolute inset-x-0 bottom-0 flex h-[16%]">
        <span className="flex-1 bg-cyan" />
        <span className="flex-1 bg-magenta" />
        <span className="flex-1 bg-yellow" />
        <span className="flex-1 bg-paper" />
      </span>
    </span>
  );
}

/** Letterhead artwork that emerges below the roller. */
function LetterheadArt() {
  return (
    <div className="absolute inset-0 flex flex-col px-[9%] py-[7%]">
      <div className="flex items-center gap-[4%]">
        <MiniLogo className="h-7 w-7 text-[1.15rem]" />
        <div className="min-w-0">
          <p className="truncate font-display text-[0.66rem] font-bold leading-tight text-ink">
            {business.name}
          </p>
          <p className="truncate font-spec text-[0.42rem] font-medium uppercase tracking-[0.22em] text-ink/50">
            {business.address.line1} · {business.address.city} · 800001
          </p>
        </div>
      </div>
      <div className="cmyk-strip mt-[5%] h-[2px] w-full rounded-full opacity-70" />
      <div className="mt-[9%] space-y-[6.5%]">
        {[92, 78, 85, 62, 71, 38].map((w, i) => (
          <div key={i} className="h-[3px] rounded-full bg-ink/[0.13]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-auto border-t border-ink/10 pt-[4%]">
        <p className="font-spec text-[0.4rem] font-semibold uppercase tracking-[0.2em] text-ink/45">
          {business.phoneDisplay} · GST invoice on every order
        </p>
      </div>
    </div>
  );
}

/** Prescription-pad artwork — the alternate sheet. */
function RxArt() {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex flex-col justify-center bg-ink px-[9%] py-[5.5%]">
        <p className="text-[0.56rem] font-bold tracking-wide text-paper">Dr. Anjali Sinha</p>
        <p className="mt-[1%] font-spec text-[0.4rem] font-medium uppercase tracking-[0.18em] text-paper/55">
          MBBS · Reg 40712 · Kankarbagh, Patna
        </p>
      </div>
      <div className="relative flex-1 px-[9%] py-[6%]">
        <span className="font-display text-[1.5rem] font-semibold italic leading-none text-magenta">
          ℞
        </span>
        <div className="mt-[7%] space-y-[9%]">
          {[86, 70, 78, 55].map((w, i) => (
            <div key={i} className="h-[3px] rounded-full bg-ink/[0.12]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <p className="absolute bottom-[5%] right-[9%] font-spec text-[0.4rem] font-semibold uppercase tracking-[0.2em] text-ink/35">
          100 leaves · pad no. 12
        </p>
      </div>
    </div>
  );
}

/** One sheet on the feed track: art + counter-translating blank cover. */
function Sheet({ delay, children }: { delay?: string; children: React.ReactNode }) {
  return (
    <div
      className="press-sheet absolute inset-x-[14%] top-0 h-[66%] overflow-hidden rounded-md bg-[#fffdf8] shadow-[0_18px_38px_-14px_rgba(0,0,0,0.5)]"
      style={delay ? { animationDelay: delay } : undefined}
    >
      {children}
      {/* blank cover — lower edge rides the roller nip */}
      <div
        className="press-cover absolute inset-x-0 top-[-300%] h-[300%] bg-[#fffdf8]"
        style={delay ? { animationDelay: delay } : undefined}
      />
    </div>
  );
}

export function PressRig() {
  return (
    <div className="relative aspect-[4/5.1] w-full" aria-hidden>
      {/* machine frame */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-paper/[0.06] via-paper/[0.03] to-transparent ring-1 ring-paper/10" />
      <span className="absolute left-6 top-4 font-spec text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-paper/40">
        Likhavat · offset unit 02
      </span>
      <span className="cmyk-strip absolute right-6 top-[1.15rem] h-1 w-14 rounded-full opacity-60" />

      {/* control strip — CMYK ink LEDs */}
      <div className="absolute right-6 top-[4.2rem] flex flex-col items-center gap-2.5 rounded-full bg-ink-2/80 px-1.5 py-3 ring-1 ring-paper/10">
        {["bg-cyan", "bg-magenta", "bg-yellow", "bg-paper"].map((c, i) => (
          <span
            key={c}
            className={clsx("press-led h-1.5 w-1.5 rounded-full", c)}
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      {/* feeder stack peeking above the slot */}
      <div className="absolute inset-x-[16%] top-[7.2%]">
        <div className="h-2 -rotate-1 rounded-t-md bg-[#f4efe3] shadow-sm" />
        <div className="mx-[3%] -mt-1 h-2 rotate-[0.6deg] rounded-t-md bg-[#fbf7ec]" />
      </div>
      {/* feed slot */}
      <div className="absolute inset-x-[13%] top-[9.5%] h-2.5 rounded-full bg-ink-2 shadow-[inset_0_2px_5px_rgba(0,0,0,0.6)] ring-1 ring-paper/10" />

      {/* sheet track (clips the staging area above the slot) */}
      <div className="absolute inset-x-[13%] bottom-[7%] top-[11%] overflow-hidden">
        <Sheet>
          <LetterheadArt />
        </Sheet>
        <Sheet delay="-6s">
          <RxArt />
        </Sheet>

        {/* roller nip glow */}
        <div
          className="absolute inset-x-0 top-[36%] h-6 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 65% 100% at 50% 50%, rgba(226,58,127,0.28), transparent 70%)",
          }}
        />
      </div>

      {/* the ink roller — wrapper shares the track's box so top-[36%] lands
          exactly on the nip line the cover animation is tuned to */}
      <div className="pointer-events-none absolute inset-x-[9%] bottom-[7%] top-[11%]">
        <div
          className="absolute inset-x-0 top-[36%] h-5 -translate-y-1/2 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.5)] ring-1 ring-paper/15"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, #3d3350 38%, #17131f 100%)",
          }}
        >
          <span
            className="press-roller-sheen absolute inset-0 rounded-full opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(250,247,240,0.16) 0 2px, transparent 2px 13px)",
            }}
          />
          {/* end caps */}
          <span className="absolute -left-2 top-1/2 h-7 w-3 -translate-y-1/2 rounded-md bg-ink-3 ring-1 ring-paper/15" />
          <span className="absolute -right-2 top-1/2 h-7 w-3 -translate-y-1/2 rounded-md bg-ink-3 ring-1 ring-paper/15" />
        </div>
      </div>

      {/* output tray lip */}
      <div className="absolute inset-x-[10%] bottom-[5.2%] h-2 rounded-full bg-ink-2 ring-1 ring-paper/10" />

      {/* status caption */}
      <p className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-spec text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-paper/40">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-wa" />
        Running · letterheads &amp; Rx pads
      </p>
    </div>
  );
}
