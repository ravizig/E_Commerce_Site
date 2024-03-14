/**
 * Cart.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    userid: {
      model: 'User',
      required: true
    },
    products: {
      collection: 'Product',
      via: 'carts',
      dominant: true
    }
  },

};

