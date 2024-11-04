import React from "react";
import { useState } from "react";
import MapWindow from "../components/Home/MapWindow";
import MarkerFilter from "../components/Home/MarkerFilter";
import "../styles/Home.scss";

export default function Home() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <>
      <div className="main_container">
        <MarkerFilter setFilter={setFilter} />
        <MapWindow filter={filter} />
      </div>
    </>
  );
}
