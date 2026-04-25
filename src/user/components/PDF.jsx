import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa";

import { generatePDF} from "../../api/taskApi";
import { apiGet } from "../../lib/api";
import { apiClient } from "../../lib/apiClient";

export default function PDF({ taskId, content }) {
  const [isGenerated, setIsGenerated] = useState(false);
 const [isDownloading, setIsDownloading] = useState(false);
  const pdfMutation = useMutation({
    mutationFn: () => generatePDF(taskId, content),
    onSuccess: (res) => {
      console.log("PDF SUCCESS", res);
      setIsGenerated(true);
    },
    onError: () => alert("Failed to generate PDF"),
  });

  const handleGenerate = () => {
    console.log("CLICKED", taskId, content);
    if (!taskId) {
      console.log("PDF PROPS:", { taskId, content });
      return;
    }
    pdfMutation.mutate();
  };
const handleDownload = async () => {
  setIsDownloading(true);
  try {

    const response = await apiClient.get(
      `/user/new-task/${taskId}/pdf/download`,
      { responseType: "blob" }
    );

    // response.data here is the raw blob from axios
    const text = await response.data.text();
    console.log("Blob content:", text);
    console.log("Blob size:", response.data.size);

    
    if (!text.startsWith("%PDF")) {
      console.error("Not a PDF, server returned:", text);
      alert("Server did not return a PDF file");
      return;
    }

    const blobUrl = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `document-${taskId}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);

  } catch (err) {
    console.error("Download error:", err);
    alert("Failed to download PDF");
  } finally {
    setIsDownloading(false);
  }
};
  return (
    <div className="text-sm text-gray-600 p-2 border w-50 mt-4 rounded-md border-blue-200">
      {!isGenerated ? (
        <button
          onClick={handleGenerate}
          disabled={pdfMutation.isPending}
          className="text-blue-600"
        >
          {pdfMutation.isPending ? "Generating..." : "Generate PDF"}
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <span>PDF Ready</span>

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
