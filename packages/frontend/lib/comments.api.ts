import { api } from "./api";
import { Comment } from "./types/comment";

export async function getComments(id: string): Promise<Comment[]> {
  const res = await api.get<Comment[]>(`/api/leads/${id}/comments`);

  return res.data;
}

export async function createComment(
  id: string,
  data: { text: string },
): Promise<Comment> {
  const res = await api.post<Comment>(`/api/leads/${id}/comments`, data);

  return res.data;
}
