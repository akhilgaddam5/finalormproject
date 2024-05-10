"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseconfig";

export default function Page() {
  const [token, setToken] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user
          .getIdToken()
          .then((idToken) => {
            fetchUsers();
            setToken(idToken); // Set the token in state
          })
          .catch((error) => {
            console.error("Error getting ID token:", error);
          });
      } else {
        setToken(null); // No user signed in, set token to null
      }
    });

    return () => unsubscribe();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User created successfully!");
        window.location.reload();
      } else {
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className>
      <p className="bg-gray-800 text-white font-bold">Homepage</p>
      {token && <p  className="w-3/4 overflow-x-hidden mx-10 mb-5">Token: {token}</p>}
       <div className="mx-auto w-1/2">
       <a href="/currencies" className="text-center px-3 py-3 mx-2 my-10 bg-gray-800 text-white">VIEW DATA FROM EXTERNAL API HERE</a>
       </div>
      <div className="bg-white mx-20">
        <div class="grid grid-cols-2 gap-4 pt-5 bg-white shadow-md mt-3">
          <div>
            <p className="font-bold text-2xl px-2">Create New USER</p>
            <form onSubmit={handleSubmit} className="border py-5 px-5">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="block w-full p-2.5 border my-3 rounded"
              required
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="block w-full p-2.5 border my-3 rounded"
              required
              value={formData.lastname}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="block w-full p-2.5 my-3 border rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
            <button type="submit" className="block w-full p-2.5 bg-gray-800 text-white">Create User</button>
          </form>
          </div>
          <div>
            <p className="font-bold text-2xl">Available Users</p>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead  className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr className="bg-white border-b">
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">First Name</th>
                  <th scope="col" className="px-6 py-3">Last Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="bg-white border-b" key={user.id}>
                    <td className="py-2">{user.id}</td>
                    <td className="py-2">{user.firstname}</td>
                    <td className="py-2">{user.lastname}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="border py-3 mx-2rounded bg-gray-800 text-white">
                      <a href={`/home/posts/${user.id}`}>See Post by this user</a>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
       
      </div>
      
    </div>
  );
}
