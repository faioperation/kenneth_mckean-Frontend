import React from "react";
import Diagram from "./Diagram";
import PlanPurchase from "./PlanPurchase";

export default function APIrequests() {
  return (
    <div>
      <div className="my-4  lg:mx-8">
        <Diagram></Diagram>
      </div>
     <div className=" lg:mx-8">
         <PlanPurchase></PlanPurchase>
     </div>
    </div>
  );
}
