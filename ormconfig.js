const {
  TYPEORM_HOST: host,
  TYPEORM_PORT: port,
  TYPEORM_USER: user,
  TYPEORM_PASS: password,
  TYPEORM_DB: db,
} = process.env;

module.exports = {
  type: 'mariadb',
  host: host || 'localhost',
  port: (port && parseInt(port)) || 3306,
  username: user || 'root',
  password: password || '',
  database: db || 'crosstoria',
  synchronize: true,
  logging: false,
  entities: ['dist/entity/*.ts', 'dist/entity/*.js'],
  migrations: ['dist/migration/*.ts', 'dist/migration/*.js'],
  subscribers: ['dist/subscriber/*.ts', 'dist/subscriber/*.js'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/migration',
    subscribersDir: './src/subscriber',
  },
  migrationRun: true,
  autoSchemaSync: true,
  migration: 'generate',
  schema: 'sync',
};
