const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const option = {
  definition: {
    openapi: '3.0.0',
    title: '接口文档相关管理',
    info: {
      version: '1.0.0',
      description: '相关描述',
    },
  },
  apis: [path.join(__dirname, '/routes/*js')],
};

const swaggerDeploy = swaggerJsDoc(option);

module.exports = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerDeploy),
};
