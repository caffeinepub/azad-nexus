import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    imageDescription: string;
    publishedDate: string;
    timestamp: bigint;
}
export interface Service {
    id: bigint;
    name: string;
    description: string;
    details: string;
}
export interface Inquiry {
    id: bigint;
    riceVariety: string;
    country: string;
    name: string;
    company: string;
    message: string;
    timestamp: bigint;
    quantityMT: number;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    /**
     * / Attempt admin login. On success, assigns the #admin role to the caller's principal.
     * / The caller must not be anonymous (anonymous principals cannot hold roles).
     */
    adminLogin(username: string, password: string): Promise<boolean>;
    /**
     * / Revoke admin role from the caller (logout).
     */
    adminLogout(): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Clear all inquiries. Admin-only.
     */
    clearInquiries(): Promise<void>;
    /**
     * / Create a new blog post. Admin-only.
     */
    createBlogPost(title: string, content: string, imageDescription: string, publishedDate: string): Promise<bigint>;
    /**
     * / Create a new service listing. Admin-only.
     */
    createService(name: string, description: string, details: string): Promise<bigint>;
    /**
     * / Delete a blog post. Admin-only.
     */
    deleteBlogPost(id: bigint): Promise<void>;
    /**
     * / Delete an individual inquiry by ID. Admin-only.
     */
    deleteInquiry(id: bigint): Promise<void>;
    /**
     * / Delete a service listing. Admin-only.
     */
    deleteService(id: bigint): Promise<void>;
    /**
     * / Edit an existing blog post. Admin-only.
     */
    editBlogPost(id: bigint, title: string, content: string, imageDescription: string, publishedDate: string): Promise<void>;
    /**
     * / Edit an existing service listing. Admin-only.
     */
    editService(id: bigint, name: string, description: string, details: string): Promise<void>;
    /**
     * / Retrieve a single blog post by ID. Public.
     */
    getBlogPost(id: bigint): Promise<BlogPost | null>;
    /**
     * / Retrieve all published blog posts. Public.
     */
    getBlogPosts(): Promise<Array<BlogPost>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Retrieve all inquiries. Admin-only.
     */
    getInquiries(): Promise<Array<Inquiry>>;
    /**
     * / Retrieve a single service by ID. Public.
     */
    getService(id: bigint): Promise<Service | null>;
    /**
     * / Retrieve all services. Public.
     */
    getServices(): Promise<Array<Service>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    /**
     * / Check whether the caller currently holds the admin role.
     */
    isAdminLoggedIn(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Submit a new inquiry. Open to any caller (including guests).
     */
    submitInquiry(name: string, company: string, country: string, riceVariety: string, quantityMT: number, message: string): Promise<bigint>;
}
