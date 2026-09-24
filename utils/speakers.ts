import type { Session } from "@/types/session";

export interface Speaker {
  name: string;
  sessions: Session[];
}

/**
 * The closing panel's `speaker` column holds this placeholder instead of a
 * real name — see `supabase/migrations/20260917090100_seed_sessions.sql`.
 * It must never surface as a speaker in its own right.
 */
const CLOSING_PANEL_PLACEHOLDER = "Full speaker lineup";

/**
 * Groups sessions by speaker, sorted by name. Sessions within each speaker
 * keep the order they arrive in — `fetchSessions()` already orders by
 * `start_time`, so that order stays chronological here too.
 */
export function getSpeakersFromSessions(sessions: Session[]): Speaker[] {
  const sessionsByName = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === CLOSING_PANEL_PLACEHOLDER) continue;

    const existing = sessionsByName.get(session.speaker) ?? [];
    existing.push(session);
    sessionsByName.set(session.speaker, existing);
  }

  return Array.from(sessionsByName, ([name, sessions]) => ({
    name,
    sessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
