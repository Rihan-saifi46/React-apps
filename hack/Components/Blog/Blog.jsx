import React, { useState } from 'react';
import { Home, BookOpen, User } from 'lucide-react';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Sarah Johnson",
    date: "Nov 10, 2025",
    excerpt: "Learn the basics of React and start building modern web applications with components, props, and state.",
    content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals including components, JSX, props, and state management. React makes it easy to create interactive UIs by breaking down your application into reusable components.",
    category: "Tutorial",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Understanding JavaScript ES6",
    author: "Mike Chen",
    date: "Nov 8, 2025",
    excerpt: "Explore modern JavaScript features like arrow functions, destructuring, and template literals.",
    content: "ES6 introduced many powerful features that make JavaScript more elegant and easier to write. Arrow functions provide a concise syntax, destructuring allows you to extract values from objects and arrays easily, and template literals make string interpolation simple.",
    category: "JavaScript",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox",
    author: "Emily Rodriguez",
    date: "Nov 5, 2025",
    excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.",
    content: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Flexbox is great for one-dimensional layouts (rows or columns), while Grid excels at two-dimensional layouts. Understanding when to use each will make you a more effective developer.",
    category: "CSS",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Building Your First API",
    author: "David Kim",
    date: "Nov 2, 2025",
    excerpt: "Step-by-step guide to creating a RESTful API with Node.js and Express.",
    content: "Creating an API is an essential skill for modern web development. In this tutorial, we'll build a simple REST API using Node.js and Express. You'll learn about routing, middleware, and handling HTTP requests and responses.",
    category: "Backend",
    readTime: "10 min read"
  }
];

export default function Blog() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentPage('post');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">DevBlog</h1>
            <nav className="flex gap-6">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <BookOpen size={20} />
                <span>Articles</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
                <User size={20} />
                <span>About</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to DevBlog
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover tutorials, tips, and insights about web development
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
                  onClick={() => handlePostClick(post)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'post' && selectedPost && (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={handleBackToHome}
              className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to all posts
            </button>
            <article className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {selectedPost.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b">
                <span className="font-medium">{selectedPost.author}</span>
                <span>•</span>
                <span>{selectedPost.date}</span>
                <span>•</span>
                <span>{selectedPost.readTime}</span>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedPost.content}
                </p>
                <p className="text-gray-700 leading-relaxed text-lg mt-4">
                  This is a sample blog post. In a real application, you would have much more content here, 
                  possibly with images, code snippets, and multiple paragraphs of detailed information.
                </p>
              </div>
            </article>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2025 DevBlog. Built with React for beginners.</p>
        </div>
      </footer>
    </div>
  );
}