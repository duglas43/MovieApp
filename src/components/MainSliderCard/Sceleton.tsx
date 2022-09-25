import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Sceleton: React.FC = () => {
  return (
    <SkeletonTheme duration={3} baseColor="#333335" highlightColor="#989898">
      <p>
        <Skeleton className="slider-card__wrapper" />
      </p>
    </SkeletonTheme>
  );
};

export default Sceleton;
