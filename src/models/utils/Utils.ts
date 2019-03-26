import {environment} from '../../environments/environment';

export class Utils {
  public static readonly IRI_MARKER = '<!IRI!>';

  public static readonly entitiesModalData = {
    title: 'Entities selection',
    content: [
      'With this field, you can specify entities that has to be mentioned into the results',
      'There is two options, Contains Any or Contains All, with the first option you will have all ' +
      'results about any of the entities, with the other one, you will have result containing all the specified entities',
      'To add an entity, you can type his name, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the entity and press enter',
      'To remove an entity, just press the delete button on the chip'
    ],
    imgsPath: ['assets/img/modal/modalEntities.gif'],
  };

  public static readonly keywordsModalData = {
    title: 'Keywords selection',
    content: [
      'With this field, you can specify keywords that has to be mentioned into the results',
      'There is two options, Contains Any or Contains All, with the first option you will have all ' +
      'results containing any of keywords, with the other one, you will have result containing all the keywords',
      'To add a keyword, type it and press enter',
      'To remove a keyword, just press the delete button on the chip'
    ],
    imgsPath: ['assets/img/modal/modalKeywords.gif'],
  };

  public static readonly languagesModalData = {
    title: 'Languages selection',
    content: [
      'With this field, you can choose in what languages are the results',
      'You will got results in any of the specified languages',
      'To add a language, click on the field, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the language and press enter',
      'To remove a language, just press the delete button on the chip'
    ],
    imgsPath: ['assets/img/modal/modalLanguages.gif'],
  };

  public static readonly sourcesModalData = {
    title: 'Sources selection',
    content: [
      'With this field, you can choose from what fact-checking website the results are extracted',
      'You will got results extracted from any of the specified sources',
      'To add a source, click on the field, there will be some propositions, click on the one that you want to add.',
      'You can also type the name of the source and press enter',
      'To remove a source, just press the delete button on the chip'
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
