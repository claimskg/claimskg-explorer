import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Language} from '../models/utils/Language';
import {Organization} from '../models/utils/Organization';
import * as UtilsRequest from '../models/data/utils_request_data.json';
import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

const options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/sparql-results+json')
};

const requestLanguages = (UtilsRequest as any).languagesRequest;
const requestOrganizations = (UtilsRequest as any).sourcesRequest;

@Injectable({
  providedIn: 'root'
})
export class UtilsDataSparqlService {

  constructor(private http: HttpClient) { }

  private static convertJSONtoLanguages(response: any): Language[] {
    const results = response.results.bindings;
    const languages = [];
    for (const result of results) {
      const newLanguage = new Language();
      newLanguage.id = result.inLanguage.value;
      newLanguage.name = result.language.value;
      languages.push(newLanguage);
    }

    return languages;
  }

  private static convertJSONtoOrganizations(response: any): Organization[] {
    const results = response.results.bindings;
    const organizations = [];
    for (const result of results) {
      const newOrganization = new Organization();
      newOrganization.id = result.organization.value;
      newOrganization.name = result.source.value;
      organizations.push(newOrganization);
    }

    return organizations;
  }

  getAllLanguages(): Observable<Language[]> {
    let params = new HttpParams();
    params = params.set('query', requestLanguages);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONtoLanguages(res)));
  }

  getAllSources(): Observable<Organization[]> {
    let params = new HttpParams();
    params = params.set('query', requestOrganizations);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONtoOrganizations(res)));
  }
}
