import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

interface Actor {
  name: string;
  biography?: string;
  profile_path?: string;
  known_for_department?: string;
  birthday?: string;
}

interface ActorHeaderProps {
  person: Actor;
}

const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
};

export const ActorHeader = ({ person }: ActorHeaderProps) => {
  return (
    <Grid templateColumns={{ base: "1fr", md: "300px 1fr" }} gap={8} mb={12}>
      {/* Profile Image */}
      <GridItem>
        {person.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            borderRadius="xl"
            width="100%"
            height="auto"
            objectFit="cover"
            shadow="lg"
          />
        ) : (
          <Box
            bg="gray.700"
            borderRadius="xl"
            p={4}
            textAlign="center"
            height="400px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.400">No Profile Image Available</Text>
          </Box>
        )}
      </GridItem>

      {/* Actor Info */}
      <GridItem>
        <Stack gap={6}>
          <Box>
            <Heading as="h1" size="2xl" mb={2}>
              {person.name}
            </Heading>
            <Text fontSize="xl" color="gray.400" fontWeight="medium">
              {person.known_for_department || "Actor"}
            </Text>
          </Box>

          {person.birthday && (
            <Text fontSize="lg">Born: {formatDate(person.birthday)}</Text>
          )}

          {person.biography && (
            <Box>
              <Text fontSize="lg" lineHeight="tall">
                {person.biography}
              </Text>
            </Box>
          )}
        </Stack>
      </GridItem>
    </Grid>
  );
};
