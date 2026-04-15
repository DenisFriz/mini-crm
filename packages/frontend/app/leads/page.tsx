"use client";

import { useEffect, useState } from "react";
import LeadsTable from "@/components/leads/LeadsTable";
import LeadForm from "@/components/leads/LeadForm";
import { getLeads } from "@/lib/leads.api";
import { Lead, LeadStatus } from "@/lib/types/lead";
import axios from "axios";

const LIMIT = 10;
type SortField = "createdAt" | "updatedAt";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState<SortField>("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getLeads({
        q,
        status: status || undefined,
        page,
        limit: LIMIT,
        sort,
        order,
      });

      setLeads(res.data);
      setTotal(res.total);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;

        const message =
          (data?.errors
            ? Object.values(data.errors).join(", ")
            : "Request failed") || data?.message;

        setError(message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [q, status, page, sort, order]);

  const handleCreated = () => {
    fetchData();
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Leads</h1>
      <LeadForm onCreated={handleCreated} />
      <div className="flex gap-3 flex-wrap items-center">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Search name/email/company..."
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
        />

        <select
          className="border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="" className="bg-gray-900 text-gray-100">
            All statuses
          </option>

          {Object.values(LeadStatus).map((s) => (
            <option key={s} value={s} className="bg-gray-900 text-gray-100">
              {s}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 rounded"
          value={sort}
          onChange={(e) => {
            setPage(1);
            setSort(e.target.value as SortField);
          }}
        >
          <option value="createdAt">Created At</option>
          <option value="updatedAt">Updated At</option>
        </select>
        <select
          className="border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 rounded"
          value={order}
          onChange={(e) => {
            setPage(1);
            setOrder(e.target.value as "asc" | "desc");
          }}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {loading && <div className="text-gray-500">Loading leads...</div>}

      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && leads.length === 0 && (
        <div className="text-gray-500">No leads found</div>
      )}

      {!loading && !error && leads.length > 0 && (
        <>
          <LeadsTable leads={leads} />
          <div className="flex gap-2 items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {page} / {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
