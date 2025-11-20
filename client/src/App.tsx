import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// --- DATA FOR THE SITE ---
const services = [
  {
    icon: "fa-faucet-drip",
    title: "Smart Plumbing",
    desc: "Advanced leak detection, automated pump systems, and premium fittings.",
  },
  {
    icon: "fa-bolt",
    title: "Electrical Wiring",
    desc: "Industrial grade concealed wiring, load calculation, and safety switchgear.",
  },
  {
    icon: "fa-video",
    title: "CCTV & Security",
    desc: "Night vision cameras, IP camera setup, and mobile monitoring configuration.",
  },
];

const projects = [
  {
    id: 1,
    category: "wiring",
    title: "Main Panel Wiring",
    subtitle: "Commercial Complex",
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    category: "plumbing",
    title: "Modern Bathroom",
    subtitle: "Residential Villa",
    img: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    category: "cctv",
    title: "IP Camera Setup",
    subtitle: "Office Security",
    img: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    category: "wiring",
    title: "Inverter Install",
    subtitle: "Power Backup",
    img: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    category: "plumbing",
    title: "Pipeline Maint.",
    subtitle: "Underground Fitting",
    img: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    category: "wiring",
    title: "Ceiling Lights",
    subtitle: "Corporate Office",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const stats = [
  { label: "Projects Done", value: 500 },
  { label: "Years Exp.", value: 12 },
  { label: "Expert Staff", value: 150 },
  { label: "% Satisfaction", value: 100 },
];

function App() {
  // --- STATE & HOOKS ---
  const [filter, setFilter] = useState("all");
  const [typewriterText, setTypewriterText] = useState("");
  const [statsTriggered, setStatsTriggered] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  // 1. Initialize Animations
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  // 2. Typewriter Effect Logic
  useEffect(() => {
    const words = [
      "Plumbing.",
      "House Wiring.",
      "CCTV Installation.",
      "Inverter Setup.",
    ];
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;

    const type = () => {
      currentWord = words[i];
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, j - 1));
        j--;
        if (j === 0) {
          isDeleting = false;
          i = (i + 1) % words.length;
        }
      } else {
        setTypewriterText(currentWord.substring(0, j + 1));
        j++;
        if (j === currentWord.length) {
          isDeleting = true;
        }
      }
      setTimeout(type, isDeleting ? 100 : 200);
    };
    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 3. Stats Counter Logic
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && !statsTriggered) {
          setStatsTriggered(true);
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(start);
                return newCounts;
              });
            }, 16);
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [statsTriggered]);

  // Filter Projects
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="bg-brand-50 text-gray-700 font-sans overflow-x-hidden selection:bg-brand-accent selection:text-white">
      {/* WHATSAPP BUTTON */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 animate-bounce"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-white/85 backdrop-blur-md border-b border-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex-shrink-0 flex items-center gap-3"
              data-aos="fade-right"
            >
              <div className="bg-brand-600 text-white p-2 rounded-lg">
                <i className="fa-solid fa-compass-drafting text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-serif">
                  Vishwakarma
                </h1>
              </div>
            </div>
            <div
              className="hidden md:flex space-x-8 items-center"
              data-aos="fade-left"
            >
              {["Home", "Services", "Portfolio", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-brand-600 font-medium transition"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-brand-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand-800 transition shadow-lg shadow-brand-900/20"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-grid-pattern"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
          <div
            className="lg:w-1/2 text-center lg:text-left relative z-10"
            data-aos="fade-up"
          >
            <div className="inline-block bg-white border border-brand-100 shadow-sm rounded-full px-4 py-1.5 mb-6">
              <span className="text-brand-600 text-xs font-bold uppercase tracking-wider">
                <i className="fa-solid fa-star mr-1"></i> #1 Engineering Service
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6 font-serif">
              Expert Solutions for <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-accent">
                Modern Homes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 h-8">
              We specialize in{" "}
              <span className="font-bold text-brand-600">{typewriterText}</span>
              <span className="animate-pulse">|</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact"
                className="bg-brand-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <span>Book Now</span>{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="flex items-center gap-3 px-4 py-2">
                {/* Avatar Group */}
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-800">
                    2k+
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-left">
                  <p className="font-bold text-gray-900">2,000+ Happy</p>
                  <p>Customers</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:w-1/2 mt-12 lg:mt-0 relative"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition duration-500">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Engineer"
                className="object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section
        id="stats"
        className="bg-brand-900 py-16 text-white relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                <h2 className="text-4xl font-bold text-brand-accent mb-2">
                  {counts[index]}
                  {index === 3 ? "%" : "+"}
                </h2>
                <p className="text-blue-200 text-sm uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="text-center max-w-3xl mx-auto mb-20"
            data-aos="fade-up"
          >
            <span className="text-brand-600 font-bold tracking-wider uppercase text-xs">
              Our Core Services
            </span>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif mt-2">
              Engineering Excellence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-150 group-hover:bg-brand-100"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white shadow-md rounded-xl flex items-center justify-center text-brand-600 text-3xl mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <i className={`fa-solid ${service.icon}`}></i>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center text-brand-600 font-bold hover:translate-x-2 transition-transform"
                  >
                    Book Service{" "}
                    <i className="fa-solid fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="portfolio" className="py-20 bg-brand-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="flex flex-col md:flex-row justify-between items-end mb-12"
            data-aos="fade-up"
          >
            <div className="max-w-2xl">
              <span className="text-brand-600 font-bold tracking-wider uppercase text-xs">
                Our Portfolio
              </span>
              <h3 className="text-4xl font-bold text-gray-900 font-serif mt-2">
                Recent Projects
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {["all", "wiring", "plumbing", "cctv"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all uppercase ${
                    filter === cat
                      ? "bg-brand-600 text-white border-brand-600"
                      : "bg-white text-brand-600 border-brand-200 hover:bg-brand-600 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer h-72 w-full animate-fade-in"
              >
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-brand-accent text-xs font-bold uppercase">
                    {project.category}
                  </span>
                  <h4 className="text-white text-xl font-bold">
                    {project.title}
                  </h4>
                  <p className="text-gray-300 text-sm mt-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-20 bg-brand-900 relative flex items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          alt="Background"
        />
        <div className="relative z-10 max-w-4xl w-full mx-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
              Ready to Upgrade Your Home?
            </h2>
            <p className="text-blue-100 mb-8">
              Contact Vishwakarma Engineering today for a free consultation.
            </p>
            <form className="max-w-md mx-auto space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-5 py-4 rounded-xl bg-white/90 border-0 focus:ring-2 focus:ring-brand-accent text-gray-900 placeholder-gray-500 outline-none"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-5 py-4 rounded-xl bg-white/90 border-0 focus:ring-2 focus:ring-brand-accent text-gray-900 placeholder-gray-500 outline-none"
              />
              <button
                type="button"
                className="w-full bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition shadow-lg transform hover:-translate-y-1"
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-white">
              Vishwakarma Engineering
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              © 2025 All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">
              <i className="fa-brands fa-facebook text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fa-brands fa-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fa-brands fa-whatsapp text-xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
