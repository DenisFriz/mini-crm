"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { LeadStatus } from "@/lib/types/lead";

export default function LeadForm({ onCreated }: any) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    status: "",
    value: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/api/leads", form);

      onCreated(res.data);

      setForm({
        name: "",
        email: "",
        company: "",
        status: "",
        value: "",
        notes: "",
      });
    } catch (err: any) {
      const data = err?.response?.data;

      const message =
        data?.errors?.status ||
        data?.errors?.email ||
        data?.message ||
        "Something went wrong";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3 p-4 border rounded-lg mb-6">
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </div>
      )}
      <h3 className="font-semibold text-lg">Create Lead</h3>
      <input
        className="border p-2 rounded w-full"
        placeholder="Name *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <select
        className="border p-2 rounded w-full bg-white text-gray-900"
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
      >
        <option value="" className="text-gray-900">
          Select status
        </option>
        {Object.values(LeadStatus).map((s) => (
          <option key={s} value={s} className="text-gray-900 font-medium">
            {s}
          </option>
        ))}
      </select>
      <input
        className="border p-2 rounded w-full"
        type="number"
        placeholder="Value"
        value={form.value}
        onChange={(e) => setForm({ ...form, value: e.target.value })}
      />
      <textarea
        className="border p-2 rounded w-full"
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <button
        onClick={submit}
        disabled={loading || !form.name}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Lead"}
      </button>
    </div>
  );
}
