// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 * ═══════════════════════════════════════════════════════════════════
 *  PART B — `satisfies`
 * ═══════════════════════════════════════════════════════════════════
 *  Reminder of the three jobs of `expr satisfies T`:
 *    (1) check expr against T   (2) use T as contextual type   (3) keep expr's own type
 *  But: "keep the expr's own type" means "inferred WITH T as context".
 *  Always say WHICH of these three explains your answer.
 */

class Animal { name = ""; }
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }
export {};

// ─────────────────────────────────────────────────────────────────────
// B1 — satisfies vs annotation.
// Types of a.id, b.id, a.tags. One sentence: what's the difference?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B1 {
  type Shape = { id: number | string; tags: string[] };
  const a = { id: 1, tags: ["x"] } satisfies Shape;
  const b: Shape = { id: 1, tags: ["x"] };
}

// ─────────────────────────────────────────────────────────────────────
// B2 — Literal preservation depends on T.
// Types of c.dir and c.n. Why do they differ in "literalness"?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B2 {
  const c = { dir: "up", n: 1 } satisfies { dir: "up" | "down"; n: number };
}

// ─────────────────────────────────────────────────────────────────────
// B3 — Arrays.
// Type of d, e, f. Explain each one.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B3 {
  const d = ["a", "b"] satisfies string[];
  const e = ["a", "b"] satisfies ("a" | "b")[];
  const f = ["a", "b"] as const satisfies readonly string[];
}

// ─────────────────────────────────────────────────────────────────────
// B4 — Tuples.
// Type of t1 and t2. What exactly makes them different?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B4 {
  const t1 = [1, "x"] satisfies [number, string];
  const t2 = [1, "x"] satisfies (number | string)[];
}

// ─────────────────────────────────────────────────────────────────────
// B5 — satisfies vs as (the "real check" question).
// Which lines error? Why?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B5 {
  type Cfg = { host: string; port?: number };
  const x = { host: "a", prot: 1 } satisfies Cfg;
  const y = { host: "a" } as Cfg;
  const z = { host: "a", prot: 1 } as Cfg;
}

// ─────────────────────────────────────────────────────────────────────
// B6 — Read the type from the OUTSIDE IN.
// Does it compile? Which layer is wrong? How would you fix it?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B6 {
  const people = [{ id: 1, name: "A" }] satisfies Array<Record<string, { id: number; name: string }>>;
}

// ─────────────────────────────────────────────────────────────────────
// B7 (EXTRA) — Array vs tuple, again, with objects (you hit this one live).
// Types of arr[0].id and tup[0].id. Types of arr[1].id and tup[1].id.
// Is `arr` a tuple? What is `isBanned` in each element?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B7 {
  type P = { id: string | number; isBanned: false };
  const arr = [
    { id: 2, isBanned: false },
    { id: "2", isBanned: false },
  ] satisfies Array<P>;

  const tup = [
    { id: 2, isBanned: false },
    { id: "2", isBanned: false },
  ] satisfies [P, P];
}

// ─────────────────────────────────────────────────────────────────────
// B8 (EXTRA) — satisfies on a function expression.
// Type of fn, and the type of x. Then: does `bad` compile?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B8 {
  const fn = (x => x * 2) satisfies (n: number) => number;
  const bad = (x => x.toUpperCase()) satisfies (n: number) => string;
}

// ─────────────────────────────────────────────────────────────────────
// B9 (EXTRA, nuance) — Excess-property checks need a FRESH object literal.
// Which lines error? Why does one of them NOT error even though it
// has an extra property?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B9 {
  type Cfg = { host: string };
  const src = { host: "a", extra: 1 };

  const v1 = src satisfies Cfg;
  const v2 = { host: "a", extra: 1 } satisfies Cfg;
  const v3: Cfg = src;
  const v4: Cfg = { host: "a", extra: 1 };
}

// ─────────────────────────────────────────────────────────────────────
// B10 (EXTRA, nuance) — Annotation narrows on assignment... sometimes.
// Which of the four `.toUpperCase()` calls compile? Explain the difference
// between u1 and o1 (hint: what does assignment narrowing apply to?).
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B10 {
  const u1: string | number = "a";
  u1.toUpperCase();

  const o1: { v: string | number } = { v: "a" };
  o1.v.toUpperCase();

  const o2 = { v: "a" } satisfies { v: string | number };
  o2.v.toUpperCase();

  const o3 = { v: "a" as string | number };
  o3.v.toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────
// B11 (EXTRA) — The palette example (typos caught, shapes kept).
// Which lines error? What are the types of ok.red and ok.green?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B11 {
  type Colors = "red" | "green" | "blue";
  type RGB = [number, number, number];

  const ok = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
  } satisfies Record<Colors, string | RGB>;

  const typo = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255],
  } satisfies Record<Colors, string | RGB>;

  const missing = {
    red: [255, 0, 0],
    green: "#00ff00",
  } satisfies Record<Colors, string | RGB>;

  ok.red.at(0);
  ok.green.toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────
// B12 (EXTRA) — satisfies with a union as T (discriminated union).
// Types of k.kind and k.v. Does `k2` compile? Why / why not?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace B12 {
  type Msg = { kind: "a"; v: number } | { kind: "b"; v: string };
  const k = { kind: "a", v: 1 } satisfies Msg;
  const k2 = { kind: "a", v: "oops" } satisfies Msg;
}
