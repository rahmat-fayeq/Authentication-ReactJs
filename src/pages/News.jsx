import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../tools/AuthSlice";
import useAxios from "../utils/useAxios";

const News = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useAxios();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const { status, data } = await api.get("/api/news");
      if (status === 200) {
        setPosts(data);
      } else {
        dispatch(removeToken());
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container col-md-6">
      {posts.map((post) => (
        <div className="card mb-3" key={post.id}>
          <div className="card-header">{post.category}</div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </div>
          <div className="card-footer">Author: {post.author}</div>
        </div>
      ))}
    </div>
  );
};

export default News;
