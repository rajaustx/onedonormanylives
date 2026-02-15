import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import path from "path";

export interface PledgeEntry {
  pvtId: string;
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  country: string;
  message: string;
  date: string;
  isFeatured: boolean;
  source: string;
  status: string;
}

/** Parse CSV at build time, filter by status=approved, sort newest first */
export function getPledgeData(): PledgeEntry[] {
  const csvPath = path.join(process.cwd(), "data", "pledges.csv");
  let content: string;
  try {
    content = readFileSync(csvPath, "utf-8");
  } catch {
    return [];
  }

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  return records
    .filter((row) => {
      const status = (row.status ?? row.Status ?? "approved").trim().toLowerCase();
      return status === "approved";
    })
    .sort((a, b) => {
      const dateA = (a.date ?? "").trim();
      const dateB = (b.date ?? "").trim();
      if (dateA !== dateB) {
        return dateB.localeCompare(dateA); // newest first
      }
      const idA = parseInt(String(a.id ?? 0), 10) || 0;
      const idB = parseInt(String(b.id ?? 0), 10) || 0;
      return idB - idA; // fallback by id desc
    })
    .map((row) => {
      const status = (row.status ?? row.Status ?? "approved").trim();
      const source = (row.source ?? row.Source ?? "seed").trim();

      return {
        pvtId: (row.pvt_id ?? row.pvtId ?? "").trim(),
        id: parseInt(String(row.id ?? 0), 10) || 0,
        firstName: (row.first_name ?? row.firstName ?? "").trim(),
        lastName: (row.last_name ?? row.lastName ?? row.last_initial ?? row.lastInitial ?? "").trim(),
        city: (row.city ?? row.City ?? "").trim(),
        state: (row.state ?? row.State ?? "").trim(),
        country: (row.country ?? row.Country ?? "").trim(),
        message: (row.message ?? row.Message ?? "").trim(),
        date: (row.date ?? "").trim(),
        isFeatured: String(row.is_featured ?? row.isFeatured ?? "").toLowerCase() === "true",
        source,
        status,
      };
    })
    .filter((entry) => entry.firstName.length > 0)
    .slice(0, 50); // Most recent 50 only
}

/** Count of approved pledges */
export function getPledgeCount(): number {
  return getPledgeData().length;
}
