import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { BiCameraMovie } from "react-icons/bi";
import { PiPlanet } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface Props {
  resetQuery: () => void;
}

const Logo = ({ resetQuery }: Props) => {
  const navigate = useNavigate();
  const iconColor = useColorModeValue("gray.600", "white.400");
  const textColor = useColorModeValue("gray.800", "white");
  const hoverBg = useColorModeValue("gray.100", "whiteAlpha.200");

  const handleClick = () => {
    resetQuery();
    navigate("/");
  };

  return (
    <HStack
      cursor="pointer"
      onClick={handleClick}
      spacing={0}
      alignItems="center"
      margin={0}
      position="relative"
      left={0}
      minWidth="fit-content"
      borderRadius="md"
      px={2}
      py={1.5}
      _hover={{ bg: hoverBg }}
      sx={{
        "&": {
          margin: "0 !important",
          gap: "0 !important",
        },
      }}
    >
      <Text
        fontSize={{ base: "md", md: "2xl" }}
        fontWeight="normal"
        letterSpacing="-0.5px"
        marginLeft={0}
        paddingLeft={0}
        color={textColor}
        sx={{
          "&": {
            margin: "0 !important",
            padding: "0 !important",
          },
        }}
      >
        AstroMovieDB
      </Text>
      <Icon
        as={PiPlanet}
        boxSize={{ base: 4, md: 5 }}
        color={iconColor}
        marginLeft={1.5}
      />
      <Icon
        as={BiCameraMovie}
        boxSize={{ base: 4, md: 5 }}
        color={iconColor}
        marginLeft={1.5}
      />
    </HStack>
  );
};

export default Logo;
