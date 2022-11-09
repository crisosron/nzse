# Create dump and copy to host
docker exec nzse_strapi yarn strapi config:dump --file config-dump.json -p
docker cp nzse_strapi:/opt/app/config-dump.json .
