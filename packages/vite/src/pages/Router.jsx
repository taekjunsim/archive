import React from "react";
import { Route, Routes } from "react-router-dom";
import Event from "./Event";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Event />} />
    </Routes>
  );
}
