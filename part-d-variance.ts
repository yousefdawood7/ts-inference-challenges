// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 * ═══════════════════════════════════════════════════════════════════
 *  PART D — COVARIANCE · CONTRAVARIANCE · INVARIANCE · BIVARIANCE
 * ═══════════════════════════════════════════════════════════════════
 *  For each position ask: "does T come OUT (produced) or go IN (consumed)?"
 *  Then ask: "is it declared with METHOD syntax (bivariant) or PROPERTY syntax (strict)?"
 *  Assume `strict: true` (so strictFunctionTypes is ON) unless a question says otherwise.
 */

class Animal { name = ""; }
class Dog extends Animal { bark() {} }
class Cat extends Animal { meow() {} }
export {};

// ─────────────────────────────────────────────────────────────────────
// D1 — Which lines compile? The last one is the hard one: explain it.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D1 {
  const f1: (x: Dog) => Animal = (x: Animal) => new Dog();
  const f2: (x: Animal) => Dog = (x: Dog) => new Dog();
  const f3: () => Animal = (): Dog => new Dog();
  const f4: (cb: (a: Animal) => void) => void = (cb: (d: Dog) => void) => {};
}

// ─────────────────────────────────────────────────────────────────────
// D2 — Classify T in each: covariant / contravariant / invariant / bivariant.
// Say which of Dog<->Animal assignments is allowed, for each.
// ANSWER:
//   P1:
//   P2:
//   P3:
//   P4:
//   P5:
//   P6:
// ─────────────────────────────────────────────────────────────────────
namespace D2 {
  interface P1<T> { get: () => T }
  interface P2<T> { set: (v: T) => void }
  interface P3<T> { get: () => T; set: (v: T) => void }
  interface P4<T> { get(): T; set(v: T): void }
  interface P5<T> { cb: (f: (x: T) => void) => void }
  interface P6<T> { readonly items: readonly T[] }

  declare const p1: P1<Dog>; declare const p1a: P1<Animal>;
  declare const p2: P2<Dog>; declare const p2a: P2<Animal>;
  declare const p3: P3<Dog>; declare const p3a: P3<Animal>;
  declare const p4: P4<Dog>; declare const p4a: P4<Animal>;
  declare const p5: P5<Dog>; declare const p5a: P5<Animal>;
  declare const p6: P6<Dog>; declare const p6a: P6<Animal>;

  // Test your classification: delete @ts-nocheck and see which of these error.
  const x1: P1<Animal> = p1;   const y1: P1<Dog> = p1a;
  const x2: P2<Animal> = p2;   const y2: P2<Dog> = p2a;
  const x3: P3<Animal> = p3;   const y3: P3<Dog> = p3a;
  const x4: P4<Animal> = p4;   const y4: P4<Dog> = p4a;
  const x5: P5<Animal> = p5;   const y5: P5<Dog> = p5a;
  const x6: P6<Animal> = p6;   const y6: P6<Dog> = p6a;
}

// ─────────────────────────────────────────────────────────────────────
// D3 — Arrays.
// Which lines error? What is unsound about a1, and why does TS allow it?
// Why is a2 different?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D3 {
  const dogs: Dog[] = [new Dog()];
  const a1: Animal[] = dogs;
  const a2: ReadonlyArray<Animal> = dogs;
  const a3: Cat[] = dogs;
  a1.push(new Cat());
}

// ─────────────────────────────────────────────────────────────────────
// D4 — Method syntax vs property syntax.
// Which lines error? What changes if strictFunctionTypes is turned OFF?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D4 {
  interface M { run(x: Animal): void }
  interface Pr { run: (x: Animal) => void }
  const dh = (x: Dog) => {};

  const m: M = { run: dh };
  const p: Pr = { run: dh };
}

// ─────────────────────────────────────────────────────────────────────
// D5 — Variance annotations (`in` / `out`).
// Which declarations produce an error? Why?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D5 {
  interface A<out T> { get: () => T }
  interface B<in T> { get: () => T }
  interface C<in out T> { get: () => T; set: (v: T) => void }
  interface D<out T> { set: (v: T) => void }
}

