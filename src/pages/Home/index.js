import * as React from "react"
import { Routes, Route, Link } from "react-router-dom"
import "./home.scss"

function Home() {
  return (
    <div className="home">
      <h1>Library</h1>
      <p>
        Even though this is a React app, the individual components are not React
        specific.
      </p>
      <p>
        For the most part, each component/page is standalone, but they do share
        scripts from the utils directory. The utils directory is also where you
        can find helpful things like functions to calculate the distance between
        two points.
      </p>
      <ul>
        <li>
          <Link to="/infinite-grid-carousel">
            <h2>Infinite Grid Carousel</h2>
          </Link>
          <p>Autoplay, and mouse interactions on hover.</p>
          <p>
            Dependencies: GSAP (but only for the internal clock. could use
            request animation frame instead.)
          </p>
        </li>
        <li>
          <Link to="/clip-path-carousel">
            <h2>Clip Path Carousel</h2>
          </Link>
          <p>Swipe transition between slides using clip path.</p>
          <p>Dependencies: GSAP</p>
        </li>
      </ul>
    </div>
  )
}

export default Home
