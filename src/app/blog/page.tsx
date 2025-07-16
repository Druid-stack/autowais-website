import { blogPosts, getAllCategories } from '@/data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

export default function Blog() {
    const categories = getAllCategories();
    return (
        <main className="pt-20 relative overflow-hidden">
            {/* Background Animation */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-24 sm:py-32 relative">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Technology Insights
                            <span className="gradient-text"> & Innovation</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Stay ahead of the curve with expert insights on technology trends, best practices,
                            and innovation strategies that drive business transformation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-white border-b">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-medium">
                            All Posts
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-24 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3">
                        {blogPosts.map((post) => (
                            <article key={post.id} className="group">
                                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 hover:scale-105">
                                    {/* Blog Image - Using actual images instead of emoji placeholders */}
                                    <div className="aspect-video relative overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="p-6">
                                        {/* Category and Read Time */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                {post.category}
                                            </span>
                                            <span className="text-sm text-gray-500">{post.readTime}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                            <Link href={`/blog/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        {/* Author and Date */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                    <span className="text-emerald-600 text-xs font-bold">
                                                        {post.author.charAt(0)}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                    <p className="text-xs text-gray-500">{post.date}</p>
                                                </div>
                                            </div>

                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
                                            >
                                                Read more →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
} 