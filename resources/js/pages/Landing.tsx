import React from 'react';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function Landing() {
    return (
        <>
            <Head title="Quickpost - Social Media Management Made Easy" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-indigo-600">Quickpost</div>
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
                            <Link href="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Sign Up</Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="container mx-auto px-6 py-16">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Manage All Your Social Media in One Place
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                            Schedule posts, analyze performance, and grow your audience across multiple platforms with Quickpost.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700">
                                Get Started Free
                            </Link>
                            <Link href="#features" className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="text-indigo-600 text-4xl mb-4">📅</div>
                            <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
                            <p className="text-gray-600">Schedule your posts across multiple platforms at optimal times.</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="text-indigo-600 text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                            <p className="text-gray-600">Track performance and get insights to grow your audience.</p>
                        </div>
                        <div className="p-6 bg-white rounded-xl shadow-sm">
                            <div className="text-indigo-600 text-4xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold mb-2">AI Content</h3>
                            <p className="text-gray-600">Generate engaging content with AI assistance.</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-50 py-8">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="text-gray-600">© 2024 Quickpost. All rights reserved.</div>
                            <div className="flex space-x-6 mt-4 md:mt-0">
                                <Link href="/terms" className="text-gray-600 hover:text-indigo-600">Terms</Link>
                                <Link href="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
} 