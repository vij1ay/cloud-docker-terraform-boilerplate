import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AirbnbListing {
    _id: string;
    listing_url: string;
    name: string;
    summary: string;
    property_type: string;
    room_type: string;
    accommodates: number;
    bedrooms: number;
    beds: number;
    bathrooms: string;
    price: string;
    images: {
        picture_url: string;
    };
    address: {
        street: string;
    };
}

export interface AirbnbResponse {
    page: number;
    limit: number;
    count: number;
    listings: AirbnbListing[];
}

import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FactService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getListings(page: number): Observable<AirbnbResponse> {
        console.log("Calling API - ", this.apiUrl + "/airbnb_listings?page=" + page);
        return this.http.get<AirbnbResponse>(`${this.apiUrl}/airbnb_listings?page=${page}`);
    }
}
