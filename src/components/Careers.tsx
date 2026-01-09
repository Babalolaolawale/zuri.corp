"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router";

const roles = [
    { title: "Full-Stack Engineer", location: "Remote" },
    { title: "Product Designer", location: "Remote" },
    { title: "Founder in Residence", location: "Remote" },
    { title: "Growth & Community Lead", location: "Remote" },
];

export default function Careers() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
                <nav className="max-w-6xl mx-auto px-5 md:px-12 py-4 md:py-5">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="font-heading text-base md:text-xl font-medium text-foreground lowercase hover:opacity-70 transition-opacity">
                            zuri.corp
                        </Link>
                        <Link to="/" className="font-body text-sm text-muted hover:text-foreground transition-colors lowercase">
                            back
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Main Content */}
            <main className="pt-32 pb-24 px-5 md:px-12">
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <div className={`text-center mb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-medium text-foreground mb-8 lowercase">
                            work at zuricorp
                        </h1>
                        <p className="font-body text-base md:text-lg text-muted lowercase">
                            join us to build what matters.
                        </p>
                        <p className="font-body text-sm text-muted lowercase mt-2">
                            we're fully remote.
                        </p>
                    </div>

                    {/* Roles List */}
                    <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="border-t border-border">
                            {roles.map((role, index) => (
                                <div
                                    key={index}
                                    className="group py-6 md:py-8 border-b border-border cursor-pointer hover:bg-subtle transition-all"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-12">
                                            <h3 className="font-heading text-lg md:text-2xl font-medium text-foreground lowercase group-hover:opacity-70 transition-opacity">
                                                {role.title}
                                            </h3>
                                            <span className="font-body text-sm text-muted lowercase">
                                                {role.location}
                                            </span>
                                        </div>
                                        <a
                                            href="mailto:careers@zuricorp.com"
                                            className="font-body text-sm md:text-base text-foreground lowercase flex items-center gap-1 hover:opacity-70 transition-opacity"
                                        >
                                            apply
                                            <span className="text-lg">+</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className={`mt-20 text-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="font-body text-sm text-muted lowercase">
                            don't see your role? reach out at{" "}
                            <a href="mailto:careers@zuricorp.com" className="text-foreground hover:opacity-70 transition-opacity">
                                careers@zuricorp.com
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
