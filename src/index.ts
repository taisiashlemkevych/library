import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { NotificationService } from './services/NotificationService';
import { Validation } from './utils/validators';
import { renderBooks } from './ui/render';
import './styles/main.scss';

const app = document.getElementById('app') as HTMLElement;

type SavedBook = {
    _id: string;
    _title: string;
    _author: string;
    _year: number;
    _isBorrowed: boolean;
};

type SavedUser = {
    _id: string;
    _name: string;
    _borrowedBooks: string[];
};

const savedBooks = Storage.load<SavedBook[]>('books');
const savedUsers = Storage.load<SavedUser[]>('users');

const books = savedBooks
    ? savedBooks.map(
        b => new Book(
            b._id,
            b._title,
            b._author,
            b._year,
            b._isBorrowed
        )
    )
    : [];

const users = savedUsers
    ? savedUsers.map(
        u => new User(u._id, u._name, u._borrowedBooks)
    )
    : [];

const bookLibrary = new Library<Book>();
const userLibrary = new Library<User>();

books.forEach(book => bookLibrary.add(book));
users.forEach(user => userLibrary.add(user));

function saveData(): void {
    Storage.save('books', bookLibrary.getAll());
    Storage.save('users', userLibrary.getAll());
}

function render(): void {
    renderBooks(
        app,
        bookLibrary.getAll(),
        userLibrary.getAll()
    );

    addEvents();
}

function addEvents(): void {
    document.getElementById('book-form')?.addEventListener('submit', event => {
        event.preventDefault();

        const title = (
            document.getElementById('book-title') as HTMLInputElement
        ).value.trim();

        const author = (
            document.getElementById('book-author') as HTMLInputElement
        ).value.trim();

        const yearValue = (
            document.getElementById('book-year') as HTMLInputElement
        ).value.trim();

        if (
            !Validation.required(title) ||
            !Validation.required(author) ||
            !Validation.required(yearValue)
        ) {
            NotificationService.showError(
                'Всі поля книги є обов’язковими.'
            );
            return;
        }

        if (!Validation.publicationYear(yearValue)) {
            NotificationService.showError(
                'Рік видання має містити 4 цифри.'
            );
            return;
        }

        const year = Number(yearValue);

        bookLibrary.add(
            new Book(String(Date.now()), title, author, year)
        );

        saveData();
        NotificationService.show('Book added successfully!');
        render();
    });

    document.getElementById('user-form')?.addEventListener('submit', event => {
        event.preventDefault();

        const name = (
            document.getElementById('user-name') as HTMLInputElement
        ).value.trim();

        if (!Validation.required(name)) {
            NotificationService.showError(
                'Імʼя користувача є обов’язковим.'
            );
            return;
        }

        userLibrary.add(
            new User(String(Date.now()), name)
        );

        saveData();
        NotificationService.show('User added successfully!');
        render();
    });

    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', () => {
            const id = (button as HTMLElement).dataset.bookId;

            if (!id) {
                return;
            }

            const book = bookLibrary.findById(id);

            if (!book) {
                return;
            }

            if (book.isBorrowed) {
                NotificationService.show(
                    'You cannot delete a borrowed book.'
                );
                return;
            }

            bookLibrary.remove(id);
            saveData();
            NotificationService.show('Book deleted successfully!');
            render();
        });
    });

    document.querySelectorAll('.borrow-book').forEach(button => {
        button.addEventListener('click', () => {
            const id = (button as HTMLElement).dataset.bookId;

            if (!id) {
                return;
            }

            const select = document.querySelector(
                `.borrow-user[data-book-id="${id}"]`
            ) as HTMLSelectElement;

            if (!select?.value) {
                NotificationService.show('Please select a user.');
                return;
            }

            const book = bookLibrary.findById(id);
            const user = userLibrary.findById(select.value);

            if (!book || !user) {
                return;
            }

            if (!bookLibrary.borrowBook(book, user)) {
                NotificationService.show(
                    'The book cannot be borrowed.'
                );
                return;
            }

            saveData();
            NotificationService.show(
                `Book borrowed by ${user.name}.`
            );
            render();
        });
    });

    document.querySelectorAll('.return-book').forEach(button => {
        button.addEventListener('click', () => {
            const element = button as HTMLElement;
            const book = bookLibrary.findById(element.dataset.bookId!);
            const user = userLibrary.findById(element.dataset.userId!);

            if (!book || !user) {
                return;
            }

            if (!bookLibrary.returnBook(book, user)) {
                NotificationService.show(
                    'The book cannot be returned.'
                );
                return;
            }

            saveData();
            NotificationService.show('Book returned successfully!');
            render();
        });
    });

    document.getElementById('book-search')?.addEventListener('input', event => {
        const query = (
            event.target as HTMLInputElement
        ).value.toLowerCase();

        document.querySelectorAll('.book-item').forEach(item => {
            const text = item.textContent?.toLowerCase() ?? '';

            if (text.includes(query)) {
                (item as HTMLElement).style.display = '';
            } else {
                (item as HTMLElement).style.display = 'none';
            }
        });
    });
}

saveData();
render();