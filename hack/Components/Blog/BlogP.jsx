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
];

const [currentPost, setCurrentPost] = useState('home')
const [selectPost,setSelectPost] = useState(null)

const click = (post) => {
    setCurrentPost('post')
    setSelectPost(post)
}

const back = () => {
   setCurrentPost('home')
   setSelectPost(null) 
}

  return (
    <>
    <div className='text-center text-2xl p-1'>
        Blog Website
    </div>
    {
     currentPost==='home' && (    
   <>
     <div>
      <p>Welcome to BLog</p>
     </div>


    <div className='grid md:grid-cols-2 gap-8'>
    {
        blogPosts.map((post) => (
        <section className='border-2 rounded bg-white '
        key={post.id}
        onClick={() => click(post)}>
          <span>{post.category}</span>
          <span>{post.author}</span>
          <p>{post.title}</p>
          <p>{post.excerpt}</p>
        </section>
        ))
    }
    
    </div> 
    
   </>
   )
}
{
        currentPost==='post' && selectPost && (
         <div >
          <button onClick={back}>Back to home</button>
          <div>
            <span>{selectPost.title}</span>
            <p>{selectPost.content}</p>
          </div>
         </div>
        )
    }
    </>
  )
}

export default BlogP
