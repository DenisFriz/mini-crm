"use client";

import { useEffect, useState } from "react";
import { getComments, createComment } from "@/lib/comments.api";
import { Comment } from "@/lib/types/comment";

export default function Comments({ leadId }: { leadId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError("");

      const data = await getComments(leadId);
      setComments(data);
    } catch {
      setError("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (leadId) load();
  }, [leadId]);

  async function addComment() {
    if (!text.trim()) return;

    try {
      setSending(true);

      const newComment = await createComment(leadId, {
        text,
      });

      setComments((prev) => [newComment, ...prev]);
      setText("");
    } catch {
      setError("Failed to add comment");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="border border-gray-800 rounded p-4 space-y-4 mt-6">
      <h3 className="text-lg font-bold">Comments</h3>

      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-700 bg-gray-900 text-gray-100 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={addComment}
          disabled={sending}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded cursor-pointer"
        >
          {sending ? "Adding..." : "Add"}
        </button>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      {loading && <div className="text-gray-500">Loading comments...</div>}

      {!loading && comments.length === 0 && (
        <div className="text-gray-500">No comments yet</div>
      )}

      <div className="space-y-2">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-900 border border-gray-800 rounded p-3"
          >
            <p className="text-gray-100">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
