"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Car } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid admin password");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 gold-gradient rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
            <Car className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-white/40">Enter password to access dashboard</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/60 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-accent transition-all"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-400 text-sm font-medium text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 gold-gradient text-white rounded-2xl font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-8 text-white/20 text-xs">
          Authorized personnel only. Access is monitored.
        </p>
      </div>
    </div>
  );
}
