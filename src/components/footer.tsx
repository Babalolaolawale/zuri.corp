import { Link } from "react-router"
import logo from "../assets/logo.png"
import { useThemeContext } from "../context/ThemeContext"

export default function Footer() {
  const { isDarkMode } = useThemeContext()

  return (
    <footer className={`py-5 text-white ${isDarkMode ? "bg-gray-800" : "bg-gray-900"} rounded-xl`}>
      <div className="container mx-auto space-y-3">
        <div className="grid items-center justify-between grid-cols-1 gap-8 md:grid-row-1">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
              <img src={logo || "/placeholder.svg"} alt="Zuri logo" className="relative w-40 hover:scale-105" />
              <div className="flex flex-col items-center gap-4 md:flex-row">
                <Link
                  to="/about-us"
                  className="z-10 text-gray-400 transition-colors duration-300 cursor-pointer hover:text-white min-w-fit"
                >
                  About
                </Link>
                <Link
                  to="/careers"
                  className="z-10 text-gray-400 transition-colors duration-300 cursor-pointer hover:text-white min-w-fit"
                >
                  Careers
                </Link>
                <Link
                  to="/products"
                  className="z-10 text-gray-400 transition-colors duration-300 cursor-pointer hover:text-white min-w-fit"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
          {/* Might include this in the future */}
          {/* <div className="z-10 flex flex-col items-center justify-center gap-4 p-3 sm:flex-row md:justify-end">
						<input
							type="email"
							placeholder="Enter email address"
							className="w-full px-4 py-2 text-gray-800 bg-white rounded-lg sm:w-64 focus:outline-none"
						/>
						<button className="w-full px-6 py-2 text-gray-900 transition-colors duration-300 rounded-lg bg-lime-400 hover:bg-lime-300 sm:w-auto">
							Subscribe
						</button>
					</div> */}
        </div>
        <div className="w-full text-center text-gray-600 font-size-10px">
          <p>copyright &copy; {new Date().getFullYear()} zuri.corp</p>
        </div>
      </div>
    </footer>
  )
}
