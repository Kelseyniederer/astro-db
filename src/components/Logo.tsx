import { HStack, Icon, Text } from "@chakra-ui/react";
import { BiCameraMovie } from "react-icons/bi";
import { PiPlanet } from "react-icons/pi";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface Props {
  resetQuery: () => void; // ✅ Function to reset movie query
}

const Logo = ({ resetQuery }: Props) => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleClick = () => {
    resetQuery(); // ✅ Reset movie query
    navigate("/"); // ✅ Navigate to home page
  };

  return (
    <HStack cursor="pointer" onClick={handleClick} spacing={2} pl={4} ml={0}>
      <Icon as={BiCameraMovie} boxSize={10} color="white.400" />
      <Text
        fontSize="2xl"
        fontWeight="bold"
        display={{ base: "none", md: "block" }}
        letterSpacing="tight"
      >
        AstroDB
      </Text>
      <Icon as={PiPlanet} boxSize={8} color="white.400" />
    </HStack>
  );
};

export default Logo;
