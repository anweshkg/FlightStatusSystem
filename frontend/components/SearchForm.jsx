"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchForm({ initialValues = {} }) {
  const router = useRouter();

  // Calculate dates
  const calculateDates = () => {
    const today = new Date();
    const formatDate = (date) =>
      date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    return [
      { label: "Select a date", date: "" },
      { label: `Yesterday (${formatDate(new Date(today.getTime() - 86400000))})`, date: new Date(today.getTime() - 86400000).toISOString().split('T')[0] },
      { label: `Today (${formatDate(today)})`, date: today.toISOString().split('T')[0] },
      { label: `Tomorrow (${formatDate(new Date(today.getTime() + 86400000))})`, date: new Date(today.getTime() + 86400000).toISOString().split('T')[0] },
      { label: formatDate(new Date(today.getTime() + 172800000)), date: new Date(today.getTime() + 172800000).toISOString().split('T')[0] },
      { label: formatDate(new Date(today.getTime() + 259200000)), date: new Date(today.getTime() + 259200000).toISOString().split('T')[0] }
    ];
  };

  const [dates, setDates] = useState(calculateDates());
  const [selectedDate, setSelectedDate] = useState(initialValues.date || "");
  const [source, setSource] = useState(initialValues.source || "");
  const [destination, setDestination] = useState(initialValues.destination || "");

  useEffect(() => {
    // Recalculate dates when the component mounts or when the date changes
    setDates(calculateDates());
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      ...(selectedDate && { date: selectedDate }),
      ...(source && { source }),
      ...(destination && { destination }),
    }).toString();
    console.log(searchParams,);
    router.push(`/results?${searchParams}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-4"
    >
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1 space-y-1">
          <label htmlFor="source" className="text-sm font-medium text-gray-700">
            Source
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter departure city"
          />
        </div>
        <div className="flex flex-col flex-1 space-y-1">
          <label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter arrival city"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col flex-1 space-y-1">
          <label htmlFor="date" className="text-sm font-medium text-gray-700">
            Date
          </label>
          <div className="relative">
            <select
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {dates.map((option, index) => (
                <option key={index} value={option.date}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
          >
            Search Flights
          </button>
        </div>
      </div>
    </form>
  );
}