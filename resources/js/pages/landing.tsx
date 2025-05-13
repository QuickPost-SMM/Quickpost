import { Link, router } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"
import logo from '../assets/logo.png'

function Header() {
    const [activeSection, setActiveSection] = useState("hero")
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    // Handle smooth scrolling and active section highlighting
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]")

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100 // Offset for the fixed header

            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop
                const sectionHeight = (section as HTMLElement).offsetHeight
                const sectionId = section.getAttribute("id") || ""

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId)
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        setIsMenuOpen(false)
        const element = document.getElementById(sectionId)
        if (element) {
            const offsetTop = element.offsetTop
            window.scrollTo({
                top: offsetTop - 80, // Adjust for header height
                behavior: "smooth",
            })
        }
    }

    const navItems = [
        { name: "Features", id: "features", isAnchor: true },
        { name: "Pricing", id: "pricing", isAnchor: true },
        { name: "Login", id: "login", isAnchor: false, href: "/login", isSecondary: true },
        { name: "Sign Up", id: "signup", isAnchor: false, href: "/register", isPrimary: true },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 bg-black shadow-inner shadow-lg rounded-b-lg">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    href="#hero"
                    onClick={() => scrollToSection("hero")}
                    className="text-2xl font-bold tracking-tight transform transition duration-300 hover:scale-105"
                >
                    <img src={logo} className="h-[60px] w-auto" />
                </Link>
                <nav className="hidden md:flex items-center space-x-6">
                    {navItems.map((item) =>
                        item.isAnchor ? (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={() => scrollToSection(item.id)}
                                className={`px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 ${activeSection === item.id
                                    ? "bg-gray-800 text-white shadow-inner"
                                    : "text-white hover:bg-gray-800 hover:shadow-inner"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ) : item.isPrimary ? (
                            <Link
                                key={item.id}
                                href={item.href || "#"}
                                className="px-6 py-2 rounded-lg bg-white text-black shadow-inner shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-110 hover:rotate-1"
                            >
                                {item.name}
                            </Link>
                        ) : (
                            <Link
                                key={item.id}
                                href={item.href || "#"}
                                className="px-4 py-2 rounded-lg border border-gray-500 text-white shadow-inner hover:shadow-lg transform transition duration-300 hover:scale-105"
                            >
                                {item.name}
                            </Link>
                        ),
                    )}
                </nav>
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-800 shadow-inner transform transition duration-300 hover:scale-105"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-black shadow-inner shadow-lg">
                    <div className="container mx-auto py-4 px-6 flex flex-col space-y-4">
                        {navItems.map((item) =>
                            item.isAnchor ? (
                                <Link
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-2 rounded-lg transition duration-300 transform hover:scale-105 ${activeSection === item.id
                                        ? "bg-gray-800 text-white shadow-inner"
                                        : "text-white hover:bg-gray-800 hover:shadow-inner"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ) : item.isPrimary ? (
                                <Link
                                    key={item.id}
                                    href={item.href || "#"}
                                    className="px-6 py-2 rounded-lg bg-white text-black shadow-inner shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-110 hover:rotate-1"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <Link
                                    key={item.id}
                                    href={item.href || "#"}
                                    className="px-4 py-2 rounded-lg border border-gray-500 text-white shadow-inner hover:shadow-lg transform transition duration-300 hover:scale-105"
                                >
                                    {item.name}
                                </Link>
                            ),
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

function Hero() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offsetTop = element.offsetTop
            window.scrollTo({
                top: offsetTop - 80, // Adjust for header height
                behavior: "smooth",
            })
        }
    }

    return (
        <section id="hero" className="py-20 px-6 md:px-12 min-h-[calc(100vh-80px)] pt-32">
            <div className="container mx-auto text-center flex flex-col justify-center h-full">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight transform transition duration-500 hover:scale-105">
                    Simplify Your Social Media with QuickPost
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                    Create, Schedule, and Analyze Effortlessly
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={() => scrollToSection("features")}
                        className="px-8 py-4 text-lg font-medium rounded-lg bg-white text-black shadow-inner shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 hover:rotate-1"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </section>
    )
}

function Features() {
    const features = [
        {
            title: "AI Content Creation",
            description:
                "Generate engaging posts with our advanced AI tools that understand your brand voice and audience preferences.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-10 h-10 mb-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                </svg>
            ),
        },
        {
            title: "Post Scheduling",
            description:
                "Plan and schedule your content across multiple platforms from one intuitive dashboard with smart timing suggestions.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-10 h-10 mb-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                    />
                </svg>
            ),
        },
        {
            title: "Analytics Insights",
            description:
                "Track performance with detailed analytics to optimize your social media strategy and increase engagement.",
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-10 h-10 mb-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                </svg>
            ),
        },
    ]

    return (
        <section id="features" className="py-20 px-6 md:px-12">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center transform transition duration-500 hover:scale-105">
                    Powerful Features
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 bg-black shadow-inner shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:rotate-2 hover:shadow-xl"
                        >
                            <div className="flex flex-col items-center text-center">
                                {feature.icon}
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-300">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional feature highlight with neumorphism */}
                <div className="mt-16 p-8 bg-black shadow-inner shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 md:mr-8">
                            <h3 className="text-2xl font-bold mb-4">Cross-Platform Support</h3>
                            <p className="text-gray-300">
                                Manage all your social accounts from a single dashboard. QuickPost supports all major social media
                                platforms including Facebook, Twitter, Instagram, LinkedIn, and more.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Facebook", "Twitter", "Instagram", "LinkedIn"].map((platform) => (
                                <div
                                    key={platform}
                                    className="w-16 h-16 rounded-full bg-gray-800 shadow-inner flex items-center justify-center transform transition duration-300 hover:scale-110 hover:rotate-12"
                                >
                                    {platform[0]}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Pricing() {
    const plans = [
        {
            name: "Basic Plan",
            price: "500",
            period: "/month",
            features: ["5 Posts/Day", "Basic Analytics", "1 Social Media Account"],
            isPopular: false,
        },
        {
            name: "Pro Plan",
            price: "1200",
            period: "/month",
            features: ["Unlimited Posts", "Advanced Analytics", "5 Social Media Accounts", "AI Content Creation"],
            isPopular: true,
        },
        {
            name: "Enterprise Plan",
            price: "3000",
            period: "/month",
            features: [
                "Unlimited Posts",
                "Full Analytics",
                "Unlimited Social Media Accounts",
                "AI Content Creation",
                "Priority Support",
            ],
            isPopular: false,
        },
    ]

    return (
        <section id="pricing" className="py-20 px-6 md:px-12 bg-gray-900">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center transform transition duration-500 hover:scale-105">
                    Choose Your Plan
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-lg transform transition duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl
                  ${plan.isPopular
                                    ? "bg-black shadow-inner shadow-lg border-2 border-white relative z-10"
                                    : "bg-black shadow-inner shadow-lg"
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 shadow-inner px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                            )}
                            <div className="text-center">
                                <h3 className={`font-bold mb-2 ${plan.isPopular ? "text-2xl" : "text-xl"}`}>{plan.name}</h3>
                                <p className={`font-bold mb-6 ${plan.isPopular ? "text-3xl" : "text-2xl"}`}>
                                    {plan.price} ETB
                                    <span className="text-sm text-gray-400">{plan.period}</span>
                                </p>
                                <ul className="space-y-3 mb-8 text-left">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <svg
                                                className="w-5 h-5 mr-2 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <form action="/payment">
                                    <input type="hidden" name="name" value={plan.name} />
                                    <input type="hidden" name="price" value={plan.price} />

                                    <button
                                        className={`w-full py-3 rounded-lg transition duration-300 font-medium transform hover:scale-105 hover:rotate-1
                                                ${plan.isPopular
                                                ? "bg-white text-black shadow-inner shadow-lg hover:shadow-xl"
                                                : "bg-white text-black shadow-inner shadow-lg hover:shadow-xl"
                                            }`}
                                        type="submit">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional pricing CTA */}
                <div className="mt-16 p-8 bg-black shadow-inner shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2">Need a custom plan?</h3>
                            <p className="text-gray-300">Contact our sales team for a tailored solution for your business</p>
                        </div>
                        <button className="px-6 py-3 rounded-lg bg-white text-black shadow-inner shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 hover:rotate-1">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Testimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const testimonials = [
        {
            quote:
                "QuickPost saved me hours of work every week! The AI content suggestions are spot-on for my audience and have increased my engagement by 40%.",
            name: "Sarah M.",
            title: "Content Creator",
        },
        {
            quote: "The analytics insights helped us increase our engagement by 45% in just two months. Incredible tool!",
            name: "Michael T.",
            title: "Marketing Director",
        },
        {
            quote: "Managing multiple social accounts used to be a nightmare. QuickPost made it simple and efficient.",
            name: "Abeba K.",
            title: "Social Media Manager",
        },
        {
            quote: "The scheduling feature is intuitive and has helped me maintain a consistent posting schedule.",
            name: "David L.",
            title: "Freelance Writer",
        },
        {
            quote: "QuickPost's AI suggestions have completely transformed our content strategy. Highly recommended!",
            name: "Priya S.",
            title: "Digital Marketing Specialist",
        },
    ]

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
        }
    }

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
        }
    }

    return (
        <section id="testimonials" className="py-20 px-6 md:px-12">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center transform transition duration-500 hover:scale-105">
                    What Our Users Say
                </h2>

                <div className="relative">
                    {/* Scroll Controls */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 shadow-inner p-2 rounded-full hover:shadow-lg transform transition duration-300 hover:scale-110 hover:rotate-3 hidden md:block"
                        aria-label="Scroll left"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Horizontal Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-4 px-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 snap-center min-w-[300px] md:min-w-[350px] p-6 bg-black shadow-inner shadow-lg rounded-lg mx-3 first:ml-0 last:mr-0 transform transition duration-300 hover:scale-105 hover:rotate-2 hover:shadow-xl"
                            >
                                <div className="mb-6">
                                    <svg
                                        className="w-8 h-8 text-gray-400 mb-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                    <p className="text-base mb-4">{testimonial.quote}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 shadow-inner flex items-center justify-center mr-3 transform transition duration-300 hover:scale-110 hover:rotate-12">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{testimonial.name}</p>
                                        <p className="text-gray-400 text-xs">{testimonial.title}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800 shadow-inner p-2 rounded-full hover:shadow-lg transform transition duration-300 hover:scale-110 hover:rotate-3 hidden md:block"
                        aria-label="Scroll right"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Scroll Indicators */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (scrollContainerRef.current) {
                                        const cardWidth = 350 // Approximate width of each card including margins
                                        scrollContainerRef.current.scrollTo({
                                            left: index * cardWidth,
                                            behavior: "smooth",
                                        })
                                    }
                                }}
                                className="w-2 h-2 rounded-full bg-gray-500 shadow-inner hover:bg-white transform transition duration-300 hover:scale-110"
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA Below Testimonials */}
                <div className="mt-16 p-8 bg-black shadow-inner shadow-lg rounded-lg transform transition duration-300 hover:scale-105">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0 text-center md:text-left">
                            <h3 className="text-2xl font-bold mb-2">Join thousands of satisfied users</h3>
                            <p className="text-gray-300">See how QuickPost can transform your social media strategy</p>
                        </div>
                        <button className="px-6 py-3 rounded-lg bg-white text-black shadow-inner shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105 hover:rotate-1">
                            Sign Up Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="py-10 px-6 md:px-12 border-t border-gray-800 bg-black shadow-inner shadow-lg rounded-t-lg">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <p className="text-gray-400 transform transition duration-300 hover:scale-105">QuickPost © 2025</p>
                    </div>
                    <div className="flex space-x-8">
                        {["Privacy Policy", "Terms of Service"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-gray-400 hover:text-white transform transition duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <Pricing />
                <Testimonials />
            </main>
            <Footer />
        </div>
    )
}