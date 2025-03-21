"use client";
import { useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    title: "Mr",
    name: "",
    profession: "",
    gender: "Male",
    maritalStatus: "Single",
    phone: "",
    residence: "",
    skills: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "registrations"), formData);
      router.push("/success");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Program Registration</h2>
        
        {/* Title */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Title *</label>
          <select name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Mr</option>
            <option>Mrs</option>
            <option>Miss</option>
          </select>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Name *</label>
          <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        {/* Profession */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Profession *</label>
          <input name="profession" value={formData.profession} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Marital Status *</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full p-2 border rounded">
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Phone Number *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        {/* Place of Residence */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Place of Residence *</label>
          <input name="residence" value={formData.residence} onChange={handleChange} required className="w-full p-2 border rounded" />
        </div>

        {/* Special Skills */}
        <div className="mb-4">
          <label className="block text-black-700 text-sm font-bold mb-2">Special Skills</label>
          <input name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
