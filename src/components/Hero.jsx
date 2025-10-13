import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import Button from "./Button.jsx";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-black to-black opacity-80"></div>
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      ></motion.div>

      {/* Hero Content */}
      <div className="relative z-10 mt-20">
        <AnimatedText text="Turn Any Git Commit into a Locally Deployable App" />
        <motion.p
          className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Paste your Git commit ID — we’ll dockerize, build, and deploy it locally with one click.
        </motion.p>
        <div className="mt-8 flex space-x-4 justify-center">
          <Button text="Get Started" color="indigo" />
          <Button text="Learn More" color="gray" />
        </div>
      </div>
    </section>
  );
}
