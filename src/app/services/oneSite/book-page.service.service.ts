import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { IBook } from 'src/assets/Interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  private API_KEY: string = 'AIzaSyCAcdMYgcpg3NCVMfMJvm3brvI9nBZ6Uf8';

  private books: IBook[] = [];


  //Working with Google Books APIs
  public searchBook(nameBook: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    });
    return this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${nameBook}&key=${this.API_KEY}`, { headers: headers })
      .pipe(map((data: any) => data));
  }

  //Working with LocalStorage
  public addBook(book: IBook): void {
    if (localStorage.length === 0) {
      localStorage.setItem('books', JSON.stringify(this.books));
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      this.books = JSON.parse(localStorage.getItem('books') ?? '[]');
      this.books.push(book);
      localStorage.setItem('books', JSON.stringify(this.books));
    }
  }

  public getBooksFromLocalStorage(): IBook[] {
    this.books = JSON.parse(localStorage.getItem('books') ?? '[]');
    console.log(this.books)
    return this.books;
  }

  public deleteBook(book: IBook): void {
    this.books = JSON.parse(localStorage.getItem('books') ?? '[]');

    this.books.forEach((item, index) => {

      if (item.linkToShop === book.linkToShop) {
        this.books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(this.books));

    if (this.books.length === 0) {
      localStorage.removeItem('books');
    }
  }
}
