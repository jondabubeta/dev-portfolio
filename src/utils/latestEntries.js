import latestEntries from "../data/latest.json";

function getLatestEntryTime(entry) {
  const [month, day, year] = String(entry.date || "")
    .split("/")
    .map((value) => Number(value));

  if (!month || !day || !year) return 0;

  const fullYear = year < 100 ? 2000 + year : year;
  return Date.UTC(fullYear, month - 1, day);
}

export function sortLatestEntries(entries = latestEntries) {
  return [...entries].sort((a, b) => getLatestEntryTime(b) - getLatestEntryTime(a));
}

export default sortLatestEntries();
