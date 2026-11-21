// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 * ═══════════════════════════════════════════════════════════════════
 *  PART E — CONTROLLING INFERENCE
 *  (priorities · defaults · NoInfer · const type parameters)
 * ═══════════════════════════════════════════════════════════════════
 *  Needs TypeScript 5.4+ for NoInfer, 5.0+ for `const T`.
 */

class Animal { name = ""; }
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }
export {};

// ─────────────────────────────────────────────────────────────────────
// E1 — Return-type context vs argument candidates.
// Type of e1. The inferred T for e2. Which of e3 / e4 error, and why?
// What does this tell you about candidate PRIORITIES?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E1 {
  declare function empty<T>(): T[];
  declare function wrap<T>(x: T): T[];

  const e1 = empty();
  const e2: string[] = empty();
  const e3: string[] = wrap(5);
  const e4: (string | number)[] = wrap(5);
}

// ─────────────────────────────────────────────────────────────────────
// E2 — No candidates: default / constraint / unknown. And the catch with d3.
// Types of d1, d2, d3, and the rule behind each.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E2 {
  declare function m1<T = number>(): T;
  declare function m2<T extends string>(): T;
  declare function m3<T = number>(x?: T): T;

  const d1 = m1();
  const d2 = m2();
  const d3 = m3("s");
}

// ─────────────────────────────────────────────────────────────────────
// E3 — NoInfer. For each call: compiles? What is T? What does NoInfer do?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E3 {
  declare function pick<T extends string>(opts: T[], initial: NoInfer<T>): T;
  declare function pick2<T extends string>(opts: T[], initial: T): T;

  pick(["a", "b"], "a");
  pick(["a", "b"], "c");
  pick2(["a", "b"], "c");
}

// ─────────────────────────────────────────────────────────────────────
// E4 — const type parameters.
// Types of k1..k4. Compare k2 (READONLY constraint) with k3 (MUTABLE constraint):
// what differs, and why? Why is k4 not exact?
// NOTE: how `const T` treats a MUTABLE array constraint changed between
// TS 5.2 and 5.3. Check your version (VS Code: Ctrl+Shift+P -> "TypeScript:
// Select TypeScript Version") and write down which behavior you see.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E4 {
  declare function f1<const T>(x: T): T;
  declare function f2<const T extends readonly unknown[]>(x: T): T;
  declare function f3<const T extends string[]>(x: T): T;

  const k1 = f1({ a: [1, 2] });
  const k2 = f2([1, "x"]);
  const k3 = f3(["a", "b"]);
  const arr = [1, 2];
  const k4 = f2(arr);
}

// ─────────────────────────────────────────────────────────────────────
// E5 — WRITE CODE (replace each `declare function` with your own signature).
//   1. `choose`: choose(["x","y"], "x") must return "x" | "y";
//                choose(["x","y"], "z") must be an ERROR.
//   2. `defineRoutes`: defineRoutes(["/home","/about"]) must return
//                readonly ["/home", "/about"].
//                What happens if you pass a pre-declared `const r = ["/home","/about"]`?
//   3. `merge`: merge(1, "a") must compile and return [number, string].
//                Why can't `<T>(a: T, b: T)` do it?
// ANSWER (write your signatures here too):
//
// ─────────────────────────────────────────────────────────────────────
namespace E5 {
  declare function choose(options: any, initial: any): any;
  declare function defineRoutes(paths: any): any;
  declare function merge(a: any, b: any): any;

  const c1 = choose(["x", "y"], "x");
  const c2 = choose(["x", "y"], "z");
  const d1 = defineRoutes(["/home", "/about"]);
  const r = ["/home", "/about"];
  const d2 = defineRoutes(r);
  const m1 = merge(1, "a");
}

// ─────────────────────────────────────────────────────────────────────
// E6 (EXTRA) — NoInfer on a fallback parameter. A realistic API.
// Types of T in each call, and which ones compile. Compare f1 and f2.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E6 {
  declare function fill<T>(value: T, fallback: T): T;
  declare function fillStrict<T>(value: T, fallback: NoInfer<T>): T;

  const x1 = fill("a", "b");
  const x2 = fillStrict("a", "b");
  const x3 = fillStrict<string>("a", "b");
  const x4 = fillStrict(1 as number, 2);
}

// ─────────────────────────────────────────────────────────────────────
// E7 (EXTRA, nuance) — `T | T[]`: the naked type variable has LOWER priority.
// Types of w1..w4. Which match does TS prefer, T[] or naked T? Why?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E7 {
  declare function one<T>(x: T | T[]): T;

  const w1 = one(1);
  const w2 = one([1, 2]);
  const w3 = one(["a"]);
  const w4 = one([1, "a"]);
}

// ─────────────────────────────────────────────────────────────────────
// E8 (EXTRA) — Default AND constraint AND candidates together.
// Types of g1, g2, g3. Is the default ever used when a candidate exists?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E8 {
  declare function g<T extends object = { a: 1 }>(x?: T): T;

  const g1 = g();
  const g2 = g({ b: 2 });
  const g3 = g([1, 2]);
}

// ─────────────────────────────────────────────────────────────────────
// E9 (EXTRA) — `const T` with objects: what becomes readonly?
// Types of c1..c3. What does the `const` modifier do to an object
// that is NOT written inline?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace E9 {
  declare function keep<const T>(x: T): T;
  declare function keepPlain<T>(x: T): T;

  const c1 = keep({ n: 1, tags: ["a", "b"], nested: { ok: true } });
  const c2 = keepPlain({ n: 1, tags: ["a", "b"], nested: { ok: true } });
  const shared = { n: 1, tags: ["a", "b"] };
  const c3 = keep(shared);
}
