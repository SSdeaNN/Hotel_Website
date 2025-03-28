export interface Hotel {
    id: string;
    name: string;
    address: string;
    phone: string;
}

export interface Room {
    id: string;
    name: string;
    type: string;
    price: number;
    amenities: string;
    image: string;
    hotel: Hotel;
    guests: number;
}