// Every page is noindex unless NEXT_PUBLIC_ALLOW_INDEXING is exactly "true".
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true"

export const ROBOTS_METADATA = ALLOW_INDEXING
  ? { index: true, follow: true }
  : { index: false, follow: false }
