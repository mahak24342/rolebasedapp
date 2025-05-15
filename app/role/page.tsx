"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Role() {
  const [selectedRole, setSelectedRole] = useState<"admin" | "guest" | null>(null);
  const router = useRouter();

  const handleSubmit = () => {
    if (selectedRole) {
      console.log("Selected Role:", selectedRole);
      router.push(`/${selectedRole}`);
    } else {
      alert("Please select a role.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // redirect to front page or login page
    } catch (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Select Your Role</h1>

      <div className="flex flex-col sm:flex-row gap-6 mb-8 w-full max-w-md">
        <button
          onClick={() => setSelectedRole("admin")}
          className={`flex-1 px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition 
            ${selectedRole === "admin"
              ? "bg-purple-600 text-white border-purple-700"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-purple-50"}
          `}
        >
          Admin
        </button>

        <button
          onClick={() => setSelectedRole("guest")}
          className={`flex-1 px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition
            ${selectedRole === "guest"
              ? "bg-purple-600 text-white border-purple-700"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-green-50"}
          `}
        >
          Guest
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full max-w-md bg-black text-white px-5 py-3 rounded-md hover:bg-gray-800 transition text-lg font-semibold"
      >
        Continue
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 w-full max-w-md text-red-600 border border-purple-600 rounded-md py-3 text-lg font-semibold hover:bg-purple-600 hover:text-white transition"
      >
        Logout
      </button>
    </div>
  );
}
