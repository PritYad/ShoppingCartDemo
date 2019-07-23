export class Products {
    productList: [IProduct];
    constructor(mockResponse: any) {
        this.productList = mockResponse;
    }
}

export interface IProduct {
    title: string;
    brand: string;
    price: number;
    description: string;
    image: string;
}

export interface ICartProduct {
    title: string;
    brand: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    showButtons ?: boolean;
    totalPrice ?: bigint;
}
