import React, { useEffect, useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList } from "../../../../components/links/Links";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { findUpper } from "../../../../utils/Utils";

const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const [data, setData] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedToken = jwt_decode(token);
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/user/${decodedToken.id}`,
    })
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm" />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{data.userRole}</div>
            <div className="user-name dropdown-indicator">{data.name}</div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu end className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>{findUpper(data.name)}</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{data.name}</span>
              <span className="sub-text">{data.its}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            {/*<LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
      </LinkItem>*/}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
