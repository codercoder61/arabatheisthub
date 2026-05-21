"use client";

import { Book } from "@/lib/books-data";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookListProps {
  books: Book[];
  onRead: (book: Book) => void;
}

export function BookList({ books, onRead }: BookListProps) {
  return (
    <div className="space-y-3">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="relative w-24 h-32 flex-shrink-0 bg-gray-200 rounded">
            <Image
  src={book.bookImgSrc?.trim() ? book.bookImgSrc : "/not.jpg"}
  alt={book.title}
  fill
  className="object-cover rounded"
/>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
              {book.bookDesc}
            </p>
            <a href={book.bookReadLink}><Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2"
        >
              <BookOpen className="w-4 h-4" />
              Read Book</Button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
