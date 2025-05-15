"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Your Firebase initialization file
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Entry {
  id: string;
  name: string;
  address: string;
  pin: string;
  phone: string;
}

export default function AdminPage() {
  const [form, setForm] = useState({ name: "", address: "", pin: "", phone: "" });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controlled input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fetch entries from Firestore
  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const snapshot = await getDocs(collection(db, "entries"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Entry));
      setEntries(data);
    } catch (err) {
      setError("Failed to fetch entries");
      console.error(err);
    }
    setLoading(false);
  };

  // Validate form fields - simple example
  const isFormValid = () => {
    return form.name.trim() && form.address.trim() && form.pin.trim() && form.phone.trim();
  };

  // Submit handler for add or update
  const handleSubmit = async () => {
    if (!isFormValid()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (editingId) {
        await updateDoc(doc(db, "entries", editingId), form);
        setEditingId(null);
      } else {
        await addDoc(collection(db, "entries"), form);
      }
      setForm({ name: "", address: "", pin: "", phone: "" });
      await fetchEntries(); // wait to refresh list after update/add
    } catch (err) {
      setError("Failed to save entry");
      console.error(err);
    }
    setLoading(false);
  };

  // Load form for editing
  const handleEdit = (entry: Entry) => {
    setForm({ name: entry.name, address: entry.address, pin: entry.pin, phone: entry.phone });
    setEditingId(entry.id);
  };

  // Delete an entry
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    setLoading(true);
    setError(null);
    try {
      await deleteDoc(doc(db, "entries", id));
      await fetchEntries();
      // If currently editing this entry, reset form
      if (editingId === id) {
        setEditingId(null);
        setForm({ name: "", address: "", pin: "", phone: "" });
      }
    } catch (err) {
      setError("Failed to delete entry");
      console.error(err);
    }
    setLoading(false);
  };

  // Initial data fetch
  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel - Manage Entries</h1>

      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-10">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          name="pin"
          placeholder="PIN"
          value={form.pin}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {editingId ? "Update Entry" : "Add Entry"}
        </button>

        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">All Entries</h2>

        {loading && <p className="text-center text-gray-600">Loading...</p>}

        {!loading && entries.length === 0 && (
          <p className="text-gray-600 text-center">No entries yet.</p>
        )}

        <ul className="space-y-4">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Name:</strong> {entry.name}
                </p>
                <p>
                  <strong>Address:</strong> {entry.address}
                </p>
                <p>
                  <strong>PIN:</strong> {entry.pin}
                </p>
                <p>
                  <strong>Phone:</strong> {entry.phone}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(entry)}
                  disabled={loading}
                  className="bg-pink-400 text-white px-3 py-1 rounded hover:bg-yellow-500 disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={loading}
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
