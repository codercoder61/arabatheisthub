"use client";

import { useState, useMemo } from "react";
import { booksData, Book } from "@/lib/books-data";
import { BookCard } from "@/components/book-card";
import { BookList } from "@/components/book-list";
import PDFViewer from "@/components/pdf-viewer-wrapper";
import { Search, Grid3x3, List } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return booksData;

    const query = searchQuery.toLowerCase();
    return booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.bookDesc.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleReadBook = (book: Book) => {
    setSelectedBook(book);
    setIsPDFOpen(true);
  };

  const handleClosePDF = () => {
    setIsPDFOpen(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Library</h1>
          <p className="text-gray-600">
            Discover and explore our collection of insightful books
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="Grid view"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredBooks.length}</span> of{" "}
            <span className="font-semibold">{booksData.length}</span> books
          </p>
        </div>

        {/* Books Display */}
        {filteredBooks.length > 0 ? (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onRead={handleReadBook}
                  />
                ))}
              </div>
            ) : (
              <BookList books={filteredBooks} onRead={handleReadBook} />
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">
              No books found matching &quot;{searchQuery}&quot;
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {selectedBook && (
        <PDFViewer
          pdfUrl={selectedBook.bookReadLink}
          isOpen={isPDFOpen}
          onClose={handleClosePDF}
          title={selectedBook.title}
        />
      )}
    </main>
  );
}
