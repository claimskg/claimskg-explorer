import {environment} from '../environments/environment';
import {RequestUtils} from './utils/RequestUtils';

export class Requester {

  constructor() {
    this.languages = [];
    this.sources = [];
    this.truthRatings = [];
    this.entities = [];
    this.keywords = [];
    this.dates = [];
    this.currentOffset = 0;
    this.entitiesConjunctionMode = false;
    this.keywordsConjunctionMode = false;
  }
  private static readonly requestData = RequestUtils.previewRequest;
  entities: string[];
  truthRatings: number[];
  author: string;
  keywords: string[];
  languages: string[];
  sources: string[];
  dates: Date[];
  currentOffset: number;
  entitiesConjunctionMode: boolean;
  keywordsConjunctionMode: boolean;

  private static getStringifiedDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  public toSPARQL(): string {
    let request = '';
    for (const prefix of Requester.requestData.prefixes) {
      request += prefix + ' ';
    }
    if (this.superRequestIsTriggered()) {
      request += 'select ' + Requester.requestData.superSelectConjunction + ' where { {';
      request += this.getNormalSelectCore();
    } else {
      request += 'select distinct ' + Requester.requestData.select + ' where { ';
    }

    request += this.getRequestCore();

    request += 'LIMIT ' + environment.resultPerPage + ' ';
    request += 'OFFSET ' + this.currentOffset;

    return request;
  }

  public toCountSPARQL(): string {
    let request = '';
    for (const prefix of Requester.requestData.prefixes) {
      request += prefix + ' ';
    }
    request += 'select count(*) as ?count where { ';
    if (this.superRequestIsTriggered()) {
      request += ' { ';
      request += this.getNormalSelectCore();
    }

    request += this.getRequestCore();

    return request;
  }

  private getNormalSelectCore(): string {
    let request = 'select ' + Requester.requestData.select;
    if (this.entitiesConjunctionIsTriggered()) {
      request += ' group_concat(?mentions, ",") as ?mentions ';
    }
    if (this.keywordsConjunctionIsTriggered()) {
      request += ' group_concat(?keywords, ",") as ?keywords ';
    }
    request += ' where { ';

    return request;
  }

  private getRequestCore(): string {
    let request = '';
    for (const clause of Requester.requestData.clauses) {
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
      request += '?claims schema:mentions ?mentions_links . ';
      request += '?mentions_links nif:isString ?mentions .';
      request += 'FILTER (';
      for (const entity of this.entities) {
        request += 'contains (lcase(str(?mentions)), "' + entity.toLowerCase() + '") || ';
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
        request += 'contains (lcase(str(?keywords)), "' + word.toLowerCase() + '") ' +
          '|| contains (lcase(str(?text)), "' + word.toLowerCase() + '") ' +
          '|| contains (lcase(str(?headline)), "' + word.toLowerCase() + '") || ';
      }
      request = request.slice(0 , -4); // Delete last ' || '
      request += ') .';
    }
    request += '}';
    if (this.superRequestIsTriggered()) {
      request += '}';
      if (this.entitiesConjunctionIsTriggered()) {
        request += 'FILTER (';
        for (const entity of this.entities) {
          request += 'contains (lcase(str(?mentions)), "' + entity.toLowerCase() + '") && ';
        }
        request = request.slice(0 , -4); // Delete last ' && '
        request += ') . ';
      }
      if (this.keywordsConjunctionIsTriggered()) {
        request += 'FILTER (';
        for (const keyword of this.keywords) {
          request += '(contains (lcase(str(?keywords)), "' + keyword.toLowerCase() +
            '") || contains (lcase(str(?text)), "' + keyword.toLowerCase() + '")) && ';
        }
        request = request.slice(0 , -4); // Delete last ' && '
        request += ') . ';
      }
      request += '}';
    }

    return request;
  }

  private superRequestIsTriggered() {
    return this.entitiesConjunctionIsTriggered()
      || this.keywordsConjunctionIsTriggered();
  }

  private entitiesConjunctionIsTriggered() {
    return this.entities && this.entities.length > 1 && this.entitiesConjunctionMode;
  }

  private keywordsConjunctionIsTriggered() {
    return this.keywords && this.keywords.length > 1 && this.keywordsConjunctionMode;
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
