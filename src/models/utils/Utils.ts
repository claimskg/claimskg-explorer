import {environment} from '../../environments/environment';

export class Utils {
  public static readonly IRI_MARKER = '<!IRI!>';

  public static getRessourcePathGraph(ressource: string) {
    return environment.graph_iri + ressource;
  }

  public static getIdPathRessource(simpleId: string): string {
    return Utils.getRessourcePathGraph('claim_review/' + simpleId);
  }

}
