import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { getSpeakersFromSessions } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("getSpeakersFromSessions", () => {
  it("groups sessions by speaker, sorted by name", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "b", speaker: "Naia Etxeberria", title: "Session B" }),
      session({ id: "a", speaker: "Diego Castellanos", title: "Session A" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Naia Etxeberria",
    ]);
  });

  it("collects every session for a speaker who gives more than one", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "a", speaker: "Diego Castellanos", title: "Session A" }),
      session({ id: "b", speaker: "Diego Castellanos", title: "Session B" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Diego Castellanos",
        sessions: [
          expect.objectContaining({ id: "a", title: "Session A" }),
          expect.objectContaining({ id: "b", title: "Session B" }),
        ],
      },
    ]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const speakers = getSpeakersFromSessions([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(speakers).toEqual([]);
  });

  it("returns nothing for no sessions", () => {
    expect(getSpeakersFromSessions([])).toEqual([]);
  });
});
