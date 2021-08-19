const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerDeploy = swaggerJsDoc({
  swagger: '2.0',
  definition: {
    info: {
      description: '数据管理平台',
      version: '1.0.0',
      title: '数据管理平台-接口文档',
      contact: {
        name: 'async',
        email: '',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
  },
  host: 'localhost',
  basePath: '/',
  apis: [path.join(__dirname, '/routes/*.js')],
});

// console.log(swaggerDeploy, typeof swaggerDeploy);
fs.writeFileSync(`./swagger-doc.json`, JSON.stringify(swaggerDeploy));

module.exports = {
  serve: swaggerUI.serve,
  setup: swaggerUI.setup(swaggerDeploy),
};
