const name = "routes";

exports.up = async function (knex) {
	await knex.schema.createTable(name, t => {
		t.uuid("id").primary();
		t.string("status").defaultTo("draft").notNullable();
		t.integer("sort").nullable();
		t.uuid("user_created").nullable().references("id").inTable("directus_users");
		t.timestamp("date_created", { useTz: true }).nullable();
		t.uuid("user_updated").nullable().references("id").inTable("directus_users");
		t.timestamp("date_updated", { useTz: true }).nullable();

		t.uuid("parent").index().nullable().references("id").inTable(name).onDelete("set null");
		t.string("slug").index();
	});
};

exports.down = async function (knex) {
	await knex.schema.dropTable(name);
};

// create table activities
// (
// id           uuid                                            not null
// primary key,
// status       varchar(255) default 'draft'::character varying not null,
// sort         integer,
// date_created timestamp with time zone,
// user_updated uuid
// constraint activities_user_updated_foreign references directus_users,
// date_updated timestamp with time zone,
// title        varchar(255)
// )
