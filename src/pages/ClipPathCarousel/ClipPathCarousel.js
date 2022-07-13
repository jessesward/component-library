/* eslint-disable */
import gsap from "gsap"

export default function ClipPathCarousel(element) {
  const config = {
    carousel: element,
    slides: Array.from(element.querySelectorAll(".slide")),
    slideDotsContainer: element.querySelector(".slider-dots"),
    slideDots: [],
    currentSlide: 0,
    isSliding: false,
    slideDuration: 0.5,
    autoPlay: 7000,
    interval: null,
    get currentSlideElement() {
      return config.slides[this.currentSlide]
    },
  }

  const setUpEventListeners = () => {
    config.slideDotsContainer.addEventListener("mouseover", pauseAutoplay)
    config.slideDotsContainer.addEventListener("mouseout", () => {
      playAutoplay()
      dotCountdown(config.currentSlide)
    })
    config.slideDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        slideTo(index)
        resetDotCountdowns()
        dotCountdown(index)
      })
    })
    document.addEventListener("keydown", handleKeyDown)
  }

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") slideTo(config.currentSlide + 1)
    if (e.key === "ArrowLeft") slideTo(config.currentSlide - 1)
  }

  const destroy = () => {
    config.slideDotsContainer.removeEventListener("mouseover", pauseAutoplay)
    config.slideDotsContainer.removeEventListener("mouseout", playAutoplay)
    document.removeEventListener("keydown", handleKeyDown)
  }

  const pauseAutoplay = () => {
    if (!config.autoPlay) return
    clearInterval(config.interval)
    resetDotCountdowns()
  }
  const resetDotCountdowns = () => {
    gsap.killTweensOf("circle")
    gsap.set(config.slideDotsContainer.querySelectorAll("circle"), {
      strokeDashoffset: "48px",
    })
  }

  const dotCountdown = (index) => {
    resetDotCountdowns()
    gsap.to(config.slideDots[index].querySelector("circle"), {
      strokeDashoffset: 96,
      duration: config.autoPlay / 1000 - 0.29,
      autoRound: false,
      ease: "none",
      onComplete: () => {
        gsap.set(config.slideDots[index].querySelector("circle"), {
          strokeDashoffset: "48px",
        })
      },
    })
  }

  const slideUp = (index) => {
    const clipPath = {
      top: 100,
      bottom: 120,
    }
    const nextSlideElement = config.slides[index]
    config.currentSlideElement.style.zIndex = 2
    nextSlideElement.style.zIndex = 1
    gsap.fromTo(
      config.slides[config.currentSlide].querySelector(".slide-content"),
      {
        xPercent: 0,
        opacity: 1,
      },
      {
        xPercent: -10,
        opacity: 0,
        duration: 0.5,
      }
    )
    gsap.to(clipPath, {
      top: 0,
      bottom: 0,
      duration: config.slideDuration,
      onUpdate: () => {
        config.currentSlideElement.style.clipPath = `polygon(0 0, ${clipPath.top}% 0, ${clipPath.bottom}% 100%, 0% 100%)`
      },
      onComplete: () => {
        config.currentSlideElement.style.clipPath = `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`
        config.currentSlideElement.style.zIndex = 0
        onSlideComplete(index)
      },
    })
    gsap.fromTo(
      config.slides[config.currentSlide + 1].querySelector(".slide-content"),
      {
        xPercent: 10,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
      }
    )
  }

  const slideDown = (index) => {
    const clipPath = {
      top: -20,
      bottom: 0,
    }
    const nextSlideElement = config.slides[index]
    nextSlideElement.style.clipPath = "polygon(0 0, 0% 0, 0% 100%, 0% 100%)"
    config.currentSlideElement.style.zIndex = 1
    nextSlideElement.style.zIndex = 2
    gsap.fromTo(
      config.currentSlideElement.querySelector(".slide-content"),
      {
        xPercent: 0,
        opacity: 1,
      },
      {
        xPercent: 10,
        opacity: 0,
        duration: 0.5,
      }
    )
    gsap.to(clipPath, {
      top: 100,
      bottom: 100,
      duration: config.slideDuration,
      onUpdate: () => {
        nextSlideElement.style.clipPath = `polygon(0 0, ${clipPath.top}% 0, ${clipPath.bottom}% 100%, 0% 100%)`
      },
      onComplete: () => {
        config.currentSlideElement.style.zIndex = 0
        nextSlideElement.style.zIndex = 1
        onSlideComplete(index)
      },
    })
    gsap.fromTo(
      nextSlideElement.querySelector(".slide-content"),
      {
        xPercent: -10,
        opacity: 0,
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
      }
    )
  }

  const onSlideComplete = (slideToIndex) => {
    config.currentSlide = slideToIndex
    dotCountdown(slideToIndex)
    config.isSliding = false
    config.slideDots.forEach((dot, i) => {
      if (i === slideToIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  const slideTo = (index) => {
    if (index >= config.slides.length || index < 0) return
    if (config.isSliding || index === config.currentSlide) return

    config.isSliding = true

    if (index > config.currentSlide) {
      // slide up
      slideUp(index)
    }
    if (index < config.currentSlide) {
      // slide down
      slideDown(index)
    }
  }

  const createSlideDots = () => {
    config.slides.forEach(() => {
      const dot = document.createElement("button")
      const dotInner = `
      <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="absolute-full"
      >
      <circle r="7.5" transform="matrix(-1 0 0 1 8 8)" stroke="white" />
      </svg>
      
      <div class="slide-dot-inner"><span></span></div>
      `
      dot.classList.add("slide-dot")
      dot.innerHTML = dotInner
      config.slideDots.push(dot)
      config.slideDotsContainer.appendChild(dot)
    })
  }

  const playAutoplay = () => {
    if (!config.autoPlay) return
    config.interval = setInterval(() => {
      const slideToIndex =
        config.currentSlide === config.slides.length - 1
          ? 0
          : config.currentSlide + 1

      slideTo(slideToIndex)
    }, config.autoPlay)
  }

  const init = () => {
    config.slides[config.currentSlide].style.zIndex = 1
    createSlideDots()
    config.slideDots[0].classList.add("active")
    setUpEventListeners()
    if (config.autoPlay) {
      playAutoplay()
      dotCountdown(config.currentSlide)
    }
  }

  return { init, slideTo, config, destroy }
}
