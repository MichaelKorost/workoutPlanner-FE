import "./Profile.scss";
import React from "react";
import Tilt from "react-parallax-tilt";


function Profile() {
  return (
    <>
      <Tilt
        className="out"
        perspective={100}
        tiltMaxAngleX={10}
        scale={1.1}
        tiltMaxAngleY={10}
      >
        <img
          className="exercise__img2"
          src={
            "https://res.cloudinary.com/dlvvmlrui/image/upload/v1678989169/pLaRi5jXSHDKu6WRydetBo-970-80.jpg_m20bxf.webp"
          }
          alt="exercise image"
        />
        <div className="in">
          <div>React</div>
          <div>Parallax Tilt</div>
          <div>👀</div>
        </div>
      </Tilt>
    </>
  );
}

export default Profile;
