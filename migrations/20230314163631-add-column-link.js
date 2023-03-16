'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('content', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false
      },
      campground_fk: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'campground',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

    await queryInterface.changeColumn('location', 'zip_code', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '00000-000'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('content');

    await queryInterface.changeColumn('location', 'zip_code', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  }
};
