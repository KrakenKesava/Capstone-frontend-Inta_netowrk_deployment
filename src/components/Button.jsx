export default function Button({ text, color = "indigo", onClick }) {
  const baseStyles =
    "px-5 py-2 rounded-lg font-semibold text-white transition shadow-md hover:opacity-90";

  const colorStyles = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-600 hover:bg-green-700",
    gray: "bg-gray-600 hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${colorStyles[color]}`}
    >
      {text}
    </button>
  );
}
