import { SpeakerCard } from "@/components/molecules/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSpeakersFromSessions } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Keeps this page static — see app/[locale]/layout.tsx.
  setRequestLocale(locale);

  const t = await getTranslations("SpeakersPage");
  const sessions = await fetchSessions();
  const speakers = getSpeakersFromSessions(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid gap="4" templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}>
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.name} speaker={speaker} />
        ))}
      </Grid>
    </Flex>
  );
}
