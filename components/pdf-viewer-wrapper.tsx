"use client";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("./pdf-viewer"), {
  ssr: false,
  loading: () => <p>Loading PDF...</p>,
});

export default PDFViewer;