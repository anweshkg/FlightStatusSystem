"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/register`,
        { email, password, phoneNumber }
      );
      localStorage.setItem("token", response.data.access_token);
      router.push("/profile");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8"
    >
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
      >
        Register
      </button>
    </form>
  );
}
