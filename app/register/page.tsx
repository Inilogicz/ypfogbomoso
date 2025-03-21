"use client"
import { useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    profession: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    residence: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users"), formData);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/3 px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Title</label>
          <select name="title" value={formData.title} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3">
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
        </div>
        <div className="w-full md:w-2/3 px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3" type="text" placeholder="Full Name" required />
        </div>
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Profession</label>
          <input name="profession" value={formData.profession} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3" type="text" placeholder="Your Profession" required />
        </div>
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Marital Status</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3">
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Phone Number</label>
          <input name="phone" value={formData.phone} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3" type="tel" placeholder="123-456-7890" required />
        </div>
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Place of Residence</label>
          <input name="residence" value={formData.residence} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3" type="text" placeholder="City, Country" required />
        </div>
      </div>
      
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2">Special Skills</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} className="block w-full bg-gray-30 border border-green-50 rounded-30 py-2 px-3" placeholder="List your skills" required></textarea>
        </div>
      </div>
      
      <div className="w-full px-3">
        <button type="submit" className="w-full bg-green-500 text-white font-bold py-2 p50 rounded-30 hover:bg-green-600">Submit</button>
      </div>
    </form>
  );
}
