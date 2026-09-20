import { IUser } from '../interfaces/IUser.js';

export class User implements IUser {
    constructor(
        private _id: string,
        private _name: string,
        private _borrowedBooks: string[] = []
    ) {}

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get borrowedBooks(): string[] {
        return this._borrowedBooks;
    }

    addBook(bookId: string): void {
        this._borrowedBooks.push(bookId);
    }

    removeBook(bookId: string): void {
        this._borrowedBooks = this._borrowedBooks.filter((id) => id !== bookId);
    }
}
