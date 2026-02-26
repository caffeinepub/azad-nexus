# Specification

## Summary
**Goal:** Replace Internet Identity-based admin authentication with a traditional username/password login system using a backend-generated access key stored in sessionStorage.

**Planned changes:**
- Add stable variables in the Motoko backend to store the admin username and hashed password, plus the current session access key
- Add a `validateAdmin(user, pass)` backend function that validates credentials and returns a unique access key on success, or null on failure
- Update `getInquiries(key)` to accept an access key parameter and validate it instead of checking the Internet Identity caller principal
- Ensure `submitInquiry` remains publicly callable with no authentication changes
- Update `AdminLogin.tsx` to call `validateAdmin` directly, save the returned access key to sessionStorage, and redirect to `/admin` on success or show an error on failure
- Update `Admin.tsx` to read the access key from sessionStorage, pass it to `getInquiries(key)`, and redirect to `/admin/login` if no key is found
- Update `useAuth.ts` and `useQueries.ts` hooks so all admin operations read the access key from sessionStorage and pass it to backend functions, removing Internet Identity reliance for admin routes

**User-visible outcome:** The admin can log in with an email and password on the login page, be redirected to the dashboard where inquiries load correctly, and no longer see "Access Denied" errors. The customer-facing contact form continues to work without any authentication.
