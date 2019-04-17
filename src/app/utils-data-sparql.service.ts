import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Language} from '../models/utils/Language';
import {Organization} from '../models/utils/Organization';
import { Observable, of } from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {RequestUtils} from '../models/utils/RequestUtils';
import {Utils} from '../models/utils/Utils';
import {Requester} from '../models/Requester';

const options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', 'application/sparql-results+json')
};

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
      newLanguage.name = Utils.capitalize(result.language.value);
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
      newOrganization.name = Utils.capitalize(result.source.value);
      organizations.push(newOrganization);
    }

    return organizations;
  }

  private static convertJSONToEntitiesNames(response: any): string[] {
    const results = response.results.bindings;
    const entities = [];
    for (const result of results) {
      const newEntity = result.entity.value;
      if (!entities.map(item => item.toLowerCase()).includes(newEntity.toLowerCase())) {
        entities.push(Utils.capitalize(newEntity));
      }
    }
    return entities;
  }

  private static convertJSONToAuthorsNames(response: any): string[] {
    const results = response.results.bindings;
    const authors = [];
    for (const result of results) {
      const newEntity = result.author.value;
      if (!authors.map(item => item.toLowerCase()).includes(newEntity.toLowerCase())) {
        authors.push(Utils.capitalize(newEntity));
      }
    }
    return authors;
  }

  getAllLanguages(): Observable<Language[]> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.languagesRequest);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONtoLanguages(res)));
  }

  getAllSources(): Observable<Organization[]> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.sourcesRequest);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONtoOrganizations(res)));
  }

  getFilteredEntities(entityFragment: string): Observable<string[]> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.filterEntities(entityFragment));
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONToEntitiesNames(res)));
  }

  getFilteredAuthors(entityFragment: string): Observable<string[]> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.filterAuthors(entityFragment));
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => res = UtilsDataSparqlService.convertJSONToAuthorsNames(res)));
  }

  getClaimsTotalCount(): Observable<number> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.countAllRequest);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => (res.results.bindings.length > 0) ? res.results.bindings[0].count.value : null));
  }
}
