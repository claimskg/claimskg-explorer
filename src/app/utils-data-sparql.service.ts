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
import {StatClaim} from '../models/utils/StatClaim';

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
  private static convertJSONToStatistics(response: any): StatClaim[] {
    const results = response.results.bindings;
    const stats = [];
    const global = new StatClaim();
    global.name = 'Global';
    for (const result of results) {
      const newStat = new StatClaim();
      newStat.name = Utils.capitalize(result.name.value);
      newStat.total = parseInt(result.total.value, 0);
      global.total += newStat.total;
      newStat.true = parseInt(result.true.value, 0);
      global.true += newStat.true;
      newStat.false = parseInt(result.false.value, 0);
      global.false += newStat.false;
      newStat.mixture = parseInt(result.mixture.value, 0);
      global.mixture += newStat.mixture;
      newStat.other = parseInt(result.other.value, 0);
      global.other += newStat.other;
      stats.push(newStat);
    }
    stats.unshift(global);
    return stats;
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

  getClaimsStatistics(): Observable<StatClaim[]> {
    let params = new HttpParams();
    params = params.set('query', RequestUtils.statisticRequest);
    return this.http.post<any>(environment.endpoint,  params, options)
      .pipe(map(res => (UtilsDataSparqlService.convertJSONToStatistics(res))));
  }
}
