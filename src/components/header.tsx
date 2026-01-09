"use client";

import { Moon, Sun } from "lucide-react";
import { ScrollProgress } from "./eldoraui/scrollprogress";
import logo from "../assets/logo.png";
import { useThemeContext } from "../context/ThemeContext";
import { Link } from "react-router";

export default function Header() {
	const { isDarkMode, setIsDarkMode } = useThemeContext();

	return (
		<div>
			<ScrollProgress className={isDarkMode ? "bg-gray-50" : "bg-[#0C0C16]/90"} />

			{/* Navigation */}
			<nav
				className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] max-w-xl w-[90vw] sm:w-[550px] px-2 sm:px-6 ${
					isDarkMode ? "bg-[#0C0C16]/90" : "bg-white/80"
				} backdrop-blur-sm border border-white/10 rounded-2xl py-3 md:py-2 shadow-lg`}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Link to="/">
							<img
								src={logo || "/placeholder.svg"}
								alt="Zuri logo"
								className="h-8 transition-transform duration-300 w-30 hover:scale-105"
							/>
						</Link>
					</div>

					<div className="items-center hidden space-x-4 md:block">
						<Link
							to="/about-us"
							className={`text-sm transition-colors duration-300 ${
								isDarkMode
									? "text-gray-200 hover:text-gray-100"
									: "text-gray-800 hover:text-gray-700"
							}`}
						>
							About
						</Link>
						<Link
							to="/careers"
							className={`text-sm transition-colors duration-300 ${
								isDarkMode
									? "text-gray-200 hover:text-gray-100"
									: "text-gray-800 hover:text-gray-700"
							}`}
						>
							Careers
						</Link>
						<Link
							to="/products"
							className={`text-sm transition-colors duration-300 ${
								isDarkMode
									? "text-gray-200 hover:text-gray-100"
									: "text-gray-800 hover:text-gray-700"
							}`}
						>
							Product
						</Link>
					</div>

					<button
						onClick={() => setIsDarkMode(!isDarkMode)}
						className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
							isDarkMode
								? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
								: "bg-gray-100 text-gray-600 hover:bg-gray-200"
						}`}
						aria-label={
							isDarkMode ? "Switch to light mode" : "Switch to dark mode"
						}
					>
						{isDarkMode ? (
							<Sun className="w-6 h-6" />
						) : (
							<Moon className="w-5 h-5" />
						)}
					</button>
				</div>
			</nav>
		</div>
	);
}
