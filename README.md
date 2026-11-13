# TypeScript Mastery Challenge

Contextual typing · `satisfies` · generic inference & candidates · variance · controlling inference.
**No answers are included.** That is on purpose.

## Setup (2 minutes)

1. Put all files in one folder and open it in VS Code (or any editor with the TypeScript language service).
2. Make sure the editor uses TypeScript **5.4 or newer** (`NoInfer` needs 5.4).
   VS Code: `Ctrl/Cmd+Shift+P` → **TypeScript: Select TypeScript Version** → _Use Workspace Version_ after `npm i -D typescript`, or use VS Code's bundled version.
3. `tsconfig.json` already sets `strict: true`. Do not loosen it; several questions depend on `strictFunctionTypes` and `noImplicitAny`.

## The workflow (do this for EVERY question)

1. **Predict.** Write your answer in the `ANSWER:` comment. Include the **why**, not just the result.
2. **Hover.** Hover over variables, callback parameters, and the _call itself_. Hovering the call shows the resolved signature with every `T` filled in. That is the single most useful trick in this challenge.
3. **Reveal errors.** Every file starts with `// @ts-nocheck` so red squiggles don't spoil your prediction. Delete that line only after you have answered the whole file.
4. **If you were wrong, find the rule you missed.** Don't just correct the answer. Name the rule: "I forgot widening is disabled when T is also inferred from a nested position."

## Order

| File                              | Topic                                                              |
| --------------------------------- | ------------------------------------------------------------------ |
| `part-a-contextual-typing.ts`     | top-down typing, context-sensitive functions, ambiguous signatures |
| `part-b-satisfies.ts`             | check + context + keep inferred type; arrays vs tuples; freshness  |
| `part-c-inference-candidates.ts`  | candidates, widening, unions vs leftmost, contravariant candidates |
| `part-d-variance.ts`              | co/contra/in/bi-variance, method vs property syntax, `in`/`out`    |
| `part-e-controlling-inference.ts` | priorities, defaults, `NoInfer`, `const` type parameters           |
| `part-f-boss-level.ts`            | everything combined + a teach-back section                         |

Do them in order. Each part builds on the previous one.

## Grading yourself

A question is **mastered** only if you predicted correctly _and_ your explanation names the right rule.
Right answer + wrong reason = not mastered. Redo it in a week.

## Version notes

All code was checked against **TypeScript 5.9.3** and **7.0.2**, and both report identical errors on identical lines.

Two behaviors are version-dependent and the file tells you where:

- `NoInfer` requires TypeScript 5.4+.
- How `const T` treats a _mutable_ array constraint (Part E, E4) changed between **5.2 and 5.3**.
