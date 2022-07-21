import React, { lazy, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./register";
import Info from "./info";

export default function RoutesInfo() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
}
