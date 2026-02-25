import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    authenticateAdmin(username: string, password: string): Promise<boolean>;
    /**
     * / Clear all inquiries. Admin-only.
     */
    clearInquiries(): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Retrieve all inquiries. Admin-only.
     */
    getInquiries(): Promise<Array<Inquiry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    /**
     * / Submit a new inquiry. Open to any caller (including guests).
     */
    submitInquiry(name: string, company: string, country: string, riceVariety: string, quantityMT: number, message: string): Promise<bigint>;
}
