import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
  rating: number; // Define the type of the rating prop as a number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const starIcons = [];
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }
  if (halfStar) {
    starIcons.push(<FontAwesomeIcon icon={faStar} key="half" />);
  }

  return <div className="star-rating">{starIcons}</div>;
};

export default StarRating;
