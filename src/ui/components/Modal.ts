export function renderModal(
    title: string,
    content: string
): string {
    return `
        <div class="modal" id="modal">
            <div class="modal-content">
                <button id="modal-close">×</button>

                <h2>${title}</h2>

                <div>
                    ${content}
                </div>
            </div>
        </div>
    `;
}