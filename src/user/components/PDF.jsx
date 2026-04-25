import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaDownload } from "react-icons/fa";
import { generatePDF, getPDFDownloadUrl } from "../../api/taskApi";

export default function PDF({ taskId, content }) {
  const [isGenerated, setIsGenerated] = useState(false);

  const pdfMutation = useMutation({
    mutationFn: () => generatePDF(taskId),
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

          <a
            href={getPDFDownloadUrl(taskId)}
            target="_blank"
            rel="noreferrer"
            download
          >
            <FaDownload className="cursor-pointer" />
          </a>
        </div>
      )}
    </div>
  );
}