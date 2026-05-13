"use client";

import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@/components/ui/dialog";
// ✅ worker (must be public folder)
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function PDFViewer({
  pdfUrl,
  isOpen,
  onClose,
  title,
}: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);

  // ✅ CRITICAL: prevents DOMMatrix crash
  useEffect(() => {
    setMounted(true);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

        <div className="flex items-center justify-between mb-4">
          <DialogTitle className="text-xl font-semibold truncate">
            {title || "PDF Viewer"}
          </DialogTitle>

          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto flex items-center justify-center bg-gray-100">
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={currentPage} width={500} />
          </Document>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
            <ChevronLeft />
          </button>

          <span>
            Page {currentPage} of {numPages || "..."}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                numPages && p < numPages ? p + 1 : p
              )
            }
          >
            <ChevronRight />
          </button>
        </div>
 <DialogDescription className="sr-only">
    PDF document viewer
  </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}