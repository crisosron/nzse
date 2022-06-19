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

#### Deploying Next.js to Vercel
The Next.js frontend deploys on Vercel. To deploy your changes, simply push your changes to the remote branch. This will trigger a branch deploy, and Vercel will deploy that branch which can be previewed with the Vercel generated URL.
