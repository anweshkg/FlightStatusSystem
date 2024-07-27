"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialValues = {} }) {
  const [date, setDate] = useState(initialValues.date || "");
  const [source, setSource] = useState(initialValues.source || "");
  const [destination, setDestination] = useState(
    initialValues.destination || ""
  );
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      date,
      source,
      destination,
    }).toString();
    router.push(`/results?${searchParams}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8"
    >
      <div className="mb-6">
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="source"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Source
        </label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter departure city"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="destination"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Destination
        </label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter arrival city"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
      >
        Search Flights
      </button>
    </form>
  );
}
