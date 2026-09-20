import { Book } from './models/Book';
import { User } from './models/User';
import { Library } from './services/Library';
import { Storage } from './services/Storage';
import { NotificationService } from './services/NotificationService';
import { Validation } from './utils/validators';
import { renderBooks } from './ui/render';
import { renderModal } from './ui/components/Modal';
import { generateId } from './utils/idGenerator';
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
    _email: string;
    _borrowedBooks: string[];
};

const savedBooks = Storage.load<SavedBook[]>('books');
const savedUsers = Storage.load<SavedUser[]>('users');

const books = savedBooks ? savedBooks.map(book => new Book(book._id, book._title, book._author, book._year, book._isBorrowed)) : [];

const users = savedUsers ? savedUsers.map(user => new User(user._id, user._name, user._email, user._borrowedBooks)) : [];

const bookLibrary = new Library<Book>();
const userLibrary = new Library<User>();

books.forEach(book => bookLibrary.add(book));
users.forEach(user => userLibrary.add(user));

const booksPerPage = 5;
let currentPage = 1;
let searchQuery = '';

function saveData(): void {
    Storage.save('books', bookLibrary.getAll());
    Storage.save('users', userLibrary.getAll());
}

function getFilteredBooks(): Book[] {
    const books = bookLibrary.getAll();
    return searchQuery
        ? books.filter(book => book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery))
        : books;
}

function getTotalPages(): number {
    return Math.max(1, Math.ceil(getFilteredBooks().length / booksPerPage));
}

function showLimitModal(user: User): void {
    document.getElementById('modal')?.remove();
    document.body.insertAdjacentHTML('beforeend', renderModal('Ліміт книг', `Користувач ${user.name} вже має 3 книги. Неможливо взяти четверту книгу.`));

    document.getElementById('modal-close')?.addEventListener('click', () => {
        document.getElementById('modal')?.remove();
    });

    document.getElementById('modal')?.addEventListener('click', event => {
        if (event.target === event.currentTarget) {
            document.getElementById('modal')?.remove();
        }
    });
}

function render(): void {
    const filteredBooks = getFilteredBooks();
    const totalPages = getTotalPages();

    currentPage = Math.min(currentPage, totalPages);
    const startIndex = (currentPage - 1) * booksPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

    renderBooks(app, paginatedBooks, userLibrary.getAll());

    const searchInput = document.getElementById('book-search') as HTMLInputElement | null;
    if (searchInput) {
        searchInput.value = searchQuery;
    }

    updatePagination();
    addEvents();
}

function updatePagination(): void {
    const totalPages = getTotalPages();
    const pageInfo = document.getElementById('page-info');
    const previousButton = document.getElementById('previous-page') as HTMLButtonElement | null;
    const nextButton = document.getElementById('next-page') as HTMLButtonElement | null;

    if (pageInfo) {
        pageInfo.textContent = `Сторінка ${currentPage} з ${totalPages}`;
    }

    if (previousButton) {
        previousButton.disabled = currentPage === 1;
    }

    if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
    }
}

