export class Asset<T> {
    private location: string;
    private data: T;
    public get Data(): T {
        return this.data;
    }

    public constructor(location: string) {
        this.location = location;

        this.load();
    }

    public async load(): Promise<void> {
        try {
            this.data = await import(this.location);
        } catch (error: any) {
            throw new Error(`Failed to load asset at ${this.location}`);
        }
    }
}