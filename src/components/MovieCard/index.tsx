import React from "react";
// import movieCardImg from "../../assets/movieCard.jpg";
import styles from "./MovieCard.module.scss";
export type MovieCardProps = {
  isGrid?: Boolean;
  poster_path: string;
  title: string;
  vote_average: number;
};
const MovieCard: React.FC<MovieCardProps> = ({
  isGrid,
  poster_path,
  title,
  vote_average,
}) => {
  const [imgSrc, setImgSrc] = React.useState(
    `https://image.tmdb.org/t/p/w500${poster_path}`
  );
  return (
    <div
      className={`${styles.card} ${isGrid ? styles["card--grid"] : ""}`}
      role="button"
    >
      <div className={`${styles.rating} rounded-5`}>
        {vote_average} <i className="bx bxs-star ms-1"></i>
      </div>
      <img
        src={imgSrc}
        width="175"
        onError={() => {
          setImgSrc(
            "https://via.placeholder.com/500x750/333335/?text=no+image+):"
          );
        }}
        height="262"
        className={`${styles.img} rounded-2`}
        alt="Изображение обложки фильма"
      />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default MovieCard;
