import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import type { Inquiry } from '../backend';

interface InquiriesTableProps {
  inquiries: Inquiry[];
}

type SortKey = keyof Inquiry;
type SortDir = 'asc' | 'desc';

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export default function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...inquiries].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    let cmp = 0;
    if (typeof av === 'bigint' && typeof bv === 'bigint') cmp = av < bv ? -1 : av > bv ? 1 : 0;
    else if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv;
    else cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={14} className="text-muted-foreground" />;
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-gold" />
      : <ChevronDown size={14} className="text-gold" />;
  };

  const SortableHead = ({ col, label }: { col: SortKey; label: string }) => (
    <TableHead
      className="cursor-pointer select-none whitespace-nowrap font-body text-xs uppercase tracking-wider"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center gap-1">
        {label} <SortIcon col={col} />
      </div>
    </TableHead>
  );

  if (inquiries.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground font-body">
        No inquiries submitted yet.
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-cream-dark">
              <SortableHead col="id" label="ID" />
              <SortableHead col="name" label="Name" />
              <SortableHead col="company" label="Company" />
              <SortableHead col="country" label="Country" />
              <SortableHead col="riceVariety" label="Rice Variety" />
              <SortableHead col="quantityMT" label="Qty (MT)" />
              <TableHead className="font-body text-xs uppercase tracking-wider">Message</TableHead>
              <SortableHead col="timestamp" label="Submitted" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((inq) => (
              <TableRow key={String(inq.id)} className="hover:bg-cream transition-colors">
                <TableCell className="font-body text-sm font-semibold text-royal">#{String(inq.id)}</TableCell>
                <TableCell className="font-body text-sm">{inq.name}</TableCell>
                <TableCell className="font-body text-sm">{inq.company}</TableCell>
                <TableCell className="font-body text-sm">{inq.country}</TableCell>
                <TableCell className="font-body text-sm">
                  <span
                    className="inline-block px-2 py-0.5 rounded-sm text-xs font-semibold"
                    style={{ backgroundColor: 'oklch(0.96 0.02 255)', color: 'oklch(0.22 0.09 255)' }}
                  >
                    {inq.riceVariety}
                  </span>
                </TableCell>
                <TableCell className="font-body text-sm font-semibold">{inq.quantityMT}</TableCell>
                <TableCell className="font-body text-sm text-muted-foreground max-w-[200px] truncate">
                  {inq.message}
                </TableCell>
                <TableCell className="font-body text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimestamp(inq.timestamp)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
