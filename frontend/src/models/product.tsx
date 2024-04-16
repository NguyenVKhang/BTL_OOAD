interface Image {
    id: number;
    path: string;
}

interface Inspect {
    id: number;
    admin_id: number;
    description: string;
    status: string;
}

interface Seller {
    name: string;
    id: number;
}

interface Product {
    id: number;
    title: string;
    description: string;
    artist: string;
    max_estimate: number;
    min_estimate: number;
    numerical_order: number;
    auto_extend_time: number;
    status: string;
    visibility: string;
    condition_report: string;
    seller_id: string;
    auction_id: string | null;
    winner_id: string | null;
    dimension: string;
    provenance: string;
    inspect: Inspect | null;
    image_path: Image[];
    love: number;
    seller: Seller;
}