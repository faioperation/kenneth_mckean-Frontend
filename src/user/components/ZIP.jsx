import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa";
import { generateZIP } from "../../api/taskApi";
import { apiClient } from "../../lib/apiClient";

export default function ZIP({ taskId }) {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const zipMutation = useMutation({
    mutationFn: () => generateZIP(taskId),
    onSuccess: (res) => {
      console.log("ZIP SUCCESS", res);
      setIsGenerated(true);
    },
    onError: () => alert("Failed to generate ZIP"),
  });

  const handleGenerate = () => {
    if (!taskId) return;
    zipMutation.mutate();
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await apiClient.get(
        `/user/new-task/${taskId}/codebase/download`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: "application/zip" });
      console.log("ZIP Blob size:", blob.size);

      if (blob.size === 0) {
        alert("ZIP file is empty");
        return;
      }

      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `codebase-${taskId}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);

    } catch (err) {
      console.error("ZIP Download error:", err);
      alert("Failed to download ZIP");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="text-sm text-gray-600 p-2 border w-50 mt-4 rounded-md border-blue-200">
      {!isGenerated ? (
        <button
          onClick={handleGenerate}
          disabled={zipMutation.isPending}
          className="text-blue-600"
        >
          {zipMutation.isPending ? "Generating..." : "Generate ZIP"}
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <span>ZIP Ready</span>
          <button onClick={handleDownload} disabled={isDownloading}>
            {isDownloading
              ? <span className="text-xs">Downloading...</span>
              : <FaDownload className="cursor-pointer" />
            }
          </button>
        </div>
      )}
    </div>
  );
}