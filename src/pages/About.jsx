import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">About us</div>
        <div className="card-body">
          <h5 className="card-title">JWT Authentication using Django & React</h5>
          <p className="card-text">
            The meant of this application is to show that how to authenticate using jwt in Djano and react !
          </p>
          <Link to="#" className="btn btn-primary">
            Go somewhere
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
