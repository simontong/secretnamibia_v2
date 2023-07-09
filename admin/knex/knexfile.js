"use strict";

const _ = require("lodash");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("node:fs");

const env = path.join(__dirname, "../directus/.env");
if (!fs.existsSync(env)) {
	throw new Error(`Missing: ${env}`);
}
dotenv.config({ path: path.join(__dirname, "../directus/.env") });

/***
 * default opts (development or production, depends on your .env)
 */
const defaultOptions = {
	client: "pg",
	connection: {
		charset: "utf8mb4",
		host: process.env.DB_HOST,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		port: process.env.DB_PORT,
		dateStrings: true,
	},
	migrations: {
		tableName: "knex_migrations",
		directory: path.join(__dirname, "migrations"),
	},
};

/**
 * create knex opts with afterCreate included
 * @param customOpts
 * @returns {*}
 */
const createOpts = (customOpts) => {
	return _.merge(defaultOptions, customOpts);
};

/**
 * testing config
 */
exports.testing = createOpts({
	// pool: {
	//   min: 1,
	//   max: 1,
	// },
	seeds: {
		directory: path.join(__dirname, "seeds/testing"),
	},
});

/**
 * development config
 */
exports.development = createOpts({
	seeds: {
		directory: path.join(__dirname, "seeds/development"),
	},
});

/**
 * production config
 */
exports.production = createOpts({
	seeds: {
		directory: path.join(__dirname, "seeds/production"),
	},
});
