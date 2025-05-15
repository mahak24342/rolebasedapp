// components/GoogleSignIn.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

export default function GoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
      router.push("/role"); // redirect to /role page
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-purple-200 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Role-Based App</h1>
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold shadow-md hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
      <p className="mt-6 text-black opacity-80 text-sm">© 2025 Your Company</p>
    </div>
  );
}
