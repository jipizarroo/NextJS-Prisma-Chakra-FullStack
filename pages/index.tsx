import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  // we should handle the loading of the user with a spinner or skeleton components.
  const { user } = useMe();

  return (
    <GradientLayout
      color="red"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <Box color="white" paddingX="40x">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artis this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="15%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/250/250"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
