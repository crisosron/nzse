#!/bin/bash

# This script generates a dump of strapi configurations (this includes field labels, descriptions
# placeholders etc) in the strapi container and transfers it to the host machine
# See https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-configuration-dump

# Create the dump
docker exec nzse_strapi npx strapi config:dump -f config-dump.json

# Copy the dump to this host
docker cp nzse_strapi:/opt/app/config-dump.json ../