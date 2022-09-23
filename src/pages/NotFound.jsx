import React from "react";
import MainImage from "../assets/not-found-img.jpg";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div
      className="position-absolute top-0 start-0 end-0 bottom-0 not-found"
      style={{
        background: `url(${MainImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fs-1 text-white not-found__inner">
        <p className="mb-4">Здесь ничего нет 😕</p>
        <p className="mb-4">Вернитесь на главную страницу</p>
        <Link to="/">
          <button className="btn btn-secondary border border-4 px-3 py-1 rounded-5 ">
            На главную
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
