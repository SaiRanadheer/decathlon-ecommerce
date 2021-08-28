import React from "react";

export default function Rating(props) {
  const { rating, reviewsCount } = props;
  return (
    <div className="rating">
      {[...Array(5).keys()].map((ratingVal) => {
        return (
          <span key={`rating-star-${ratingVal}`}>
            <i
              className={
                rating - ratingVal >= 1
                  ? "fa fa-star"
                  : rating - ratingVal >= 0.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-o"
              }
            ></i>
          </span>
        );
      })}
      <span>{reviewsCount + " Reviews"}</span>
    </div>
  );
}
