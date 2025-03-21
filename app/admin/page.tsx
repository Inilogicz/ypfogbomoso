"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, onSnapshot } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Attendee {
  id: string;
  title: string;
  name: string;
  profession: string;
  mode: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  whatsapp: string;
  email: string;
  residence: string;
  skills: string;
}

export default function Admin() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "registrations"), (snapshot) => {
      const attendeesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Attendee[];
      setAttendees(attendeesList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Function to Export CSV
  const exportToCSV = () => {
    const headers = [
      "S/N,Title,Name,Profession,Participation Type,Gender,Marital Status,Phone,Whatsapp Group,Email,Residence,Skills",
    ];

    const rows = attendees.map((attendee, index) => 
      `${index + 1},"${attendee.title}","${attendee.name}","${attendee.profession}","${attendee.mode}","${attendee.gender}","${attendee.maritalStatus}","${attendee.phone}","${attendee.whatsapp}","${attendee.email}","${attendee.residence}","${attendee.skills || "N/A"}"`
    );

    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "attendees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ Function to Export PDF
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape", // Set to landscape mode
      unit: "mm",
      format: "a4",
    });
  
    doc.text("Relationship and Marriage Matters Registered Attendees", 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [
        [
          "S/N", "Title", "Name", "Profession", "Participation Type", 
          "Gender", "Marital Status", "Phone", "WhatsApp Group", 
          "Email", "Residence", "Skills"
        ]
      ],
      body: attendees.map((attendee, index) => [
        index + 1,
        attendee.title,
        attendee.name,
        attendee.profession,
        attendee.mode,
        attendee.gender,
        attendee.maritalStatus,
        attendee.phone,
        attendee.whatsapp,
        attendee.email,
        attendee.residence,
        attendee.skills || "N/A",
      ]),
      theme: "grid",
      styles: { fontSize: 9 },
      headStyles: { fillColor: [40, 167, 69] }, // Green color for header
      alternateRowStyles: { fillColor: [240, 240, 240] }, // Light gray for alternate rows
      margin: { top: 25 },
    });
  
    doc.save("attendees_list.pdf");
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans antialiased">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Relationship and Marriage Matters Registered Attendees
      </h1>

      {loading ? (
        <p className="text-center text-gray-900 font-medium">Loading...</p>
      ) : attendees.length === 0 ? (
        <p className="text-center text-gray-900 font-medium">No attendees registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-end mb-4 space-x-2">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-green-700 text-white font-semibold rounded hover:bg-green-800 transition"
            >
              Export to PDF
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
            >
              Export to CSV
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-green-700 text-white font-semibold">
              <tr>
                <th className="px-3 py-3 text-left border">S/N</th>
                <th className="px-3 py-3 text-left border">Title</th>
                <th className="px-3 py-3 text-left border">Name</th>
                <th className="px-3 py-3 text-left border">Profession</th>
                <th className="px-3 py-3 text-left border">Participation type</th>
                <th className="px-3 py-3 text-left border">Gender</th>
                <th className="px-3 py-3 text-left border">Marital Status</th>
                <th className="px-3 py-3 text-left border">Phone</th>
                <th className="px-3 py-3 text-left border">Whatsapp group</th>
                <th className="px-3 py-3 text-left border">Email</th>
                <th className="px-3 py-3 text-left border">Residence</th>
                <th className="px-3 py-3 text-left border">Skills</th>
              </tr>
            </thead>
            <tbody className="text-gray-900 font-medium">
              {attendees.map((attendee, index) => (
                <tr key={attendee.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-3 py-2 border text-center">{index + 1}</td>
                  <td className="px-3 py-2 border">{attendee.title}</td>
                  <td className="px-3 py-2 border">{attendee.name}</td>
                  <td className="px-3 py-2 border">{attendee.profession}</td>
                  <td className="px-3 py-2 border">{attendee.mode}</td>
                  <td className="px-3 py-2 border">{attendee.gender}</td>
                  <td className="px-3 py-2 border">{attendee.maritalStatus}</td>
                  <td className="px-3 py-2 border">{attendee.phone}</td>
                  <td className="px-3 py-2 border">{attendee.whatsapp}</td>
                  <td className="px-3 py-2 border">{attendee.email}</td>
                  <td className="px-3 py-2 border">{attendee.residence}</td>
                  <td className="px-3 py-2 border">{attendee.skills || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
