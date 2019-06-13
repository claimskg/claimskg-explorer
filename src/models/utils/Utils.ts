import {environment} from '../../environments/environment';

export class Utils {
  public static readonly IRI_MARKER = '<!IRI!>';

  public static readonly entitiesModalData = {
    title: 'Entities selection',
    content: [
      'With this field, you can specify entities that you want mentioned in the results.',
      'There are two options, Contains Any or Contains All: with the first option you will have all ' +
      'the entities, with the other one, you will have results containing the specified entities together.',
      'To add an entity, you can type its name, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the entity and press enter.',
      'To remove an entity, just press the delete button on the chip.'
    ],
    imgsPath: ['assets/img/modal/modalEntities.gif'],
  };

  public static readonly entitiesMentionsFromArticleModalData = {
    title: 'Named entities from fact-checking articles',
    content: [
      'By default, the explorer search the named entities mentioned in the claim.',
      'For some reasons, named entities mentioned in the articles extracted from the fact-checking website may be also interesting',
      'If you want that the research algorithm also includes these entities, check this option.',
    ],
  };

  public static readonly entitiesConjuctionModalData = {
    title: 'Contains Any / All',
    content: [
      'There are two options, Contains Any or Contains All',
      'With the first option you will have results containing any of the entities.',
      'With the other one, you will have results containing all the specified entities together.',
    ],
  };

  public static readonly keywordsModalData = {
    title: 'Keywords selection',
    content: [
      'With this field, you can specify keywords to be mentioned in the results.',
      'There is two options, Contains Any or Contains All: with the first option you will have all results containing ' +
      'any of the keywords, with the latter, you will have the result containing all the keywords.',
      'To add a keyword, type it and press enter.',
      'To remove a keyword, just press the delete button on the chip.'
    ],
    imgsPath: ['assets/img/modal/modalKeywords.gif'],
  };

  public static readonly keywordsConjuctionModalData = {
    title: 'Contains Any / All',
    content: [
      'There are two options, Contains Any or Contains All',
      'With the first option you will have results containing any of the keywords.',
      'With the other one, you will have results containing all the specified keywords together.',
    ],
  };

  public static readonly authorsModalData = {
    title: 'Authors selection',
    content: [
      'With this field, you can specify entities names that you want as author of the claims in the results.',
      'To add an author, you can type its name, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the author and press enter.',
      'To remove an author, just press the delete button on the chip.'
    ],
    imgsPath: ['assets/img/modal/modalAuthors.gif'],
  };

  public static readonly languagesModalData = {
    title: 'Languages selection',
    content: [
      'With this field, you can select the language(s) of the results.',
      'To add a language, click on the field, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the language and press enter.',
      'To remove a language, just press the delete button on the chip.'
    ],
    imgsPath: ['assets/img/modal/modalLanguages.gif'],
  };

  public static readonly sourcesModalData = {
    title: 'Sources selection',
    content: [
      'With this field, you can choose from what fact-checking website the results are extracted.',
      'To add a source, click on the field, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the source and press enter.',
      'To remove a source, just press the delete button on the chip.'
    ],
    imgsPath: ['assets/img/modal/modalSources.gif'],
  };

  public static getRessourcePathGraph(ressource: string) {
    return environment.graph_iri + ressource;
  }

  public static capitalize(str: string) {

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
