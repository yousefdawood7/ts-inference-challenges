// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 * ═══════════════════════════════════════════════════════════════════
 *  PART F — BOSS LEVEL (all five topics combined)
 * ═══════════════════════════════════════════════════════════════════
 *  These mix contextual typing + satisfies + candidates + variance + inference control.
 *  Do Parts A-E first. For each question, name EVERY rule you used.
 */

class Animal { name = ""; }
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }
export {};

// ─────────────────────────────────────────────────────────────────────
// F1 — A mini state store.
// Type of s1. Walk through the PHASES: which sites give candidates for S
// and A, in what order, and where does contextual typing happen?
// Is the callback context-sensitive? Does it matter that `action` is annotated?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F1 {
  declare function createStore<S, A>(
    initial: S,
    reducer: (state: S, action: A) => S,
  ): { state: S; dispatch: (a: A) => void };

  const s1 = createStore(0, (state, action: "inc" | "dec") => state + 1);
}

// ─────────────────────────────────────────────────────────────────────
// F2 — A config helper with a const type parameter.
// Type of cfg. What changes if `const` is removed?
// What changes if `readonly` is removed from `ports`?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F2 {
  declare function defineConfig<
    const T extends { mode: "dev" | "prod"; ports: readonly number[] }
  >(c: T): T;

  const cfg = defineConfig({ mode: "dev", ports: [80, 443] });
}

// ─────────────────────────────────────────────────────────────────────
// F3 — Callback parameters, variance, and method syntax together.
// Which lines error? Does `on` being a METHOD relax the check on line 3?
// Be PRECISE: which signature is being compared to which?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F3 {
  declare function register(handler: (a: Animal) => void): void;
  declare const bus: { on(handler: (a: Animal) => void): void };

  register((d: Dog) => {});
  register((x: unknown) => {});
  bus.on((d: Dog) => {});
}

// ─────────────────────────────────────────────────────────────────────
// F4 — Two type parameters vs one.
// Type of each, or the error and its location. Explain z3 and z4.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F4 {
  declare function zip<A, B>(a: A[], b: B[]): [A, B][];
  declare function same<T>(a: T[], b: T[]): T[];

  const z1 = zip([1, 2], ["a", "b"]);
  const z2 = same([1, 2], ["a", "b"]);
  const z3 = same([new Dog()], [new Animal()]);
  const z4 = same<Animal>([new Dog()], [new Cat()]);
}

// ─────────────────────────────────────────────────────────────────────
// F5 — TEACH-BACK. No code. 2-4 sentences each, in your own words.
//   1. Contextual typing vs inference: which direction does each flow?
//   2. Why `satisfies` can be better than an annotation, and when an
//      annotation is still the right choice.
//   3. How TS resolves candidates (covariant and contravariant), including
//      when it UNIONS and when it picks the LEFTMOST.
//   4. Why callback parameters give contravariant candidates.
//   5. When to reach for NoInfer, when for <const T>, and when for
//      separate type parameters.
// ANSWER:
//   1.
//   2.
//   3.
//   4.
//   5.
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// F6 (EXTRA) — A typed event emitter (the classic real-world combo).
// Type of `p` in each callback. Which calls error? Why do name1 and name2
// behave differently? Why is the ternary call OK and what is `p` there?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F6 {
  type Events = { click: { x: number; y: number }; key: { code: string } };
  declare const emitter: {
    on<K extends keyof Events>(name: K, cb: (payload: Events[K]) => void): void;
  };

  emitter.on("click", p => p.x);
  emitter.on("key", p => p.x);

  const name1 = "click";
  let name2 = "click";
  emitter.on(name1, p => p.x);
  emitter.on(name2, p => p.x);
  emitter.on(Math.random() > 0.5 ? "click" : "key", p => p);
}

// ─────────────────────────────────────────────────────────────────────
// F7 (EXTRA) — `as const satisfies` and deriving types from values.
// What are R1 and R2 (hover over rr1 / rr2)? What does `as const` add,
// and what does `satisfies` add? Which one would you ship?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F7 {
  const routes1 = { home: "/", user: "/u/:id" } as const satisfies Record<string, string>;
  const routes2 = { home: "/", user: "/u/:id" } satisfies Record<string, string>;
  const routes3: Record<string, string> = { home: "/", user: "/u/:id" };

  type R1 = (typeof routes1)[keyof typeof routes1];
  type R2 = (typeof routes2)[keyof typeof routes2];
  type R3 = (typeof routes3)[keyof typeof routes3];

  declare const rr1: R1;
  declare const rr2: R2;
  declare const rr3: R3;

  routes1.home;
  routes3.whatever;
}

// ─────────────────────────────────────────────────────────────────────
// F8 (EXTRA) — compose: inference flowing through TWO callbacks.
// Types of h1. What happens with h2? Explain with: context-sensitive
// functions, which sites give candidates first, and what T falls back to.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F8 {
  declare function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C;

  const h1 = compose((n: number) => String(n), s => s.length);
  const h2 = compose(n => n + 1, (n: number) => String(n));
}

// ─────────────────────────────────────────────────────────────────────
// F9 (EXTRA) — A generic API that uses EVERYTHING.
// Type of each result (or the error + location). Explain z5 carefully:
// which piece of the argument gives which candidate, and in what order?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace F9 {
  declare function table<
    const Cols extends readonly string[],
    Row extends Record<Cols[number], unknown>
  >(cols: Cols, rows: Row[]): { cols: Cols; rows: Row[] };

  const z1 = table(["id", "name"], [{ id: 1, name: "a" }]);
  const z2 = table(["id", "name"], [{ id: 1 }]);
  const z3 = table(["id"], [{ id: 1, extra: true }]);
}
