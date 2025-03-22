"use client";
import { useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    profession: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    email: "",
    residence: "",
    skills: "",
    mode:"",
    whatsapp:"",

  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submission

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "registrations"), formData);
      router.push("/success");
    } catch (error) {
      console.error("Error submitting form: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Program Registration</h2>
        
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Title *</label>
          <select 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          >
            <option value="" disabled>Select Title</option>
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Name *</label>
          <input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Profession */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Profession *</label>
          <input 
            name="profession" 
            value={formData.profession} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Gender *</label>
          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          >
            <option value="" disabled>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Audience Type *</label>
          <select 
            name="mode" 
            value={formData.gender} 
            onChange={handleChange} 
            required
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          >
            <option value="" disabled>Select Gender</option>
            <option>online</option>
            <option>Physical</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Marital Status *</label>
          <select 
            name="maritalStatus" 
            value={formData.maritalStatus} 
            onChange={handleChange} 
            required
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          >
            <option value="" disabled>Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Would you like to be aded to the YPF Ogbomoso whatsapp group? *</label>
          <select 
            name="whatsapp" 
            value={formData.maritalStatus} 
            onChange={handleChange} 
            required
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          >
            <option value="" disabled>Select Status</option>
            <option>Yes</option>
            <option>No</option>
            <option>Already added</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Phone Number *</label>
          <input 
            name="phone" 
            type="tel"
            value={formData.phone} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Email *</label>
          <input 
            name="email" 
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Place of Residence */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">Place of Residence *</label>
          <input 
            name="residence" 
            value={formData.residence} 
            onChange={handleChange} 
            required 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Special Skills */}
        <div className="mb-4">
          <label className="block text-gray-800 text-sm font-semibold mb-1">
            Special Skills (e.g. baking, sewing, etc.)
          </label>
          <input 
            name="skills" 
            value={formData.skills} 
            onChange={handleChange} 
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded text-gray-900"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded transition duration-300 
          ${isSubmitting ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 text-white"}`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
