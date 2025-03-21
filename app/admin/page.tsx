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

  // Function to export table as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Registered Attendees", 14, 10);

    const tableColumn = [
      "S/N",
      "Title",
      "Name",
      "Profession",
      "Gender",
      "Marital Status",
      "Phone",
      "Email",
      "Residence",
      "Skills",
    ];
    const tableRows = attendees.map((attendee, index) => [
      index + 1,
      attendee.title,
      attendee.name,
      attendee.profession,
      attendee.gender,
      attendee.maritalStatus,
      attendee.phone,
      attendee.email,
      attendee.residence,
      attendee.skills || "N/A",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("Registered_Attendees.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-4 text-center">
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

          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-2 text-left">S/N</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Profession</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Marital Status</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Residence</th>
                <th className="px-4 py-2 text-left">Skills</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee, index) => (
                <tr
                  key={attendee.id}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{attendee.title}</td>
                  <td className="px-4 py-2 border">{attendee.name}</td>
                  <td className="px-4 py-2 border">{attendee.profession}</td>
                  <td className="px-4 py-2 border">{attendee.gender}</td>
                  <td className="px-4 py-2 border">{attendee.maritalStatus}</td>
                  <td className="px-4 py-2 border">{attendee.phone}</td>
                  <td className="px-4 py-2 border">{attendee.email}</td>
                  <td className="px-4 py-2 border">{attendee.residence}</td>
                  <td className="px-4 py-2 border">{attendee.skills || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
