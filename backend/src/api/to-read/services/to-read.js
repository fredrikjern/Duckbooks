'use strict';

/**
 * to-read service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::to-read.to-read');
