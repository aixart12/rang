'use strict';

const Sequelize = require('sequelize');
const { QueryInterface } = require('sequelize');

const TABLE_NAME = 'UsersResults';

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
          UserId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            unique: 'user_and_result_composite_index',
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          ResultId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            unique: 'user_and_result_composite_index',
            references: {
              model: 'Results',
              key: 'id',
            },
          },
          userInput: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          userInputValue: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          outCome: {
            type: Sequelize.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.dropAllTables(TABLE_NAME, { transaction });
    });
  },
};
