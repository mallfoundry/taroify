import { rm } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

await Promise.all([
  rm(path.join(siteRoot, ".generated"), { recursive: true, force: true }),
  rm(path.join(siteRoot, "doc_build"), { recursive: true, force: true }),
])
