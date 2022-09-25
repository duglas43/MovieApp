import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MovieCard.module.scss";

type SceletonType = {
  isGrid?: Boolean;
  isMini?: Boolean;
};
const Sceleton: React.FC<SceletonType> = ({ isGrid, isMini }) => {
  if (isMini) {
    return (
      <SkeletonTheme duration={3} baseColor="#333335" highlightColor="#989898">
        <div>
          <Skeleton className={`${styles["sceleton-mini"]} mb-3`} />
        </div>
      </SkeletonTheme>
    );
  }
  return (
    <SkeletonTheme duration={3} baseColor="#333335" highlightColor="#989898">
      <div>
        <Skeleton className={`${styles.card} ${isGrid ? styles.h262 : ""}`} />
      </div>
    </SkeletonTheme>
  );
};

export default Sceleton;
