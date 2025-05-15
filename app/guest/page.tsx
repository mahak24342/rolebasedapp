"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Your Firebase Firestore instance
import { collection, getDocs } from "firebase/firestore";

interface Entry {
  id: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
}

export default function GuestPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const snapshot = await getDocs(collection(db, "entries"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Entry));
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center">Guest View - Entries</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading entries...</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-gray-600">No entries available.</p>
      ) : (
        <ul className="max-w-3xl mx-auto space-y-6">
          {entries.map(entry => (
            <li
              key={entry.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Address:</strong> {entry.address}</p>
              <p><strong>PIN:</strong> {entry.pin}</p>
              <p><strong>Phone:</strong> {entry.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
