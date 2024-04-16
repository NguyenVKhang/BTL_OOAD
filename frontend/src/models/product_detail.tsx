interface Image {
    id: number,
    url: string,
}

interface Inspect {
    id: number;
    admin_id: number;
    description: string;
    status: string;
}

interface Category {
    id: number;
    name: string;
}

interface Seller {
    id: number;
    name: string;
}

export default interface ProductDetail {
    id: number;
    images: Image[];
    title: string;
    status: string;
    numerical_order?: number;
    max_bid?: number;
    min_estimate?: number;
    max_estimate?: number;
    price?:number;
    description: string;
    dimensions: string;
    artist: string;
    love?: number;
    condition_report?: string;
    provenance?: string;
    inspect: Inspect | null;
    visibility: string;
    categories: Category[];
    seller: Seller;
}