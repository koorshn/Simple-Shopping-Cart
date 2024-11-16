import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex items-center justify-center  min-h-screen bg-gray-900">
      <div className="bg-gray-800  p-10 rounded-lg shadow-lg text-center transform transition duration-500">
        <h1 className="text-4xl font-bold text-white mb-6">
          Welcome to Our Shop
        </h1>
        <p className="mb-6 text-gray-300">
          Discover an amazing range of products tailored just for you.
        </p>
        <div className="flex w-full justify-center">
          <Link
            className=" bg-blue-600 hover:bg-blue-500 text-white w-32 py-3 rounded-lg transition duration-200"
            href="/dashboard"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
