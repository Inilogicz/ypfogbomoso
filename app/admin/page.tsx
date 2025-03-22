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

  // Export Table as PDF
  const exportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    doc.setFontSize(11);
    doc.text("Registered Attendees", 14, 10);

    const tableColumn = [
      "S/N", "Title", "Name", "Profession", "Participation type", "Gender",
      "Marital Status", "Phone", "Whatsapp group", "Email", "Residence", "Skills"
    ];
    const tableRows = attendees.map((attendee, index) => [
      index + 1, attendee.title, attendee.name, attendee.profession, attendee.mode,
      attendee.gender, attendee.maritalStatus, attendee.phone, attendee.whatsapp,
      attendee.email, attendee.residence, attendee.skills || "N/A"
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      theme: "grid",
      margin: { top: 30 },
      didDrawPage: function () {
        doc.text(
          `Page ${doc.getNumberOfPages()}`,
          doc.internal.pageSize.width - 10,
          doc.internal.pageSize.height - 10
        );
      },
    });

    doc.save("Registered_Attendees.pdf");
  };

  // Export as CSV
  const exportCSV = () => {
    const headers = ["S/N", "Title", "Name", "Profession", "Participation type", "Gender", "Marital Status", "Phone", "Whatsapp group", "Email", "Residence", "Skills"];
    const csvRows = attendees.map((attendee, index) => [
      index + 1,
      attendee.title,
      attendee.name,
      attendee.profession,
      attendee.mode,
      attendee.gender,
      attendee.maritalStatus,
      `\"${attendee.phone}\"`, // Ensuring phone numbers are treated as text
      attendee.whatsapp,
      attendee.email,
      attendee.residence,
      attendee.skills || "N/A",
    ]);

    const csvContent = [headers, ...csvRows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Registered_Attendees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Relationship and Marriage Matters Registered Attendees
      </h1>

      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : attendees.length === 0 ? (
        <p className="text-center text-gray-700">No attendees registered yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-end mb-4 space-x-2">
            <button
              onClick={exportPDF}
              className="px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800"
            >
              Export to PDF
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-blue-700 text-white font-bold rounded hover:bg-blue-800"
            >
              Export to CSV
            </button>
          </div>

          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-3 py-2 text-left border">S/N</th>
                <th className="px-3 py-2 text-left border">Title</th>
                <th className="px-3 py-2 text-left border">Name</th>
                <th className="px-3 py-2 text-left border">Profession</th>
                <th className="px-3 py-2 text-left border">Participation type</th>
                <th className="px-3 py-2 text-left border">Gender</th>
                <th className="px-3 py-2 text-left border">Marital Status</th>
                <th className="px-3 py-2 text-left border">Phone</th>
                <th className="px-3 py-2 text-left border">Whatsapp group</th>
                <th className="px-3 py-2 text-left border">Email</th>
                <th className="px-3 py-2 text-left border">Residence</th>
                <th className="px-3 py-2 text-left border">Skills</th>
              </tr>
            </thead>
            <tbody>
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
