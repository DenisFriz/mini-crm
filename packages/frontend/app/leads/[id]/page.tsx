"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import LeadDetails from "@/components/leads/LeadDetails";
import Comments from "@/components/leads/Comments";
import { Lead } from "@/lib/types/lead";
import { deleteLead, getLead, updateLead } from "@/lib/leads.api";

export default function LeadsIdPage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params.id === "string" ? params.id : "";

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const fetchLead = async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) return;

      const res = await getLead(id);
      setLead(res);
    } catch {
      setError("Failed to load lead");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Delete this lead?")) return;

    try {
      await deleteLead(id);

      setMessage("Lead deleted");
      setMessageType("success");

      setTimeout(() => {
        router.push("/leads");
      }, 1000);
    } catch {
      setMessage("Failed to delete lead");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  const isEqual = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

  const handleUpdate = async (data: Partial<Lead>) => {
    if (!id) return;

    try {
      if (isEqual(lead, { ...lead, ...data })) {
        setMessage("No changes detected");
        setMessageType("error");

        setTimeout(() => {
          setMessage("");
          setMessageType("");
        }, 2000);

        return;
      }
      const res = await updateLead(id, data);
      setLead(res);

      setMessage("Lead updated successfully");
      setMessageType("success");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    } catch {
      setMessage("Failed to update lead");
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  if (loading) return <div className="p-6">Loading lead...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!lead) return <div className="p-6">Lead not found</div>;

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => router.push("/leads")}
        className="text-blue-500 cursor-pointer"
      >
        ← Back
      </button>
      {message && (
        <div
          className={`p-3 rounded border ${
            messageType === "success"
              ? "bg-green-900 text-green-200 border-green-700"
              : "bg-red-900 text-red-200 border-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <LeadDetails
        lead={lead}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <Comments leadId={id} />
    </div>
  );
}
