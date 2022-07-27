import React, { lazy, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register";
import Info from "./info";
import Details from "./empDetail";

export default function RoutesInfo() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/info" element={<Info />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}
