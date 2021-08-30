const fs = require('fs');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');

const root = path.join(__dirname, '../');
const swaggerDeploy = swaggerJsDoc({
  definition: {
    openapi: '2.0.0',
    info: {
      description: '数据管理平台',
      version: '2.0.0',
      title: '数据管理平台-接口文档',
      contact: {
        name: 'xupeng',
        email: '',
      },
      termsOfService: 'http://www.yczcjk.com/',
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    host: 'localhost:3000',
    basePath: '/api',
  },
  apis: [path.join(root, 'routes/**/*.js'), path.join(root, 'api-doc/**/*.yml')],
});

fs.writeFileSync(path.join(root, 'public/swagger/swagger-doc.json'), JSON.stringify(swaggerDeploy));
