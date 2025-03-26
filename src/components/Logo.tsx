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
      paddingLeft="15px"
      position="relative"
      left={0}
      minWidth="fit-content"
      sx={{
        "&": {
          margin: "0 !important",
          padding: "0 0 0 15px !important",
          gap: "0 !important",
        },
      }}
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        letterSpacing="tight"
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
        AstroDB
      </Text>
      <Icon as={PiPlanet} boxSize={7} color={iconColor} marginLeft={2} />
      <Icon as={BiCameraMovie} boxSize={7} color={iconColor} marginLeft={2} />
    </HStack>
  );
};

export default Logo;
