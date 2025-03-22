"use client";
import Link from "next/link";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-green-600 mb-4">Registration Successful! 🎉</h2>
        <p className="text-gray-700 mb-6">Thank you for registering! We’re excited to have you at the event.</p>

        <a
          href="/Order%20of%20Programmes%20-%20Relationship%20and%20Marriage%20Matters,%2022nd%20March,%202025.pdf"
          download
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Download Programme Sheet
        </a>

        <div className="mt-4">
          <Link href="/">
            <span className="text-blue-500 hover:underline cursor-pointer">Go back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
