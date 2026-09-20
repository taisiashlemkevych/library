export function renderUserForm(): string {
    return `
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
    `;
}
