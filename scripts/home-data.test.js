import assert from "node:assert/strict"
import signalChain, { dellClaim } from "../src/data/signalChain.js"

function walk(value, out = []) {
  if (typeof value === "string") out.push(value)
  else if (Array.isArray(value)) value.forEach((item) => walk(item, out))
  else if (value && typeof value === "object") Object.values(value).forEach((item) => walk(item, out))
  return out
}

const strings = walk(signalChain)
const blob = strings.join("\n")
const dellText = walk(signalChain.dell).join("\n")

assert.equal(signalChain.hero.claim, dellClaim)
assert.equal(signalChain.dell.claim, dellClaim)
assert.equal(signalChain.hero.h1, "Interface craft. Systems architecture. Applied AI.")

assert.doesNotMatch(blob, /\+100%/)
assert.doesNotMatch(blob, /RAG-shaped/i)
assert.doesNotMatch(blob, /GPT-?\s*3/i)
assert.doesNotMatch(dellText, /\b(LLM|RAG|agentic|GPT)\b/i)

assert.match(signalChain.rentpath.scoreLabel, /Lighthouse 41→98/)
const { rentpath, ...withoutScore } = signalChain
const rest = walk(withoutScore).join("\n")
assert.doesNotMatch(rest, /41/)
assert.doesNotMatch(rest, /98/)
assert.equal(rentpath.before, "41")
assert.equal(rentpath.after, "98")

const home = signalChain.dell.demos.find((demo) => demo.id === "home")
assert.ok(home)
assert.equal(home.desktop, undefined)
assert.equal(home.img, "/imgs/port/home-dell.jpg")
for (const demo of signalChain.dell.demos) {
  for (const src of [demo.desktop, demo.mobile].filter(Boolean)) {
    assert.match(src, /^\/dell\/[\w-]+\/$/, `Dell demo must be a local build: ${src}`)
  }
}

assert.equal(signalChain.design.items.length, 7)
for (const item of signalChain.design.items) {
  assert.ok(item.img && item.caption, `design item missing portfolio data: ${item.title}`)
}

const hrefs = strings.filter((text) => /^https?:/i.test(text) || text.startsWith("/"))
assert.equal(hrefs.some((href) => /github\.com/i.test(href)), false)
assert.doesNotMatch(blob, /whispkin/i)
assert.doesNotMatch(blob, /r[ée]sum[ée]/i)

assert.deepEqual(
  signalChain.nav.map((item) => item.id),
  ["ai-systems", "engineering", "projects", "design", "contact"]
)

console.log("home-data: ok")
