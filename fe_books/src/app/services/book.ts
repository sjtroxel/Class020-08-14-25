import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://booksappsjtroxel.onrender.com';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}`);
  }

  getMyBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/my_books`)
  }

  createBook(book: Book | FormData): Observable<Book> {
    if (book instanceof FormData) {
      return this.http.post<Book>(`${this.apiUrl}/books`, book);
    } else {
      return this.http.post<Book>(`${this.apiUrl}/books`, { book });
    }
  }

  updateBook(book: Book | FormData): Observable<Book> {
    if (book instanceof FormData) {
      return this.http.put<Book>(`${this.apiUrl}/books/${(book as any).id}`, book);
    } else {
      return this.http.put<Book>(`${this.apiUrl}/books/${book.id}`, { book });
    }
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }
}
