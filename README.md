# NZSE

Welcome to NZSE Website Revamp project. This repository houses all the source code for the frontend and the CMS of the website being built by this project.

## Prerequisites
To set this project up for development, this README assumes you have the following:
- [Docker](https://docs.docker.com/engine/install/)
- [`docker-compose`](https://docs.docker.com/compose/install/)

## Setup

1. Get a `.env` file with values and add it to the root of the project (see `.env.example` for what kind of values this file should have)
2. `docker-compose up --build`

After the containers have been created and started, the following applications will be accessible on the following addresses:
- http://localhost:1337/admin - Strapi CMS/Backend
- http://localhost:3000 - Next.js Frontend
- http://localhost:5000 - PgAdmin Database GUI

The ports where the services are available can be modified by editing the corresponding environment variable in the `.env` file

## Deployment

### Production deployment

**To deploy all your changes to production, push your changes to the `deploy-production` branch.**

### More details about deployment

#### Strapi instance deployment

The Strapi instance for this project is hosted on [Digital Ocean App Platform](https://cloud.digitalocean.com/apps/6eb9d50b-a68c-43bb-ae05-e6bd8bf764eb/overview).

The production deployment of the Strapi instance can be found at https://nzse-admin-f4gz5.ondigitalocean.app/

Digital Ocean App Platform handles all the infrastructure and services required to run the Strapi application.

- The exception to this is the PostgresSQL database used by the Strapi instance, which is hosted on [Railway](Railwayhttps://railway.app/project/eeea991a-5418-476a-9f88-705f44dc18d3).

#### Deploying the Next.js application to Vercel

The Next.js frontend deploys on Vercel. To deploy your changes, simply push your changes to the remote branch. This will trigger a branch deploy, and Vercel will deploy that branch which can be previewed with the Vercel generated URL.

Vercel has been configured to recognize the `deploy-production` branch as the production branch for the site.

#### Strapi Deployment Limitations

If your changes involve a schema change (e.g. the changes involve creating a model, or editing
an existing model), it is likely that the Vercel deployment will fail if the same deployment
contains frontend code referencing the aforementioned schema changes. The reason for this failure
is because the Next.js application deploys before the Strapi instance.

To counter this, **simply redeploy the Next.js deployment AFTER the deployment of the Strapi instance has finished**.

This is an existing limitation of the deployment process which will be addressed in the future.

## Other artifacts

- Project Board: https://trello.com/b/vqvjCxlD/nzse-website-rebuild (you must request permission to gain access to the project board)

## About this project

### Bootstrapped via template project
This repository was created from the [strapi-nextjs](https://github.com/crisosron/strapi-nextjs) dockerized template project to minimize the amount of setup required to create web applications that uses the same next.js-strapi stack. See the [repo](https://github.com/crisosron/strapi-nextjs) for more information.
