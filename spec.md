# Specification

## Summary
**Goal:** Build a complete B2B rice export website for AZAD NEXUS with a premium corporate design, multi-page React frontend, on-chain inquiry storage via Motoko backend, and a password-protected admin panel.

**Planned changes:**
- Set up React Router with five pages: Home, Products, Quality Assurance, Global Footprint, and Contact/Inquiry, plus an /admin route
- Implement a persistent top navigation bar with the AZAD NEXUS logo, nav links, and a "Request a Quote" CTA button
- Apply a premium minimalist theme throughout: Deep Royal Blue (#0A1F5C), Gold accent (#C9A84C), generous white space, serif display headlines, and sans-serif body text
- Build the Home page with: full-width hero (hero-split.dim_1920x1080.png background, headline, dual CTAs), About Us summary, featured products horizontal slider, "Why Choose Us" three-card section, and "Direct from Farmers" section
- Build the Products page with Basmati (1121, Pusa, Steam) and Non-Basmati (Long Grain, IR64, Parboiled) category tabs; each card shows name, description, and a specs table (Grain Length, Moisture Content, Purity)
- Build the Quality Assurance page with Certifications placeholder badges (APEDA, ISO), a numbered/icon Lab Testing process section, and a Packaging Standards section
- Build the Global Footprint page with a responsive four-card grid for Middle East, Europe, Southeast Asia, and Africa
- Build the Contact/Inquiry page with a lead-generation form (Full Name, Company Name, Country, Rice Variety dropdown, Quantity in MT, optional Message) and a "Request a Quote" submit button that stores the inquiry on-chain and shows a success confirmation
- Build the Admin Panel at /admin with a password gate, inquiry table (ID, Name, Company, Country, Rice Variety, Quantity, Message, Timestamp), and a Logout button
- Create a Motoko backend actor with a stable Inquiry record type and submitInquiry, getInquiries (password-protected), and clearInquiries (password-protected) functions
- Add SEO meta tags and Open Graph tags to index.html
- Render the hero image, rice texture accent, and AZAD NEXUS logo from frontend/public/assets/generated/

**User-visible outcome:** Visitors can browse AZAD NEXUS's rice product catalog, learn about quality standards and export markets, and submit trade inquiries stored on-chain. Admins can log in at /admin to view all submitted inquiries.
