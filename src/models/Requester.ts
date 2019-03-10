/* tslint:disable:no-trailing-whitespace */
import * as request_data from './data/request_data.json';
import {RatingEnum} from './RatingEnum';
import {environment} from '../environments/environment';

const prefixes = (request_data as any).prefixes;
const select = (request_data as any).select;
const clauses = (request_data as any).clauses;

export class Requester {
  entities: string[];
  truthRatings: number[];
  author: string;
  keywords: string[];
  languages: string[];
  dates: Date[];
  currentOffset: number;

  constructor() {
    this.languages = [];
    this.truthRatings = [];
    this.entities = [];
    this.keywords = [];
    this.dates = [];
    this.currentOffset = 0;
  }

  public toSPARQL(): string {
    let request = '';
    for (const prefix of prefixes) {
      request += prefix + ' ';
    }
    request += 'select distinct ' + select + ' where { ';
    for (const clause of clauses) {
      request += clause + ' . ';
    }
    if (this.author) {
      request += 'FILTER regex(?author, "' + this.author + '") . ';
    }
    if (this.dates && this.dates.length === 2) {
      request += 'FILTER (?date >= "'
        + this.getStringifiedDate(this.dates[0])
        + '"^^xsd:dateTime && ?date <= "'
        + this.getStringifiedDate(this.dates[1]) + '"^^xsd:dateTime) . ';
    }
    if (this.entities && this.entities.length > 0) {
      request += '?claims schema:mentions ?entities .';
      request += '?entities nif:isString ?entities_name .';
      request += 'FILTER (';
      for (const entity of this.entities) {
        request += 'contains (?entities_name, "' + entity + '") || ';
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
    if (this.keywords && this.keywords.length > 0) {
      request += 'OPTIONAL {?item schema:keywords ?keywords} . ';
      request += 'FILTER (';
      for (const word of this.keywords) {
        request += 'contains (?keywords, "' + word + '") || contains (?headline, "' + word + '") || contains (?text, "' + word + '") || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    request += '}';
    request += 'LIMIT ' + environment.resultPerPage + ' ';
    request += 'OFFSET ' + this.currentOffset;

    return request;
  }

  private getStringifiedDate(date: Date): string {
    return date.toISOString().split('T')[0];
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
