export const STATUSES = {
  active: 'Active',
  planned: 'Planned',
  ongoing: 'Ongoing',
  maintenance: 'Maintenance',
  paused: 'Paused',
  completed: 'Completed',
  archived: 'Archived',
  prototype: 'Prototype',
};

export const STATUS_KEYS = Object.keys(STATUSES);

export function normalizeStatus(s) {
  return String(s ?? '').toLowerCase().trim();
}

// Try to match an input (key or label) to a canonical status key
export function matchStatusInput(input) {
  const n = normalizeStatus(input);
  if (!n) return null;
  for (const k of STATUS_KEYS) {
    if (k === n) return k;
    if (normalizeStatus(STATUSES[k]) === n) return k;
  }
  return null;
}

// Optional: map status keys to CSS class names for consistent coloring
export const STATUS_CLASS = {
  active: 'status-active',
  planned: 'status-planned',
  ongoing: 'status-ongoing',
  maintenance: 'status-maintenance',
  paused: 'status-paused',
  completed: 'status-completed',
  archived: 'status-archived',
  prototype: 'status-prototype',
};
