const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5
const MAX_ENTRIES = 1000

type Bucket = {
  count: number
  resetAt: number
}

const hits = new Map<string, Bucket>()

const prune = (now: number) => {
  for (const [ip, bucket] of hits) {
    if (bucket.resetAt <= now) hits.delete(ip)
  }
  if (hits.size >= MAX_ENTRIES) hits.clear()
}

export const allowContactSubmit = (ip: string): boolean => {
  const now = Date.now()
  prune(now)

  const bucket = hits.get(ip)
  if (!bucket) {
    hits.set(ip, {count: 1, resetAt: now + WINDOW_MS})
    return true
  }

  if (bucket.count >= MAX_HITS) return false

  bucket.count += 1
  return true
}
