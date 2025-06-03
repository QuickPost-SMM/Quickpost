'use client';
import { Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, BarChart, Calendar, CheckCircle, ChevronRight, Facebook, Instagram, Menu, MessageSquare, Users, X, Youtube } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Custom TikTok icon
const TikTok = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

import { PlatformComparison } from '@/components/platform-comparison';
import { PricingChart } from '@/components/pricing-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardPreview } from '../components/dashboard-preview';

export default function LandingPage() {
    const { auth } = usePage().props as { auth: { user: any } };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isVisible, setIsVisible] = useState({
        features: false,
        pricing: false,
        testimonials: false,
        platforms: false,
    });

    const featuresRef = useRef(null);
    const pricingRef = useRef(null);
    const testimonialsRef = useRef(null);
    const platformsRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === featuresRef.current && entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, features: true }));
                    } else if (entry.target === pricingRef.current && entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, pricing: true }));
                    } else if (entry.target === testimonialsRef.current && entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, testimonials: true }));
                    } else if (entry.target === platformsRef.current && entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, platforms: true }));
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (featuresRef.current) observer.observe(featuresRef.current);
        if (pricingRef.current) observer.observe(pricingRef.current);
        if (testimonialsRef.current) observer.observe(testimonialsRef.current);
        if (platformsRef.current) observer.observe(platformsRef.current);

        return () => {
            if (featuresRef.current) observer.unobserve(featuresRef.current);
            if (pricingRef.current) observer.unobserve(pricingRef.current);
            if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
            if (platformsRef.current) observer.unobserve(platformsRef.current);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Add this after the other useEffect hooks
    useEffect(() => {
        // Add smooth scrolling behavior for anchor links
        const handleAnchorClick = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = 80; // Approximate height of the navigation bar
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });

                    // Close mobile menu if open
                    setIsMenuOpen(false);

                    // Update URL without scrolling
                    window.history.pushState(null, '', href);
                }
            }
        };

        // Add event listeners to all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach((anchor) => {
            anchor.addEventListener('click', handleAnchorClick);
        });

        // Cleanup
        return () => {
            anchorLinks.forEach((anchor) => {
                anchor.removeEventListener('click', handleAnchorClick);
            });
        };
    }, []);

    function Contact() {
        const [form, setForm] = useState({
            name: '',
            email: '',
            message: '',
        });

        const handleChange = (e) => {
            setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            router.post('/admin/support', form, {
                onSuccess: () => {
                    alert('Thank you for contacting us!');
                    setForm({ name: '', email: '', message: '' }); // Reset form
                },
            });
        };

        return (
            <section id="contact" className="bg-gradient-to-br from-[#f7f8fa] to-[#e9f0ff] px-6 py-20 md:px-12">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="mb-10 text-center text-4xl font-bold tracking-tight text-gray-800 transition duration-500 hover:scale-105 hover:text-indigo-600 md:text-5xl">
                        Contact Us
                    </h2>
                    <form
                        className="space-y-6 rounded-2xl border border-gray-200 bg-white/70 p-10 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="name" className="mb-2 block font-semibold text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="mb-2 block font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="mb-2 block font-semibold text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full transform rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-indigo-700"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        );
    }

    const testimonials = [
        {
            name: 'Natnael Girma',
            role: 'Marketing Director',
            company: 'TechGrowth',
            image: '/logo.svg?height=80&width=80',
            content:
                "This tool has completely transformed how we manage our social media presence. We've seen a 40% increase in engagement since we started using it.",
        },
        {
            name: 'Gezehagni Gullat',
            role: 'Social Media Manager',
            company: 'Innovate Inc',
            image: '/logo.svg?height=80&width=80',
            content:
                'The analytics and scheduling features are game-changers. I can now manage 5 different brands with half the effort it used to take.',
        },
        {
            name: 'Negese Zeleke',
            role: 'Founder',
            company: 'CreativeMinds',
            image: '/logo.svg?height=80&width=80',
            content: 'As a small business owner, this platform gives me enterprise-level tools at a price I can afford. The ROI has been incredible.',
        },
        {
            name: 'Aelaf',
            role: 'Founder',
            company: 'CreativeMinds',
            image: '/logo.svg?height=80&width=80',
            content: 'As a small business owner, this platform gives me enterprise-level tools at a price I can afford. The ROI has been incredible.',
        },
    ];

    const features = [
        {
            title: 'Smart Scheduling',
            description: 'AI-powered posting times to maximize engagement across all platforms',
            icon: <Calendar className="h-12 w-12 text-purple-700" />,
        },
        {
            title: 'Advanced Analytics',
            description: 'Comprehensive insights to track performance and optimize your strategy',
            icon: <BarChart className="h-12 w-12 text-purple-700" />,
        },
        {
            title: 'Audience Management',
            description: 'Segment and understand your followers to create targeted content',
            icon: <Users className="h-12 w-12 text-purple-700" />,
        },
        {
            title: 'AI-Powered Content Creation',
            description: 'Generate engaging posts with our AI assistant that understands your brand voice and audience preferences.',
            icon: <MessageSquare className="h-12 w-12 text-purple-700" />,
        },
    ];

    const plans = [
        {
            name: 'Starter',
            price: '29EB',
            description: 'Perfect for individuals and small businesses',
            features: ['5 social profiles', '30 scheduled posts', 'Basic analytics', 'Single user'],
        },
        {
            name: 'Professional',
            price: '79EB',
            description: 'Ideal for growing businesses and teams',
            features: ['15 social profiles', 'Unlimited scheduled posts', 'Advanced analytics', '5 team members', 'Content calendar'],
            highlighted: true,
        },
        {
            name: 'Enterprise',
            price: '199EB',
            description: 'For large organizations with complex needs',
            features: [
                'Unlimited social profiles',
                'Unlimited scheduled posts',
                'Custom analytics dashboards',
                'Unlimited team members',
                'Content calendar',
                'API access',
                'Dedicated support',
            ],
        },
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* Navigation */}
            <nav className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <a href="/" className="text-2xl font-bold text-purple-600">
                                QuickPost
                            </a>
                        </div>
                        <div className="hidden items-center space-x-8 md:flex">
                            <a href="#features" className="text-foreground transition-colors hover:text-purple-600">
                                Features
                            </a>
                            <a href="#platforms" className="text-foreground transition-colors hover:text-purple-600">
                                Platforms
                            </a>
                            <a href="#pricing" className="text-foreground transition-colors hover:text-purple-600">
                                Pricing
                            </a>
                            <a href="#testimonials" className="text-foreground transition-colors hover:text-purple-600">
                                Testimonials
                            </a>
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button className="bg-purple-600 hover:bg-purple-700">Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="outline" className="mr-2">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link href="register">
                                        <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="md:hidden">
                            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
                {/* Mobile menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-background border-b md:hidden"
                        >
                            <div className="container mx-auto flex flex-col space-y-4 px-4 py-4">
                                <a href="#features" className="text-foreground py-2 transition-colors hover:text-purple-600">
                                    Features
                                </a>
                                <a href="#platforms" className="text-foreground py-2 transition-colors hover:text-purple-600">
                                    Platforms
                                </a>
                                <a href="#pricing" className="text-foreground py-2 transition-colors hover:text-purple-600">
                                    Pricing
                                </a>
                                <a href="#testimonials" className="text-foreground py-2 transition-colors hover:text-purple-600">
                                    Testimonials
                                </a>
                                <div className="flex flex-col space-y-2 pt-2">
                                    {auth.user ? (
                                        <Link href="/dashboard">
                                            <Button className="bg-purple-600 hover:bg-purple-700">Dashboard</Button>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link href="/login">
                                                <Button variant="outline">Log in</Button>
                                            </Link>
                                            <Link href="register">
                                                <Button className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-transparent opacity-50 dark:from-purple-800 dark:opacity-20"></div>

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-purple-400 opacity-20 dark:bg-purple-700"
                            style={{
                                width: `${Math.random() * 300 + 50}px`,
                                height: `${Math.random() * 300 + 50}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50],
                                y: [0, Math.random() * 100 - 50],
                            }}
                            transition={{
                                duration: Math.random() * 20 + 20, // Slower animation
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: 'reverse',
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="mb-10 md:mb-0 md:w-1/2">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                                    Manage Your Social Media <span className="text-purple-600">Smarter</span>, Not Harder
                                </h1>
                                <p className="text-muted-foreground mb-8 max-w-xl text-xl md:text-2xl">
                                    All your social networks in one place. Schedule posts, analyze performance, and grow your audience.
                                </p>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <Link href="/register">
                                        <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                                            Start Free Trial
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Link>
                                    <Link href="#features">
                                        <Button size="lg" variant="outline">
                                            Learn More
                                        </Button>
                                    </Link>
                                </div>

                                <div className="text-muted-foreground mt-8 flex items-center text-sm">
                                    <span>Trusted by 10,000+ marketers from</span>
                                    <div className="ml-4 flex space-x-4">
                                        <span className="font-semibold">Nike</span>
                                        <span className="font-semibold">Spotify</span>
                                        <span className="font-semibold">Airbnb</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="md:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="relative"
                            >
                                <DashboardPreview />

                                {/* Floating social media icons */}
                                <motion.div
                                    className="absolute top-1/4 -left-6 rounded-full bg-white p-3 shadow-lg dark:bg-gray-800"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                >
                                    <Instagram className="h-6 w-6 text-pink-500" />
                                </motion.div>
                                <motion.div
                                    className="absolute top-1/3 -right-6 rounded-full bg-white p-3 shadow-lg dark:bg-gray-800"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                >
                                    <TikTok />
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-6 left-1/4 rounded-full bg-white p-3 shadow-lg dark:bg-gray-800"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                                >
                                    <Facebook className="h-6 w-6 text-blue-600" />
                                </motion.div>
                                <motion.div
                                    className="absolute right-1/4 -bottom-6 rounded-full bg-white p-3 shadow-lg dark:bg-gray-800"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                                >
                                    <Youtube className="h-6 w-6 text-red-600" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" ref={featuresRef} className="bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful Features</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Everything you need to manage your social media presence effectively and efficiently.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="h-full border-none shadow-md transition-shadow duration-300 hover:shadow-xl">
                                    <CardContent className="p-6">
                                        <div className="mb-4">{feature.icon}</div>
                                        <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                                        <p className="text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20">
                        <div className="bg-card overflow-hidden rounded-xl border shadow-xl">
                            <div className="grid md:grid-cols-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible.features ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="flex flex-col justify-center p-8 md:p-12"
                                >
                                    <h3 className="mb-4 text-2xl font-bold md:text-3xl">Unified Dashboard for All Your Social Networks</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Connect all your social media accounts and manage them from a single, intuitive dashboard. Schedule posts,
                                        respond to comments, and track performance—all in one place.
                                    </p>
                                    <ul className="mb-8 space-y-3">
                                        {['Cross-platform publishing', 'Content calendar', 'Team collaboration', 'Performance tracking'].map(
                                            (item, i) => (
                                                <li key={i} className="flex items-center">
                                                    <CheckCircle className="mr-2 h-5 w-5 text-purple-600" />
                                                    <span>{item}</span>
                                                </li>
                                            ),
                                        )}
                                    </ul>
                                    <div>
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isVisible.features ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="flex items-center justify-center bg-purple-50 p-8 md:p-12 dark:bg-purple-900/20"
                                >
                                    <div className="w-full max-w-md">
                                        <DashboardPreview />
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Platform Comparison Section */}
            <section id="platforms" ref={platformsRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.platforms ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Supported Platforms</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Comprehensive tools for all major social media platforms in one integrated solution.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible.platforms ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <PlatformComparison />
                    </motion.div>
                </div>
            </section>
            

            {/* Pricing Section */}
            <section id="pricing" ref={pricingRef} className="bg-muted/30 py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.pricing ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Simple, Transparent Pricing</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Choose the plan that fits your needs. All plans include a 14-day free trial.
                            </p>
                        </motion.div>
                    </div>

                    <div className="mx-auto mb-16 max-w-3xl">
                        <PricingChart />
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible.pricing ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <Card
                                    className={`h-full ${plan.highlighted ? 'border-purple-500 shadow-lg shadow-purple-100 dark:shadow-none' : ''}`}
                                >
                                    {plan.highlighted && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-purple-600 px-4 py-1 text-sm font-medium text-white">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardContent className="p-6 pt-8">
                                        <div className="mb-6 text-center">
                                            <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                                            <div className="mb-2 text-3xl font-bold">
                                                {plan.price}
                                                <span className="text-muted-foreground text-base font-normal">/month</span>
                                            </div>
                                            <p className="text-muted-foreground">{plan.description}</p>
                                        </div>
                                        <div className="mb-8 space-y-4">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-center">
                                                    <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-purple-600" />
                                                    <span>{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <Button
                                            className={`w-full ${plan.highlighted ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                                            variant={plan.highlighted ? 'default' : 'outline'}
                                        >
                                            Get Started
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-muted-foreground mb-4">Need a custom plan for your enterprise?</p>
                        <Button variant="outline">Contact Sales</Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" ref={testimonialsRef} className="py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible.testimonials ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
                            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                                Join thousands of satisfied marketers who have transformed their social media strategy.
                            </p>
                        </motion.div>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <div className="relative h-80 md:h-64">
                            <AnimatePresence mode="wait">
                                {testimonials.map(
                                    (testimonial, index) =>
                                        activeTestimonial === index && (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5 }}
                                                className="absolute inset-0"
                                            >
                                                <Card className="flex h-full flex-col justify-center p-8 text-center md:p-10">
                                                    <p className="mb-6 text-lg italic md:text-xl">"{testimonial.content}"</p>
                                                    <div className="flex items-center justify-center">
                                                        <img
                                                            src={testimonial.image || '/logo.svg'}
                                                            alt={testimonial.name}
                                                            className="mr-4 h-12 w-12 rounded-full"
                                                        />
                                                        <div className="text-left">
                                                            <div className="font-semibold">{testimonial.name}</div>
                                                            <div className="text-muted-foreground text-sm">
                                                                {testimonial.role}, {testimonial.company}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </motion.div>
                                        ),
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 flex justify-center">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`mx-1 h-3 w-3 rounded-full ${activeTestimonial === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                                    aria-label={`View testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-purple-700 to-purple-500 py-20 text-white">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Transform Your Social Media Strategy?</h2>
                            <p className="mb-8 text-xl text-purple-100">
                                Join thousands of marketers and businesses who have already taken their social media to the next level.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link href="register">
                                    <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                                        Start Your Free Trial
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button size="lg" variant="outline" className="border-white text-gray-500 hover:bg-purple-700">
                                        Schedule a Demo
                                    </Button>
                                </Link>
                            </div>
                            <p className="mt-6 text-sm text-purple-200">No credit card required. 14-day free trial.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <Contact />
            {/* Footer */}
            <footer className="bg-background border-t py-12">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div>
                            <div className="mb-4 text-2xl font-bold text-purple-600">
                                <a href="/">Quick Post</a>
                            </div>
                            <p className="text-muted-foreground mb-4">The all-in-one social media management platform for businesses of all sizes.</p>
                            <div className="flex space-x-4">
                                <a href="https://www.youtube.com/" className="text-muted-foreground hover:text-purple-600">
                                    <Youtube className="h-5 w-5 text-red-600" />
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-purple-600">
                                    <Facebook className="h-5 w-5 text-blue-600" />
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-purple-600">
                                    <Instagram className="h-5 w-5 text-pink-500" />
                                </a>
                                <a href="#" className="text-muted-foreground hover:text-purple-600">
                                    <TikTok />
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#features" className="text-muted-foreground hover:text-purple-600">
                                        Features
                                    </a>
                                </li>
                                <li>
                                    <a href="#pricing" className="text-muted-foreground hover:text-purple-600">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#platforms" className="text-muted-foreground hover:text-purple-600">
                                        Integrations
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 font-semibold">privcy and Terms</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/terms" className="text-gray-600 hover:text-indigo-600">
                                        Terms
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="text-gray-600 hover:text-indigo-600">
                                        Privacy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="text-muted-foreground mt-12 border-t pt-8 text-center">
                        <p>© {new Date().getFullYear()} QuickPost. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
