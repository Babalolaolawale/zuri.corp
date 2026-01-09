"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";

export default function LandingPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        // Preloader timing
        const timer = setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => setIsLoaded(true), 100);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const handleScroll = () => {
                const sections = ["home", "about", "projects", "contact"];
                const scrollPosition = window.scrollY + 150;

                for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const { offsetTop, offsetHeight } = element;
                        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                            setActiveSection(sectionId);
                            break;
                        }
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isLoading]);

    // Preloader
    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className={`min-h-screen bg-white overflow-x-hidden transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <Header activeSection={activeSection} />

            {/* Hero Section */}
            <section id="home" className="min-h-[85vh] md:min-h-screen flex flex-col justify-center items-center pt-16 pb-8 md:pt-24 md:pb-16 px-5 md:px-12 lg:px-24 relative overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-radial from-gray-50 via-white to-white opacity-80"></div>

                {/* Decorative architectural lines */}
                <div className="absolute top-20 right-10 md:right-24 w-px h-32 md:h-48 bg-gradient-to-b from-border to-transparent"></div>
                <div className="absolute bottom-20 left-10 md:left-24 w-32 md:w-48 h-px bg-gradient-to-r from-border to-transparent"></div>

                {/* Pulsing dot accent */}
                <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-muted/30 rounded-full animate-pulse hidden md:block"></div>

                <div className={`max-w-5xl relative z-10 text-center md:text-left transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="font-body text-xs md:text-sm text-muted mb-4 md:mb-6 tracking-widest uppercase">company builder</p>
                    <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium text-foreground mb-5 md:mb-8 leading-[1.05] lowercase">
                        building ideas<br />that matter
                    </h1>
                    <p className="font-body text-base md:text-xl text-muted max-w-xl leading-relaxed lowercase mb-8 md:mb-10 mx-auto md:mx-0">
                        we turn meaningful problems into products that last. no hype. no shortcuts. just work that means something.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a href="#projects" className="inline-flex items-center gap-2 font-body text-sm text-white bg-foreground px-6 py-3 hover:bg-foreground/90 transition-all lowercase">
                            see our work
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <a href="mailto:hello@zuricorp.com" className="font-body text-sm text-muted hover:text-foreground transition-colors lowercase">
                            get in touch
                        </a>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 md:left-12 md:translate-x-0 lg:left-24">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-px h-10 md:h-16 bg-gradient-to-b from-muted to-transparent animate-pulse"></div>
                        <span className="font-body text-[10px] text-muted lowercase tracking-widest">scroll</span>
                    </div>
                </div>
            </section>

            <Marquee />

            {/* About Section */}
            <section id="about" className="py-20 md:py-32 px-5 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div>
                            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6 md:mb-8 lowercase">
                                what we do
                            </h2>
                            <div className="space-y-4 md:space-y-6">
                                <p className="font-body text-lg md:text-xl text-foreground leading-relaxed lowercase">
                                    zuricorp is a company builder.
                                </p>
                                <p className="font-body text-sm md:text-lg text-muted leading-relaxed lowercase">
                                    we explore real problems, design thoughtful solutions, and build products
                                    with care. we believe the best companies are built slowly, with intention,
                                    and with a deep understanding of the people they serve.
                                </p>
                                <p className="font-body text-sm md:text-lg text-muted leading-relaxed lowercase">
                                    every product we create starts with a question worth answering.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-6 md:space-y-8 md:pt-16">
                            <ValueItem number="01" title="meaningful innovation" description="we build things that are beautiful, useful, and move the world forward." />
                            <ValueItem number="02" title="independent leadership" description="each venture is led by the best minds, with the freedom to operate with clarity." />
                            <ValueItem number="03" title="bold exploration" description="we go where we can make a real difference, bringing our philosophy to new spaces." />
                            <ValueItem number="04" title="lasting impact" description="this isn't just business. it's about solving real problems that matter." />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-16 md:py-24 px-5 md:px-12 lg:px-24 bg-subtle">
                <div className="max-w-4xl mx-auto text-center">
                    <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic lowercase">
                        "we don't build for the sake of building. we build because something needs to exist."
                    </blockquote>
                    <p className="font-body text-xs md:text-sm text-muted mt-6 md:mt-8 lowercase">— zuricorp founding principle</p>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 md:py-32 px-5 md:px-12 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-2 md:gap-4">
                        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-foreground lowercase">
                            what we're building
                        </h2>
                        <p className="font-body text-xs md:text-sm text-muted lowercase">active projects</p>
                    </div>
                    <div className="space-y-0">
                        <ProjectCard name="pine" description="rethinking how founders connect, learn, and build together" tag="ecosystem" index="01" />
                        <ProjectCard name="findr" description="discovering cities through local insight" tag="navigation" index="02" />
                        <ProjectCard name="blink" description="invisible stablecoin settlement rails for global payouts" tag="fintech" index="03" />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 px-5 md:px-12 lg:px-24 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <StatItem number="3" label="active products" />
                        <StatItem number="2022" label="founded" />
                        <StatItem number="∞" label="experiments ongoing" />
                        <StatItem number="1" label="mission" />
                    </div>
                </div>
            </section>

            {/* Careers Section */}
            <section id="careers" className="py-20 md:py-32 px-5 md:px-12 lg:px-24 bg-subtle">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-6 lowercase">
                        work at zuri.corp
                    </h2>
                    <p className="font-body text-base md:text-lg text-muted lowercase mb-8">
                        we're building something meaningful. come help.
                    </p>
                    <Link to="/careers" className="inline-flex items-center gap-2 font-body text-base text-foreground lowercase border border-foreground px-6 py-3 hover:bg-foreground hover:text-white transition-all">
                        view open roles
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 md:py-32 px-5 md:px-12 lg:px-24">
                <div className="max-w-4xl mx-auto">
                    <p className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-relaxed italic lowercase mb-8 md:mb-12">
                        the work continues.<br />
                        quietly. intentionally.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 md:gap-16">
                        <a href="mailto:hello@zuricorp.com" className="inline-flex items-center gap-3 font-body text-base md:text-lg text-foreground hover:opacity-70 transition-opacity group lowercase">
                            <span>get in touch</span>
                            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                        <span className="font-body text-xs md:text-sm text-muted lowercase">hello@zuricorp.com</span>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

/* Preloader Component */
function Preloader() {
    const [progress, setProgress] = useState(0);
    const [step, setStep] = useState(0);

    useEffect(() => {
        // Progress bar / Logo fill timing
        const duration = 4000; // 4 seconds for the fill
        const interval = 20;
        const increment = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment;
                return next >= 100 ? 100 : next;
            });
        }, interval);

        // Animation steps
        const timers = [
            setTimeout(() => setStep(1), 500),   // Logo appears
            setTimeout(() => setStep(2), 1500),  // Line/Tagline reveal
            setTimeout(() => setStep(3), 4200),  // Transition start
        ];

        return () => {
            clearInterval(timer);
            timers.forEach(t => clearTimeout(t));
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center">
            <div className="text-center">
                {/* Logo with Fill Animation */}
                <div className={`relative mb-4 transition-all duration-1000 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="w-24 h-24 md:w-32 md:h-32 relative mx-auto">
                        {/* Background / Empty Logo */}
                        <img src={logo} className="w-full h-full opacity-10" alt="logo" />

                        {/* Filling Foreground Logo */}
                        <div
                            className="absolute inset-0 overflow-hidden transition-all duration-200 ease-linear"
                            style={{ height: `${progress}%`, bottom: 0, top: 'auto' }}
                        >
                            <img src={logo} className="w-24 h-24 md:w-32 md:h-32 absolute bottom-0 left-0" alt="logo fill" />
                        </div>
                    </div>
                </div>

                {/* Text Logo reveal after fill starts */}
                <div className="overflow-hidden h-8">
                    <h1 className={`font-heading text-2xl text-white lowercase transition-all duration-1000 ${progress > 20 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                        zuri.corp
                    </h1>
                </div>

                {/* Tagline */}
                <div className="overflow-hidden mt-4">
                    <p
                        className={`font-body text-xs text-white/40 lowercase tracking-widest transition-all duration-1000 ${progress > 50 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
                    >
                        the dream is bigger than us
                    </p>
                </div>

                {/* Progress Number */}
                <div className="mt-8">
                    <span className="font-body text-[10px] text-white/20 tracking-widest uppercase">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>


        </div>
    );
}

/* Marquee Component */
function Marquee() {
    const products = [
        { name: "pine", icon: "◆" },
        { name: "findr", icon: "●" },
        { name: "blink", icon: "◼" },
    ];
    const items = [...products, ...products, ...products, ...products];
    return (
        <div className="py-8 md:py-10 bg-subtle/50 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {items.map((product, i) => (
                    <span key={i} className="flex items-center gap-2 mx-6 md:mx-10">
                        <span className="text-foreground/20 text-sm">{product.icon}</span>
                        <span className="font-heading text-xl md:text-3xl text-foreground/60 lowercase">{product.name}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* Value Item Component */
function ValueItem({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="group cursor-default">
            <div className="flex items-start gap-3 md:gap-4">
                <span className="font-body text-xs text-muted pt-1">{number}</span>
                <div>
                    <h3 className="font-heading text-base md:text-lg font-medium text-foreground mb-1 md:mb-2 lowercase group-hover:opacity-70 transition-opacity">{title}</h3>
                    <p className="font-body text-xs md:text-sm text-muted lowercase leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

/* Project Card Component */
function ProjectCard({ name, description, tag, index }: { name: string; description: string; tag: string; index: string }) {
    return (
        <div className="group py-6 md:py-10 border-t border-border cursor-pointer transition-all hover:bg-subtle">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 px-1 md:px-6">
                <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-body text-xs text-muted w-5 md:w-6">{index}</span>
                    <div>
                        <h3 className="font-heading text-2xl md:text-4xl font-medium text-foreground group-hover:opacity-70 transition-opacity lowercase">{name}</h3>
                        <span className="font-body text-[10px] md:text-xs text-muted uppercase tracking-widest mt-1 inline-block">{tag}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 pl-9 md:pl-0 md:max-w-md">
                    <p className="font-body text-sm md:text-base text-muted lowercase">{description}</p>
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

/* Stat Item Component */
function StatItem({ number, label }: { number: string; label: string }) {
    return (
        <div className="text-center md:text-left">
            <p className="font-heading text-3xl md:text-5xl font-medium text-foreground mb-1 md:mb-2">{number}</p>
            <p className="font-body text-xs md:text-sm text-muted lowercase">{label}</p>
        </div>
    );
}

/* Header Component */
function Header({ activeSection }: { activeSection: string }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
    };

    const navItems = [
        { id: "home", label: "home" },
        { id: "about", label: "about" },
        { id: "projects", label: "products" },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm border-b border-border" : "bg-transparent"}`}>
                <nav className="max-w-7xl mx-auto px-5 md:px-12 lg:px-24 py-4 md:py-5">
                    <div className="flex items-center justify-between">
                        <button onClick={() => scrollToSection("home")} className="font-heading text-base md:text-xl font-medium text-foreground lowercase hover:opacity-70 transition-opacity">
                            zuri.corp
                        </button>
                        <div className="hidden md:flex items-center space-x-10">
                            {navItems.map((item) => (
                                <button key={item.id} onClick={() => scrollToSection(item.id)} className={`font-body text-sm lowercase transition-all relative ${activeSection === item.id ? "text-foreground" : "text-muted hover:text-foreground"}`}>
                                    {item.label}
                                    {activeSection === item.id && <span className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"></span>}
                                </button>
                            ))}
                            <Link to="/careers" className="font-body text-sm text-muted hover:text-foreground lowercase transition-all">
                                careers
                            </Link>
                        </div>
                        <a href="mailto:hello@zuricorp.com" className="hidden md:block font-body text-sm text-foreground lowercase border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-white transition-all">
                            contact
                        </a>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden font-body text-sm text-foreground lowercase p-2">
                            {mobileMenuOpen ? "close" : "menu"}
                        </button>
                    </div>
                </nav>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white md:hidden">
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        {navItems.map((item) => (
                            <button key={item.id} onClick={() => scrollToSection(item.id)} className={`font-heading text-3xl lowercase ${activeSection === item.id ? "text-foreground" : "text-muted"}`}>
                                {item.label}
                            </button>
                        ))}
                        <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="font-heading text-3xl text-muted lowercase">
                            careers
                        </Link>
                        <a href="mailto:hello@zuricorp.com" className="font-body text-lg text-foreground lowercase border border-foreground px-8 py-3 mt-8">
                            contact
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

/* Footer Component */
function Footer() {
    return (
        <footer className="py-12 md:py-16 px-5 md:px-12 lg:px-24 bg-foreground">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-8 md:mb-12">
                    <span className="font-heading text-xl md:text-2xl text-white lowercase">zuri.corp</span>
                    <div className="flex items-center gap-6 md:gap-8">
                        <a href="https://x.com/zuri_corp" target="_blank" rel="noopener noreferrer" className="font-body text-xs md:text-sm text-white/60 hover:text-white transition-colors lowercase">twitter</a>
                        <a href="#" className="font-body text-xs md:text-sm text-white/60 hover:text-white transition-colors lowercase">linkedin</a>
                        <a href="#" className="font-body text-xs md:text-sm text-white/60 hover:text-white transition-colors lowercase">email</a>
                    </div>
                </div>
                <div className="pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
                    <p className="font-body text-xs md:text-sm text-white/40 lowercase">© {new Date().getFullYear()} zuricorp. all rights reserved.</p>
                    <p className="font-body text-xs md:text-sm text-white/40 lowercase">the dream is bigger than us.</p>
                </div>
            </div>
        </footer>
    );
}
