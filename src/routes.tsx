import { createHashRouter } from "react-router-dom";
import App from "./App";
import ActorProfile from "./components/ActorProfile";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import TvDetails from "./components/TvDetails";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home movieQuery={{}} /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "tv/:id", element: <TvDetails /> },
      { path: "person/:id", element: <ActorProfile /> },
    ],
  },
]);

export default router;
