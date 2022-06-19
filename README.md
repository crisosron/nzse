# strapi-nextjs
A dockerized template to quickstart a Strapi project with a Next.js frontend.

## Using the Application

### Setup

1. Get a `.env` file with values and add it to the root of the project (see `.env.example` for what kind of values this file should have)
2. `docker-compose up --build`

After the containers have been created and started, the following applications will be accessible on the following addresses:
- http://localhost:1337/admin - Strapi CMS/Backend
- http://localhost:3000 - Next.js Frontend
- http://localhost:5000 - PgAdmin Database GUI

The ports where the services are available can be modified by editing the corresponding environment variable in the `.env` file

### Deployment

#### Deploying Strapi to Heroku
To deploy your changes to the Strapi CMS:
- **Deploy to staging:** Push your changes to `deploy-staging`

The staging deployment can be found at: https://agile-coast-88527.herokuapp.com/admin

#### Deploying Next.js to Vercel
The Next.js frontend deploys on Vercel. To deploy your changes, simply push your changes to the remote branch. This will trigger a branch deploy, and Vercel will deploy that branch which can be previewed with the Vercel generated URL.

## Using this template to quickstart a new Strapi/Next.js project

1. Fork this repository
2. Create a `.env` file using the `.env.example`  provided by this project
```
cp .env.example .env
```   
3. In the created `.env` file, set values for environment variables, and/or use their defaults
```
# Apply database credentials as necessary. For development, default values have been provided in
# .env.example
DATABASE_CLIENT=postgres
DATABASE_NAME=strapi
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=strapi
DATABASE_ADMIN_PORT=8000
DATABASE_ADMIN_EMAIL=dbadmin@example.com
DATABASE_ADMIN_PASSWORD=password

# For each of the following environment variables, run the command 'openssl rand -base64 32' and set the output
# as the value of the environment variable
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=

HOST= # Can be any address, but default is 0.0.0.0
STRAPI_PORT= # Can be any port number, but default is 1337
ENABLE_SEEDING= # Can be true or false, but default is true - This should be removed after setting up the project once

CLIENT_PORT= # Can be any port number, but default is 3000
NEXT_PUBLIC_STRAPI_API_URL=http://strapi:<insert STRAPI_PORT value>
NEXT_PUBLIC_STRAPI_GRAPHQL_API_URL=http://strapi:<insert STRAPI_PORT value>/graphql
```
(Note that setting the cloudinary environment variables are covered in the 'Setting up deployments' section).

4. `docker-compose up --build`
5. Wait for the all the containers to start up...
6. When all the containers have been started, go to http://localhost:STRAPI_PORT value/admin to create the CMS admin user
7. After creating the admin user, in the CMS, navigate to Settings -> Roles -> Public, and set the appropriate permissions for the
different content types, and then hit 'Save' at the top right of the page.
     - For the dummy content types provided by the template, tick the following options
       - Article: findOne, find
       - Global: find
       - Homepage: find
      - This is necessary so that the external users of the api provided by Strapi (e.g., the NextJS frontend), are able to interact with these content types as per the allowed permissions. In most cases, the 'public' role should be set up to have 'read-only' permissions (i.e., find, findOne, etc.) for the content types.

After the above steps, the project should be ready for development. See the following URLs to see the different applications in action (use your own port numbers if you did not use the default values in the `.env` file):
- http://localhost:1337/admin - Strapi CMS/Backend
- http://localhost:3000 - Next.js Frontend
- http://localhost:5000 - PgAdmin Database GUI

### Setting up deployments

#### Prerequisites and other information
This section assumes the following:
- Your project's repository is on GitHub
- You have a Heroku account
- You have a Cloudinary account (this is the service used to host images and other media that Strapi serves)
- You have a Vercel account

#### Hosting Strapi CMS on Heroku
This repository comes pre-configured with a GitHub action job that deploys the `cms` directory to Heroku, but some configuration on both GitHub, and Heroku must be completed first to ensure this job works correctly.

##### Configuring Heroku
1. Create an app on Heroku
2. After creating an app, go to 'Resources' in the navigation bar of the Heroku dashboard
3. Search up 'Heroku Postgres', click on the result, and add it as an add-on to your Heroku app by following the instructions
4. Go back to the 'Resources' page, and click on the Heroku Postgres add-on. When directed to the new page, navigate to Settings -> Database Credentials -> View Credentials and copy the URI. This is needed for the next step
5. Go back to the Heroku dashboard and go to Settings -> Reveal Config Vars and add the following environment variables
```sh
# For each of the following environment variables, run the command 'openssl rand -base64 32' and set the output
# as the value of the environment variable
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
JWT_SECRET=

# Your cloudinary credentials and keys
CLOUDINARY_KEY=
CLOUDINARY_NAME=
CLOUDINARY_SECRET=

DATABASE_URL= # The database URI you copied from earlier
PORT= # Should match the value of STRAPI_PORT in your local .env file
NODE_ENV= # The environment's name
```
1. Scroll down to Buildpack, click 'Add buildpack', and select nodejs

##### Configuring GitHub Actions
After configuring Heroku as per the above, do the following to ensure that GitHub deploys the `cms` directory to Heroku.
1. Create a branch `deploy-staging`
   - The job that deploys the `cms` has been configured to run only on the `deploy-staging` branch. This can be modified in [`main.yml`](./.github/workflows/main.yml).
2. Navigate to Settings -> Secrets (in the sidebar) -> Actions, and add the following secrets

```sh
HEROKU_API_KEY= # This can be obtained in your Heroku account settings
HEROKU_APP_NAME= # This is the name you gave the Heroku app when you were creating it
HEROKU_EMAIL= # The email address associated with your Heroku account
```
3. Finally, make a change to the codebase, and push the changes to `deploy-staging`
   - This will trigger the deploy of the `cms` directory to Heroku
## About this template
This template was developed to serve as a starting backbone for a web-app that uses Strapi as a headless CMS, and Next.js as the app's frontend.

### Pre-configured functionality
This template pre-configures the following pieces of functionality to quickly start up a new project with minimal setup.

#### Strapi

This template comes with a full-featured Strapi instance that serves as the app's headless CMS. This instance comes with the following:
- A set of collection-type and single-type content types as dummy content. Provided the environment variable `ENABLE_SEEDING` is present, and is
  set to `true`, these content types are filled with mock content when the Strapi instance is started.
- A graphql endpoint accessible via http://localhost:1337/graphql to handle API requests
- Configuration of plugins, and other Strapi related settings on each environment (at the time of writing, only dev, and staging have a corresponding environment-specific configuration)
  - Environment specific configuration can be found at [cms/config](./cms/config) (the root of this directory is dev configuration, and the `env` directory contains configuration for non-dev environments).  

The code for the strapi backend can be found in the [cms](./cms) directory.

#### Next.js Frontend

A Next.js application is provided in this template to display the data fetched from Strapi. The Next.js application in this template has the following
- Boilerplate setup of various helper and utility code to fetch data from the Strapi CMS
- [ApolloClient](https://www.apollographql.com/docs/react/) setup to issue graphql requests to the Strapi CMS
- Sample graphql queries, requests, and dissemination of API responses to display the data strcuture/s of the responses from the Strapi CMS
- Tailwind CSS integration

#### Strapi Deployment to Heroku
The template contains the code necessary to deploy the Strapi CMS to Heroku. The code in question mainly points to the [cms/config/env](./cms/config/env) directories to appropriately configure the CMS for the environment it deploys into.

The deployment to heroku is automated via GitHub actions.

**Next.js Deployment to Vercel**
