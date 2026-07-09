// Lightweight self-hosted analytics. Sends events to the Express server's
// /api/event endpoint, which appends them to analytics/events.ndjson.
export function track(name, source = '') {
  const payload = JSON.stringify({
    name,
    source,
    path: window.location.pathname,
    ref: document.referrer || '',
  })
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon('/api/event', blob)
    } else {
      fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      })
    }
  } catch {
    // Analytics must never break the page.
  }
}

export function trackPageview() {
  track('pageview')
}
