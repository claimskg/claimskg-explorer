import {environment} from '../../environments/environment';

export class Utils {
  public static readonly IRI_MARKER = '<!IRI!>';

  public static getRessourcePathGraph(ressource: string) {
    return environment.graph_iri + ressource;
  }

  public static capitalize(str: string) {

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

}
