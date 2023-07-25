require('dotenv').config();
global.framework={};
require('../core/migration');
require('../core/models');
require('../core/services');
require('../core/functions')
require('../core/userFunctions')
const express = require('express');
const useImport = require('../config/use');
const routes = require('../core/routes');
const path = require('path')
const socketIO = require('socket.io')
const http = require('http')
const helmet = require('helmet');
const middlewares = require('../middlewares')

const siteSettings = require('../config/sitesetting.json');
const { drivingSchoolsDataSync, userDataSync, examDataSync, debitDataSync, studentDataSync, formulaDataSync, alertDataSync, planningDataSync, studentOldExamDataSync, studentPaymentDataSync } = require('../functions/databaseSync');
const moment = require('moment');
// defining the Express app
const app = express();

// SECURITY HEADERS 
app.use(helmet());
app.use((req, res, next) => {
  res.set({
    "Referrer-Policy": 'same-origin', 
  })
  next()
})

//multiple app.use
for(key in useImport){
  app.use(useImport[key]);
}

app.use('/uploads', [
  [
    express.static(siteSettings.storagePath ? siteSettings.storagePath.path || '../uploads' : '../uploads')
  ]
])
for(let key in routes.public){
  app[routes.public[key].method](routes.public[key].path, routes.public[key].middlewares || [], routes.public[key].action);
}
/* validate apis from here */
for(let key in routes.protected){
  let middleware = [
    middlewares.apiVerify.tokenVerification,
    routes.protected[key].globalMiddlewares,
    routes.protected[key].middlewares
  ]
  app[routes.protected[key].method](routes.protected[key].path, middleware, routes.protected[key].action);
}

app.use(async (error, req, res, next) => {
  console.error(error, ' <=== error')
  return res.status(500).send({ message: error.message })
});

let server = http.createServer(app)

let io = socketIO(server)
framework.socket = []
io.on('connection', (socket) => {

  framework.socket.push(socket)

  console.log('User Connected!!')
  socket.on('disconnect', () => {
    console.log('user disconnected!!')
  })
})

server.listen(process.env.PORT, async () => {
  console.log('listening on port '+process.env.PORT);
});

const dbSync = async () => {
  console.time('db syncing total time');
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : driving schools data syncing start`);
  await drivingSchoolsDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : driving schools data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : users data syncing start`);
  await userDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : users data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : formulas data syncing start`);
  await formulaDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : formulas data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : students data syncing start`);
  await studentDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : students data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : alerts data syncing start`);
  await alertDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : alerts data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : exams data syncing start`);
  await examDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : exams data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : debits data syncing start`);
  await debitDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : debits data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : planning data syncing start`);
  await planningDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : planning data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : student old exams data syncing`);
  await studentOldExamDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : student old exams data syncing end`);

  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : student payments data syncing start`);
  await studentPaymentDataSync();
  console.log(`${moment().format('DD-MM-YYYY HH:mm:ss.SSS')} : student payments data syncing end`);

  console.timeEnd('db syncing total time');
};


// dbSync();