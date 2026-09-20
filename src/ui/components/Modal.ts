export function renderModal(title: string, content: string): string {
    return `
        <div class="library-modal" id="modal">
            <div class="library-modal-content">
                <button
                    class="library-modal-close"
                    id="modal-close"
                >
                    ×
                </button>

                <h2>${title}</h2>

                <div>
                    ${content}
                </div>
            </div>
        </div>
    `;
}
