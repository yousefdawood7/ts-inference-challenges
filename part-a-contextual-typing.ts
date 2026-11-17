// @ts-nocheck   <-- KEEP THIS LINE WHILE YOU PREDICT. It hides red squiggles (hover still works).
//                   Delete it only AFTER you've written your answers, to reveal the errors.
/**
 *! ═══════════════════════════════════════════════════════════════════
 *!  PART A — CONTEXTUAL TYPING
 *! ═══════════════════════════════════════════════════════════════════
 *!  Workflow for EVERY question:
 *!    1. Read the code. Write your prediction in the `ANSWER:` comment.
 *!       Always include the WHY, not only the result.
 *!    2. Hover over variables / parameters / the call to check types.
 *!    3. Delete line 1 (`// @ts-nocheck`) to see which lines error.
 *!    4. Wrong? Don't just fix the answer. Find the RULE you missed.
 *!
 *!  Needs: strict mode, TypeScript 5.4+ (see tsconfig.json).
 */

class Animal {
  name = "";
}
class Dog extends Animal {
  bark() {}
}
class Cat extends Animal {
  meow() {}
}
export {};

//! ─────────────────────────────────────────────────────────────────────
//! A1 — Same object, three places.
//! Which lines error, and why? What are the types of o1.mode and o2.mode?
//! ANSWER:
//! o1.mode (string) will be widened up cause it's in a mutable position
//! o1.2 ("r" | "w") won't be widened up because we did annotate it
//! and we get an error on open(o1) cause obviously string not assingnable to "r" | "w"

//! ─────────────────────────────────────────────────────────────────────
namespace A1 {
  type Opts = { mode: "r" | "w"; retries: number };
  declare function open(o: Opts): void;

  const o1 = { mode: "r", retries: 1 };
  const o2: Opts = { mode: "r", retries: 1 };
  open(o1);
  open(o2);
  open({ mode: "r", retries: 1 });
}

//!  ─────────────────────────────────────────────────────────────────────
//!  A2 — Callbacks and "where was the function written?"
//!  List every error and WHERE it is reported (which line).
//!  Why is `on(h)` itself not an error?
//!  ANSWER:
//! in line of h declaration n && s has implicit any
//! on(h) not an error because of contextual typing
//! on((n) => {}) error because it expects a 2 args not one
//!  ─────────────────────────────────────────────────────────────────────
namespace A2 {
  declare function on(cb: (n: number, s: string) => void): void;

  const h = (n, s) => {};
  on(h);
  on((n, s) => {});
  on((n) => {});
}

//!  ─────────────────────────────────────────────────────────────────────
//!  A3 — Argument order and context-sensitive functions.
//!  r1: what are v, T, R, and r1?
//!  r2: does it compile? Where is the error and what is v's type there?
//!  Describe the ORDER in which TS works things out.
//!  ANSWER:
//! in r1 T would number and R would would be also a number
//! because we get non contextual part first which in the number in r1
//! then we the callback is sensitive to that context so we got v as a numbwer
//! then we check (check it's on separate step)

//! in r2 is the same but in the check step we get an error cause .toFixed() ain't on number
//!  ─────────────────────────────────────────────────────────────────────
namespace A3 {
  declare function apply<T, R>(fn: (v: T) => R, value: T): R;

  const r1 = apply((v) => v.toFixed(), 5);
  const r2 = apply((v) => v.toFixed(), "5");
}

// ─────────────────────────────────────────────────────────────────────
//!  A4 — Context flows in, inference flows out.
//!  Types of p1 and p3. What happens on p2, and which candidates collide?
//!  ALSO: hover each CALL and write down what A is in p1, p2 and p3.
//!  They are NOT all the same. Find the rule that makes them differ
//!  (hint: is the callback context-sensitive? what does it contribute to A?).
//!  ANSWER:
//!  p1 => A: number, x: number, B: string
//!  p2 => A: number, x: string, B: string => but we would get an error string not assigned to number (covariance priority)
//! p3 === same as p1
// ─────────────────────────────────────────────────────────────────────
namespace A4 {
  declare function pipe<A, B>(a: A, f: (x: A) => B): B;

