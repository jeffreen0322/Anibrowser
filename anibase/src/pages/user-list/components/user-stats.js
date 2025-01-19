/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "./user-stats.css";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

export const UserStats = ({ anilist }) => {
  const [watchedCount, setWatchedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const pieData = {
    labels: ["Watching", "Completed"],
    datasets: [
      {
        label: "Status",
        data: [watchedCount, completedCount],
        backgroundColor: ["green", "#3c66a4"],
        hoverBackgroundColor: ["rgb(55, 186, 55)", "#6ea0ea"],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "whitesmoke",
        },
      },
    },
  };

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
        <li className="stat-entry-one">
          <div className="entry-container total">
            <strong>Total Entries</strong>
            <p>{anilist.length}</p>
          </div>
        </li>
        <li className="stat-entry">
          <div className="entry-container watching">
            <strong>Watching</strong>
            <p>{watchedCount}</p>
          </div>
        </li>
        <li className="stat-entry">
          <div className="entry-container completed">
            <strong>Completed</strong>
            <p>{completedCount}</p>
          </div>
        </li>

        <li className="stat-entry">
          <div className="entry-container rating">
            <strong>Median Rating</strong>
            <p>
              {averageRating === 0 || !averageRating ? `N/A` : averageRating}
            </p>
          </div>
        </li>
      </ul>

      <Doughnut data={pieData} options={pieOptions} />
    </div>
  );
};
