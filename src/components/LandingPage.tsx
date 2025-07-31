import React, { useState, useEffect } from "react";
import { ArrowRight, Zap, Brain, Presentation, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";

export default function AIPresenterLanding() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDashboardRedirect = () => {
    redirect("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x * 0.02 + "px",
            top: mousePosition.y * 0.02 + "px",
            transform: `translate(-50%, -50%)`,
            transition: "all 0.3s ease-out",
          }}
        />
        <div
          className="absolute w-80 h-80 bg-white opacity-5 rounded-full blur-3xl right-0 bottom-0"
          style={{
            right: mousePosition.x * -0.01 + "px",
            bottom: mousePosition.y * -0.01 + "px",
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white opacity-20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
          }
        }
        @keyframes morphing {
          0%,
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
        }
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-dark {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .morphing-shape {
          animation: morphing 8s ease-in-out infinite;
        }
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-10 w-10 text-white" />
                <div className="absolute inset-0 bg-white opacity-20 blur-md rounded-full"></div>
              </div>
              <span className="text-2xl font-black tracking-tight">
                AI PRESENTER
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-white hover:text-gray-300 transition-all duration-300 hover:scale-105"
              >
                About
              </a>
              <button className="glass px-6 py-3 hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:scale-105">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center transform transition-all duration-1500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-3 glass px-6 py-3 rounded-full mb-12 hover:scale-105 transition-transform duration-300">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <Sparkles className="h-5 w-5" />
              <span className="font-medium tracking-wide">
                NEXT-GEN AI PRESENTATIONS
              </span>
            </div>

            {/* Main Headline */}
            <div className="relative mb-16">
              <h1 className="text-7xl md:text-9xl font-black leading-none mb-4 glow-text">
                THINK
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 italic">
                  BEYOND
                </span>
                <br />
                SLIDES
              </h1>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 glass morphing-shape opacity-60"></div>
              <div
                className="absolute -bottom-5 -left-5 w-16 h-16 glass morphing-shape opacity-40"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed font-light">
              Transcend traditional presentations with AI that thinks, designs,
              and captivates.
              <br />
              <span className="text-white font-medium">
                Your ideas deserve more than templates.
              </span>
            </p>

            {/* CTA Section */}
            <div className="flex flex-col items-center space-y-8">
              <button
                onClick={handleDashboardRedirect}
                className="group relative glass px-16 py-6 text-xl font-bold tracking-wide hover:bg-white hover:bg-opacity-20 transition-all duration-500 transform hover:scale-110 overflow-hidden"
                style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>
                <div className="relative flex items-center space-x-4">
                  <span>ENTER THE FUTURE</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </button>

              <div className="text-sm text-gray-400 tracking-widest">
                NO SIGNUP REQUIRED
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Features */}
      <section id="features" className="py-32 px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 glow-text">
              REDEFINE POSSIBLE
            </h2>
            <div className="w-24 h-1 bg-white mx-auto opacity-50"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "INSTANT GENIUS",
                desc: "AI generates presentations faster than you can think them",
                delay: "0s",
              },
              {
                icon: Brain,
                title: "MIND READING",
                desc: "Understands context and creates visuals that tell your story",
                delay: "0.2s",
              },
              {
                icon: Presentation,
                title: "QUANTUM SYNC",
                desc: "Real-time collaboration across dimensions of creativity",
                delay: "0.4s",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group glass-dark p-12 hover:bg-white hover:bg-opacity-10 transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1"
                style={{ animationDelay: feature.delay }}
              >
                <div className="relative mb-8">
                  <feature.icon className="h-16 w-16 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 blur-xl rounded-full transition-opacity duration-500"></div>
                </div>
                <h3 className="text-2xl font-black mb-6 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                  {feature.desc}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-8 bg-white opacity-10 group-hover:opacity-30 transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immersive Stats */}
      <section className="py-32 px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12"></div>
            <div className="grid md:grid-cols-4 gap-12 text-center relative z-10">
              {[
                { number: "∞", label: "POSSIBILITIES" },
                { number: "0.1s", label: "CREATION TIME" },
                { number: "100%", label: "MIND BLOWN" },
                { number: "24/7", label: "INSPIRATION" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-6xl font-black mb-4 glow-text group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 tracking-widest text-sm group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Revolutionary About */}
      <section id="about" className="py-32 px-6 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl font-black mb-12 leading-tight glow-text">
                BEYOND
                <br />
                <span className="text-gray-500">IMAGINATION</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                We don&apos;t just make presentations. We craft experiences that
                bend reality, challenge perception, and transform how humans
                connect with ideas.
              </p>
              <div className="space-y-6">
                {[
                  "Neural slide generation from pure thought",
                  "Quantum design suggestions from parallel universes",
                  "Telepathic collaboration across space-time",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-4 group">
                    <div className="w-3 h-3 bg-white rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="text-lg group-hover:text-white transition-colors duration-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass aspect-square p-12 morphing-shape hover:scale-105 transition-transform duration-700">
                <div className="h-full w-full border-2 border-dashed border-white border-opacity-30 flex items-center justify-center morphing-shape">
                  <Presentation className="h-32 w-32 text-white opacity-50 hover:opacity-80 transition-opacity duration-500" />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -right-8 w-16 h-16 glass morphing-shape opacity-40"></div>
              <div
                className="absolute -bottom-8 -left-8 w-12 h-12 glass morphing-shape opacity-60"
                style={{ animationDelay: "3s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Footer */}
      <footer className="py-20 px-6 sm:px-8 glass-dark relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-8 md:mb-0">
              <Brain className="h-8 w-8" />
              <span className="text-2xl font-black tracking-tight">
                AI PRESENTER
              </span>
            </div>
            <div className="flex space-x-12 text-gray-400">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
              >
                PRIVACY
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
              >
                TERMS
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors duration-300 hover:scale-105 transform"
              >
                CONTACT
              </a>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 mt-12 pt-12 text-center text-gray-500">
            <p className="tracking-widest text-sm">
              © 2025 AI PRESENTER. REDEFINING REALITY.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
