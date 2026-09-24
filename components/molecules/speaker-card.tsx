import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/utils/speakers";
import { Flex, Text } from "@chakra-ui/react";

export interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardHeader>
        <CardTitle fontSize="lg">{speaker.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {speaker.sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Text
                fontSize="sm"
                color="var(--text-muted)"
                _hover={{ color: "var(--accent-hex)" }}
              >
                {session.title} · {session.startTime}
              </Text>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
