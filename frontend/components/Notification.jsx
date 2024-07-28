"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Bell, Clock, Plane } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchNotifications(token);
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchNotifications = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to fetch notifications. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      if (error.response && error.response.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        <Bell className="inline-block mr-2" />
        Notifications
      </h1>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No notifications found.</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="bg-white shadow-lg rounded-lg p-6 transition duration-300 ease-in-out hover:shadow-xl"
            >
              <p className="font-semibold text-lg text-gray-800 mb-2">
                {notification.message}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p className="flex items-center">
                  <Clock className="inline-block mr-2" size={16} />
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                <p className="flex items-center">
                  <Plane className="inline-block mr-2" size={16} />
                  Flight ID: {notification.flightId}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}