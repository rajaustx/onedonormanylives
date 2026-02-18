import { parse } from "csv-parse/sync";
import { readFileSync } from "fs";
import path from "path";

export interface AppreciationEntry {
  message: string;
  initials: string;
  location: string;
  index: number;
  date: string;
  isFeatured: boolean;
  relationship: string;
}

/** Parse CSV at build time, filter hidden, sort by index */
export function getAppreciationData(): AppreciationEntry[] {
  const csvPath = path.join(process.cwd(), "data", "appreciation_kidney_donation.csv");
  const content = readFileSync(csvPath, "utf-8");

  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as Record<string, string>[];

  return records
    .filter((row) => {
      const hidden = row.hidden ?? row.is_hidden ?? row.Hidden;
      if (hidden !== undefined && hidden !== null && String(hidden).toLowerCase() === "true") {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const indexA = parseInt(String(a.id ?? a.index ?? 0), 10) || 0;
      const indexB = parseInt(String(b.id ?? b.index ?? 0), 10) || 0;
      return indexA - indexB;
    })
    .map((row) => {
      const firstName = (row.first_name ?? row.firstName ?? "").trim();
      const lastName = (row.last_name ?? row.lastName ?? "").trim();
      const location = (row.location ?? row.Location ?? "").trim();
      const message = (row.message ?? row.Message ?? "").trim();

      const raw = firstName.slice(0, 3) || "???";
      const first3 = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
      const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "U";
      const initials = `${first3}...${lastInitial}`;

      const isFeatured =
        String(row.is_featured ?? row.isFeatured ?? "").toLowerCase() === "true";

      return {
        message,
        initials,
        location,
        index: parseInt(String(row.id ?? row.index ?? 0), 10) || 0,
        date: (row.date ?? row.Date ?? "").trim(),
        isFeatured,
        relationship: (row.relationship ?? "").trim(),
      };
    })
    .filter((entry) => entry.message.length > 0);
}
