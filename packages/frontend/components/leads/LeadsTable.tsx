"use client";

import { Lead } from "@/lib/types/lead";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Value</th>
            <th className="px-4 py-3">Notes</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3">View</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white text-sm">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-blue-600">
                <Link href={`/leads/${lead._id}`} className="hover:underline">
                  {lead.name}
                </Link>
              </td>

              <td className="px-4 py-3 text-gray-700">{lead.email ?? "—"}</td>

              <td className="px-4 py-3 text-gray-700">{lead.company ?? "—"}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      lead.status === "NEW"
                        ? "bg-blue-100 text-blue-700"
                        : lead.status === "CONTACTED"
                          ? "bg-yellow-100 text-yellow-700"
                          : lead.status === "IN_PROGRESS"
                            ? "bg-purple-100 text-purple-700"
                            : lead.status === "WON"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                    }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700">{lead.value ?? "—"}</td>
              <td className="px-4 py-3 text-gray-700 max-w-[200px] truncate">
                {lead.notes ?? "—"}
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {lead.createdAt
                  ? new Date(lead.createdAt).toLocaleDateString()
                  : "—"}
              </td>
              <td className="px-4 py-3 text-gray-500 text-xs">
                {lead.updatedAt
                  ? new Date(lead.updatedAt).toLocaleDateString()
                  : "—"}
              </td>
              <td className="p-2">
                <button
                  onClick={() => router.push(`/leads/${lead._id}`)}
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded text-white cursor-pointer"
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