  const p1 = pipe(5, (x) => x.toString());
  const p2 = pipe(5, (x: string) => x.length);
  const p3 = pipe(5, (x: number) => x.toString());
}

// ─────────────────────────────────────────────────────────────────────
//!  A5 — Three operators, one function expression.
//!  Which line errors? Type of g and k? Type of `x` inside each?
//!  ANSWER:
//! g => x: string and returns number
//! k same as g
//! m gets us an error cause length returns a number not string
//!  ─────────────────────────────────────────────────────────────────────
namespace A5 {
  const g = ((x) => x.length) as (s: string) => number;
  const k = ((x) => x.length) satisfies (s: string) => number;
  const m = ((x) => x.length) as (s: string) => string;
}

//! ─────────────────────────────────────────────────────────────────────
//! A6 (EXTRA) — Return positions and literal widening.
//! Write the type of EVERY identifier below. Which ones keep a literal and why?
//! (Think: what is the contextual type of a returned expression?)
//! ANSWER:
//! f1 => string
//! f2 => "a" | "b"
//! f3 => string
//! f4 => "a"
//! f5 => {kind: string}
//! f6 => {kind: "a" | "b"}
//! l1 => string
//! l2 => "a" | "b"
//! l3 => "a" | "b"
//! ─────────────────────────────────────────────────────────────────────

namespace A6 {
  function f1() {
    return "a";
  }
  function f2(): "a" | "b" {
    return "a";
  }
  const f3 = () => "a";
  const f4 = (): "a" => "a";
  const f5 = () => ({ kind: "a" });
  const f6: () => { kind: "a" | "b" } = () => ({ kind: "a" });
  let l1 = Math.random() > 0.5 ? "a" : "b";
  const l2 = Math.random() > 0.5 ? "a" : "b";
  let l3: "a" | "b" = Math.random() > 0.5 ? "a" : "b";
}

//!  ─────────────────────────────────────────────────────────────────────
//!  A7 (EXTRA) — When the contextual signature is ambiguous.
//!  What is x in each case? Which lines error? Why does TS give up (or not)?
//!  ANSWER:
//! u1 => x: any (why any not unknow 🤷‍♂️)
//! u2 => x: number and return would be string and gets us an error cause we didn't return
//! first ov call would be string | number
//! second would be string ONLY
//!  ─────────────────────────────────────────────────────────────────────
namespace A7 {
  type Fn = ((x: number) => void) | ((x: string) => void);
  const u1: Fn = (x) => {};

  type SameParams = ((x: number) => void) | ((x: number) => string);
  const u2: SameParams = (x) => {};

  declare const ov: {
    (cb: (x: number) => void): void;
    (cb: (x: string) => void): void;
  };
  ov((x) => {});
  ov((x: string) => {});
}

//! ─────────────────────────────────────────────────────────────────────
//! A8 (EXTRA) — Config objects full of callbacks.
//! Type of the parameter `e` in each callback. Which lines error?
//! What are the types of h2.click and h3.click?
//! ANSWER:
//! h1: e: ClickEv, KeyEv (Contextual)
//! h2 same as h1
//! h3: error cause of implicit any
//! h4 would be as annotated
//! ─────────────────────────────────────────────────────────────────────
namespace A8 {
  type ClickEv = { x: number; y: number };
  type KeyEv = { key: string };
  type Handlers = { click: (e: ClickEv) => void; key: (e: KeyEv) => void };

  const h1: Handlers = { click: (e) => e.x, key: (e) => e.key };
  const h2 = { click: (e) => e.x, key: (e) => e.key } satisfies Handlers;
  const h3 = { click: (e) => e.x };
  const h4 = { click: (e: ClickEv) => e.x } satisfies Partial<Handlers>;
}
