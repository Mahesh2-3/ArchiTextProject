"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash } from "../../Helpers/icons";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../Helpers/toast";
import { getHistory, deleteProject } from "../../api/Project";
import { deleteConversation } from "../../api/Conversations";

const HistoryPage = () => {
  const router = useRouter();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    const res = await getHistory();
    if (res.success) {
      setHistory(res.data);
    } else {
      toast.error(res.error || "Failed to fetch history", toastOptions());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDeleteProject = async (projectId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project and all its conversations? This action cannot be undone.",
    );
    if (!confirm) return;

    const res = await deleteProject(projectId);
    if (res.success) {
      toast.success(
        res.message || "Project deleted successfully",
        toastOptions(),
      );
      setHistory(history.filter((p) => p._id !== projectId));
    } else {
      toast.error(res.message || "Failed to delete project", toastOptions());
    }
  };

  const handleDeleteConversation = async (projectId, conversationId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this conversation?",
    );
    if (!confirm) return;

    const res = await deleteConversation(conversationId);
    if (res.success) {
      toast.success(
        res.message || "Conversation deleted successfully",
        toastOptions(),
      );
      // Update local state to remove the conversation
      setHistory(
        history.map((p) => {
          if (p._id === projectId) {
            return {
              ...p,
              conversations: p.conversations.filter(
                (c) => c._id !== conversationId,
              ),
            };
          }
          return p;
        }),
      );
    } else {
      toast.error(
        res.message || "Failed to delete conversation",
        toastOptions(),
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-(--color-main) flex flex-col">
      <ToastContainer />
      {/* Header */}
      <div className="w-full px-6 py-5 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-(--color-secondary)/40">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-(--text-normal)"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-2xl font-bold text-(--text-normal) tracking-tight">
          Settings / History
        </h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl mx-auto px-6 py-8 flex flex-col gap-6">
        <p className="text-(--text-normal)/60 text-sm">
          Review and manage your past projects and conversations.
        </p>

        {loading ? (
          <div className="flex justify-center py-10 text-(--text-normal)/50">
            Fetching history...
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/20">
            <span className="text-4xl opacity-30">📜</span>
            <span className="text-(--text-normal)/40 text-sm font-medium">
              No history yet
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {history.map((project) => (
              <div
                key={project._id}
                className="p-5 rounded-lg border border-gray-300 dark:border-gray-700 bg-(--color-secondary)/20 flex flex-col gap-4 shadow-sm"
              >
                {/* Project Header */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-300 dark:border-gray-700">
                  <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-(--text-normal)">
                      {project.title}
                    </h2>
                    <span className="text-xs text-(--text-normal)/50">
                      Created:{" "}
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="p-2 rounded hover:bg-red-500/20 text-red-500 transition cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash size={18} />
                  </button>
                </div>

                {/* Conversations List */}
                <div className="flex flex-col pl-4 mt-2 border-l-2 border-(--accent)/30 gap-3">
                  {project.conversations && project.conversations.length > 0 ? (
                    project.conversations.map((convo) => (
                      <div
                        key={convo._id}
                        className="flex justify-between items-center group"
                      >
                        <span className="text-sm font-medium text-(--text-normal)/80">
                          🗨️ {convo.title}
                        </span>
                        <button
                          onClick={() =>
                            handleDeleteConversation(project._id, convo._id)
                          }
                          className="p-1.5 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 text-red-500 transition cursor-pointer"
                          title="Delete Conversation"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-(--text-normal)/40 italic">
                      No conversations found for this project.
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
