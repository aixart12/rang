'use strict';

const Sequelize = require('sequelize');
const { QueryInterface } = require('sequelize');

const TABLE_NAME = 'Results';
const INITIAL_ID = 10000000;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        TABLE_NAME,
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          resultColor: {
            type: Sequelize.STRING,
          },
          resultNumber: {
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          initialAutoIncrement: INITIAL_ID,
        }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.dropTable(TABLE_NAME, { transaction });
    });
  },
};
