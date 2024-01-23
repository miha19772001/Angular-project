import { BookService } from 'src/app/services/oneSite/book-page.service.service';
import { IBook } from 'src/assets/Interfaces/IBook';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-site-one',
  templateUrl: './site-one.component.html',
  styleUrls: ['./site-one.component.scss'],
  providers: [BookService],
})
export class SiteOneComponent {

  constructor(private bookService: BookService) {

  }

  @ViewChild('inputSearchedBook') inputSearchedBook!: ElementRef;

  @ViewChild('searchButton') searchButton!: ElementRef;
  @ViewChild('favoriteButton') favoriteButton!: ElementRef;

  form!: FormGroup;

  public books: IBook[] = [];

  public logo: string = 'My Library';
  public shortLogo: string = 'ML';

  ngOnInit(): void {
    this.form = new FormGroup({
      nameBook: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    let nameBook = this.form.value.nameBook;

    this.bookService.searchBook(nameBook)
      .subscribe((data: any) => {

        //Clear showed books
        this.books = [];

        let LSBooks = this.bookService.getBooksFromLocalStorage();

        for (let i = 0; i < data.items.length; i++) {

          let name: string;
          let img: string;
          let author: string;
          let linkToShop: string;
          let isFavorite: boolean = false;

          try {
            author = data.items[i].volumeInfo.authors[0];
          }
          catch {
            continue;
          }

          if (data.items[i].volumeInfo.readingModes.image === false) {
            img = 'https://junior3d.ru/texture/Бумага/ОбложкиСтарыхКниг/обложки-старых-книг_135.jpg';
          }
          else {
            img = data.items[i].volumeInfo.imageLinks.smallThumbnail;
          }

          name = data.items[i].volumeInfo.title;
          linkToShop = data.items[i].volumeInfo.previewLink.split('&')[0];

          for (let i = 0; i < LSBooks.length; i++) {
            if (linkToShop === LSBooks[i].linkToShop) {
              isFavorite = true;
            }
          }

          this.books.push({
            name: name,
            img: img,
            author: author,
            linkToShop: linkToShop,
            isFavorite: isFavorite,
          })
        }
      });
  }

  getFavoriteBooks() {
    this.inputSearchedBook.nativeElement.value = '';
    this.books = this.bookService.getBooksFromLocalStorage();
  }

  setFavorite(img: any, book: IBook) {

    if (img.src === `${location.protocol}//${location.host}/assets/img/star-yellow.png`) {
      img.src = 'assets/img/star-white.png';
    }
    else {
      img.src = 'assets/img/star-yellow.png';

      book.isFavorite = true;

      this.bookService.addBook(book);
    }
  }

  removeFavorite(img: any, book: IBook) {
    if (img.src === `${location.protocol}//${location.host}/assets/img/star-yellow.png`) {

      img.src = 'assets/img/star-white.png';

      book.isFavorite = true;

      this.bookService.deleteBook(book);
    }
    else {
      img.src = 'assets/img/star-yellow.png';
    }
  }

  currentButton(button: HTMLButtonElement) {
    this.searchButton.nativeElement.classList.remove('nav__button--current');
    this.favoriteButton.nativeElement.classList.remove('nav__button--current');
    button.classList.add('nav__button--current');
  }
}