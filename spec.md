# Specification

## Summary
**Goal:** Update the hardcoded admin credentials in the backend to a new username and password.

**Planned changes:**
- Update the `validateAdmin` function to accept username `Azadnexus.global@gmail.com` and password `Karusu_7`
- Ensure any other username/password combination is rejected

**User-visible outcome:** The admin can log in at `/admin/login` using the new credentials and be redirected to the admin dashboard on success.
