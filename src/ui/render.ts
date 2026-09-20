import { IBook } from '../interfaces/IBook';
import { IUser } from '../interfaces/IUser';
import { renderBookForm } from './components/BookForm';
import { renderBookList } from './components/BookList';
import { renderUserForm } from './components/UserForm';

export function renderBooks(
 container: HTMLElement,
 books: IBook[],
 users: IUser[]
): void {
 container.innerHTML = `
  <main class="library-container">
   <h1 class="library-title">Система Управління Бібліотекою</h1>
   ${renderBookForm()}
   ${renderUserForm()}
   ${renderBookList(books, users)}
   <section class="library-card">
    <h2>Список Користувачів</h2>
    <div id="user-list">
     ${
      users.length === 0
       ? '<p class="empty-message">Користувачів ще немає.</p>'
       : users.map(user => `
        <div class="user-item">
         <span>ID: ${user.id} | Ім'я: ${user.name} | Email:${user.email}</span>
         <div class="book-actions">
          <span class="status">Книг: ${user.borrowedBooks.length}</span>
          <button class="delete-user btn-red" data-user-id="${user.id}">Видалити</button>
         </div>
        </div>
       `).join('')
     }
    </div>
   </section>
  </main>
 `;
}
