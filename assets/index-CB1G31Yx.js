var e=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r=e((()=>{n=class{_id;_title;_author;_year;_isBorrowed;constructor(e,t,n,r,i=!1){this._id=e,this._title=t,this._author=n,this._year=r,this._isBorrowed=i}get id(){return this._id}get title(){return this._title}get author(){return this._author}get year(){return this._year}get isBorrowed(){return this._isBorrowed}set isBorrowed(e){this._isBorrowed=e}}})),i,a=e((()=>{i=class{_id;_name;_email;_borrowedBooks;constructor(e,t,n,r=[]){this._id=e,this._name=t,this._email=n,this._borrowedBooks=r}get id(){return this._id}get name(){return this._name}get email(){return this._email}get borrowedBooks(){return this._borrowedBooks}addBook(e){this._borrowedBooks.push(e)}removeBook(e){this._borrowedBooks=this._borrowedBooks.filter(t=>t!==e)}}})),o,s=e((()=>{o=class{items=[];add(e){this.items.push(e)}remove(e){this.items=this.items.filter(t=>t.id!==e)}findById(e){return this.items.find(t=>t.id===e)}getAll(){return[...this.items]}search(e){return this.items.filter(e)}borrowBook(e,t){return e.isBorrowed||t.borrowedBooks.length>=3?!1:(e.isBorrowed=!0,t.addBook(e.id),!0)}returnBook(e,t){return e.isBorrowed?(e.isBorrowed=!1,t.removeBook(e.id),!0):!1}}})),c,l=e((()=>{c=class{static save(e,t){localStorage.setItem(e,JSON.stringify(t))}static load(e){let t=localStorage.getItem(e);return t?JSON.parse(t):null}static remove(e){localStorage.removeItem(e)}}})),u,d=e((()=>{u=class{static show(e){let t=document.createElement(`div`);t.className=`library-notification library-notification-info`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}static showError(e){let t=document.createElement(`div`);t.className=`library-notification library-notification-error`,t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}}})),f,p=e((()=>{f=class{static required(e){return e.trim().length>0}static userId(e){return/^\d+$/.test(e)}static publicationYear(e){return/^\d{4}$/.test(e)}}}));function m(){return`
        <section class="library-card">
            <h2>Додати Книгу</h2>

            <form id="book-form" class="library-form">
                <input
                    type="text"
                    id="book-title"
                    placeholder="Назва книги"
                    required
                >

                <input
                    type="text"
                    id="book-author"
                    placeholder="Автор"
                    required
                >

                <input
                    type="text"
                    id="book-year"
                    placeholder="Рік видання"
                    inputmode="numeric"
                    required
                >

                <button type="submit" class="btn-green">
                    Додати Книгу
                </button>
            </form>
        </section>
    `}var h=e((()=>{}));function g(e,t){return`
    <section class="library-card">
      <h2>Список Книг</h2>
      <input type="text" id="book-search" placeholder="Пошук за назвою або автором...">
      <div id="book-list">
        ${e.length===0?`<p class="empty-message">Книг не знайдено.</p>`:e.map(e=>{let n=t.find(t=>t.borrowedBooks.includes(e.id));return`
            <div class="book-item">
              <div class="book-info">
                <h3>${e.title} — ${e.author} (${e.year})</h3>
                <p>Автор: ${e.author}</p>
                <p>Рік: ${e.year}</p>
              </div>
              <div class="book-actions">
                ${e.isBorrowed?n?`
                  <button class="return-book btn-return" data-book-id="${e.id}" data-user-id="${n.id}">Повернути</button>
                `:``:`
                  <select class="borrow-user" data-book-id="${e.id}">
                    <option value="">Користувач</option>
                    ${t.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}
                  </select>
                  <button class="borrow-book btn-blue" data-book-id="${e.id}">Позичити</button>
                `}
                <button class="delete-book btn-red" data-book-id="${e.id}">Видалити</button>
              </div>
            </div>
          `}).join(``)}
      </div>
      <div class="pagination" id="pagination">
        <button class="pagination-button" id="previous-page">Попередня</button>
        <span id="page-info">Сторінка 1</span>
        <button class="pagination-button" id="next-page">Наступна</button>
      </div>
    </section>
  `}var _=e((()=>{}));function v(){return`
        <section class="library-card">
            <h2>Додати Користувача</h2>

            <form id="user-form" class="library-form">
                <input
                    type="text"
                    id="user-name"
                    placeholder="Ім'я"
                    required
                >

                <input
                    type="email"
                    id="user-email"
                    placeholder="Email"
                    required
                >

                <button type="submit" class="btn-green">
                    Додати Користувача
                </button>
            </form>
        </section>
    `}var y=e((()=>{}));function b(e,t,n){e.innerHTML=`
  <main class="library-container">
   <h1 class="library-title">Система Управління Бібліотекою</h1>
   ${m()}
   ${v()}
   ${g(t,n)}
   <section class="library-card">
    <h2>Список Користувачів</h2>
    <div id="user-list">
     ${n.length===0?`<p class="empty-message">Користувачів ще немає.</p>`:n.map(e=>`
        <div class="user-item">
         <span>ID: ${e.id} | Ім'я: ${e.name} | Email:${e.email}</span>
         <div class="book-actions">
          <span class="status">Книг: ${e.borrowedBooks.length}</span>
          <button class="delete-user btn-red" data-user-id="${e.id}">Видалити</button>
         </div>
        </div>
       `).join(``)}
    </div>
   </section>
  </main>
 `}var x=e((()=>{h(),_(),y()}));function S(e,t){return`
        <div class="library-modal" id="modal">
            <div class="library-modal-content">
                <button
                    class="library-modal-close"
                    id="modal-close"
                >
                    ×
                </button>

                <h2>${e}</h2>

                <div>
                    ${t}
                </div>
            </div>
        </div>
    `}var C=e((()=>{}));function w(){return crypto.randomUUID()}var T=e((()=>{})),E=e((()=>{}));t((()=>{r(),a(),s(),l(),d(),p(),x(),C(),T(),E();var e=document.getElementById(`app`),t=c.load(`books`),m=c.load(`users`),h=t?t.map(e=>new n(e._id,e._title,e._author,e._year,e._isBorrowed)):[],g=m?m.map(e=>new i(e._id,e._name,e._email,e._borrowedBooks)):[],_=new o,v=new o;h.forEach(e=>_.add(e)),g.forEach(e=>v.add(e));var y=5,D=1,O=``;function k(){c.save(`books`,_.getAll()),c.save(`users`,v.getAll())}function A(){let e=_.getAll();return O?e.filter(e=>e.title.toLowerCase().includes(O)||e.author.toLowerCase().includes(O)):e}function j(){return Math.max(1,Math.ceil(A().length/y))}function M(e){document.getElementById(`modal`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,S(`Ліміт книг`,`Користувач ${e.name} вже має 3 книги. Неможливо взяти четверту книгу.`)),document.getElementById(`modal-close`)?.addEventListener(`click`,()=>{document.getElementById(`modal`)?.remove()}),document.getElementById(`modal`)?.addEventListener(`click`,e=>{e.target===e.currentTarget&&document.getElementById(`modal`)?.remove()})}function N(){let t=A(),n=j();D=Math.min(D,n);let r=(D-1)*y;b(e,t.slice(r,r+y),v.getAll());let i=document.getElementById(`book-search`);i&&(i.value=O),P(),F()}function P(){let e=j(),t=document.getElementById(`page-info`),n=document.getElementById(`previous-page`),r=document.getElementById(`next-page`);t&&(t.textContent=`Сторінка ${D} з ${e}`),n&&(n.disabled=D===1),r&&(r.disabled=D===e)}function F(){document.getElementById(`previous-page`)?.addEventListener(`click`,()=>{D>1&&(D--,N())}),document.getElementById(`next-page`)?.addEventListener(`click`,()=>{D<j()&&(D++,N())}),document.getElementById(`book-search`)?.addEventListener(`input`,e=>{O=e.target.value.trim().toLowerCase(),D=1;let t=A().slice(0,y),n=document.getElementById(`book-list`);if(n){let e=document.createElement(`div`);b(e,t,v.getAll());let r=e.querySelector(`#book-list`);r&&(n.innerHTML=r.innerHTML)}P(),I()}),document.getElementById(`book-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`book-title`).value.trim(),r=document.getElementById(`book-author`).value.trim(),i=document.getElementById(`book-year`).value.trim();if(!f.required(t)||!f.required(r)||!f.required(i)){u.showError(`Усі поля книги є обов’язковими.`);return}if(!f.publicationYear(i)){u.showError(`Рік видання має містити 4 цифри.`);return}_.add(new n(w(),t,r,Number(i))),k(),u.show(`Книгу успішно додано!`),N()}),document.getElementById(`user-form`)?.addEventListener(`submit`,e=>{e.preventDefault();let t=document.getElementById(`user-name`).value.trim(),n=document.getElementById(`user-email`).value.trim();if(!f.required(t)){u.showError(`Ім’я користувача є обов’язковим.`);return}if(!f.required(n)){u.showError(`Email користувача є обов’язковим.`);return}v.add(new i(w(),t,n)),k(),u.show(`Користувача успішно додано!`),N()}),I(),document.querySelectorAll(`.delete-user`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.userId;if(!t)return;let n=v.findById(t);if(n){if(n.borrowedBooks.length>0){u.show(`Не можна видалити користувача, який має позичені книги.`);return}v.remove(t),k(),u.show(`Користувача успішно видалено!`),N()}})})}function I(){document.querySelectorAll(`.delete-book`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bookId;if(!t)return;let n=_.findById(t);if(n){if(n.isBorrowed){u.show(`Не можна видалити позичену книгу.`);return}_.remove(t),k(),u.show(`Книгу успішно видалено!`),N()}})}),document.querySelectorAll(`.borrow-book`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bookId;if(!t)return;let n=document.querySelector(`.borrow-user[data-book-id="${t}"]`);if(!n?.value){u.show(`Будь ласка, виберіть користувача.`);return}let r=_.findById(t),i=v.findById(n.value);if(r&&i){if(i.borrowedBooks.length>=3){M(i);return}if(!_.borrowBook(r,i)){u.show(`Не вдалося позичити книгу.`);return}k(),u.show(`Книгу позичив користувач ${i.name}.`),N()}})}),document.querySelectorAll(`.return-book`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e,n=_.findById(t.dataset.bookId),r=v.findById(t.dataset.userId);if(n&&r){if(!_.returnBook(n,r)){u.show(`Не вдалося повернути книгу.`);return}k(),u.show(`Книгу успішно повернуто!`),N()}})})}k(),N()}))();