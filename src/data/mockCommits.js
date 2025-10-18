export const mockCommits = {
  "Project Alpha": [
    {
      id: "a1",
      ip: "192.168.0.10:8080", // ✅ this will now show up
      date: "2025-10-16 14:35",
      member: "Kesava",
      timeRemaining: "2h 10m",
      isRunning: false,
      description: "UI fixes, Dockerfile update and improved deploy logic.",
    },
    {
      id: "a2",
      ip: "192.168.0.11:8081",
      date: "2025-10-15 09:12",
      member: "Sriram",
      timeRemaining: "1h 25m",
      isRunning: true,
      description: "Added backend discovery and ARP scanning integration.",
    },
  ],

  DeployHero: [
    {
      id: "b1",
      ip: "192.168.1.12:9090",
      date: "2025-10-14 11:48",
      member: "Ravi",
      timeRemaining: "50m",
      isRunning: false,
      description: "Refactored CI/CD scripts and improved deploy workflow.",
    },
  ],

  NetScanner: [
    {
      id: "c1",
      ip: "192.168.3.15:8085",
      date: "2025-10-10 19:48",
      member: "Amit",
      timeRemaining: "3h 05m",
      isRunning: false,
      description: "Initial commit for ARP and OS detection integration.",
    },
  ],
};
