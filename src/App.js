import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import "./App.css"
import GridCarousel from "pages/GridCarousel"
import ClipCarousel from "pages/ClipPathCarousel"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-grid-carousel" element={<GridCarousel />} />
        <Route path="/clip-path-carousel" element={<ClipCarousel />} />
      </Routes>
    </div>
  )
}

export default App
