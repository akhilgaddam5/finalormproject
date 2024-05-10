"use client"
import React, { useState } from 'react';
import { auth } from '../firebaseconfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]=useState('');
  const handleRegister = async (e) => {
    e.preventDefault();
    if(email.length<8)
      {
        setError("Password must be 8 Characters Long");
        return;
      }
    try {
      await createUserWithEmailAndPassword(auth,email,password);
      console.log('User registered:');
      setEmail("");
      setPassword("");
      router.push('/home');
    } catch (error) {
      console.log(error);
      setError("An error Occured During Registration,try a different email")
    }
  };

  return (
    <main className="flex min-h-screen flex-col  justify-between px-24">
      <p>{error}</p>
      <h2 className='font-bold text-center mt-2'>Create an Account to use this app</h2>
      <section className="nodark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow nodark:border md:mt-0 sm:max-w-md xl:p-0 nodark:bg-gray-800 nodark:border-gray-700">
            <div className="px-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl nodark:text-white">
                Create an Account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" placeholder="akhil@gmail.com" required/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 nodark:text-white">Password</label>
                  <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 nodark:bg-gray-700 nodark:border-gray-600 nodark:placeholder-gray-400 nodark:text-white nodark:focus:ring-blue-500 nodark:focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full text-white bg-gray-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center nodark:bg-primary-600 nodark:hover:bg-primary-700 nodark:focus:ring-primary-800">Sign Up</button>
                <p className="text-sm font-light text-gray-500 nodark:text-gray-400">
                  Already have an account? Login <a href="/" className="font-medium text-primary-600 hover:underline nodark:text-primary-500">Back to Signin</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
