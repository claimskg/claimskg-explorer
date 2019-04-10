import {environment} from '../../environments/environment';

export class RequestUtils {

  public static readonly previewRequest = {
    prefixes: [
      'PREFIX schema: <http://schema.org/>',
      'PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>'
    ],
    select: '(?claims as ?id) ' +
      'COALESCE(?headline, \'No text data\') as ?headline ' +
      'COALESCE(?text, ?headline) as ?text ' +
      'COALESCE(?date, \'Unknown\') as ?date ' +
      '?truthRating ' +
      '?ratingName ' +
      'COALESCE(?author, \'Unknown\') as ?author ' +
      'COALESCE(?link, \'\') as ?link',
    superSelectConjunction: '?id ?text ?date ?truthRating ?ratingName ?author ?link',
    clauses: [
      '?claims a schema:ClaimReview',
      'OPTIONAL {?claims schema:headline ?headline}',
      '?claims schema:reviewRating ?truth_rating_review',
      '?truth_rating_review schema:alternateName ?ratingName',
      '?truth_rating_review schema:author <' + environment.graph_iri + 'organization/claimskg>',
      '?truth_rating_review schema:ratingValue ?truthRating',
      'OPTIONAL {?claims schema:url ?link}',
      '?item a schema:CreativeWork',
      '?claims schema:itemReviewed ?item',
      'OPTIONAL {?item schema:author ?author_info . ?item schema:text ?text . ?author_info schema:name ?author }',
      'OPTIONAL {?item schema:datePublished ?date}'
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

  private static readonly filterEntitiesRequest = {
    prefixes: [
      'PREFIX schema: <http://schema.org/>',
      'PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>'
    ],
    select: '?entity ',
    clauses: [
      '?mentions a nif:Context',
      '?mentions nif:isString ?entity',
    ]
  };

  public static readonly selectRequest = {
    prefixes: [
      'PREFIX schema: <http://schema.org/>',
      'PREFIX nif: <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>'
    ],
    select: '(?claim as ?id) ' +
      'COALESCE(?headline, \'No text data\') as ?headline ' +
      'COALESCE(?text, ?headline) as ?text ' +
      'COALESCE(?date, \'\') as ?date ' +
      'COALESCE(?keywords, "") as ?keywords ' +
      'group_concat(distinct ?entities_name, ";!;") as ?mentions ' +
      'group_concat(distinct ?entities_name_article, ";!;") as ?mentionsArticle ' +
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
      'OPTIONAL{ ?claim schema:headline ?headline}',
      '?claim schema:reviewRating ?truth_rating_review',
      '?truth_rating_review schema:author <' + environment.graph_iri + 'organization/claimskg>',
      '?truth_rating_review schema:alternateName ?ratingName',
      '?truth_rating_review schema:ratingValue ?truthRating',
      'OPTIONAL {?claim schema:url ?link}',
      '?item a schema:CreativeWork',
      '?claim schema:itemReviewed ?item',
      'OPTIONAL {?item schema:mentions ?entities . ?entities nif:isString ?entities_name}',
      'OPTIONAL {?claim schema:mentions ?entities_article . ?entities_article nif:isString ?entities_name_article}',
      'OPTIONAL {?item schema:author ?author_info . ?item schema:text ?text . ?author_info schema:name ?author }',
      'OPTIONAL {?claim schema:inLanguage ?inLanguage . ?inLanguage schema:name ?language}',
      'OPTIONAL {?claim schema:author ?sourceAuthor . ?sourceAuthor schema:name ?source . ?sourceAuthor schema:url ?sourceURL}',
      'OPTIONAL {?item schema:keywords ?keywords}',
      'OPTIONAL {?item schema:citation ?citations}',
      'OPTIONAL {?item schema:datePublished ?date}'
    ]
  };

  public static readonly exportExtraClauses = [
    '?item a schema:CreativeWork',
    '?id schema:itemReviewed ?item',
    'OPTIONAL {?id schema:headline ?headline}',
    'OPTIONAL {?id schema:inLanguage ?inLanguage . ?inLanguage schema:name ?language}',
    'OPTIONAL {?id schema:author ?sourceAuthor . ?sourceAuthor schema:name ?source . ?sourceAuthor schema:url ?sourceURL}',
    'OPTIONAL {?item schema:keywords ?keywords}',
    'OPTIONAL {?id schema:mentions ?entities . ?entities nif:isString ?entities_name}',
    'OPTIONAL {?item schema:mentions ?entities_article . ?entities_article nif:isString ?entities_name_article}',
  ];

  public static readonly countAllRequest = '' +
    'PREFIX schema: <http://schema.org/> ' +
    'select count(distinct ?claim) as ?count ' +
    'where {?claim a schema:ClaimReview}';

  public static readonly fieldsAssociation = [
    {name: 'Id of the Claim', field: '?id'},
    {name: 'Text of the Claim', field: '?text'},
    {name: 'Date', field: '?date'},
    {name: 'Truth Rating Value', field: '?truthRating'},
    {name: 'Truth Rating Label', field: '?ratingName'},
    {name: 'Author', field: '?author'},
    {name: 'Headline of the article', field: '?headline'},
    {name: 'Named Entities from Claim', field: 'group_concat(distinct ?entities_name, ",") as ?named_entities_claim'},
    {name: 'Named Entities from Article', field: 'group_concat(distinct ?entities_name_article, ",") as ?named_entities_article'},
    {name: 'Keywords', field: '?keywords'},
    {name: 'Fact-Checking Website Name', field: '?source'},
    {name: 'Fact-Checking Website Link', field: '?sourceURL'},
    {name: 'Link of the fact-checking article', field: '?link'},
    {name: 'Language', field: '?language'},
  ];

  public static filterEntities(fragment: string): string {
    let request = '';
    for (const prefix of RequestUtils.filterEntitiesRequest.prefixes) {
      request += prefix + ' ';
    }
    request += 'select distinct ' + RequestUtils.filterEntitiesRequest.select + ' where { ';
    for (const clause of RequestUtils.filterEntitiesRequest.clauses) {
      request += clause + ' . ';
    }
    request += '  FILTER (strStarts(lcase(str(?entity)), "' + fragment.toLowerCase() + '"))';
    request += '}';

    return request;
  }

}
