"use client";

import { FileText, UploadCloud, X } from "lucide-react";
import { useState } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";

interface UploadZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const acceptedTypes = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "text/markdown": [".md", ".markdown"],
  "text/plain": [".txt"],
};

const MAX_FILES = 6;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export function UploadZone({ files, onFilesChange }: UploadZoneProps) {
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedTypes,
    multiple: true,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE_BYTES,
    onDrop: (acceptedFiles) => {
      setRejectionMessage(null);
      onFilesChange([...files, ...acceptedFiles].slice(0, MAX_FILES));
    },
    onDropRejected: (rejections) => setRejectionMessage(getRejectionMessage(rejections)),
  });

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`group cursor-pointer rounded-2xl border border-dashed p-8 text-center transition sm:p-12 ${
          isDragActive
            ? "border-[#4d9477] bg-[#edf7f1]"
            : "border-[#b8cdc3] bg-[#fbfdfb] hover:border-[#4d9477] hover:bg-[#f4faf6]"
        }`}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#e4f1ea] text-[#31715a] transition group-hover:scale-105">
          <UploadCloud className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-4 text-base font-medium text-[#23493b]">
          {isDragActive ? "Drop documents to add them" : "Drop project documents here"}
        </p>
        <p className="mt-1.5 text-sm text-[#71847b]">or click to browse your files</p>
        <p className="mt-5 text-xs font-medium tracking-wide text-[#87978f]">PDF · DOCX · MARKDOWN · TEXT</p>
      </div>

      {rejectionMessage && <p role="alert" className="mt-3 text-sm text-[#9a4534]">{rejectionMessage}</p>}

      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" aria-live="polite">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex max-w-full items-center gap-2 rounded-lg border border-[#dbe8e1] bg-white py-2 pl-2.5 pr-1.5 text-sm text-[#3f5d51] shadow-sm">
              <FileText className="size-4 shrink-0 text-[#4d9477]" aria-hidden="true" />
              <span className="max-w-48 truncate">{file.name}</span>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); removeFile(index); }}
                className="rounded-md p-1 text-[#81928a] transition hover:bg-[#f0f5f2] hover:text-[#285440]"
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getRejectionMessage(rejections: FileRejection[]) {
  if (rejections.some((rejection) => rejection.errors.some((error) => error.code === "file-too-large"))) {
    return "Each document must be 10 MB or smaller.";
  }
  if (rejections.some((rejection) => rejection.errors.some((error) => error.code === "too-many-files"))) {
    return "Upload no more than 6 documents at a time.";
  }
  return "Only PDF, DOCX, Markdown, and TXT documents are supported.";
}
