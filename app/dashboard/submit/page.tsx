import Link from "next/link";
import React from "react";

export default function SubmitedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center transform transition duration-500">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Thank You!</h1>
        <p className="mb-4 text-lg text-gray-700">
          We appreciate your business and are grateful for the trust you’ve
          placed in us.
        </p>
        <p className="mb-8 text-lg text-gray-700">
          this was a simple project from
        </p>
        <p className="mb-8 text-lg text-gray-700">Koorosh Nirromand</p>
        <div className="mt-8 flex">
          <Link
            href="/"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