function addEvents(): void {
    document.getElementById('previous-page')?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            render();
        }
    });

    document.getElementById('next-page')?.addEventListener('click', () => {
        if (currentPage < getTotalPages()) {
            currentPage++;
            render();
        }
    });

    document.getElementById('book-search')?.addEventListener('input', event => {
        searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
        currentPage = 1;

        const filteredBooks = getFilteredBooks();
        const paginatedBooks = filteredBooks.slice(0, booksPerPage);
        const bookList = document.getElementById('book-list');

        if (bookList) {
            const tempContainer = document.createElement('div');
            renderBooks(tempContainer, paginatedBooks, userLibrary.getAll());

            const newBookList = tempContainer.querySelector('#book-list');
            if (newBookList) {
                bookList.innerHTML = newBookList.innerHTML;
            }
        }

        updatePagination();
        addBookEvents();
    });

    document.getElementById('book-form')?.addEventListener('submit', event => {
        event.preventDefault();

        const title = (document.getElementById('book-title') as HTMLInputElement).value.trim();
        const author = (document.getElementById('book-author') as HTMLInputElement).value.trim();
        const yearValue = (document.getElementById('book-year') as HTMLInputElement).value.trim();

        if (!Validation.required(title) || !Validation.required(author) || !Validation.required(yearValue)) {
            NotificationService.showError('Усі поля книги є обов’язковими.');
            return;
        }

        if (!Validation.publicationYear(yearValue)) {
            NotificationService.showError('Рік видання має містити 4 цифри.');
            return;
        }

        bookLibrary.add(new Book(generateId(), title, author, Number(yearValue)));
        saveData();
        NotificationService.show('Книгу успішно додано!');
        render();
    });

    document.getElementById('user-form')?.addEventListener('submit', event => {
        event.preventDefault();

        const name = (document.getElementById('user-name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('user-email') as HTMLInputElement).value.trim();

        if (!Validation.required(name)) {
            NotificationService.showError('Ім’я користувача є обов’язковим.');
            return;
        }

        if (!Validation.required(email)) {
            NotificationService.showError('Email користувача є обов’язковим.');
            return;
        }

        userLibrary.add(new User(generateId(), name, email));
        saveData();
        NotificationService.show('Користувача успішно додано!');
        render();
    });

    addBookEvents();

    document.querySelectorAll('.delete-user').forEach(button => {
        button.addEventListener('click', () => {
            const id = (button as HTMLElement).dataset.userId;
            if (!id) return;

            const user = userLibrary.findById(id);
            if (!user) return;

            if (user.borrowedBooks.length > 0) {
                NotificationService.show('Не можна видалити користувача, який має позичені книги.');
                return;
            }

            userLibrary.remove(id);
            saveData();
            NotificationService.show('Користувача успішно видалено!');
            render();
        });
    });
}

function addBookEvents(): void {
    document.querySelectorAll('.delete-book').forEach(button => {
        button.addEventListener('click', () => {
            const id = (button as HTMLElement).dataset.bookId;
            if (!id) return;

            const book = bookLibrary.findById(id);
            if (!book) return;

            if (book.isBorrowed) {
                NotificationService.show('Не можна видалити позичену книгу.');
                return;
            }

            bookLibrary.remove(id);
            saveData();
            NotificationService.show('Книгу успішно видалено!');
            render();
        });
    });

    document.querySelectorAll('.borrow-book').forEach(button => {
        button.addEventListener('click', () => {
            const id = (button as HTMLElement).dataset.bookId;
            if (!id) return;

            const select = document.querySelector(`.borrow-user[data-book-id="${id}"]`) as HTMLSelectElement | null;
            if (!select?.value) {
                NotificationService.show('Будь ласка, виберіть користувача.');
                return;
            }

            const book = bookLibrary.findById(id);
            const user = userLibrary.findById(select.value);
            if (!book || !user) return;

            if (user.borrowedBooks.length >= 3) {
                showLimitModal(user);
                return;
            }

            if (!bookLibrary.borrowBook(book, user)) {
                NotificationService.show('Не вдалося позичити книгу.');
                return;
            }

            saveData();
            NotificationService.show(`Книгу позичив користувач ${user.name}.`);
            render();
        });
    });

    document.querySelectorAll('.return-book').forEach(button => {
        button.addEventListener('click', () => {
            const element = button as HTMLElement;
            const book = bookLibrary.findById(element.dataset.bookId!);
            const user = userLibrary.findById(element.dataset.userId!);

            if (!book || !user) return;

            if (!bookLibrary.returnBook(book, user)) {
                NotificationService.show('Не вдалося повернути книгу.');
                return;
            }

            saveData();
            NotificationService.show('Книгу успішно повернуто!');
            render();
        });
    });
}

saveData();
render();
