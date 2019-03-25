# ClaimsKG Explorer - Build & Deployment :

## Generate the appropriate build

In order to deploy ClaimsKG Explorer, you first need to produce a build with your configuration options, from the angular project that you’ll place into your web server.

To produce this build, you need to have installed node (and npm) and then angular :

Node for [Linux](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/) or [Windows](https://nodejs.org/en/)

Angular : <code>npm install -g @angular/cli</code>

Then, go to the claimskg-explorer and edit the file : **src/environment/environment.prod.ts**

~~~~typescript
export const environment = {
  production: true,
  endpoint: 'http://localhost:8890/sparql',
  graph_iri: 'http://data.gesis.org/claimskg/',
  resultPerPage: 10,
};
~~~~
- endpoint : The address to the sparql endpoint of ClaimsKG
- graph_iri: The claimkg graph iri, already set but you can change it if there is any update in the future on this part
- resultPerPage: Number of result per page, set to 10 by default

Once this file is properly edited, type :

<code>npm install</code>

<code>ng build --prod --base-href /claimskg-explorer/</code>

**The option --base-href specify the name of the subfolder where the app will run, so, here, the final URL will be : http://yourdomain.com/claimskg-explorer/**

This generates the build in the dist/claimskg-explorer/ folder.

**Note that neither node or angular are required to make the build work on the server side, it is only required to generate the build, so the server has no needs to install these components.**

## Deploy the build on your server :

Once you’ve got the build, install it on your web server directory.
Now, you have to configure your server in a way that the routed apps fallback to index.html.

This part depends on your web server technology, you can find the appropriate method for your server [here](https://angular.io/guide/deployment#fallback-configuration-examples)

In your configuration, don’t forget to specify the subfolder of the build, for example, here is the .htaccess configuration with an apache web server :

~~~~
RewriteEngine On  
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]  
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d  
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /claimskg-explorer/index.html
~~~~

## Virtuoso configuration

As claimskg-explorer send request to the sparql endpoint of claimsKG, Virutoso must allow CORS (Cross-Origin Resource Sharing) :

- Log on the Virutoso conductor interface
- Go to Web Application Server
- Virtual Domains & Directorie
- Click on the first blue folder near 0.0.0.0
- Find the /sparql line and click on EDIT
- On the Cross-Origin Resource Sharing field put * (allow everyone) or configure it to only allow the app
- Click on Save Changes
