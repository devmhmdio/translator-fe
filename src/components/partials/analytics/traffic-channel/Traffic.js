import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown, DropdownItem } from "reactstrap";
import { DataTableHead, DataTableRow } from "../../../Component";

const TrafficChannel = () => {
  const [dd, setdd] = useState("30");

  return (
    <React.Fragment>
      <div className="card-inner mb-n2">
        <div className="card-title-group">
          <div className="card-title card-title-sm">
            <h6 className="title">Traffic Channel</h6>
            <p>Top traffic channels metrics.</p>
          </div>
          <div className="card-tools">
            <UncontrolledDropdown>
              <DropdownToggle className="dropdown-toggle dropdown-indicator btn btn-sm btn-outline-light btn-white">
                {dd} Days
              </DropdownToggle>
              <DropdownMenu end className="dropdown-menu-xs">
                <ul className="link-list-opt no-bdr">
                  <li className={dd === "7" ? "active" : ""}>
                    <DropdownItem
                      href="#dropdownitem"
                      onClick={(e) => {
                        e.preventDefault();
                        setdd("7");
                      }}
                    >
                      <span>7 Days</span>
                    </DropdownItem>
                  </li>
                  <li className={dd === "15" ? "active" : ""}>
                    <DropdownItem
                      href="#dropdownitem"
                      onClick={(e) => {
                        e.preventDefault();
                        setdd("15");
                      }}
                    >
                      <span>15 Days</span>
                    </DropdownItem>
                  </li>
                  <li className={dd === "30" ? "active" : ""}>
                    <DropdownItem
                      href="#dropdownitem"
                      onClick={(e) => {
                        e.preventDefault();
                        setdd("30");
                      }}
                    >
                      <span>30 Days</span>
                    </DropdownItem>
                  </li>
                </ul>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </div>
      <div className="nk-tb-list is-loose traffic-channel-table">
        <DataTableHead>
          <DataTableRow className="nk-tb-channel">
            <span>Channel</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-sessions">
            <span>Sessions</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-prev-sessions">
            <span>Prev Sessions</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-change">
            <span>Change</span>
          </DataTableRow>
          <DataTableRow className="nk-tb-trend tb-col-sm text-end">
            <span>Trend</span>
          </DataTableRow>
        </DataTableHead>
      </div>
    </React.Fragment>
  );
};
export default TrafficChannel;
