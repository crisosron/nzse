'use strict';

/**
 * global-seo service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-seo.global-seo');
