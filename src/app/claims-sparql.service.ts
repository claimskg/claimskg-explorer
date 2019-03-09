import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {URLSearchParams} from 'url';
import { Observable, of } from 'rxjs';
import { environment} from '../environments/environment';
import {Requester} from '../models/Requester';
import {ClaimPreview} from '../models/data/ClaimPreview';

@Injectable({
  providedIn: 'root'
})
export class ClaimsSparqlService {

  constructor(private http: HttpClient) { }

  getClaimsPreview(request: Requester): Observable<ClaimPreview[]> {
    let params = new HttpParams();
    const headers = new HttpHeaders();
    params = params.set('query', request.toSPARQL());
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/sparql-results+json')
    };
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = this.convertJSONtoClaimsPreview(res)));
  }

  private convertJSONtoClaimsPreview(response: any): ClaimPreview[] {
    const results = response.results.bindings;
    const claims = [];
    for (const result of results) {
      const newClaim = new ClaimPreview();
      newClaim.id = result.id.value;
      newClaim.author = result.author.value;
      newClaim.date = result.date.value;
      newClaim.link = result.link.value;
      newClaim.truthRating = result.truthRating.value;
      newClaim.ratingName = result.ratingName.value;
      newClaim.text = result.text.value;
      claims.push(newClaim);
    }
    return claims;
  }
}
