import { HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { PiPlanet } from "react-icons/pi";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

interface Props {
  resetQuery: () => void; // ✅ Function to reset movie query
}

const Logo = ({ resetQuery }: Props) => {
  const navigate = useNavigate(); // ✅ Hook for navigation
  const stackRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Log stack dimensions and styling
    if (stackRef.current) {
      const stackStyle = window.getComputedStyle(stackRef.current);
      const parentStyle = stackRef.current.parentElement
        ? window.getComputedStyle(stackRef.current.parentElement)
        : null;

      console.log("\n=== Logo Stack ===");
      console.log("Stack dimensions:", {
        width: stackRef.current.offsetWidth,
        height: stackRef.current.offsetHeight,
        clientWidth: stackRef.current.clientWidth,
        clientHeight: stackRef.current.clientHeight,
        getBoundingClientRect: stackRef.current.getBoundingClientRect(),
      });
      console.log("Stack computed style:", {
        padding: stackStyle.padding,
        paddingLeft: stackStyle.paddingLeft,
        margin: stackStyle.margin,
        marginLeft: stackStyle.marginLeft,
        display: stackStyle.display,
        alignItems: stackStyle.alignItems,
        justifyContent: stackStyle.justifyContent,
        position: stackStyle.position,
        left: stackStyle.left,
        transform: stackStyle.transform,
      });

      if (parentStyle) {
        console.log("Stack Parent computed style:", {
          padding: parentStyle.padding,
          paddingLeft: parentStyle.paddingLeft,
          margin: parentStyle.margin,
          marginLeft: parentStyle.marginLeft,
          display: parentStyle.display,
          position: parentStyle.position,
          left: parentStyle.left,
        });
      }
    }

    // Log text dimensions and styling
    if (textRef.current) {
      const textStyle = window.getComputedStyle(textRef.current);
      console.log("\n=== Logo Text ===");
      console.log("Text dimensions:", {
        width: textRef.current.offsetWidth,
        height: textRef.current.offsetHeight,
        getBoundingClientRect: textRef.current.getBoundingClientRect(),
      });
      console.log("Text computed style:", {
        fontSize: textStyle.fontSize,
        fontWeight: textStyle.fontWeight,
        letterSpacing: textStyle.letterSpacing,
        padding: textStyle.padding,
        paddingLeft: textStyle.paddingLeft,
        margin: textStyle.margin,
        marginLeft: textStyle.marginLeft,
      });
    }
  }, []);

  const handleClick = () => {
    resetQuery(); // ✅ Reset movie query
    navigate("/"); // ✅ Navigate to home page
  };

  return (
    <HStack
      ref={stackRef}
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
        ref={textRef}
        fontSize="4xl"
        fontWeight="bold"
        letterSpacing="tight"
        marginLeft={0}
        paddingLeft={0}
        sx={{
          "&": {
            margin: "0 !important",
            padding: "0 !important",
          },
        }}
      >
        AstroDB
      </Text>
      <Icon as={PiPlanet} boxSize={7} color="white.400" marginLeft={2} />
      <Icon as={BiCameraMovie} boxSize={7} color="white.400" marginLeft={2} />
    </HStack>
  );
};

export default Logo;
