"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import sign from "../assets/signature.png";
import sign2 from "../assets/signature2.png";
import pine from "../assets/pinelogo.png";
import findr from "../assets/findrlogo.png";
import MorphingText from "./eldoraui/morphingtext";
import Footer from "./footer";
import Header from "./header";
import { useThemeContext } from "../context/ThemeContext";

function Home() {
  const { isDarkMode } = useThemeContext()
  // const [showMore, setShowMore] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    products: false,
    cards: false,
  })

  // Animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section")
      const productsSection = document.getElementById("products-section")
      const cardsSection = document.getElementById("cards-section")

      if (heroSection && isElementInViewport(heroSection)) {
        setIsVisible((prev) => ({ ...prev, hero: true }))
      }
      if (productsSection && isElementInViewport(productsSection)) {
        setIsVisible((prev) => ({ ...prev, products: true }))
      }
      if (cardsSection && isElementInViewport(cardsSection)) {
        setIsVisible((prev) => ({ ...prev, cards: true }))
      }
    }

    function isElementInViewport(el: HTMLElement) {
      const rect = el.getBoundingClientRect()
      return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    }

    // Initial check on mount
    setTimeout(() => {
      handleScroll()
    }, 300)

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? "bg-[#0C0C16]/90" : "bg-white"}`}>
      <Header />

      <main className="container relative z-10 px-4 pt-16 pb-12 mx-auto sm:px-6">
        <div
          id="hero-section"
          className={`flex flex-col text-left max-w-4xl transition-all duration-1000 transform ${
            isVisible.hero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1
            className={`hero-font text-3xl md:text-4xl lg:text-5xl font-bold mb-2 mt-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            The Future of Innovation
          </h1>
          <div className="flex w-full mb-2">
            <MorphingText
              className={`ml-0 hero-font text-3xl md:text-4xl lg:text-5xl font-bold text-left ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              texts={["Engineered.", "ENVISIONED.", "BUILT DIFFERENT.", "CRAFTED WITH PURPOSE.", "MADE FOR IMPACT."]}
            />
          </div>
          <p className={`font-inter text-base md:text-lg mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            At zuri.corp, we aspire to establish a new paradigm for innovation — one where meaningful ideas are
            nurtured, and bold solutions take root. Our core objective is to tackle pressing problems with depth and
            clarity, designing comprehensive solutions that reflect the real-world complexities of the environments we
            serve.
          </p>
          <p className={`font-inter text-base md:text-lg mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
            While crafting compelling experiences, zuri.corp serves as the launchpad for mission-driven startups built
            to make a lasting impact across the African continent and beyond.
          </p>
          <div className="flex">
            <img
              src={isDarkMode ? sign : sign2}
              alt="Signature"
              className="w-[200px] sm:w-[250px] py-2 transition-all duration-300"
            />
          </div>
        </div>

        <div id="products-section" className="py-2 sm:py-5">
          <div
            className={`building-section text-left px-3 py-6 sm:py-10 transition-all duration-1000 transform ${
              isVisible.products ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <h2
              className={`text-left hero-text text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Here's what we are building
            </h2>
          </div>

          <div id="cards-section" className="grid grid-cols-1 gap-6 m-3 sm:m-5 md:grid-cols-2 sm:gap-8">
            <div
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 transform ${
                isVisible.cards ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              } ${
                isDarkMode ? "bg-gray-800/80 hover:bg-gray-800" : "bg-white/80 hover:bg-white"
              } shadow-xl backdrop-blur-sm hover:shadow-2xl`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={pine || "/placeholder.svg"}
                  className="w-10 h-10 transition-transform duration-300 sm:w-12 sm:h-12 hover:scale-110"
                  alt="Pine Logo"
                />
                <h3
                  className={`text-xl sm:text-2xl font-bold hero-text ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Pine
                </h3>
              </div>
              <p
                className={`mb-6 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                } hero-font font-light text-sm sm:text-base`}
              >
                A digital startup ecosystem built for the remote generation. We bring together ambitious founders,
                builders, and investors from around the world into one powerful online platform.
              </p>
              <button className="flex items-center space-x-2 transition-colors duration-300 text-lime-400 hover:text-lime-300 group">
                <span>Go to Pine</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
              </button>
            </div>

            <div
              className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 transform ${
                isVisible.cards ? "translate-y-0 opacity-100 delay-100" : "translate-y-10 opacity-0"
              } ${
                isDarkMode ? "bg-blue-600/90 hover:bg-blue-600" : "bg-blue-500/90 hover:bg-blue-500"
              } shadow-xl backdrop-blur-sm hover:shadow-2xl`}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={findr || "/placeholder.svg"}
                  className="w-10 h-10 transition-transform duration-300 sm:w-12 sm:h-12 hover:scale-110"
                  alt="Findr Logo"
                />
                <h3 className="text-xl font-bold text-white sm:text-2xl hero-text">Findr</h3>
              </div>
              <p className="mb-6 text-sm font-light text-gray-100 hero-font sm:text-base">
                A next generation navigation app that redefines urban exploration. Findr offers hyper-localized
                insights, real time updates and personalized recommendations, transforming the way people navigate
                cities.
              </p>
              <button className="flex items-center space-x-2 text-white transition-colors duration-300 hover:text-gray-200 group">
                <span>Go to Findr</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
