import * as React from "react";
import ChildTab from "../app-childtab";
import "./tab.css";
import { adminTabs, employeeTabs } from "../Tabs.js";
import Refresh from "public/refresh.png";
import IconButton from "../../components/iconButton";
// import { type } from "../../storage";

import "../../index.css";
// import {ReactComponent as My_profile } from "public/svg/My_profile.svg";
// import Attendance from "public/attendance.png";
// import Myprofile from "public/myprofile.png";
let type = localStorage.getItem("type");
let tabs;
if (type === "user") tabs = employeeTabs;
if (type === "admin") tabs = adminTabs;

function refresh() {
  window.location.reload();
}

export default function AppTab({ tabName, childName, isAdmin = false }) {
  // console.log(tabs);
  let hasChild = false;
  let childTab = undefined;
  // isAdmin ? (tabs = adminTabs) : (tabs = employeeTabs);
  for (let i = 0; i < tabs.length; i++) {
    let tab = tabs[i];
    // console.log(tab.text + " " + tabName);
    if (tab.text === tabName) {
      tab.active = true;
      if (tab.active === true && tab.child !== undefined) {
        hasChild = true;
        childTab = tab.child;
      }
    } else tab.active = false;
  }

  let iconStyle = {
    width: "2.5rem",
  };
  return (
    <>
      <div className="tabSlide">
        <ul id="myTab">
          {/* <li>
            <IconButton
              icon={Refresh}
              iconStyle={iconStyle}
              children="Refresh"
              onClick={refresh}
            ></IconButton>
            </li> */}
          {tabs.map((tab) => {
            return (
              <>
                <li key={tab.text} className="tabChild isDesktopTab">
                  <a
                    href={`${tab.url}`}
                    className={`tab
                    ${tab.active ? "tabActive" : "tabUnactive"}
                  `}
                    // className="profile-tab"
                    type="button"
                  >
                    {tab.text}
                  </a>
                </li>
                <li
                  key={tab.text}
                  className="tabChild isMobileTab"
                >
                  <a
                    href={`${tab.url}`}
                    type="button"
                    className={`tabRes ${
                      tab.active ? "tabActive" : "tabUnactive"
                    }`}
                  >
                    icon
                    {/* {{tab.text} == "Staff "} */}
                    {/* {tab.text} */}
                    {/* <i
                      style={{ color: "white" }}
                      class="fa-sharp fa-solid fa-clock"
                    ></i> */}
                  </a>
                </li>
              </>
            );
          })}
        </ul>

        {hasChild ? (
          <div className="childTabs isDesktop">
            <ChildTab childTabs={childTab} active={childName} />{" "}
          </div>
        ) : null}

        <div className="isMobile"></div>
      </div>
    </>
  );
}
