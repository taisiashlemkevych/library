export class Validation {
    static required(value: string): boolean {
        return value.trim().length > 0;
    }

    static publicationYear(year: string): boolean {
        return /^\d{4}$/.test(year);
    }
}
