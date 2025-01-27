import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { Donor } from './models/donor';
import { Donation } from './models/donation';
import { Entity } from './models/entity';
import { Pickup } from './models/pickup';
import { Rule } from './models/rule';

const endpoint = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  // Donations -----------------------------------------------------------------------
  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(endpoint + 'donations');
  }
  getDonationsFrom(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'donators/' + id + '/donations'
    );
  }

  getDonationsTo(id: string): Observable<Donation[]> {
    return this.http.get<Donation[]>(
      endpoint + 'entities/' + id + '/donations'
    );
  }

  createDonation(donation: any): Observable<Donation> {
    console.log(donation);
    return this.http.post<any>(
      endpoint + 'donations',
      JSON.stringify(donation),
      httpOptions
    );
  }

  // Donor -----------------------------------------------------------------------
  getDonors(): Observable<Donor[]> {
    return this.http.get<Donor[]>(endpoint + 'donators');
  }

  getDonor(id: String): Observable<Donor> {
    return this.http.get<Donor>(endpoint + 'donators/' + id);
  }

  updateDonor(id: string, donor: Donor): Observable<Donor> {
    return this.http.put<Donor>(
      endpoint + 'donators/' + id,
      JSON.stringify(donor),
      httpOptions
    );
  }

  convertDonorPoints(id: string, qtd: number) {
    return this.http.get<any>(
      endpoint + 'donators/' + id + '/convertPoints/' + qtd
    );
  }

  // Entities -----------------------------------------------------------------------
  getEntities(): Observable<Entity[]> {
    return this.http.get<Entity[]>(endpoint + 'entities');
  }

  getEntity(id: String): Observable<Entity> {
    return this.http.get<Entity>(endpoint + 'entities/' + id);
  }

  updateEntity(id: string, entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(
      endpoint + 'entities/' + id,
      JSON.stringify(entity),
      httpOptions
    );
  }

  // Pickups -----------------------------------------------------------------------
  getPickups(): Observable<Pickup[]> {
    return this.http.get<Pickup[]>(endpoint + 'pickups');
  }

  getPickup(id: String): Observable<Pickup> {
    return this.http.get<Pickup>(endpoint + 'pickups/' + id);
  }

  // Pickups -----------------------------------------------------------------------
  getRules(): Observable<Rule[]> {
    return this.http.get<Rule[]>(endpoint + 'rules');
  }

  getRule(id: String): Observable<Rule> {
    return this.http.get<Rule>(endpoint + 'rules/' + id);
  }

  // deleteProduct(id: string): Observable<Product> {
  //   return this.http.delete<Product>(endpoint + 'product/' + id, httpOptions);
  // }
}
