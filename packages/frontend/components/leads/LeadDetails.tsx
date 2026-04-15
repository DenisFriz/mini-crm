"use client";

import { useState } from "react";
import { Lead, LeadStatus } from "@/lib/types/lead";

type Props = {
  lead: Lead;
  onUpdate: (data: Partial<Lead>) => void;
  onDelete: () => void;
};

export default function LeadDetails({ lead, onUpdate, onDelete }: Props) {
  const [form, setForm] = useState<Lead>(lead);

  return (
    <div className="border border-gray-800 rounded p-4 space-y-4">
      <h2 className="text-xl font-bold">Lead details</h2>
      <input
        className="border p-2 w-full"
        placeholder="Full name (e.g. John Doe)"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Email address (e.g. john@example.com)"
        value={form.email || ""}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Company name (e.g. Acme Inc.)"
        value={form.company || ""}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
      <select
        className="border p-2 w-full"
        value={form.status}
        onChange={(e) =>
          setForm({
            ...form,
            status: e.target.value as LeadStatus,
          })
        }
      >
        <option disabled value="">
          Select status
        </option>

        {Object.values(LeadStatus).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <input
        type="number"
        className="border p-2 w-full"
        placeholder="Deal value (e.g. 1000)"
        value={form.value ?? ""}
        onChange={(e) =>
          setForm({
            ...form,
            value: e.target.value === "" ? undefined : Number(e.target.value),
          })
        }
      />
      <textarea
        className="border p-2 w-full"
        placeholder="Additional notes about this lead..."
        value={form.notes || ""}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(form)}
          className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Save
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
