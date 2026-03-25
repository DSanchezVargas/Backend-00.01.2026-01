require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const port = process.env.PORT || 3000;

async function start() {
  await sequelize.authenticate();

  const syncMode = (process.env.DB_SYNC || 'none').toLowerCase();
  if (syncMode === 'alter') {
    await sequelize.sync({ alter: true });
  } else if (syncMode === 'force') {
    await sequelize.sync({ force: true });
  }

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API listening on port ${port}`);
  });
}

if (require.main === module) {
  start().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

module.exports = { start };