// ─────────────────────────────────────────────────────────────────────
// D6 — Explain in your OWN words (write 3-5 sentences, no code):
//   Why does `both` in Part C (C4) infer the NARROWER "a" | "b" instead of
//   the wider `string`? Use the words "contravariant" and "assignable".
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// D7 — Explain in your OWN words (write 3-5 sentences, no code):
//   Why does TypeScript allow Dog[] -> Animal[] even though it's unsound?
//   Use: method syntax, bivariance, strictFunctionTypes, invariant.
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────
// D8 (EXTRA) — Built-in containers. For each line: compiles or not?
// Predict first, THEN reveal. Which of these surprise you, and why?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D8 {
  declare const pd: Promise<Dog>;
  declare const sd: Set<Dog>;
  declare const md: Map<string, Dog>;
  declare const rd: Record<string, Dog>;
  declare const fd: (x: Dog) => void;
  declare const fa: (x: Animal) => void;
  declare const cd: Array<(x: Dog) => void>;

  const r1: Promise<Animal> = pd;
  const r2: Set<Animal> = sd;
  const r3: Map<string, Animal> = md;
  const r4: Record<string, Animal> = rd;
  const r5: Array<(x: Animal) => void> = cd;
  const r6: Array<(x: Dog) => void> = [fa];
  const r7: Set<Dog> = new Set<Animal>();
}

// ─────────────────────────────────────────────────────────────────────
// D9 (EXTRA) — Parameter COUNT is a variance-like rule too.
// Which lines compile? What does an "extra" parameter mean in each direction?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D9 {
  const a: (x: number, y: number) => void = (x) => {};
  const b: (x: number) => void = (x, y) => {};
  const c: (x: number) => void = (x, y?: number) => {};
  const d: (x: number, y?: number) => void = (x: number) => {};
  const e: () => void = (...args: number[]) => {};
}

// ─────────────────────────────────────────────────────────────────────
// D10 (EXTRA, nuance) — Mutable properties are covariant in TS. (!)
// Which lines compile? What is unsound? How does `readonly` change the
// *runtime risk* even though it doesn't change what compiles?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D10 {
  const od: { x: Dog } = { x: new Dog() };
  const oa: { x: Animal } = od;
  oa.x = new Cat();
  const ro: { readonly x: Animal } = od;
}

// ─────────────────────────────────────────────────────────────────────
// D11 (EXTRA, nuance) — Does a variance annotation on a METHOD-syntax
// member get checked strictly? Which declarations error?
// ANSWER:
//
// ─────────────────────────────────────────────────────────────────────
namespace D11 {
  interface Q1<out T> { set(v: T): void }
  interface Q2<out T> { set: (v: T) => void }
  interface Q3<in T> { get(): T }
  interface Q4<in T> { get: () => T }
}

// ─────────────────────────────────────────────────────────────────────
// D12 (EXTRA) — Callback-of-callback: positions multiply like signs.
// Contra x contra = ? Classify T in each (co / contra / inv).
// ANSWER:
//   R1:
//   R2:
//   R3:
// ─────────────────────────────────────────────────────────────────────
namespace D12 {
  interface R1<T> { f: (cb: (x: T) => void) => void }       // T inside a callback param
  interface R2<T> { f: (cb: () => T) => void }              // T inside a callback return
  interface R3<T> { f: () => (x: T) => void }               // T in param of returned fn

  declare const r1: R1<Dog>; declare const r1a: R1<Animal>;
  declare const r2: R2<Dog>; declare const r2a: R2<Animal>;
  declare const r3: R3<Dog>; declare const r3a: R3<Animal>;

  const x1: R1<Animal> = r1;  const y1: R1<Dog> = r1a;
  const x2: R2<Animal> = r2;  const y2: R2<Dog> = r2a;
  const x3: R3<Animal> = r3;  const y3: R3<Dog> = r3a;
}
