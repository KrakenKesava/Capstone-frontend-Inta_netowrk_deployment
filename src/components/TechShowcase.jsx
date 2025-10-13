import { motion } from "framer-motion";

export default function TechShowcase() {
  const tech = [
    "React",
    "Docker",
    "GitHub",
    "TailwindCSS",
    "Node.js",
    "Vite",
  ];

  return (
    <section className="py-24 bg-gradient-to-t from-indigo-950 to-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Built with Modern Tech
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6">
          {tech.map((t, i) => (
            <motion.div
              key={i}
              className="glass px-6 py-3 rounded-full text-lg text-indigo-300 border border-indigo-700"
              whileHover={{ scale: 1.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
