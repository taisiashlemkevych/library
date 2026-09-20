import { Book } from '../models/Book.js';
import { User } from '../models/User.js';

export class Library<T extends { id: string }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    findById(id: string): T | undefined {
        return this.items.find(item => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }

    search(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }

    borrowBook(book: Book, user: User): boolean {
        if (book.isBorrowed) {
            return false;
        }

        if (user.borrowedBooks.length >= 3) {
            return false;
        }

        book.isBorrowed = true;
        user.addBook(book.id);

        return true;
    }

    returnBook(book: Book, user: User): boolean {
        if (!book.isBorrowed) {
            return false;
        }

        book.isBorrowed = false;
        user.removeBook(book.id);

        return true;
    }
}