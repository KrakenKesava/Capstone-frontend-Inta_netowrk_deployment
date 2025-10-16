import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";
import Features from "../components/Features.jsx";
import TechShowcase from "../components/TechShowcase.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <TechShowcase />
            <Footer />
        </>
    );
}