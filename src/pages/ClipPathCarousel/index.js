import * as React from "react"
import { useEffect, useRef } from "react"
import "./clipPathCarousel.scss"
import ClipPathCarousel from "./ClipPathCarousel"

export default function ClipCarousel() {
  const carousel = useRef()
  const carouselElem = useRef()

  useEffect(() => {
    carousel.current = ClipPathCarousel(carouselElem.current)
    carousel.current.init()
    // if (!document.querySelector(".grid-wrapper")) {
    //   carousel.current.init()
    // }
  }, [])
  return (
    <div className="page">
      <div ref={carouselElem} className="hero-slider slider-track">
        <div
          className="
            slide
            absolute-full
            site-padding-x
            flex
            items-end
            desktop:items-center
          "
        >
          {/* <img
            className="absolute-full object-cover"
            :src="item.slideImage.url"
            alt=""
          /> */}
          <div className="slide-content relative">
            <h2 className="slide-title">Slide Title 1</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div
          className="
            slide
            absolute-full
            site-padding-x
            flex
            items-end
            desktop:items-center
          "
        >
          {/* <img
            className="absolute-full object-cover"
            :src="item.slideImage.url"
            alt=""
          /> */}
          <div className="slide-content relative">
            <h2 className="slide-title">Slide Title 1</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div
          className="
            slide
            absolute-full
            site-padding-x
            flex
            items-end
            desktop:items-center
          "
        >
          {/* <img
            className="absolute-full object-cover"
            :src="item.slideImage.url"
            alt=""
          /> */}
          <div className="slide-content relative">
            <h2 className="slide-title">Slide Title 3</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div
          className="
            slide
            absolute-full
            site-padding-x
            flex
            items-end
            desktop:items-center
          "
        >
          {/* <img
            className="absolute-full object-cover"
            :src="item.slideImage.url"
            alt=""
          /> */}
          <div className="slide-content relative">
            <h2 className="slide-title">Slide Title 4</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div
          className="
            slide
            absolute-full
            site-padding-x
            flex
            items-end
            desktop:items-center
          "
        >
          {/* <img
            className="absolute-full object-cover"
            :src="item.slideImage.url"
            alt=""
          /> */}
          <div className="slide-content relative">
            <h2 className="slide-title">Slide Title 5</h2>
            <div className="description">Slide description</div>
          </div>
        </div>
        <div className="slider-dots"></div>
      </div>
    </div>
  )
}
