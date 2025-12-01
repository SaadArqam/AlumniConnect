"use client";
import Link from 'next/link';
import { Users2, MessageCircle, FileText, User, TrendingUp, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('userName') || 'User';
      setIsAuthenticated(!!token);
      setUserName(name);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative min-h-[100vh] flex items-start justify-center px-6 pt-25 pb-24 overflow-hidden"
      >
        {/* Background Image Layer with Fade-In */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat animate-fadeIn"
          style={{
            backgroundImage: 'url(/landingpage2.png)',
            backgroundPosition: '85% center',
          }}
        />

        <div className="absolute inset-0 bg-black/10"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {!isAuthenticated ? (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-slate-900 leading-tight tracking-tight">
                Find Your Tribe,<br />
                Build Your Network.
              </h1>

              <p className="text-sm sm:text-base text-slate-800 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                Connect with like-minded students and alumni for friendships, mentorship, and future career opportunities that will shape your journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center ">
                <Link
                  href="/signup"
                  className="px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all font-medium text-xs sm:text-sm shadow-lg hover:shadow-xl"
                >
                  Join for Free →
                </Link>
                <Link
                  href="/posts"
                  className="group px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full hover:bg-white transition-all font-medium text-xs sm:text-sm border border-slate-200 flex items-center gap-2"
                >
                  <Users2 size={16} />
                  Explore Communities
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 text-slate-900 leading-tight tracking-tight">
                Welcome Back, {userName}
              </h1>

              <p className="text-sm sm:text-base text-slate-800 max-w-xl mx-auto mb-8 leading-relaxed font-medium">
                Ready to connect, share, and grow with your network today?
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link
                  href="/posts"
                  className="px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all font-medium text-xs sm:text-sm shadow-lg hover:shadow-xl"
                >
                  Create a Post
                </Link>
                <Link
                  href="/chat"
                  className="group px-6 py-3 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full hover:bg-white transition-all font-medium text-xs sm:text-sm border border-slate-200 flex items-center gap-2"
                >
                  <MessageCircle size={16} />
                  Start Chatting
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Quick Access Section - Only for Authenticated Users */}
      {isAuthenticated && (
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/posts"
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
              >
                <FileText className="mb-4 text-slate-700 group-hover:text-slate-900 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Posts</h3>
                <p className="text-sm text-slate-600">Share your updates and connect with your community</p>
              </Link>

              <Link
                href="/chat"
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
              >
                <MessageCircle className="mb-4 text-slate-700 group-hover:text-slate-900 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Chat</h3>
                <p className="text-sm text-slate-600">Connect with peers in real-time discussions</p>
              </Link>

              <Link
                href="/profile"
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all group"
              >
                <User className="mb-4 text-slate-700 group-hover:text-slate-900 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Profile</h3>
                <p className="text-sm text-slate-600">View and update your profile information</p>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
              Why Join AlumniConnect?
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              We make it easy to connect, grow, and succeed together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Build Your Network</h3>
              <p className="text-slate-600 leading-relaxed">
                Connect with alumni from your college who have been where you are and know what it takes to succeed.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Career Opportunities</h3>
              <p className="text-slate-600 leading-relaxed">
                Get insider access to job openings, internships, and referrals that are not posted anywhere else.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900">Learn & Grow</h3>
              <p className="text-slate-600 leading-relaxed">
                Get mentorship from experienced professionals who genuinely want to help you navigate your career path.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section id="communities" className="px-6 py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
            Join Active Communities
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are into tech, business, arts, or sports—there is a community waiting for you. Share ideas, ask questions, and grow together.
          </p>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all font-medium text-base shadow-lg"
          >
            Browse Communities →
          </Link>
        </div>
      </section>

      {/* About/Community Highlights Section */}
      {!isAuthenticated ? (
        <>
          {/* About Section - Logged Out */}
          <section id="about" className="px-6 py-24 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
                Built for Students, By Students
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed mb-8">
                We know how hard it can be to find the right connections after graduation. That is why we created AlumniConnect—to bridge the gap between where you are and where you want to be. Our platform brings together students and alumni in a meaningful way, making it easier to find mentorship, opportunities, and friendships that last.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Join thousands of students and alumni who are already building their futures, one connection at a time.
              </p>
            </div>
          </section>

          {/* CTA Section - Logged Out */}
          <section className="px-6 py-24 bg-slate-50">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-slate-900">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-slate-700 mb-10">
                Your next opportunity is just one connection away. Join for free today.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-all font-medium text-base shadow-lg"
              >
                Create Your Account →
              </Link>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Community Highlights - Logged In */}
          <section className="px-6 py-24 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-900">
                Explore Your Community
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Trending Discussions</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Discover the hottest topics and join conversations that matter to your network.
                  </p>
                  <Link
                    href="/posts"
                    className="inline-flex items-center gap-2 text-slate-900 font-medium hover:gap-3 transition-all"
                  >
                    Browse Posts →
                  </Link>
                </div>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Active Chats</h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Connect with peers in real-time and build meaningful relationships.
                  </p>
                  <Link
                    href="/chat"
                    className="inline-flex items-center gap-2 text-slate-900 font-medium hover:gap-3 transition-all"
                  >
                    Start Chatting →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Stats - Logged In */}
          <section className="px-6 py-16 bg-slate-50">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">10+</div>
                  <div className="text-sm text-slate-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">5+</div>
                  <div className="text-sm text-slate-600">Posts Shared</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">20+</div>
                  <div className="text-sm text-slate-600">Active Chats</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-slate-900 mb-2">1+</div>
                  <div className="text-sm text-slate-600">Companies</div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Users2 className="text-white" size={18} />
                </div>
                <span className="text-lg font-semibold text-slate-900">AlumniConnect</span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connecting students with alumni for meaningful relationships and career growth.
              </p>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Features
                </a>
                <a href="#communities" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Communities
                </a>
                <Link href="/posts" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Explore
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Contact
                </a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Blog
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-slate-900 font-semibold mb-4">Legal</h3>
              <div className="space-y-2">
                <a href="#" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="block text-slate-600 hover:text-slate-900 text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 text-center">
            <p className="text-slate-600 text-sm">
              © 2025 AlumniConnect. Made with care for students everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
