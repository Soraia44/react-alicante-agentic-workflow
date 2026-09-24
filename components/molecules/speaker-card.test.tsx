import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";
import type { Speaker } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    const speaker: Speaker = {
      name: "Marta Fernandez",
      sessions: [
        session({ id: "opening-keynote", title: "Opening Keynote" }),
        session({
          id: "another-session",
          title: "Another Session",
          startTime: "11:00",
        }),
      ],
    };

    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote · 09:00")).toBeInTheDocument();
    expect(screen.getByText("Another Session · 11:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    const speaker: Speaker = {
      name: "Marta Fernandez",
      sessions: [session({ id: "opening-keynote" })],
    };

    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });
});
