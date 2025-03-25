import { Box, Text } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  genreId: number;
  name: string;
}

const GenrePill = ({ genreId, name }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // Construct the new search params
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("genre", genreId.toString());

    // Navigate to home with the genre parameter
    const to = isHomePage ? `?${searchParams}` : `/?${searchParams}`;
    navigate(to);
  };

  return (
    <Link to="#" onClick={handleClick}>
      <Box
        bg="gray.700"
        _light={{ bg: "gray.100" }}
        px={3}
        py={1}
        borderRadius="full"
        cursor="pointer"
        transition="all 0.2s"
        _hover={{
          transform: "scale(1.05)",
          bg: "gray.600",
          _light: { bg: "gray.200" },
        }}
      >
        <Text
          fontSize="sm"
          color="whiteAlpha.900"
          _light={{ color: "gray.700" }}
        >
          {name}
        </Text>
      </Box>
    </Link>
  );
};

export default GenrePill;
