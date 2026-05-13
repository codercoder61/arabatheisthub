"use client";

import Image from "next/image";
import { Book } from "@/lib/books-data";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
}

export function BookCard({ book, onRead }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full border border-gray-200">
      <div className="relative h-64 w-full bg-gray-200">
        <Image
          src={book.bookImgSrc || "not.jpg"}
          alt={book.title}
          fill
          priority={false}
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect fill='%23e5e7eb' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='%236b7280' text-anchor='middle' dy='.3em'%3EBook Cover%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
          {book.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {book.bookDesc}
        </p>

        <a href={book.bookReadLink}><Button
          className="w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          Read Book
        </Button>
        </a>
      </div>
    </div>
  );
}
