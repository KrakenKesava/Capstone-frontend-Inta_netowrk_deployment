import { motion } from "framer-motion";

export default function AnimatedText({ text }) {
  const words = text.split(" ");
  return (
    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white text-center">
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
