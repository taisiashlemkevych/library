export class NotificationService {
    static show(message: string): void {
        const notification = document.createElement('div');

        notification.className =
            'library-notification library-notification-info';

        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    static showError(message: string): void {
        const notification = document.createElement('div');

        notification.className =
            'library-notification library-notification-error';

        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}