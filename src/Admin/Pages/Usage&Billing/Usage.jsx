import React from "react";
import PageHeading from "../../Componants/PageHeading";
import Stats from "./Componants/Stats";
import { Outlet } from "react-router";
import Nav from "./Componants/Nav";
import Button from "../../Componants/Button";

export default function Usage() {
  return (
    <div >
      <div className="flex justify-between lg:pr-8">
        <PageHeading
          heading={"Usage & Billing"}
          subheading={"Track token usage and manage costs"}
        ></PageHeading>
        <Button button={"Export Report"}></Button>
      </div>

      <div>
        <Stats></Stats>
        <div className="my-8">
          <Nav></Nav>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
