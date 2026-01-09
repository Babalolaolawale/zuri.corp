import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import Footer from "./footer";
import Header from "./header";
import pine from "../assets/pinelogo.png";
import findr from "../assets/findrlogo.png";
import { Link } from "react-router";
import { usePreviousUrlContext } from "../context/PreviousUrlContext";

// Animation variants
const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: (custom: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: custom * 0.2,
			duration: 0.6,
			ease: "easeOut",
		},
	}),
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

type Product = {
    logo: string;
    title: string;
    description: string;
    ctaText: string;
    customStyles: string;
};

type ProductCardProps = Product & {
    index: number;
};

// Card component for products
const ProductCard = ({
	logo,
	title,
	description,
	customStyles,
	index,
}: ProductCardProps) => {
	const { isDarkMode } = useThemeContext();

	return (
		<motion.div
			variants={fadeIn}
			custom={index + 1}
			whileHover={{
				scale: 1.02,
				transition: { duration: 0.3 },
			}}
			className={`p-6 sm:p-8 rounded-2xl transition-all duration-500 shadow-xl backdrop-blur-sm hover:shadow-2xl ${customStyles}`}
		>
			<div className="flex items-center gap-4 mb-4">
				<motion.img
					whileHover={{ scale: 1.1 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
					src={logo}
					className="w-10 h-10 sm:w-12 sm:h-12"
					alt={`${title} Logo`}
				/>
				<h3
					className={`text-xl sm:text-2xl font-bold hero-text ${
						title === "Pine"
							? isDarkMode
								? "text-white"
								: "text-gray-900"
							: "text-white"
					}`}
				>
					{title}
				</h3>
			</div>
			<p
				className={`mb-6 hero-font font-light text-sm sm:text-base ${
					title === "Pine"
						? isDarkMode
							? "text-gray-300"
							: "text-gray-600"
						: "text-gray-100"
				}`}
			>
				{description}
			</p>
			<motion.button
				whileHover={{ x: 5 }}
				className={`flex items-center space-x-2 transition-colors duration-300 ${
					title === "Pine"
						? "text-lime-400 hover:text-lime-300"
						: "text-white hover:text-gray-200"
				} group`}
			>
				<span>Go to {title}</span>
				<motion.div
					whileHover={{ x: 4 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
				>
					<ArrowRight className="w-4 h-4" />
				</motion.div>
			</motion.button>
		</motion.div>
	);
};

export default function Products() {
	const { isDarkMode } = useThemeContext();
	const { previousUrl } = usePreviousUrlContext();

	// Product data
	const products = [
		{
			logo: pine,
			title: "Pine",
			description:
				"A digital startup ecosystem built for the remote generation. We bring together ambitious founders, builders, and investors from around the world into one powerful online platform.",
			ctaText: "Go to Pine",
			customStyles: isDarkMode
				? "bg-gray-800/80 hover:bg-gray-800"
				: "bg-white/80 hover:bg-white",
		},
		{
			logo: findr,
			title: "Findr",
			description:
				"A next generation navigation app that redefines urban exploration. Findr offers hyper-localized insights, real time updates and personalized recommendations, transforming the way people navigate cities.",
			ctaText: "Go to Findr",
			customStyles: isDarkMode
				? "bg-blue-600/90 hover:bg-blue-600"
				: "bg-blue-500/90 hover:bg-blue-500",
		},
	];

	return (
		<div
			className={`min-h-screen transition-colors duration-500 ${
				isDarkMode ? "bg-[#0C0C16]/90" : "bg-gray-50"
			}`}
		>
			<Header />

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="container px-4 pt-10 mx-auto sm:px-6"
			>
				<Link to={`${previousUrl}`}>
					<motion.div
						whileHover={{ x: -5 }}
						className={`inline-flex items-center gap-2 ${
							isDarkMode
								? "text-lime-400 hover:text-lime-300"
								: "text-lime-600 hover:text-lime-700"
						} transition-colors duration-300`}
					>
						<ArrowLeft size={16} />
						<span className="z-10 font-medium">Go Back</span>
					</motion.div>
				</Link>
			</motion.div>

			<motion.main
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
				className="container relative z-10 flex flex-col items-center max-w-6xl px-4 pt-4 pb-20 mx-auto sm:px-6 sm:pt-7"
			>
				<motion.div variants={fadeIn} custom={0} className="mb-5 text-center">
					<motion.h1
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeOut" }}
						className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${
							isDarkMode ? "text-white" : "text-gray-800"
						}`}
					>
						Products with Purpose. Ventures with Vision.
					</motion.h1>
					<motion.div
							initial={{ width: 0 }}
							animate={{ width: "150px" }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className={`h-1 mx-auto ${
								isDarkMode ? "bg-lime-500" : "bg-lime-600"
							} rounded-full mb-3`}
					/>

					<motion.div variants={fadeIn} custom={0.5}>
						<p
							className={`hero-text text-left text-base md:text-lg mb-2 max-w-3xl mx-auto ${
								isDarkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Each product we build starts with a bold question and ends with
							purposeful impact. From startup ecosystems to intelligent tools,
							our ventures are designed to solve real problems — beautifully,
							and at scale.
						</p>
					</motion.div>
				</motion.div>

				<motion.div
					variants={staggerContainer}
					className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10"
				>
					{products.map((product, index) => (
						<ProductCard
							key={product.title}
							logo={product.logo}
							title={product.title}
							description={product.description}
							ctaText={product.ctaText}
							customStyles={product.customStyles}
							index={index}
						/>
					))}
				</motion.div>
			</motion.main>
			<Footer />
		</div>
	);
}
