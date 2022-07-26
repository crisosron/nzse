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

### Deploying Strapi to Heroku
To deploy your changes to the Strapi CMS:
- **Deploy to staging:** Push your changes to `deploy-staging`

The staging deployment of the Strapi CMS can be found at https://nzse.herokuapp.com/admin

### Deploying Next.js to Vercel
TBD: 
The Next.js frontend deploys on Vercel. To deploy your changes, simply push your changes to the remote branch. This will trigger a branch deploy, and Vercel will deploy that branch which can be previewed with the Vercel generated URL.

### Other artifacts
- Project Board: https://trello.com/b/vqvjCxlD/nzse-website-rebuild (you must request permission to gain access to the project board)
