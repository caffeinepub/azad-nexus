# Specification

## Summary
**Goal:** Build a full public-facing business website and secure admin panel for "Azad Nexus Global," an Indian rice export company.

**Planned changes:**
- Create public pages: Home (hero, key stats, CTAs), About (company story, mission), Services (rice types, quality standards, export process), Blog (article listings), and Contact (inquiry form with name, company, country, rice variety, quantity, message fields)
- Implement secure admin login at /admin using username (azadnexus.global@gmail.com) and password (Karusu_7) stored as a hashed credential in the backend; unauthenticated access shows Access Denied with a link back to the public site
- Build admin dashboard to view, and delete contact form inquiry submissions displayed in a table (name, company, country, rice variety, quantity, message, timestamp)
- Build blog post management in admin: create, edit, and delete posts (title, content, published date); published posts appear on the public Blog page
- Build services management in admin: edit service name, description, and details; changes reflect immediately on the public Services page
- Apply a premium visual theme across all public pages using warm greens, golds, and creams with clean modern typography consistent with a B2B rice export brand
- Add a footer with company contact details and social links across all public pages

**User-visible outcome:** Visitors can browse the Azad Nexus Global website, learn about the company and its rice export services, read blog posts, and submit inquiries. The admin can log in securely to manage inquiries, blog posts, and services.
