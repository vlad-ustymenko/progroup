'use strict';

/**
 * new-card service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::new-card.new-card');
