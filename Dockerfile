FROM node:12.9.1 as builder

ARG endpoint=https://data.gesis.org/claimskg/sparql
ENV ENDPOINT=$endpoint

ARG graph_iri=http://data.gesis.org/claimskg/
ENV GRAPH_IRI=$graph_iri

ARG per_page=10
ENV PER_PAGE=$per_page

ARG base_url=/claimskg/explorer/
ENV BASE_URL=$base_url

RUN apt-get update && apt-get install -y make git build-essential nginx
RUN mkdir /app
WORKDIR /app

COPY package.json angular.json tsconfig.json tslint.json /app/
RUN ls /app/
COPY ./src/ /app/src

RUN cd /app && npm set progress=false && npm install && npm audit fix && npm install -g @angular/cli && npm uninstall @angular-devkit/build-angular && npm install --save-dev @angular-devkit/build-angular

RUN echo "export const environment = {\n  production: true,\n  endpoint: '$ENDPOINT',\n  graph_iri: '$GRAPH_IRI',\n    resultPerPage: $PER_PAGE,\n};" > /app/src/environments/environment.prod.ts
RUN cp /app/src/environments/environment.prod.ts /app/src/environments/environment.ts
RUN cd /app && npm install @angular/cli && ng update --all && ng build --prod --base-href $base_url
RUN rm /var/www/html/index.nginx-debian.html
RUN cp -r /app/dist/claimskg-explorer /var/www/html/
COPY ./nginx-default /etc/nginx/sites-enabled/default


EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
