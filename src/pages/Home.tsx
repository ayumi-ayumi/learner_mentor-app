import { useState } from "react";
import MapWindow from "../components/MapWindow";
import MarkerFilter from "../components/MarkerFilter";
import "../styles/Home.scss";
import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function Home() {
  const [filter, setFilter] = useState<string>("all");

  return (
    <>
      <MarkerFilter setFilter={setFilter} /><MapWindow filter={filter} />
    </>
  );
}
