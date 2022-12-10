'use strict';

const Sequelize = require('sequelize');
const { QueryInterface } = require('sequelize');

const TABLENAME = 'Users';

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
        TABLENAME,
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          firstName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          middleName: {
            type: Sequelize.STRING,
          },
          lastName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          phoneNumber: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          isSuperAdmin: {
            allowNull: true,
            defaultValue: false,
            type: Sequelize.BOOLEAN,
          },
          resetToken: {
            type: Sequelize.STRING(255),
          },
          refreshToken: {
            type: Sequelize.STRING(255),
            unique: true,
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
          deletedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction }
      );
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.dropTable(TABLENAME, { transaction });
    });
  },
};
