FROM node:12.9.1 as builder

ARG endpoint=https://data.gesis.org/claimskg/sparql
ENV ENDPOINT=$endpoint

ARG graph_iri=http://data.gesis.org/claimskg/
ENV GRAPH_IRI=$graph_iri

ARG per_page=10
ENV PER_PAGE=$per_page

ARG base_url=/claimskg/explorer/
ENV BASE_URL=$base_url

RUN apt-get update && apt-get install -y make git build-essential
RUN mkdir /run/nginx
RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN cd /app && npm set progress=false && npm audit fix
RUN npm install -g @angular/cli
RUN npm uninstall @angular-devkit/build-angular
RUN npm install --save-dev @angular-devkit/build-angular

COPY .  /app
RUN echo -e "export const environment = {\n  production: true,\n  endpoint: '$ENDPOINT',\n  graph_iri: '$GRAPH_IRI',\n    resultPerPage: $PER_PAGE,\n};" > /app/src/environments/environment.prod.ts
RUN cp /app/src/environments/environment.prod.ts /app/src/environments/environment.ts
RUN cat /app/src/environments/environment.prod.ts
RUN cd /app && ng update --all && ng build --prod --base-href $base_url

EXPOSE 8081
CMD ng serve --port 8081 --host 0.0.0.0 --prod --base-href "$BASE_URL" --disable-host-check
#MD ["ng", "serve", "--port", "8081", "--host", "0.0.0.0", "--prod", "--base-href", "$base_url"]
