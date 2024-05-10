"use client"
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react';

export default function Posts() {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/posts`);
            if (response.ok) {
                const data = await response.json();
                const filteredPosts = data.filter(post => post.authorId === Number(id));
                setComments(filteredPosts);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ authorId: id, content }),
            });
            if (response.ok) {
                fetchPosts();
                setContent('');
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div>
            <p className='bg-gray-800 text-white py-3'>Available Posts</p>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleSubmit} className='pt-3'>
                    <label htmlFor="content">Create A Post For this User</label>
                    <input
                        type="text"
                        id="content"
                        className='border-2 w-full block py-8 rounded required px-5'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button type="submit" className='w-1/2 bg-gray-800 text-white font-bold mt-3 py-2 rounded-md'>Submit</button>
                </form>
                <div>
                    <h3 className='text-2xl text-bold text-underline'>Comments:</h3>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>
                                <div className='w-full pt-2 pb-4 mx-2 my-3 px- border shadow-lg'>
                                    {comment.content}
                                    <p className='mt-4 mx-3'>Created at {comment.createdAt}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}
