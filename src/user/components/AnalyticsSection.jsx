import { useState } from "react";

export default function AnalyticsSection() {
  const [regionView, setRegionView] = useState("List");
  const [deviceView, setDeviceView] = useState("Browser");

  const mostViewed = [{ page: "#destinations", visitors: 2 }];

  const references = [{ referrer: "ALGORIDOM", visitors: 2 }];

  const regions = [{ location: "In Bangladesh", visitors: 2 }];

  const devices = {
    Browser: [{ name: "Chrome", visitors: 2 }],
    OS: [{ name: "Windows", visitors: 2 }],
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Most Viewed */}
        <Card title="Most Viewed Page">
          <TableHeader left="Page" right="Visitors" />
          {mostViewed.map((item, index) => (
            <Row key={index} left={item.page} right={item.visitors} />
          ))}
        </Card>

        {/* Reference */}
        <Card title="Reference">
          <TableHeader left="REFERRER" right="Visitors" />
          {references.map((item, index) => (
            <Row key={index} left={item.referrer} right={item.visitors} />
          ))}
        </Card>

        {/* Regions */}
        <Card
          title="Regions"
          toggle={
            <Toggle
              options={["List", "Map"]}
              active={regionView}
              setActive={setRegionView}
            />
          }
        >
          <TableHeader left="Login" right="Visitors" />
          {regions.map((item, index) => (
            <Row key={index} left={item.location} right={item.visitors} />
          ))}
        </Card>

        {/* Device */}
        <Card
          title="Device"
          toggle={
            <Toggle
              options={["Browser", "OS"]}
              active={deviceView}
              setActive={setDeviceView}
            />
          }
        >
          <TableHeader left="Visitors" right="Visitors" />
          {devices[deviceView].map((item, index) => (
            <Row key={index} left={item.name} right={item.visitors} />
          ))}
        </Card>
      </div>
    </>
  );
}

/* ---------- Reusable Components ---------- */

function Card({ title, toggle, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-700 font-medium text-sm sm:text-base">
          {title}
        </h2>
        {toggle}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function TableHeader({ left, right }) {
  return (
    <div className="flex justify-between text-gray-500 text-xs sm:text-sm mb-2">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-lg px-3 py-2 text-sm sm:text-base">
      <span className="text-gray-700 break-words">{left}</span>
      <span className="text-gray-700 font-medium">{right}</span>
    </div>
  );
}

function Toggle({ options, active, setActive }) {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1 text-xs sm:text-sm">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setActive(option)}
          className={`px-3 py-1 rounded-md transition ${
            active === option
              ? "bg-white shadow text-gray-800"
              : "text-gray-500"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
