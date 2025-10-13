import { motion } from "framer-motion";
import { Cpu, GitBranch, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <GitBranch className="w-10 h-10 text-indigo-400" />,
    title: "Commit Automation",
    desc: "Instantly convert any Git commit into a deployable local app.",
  },
  {
    icon: <Cpu className="w-10 h-10 text-cyan-400" />,
    title: "Smart Containerization",
    desc: "We automatically generate Docker environments for every version.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-green-400" />,
    title: "Secure & Reliable",
    desc: "Isolated environments ensure every local deployment is safe and stable.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Core Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="glass rounded-2xl p-8 text-left glow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
