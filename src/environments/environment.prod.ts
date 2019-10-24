export const environment = {
  production: true,
  endpoint: 'https://data.gesis.org/claimskg/sparql',
  graph_iri: 'http://data.gesis.org/claimskg/',
  resultPerPage: 10,
};

export const packages: any = {
  'moment': {
    format: 'cjs'
  }
};
