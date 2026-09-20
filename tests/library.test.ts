import { expect } from 'chai';
import { Book } from '../src/models/Book';
import { Library } from '../src/services/Library';

describe('Library', () => {
    it('should add a book', () => {
        const library = new Library<Book>();
        const book = new Book('1', 'Harry Potter', 'J.K. Rowling', 1997);

        library.add(book);

        expect(library.getAll()).to.have.lengthOf(1);
        expect(library.findById('1')).to.equal(book);
    });

    it('should remove a book', () => {
        const library = new Library<Book>();
        const book = new Book('1', 'Harry Potter', 'J.K. Rowling', 1997);

        library.add(book);
        library.remove('1');

        expect(library.getAll()).to.have.lengthOf(0);
        expect(library.findById('1')).to.equal(undefined);
    });

    it('should search books', () => {
        const library = new Library<Book>();

        const book1 = new Book(
            '1',
            'Harry Potter',
            'J.K. Rowling',
            1997
        );

        const book2 = new Book(
            '2',
            'The Hobbit',
            'J.R.R. Tolkien',
            1937
        );

        library.add(book1);
        library.add(book2);

        const result = library.search(
            book => book.author === 'J.K. Rowling'
        );

        expect(result).to.have.lengthOf(1);
        expect(result[0]).to.equal(book1);
    });
});