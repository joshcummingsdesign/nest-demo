module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'nest_demo',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
