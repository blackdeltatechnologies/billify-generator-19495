# Make the Generator a Production-Ready SaaS

## Goal
Turn the current single-device Bill & Receipt Generator into a public SaaS where users can sign in, save customers, persist documents, and share/email PDFs.

## Phase 1: Backend Foundation
- Enable Lovable Cloud to get authentication, PostgreSQL, and serverless functions.
- Set up the required `profiles` table (triggered on `auth.users`) and a `user_roles` table for future admin/moderator capabilities.
- Apply proper RLS policies and GRANT statements on every new public-schema table.

## Phase 2: Customer Database
- Create a `customers` table owned by the authenticated user.
- Add a customer picker to the invoice/receipt forms so users can auto-fill `billTo`, `shipTo`, and company details.
- Build a "Customers" page for CRUD management.

## Phase 3: Document History
- Create `documents` table storing document type (invoice/receipt), template used, serialized form data, totals, currency, and a generated PDF URL or base64 snapshot.
- Add a "Documents" dashboard listing all created invoices/receipts with search, filter by type/date, and re-download.
- Auto-save each generated PDF into history.

## Phase 4: Share & Email
- Generate a public read-only share link for each document using a serverless function or signed URL pattern.
- Add an "Email PDF" action that sends the document to a recipient via a serverless function.
- Include copy-link and send-email buttons on the document list and preview pages.

## Phase 5: SaaS Polish
- Add a landing/marketing home page and move the generator behind `/dashboard` or `/app`.
- Protect generator routes with auth guards; redirect anonymous users to sign in.
- Add a simple pricing/feature callout and a footer.

## Technical Notes
- Use Lovable Cloud (Supabase under the hood) for auth and persistence; no external accounts required.
- Store uploaded logos/QR codes in Cloud Storage and keep references in the document/customer rows.
- Follow the project's existing Tailwind/shadcn design tokens for all new UI.
- All new tables will include explicit GRANTs, RLS enabled, and policies scoped to `auth.uid()`.

## Outcome
Users can register, log in, manage a reusable customer list, generate and store invoices/receipts, re-download old documents, and share or email them to clients.
