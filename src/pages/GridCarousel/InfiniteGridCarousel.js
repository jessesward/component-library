import gsap from "gsap"
import { arrayToMatrix } from "utils/arraytoMatrix"
import { distanceElemToMouse } from "utils/distanceElemToMouse"
import { normalizeBetweenTwoRanges } from "utils/normalizeBetweenTwoRanges"

/**
 * @description create an infinite scrolling carousel with images that respondes to mouse interactions
 * @param {Object} param0 config for the carousel, element, data, and settings
 * @returns function init to build the carousel
 */
export default function InfiniteGridCarousel({ element, data, settings }) {
  // User adjustable settings
  const config = {
    rows: 3,
    speed: 1,
    speedMultiplier: 3,
    hoverThreshold: window.innerWidth < 800 ? 200 : 400,
    baseOpacity: 0.7,
    baseFilter: 0.6,
    ...settings,
  }

  // Internal State
  const state = {
    columns: null,
    wrapper: null,
    initialTransform: 0,
    autoPlay: true,
    animateLeft: true,
    tickerTime: 0,
    overrideSpeed: false,
    mouse: {},
    allGridItems: null,
  }

  /**
   * Utilities
   */
  const getColumnWidth = () => {
    // This assumes all columns are the same width
    return state.columns[0].offsetWidth
  }

  const getFilter = (strength) => {
    const shadow = {
      x: window.innerWidth < 800 ? "2vw" : "1vw",
      blur: window.innerWidth < 800 ? "3px" : "3px",
    }
    return `drop-shadow(-${shadow.x} 0 ${shadow.blur} rgba(0, 128, 0, ${strength})) drop-shadow(${shadow.x} 0 ${shadow.blur} rgba(82, 14, 255, ${strength}))`
  }

  const checkItemProximity = (item) => {
    const distance = distanceElemToMouse(item, state.mouse.x, state.mouse.y)
    const opacity = normalizeBetweenTwoRanges(
      distance,
      config.hoverThreshold,
      0,
      config.baseOpacity,
      1
    )
    const filter = normalizeBetweenTwoRanges(
      distance,
      0,
      config.hoverThreshold,
      0,
      config.baseFilter
    )
    if (distance < config.hoverThreshold) {
      item.style.opacity = `${opacity}`
      item.style.filter = getFilter(filter)
    } else {
      item.style.opacity = config.baseOpacity
      item.style.filter = getFilter(config.baseFilter)
    }
  }

  /**
   * Events
   */
  const addEvents = () => {
    // element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener("mouseleave", handleMouseLeave)
    element.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleWindowResize)
  }

  // Update the initialTransform so it's responsive.
  const handleWindowResize = () => {
    state.initialTransform = getColumnWidth() * state.columns.length
  }

  // const handleMouseEnter = () => {
  //   state.autoPlay = false
  //   gsap.ticker.remove(animate)
  // }

  const handleMouseLeave = () => {
    state.autoPlay = true
    state.animateLeft = true
    state.overrideSpeed = false
    state.allGridItems.forEach((item) => {
      const image = item.querySelector("img")
      image.style.opacity = config.baseOpacity
      image.style.filter = getFilter(config.baseFilter)
    })
    // gsap.ticker.add(animate)
  }

  const handleMouseMove = (e) => {
    state.mouse.x = e.clientX
    state.mouse.y = e.clientY

    state.allGridItems.forEach((item) => {
      checkItemProximity(item.querySelector("img"))
    })

    if (e.clientX > window.innerWidth / 2) {
      state.animateLeft = true
    } else {
      state.animateLeft = false
    }

    state.overrideSpeed = Math.abs(
      normalizeBetweenTwoRanges(
        e.clientX,
        0,
        window.innerWidth,
        -config.speed * config.speedMultiplier,
        config.speed * config.speedMultiplier
      )
    )
  }

  /**
   * Animation functions
   */
  const animate = () => {
    // this function is passed time, deltaTime, frame, from gsap but I'm not using
    if (state.animateLeft) {
      state.tickerTime += state.overrideSpeed || config.speed
      moveLeft(state.tickerTime)
    } else {
      state.tickerTime -= state.overrideSpeed || config.speed
      moveRight(state.tickerTime)
    }
  }

  const moveLeft = (tickerTime) => {
    if (tickerTime + state.initialTransform >= state.initialTransform * 2) {
      state.tickerTime = 0
    }
    state.wrapper.style.transform = `translateX(-${
      tickerTime + state.initialTransform
    }px)`
  }

  const moveRight = (tickerTime) => {
    if (tickerTime + state.initialTransform <= 0) {
      state.tickerTime = 0
    }
    state.wrapper.style.transform = `translateX(-${
      tickerTime + state.initialTransform
    }px)`
  }

  /**
   * Render functions
   */
  const createColumn = () => {
    const column = document.createElement("div")
    column.classList.add("grid-column")
    return column
  }

  const createRow = (item) => {
    const row = document.createElement("div")
    const image = document.createElement("img")
    image.style.opacity = config.baseOpacity
    image.style.filter = getFilter(config.baseFilter)
    row.classList.add("grid-row")
    image.src = item
    row.appendChild(image)
    return row
  }

  const renderWrapper = () => {
    const matrix = arrayToMatrix(data, config.rows)
    const wrapper = document.createElement("div")
    wrapper.classList.add("grid-wrapper")
    matrix.forEach((column) => {
      const columnElem = createColumn()
      column.forEach((row) => {
        const rowElem = createRow(row)
        columnElem.appendChild(rowElem)
      })
      wrapper.appendChild(columnElem)
    })
    return wrapper
  }

  const renderClones = (columns) => {
    const colArray = Array.from(columns)
    // Add clones to end
    colArray.forEach((column) => {
      const colClone = column.cloneNode(true)
      colClone.classList.add("clone")
      state.wrapper.appendChild(colClone)
    })
    // Add clones to begining
    colArray.reverse().forEach((column) => {
      const colClone = column.cloneNode(true)
      colClone.classList.add("clone")
      state.wrapper.prepend(colClone)
    })
  }

  const init = () => {
    state.wrapper = renderWrapper()
    state.columns = state.wrapper.querySelectorAll(".grid-column")
    renderClones(state.columns)
    element.appendChild(state.wrapper)
    state.initialTransform = getColumnWidth() * state.columns.length
    state.wrapper.style.transform = `translateX(-${state.initialTransform}px)`
    state.allGridItems = element.querySelectorAll(".grid-row")
    addEvents()
    gsap.ticker.add(animate)
  }

  return { init }
}
