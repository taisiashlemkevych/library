import { IBook } from '../interfaces/IBook.js';

export class Book implements IBook {
    constructor(
        private _id: string,
        private _title: string,
        private _author: string,
        private _year: number,
        private _isBorrowed: boolean = false
    ) {}

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get author(): string {
        return this._author;
    }

    get year(): number {
        return this._year;
    }

    get isBorrowed(): boolean {
        return this._isBorrowed;
    }

    set isBorrowed(value: boolean) {
        this._isBorrowed = value;
    }
}