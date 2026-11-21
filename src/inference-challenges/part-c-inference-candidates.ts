// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 * ═══════════════════════════════════════════════════════════════════
 *  PART C — GENERIC INFERENCE AND CANDIDATES
 * ═══════════════════════════════════════════════════════════════════
 *  For every call, work through the pipeline OUT LOUD in your answer:
 *    1. Which sites give candidates?  (covariant vs contravariant)
 *    2. Is each literal candidate widened? (primitive constraint? top-level in return?
 *       does T also appear nested in another parameter?)
 *    3. How are the candidates combined? (union of same-base literals? common supertype? leftmost?)
 *    4. THEN: is each argument assignable to the resulting parameter type?
 *       (Errors come from step 4, never from inference itself.)
 *
 *  Tip: hover over the CALL (e.g. over `pair`) to see the resolved signature with T filled in.
 */

class Animal { name = ""; }
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }
export {};

// ─────────────────────────────────────────────────────────────────────
// C1 — The basics.
// For each: the type of T, or where the error is and why.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C1 {
  declare function pair<T>(a: T, b: T): [T, T];

  const c1 = pair(1, 2);
  const c2 = pair(1, "a");
  const c3 = pair(new Dog(), new Animal());
  const c4 = pair(new Dog(), new Cat());
}

// ─────────────────────────────────────────────────────────────────────
// C2 — When does a literal widen?
// Types of i1..i4. State the RULE that explains each one.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C2 {
  declare function id<T>(x: T): T;
  declare function box<T>(x: T): { value: T };
  declare function boxS<T extends string>(x: T): { value: T };

  const i1 = id("hi");
  const i2 = box("hi");
  const i3 = boxS("hi");
  const i4 = id({ k: "hi" });
}

// ─────────────────────────────────────────────────────────────────────
// C3 — Same-base literals: union or not?
// Type of n1. How does this differ from pair(1, 2) in C1, and WHY?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C3 {
  declare function pair3<T extends number>(a: T, b: T): [T, T];
  const n1 = pair3(1, 2);
}

// ─────────────────────────────────────────────────────────────────────
// C4 — Contravariant candidates.
// Types of r1 and r2. What happens with r3, and WHERE is it reported?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C4 {
  declare function both<T>(a: (x: T) => void, b: (x: T) => void): T;

  const r1 = both((x: string) => {}, (x: "a" | "b") => {});
  const r2 = both((x: Dog) => {}, (x: Animal) => {});
  const r3 = both((x: Dog) => {}, (x: Cat) => {});
}

// ─────────────────────────────────────────────────────────────────────
// C5 — Covariant AND contravariant candidates for the same T.
// For each call: inferred T, does it compile, which candidates decided it?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C5 {
  declare function run<T>(value: T, fn: (x: T) => void): void;

  run("a", (x: string) => {});
  run("c", (x: "a" | "b") => {});
  run(5, (x: string) => {});
}

// ─────────────────────────────────────────────────────────────────────
// C6 — Candidates from nested positions.
// Type of q1. What happens with q2 and WHERE?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C6 {
  declare function f<T>(a: T[], b: { value: T }): T;

  const q1 = f([1, 2], { value: 3 });
  const q2 = f([1, 2], { value: "3" });
}

// ─────────────────────────────────────────────────────────────────────
// C7 — The "a | b | c" mystery. Explain step by step, using
// contextual typing, widening and candidate resolution.
// Type of s1 and s2.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C7 {
  declare function choose<T extends string>(options: T[], initial: T): T;
  declare function choose3<T>(options: T[], initial: T): T;

  const s1 = choose(["a", "b"], "c");
  const s2 = choose3(["a", "b"], "c");
}

// ─────────────────────────────────────────────────────────────────────
// C8 (trap) — Does `extends string | number` rescue pair(1, "a")?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C8 {
  declare function pairX<T extends string | number>(a: T, b: T): [T, T];
  const t = pairX(1, "a");
}

// ─────────────────────────────────────────────────────────────────────
// C9 (EXTRA) — Candidates from a callback's RETURN.
// Types of m0, m1, m2, m3. How do multiple return expressions become ONE candidate?
// m0 vs m1 is the interesting pair: why does a single "big" widen but a
// union of literals does not?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C9 {
  declare function map<T, R>(xs: T[], f: (x: T) => R): R[];

  const m0 = map([1, 2], x => "big");
  const m1 = map([1, 2], x => x > 1 ? "big" : "small");
  const m2 = map([1, 2], x => x > 1 ? "big" : 0);
  const m3 = map([1, 2], x => x > 1 ? { a: 1 } : { b: "s" });
}

// ─────────────────────────────────────────────────────────────────────
// C10 (EXTRA, nuance) — Object literals as candidates.
// Types of o1 and o2. Why is o1 NOT an error, even though {a} and {b}
// are unrelated types? (Compare with pair(new Dog(), new Cat()) in C1.)
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C10 {
  declare function pair<T>(a: T, b: T): [T, T];

  const o1 = pair({ a: 1 }, { b: 2 });
  const dogLike = { bark() {}, name: "" };
  const catLike = { meow() {}, name: "" };
  const o2 = pair(dogLike, catLike);
}

// ─────────────────────────────────────────────────────────────────────
// C11 (EXTRA) — `K extends keyof T` and literals.
// Types of v1, v2. Why does K stay a literal here? What happens with v3?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C11 {
  declare function get<T, K extends keyof T>(o: T, k: K): T[K];

  const v1 = get({ a: 1, b: "x" }, "b");
  const v2 = get({ a: 1, b: "x" }, "a");
  const v3 = get({ a: 1, b: "x" }, "c");
}

// ─────────────────────────────────────────────────────────────────────
// C12 (EXTRA) — Rest parameters make tuples, array literals don't (usually).
// Types of t1, t2, t3, t4. What exactly makes a tuple appear?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C12 {
  declare function tupRest<T extends unknown[]>(...args: T): T;
  declare function tupArr<T extends unknown[]>(x: T): T;
  declare function tupHint<T extends [unknown, ...unknown[]]>(x: T): T;
  declare function tupVariadic<T extends unknown[]>(x: [...T]): T;

  const t1 = tupRest(1, "a");
  const t2 = tupArr([1, "a"]);
  const t3 = tupHint([1, "a"]);
  const t4 = tupVariadic([1, "a"]);
}

// ─────────────────────────────────────────────────────────────────────
// C13 (EXTRA) — Inference through nested generic types.
// Types of u1..u3, and the T of each call. Which part of each argument
// does TS match against which part of the parameter?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace C13 {
  declare function unwrap<T>(p: Promise<T>): T;
  declare function first<T>(xs: readonly T[]): T;
  declare function fromEntries<V>(e: Record<string, V>): V[];

  const u1 = unwrap(Promise.resolve(1));
  const u2 = first(["a", "b"] as const);
  const u3 = fromEntries({ x: 1, y: "s" });
}
