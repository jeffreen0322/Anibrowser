/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./user-stats.css";

export const UserStats = ({ anilist }) => {
  const [watchedCount, setWatchedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const getAmountStatus = (status) => {
    return anilist.filter((anime) => anime.status === status).length;
  };

  const getAverageRating = () => {
    let ratingCount = 0;
    let ratingSum = 0;
    anilist.forEach((anime) => {
      if (anime.rating) {
        ratingCount = ratingCount + 1;
        ratingSum = ratingSum + anime.rating;
      }
    });

    return ratingSum / ratingCount;
  };

  useEffect(() => {
    setWatchedCount(getAmountStatus("watching"));
    setCompletedCount(getAmountStatus("completed"));
    setAverageRating(getAverageRating());
  }, [anilist]);

  return (
    <div className="stats-container">
      <h3>Profile Statistics</h3>
      <ul>
        <li className="stat-entry">
          <div className="entry-container">
            <p>Total Entries</p>
            <p>{anilist.length}</p>
          </div>
        </li>
        <li className="stat-entry">
          <div className="entry-container">
            <p>Watching</p>
            <p>{watchedCount}</p>
          </div>
        </li>
        <li className="stat-entry">
          <div className="entry-container">
            <p>Completed</p>
            <p>{completedCount}</p>
          </div>
        </li>

        <li className="stat-entry">
          <div className="entry-container">
            <p>Median Rating</p>
            <p>
              {averageRating === 0 || !averageRating ? `N/A` : averageRating}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};
