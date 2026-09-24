import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/utils/speakers";
import { List, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle as="h2" fontSize="lg">
          {speaker.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <List.Root gap="2" listStyle="none">
          {speaker.sessions.map((session) => (
            <List.Item key={session.id}>
              <Link
                href={`/sessions/${session.id}`}
                aria-label={`${session.title}, ${session.startTime}`}
              >
                <Text
                  fontSize="sm"
                  color="var(--text-secondary)"
                  _hover={{ color: "var(--accent-muted)" }}
                >
                  {session.title} · {session.startTime}
                </Text>
              </Link>
            </List.Item>
          ))}
        </List.Root>
      </CardContent>
    </Card>
  );
}
