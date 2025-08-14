import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-new.html',
  styleUrl: './book-new.scss'
})

export class BookNewComponent {
  bookForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      read: [false]
    });
  }

    onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) return;

    const formData = new FormData();
    formData.append('book[title]', this.bookForm.value.title);
    formData.append('book[author]', this.bookForm.value.author);
    formData.append('book[read]', this.bookForm.value.read ? 'true' : 'false');

    if (this.selectedFile) {
      formData.append('book[cover_image]', this.selectedFile);
    }

    this.bookService.createBook(formData).subscribe({
      next: () => this.router.navigate(['/books']),
      error: err => console.error('Book creation failed:', err)
    });
  }
}
