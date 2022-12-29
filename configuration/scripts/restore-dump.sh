#!/bin/bash

# This script restores all strapi configurations from a given dump file
# See https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-configuration-restore

cp ../config-dump.json ../../cms
cd ../../cms
npx strapi config:restore -f config-dump.json