// This component is no longer used directly — the table is now embedded in Admin.tsx.
// Keeping this file as a re-export stub to avoid import errors from any other files.
import { Inquiry } from '../backend';

export interface InquiriesTableProps {
  inquiries: Inquiry[];
}

// Empty stub — the full table implementation lives in Admin.tsx
export default function InquiriesTable(_props: InquiriesTableProps) {
  return null;
}
