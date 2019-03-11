import * as select_data from './data/select_request_data.json';
import {Utils} from './utils/Utils';
import {environment} from '../environments/environment';

const prefixes = (select_data as any).prefixes;
const select = (select_data as any).select;
const clauses = (select_data as any).clauses;

export class Claim {
  id: string;
  text: string;
  date: string;
  truthRating: number;
  ratingName: string;
  author: string;
  link: string;
  mentions: string[];
  language: string;
  keywords: string[];
  citations: string[];
  source: string;

  constructor(jsonData) {
    this.id = jsonData.id.value;
    this.author = jsonData.author.value;
    this.date = jsonData.date.value;
    this.link = jsonData.link.value;
    this.truthRating = parseInt(jsonData.truthRating.value, 10);
    this.ratingName = jsonData.ratingName.value;
    this.text = jsonData.text.value;
    this.mentions = jsonData.mentions.value.split(';!;');
    this.language = jsonData.language.value;
    this.keywords = jsonData.keywords.value.split(';!;');
    this.citations = jsonData.citations.value.split(';!;');
    this.source = jsonData.source.value;
  }

  public static getSPAEQLToSelect(id: string): string {
    let request = '';
    for (const prefix of prefixes) {
      request += prefix + ' ';
    }
    request += 'select distinct ' + select + ' where { ';
    for (let clause of clauses) {
      if (clause.includes(Utils.IRI_MARKER)) {
        clause = clause.replace(new RegExp(Utils.IRI_MARKER, 'g'), environment.graph_iri);
      }
      request += clause + ' . ';
    }
    request += 'FILTER (?claim = ' + id + ') }';

    return request;
  }
}
