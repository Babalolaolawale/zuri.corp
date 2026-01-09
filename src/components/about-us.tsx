import { motion } from "framer-motion";
import { Code, Users, Globe, Zap, ArrowLeft } from "lucide-react";
import Footer from "./footer";
import { Link } from "react-router";
import Header from "./header";
import { useThemeContext } from "../context/ThemeContext";
import { usePreviousUrlContext } from "../context/PreviousUrlContext";

type FeatureCardProps = {
    icon: React.ComponentType<{ size?: number }>;
    title: string;
    description: string;
    isDarkMode: boolean;
};

// Animation variants
const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

const staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

// Feature component for core values or principles
const FeatureCard = ({ icon: Icon, title, description, isDarkMode }: FeatureCardProps) => (
	<motion.div
		variants={fadeIn}
		whileHover={{ scale: 1.03 }}
		className={`p-6 rounded-xl shadow-lg ${
			isDarkMode
				? "bg-gray-900 bg-opacity-70 hover:bg-gray-800"
				: "bg-white hover:bg-gray-50"
		} transition-all duration-300`}
	>
		<div
			className={`p-3 mb-4 rounded-full inline-flex ${
				isDarkMode ? "bg-gray-800 text-lime-400" : "bg-lime-100 text-lime-700"
			}`}
		>
			<Icon size={24} />
		</div>
		<h3
			className={`text-xl font-semibold mb-3 ${
				isDarkMode ? "text-white" : "text-gray-800"
			}`}
		>
			{title}
		</h3>
		<p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
			{description}
		</p>
	</motion.div>
);

export default function AboutUs() {
	const { isDarkMode } = useThemeContext();
	const { previousUrl } = usePreviousUrlContext();

	// Core values/principles data
	const features = [
    {
        icon: Code as React.ComponentType<{ size?: number }>,
        title: "Meaningful Innovation",
        description:
            "We build things that are meaningful, beautiful, and useful. Every product we create is designed to move the world forward.",
    },
    {
        icon: Users as React.ComponentType<{ size?: number }>,
        title: "Independent Leadership",
        description:
            "Each venture is independently led by the best minds we can find, giving them the freedom to operate with clarity and purpose.",
    },
    {
        icon: Globe as React.ComponentType<{ size?: number }>,
        title: "Bold Exploration",
        description:
            "We explore industries where we can make a meaningful difference, bringing the zuri.corp philosophy to bold new spaces.",
    },
    {
        icon: Zap as React.ComponentType<{ size?: number }>,
        title: "Lasting Impact",
        description:
            "This isn't just about business. It's about making things that last and solving real problems that impact people's lives.",
    },
];

	return (
		<div>
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
					className="container relative z-10 max-w-5xl px-4 pt-6 pb-20 mx-auto sm:px-6 md:px-8 lg:px-12"
				>
					<motion.div variants={fadeIn} className="mb-6 text-center">
						<h1
							className={`text-4xl md:text-5xl font-bold mb-2 ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}
						>
							About Us
						</h1>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "120px" }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className={`h-1 mx-auto ${
								isDarkMode ? "bg-lime-500" : "bg-lime-600"
							} rounded-full mb-2`}
						/>
					</motion.div>

					<motion.div variants={fadeIn} className="max-w-3xl mx-auto mb-8">
						<div
							className={`prose lg:prose-lg ${
								isDarkMode
									? "text-gray-300 prose-headings:text-white"
									: "text-gray-700 prose-headings:text-gray-900"
							} mx-auto`}
						>
							<p className="mb-2 text-lg leading-relaxed md:text-xl">
								When we started zuri.corp, we weren't interested in chasing
								trends — we were interested in solving{" "}
								<span className="font-semibold">real problems</span>. Problems
								that impact people. Problems that matter.
							</p>

							<p className="mb-2 text-lg leading-relaxed md:text-xl">
								From the beginning, we've been guided by a simple principle:
								build things that are meaningful, beautiful, and useful. Things
								that move the world forward.
							</p>

							<p className="mb-2 text-lg leading-relaxed md:text-xl">
								zuri.corp is a growing collective of companies, each
								independently led by the best minds we can find. Right now,
								we're focused on building our core software ventures:{" "}
								<span
									className={`font-semibold ${
										isDarkMode ? "text-lime-400" : "text-lime-700"
									}`}
								>
									Pine and Findr
								</span>
								. But this is just the beginning.
							</p>

							<p className="mb-2 text-lg leading-relaxed md:text-xl">
								In the future, we'll explore other industries where we believe
								we can make a meaningful difference — bringing the zuri.corp
								philosophy to bold new spaces. Some ideas might seem
								unconventional or even risky at first — and that's exactly the
								point. The future doesn't come from playing it safe. It comes
								from asking,{" "}
								<span className="italic">"What if there's a better way?"</span>{" "}
								and having the courage to build toward it.
							</p>

							<p className="mb-2 text-lg leading-relaxed md:text-xl">
								By structuring our ventures independently, we give each one the
								freedom to operate with clarity and purpose. Our role is to
								empower them — not control them. That's why we give each venture
								the space to build its own identity while holding ourselves to
								the same high standard: transparency, intention, and impact.
							</p>

							<p className="mt-2 mb-2 text-xl font-semibold text-left md:text-2xl">
								This isn't just about business. It's about making things that
								last.
							</p>

							<p className="text-lg text-left md:text-xl">
								We're here to build what matters — and we're just getting
								started.
							</p>
						</div>
					</motion.div>

					<motion.div variants={fadeIn} className="mb-4">
						<motion.div variants={fadeIn} className="mb-8 text-center">
						<h3
							className={`text-4xl md:text-5xl font-bold mb-2 ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}
						>
							Our Core Principles
						</h3>
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: "120px" }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className={`h-1 mx-auto ${
								isDarkMode ? "bg-lime-500" : "bg-lime-600"
							} rounded-full mb-2`}
						/>
					</motion.div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							{features.map((feature, index) => (
								<FeatureCard
									key={index}
									icon={feature.icon}
									title={feature.title}
									description={feature.description}
									isDarkMode={isDarkMode}
								/>
							))}
						</div>
					</motion.div>
				</motion.main>
				<Footer />
			</div>
		</div>
	);
}
