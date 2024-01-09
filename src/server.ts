import {app} from './app';
import sequelize from './config/sequelize';

sequelize
  .sync({force:true})
  .then(() => {
    console.info('DB_CONNECTED', 'SUCCESS');
  })
  .catch((error: any) => {
    console.error('DB_CONNECTION_FAILED', error);
  });

const server = app.listen(app.get('port'), async () => {
  console.info(
    'APP_START',
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
});

export default server;
