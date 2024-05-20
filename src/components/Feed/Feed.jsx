import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";

const Feed = ({ category }) => {
  // const value_converter = (x) => {
  //   if (x >= 1000000) {
  //     return Math.floor(x / 1000000) + "M";
  //   } else if (x >= 1000) {
  //     return Math.floor(x / 1000) + "K";
  //   } else {
  //     return x;
  //   }
  // };
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=AU&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      const data = await response.json();
      if (data.items) {
        setData(data.items);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default Feed;
