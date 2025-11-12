import React, { useState } from 'react'

const BlogP = () => {
    const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "Rohan Sharma",
    date: "Nov 11, 2025",
    category: "React",
    thumbnail: "https://picsum.photos/600/400?1",
    content: `
React ek JavaScript library hai jo UI banane ke liye use hoti hai.
Is article me hum dekhenge ke components, props aur state kya hota hai.
    `,
    excerpt: "React ki basics samajhne ke liye yeh perfect guide hai."
  },
  {
    id: 2,
    title: "JavaScript ES6 Features Explained",
    author: "Priya Verma",
    date: "Nov 10, 2025",
    category: "JavaScript",
    thumbnail: "https://picsum.photos/600/400?2",
    content: `
ES6 ne JavaScript me bahut sare naye features add kiye jaise let, const, arrow functions, promises.
Yeh sab modern JS ka base hai.
    `,
    excerpt: "Modern JavaScript ko samajhne ke liye ES6 features zaroor seekho."
  },
  {
    id: 3,
    title: "Tailwind CSS for Beginners",
    author: "Amit Singh",
    date: "Nov 9, 2025",
    category: "CSS",
    thumbnail: "https://picsum.photos/600/400?3",
    content: `
Tailwind CSS ek utility-first CSS framework hai jisse styling bahut fast hoti hai.
Is article me hum tailwind ka setup aur basic classes dekhenge.
    `,
    excerpt: "Tailwind se styling 5x fast ho jati hai — beginner ke liye perfect."
  },
  {
    id: 4,
    title: "Node.js Basics You Must Know",
    author: "Neha Kapoor",
    date: "Nov 8, 2025",
    category: "Backend",
    thumbnail: "https://picsum.photos/600/400?4",
    content: `
Node.js server-side JavaScript runtime hai.
Yeh article tumhe Express, APIs aur server basics samjhaayega.
    `,
    excerpt: "Backend development start karne ke liye Node.js zaroor sikho."
  },
  {
    id: 5,
    title: "Understanding MongoDB Collections",
    author: "Rahul Mehta",
    date: "Nov 7, 2025",
    category: "Database",
    thumbnail: "https://picsum.photos/600/400?5",
    content: `
MongoDB ek NoSQL database hai jisme data documents ki form me store hota hai.
Collections aur documents ke basics is post me cover hai.
    `,
    excerpt: "NoSQL databases ka foundation samajhne ke liye yeh perfect guide hai."
  }
];

const [currentPost, setCurrentPost] = useState('')
const [selectPost,setSelectPost] = useState(null)

const click = (post) => {
    setPost('post')
    setOpen(post)
}

const back = () => {
   setPost('')
   setOpen(null) 
}

  return (
    <>
    <div className='text-center text-2xl p-1'>
        Blog Website
    </div>
    <div className='grid md:grid-cols-2 gap-8'>
    {
        blogPosts.map((post) => {
        <section 
        key={post.id}
        onClick={click(post)}></section>
        })
    }
    </div>
    </>
  )
}

export default BlogP
