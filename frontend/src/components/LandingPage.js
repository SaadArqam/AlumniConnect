"use client";
import React, { useState } from 'react'
import { Menu, X, ArrowRight, Users, Briefcase, MessageCircle, TrendingUp, CheckCircle, Star } from 'lucide-react'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Base gradient background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-900 via-blue-950 to-cyan-500 -z-10"></div>
      
      {/* Vertical light beams - Layer 1 (Background) */}
      <div className="fixed inset-0 flex justify-around items-end opacity-40 -z-10">
        <div className="w-40 h-full bg-gradient-to-t from-blue-400 via-blue-500/50 via-blue-600/20 to-transparent blur-xl animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="w-32 h-full bg-gradient-to-t from-cyan-400 via-cyan-500/50 via-blue-500/20 to-transparent blur-xl animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="w-48 h-full bg-gradient-to-t from-blue-300 via-blue-400/50 via-blue-600/20 to-transparent blur-xl animate-pulse" style={{animationDelay: '2s', animationDuration: '4.5s'}}></div>
        <div className="w-36 h-full bg-gradient-to-t from-cyan-300 via-cyan-400/50 via-blue-500/20 to-transparent blur-xl animate-pulse" style={{animationDelay: '0.5s', animationDuration: '5.5s'}}></div>
        <div className="w-44 h-full bg-gradient-to-t from-blue-400 via-blue-500/50 via-blue-600/20 to-transparent blur-xl animate-pulse" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}></div>
      </div>

      {/* Vertical light beams - Layer 2 (Sharper definition) */}
      <div className="fixed inset-0 flex justify-around items-end opacity-60 -z-10">
        <div className="w-24 h-full bg-gradient-to-t from-blue-400/80 via-blue-500/30 via-blue-600/10 to-transparent blur-md animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="w-20 h-full bg-gradient-to-t from-cyan-400/80 via-cyan-500/30 via-blue-500/10 to-transparent blur-md animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="w-28 h-full bg-gradient-to-t from-blue-300/80 via-blue-400/30 via-blue-600/10 to-transparent blur-md animate-pulse" style={{animationDelay: '2s', animationDuration: '4.5s'}}></div>
        <div className="w-22 h-full bg-gradient-to-t from-cyan-300/80 via-cyan-400/30 via-blue-500/10 to-transparent blur-md animate-pulse" style={{animationDelay: '0.5s', animationDuration: '5.5s'}}></div>
        <div className="w-26 h-full bg-gradient-to-t from-blue-400/80 via-blue-500/30 via-blue-600/10 to-transparent blur-md animate-pulse" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}></div>
        <div className="w-24 h-full bg-gradient-to-t from-cyan-400/80 via-cyan-500/30 via-blue-500/10 to-transparent blur-md animate-pulse" style={{animationDelay: '2.5s', animationDuration: '4.8s'}}></div>
      </div>

      {/* Vertical light beams - Layer 3 (Sharp core) */}
      <div className="fixed inset-0 flex justify-around items-end opacity-80 -z-10">
        <div className="w-16 h-full bg-gradient-to-t from-blue-400/90 via-blue-500/40 via-blue-600/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="w-12 h-full bg-gradient-to-t from-cyan-400/90 via-cyan-500/40 via-blue-500/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="w-20 h-full bg-gradient-to-t from-blue-300/90 via-blue-400/40 via-blue-600/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '2s', animationDuration: '4.5s'}}></div>
        <div className="w-14 h-full bg-gradient-to-t from-cyan-300/90 via-cyan-400/40 via-blue-500/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '0.5s', animationDuration: '5.5s'}}></div>
        <div className="w-18 h-full bg-gradient-to-t from-blue-400/90 via-blue-500/40 via-blue-600/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '1.5s', animationDuration: '4.2s'}}></div>
        <div className="w-16 h-full bg-gradient-to-t from-cyan-400/90 via-cyan-500/40 via-blue-500/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '2.5s', animationDuration: '4.8s'}}></div>
        <div className="w-14 h-full bg-gradient-to-t from-blue-300/90 via-blue-400/40 via-blue-600/15 to-transparent blur-sm animate-pulse" style={{animationDelay: '3s', animationDuration: '5.2s'}}></div>
      </div>

      {/* Atmospheric glow overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-cyan-400/20 via-transparent to-transparent -z-10"></div>
      
      {/* Floating particles */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-1/4 animate-ping opacity-60" style={{animationDuration: '3s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-cyan-200 rounded-full top-1/3 right-1/4 animate-ping opacity-50" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-blue-200 rounded-full bottom-1/3 left-1/3 animate-ping opacity-70" style={{animationDuration: '3.5s', animationDelay: '2s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-white rounded-full top-2/3 right-1/3 animate-ping opacity-50" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}></div>
        <div className="absolute w-1 h-1 bg-cyan-300 rounded-full top-1/2 left-1/5 animate-ping opacity-60" style={{animationDuration: '4s', animationDelay: '1.5s'}}></div>
        <div className="absolute w-2 h-2 bg-blue-100 rounded-full bottom-1/4 right-1/5 animate-ping opacity-40" style={{animationDuration: '5s', animationDelay: '2.5s'}}></div>
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-20 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200">
            AlumniConnect
          </div> */}
          
          {/* Desktop Menu */}
          {/* <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-blue-100 hover:text-white transition-colors">Features</a>
            <a href="#benefits" className="text-blue-100 hover:text-white transition-colors">Benefits</a>
            <a href="#testimonials" className="text-blue-100 hover:text-white transition-colors">Testimonials</a>
            <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-medium text-white">
              Get Started
            </button>
          </div> */}

          {/* Mobile Menu Button */}
          {/* <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div> */}

        {/* Mobile Menu */}
        {/* {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-6">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-blue-100 hover:text-white transition-colors py-2">Features</a>
              <a href="#benefits" className="text-blue-100 hover:text-white transition-colors py-2">Benefits</a>
              <a href="#testimonials" className="text-blue-100 hover:text-white transition-colors py-2">Testimonials</a>
              <button className="px-6 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-medium text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav> */}
      <br />
      <br />

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-32 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-block mb-6 px-4 py-2 bg-cyan-400/10 backdrop-blur-sm border border-cyan-400/20 rounded-full text-cyan-300 text-sm font-medium">
            🚀 Connecting 50,000+ Alumni & Students Worldwide
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
            AlumniConnect
          </h1>
          
          <p className="text-xl md:text-3xl font-light max-w-3xl mx-auto mb-12 drop-shadow-xl text-blue-50 leading-relaxed">
            Where Alumni and Students Connect. Careers Take Off.
          </p>

          <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-12">
            Bridge the gap between graduation and career success. Network with alumni, find mentorship, discover opportunities, and accelerate your professional journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all font-semibold text-white text-lg flex items-center gap-2">
              Start Connecting Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all font-semibold text-white text-lg">
              Watch Demo
            </button>
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-cyan-400" />
              Free to Join
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-cyan-400" />
              Verified Alumni
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-cyan-400" />
              Global Network
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
              Powerful Features for Career Growth
            </h2>
            <p className="text-xl text-blue-200">Everything you need to connect and succeed</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Alumni Network</h3>
              <p className="text-blue-200">Connect with graduates from your institution across the globe and expand your professional circle.</p>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Job Opportunities</h3>
              <p className="text-blue-200">Access exclusive job postings and referrals shared directly by alumni at top companies.</p>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageCircle className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Mentorship Programs</h3>
              <p className="text-blue-200">Get guidance from experienced professionals who understand your journey and goals.</p>
            </div>

            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Career Growth</h3>
              <p className="text-blue-200">Track your progress, set goals, and achieve milestones with personalized insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
                Why Students Love AlumniConnect
              </h2>
              <p className="text-xl text-blue-200 mb-8">
                Join thousands of students who have transformed their careers through meaningful alumni connections.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Direct Access to Industry Leaders</h3>
                    <p className="text-blue-200">Connect with alumni working at Google, Microsoft, Goldman Sachs, and more.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Personalized Career Guidance</h3>
                    <p className="text-blue-200">Get advice tailored to your goals from those who've walked your path.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Exclusive Opportunities</h3>
                    <p className="text-blue-200">Access internships and jobs not posted on regular job boards.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all">
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">50K+</div>
                    <div className="text-blue-200">Active Members</div>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyan-300 mb-2">1000+</div>
                      <div className="text-blue-200 text-sm">Companies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyan-300 mb-2">95%</div>
                      <div className="text-blue-200 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 px-6 py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
              Success Stories
            </h2>
            <p className="text-xl text-blue-200">Hear from students who found their dream careers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className="text-blue-100 mb-6 italic">
                "I landed my dream job at Google through a connection I made on AlumniConnect. The mentorship was invaluable!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  SP
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Parker</div>
                  <div className="text-blue-300 text-sm">Software Engineer, Google</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className="text-blue-100 mb-6 italic">
                "The alumni network helped me transition from college to career seamlessly. Found amazing opportunities!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <div className="text-white font-semibold">Michael Rodriguez</div>
                  <div className="text-blue-300 text-sm">Product Manager, Microsoft</div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-cyan-400/30 transition-all">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className="text-blue-100 mb-6 italic">
                "Best platform for networking! Connected with alumni who gave me insights that changed my career path."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  EP
                </div>
                <div>
                  <div className="text-white font-semibold">Emily Patel</div>
                  <div className="text-blue-300 text-sm">Data Scientist, Amazon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-white/10 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-100">
              Ready to Launch Your Career?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Join AlumniConnect today and start building connections that matter
            </p>
            <button className="group px-10 py-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all font-semibold text-white text-lg flex items-center gap-2 mx-auto">
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-200 mb-4">
                AlumniConnect
              </div>
              <p className="text-blue-300 text-sm">
                Connecting students with alumni for career success and professional growth.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Features</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Pricing</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Security</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Roadmap</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">About Us</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Careers</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Blog</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Press</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Help Center</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Contact Us</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="block text-blue-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-300 text-sm">
              © 2024 AlumniConnect. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage