#!/bin/bash

CONTAINER_ALREADY_STARTED="CONTAINER_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e $CONTAINER_ALREADY_STARTED ]; then
    touch $CONTAINER_ALREADY_STARTED
    echo "First startup of Strapi CMS... installing additional strapi packages..."

    # Install additional strapi packages here when needed
    # TODO: Investigate why this isn't working
    strapi install graphql
fi

echo "Starting Strapi CMS..."
yarn develop