import React from "react";
import { MiniMovieCard, MovieCardLoading } from "../../components/";
import { Link } from "react-router-dom";
import { MovieItem } from "../../redux/slices/moviesSlice";
type PopularBarProps = {
  status: string;
  movies: MovieItem[];
};
const PopularBar: React.FC<PopularBarProps> = ({ status, movies }) => {
  const movieList =
    movies &&
    movies.slice(0, 4).map((item) => (
      <Link to={`/movie/${item.id}`} className="text-white" key={item.id}>
        <MiniMovieCard {...item} />
      </Link>
    ));
  const moviesSceleton = Array(5)
    .fill(0)
    .map((_, index) => <MovieCardLoading key={index} isMini />);
  return (
    <div className="right-bar">
      <div className="right-bar__trending">
        <p className="title__text mb-4">Вам может понравиться</p>
        <ul className="right-bar__trending-list">
          {status === "success" ? movieList : moviesSceleton}
        </ul>
      </div>
    </div>
  );
};

export default PopularBar;
