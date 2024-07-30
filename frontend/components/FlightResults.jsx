"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { format } from "date-fns";

export default function FlightResults({ date, source, destination }) {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchFlights();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [date, source, destination]);

  const fetchFlights = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/flights`,
        {
          params: { date, source, destination },
        }
      );
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
      toast.error("Failed to fetch flights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscription = async (flightId, action) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const endpoint = action === "subscribe" ? "subscribe" : "unsubscribe";
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/flights/${endpoint}/${flightId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Successfully ${action}d to the flight`);
    } catch (error) {
      console.error(`Error ${action}ing to flight:`, error);
      toast.error(`Failed to ${action} to the flight. Please try again.`);
    }
  };

  const handleDelayUpdate = async (flightId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/flights/update-delay/${flightId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Flight delay updated successfully");
      fetchFlights();
    } catch (error) {
      console.error("Error updating flight delay:", error);
      toast.error("Failed to update flight delay. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">
        Flights from {source || "anywhere"} to {destination || "anywhere"}
        {date && ` on ${format(new Date(date), "PPP")}`}
      </h2>
      {flights.map((flight) => (
        <div
          key={flight.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-700">
              {flight.airline}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                flight.status === "On Time"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {flight.status}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium">Flight Number:</p>
              <p>{flight.flightNumber}</p>
            </div>
            <div>
              <p className="font-medium">Delay:</p>
              <p>{flight.delay ? `${flight.delay} mins` : "No Delay"}</p>
            </div>
            <div>
              <p className="font-medium">Source:</p>
              <p>{flight.source}</p>
            </div>
            <div>
              <p className="font-medium">Destination:</p>
              <p>{flight.destination}</p>
            </div>
            <div>
              <p className="font-medium">Departure:</p>
              <p>{format(new Date(flight.departureTime), "PPPpp")}</p>
            </div>
            <div>
              <p className="font-medium">Arrival:</p>
              <p>{format(new Date(flight.arrivalTime), "PPPpp")}</p>
            </div>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => handleSubscription(flight.id, "subscribe")}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
            >
              Subscribe
            </button>
            <button
              onClick={() => handleSubscription(flight.id, "unsubscribe")}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
            >
              Unsubscribe
            </button>
            {user && user.role === 'admin' && (
              <button
                onClick={() => handleDelayUpdate(flight.id)}
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200"
              >
                Update Delay
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
