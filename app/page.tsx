import Link from "next/link";
import { Search, ShieldCheck, Zap, ArrowRightLeft, Layers, Filter } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans py-20 px-4">
      {/* Hero Section */}
      <div className="text-center max-w-4xl m-auto mb-24">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-orange-600 uppercase bg-orange-50 rounded-full">
          Interview Technical Showcase
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">
          Next.js Recipe <span className="text-orange-500">Engine</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
          A high-performance application built to meet advanced technical requirements including secure proxying and complex state management.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <Link
            href="/recipes/1" 
            className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-95 w-full sm:w-auto"
          >
            Live Demo
          </Link>
          <a 
            href="#technical-specs"
            className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-bold rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 transition-all w-full sm:w-auto"
          >
            Technical Docs
          </a>
        </div>

        {/* Requirements Highlight Section */}
        <div id="technical-specs" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          
          {/* Requirement 1: Search & Debounce */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
              <Search size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">Dynamic Search</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Real-time search with debounce&quot;."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Implemented a custom <strong>useDebounce</strong> hook to optimize API calls and enhance UX during recipe discovery.
            </p>
          </div>

          {/* Requirement 2: Advanced Filtering & Sort */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
              <Filter size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">Filter & Sort</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Multi-criteria filtering & sorting."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Complex state synchronization with <strong>URL SearchParams</strong> for persistent filtering by cuisine and sorting by rating/time.
            </p>
          </div>

          {/* Requirement 3: Pagination */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
              <Layers size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">Smart Pagination</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Efficient server-side pagination."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Custom pagination logic with <strong>generateStaticParams</strong> for lightning-fast, SEO-friendly static page generation.
            </p>
          </div>

          {/* Requirement 4: X-WAF Token */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">X-WAF Security</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Secure header token injection."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Server-to-server security using <strong>x-waf-token</strong> headers to protect sensitive API endpoints from bot traffic.
            </p>
          </div>

          {/* Requirement 5: Next.js Proxy/Redirects */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
              <ArrowRightLeft size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">Proxy & Redirects</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Clean URL proxying & redirection."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Configured <strong>Next.js middleware</strong> and rewrites to handle secure redirects and clean API proxying.
            </p>
          </div>

          {/* Requirement 6: CI/CD */}
          <div className="group p-8 bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm hover:border-orange-200 transition-all">
            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6 text-yellow-600">
              <Zap size={24} />
            </div>
            <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-3">CI/CD Deployment</h3>
            <p className="text-sm text-zinc-500 leading-relaxed italic">
              "Requirement: Automated build and deploy."
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Zero-downtime deployment pipeline with automated environment variable management and build-time optimization.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}