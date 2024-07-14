'use client'
import React,{useState} from 'react';
import axios from 'axios'
import { useRouter } from "next/navigation";
import Link from 'next/link';

const LoginPage = () => {

    const [user, setUser] = useState({
        username:"",
        email: "",
        password: "",
      });
    
    const router = useRouter()

    const [loadning,setLoading] = useState(false)

    const handleLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/sign-up", user);
            console.log("Signup data", response.data);
            router.push("/preferences");
          } catch (error: any) {
            console.log("Signup failed", error.message);
          } finally {
            setLoading(false);
          }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{loadning ? "Processing" : "Sign Up"}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Username">
              Username
            </label>
            <input
              type="username"
              id="username"
              placeholder="Enter your username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleLogin}
            >
              Sign In
            </button>
            <Link href="/forgotpassword" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
            </Link>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
