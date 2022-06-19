'use strict';

const seedSingleType = async (modelName, apiName, data) => {
  const recordCount = await strapi.db.query(apiName).count();
  if(recordCount) {
    console.log(`Not seeding ${modelName} because the entry already exists for this content type`);
    return;
  }
  console.log(`Seeding ${modelName}...`);
  await strapi.db.query(apiName).create({
    data: data
  });

  console.log(`Completed seeding ${modelName}`);
};

const seedCollectionType = async (modelName, apiName, data) => {
  const recordCount = await strapi.db.query(apiName).count();
  if(recordCount) {
    console.log(`Not seeding ${modelName} because entries already exists for this content type`);
    return;
  }

  console.log(`Seeding ${modelName}...`);
  const numEntries = 10;
  for(let i = 0; i < numEntries; i++) {  
    let seedData = {};
    const dataKeys = Object.keys(data)
    for(let keyIndex = 0; keyIndex < dataKeys.length; keyIndex++) {
      const key = dataKeys[keyIndex];
      const value = typeof data[key] === 'string' ? `${data[key]} ${i}` : data[key];
      seedData = { 
        ...seedData,
        ...{
          [`${key}`]: value
        }
      };
    }

    await strapi.db.query(apiName).create({
      data: seedData
    });
  }
  console.log(`Completed seeding ${modelName}`);
}

const publishCollectionType = async (tableName) => {
  const publishedAtValue = new Date().toISOString();
  await strapi.db.connection.raw(`UPDATE ${tableName} SET published_at = '${publishedAtValue}'`);
}

const modelsToSeed = [
  {
    modelName: 'Article',
    apiName: 'api::article.article',
    dbTableName: 'articles',
    seeder: seedCollectionType,
    seedData: {
      title: 'Article'
    },
    needsPublishing: true
  },
  {
    modelName: 'Global',
    apiName: 'api::global.global',
    dbTableName: 'globals',
    seeder: seedSingleType,
    seedData: {
      siteName: 'Sample strapi app'
    },
    needsPublishing: false
  },
  {
    modelName: 'Homepage',
    apiName: 'api::homepage.homepage',
    dbTableName: 'homepages',
    seeder: seedSingleType,
    seedData: {
      title: 'Homepage'
    },
    needsPublishing: true
  }
];

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    
    // Seed data on startup
    // Note that the seeded data is unpublished. To see them in the client, you need to go into
    // the CMS and manually publish the record for said data type (if applicable) so that they show
    // up in the client

    if(process.env.ENABLE_SEEDING) {
      console.log('Seeding has been enabled on this run. To prevent seeding for future runs, remove the ENABLE_SEEDING environment variable');
      modelsToSeed.forEach(async (model) => {
        await model.seeder(model.modelName, model.apiName, model.seedData)
        if(model.needsPublishing) await publishCollectionType(model.dbTableName)
      });

    }
  },
};
