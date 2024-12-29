import React from "react";
import "./SocialMenu.css";

const SocialMenu = () => {
  return (
    <div className="social-menu">
      <div className="social-icon twitter">
        <div className="icon">X</div>
        <span className="text">Twitter</span>
      </div>
      <div className="social-icon linkedin">
        <div className="icon">in</div>
        <span className="text">LinkedIn</span>
      </div>
      <div className="social-icon medium">
        <div className="icon">●●</div>
        <span className="text">Medium</span>
      </div>
      <div className="social-icon youtube">
        <div className="icon">▶</div>
        <span className="text">YouTube</span>
      </div>
    </div>
  );
};

export default SocialMenu;
