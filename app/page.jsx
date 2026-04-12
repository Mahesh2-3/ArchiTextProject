import React from "react";
import Link from "next/link";
import ThemeButton from "./Components/ThemeButton";
import { FaArrowRight, FaBrain, FaMapMarkedAlt, FaMagic } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#0a0a0a] text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-[#0a0a0a]/70 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF85BB] to-[#061d53] flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-xl font-bold tracking-tight">archiText</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="hover:text-[#FF85BB] transition-colors">Features</Link>
              <Link href="#about" className="hover:text-[#FF85BB] transition-colors">About</Link>
              <ThemeButton />
              <Link 
                href="/login" 
                className="px-5 py-2 rounded-full bg-[#061d53] dark:bg-[#FF85BB] text-white dark:text-[#061d53] font-medium hover:opacity-90 transition-opacity"
              >
                Sign In
              </Link>
            </div>
            
            <div className="md:hidden flex items-center gap-4">
              <ThemeButton />
              <Link href="/login" className="text-sm font-medium">Log In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FF85BB]/10 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#061d53]/20 dark:bg-[#061d53]/40 blur-[100px] rounded-full transition-all"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold mb-8">
            <span className="w-2 h-2 rounded-full bg-[#FF85BB] animate-ping"></span>
            AI-POWERED ARCHITECTURE GENERATOR
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-neutral-900 via-[#061d53] to-neutral-500 dark:from-white dark:via-[#FF85BB] dark:to-neutral-400 bg-clip-text text-transparent leading-tight">
            Turn Thoughts into <br /> Architecture
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Generate, visualize, and structure your complex projects with AI-powered mind maps. 
            archiText bridges the gap between raw ideas and structured reality.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/login" 
              className="px-8 py-4 rounded-full bg-[#FF85BB] text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#FF85BB]/30 transition-all flex items-center justify-center gap-2 group"
            >
              Get Started for Free <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#features" 
              className="px-8 py-4 rounded-full border border-neutral-300 dark:border-neutral-700 font-semibold text-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-16 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-2 bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm max-w-5xl mx-auto shadow-2xl overflow-hidden">
            <div className="rounded-xl overflow-hidden aspect-video relative">
              <img 
                src="/hero.png" 
                alt="archiText Visualization" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-neutral-50 dark:bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for Builders</h2>
            <div className="w-20 h-1.5 bg-[#FF85BB] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FaMagic className="text-2xl text-[#FF85BB]" />}
              title="AI Generation"
              description="Transform simple text prompts into hierarchical architectural diagrams instantly."
            />
            <FeatureCard 
              icon={<FaMapMarkedAlt className="text-2xl text-[#061d53] dark:text-[#FFCEE3]" />}
              title="Interactive Layouts"
              description="Rearrange, expand, and nest nodes with a fluid drag-and-drop interface."
            />
            <FeatureCard 
              icon={<FaBrain className="text-2xl text-[#FF85BB]" />}
              title="Semantic Logic"
              description="Our AI understands project relationships and groups components logically for you."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-[#061d53] to-[#0a0a0a] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF85BB]/10 blur-[80px] rounded-full"></div>
             <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to architecturalize your ideas?</h2>
             <p className="text-lg text-neutral-300 mb-10 max-w-xl mx-auto">
                Join thousands of designers and developers using archiText to structure their vision.
             </p>
             <Link 
              href="/login" 
              className="px-10 py-5 rounded-full bg-white text-[#061d53] font-bold text-xl hover:scale-105 transition-transform inline-block shadow-lg"
            >
              Start for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FF85BB] to-[#061d53] flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
            <span className="font-bold">archiText</span>
          </div>
          <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} archiText. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="#" className="hover:text-[#FF85BB]">Privacy</Link>
            <Link href="#" className="hover:text-[#FF85BB]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-[#FF85BB] dark:hover:border-[#FF85BB]/50 transition-all group shadow-sm hover:shadow-xl">
    <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
      {description}
    </p>
  </div>
);

export default LandingPage;
