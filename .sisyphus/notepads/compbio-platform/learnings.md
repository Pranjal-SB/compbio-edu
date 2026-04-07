## Routing setup
- Used React Router with a single Layout route to keep the header and footer consistent across all pages.
- `NavLink` works well for active link styling without extra state.
- Nested routes under `genomic-navigator` keep the URL structure readable for tool pages.
- API service pattern: use native `fetch()` plus a shared timeout helper (`AbortController`, 30s) and normalize errors into a small `ApiError` type.
- For external bio APIs, keep response interfaces narrow and return raw payloads when the upstream shape is variable (useful for BLAST polling/results).
- Glossary pages work well as alphabetized accordion lists with search-first filtering; keeping the term data in a separate file makes expansion easy.
- For biochemistry terms, short 2-3 sentence definitions plus category badges are enough to stay educational without cluttering the layout.
- The current build has an unrelated TypeScript import error in `src/components/ProteinSearch.tsx`, so glossary changes should be verified separately from the app build until that is fixed.
