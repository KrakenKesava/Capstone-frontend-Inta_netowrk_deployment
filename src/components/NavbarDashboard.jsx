import logo from "../assets/logo.png";

export default function NavbarDashboard({ search, setSearch, username = "User" }) {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-20 flex items-center justify-between px-6 backdrop-blur-lg bg-[#0f0c29]/70 border-b border-white/10 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-full glow" />

        <h1 className="text-lg font-semibold tracking-wide">IntraNetwork</h1>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-xl mx-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects or commits..."
          className="w-full rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User profile */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{username}</span>
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
          {username[0]?.toUpperCase() || "U"}
        </div>
      </div>
    </header>
  );
}
