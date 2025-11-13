import React, { createContext, useContext, useState, useEffect } from 'react';
import { Home, BookOpen, User, Plus, Edit2, Trash2, Save, X } from 'lucide-react';

// Blog Context
const BlogContext = createContext();

const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
};

// Blog Provider Component
const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      author: "Sarah Johnson",
      date: "Nov 10, 2025",
      excerpt: "Learn the basics of React and start building modern web applications with components, props, and state.",
      content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the fundamentals including components, JSX, props, and state management.",
      category: "Tutorial",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding JavaScript ES6",
      author: "Mike Chen",
      date: "Nov 8, 2025",
      excerpt: "Explore modern JavaScript features like arrow functions, destructuring, and template literals.",
      content: "ES6 introduced many powerful features that make JavaScript more elegant and easier to write. Arrow functions provide a concise syntax, destructuring allows you to extract values from objects and arrays easily.",
      category: "JavaScript",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      author: "Emily Rodriguez",
      date: "Nov 5, 2025",
      excerpt: "A comprehensive guide to choosing between CSS Grid and Flexbox for your layouts.",
      content: "Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Flexbox is great for one-dimensional layouts, while Grid excels at two-dimensional layouts.",
      category: "CSS",
      readTime: "6 min read"
    }
  ]);

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);

  // Create
  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPosts([newPost, ...posts]);
  };

  // Update
  const updatePost = (id, updatedPost) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
  };

  // Delete
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    if (selectedPost?.id === id) {
      setSelectedPost(null);
      setCurrentPage('home');
    }
  };

  // Navigation
  const navigateTo = (page, post = null) => {
    setCurrentPage(page);
    setSelectedPost(post);
  };

  return (
    <BlogContext.Provider value={{
      posts,
      currentPage,
      selectedPost,
      addPost,
      updatePost,
      deletePost,
      navigateTo
    }}>
      {children}
    </BlogContext.Provider>
  );
};

// Header Component
const Header = () => {
  const { navigateTo } = useBlog();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 
            className="text-3xl font-bold text-gray-900 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            DevBlog
          </h1>
          <nav className="flex gap-6">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => navigateTo('create')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <Plus size={20} />
              <span>Create Post</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
              <User size={20} />
              <span>About</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Post Card Component
const PostCard = ({ post }) => {
  const { navigateTo, deletePost } = useBlog();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigateTo('edit', post);
  };

  return (
    <article
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
      onClick={() => navigateTo('post', post)}
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
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Home Page Component
const HomePage = () => {
  const { posts } = useBlog();

  return (
    <div>
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to DevBlog
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover tutorials, tips, and insights about web development
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Create your first post!</p>
        </div>
      )}
    </div>
  );
};

// Post Detail Component
const PostDetail = () => {
  const { selectedPost, navigateTo, deletePost } = useBlog();

  if (!selectedPost) return null;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(selectedPost.id);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => navigateTo('home')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
      >
        ← Back to all posts
      </button>
      <article className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {selectedPost.category}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => navigateTo('edit', selectedPost)}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded transition"
            >
              <Edit2 size={18} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
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
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
            {selectedPost.content}
          </p>
        </div>
      </article>
    </div>
  );
};

// Post Form Component (Create/Edit)
const PostForm = ({ isEdit = false }) => {
  const { selectedPost, addPost, updatePost, navigateTo } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    readTime: '',
    excerpt: '',
    content: ''
  });

  useEffect(() => {
    if (isEdit && selectedPost) {
      setFormData({
        title: selectedPost.title,
        author: selectedPost.author,
        category: selectedPost.category,
        readTime: selectedPost.readTime,
        excerpt: selectedPost.excerpt,
        content: selectedPost.content
      });
    }
  }, [isEdit, selectedPost]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.author || !formData.category || !formData.readTime || !formData.excerpt || !formData.content) {
      alert('Please fill in all fields');
      return;
    }
    
    if (isEdit) {
      updatePost(selectedPost.id, formData);
    } else {
      addPost(formData);
    }
    
    navigateTo('home');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button
          onClick={() => navigateTo('home')}
          className="text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter post title"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Tutorial, JavaScript"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time *
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 5 min read"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief summary of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your post content here..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Save size={20} />
              {isEdit ? 'Update Post' : 'Create Post'}
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
        <p>© 2025 DevBlog. Dynamic Blog with CRUD Operations & Context API</p>
      </div>
    </footer>
  );
};

// Main Router Component
const Router = () => {
  const { currentPage } = useBlog();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'post' && <PostDetail />}
      {currentPage === 'create' && <PostForm />}
      {currentPage === 'edit' && <PostForm isEdit={true} />}
    </main>
  );
};

// Main App Component
export default function App() {
  return (
    <BlogProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Router />
        <Footer />
      </div>
    </BlogProvider>
  );
}