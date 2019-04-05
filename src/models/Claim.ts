import {Utils} from './utils/Utils';
import {environment} from '../environments/environment';
import {RequestUtils} from './utils/RequestUtils';

export class Claim {
  private static readonly requestData = RequestUtils.selectRequest;
  id: string;
  text: string;
  date: string;
  truthRating: number;
  ratingName: string;
  author: string;
  link: string;
  mentions: string[];
  mentionsArticle: string[];
  language: string;
  keywords: string[];
  citations: string[];
  source: string;
  sourceURL: string;

  constructor(jsonData) {
    const idFull = jsonData.id.value;
    this.id = idFull.substring(idFull.lastIndexOf('/') + 1);
    this.author = jsonData.author.value;
    this.date = jsonData.date.value;
    this.link = jsonData.link.value;
    this.truthRating = parseInt(jsonData.truthRating.value, 10);
    this.ratingName = jsonData.ratingName.value;
    this.text = jsonData.text.value;
    this.mentions = jsonData.mentions.value !== '' ? jsonData.mentions.value.split(';!;') : [];
    this.mentionsArticle = jsonData.mentionsArticle.value !== '' ? jsonData.mentionsArticle.value.split(';!;') : [];
    this.language = jsonData.language.value;
    this.keywords = jsonData.keywords.value !== ''  ? jsonData.keywords.value.split(',') : [];
    this.citations = jsonData.citations.value !== ''  ? jsonData.citations.value.split(';!;') : [];
    this.source = jsonData.source.value;
    this.sourceURL = jsonData.sourceURL.value;
  }

  public static getSPAEQLToSelect(id: string): string {
    let request = '';
    for (const prefix of this.requestData.prefixes) {
      request += prefix + ' ';
    }
    request += 'select distinct ' + this.requestData.select + ' where { ';
    for (const clause of this.requestData.clauses) {
      request += clause + ' . ';
    }
    request += 'FILTER (?claim = <' + environment.graph_iri + 'claim_review/' + id + '>) }';

    return request;
  }
}
