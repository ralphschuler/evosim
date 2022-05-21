export interface IPlant {
    axiom: string;
    rules: Array<{
        symbol: string;
        transform: string;
        probability: number;
    }>
}