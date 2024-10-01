import { useState } from "react";
import MapWindow from "../components/MapWindow";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import React from "react";

export default function Home() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <>
      <div style={{maxWidth: '80%', margin: "0 auto"}}>
        <MarkerFilter setFilter={setFilter} />
        <MapWindow filter={filter} />
      </div>
    </>
  );
}
