import { SpeakerCard } from "@/components/molecules/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSpeakersFromSessions } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakers = getSpeakersFromSessions(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker at React Alicante, and the session(s) they&apos;re giving.
      </PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
