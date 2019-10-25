export const environment = {
  production: true,
  endpoint: 'http://localhost:8890/sparql',
  graph_iri: 'http://data.gesis.org/claimskg/',
  resultPerPage: 10,
};

export const packages: any = {
  'moment': {
    format: 'cjs'
  }
};
