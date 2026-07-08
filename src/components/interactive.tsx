import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 });
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        const updatePos = (e: MouseEvent) => {
            setPos({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            setHovering(!!target.closest('a, button, [role="button"], .interactive'));
        };
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        window.addEventListener('mousemove', updatePos);
        return () => {
            window.removeEventListener('mousemove', updatePos);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
        >
            <div className={`bg-white transition-all duration-200 ease-out ${hovering ? 'w-12 h-12 rounded-none opacity-100' : 'w-4 h-4 rounded-full opacity-100'} -translate-x-1/2 -translate-y-1/2`}></div>
        </div>
    );
}

export function DecryptText({ text, className = "" }: { text: string, className?: string }) {
    const [displayText, setDisplayText] = useState("");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) {
            setDisplayText(text.replace(/./g, ' '));
            return;
        }
        
        let iteration = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        
        const targetMs = text.length < 15 ? 450 : 750;
        const intervalMs = 30;
        const increment = text.length / (targetMs / intervalMs);

        const interval = setInterval(() => {
            setDisplayText(
                text.split("").map((letter, index) => {
                    if (index < iteration || letter === " " || letter === "\n") return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += increment;
        }, intervalMs);
        return () => clearInterval(interval);
    }, [isInView, text]);

    return <span ref={ref} className={className} style={{ whiteSpace: "pre-wrap" }}>{displayText}</span>;
}

export function ScrollDistort({ children }: { children: React.ReactNode }) {
    const [skew, setSkew] = useState(0);
    const lastY = useRef(0);
    
    useEffect(() => {
        let rafId: number;
        let targetSkew = 0;
        
        const handleScroll = () => {
            const currentY = window.scrollY;
            const delta = currentY - lastY.current;
            lastY.current = currentY;
            
            // Apply skew based on velocity
            targetSkew = delta * 0.05;
            targetSkew = Math.max(-4, Math.min(4, targetSkew));
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        const loop = () => {
            // Smoothly approach target skew
            setSkew(prev => {
                const diff = targetSkew - prev;
                return prev + diff * 0.1;
            });
            // Decay target skew
            targetSkew *= 0.9;
            rafId = requestAnimationFrame(loop);
        }
        loop();
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div style={{ transform: `skewY(${skew}deg)`, transformOrigin: 'center center' }}>
            {children}
        </div>
    );
}
