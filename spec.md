# Specification

## Summary
**Goal:** Replace Internet Identity-based admin authentication with a simple username/password login system for the AzadNexus admin dashboard.

**Planned changes:**
- Add a backend `adminLogin(username, password)` function that validates credentials against hardcoded values (`azadnexus.global@gmail.com` / `Karusu_7`) and returns a success or error result
- Replace the Internet Identity login flow on the `/admin` route with a username/password login form (email field, password field, submit button, error message display)
- On successful login, show the existing buyer inquiries dashboard
- Add a logout button to the dashboard that returns the user to the login form

**User-visible outcome:** Admins can access the dashboard at `/admin` by entering the configured email and password. Invalid credentials show an error message, and a logout button allows returning to the login screen.
