import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Requester } from '../models/Requester';
import { ClaimPreview } from '../models/ClaimPreview';
import { Claim } from '../models/Claim';
import { ResultCount } from '../models/utils/ResultCount';

const options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/sparql-results+json')
};

@Injectable({
  providedIn: 'root'
})
export class ClaimsSparqlService {

  constructor(private http: HttpClient) { }

  getClaimsPreview(request: Requester): Observable<ClaimPreview[]> {
    let params = new HttpParams();
    params = params.set('query', request.toSPARQL());
    return this.http.post<any>(environment.endpoint, params, options)
      .pipe(map(res => ClaimPreview.convertJSONtoClaimsPreview(res)));
  }

  getClaimsPreviewCount(request: Requester): Observable<ResultCount> {
    let params = new HttpParams();
    params = params.set('query', request.toCountSPARQL());
    return this.http.post<any>(environment.endpoint, params, options)
      .pipe(map(res => (new ResultCount(res.results.bindings))));
  }

  getClaim(claimId: string): Observable<Claim> {
    let params = new HttpParams();
    params = params.set('query', Claim.getSPARQLToSelect(claimId));
    return this.http.post<any>(environment.endpoint, params, options)
      .pipe(map(res => (res.results.bindings.length > 0) ? new Claim(res.results.bindings[0]) : null));
  }
}
