import {environment} from '../../environments/environment';

export class RequestUtils {

  public static readonly previewRequest = {
    prefixes: [
      'PREFIX schema: <http://schema.org/>',
      'PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>'
    ],
    select: '(?claims as ?id) ' +
      '?text ' +
      'COALESCE(?date, \'Unknown\') as ?date ' +
      '?truthRating ' +
      '?ratingName ' +
      'COALESCE(?author, \'Unknown\') as ?author ' +
      'COALESCE(?link, \'\') as ?link',
    clauses: [
      '?claims a schema:ClaimReview',
      '?claims schema:headline ?text',
      'OPTIONAL {?claims schema:datePublished ?date}',
      '?claims schema:reviewRating ?truth_rating_review',
      '?truth_rating_review schema:alternateName ?ratingName',
      '?truth_rating_review schema:author <' + environment.graph_iri + 'organization/claimskg>',
      '?truth_rating_review schema:ratingValue ?truthRating',
      'OPTIONAL {?claims schema:url ?link}',
      '?item a schema:CreativeWork',
      '?claims schema:itemReviewed ?item',
      'OPTIONAL {?item schema:author ?author_info . ?item schema:text ?text . ?author_info schema:name ?author}'
    ]
  };

  public static readonly languagesRequest = '' +
    'PREFIX schema: <http://schema.org/> ' +
    'select distinct ?inLanguage ?language ' +
    'where { ?inLanguage a schema:Language . ?inLanguage schema:name ?language }';

  public static readonly sourcesRequest = '' +
    'PREFIX schema: <http://schema.org/> ' +
    'select distinct ?organization ?source ' +
    'where { ?organization a schema:Organization . ?organization schema:name ?source }';

  public static readonly selectRequest = {
    prefixes: [
      'PREFIX schema: <http://schema.org/>',
      'PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>'
    ],
    select: '(?claim as ?id) ?text COALESCE(?date, \'\') as ?date ' +
      'COALESCE(?keywords, "") as ?keywords ' +
      'group_concat(distinct ?entities_name, ";!;") as ?mentions ' +
      'COALESCE(?language, "") as ?language ' +
      'group_concat(?citations, ";!;") as ?citations ' +
      '?truthRating ' +
      '?ratingName ' +
      'COALESCE(?author, \'\') as ?author ' +
      'COALESCE(?source, "") as ?source ' +
      'COALESCE(?sourceURL, "") as ?sourceURL ' +
      'COALESCE(?link, \'\') as ?link',
    clauses: [
      '?claim a schema:ClaimReview',
      '?claim schema:headline ?text',
      'OPTIONAL {?claim schema:datePublished ?date}',
      '?claim schema:reviewRating ?truth_rating_review',
      '?truth_rating_review schema:author <' + environment.graph_iri + 'organization/claimskg>',
      '?truth_rating_review schema:alternateName ?ratingName',
      '?truth_rating_review schema:ratingValue ?truthRating',
      'OPTIONAL {?claim schema:url ?link}',
      '?item a schema:CreativeWork',
      '?claim schema:itemReviewed ?item',
      'OPTIONAL {?claim schema:mentions ?entities . ?entities nif:isString ?entities_name}',
      'OPTIONAL {?item schema:author ?author_info . ?item schema:text ?text . ?author_info schema:name ?author}',
      'OPTIONAL {?claim schema:inLanguage ?inLanguage . ?inLanguage schema:name ?language}',
      'OPTIONAL {?claim schema:author ?sourceAuthor . ?sourceAuthor schema:name ?source . ?sourceAuthor schema:url ?sourceURL}',
      'OPTIONAL {?item schema:keywords ?keywords}',
      'OPTIONAL {?item schema:citation ?citations}'
    ]
  };
}
