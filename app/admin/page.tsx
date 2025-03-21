"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Attendee {
  id: string;
  title: string;
  name: string;
  profession: string;
  gender: string;
  maritalStatus: string;
  phone: string;
  email: string;
  residence: string;
  skills: string;
}

export default function Admin() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const attendeesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Attendee[];
        setAttendees(attendeesList);
      } catch (error) {
        console.error("Error fetching attendees: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, []);

  // Export Table as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Registered Attendees", 14, 10);

    const tableColumn = [
      "S/N",
      "Title",
      "Name",
      "Email",
      "Profession",
      "Gender",
      "Marital Status",
      "Phone",
      "Residence",
      "Skills",
    ];
    const tableRows = attendees.map((attendee, index) => [
      index + 1,
      attendee.title,
      attendee.name,
      attendee.email,
      attendee.profession,
      attendee.gender,
      attendee.maritalStatus,
      attendee.phone,
      attendee.residence,
      attendee.skills || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 10 }, // S/N
        1: { cellWidth: 20 }, // Title
        2: { cellWidth: 35 }, // Name
        3: { cellWidth: 40 }, // Profession
        4: { cellWidth: 20 }, // Gender
        5: { cellWidth: 30 }, // Marital Status
        6: { cellWidth: 30 }, // Phone
        7: { cellWidth: 30 }, // Email
        8: { cellWidth: 40 }, // Residence
        9: { cellWidth: 40 }, // Skills
      },
      margin: { top: 30 },
    });

    doc.save("Registered_Attendees.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Registered Attendees
      </h1>

      {loading ? (
        <p className="text-center text-gray-700">Loading...</p>
      ) : attendees.length === 0 ? (
        <p className="text-center text-gray-700">
          No attendees registered yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          {/* Export Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={exportPDF}
              className="px-4 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800"
            >
              Export to PDF
            </button>
          </div>

          {/* Table */}
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-3 py-2 text-left border">S/N</th>
                <th className="px-3 py-2 text-left border">Title</th>
                <th className="px-3 py-2 text-left border">Name</th>
                <th className="px-3 py-2 text-left border">Profession</th>
                <th className="px-3 py-2 text-left border">Gender</th>
                <th className="px-3 py-2 text-left border">Marital Status</th>
                <th className="px-3 py-2 text-left border">Phone</th>
                <th className="px-3 py-2 text-left border">Email</th>
                <th className="px-3 py-2 text-left border">Residence</th>
                <th className="px-3 py-2 text-left border">Skills</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr
                  key={attendee.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-3 py-2 border text-center">{index + 1}</td>
                  <td className="px-3 py-2 border">{attendee.title}</td>
                  <td className="px-3 py-2 border">{attendee.name}</td>
                  <td className="px-3 py-2 border">{attendee.profession}</td>
                  <td className="px-3 py-2 border">{attendee.gender}</td>
                  <td className="px-3 py-2 border">{attendee.maritalStatus}</td>
                  <td className="px-3 py-2 border">{attendee.phone}</td>
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
