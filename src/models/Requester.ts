/* tslint:disable:no-trailing-whitespace */
import * as request_data from './data/preview_request_data.json';
import {environment} from '../environments/environment';
import {Utils} from './utils/Utils';

const prefixes = (request_data as any).prefixes;
const select = (request_data as any).select;
const clauses = (request_data as any).clauses;

export class Requester {
  entities: string[];
  truthRatings: number[];
  author: string;
  keywords: string[];
  languages: string[];
  sources: string[];
  dates: Date[];
  currentOffset: number;

  constructor() {
    this.languages = [];
    this.sources = [];
    this.truthRatings = [];
    this.entities = [];
    this.keywords = [];
    this.dates = [];
    this.currentOffset = 0;
  }

  private static getStringifiedDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  public toSPARQL(): string {
    let request = '';
    for (const prefix of prefixes) {
      request += prefix + ' ';
    }
    request += 'select distinct ' + select + ' where { ';
    for (let clause of clauses) {
      if (clause.includes(Utils.IRI_MARKER)) {
        clause = clause.replace(new RegExp(Utils.IRI_MARKER, 'g'), environment.graph_iri) ;
      }
      request += clause + ' . ';
    }
    if (this.author) {
      request += 'FILTER regex(lcase(str(?author)), "' + this.author.toLowerCase() + '") . ';
    }
    if (this.dates && this.dates.length === 2) {
      request += 'FILTER (?date >= "'
        + Requester.getStringifiedDate(this.dates[0])
        + '"^^xsd:dateTime && ?date <= "'
        + Requester.getStringifiedDate(this.dates[1]) + '"^^xsd:dateTime) . ';
    }
    if (this.entities && this.entities.length > 0) {
      request += '?claims schema:mentions ?entities .';
      request += '?entities nif:isString ?entities_name .';
      request += 'FILTER (';
      for (const entity of this.entities) {
        request += 'contains (lcase(str(?entities_name)), "' + entity.toLowerCase() + '") || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    if (this.truthRatings && this.truthRatings.length > 0) {
      request += 'FILTER (';
      for (const rating of this.truthRatings) {
        request += '?truthRating = ' + rating + ' || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') . ';
    }
    if (this.languages && this.languages.length > 0) {
      request += '?claims schema:inLanguage ?inLanguage .';
      request += '?inLanguage schema:name ?language . ';
      request += 'FILTER (';
      for (const language of this.languages) {
        request += '?language = "' + language + '" || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    if (this.sources && this.sources.length > 0) {
      request += '?claims schema:author ?sourceAuthor .';
      request += '?sourceAuthor schema:name ?source . ';
      request += 'FILTER (';
      for (const source of this.sources) {
        request += 'contains(?source ,"' + source + '") || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    if (this.keywords && this.keywords.length > 0) {
      request += 'OPTIONAL {?item schema:keywords ?keywords} . ';
      request += 'FILTER (';
      for (const word of this.keywords) {
        request += 'contains (lcase(str(?keywords)), "' + word.toLowerCase() + '") || contains (lcase(str(?text)), "'
                + word.toLowerCase() + '") || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    request += '}';
    request += 'LIMIT ' + environment.resultPerPage + ' ';
    request += 'OFFSET ' + this.currentOffset;

    return request;
  }

  public incrementOffset(): void {
    this.currentOffset += environment.resultPerPage;
  }

  public decrementOffset(): void {
    this.currentOffset -= environment.resultPerPage;
  }

  public getLimit(): number {
    return environment.resultPerPage;
  }

  public getCurrentPageIndex(): number {
    return (this.currentOffset / this.getLimit()) + 1;
  }

  public setPage(page: number) {
    this.currentOffset = (page - 1) * this.getLimit();
  }
}
