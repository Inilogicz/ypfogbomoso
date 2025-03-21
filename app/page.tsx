import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center text-center p-6">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-green-800 text-white shadow-md">
        <Image src="/ypflogo.png" alt="Event Logo" width={60} height={60} className="rounded-full" />
        <h1 className="text-lg font-bold">Young Professional Forum</h1>
      </nav>

      {/* Hero Section */}
      <div className="w-full max-w-4xl my-8">
        <Image src="/ypfMAIN.jpg" alt="Event Banner" width={800} height={600} className="rounded-lg shadow-lg" />
      </div>

      {/* Welcome Message */}
      <section className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-green-700">Welcome in the Precious Name of Our Lord Jesus Christ!</h2>
        <p className="text-gray-700 mt-4">
          We’re thrilled to have you join us for this life-changing experience. Kindly take a minute to fill out the
          registration form. Your input is invaluable, and we appreciate your cooperation.
        </p>
        <p className="text-green-600 mt-2 font-semibold">Thank you, and may God richly bless you.</p>
      </section>

      {/* Registration Button */}
      <div className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md hover:bg-green-700">
        <Link href="/register" >
         
            Register Now
          
        </Link>
      </div>
    </div>
  );
}
