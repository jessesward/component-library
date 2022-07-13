import * as React from "react"
import { useEffect, useRef } from "react"
import "./clipPathCarousel.scss"
import ClipPathCarousel from "./ClipPathCarousel"

export default function ClipCarousel() {
  const carousel = useRef()
  const carouselElem = useRef()

  useEffect(() => {
    carousel.current = ClipPathCarousel(carouselElem.current)
    if (!document.querySelector(".slide-dot")) {
      carousel.current.init()
    }
  }, [])

  return (
    <div className="page">
      <div ref={carouselElem} className="hero-slider slider-track">
        <div className="slide absolute-full">
          <img
            className="absolute-full object-cover"
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="slide-content">
            <h2 className="slide-title">Slide Title 1</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slide absolute-full">
          <img
            className="absolute-full object-cover"
            src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
            alt=""
          />
          <div className="slide-content">
            <h2 className="slide-title">Slide Title 1</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slide absolute-full">
          <img
            className="absolute-full object-cover"
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="slide-content">
            <h2 className="slide-title">Slide Title 3</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slide absolute-full">
          <img
            className="absolute-full object-cover"
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="slide-content">
            <h2 className="slide-title">Slide Title 4</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slide absolute-full">
          <img
            className="absolute-full object-cover"
            src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <div className="slide-content">
            <h2 className="slide-title">Slide Title 5</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slider-dots"></div>
      </div>
    </div>
  )
}
