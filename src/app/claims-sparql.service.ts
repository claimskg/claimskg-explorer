import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment} from '../environments/environment';
import {Requester} from '../models/Requester';
import {ClaimPreview} from '../models/ClaimPreview';

const options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/sparql-results+json')
};

@Injectable({
  providedIn: 'root'
})
export class ClaimsSparqlService {

  constructor(private http: HttpClient) { }

  private static convertJSONtoClaimsPreview(response: any): ClaimPreview[] {
    const results = response.results.bindings;
    const claims = [];
    for (const result of results) {
      const newClaim = new ClaimPreview();
      newClaim.id = result.id.value;
      newClaim.author = result.author.value;
      newClaim.date = result.date.value;
      newClaim.link = result.link.value;
      newClaim.truthRating = parseInt(result.truthRating.value, 10);
      newClaim.ratingName = result.ratingName.value;
      newClaim.text = result.text.value;
      claims.push(newClaim);
    }
    return claims;
  }

  getClaimsPreview(request: Requester): Observable<ClaimPreview[]> {
    let params = new HttpParams();
    params = params.set('query', request.toSPARQL());
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = ClaimsSparqlService.convertJSONtoClaimsPreview(res)));
  }
}
