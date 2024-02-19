import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub,FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithChristi.</div>
      <div>
        <Link to={"https://www.linkedin.com/in/christina-prasamsha-174785226/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/Christina057"} target="_blank">
          <FaGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
