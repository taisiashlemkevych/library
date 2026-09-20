export function renderBookForm(): string {
    return `
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
    `;
}
