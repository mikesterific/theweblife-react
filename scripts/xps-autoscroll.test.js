import assert from "node:assert/strict"
import {
  prefersReducedMotion,
  shouldStartXpsConceptAutoScroll,
  xpsAutoScrollPlan,
} from "../src/hooks/xpsConceptAutoScroll.js"

const ready = {
  enabled: true,
  reducedMotion: false,
  scrollingDown: true,
  triggerTop: 4,
  viewportTop: 76,
  alreadyPlayed: false,
}

assert.equal(shouldStartXpsConceptAutoScroll(ready), true)
assert.equal(
  shouldStartXpsConceptAutoScroll({ ...ready, reducedMotion: true }),
  false,
  "reduced motion must not start an auto-scroll",
)
assert.equal(shouldStartXpsConceptAutoScroll({ ...ready, scrollingDown: false }), false)
assert.equal(shouldStartXpsConceptAutoScroll({ ...ready, alreadyPlayed: true }), false)
assert.equal(shouldStartXpsConceptAutoScroll({ ...ready, enabled: false }), false)
assert.equal(shouldStartXpsConceptAutoScroll({ ...ready, triggerTop: 200 }), false)

assert.deepEqual(xpsAutoScrollPlan({ ...ready, frameMax: 4200, sectionEnd: 2400, windowY: 900 }), {
  kind: "frame",
  to: 4200,
})
assert.deepEqual(xpsAutoScrollPlan({ ...ready, frameMax: 0, sectionEnd: 2400, windowY: 900 }), {
  kind: "page",
  to: 2400,
})
assert.equal(
  xpsAutoScrollPlan({ ...ready, reducedMotion: true, frameMax: 4200, sectionEnd: 2400, windowY: 900 }),
  null,
)

assert.equal(
  prefersReducedMotion(() => ({ matches: true })),
  true,
)
assert.equal(
  prefersReducedMotion(() => ({ matches: false })),
  false,
)

console.log("xps-autoscroll: ok")
