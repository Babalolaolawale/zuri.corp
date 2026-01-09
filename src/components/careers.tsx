import { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import Header from "./header";
import Footer from "./footer";
import { ArrowDown, ArrowLeft, ArrowUp, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { usePreviousUrlContext } from "../context/PreviousUrlContext";

// Job posting data - separated for cleaner component
const jobPostings = [
	{
		id: "eng",
		title: "Full-Stack Engineer",
		location: "Remote, Anywhere in the world",
		description:
			"We're looking for a hands-on, product-minded Full-Stack Engineer to help us build and launch our first ventures. You'll be working at Pine or Findr — owning the stack, shipping fast, and shaping the foundation of zuri.corp's technical vision.",
		requirements: [
			"You've built and deployed production-quality web and mobile applications from end to end",
			"You blend excellent engineering with a deep understanding of both front-end design and back-end architecture",
			"You have a propensity for creative problem-solving and can architect elegant solutions to complex challenges.",
		],
	},
	{
		id: "prod",
		title: "Product Designer",
		location: "Remote, Anywhere in the world",
		description:
			"Design is at the core of how we build. As a product designer, you'll define the look, feel, and flow of our digital products. We're building tools for people — and we need someone who designs with empathy, clarity, and purpose.",
		requirements: [
			"You've built beautiful, intuitive products that users love",
			"You blend excellent design thinking with a deep understanding of user psychology and behavior",
			"You have a strong portfolio showcasing your ability to solve complex design challenges",
			"You have a knack for creating powerful interfaces without compromising their elegance and simplicity",
		],
	},
	{
		id: "found",
		title: "Founder in Residence",
		location: "Remote, Anywhere in the world",
		description:
			"As a Founder in Residence, you won't just work on ideas. You'll help create the next ones that matter. We're looking for bold, hungry builders ready to go deep on a meaningful problem, test ideas fast, and potentially co-found a company from the ground up. Whether you already have an idea you can't shake or want to explore one with us, this role is a launchpad for your next venture.",
		requirements: [
			"You've identified meaningful problems and have bold ideas for solving them",
			"You blend entrepreneurial vision with practical execution skills to bring concepts to life",
			"You have experience building and leading teams toward ambitious goals",
		],
	},
	{
		id: "comm",
		title: "Growth & Community Lead",
		location: "Remote, Anywhere in the world",
		description:
			"zuri.corp is building in public — and we need someone to tell our story, grow our audience, and activate our community. You'll be the bridge between our products and the people who use them.",
		requirements: [
			"You've built and nurtured engaged communities around products or ideas",
			"You blend strategic community planning with authentic relationship building",
			"You have experience creating spaces where members feel valued and heard",
		],
	},
];

type Job = {
    id: string;
    title: string;
    location: string;
    description: string;
    requirements: string[];
};

type JobCardProps = {
    job: Job;
    isOpen: boolean;
    toggleOpen: () => void;
};

// Reusable JobCard component for each job posting
const JobCard = ({ job, isOpen, toggleOpen }: JobCardProps) => {
	const { isDarkMode } = useThemeContext();

	return (
		<motion.div
			className={`w-full rounded-lg mb-6 ${
				isDarkMode ? "bg-gray-900" : "bg-white"
			} shadow-lg transition-all duration-300 hover:shadow-xl`}
			whileHover={{ scale: 1.01 }}
			layout
		>
			<div
				onClick={toggleOpen}
				className={`p-5 flex justify-between items-center cursor-pointer ${
					isOpen ? "border-b border-gray-200 dark:border-gray-700" : ""
				}`}
			>
				<h3
					className={`text-xl font-semibold ${
						isDarkMode ? "text-white" : "text-gray-800"
					}`}
				>
					{job.title}
				</h3>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.95 }}
					className={`flex items-center justify-center w-8 h-8 rounded-full ${
						isDarkMode
							? "text-lime-400 hover:bg-gray-800"
							: "text-lime-600 hover:bg-gray-100"
					}`}
				>
					{isOpen ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
				</motion.button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
						className="overflow-hidden"
					>
						<div
							className={`p-5 ${
								isDarkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							<p className="mb-4 text-sm font-medium">
								<span className="text-lime-500">zuri.corp.</span> {job.location}
							</p>

							<h4 className="mb-2 font-semibold">Role</h4>
							<p className="mb-6">{job.description}</p>

							<h4 className="mb-2 font-semibold">
								You might be a good fit if…
							</h4>
							<ul className="pl-5 mb-6 space-y-2 list-disc">
								{job.requirements.map((req, index) => (
									<li key={index}>{req}</li>
								))}
							</ul>

							<div className="p-4 mb-4 border rounded-lg bg-opacity-10 border-opacity-20 border-lime-500 bg-lime-500">
								<h4 className="mb-2 font-semibold">Applying</h4>
								<p className="mb-2">
									To apply, please email your resume and a short note on the
									most interesting thing you've worked on:
								</p>
								<a
									href="mailto:hiring@zuri.corp"
									className={`inline-flex items-center font-medium ${
										isDarkMode ? "text-lime-400" : "text-lime-600"
									} hover:underline`}
								>
									hiring@zuri.corp <ExternalLink size={16} className="ml-1" />
								</a>
								<p className="mt-3">
									If we think you might be a good match, we'll contact you to
									arrange 2-3 brief technical interviews. The process concludes
									with a remote session where you'll complete a small project,
									exchange ideas, and get to know our team members—all conducted
									virtually.
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default function Careers() {
	const { isDarkMode } = useThemeContext();
	const { previousUrl } = usePreviousUrlContext();
	const [openJobId, setOpenJobId] = useState<string | null>(null);

	const toggleJob = (jobId: string) => {
		setOpenJobId(openJobId === jobId ? null : jobId);
	};

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
				className="container px-4 pt-12 mx-auto sm:px-6"
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
				className="container relative z-10 max-w-4xl px-4 py-2 mx-auto sm:px-6 lg:px-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<motion.div
					className="text-center mb-7"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2, duration: 0.5 }}
				>
					<h1
						className={`text-4xl md:text-5xl font-bold mb-2 ${
							isDarkMode ? "text-white" : "text-gray-900"
						}`}
					>
						Careers
					</h1>
					<motion.div
							initial={{ width: 0 }}
							animate={{ width: "120px" }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className={`h-1 mx-auto ${
								isDarkMode ? "bg-lime-500" : "bg-lime-600"
							} rounded-full mb-4`}
						/>
					<p
						className={`text-left text-lg md:text-xl max-w-2xl mx-auto ${
							isDarkMode ? "text-gray-300" : "text-gray-700"
						}`}
					>
						We work with thinkers, builders, and operators who want to craft
						lasting impact, not just ship features. If that's you, we'd love to
						meet you.
					</p>
				</motion.div>

				<motion.div
					className="space-y-2"
					variants={{
						hidden: { opacity: 0 },
						show: {
							opacity: 1,
							transition: {
								staggerChildren: 0.15,
							},
						},
					}}
					initial="hidden"
					animate="show"
				>
					{jobPostings.map((job) => (
						<motion.div
							key={job.id}
							variants={{
								hidden: { opacity: 0, y: 20 },
								show: { opacity: 1, y: 0 },
							}}
						>
							<JobCard
								job={job}
								isOpen={openJobId === job.id}
								toggleOpen={() => toggleJob(job.id)}
							/>
						</motion.div>
					))}
				</motion.div>
			</motion.main>
			<Footer />
		</div>
	);
}
