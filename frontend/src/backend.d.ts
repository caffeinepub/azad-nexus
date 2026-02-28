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
    status: InquiryStatus;
    country: string;
    riceCategory: string;
    name: string;
    submittedAt: bigint;
    email: string;
    company: string;
    message: string;
    phone: string;
    quantityMT: string;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum InquiryStatus {
    resolved = "resolved",
    pending = "pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteInquiry(key: string, id: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiries(key: string): Promise<Array<Inquiry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markResolved(key: string, id: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(name: string, company: string, country: string, quantityMT: string, riceCategory: string, email: string, phone: string, message: string): Promise<void>;
    validateAdmin(username: string, password: string): Promise<string | null>;
}
