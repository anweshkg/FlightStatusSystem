"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileForm() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscribedFlights, setSubscribedFlights] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setSubscribedFlights(response.data.subscribedFlights || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/profile`,
        { email, phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUnsubscribe = async (flightId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/unsubscribe/${flightId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubscribedFlights(
        subscribedFlights.filter((flight) => flight.id !== flightId)
      );
      alert("Unsubscribed successfully");
    } catch (error) {
      console.error("Error unsubscribing:", error);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <form onSubmit={handleUpdate}>
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
          Update Profile
        </button>
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Subscribed Flights</h3>
        {subscribedFlights.length > 0 ? (
          <ul className="space-y-2">
            {subscribedFlights.map((flight) => (
              <li
                key={flight.id}
                className="bg-gray-100 p-3 rounded-md flex justify-between items-center"
              >
                <span>
                  {flight.flightNumber} - {flight.airline}
                </span>
                <button
                  onClick={() => handleUnsubscribe(flight.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-200"
                >
                  Unsubscribe
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            You haven't subscribed to any flights yet.
          </p>
        )}
      </div>
    </div>
  );
}
