import logo from "../assets/logo.png";

export default function NavbarDashboard({ search, setSearch, username = "User" }) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-20 flex items-center justify-between px-6 
      backdrop-blur-2xl bg-gradient-to-r from-[#0a0b17]/80 via-[#0e0f1f]/60 to-[#151730]/80 
      border-b border-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)] transition-all duration-300">
      
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 rounded-full object-cover animate-glow"
        />
        <h1 className="text-lg font-semibold tracking-wide text-gray-100">
          IntraNetwork
        </h1>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-xl mx-8 relative group">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search commits, IPs, or members..."
          className="w-full px-4 py-2 text-gray-100 bg-white/10 rounded-lg 
                     placeholder-gray-400 shadow-inner border border-transparent
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                     transition-all duration-300 hover:bg-white/15 relative z-10"
        />

        {/* ✅ FIXED: Added pointer-events-none so it doesn’t block input */}
        <div className="absolute inset-0 rounded-lg bg-indigo-500/10 blur-md opacity-0 
                        group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-300">{username}</span>
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center 
                        font-bold text-white shadow-lg shadow-indigo-500/30 
                        hover:shadow-indigo-500/60 transition-all duration-300">
          {username[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}

/* Add this animation to your CSS (index.css or App.css):

@keyframes glowPulse {
  0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 15px rgba(99, 102, 241, 0.8), 0 0 25px rgba(99, 102, 241, 0.6); }
  100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3); }
}

.animate-glow {
  animation: glowPulse 3s ease-in-out infinite;
}
*/
