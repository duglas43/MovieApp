import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MovieCard.module.scss";

function Sceleton({ isGrid, isMini }) {
  if (isMini) {
    return (
      <SkeletonTheme duration={3} baseColor="#333335" highlightColor="#989898">
        <p>
          <Skeleton className={`${styles["sceleton-mini"]} mb-3`} />
        </p>
      </SkeletonTheme>
    );
  }
  return (
    <SkeletonTheme duration={3} baseColor="#333335" highlightColor="#989898">
      <p>
        <Skeleton className={`${styles.card} ${isGrid ? styles.h262 : ""}`} />
      </p>
    </SkeletonTheme>
  );
}

export default Sceleton;
