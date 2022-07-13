import * as React from "react"
import { useEffect, useRef } from "react"
import "./gridCarousel.scss"
import InfiniteGridCarousel from "./InfiniteGridCarousel"
const path = require.context("./logos/", false, /\.png$/)
const logoImages = path.keys().map(path)

export default function GridCarousel() {
  const carousel = useRef()
  const carouselElem = useRef()
  useEffect(() => {
    carousel.current = InfiniteGridCarousel({
      element: carouselElem.current,
      data: logoImages,
    })
    if (!document.querySelector(".grid-wrapper")) {
      carousel.current.init()
    }
  }, [])
  return (
    <div className="page">
      <div className="logo-grid-carousel">
        <div ref={carouselElem} className="carousel"></div>
      </div>
    </div>
  )
}
