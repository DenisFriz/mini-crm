import { api } from "./api";
import { Lead, LeadsResponse } from "./types/lead";

export async function getLeads(params?: {
  q?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort?: "createdAt" | "updatedAt";
  order?: "asc" | "desc";
}): Promise<LeadsResponse> {
  const res = await api.get<LeadsResponse>("/api/leads", { params });
  return res.data;
}

export async function getLead(id: string): Promise<Lead> {
  const res = await api.get<Lead>(`/api/leads/${id}`);
  return res.data;
}

export async function updateLead(
  id: string,
  data: Partial<Lead>,
): Promise<Lead> {
  const res = await api.patch<Lead>(`/api/leads/${id}`, data);
  return res.data;
}

export async function deleteLead(id: string): Promise<{ success: boolean }> {
  const res = await api.delete<{ success: boolean }>(`/api/leads/${id}`);
  return res.data;
}
