import { IBook } from '../../interfaces/IBook';
import { IUser } from '../../interfaces/IUser';

export function renderBookList(books: IBook[], users: IUser[]): string {
    return `
  <section class="library-card">
   <h2>Список Книг</h2>
   <input type="text" id="book-search" placeholder="Пошук за назвою або автором...">
   <div id="book-list">
    ${
        books.length === 0
            ? '<p class="empty-message">Книг ще немає.</p>'
            : books
                  .map((book) => {
                      const borrowedBy = users.find((user) =>
                          user.borrowedBooks.includes(book.id)
                      );
                      return `
      <div class="book-item">
       <div class="book-info">
        <h3>${book.title} — ${book.author} (${book.year})</h3>
        <p>Автор: ${book.author}</p>
        <p>Рік: ${book.year}</p>
       </div>
       <div class="book-actions" style="display: flex; gap: 8px; align-items: center;">
        ${
            !book.isBorrowed
                ? `
         <select class="borrow-user" data-book-id="${book.id}">
          <option value="">Користувач</option>
          ${users.map((user) => `<option value="${user.id}">${user.name}</option>`).join('')}
         </select>
         <button class="borrow-book btn-blue" data-book-id="${book.id}">Позичити</button>`
                : borrowedBy
                  ? `
         <button class="return-book btn-return" data-book-id="${book.id}" data-user-id="${borrowedBy.id}">Повернути</button>`
                  : ''
        }
        <button class="delete-book btn-red" data-book-id="${book.id}">Видалити</button>
       </div>
      </div>
     `;
                  })
                  .join('')
    }
   </div>
  </section>
 `;
}
