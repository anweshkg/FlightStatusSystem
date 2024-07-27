import { Suspense } from "react";
import SearchForm from "../../components/SearchForm";
import FlightResults from "../../components/FlightResults";

export default function Results({ searchParams }) {
  console.log(searchParams, "hehehe", searchParams.date);
  const date = searchParams.date;
  const source = searchParams.source;
  const destination = searchParams.destination;
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700">
        Flight Results
      </h1>
      <SearchForm initialValues={searchParams} />
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <FlightResults
            date={date}
            source={source}
            destination={destination}
          />
        </Suspense>
      </div>
    </div>
  );
}
