import { Heading, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/no-image-placeholder-6f3882e0.webp";
import useData from "../hooks/useData";
import usePersonMovies, { Movie } from "../hooks/usePersonMovies";

interface Actor {
  id: number;
  name: string;
  biography?: string;
  profile_path?: string;
  known_for_department?: string;
}

type SortOrder =
  | "release_date_desc"
  | "release_date_asc"
  | "title_asc"
  | "title_desc";

const ActorProfile = () => {
  const { id } = useParams();
  const personId = id ? parseInt(id) : undefined;
  const [sortOrder, setSortOrder] = useState<SortOrder>("release_date_desc");
  const [decadeFilter, setDecadeFilter] = useState<string>("all");

  const {
    data: person,
    error: personError,
    isLoading: personLoading,
  } = useData<Actor>(`/person/${id}`, {}, [id]);

  const {
    data: movies = [],
    error: moviesError,
    isLoading: moviesLoading,
  } = usePersonMovies(personId);

  if (personLoading || moviesLoading) {
    return (
      <div>
        <Spinner size="xl" />
        <Text mt={4}>Loading actor details...</Text>
      </div>
    );
  }

  if (personError || !person) {
    return (
      <div>
        <Text color="red.500">
          Error loading actor details: {personError || "Actor not found"}
        </Text>
      </div>
    );
  }

  const sortMovies = (moviesToSort: Movie[]) => {
    return [...moviesToSort].sort((a, b) => {
      switch (sortOrder) {
        case "release_date_desc":
          return (
            new Date(b.release_date || "").getTime() -
            new Date(a.release_date || "").getTime()
          );
        case "release_date_asc":
          return (
            new Date(a.release_date || "").getTime() -
            new Date(b.release_date || "").getTime()
          );
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  };

  const filterMoviesByDecade = (moviesToFilter: Movie[]) => {
    if (decadeFilter === "all") return moviesToFilter;

    const decade = parseInt(decadeFilter);
    return moviesToFilter.filter((movie) => {
      if (!movie.release_date) return false;
      const year = new Date(movie.release_date).getFullYear();
      return year >= decade && year < decade + 10;
    });
  };

  const decades = Array.from(
    new Set(
      movies
        .filter((m) => m.release_date)
        .map(
          (m) => Math.floor(new Date(m.release_date).getFullYear() / 10) * 10
        )
    )
  ).sort((a, b) => b - a);

  const filteredMovies = filterMoviesByDecade(movies);
  const sortedMovies = sortMovies(filteredMovies);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
        }}
      >
        {person.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            style={{ maxWidth: "300px", borderRadius: "8px" }}
          />
        ) : (
          <Text>No Profile Image</Text>
        )}

        <Heading as="h1" size="xl">
          {person.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold">
          {person.known_for_department || "Unknown"}
        </Text>
        <Text textAlign="center" maxWidth="600px">
          {person.biography || "No biography available."}
        </Text>

        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Heading as="h2" size="lg">
              Movies ({sortedMovies.length})
            </Heading>
            <div style={{ display: "flex", gap: "16px" }}>
              <select
                value={decadeFilter}
                onChange={(e) => setDecadeFilter(e.target.value)}
                style={{ padding: "8px" }}
              >
                <option value="all">All Decades</option>
                {decades.map((decade) => (
                  <option key={decade} value={decade}>
                    {decade}s
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                style={{ padding: "8px" }}
              >
                <option value="release_date_desc">Newest First</option>
                <option value="release_date_asc">Oldest First</option>
                <option value="title_asc">Title A-Z</option>
                <option value="title_desc">Title Z-A</option>
              </select>
            </div>
          </div>

          {moviesError ? (
            <Text color="red.500">Error loading movies: {moviesError}</Text>
          ) : sortedMovies.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "24px",
              }}
            >
              {sortedMovies.map((movie) => (
                <Link key={movie.id} to={`/movie/${movie.id}`}>
                  <div style={{ transition: "transform 0.2s" }}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                          : noImage
                      }
                      alt={movie.title}
                      style={{
                        width: "100%",
                        aspectRatio: "2/3",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <Text
                      fontWeight="bold"
                      fontSize="sm"
                      noOfLines={1}
                      marginTop="8px"
                    >
                      {movie.title}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </Text>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Text>No movies found for the selected filters.</Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorProfile;
