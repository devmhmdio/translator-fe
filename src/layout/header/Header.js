import React from "react";
import classNames from "classnames";
import Toggle from "../sidebar/Toggle";
import Logo from "../logo/Logo";
import User from "./dropdown/user/User";
import { useLocation } from "react-router-dom";

import { useTheme, useThemeUpdate } from '../provider/Theme';

const Header = ({ fixed, className, ...props }) => {

  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (location.pathname === "/") {
    return null;
  }

  const headerClass = classNames({
    "nk-header": true,
    "nk-header-fixed": fixed,
    [`is-light`]: theme.header === "white",
    [`is-${theme.header}`]: theme.header !== "white" && theme.header !== "light",
    [`${className}`]: className,
  });
  return (
    <div className={headerClass}>
      <div className="container-fluid">
        <div className="nk-header-wrap">
          <div className="nk-menu-trigger d-xl-none ms-n1">
            <Toggle
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none ms-n1"
              icon="menu"
              click={themeUpdate.sidebarVisibility}
            />
          </div>
          <div className="nk-header-brand d-xl-none">
            <Logo />
          </div>
          <div className="nk-header-tools">
            <ul className="nk-quick-nav">
              <li className="user-dropdown"  onClick={themeUpdate.sidebarHide}>
                <User />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
