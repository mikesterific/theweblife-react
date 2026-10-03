import assert from "node:assert/strict";
import fs from "node:fs";
import signalChain, { dellClaim } from "../src/data/signalChain.js";

function walk(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => walk(item, out));
  else if (value && typeof value === "object")
    Object.values(value).forEach((item) => walk(item, out));
  return out;
}

const strings = walk(signalChain);
const blob = strings.join("\n");
const dellText = walk(signalChain.dell).join("\n");

assert.equal(signalChain.dell.claim, dellClaim);
assert.equal(
  strings.filter((text) => text === dellClaim).length,
  1,
  "Dell claim appears only in the Dell case",
);
assert.doesNotMatch(walk(signalChain.hero).join("\n"), /Dell|10 seconds|30%/);
assert.equal(
  signalChain.hero.h1,
  "Interface craft. Systems architecture. Applied AI.",
);
assert.equal(
  signalChain.hero.intro,
  "I'm Michael Garrett Jones: print designer, web designer, elite coder, enterprise architect, and Apress author of Pro HTML5 Performance.",
);
assert.equal(signalChain.hero.lede, undefined);
assert.equal(signalChain.hero.cta.label, "See the work");
assert.equal(signalChain.hero.status, undefined);
assert.doesNotMatch(blob, /open to work|hire me|\bhiring\b|job (search|hunt)/i);

assert.doesNotMatch(blob, /\+100%/);
assert.doesNotMatch(blob, /RAG-shaped/i);
assert.doesNotMatch(blob, /GPT-?\s*3/i);
assert.doesNotMatch(dellText, /\b(LLM|RAG|agentic|GPT)\b/i);

assert.match(signalChain.rentpath.scoreLabel, /Lighthouse 41→98/);
const { rentpath, ...withoutScore } = signalChain;
const rest = walk(withoutScore).join("\n");
assert.doesNotMatch(rest, /\b41\b/);
assert.doesNotMatch(rest, /\b98\b/);
assert.equal(rentpath.before, "41");
assert.equal(rentpath.after, "98");
assert.equal(rentpath.img, "/imgs/rentpath.jpg");
assert.ok(
  fs.existsSync(new URL(`../public${rentpath.img}`, import.meta.url)),
  rentpath.img,
);

const home = signalChain.dell.demos.find((demo) => demo.id === "home");
assert.ok(home);
assert.equal(home.desktop, undefined);
assert.equal(home.img, "/imgs/port/home-dell.jpg");
for (const demo of signalChain.dell.demos) {
  for (const src of [demo.desktop, demo.mobile].filter(Boolean)) {
    assert.match(
      src,
      /^\/dell\/[\w-]+\/$/,
      `Dell demo must be a local build: ${src}`,
    );
  }
}

assert.equal(signalChain.design.items.length, 7);
for (const item of signalChain.design.items) {
  assert.ok(
    item.img && item.caption,
    `design item missing portfolio data: ${item.title}`,
  );
}

const hrefs = strings.filter(
  (text) => /^https?:/i.test(text) || text.startsWith("/"),
);
assert.equal(
  hrefs.some((href) => /github\.com/i.test(href)),
  false,
);
assert.doesNotMatch(blob, /whispkin/i);
assert.doesNotMatch(blob, /r[ée]sum[ée]/i);

assert.deepEqual(
  signalChain.nav.map((item) => item.id),
  ["ai-systems", "engineering", "projects", "design", "contact"],
);

assert.ok(signalChain.aiSystems.posts.length >= 1);
for (const post of signalChain.aiSystems.posts) {
  assert.match(
    post.href,
    /^https:\/\/www\.linkedin\.com\/posts\/michaelgarrettjones_/,
  );
  assert.match(post.img, /^\/imgs\/linkedin\/[\w-]+\.jpg$/);
  assert.ok(
    fs.existsSync(new URL(`../public${post.img}`, import.meta.url)),
    post.img,
  );
  assert.ok(post.title && post.excerpt && post.date, post.href);
}

console.log("home-data: ok");
