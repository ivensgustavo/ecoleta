import Knex from 'knex';

export async function up(knex:Knex){
  return knex.schema.table('points', table =>{
    table.string('image')
    .notNullable()
    .defaultTo('image-fake');
  })
}

export async function down(knex:Knex){
  return knex.schema.table('points', table => {
    table.dropColumn('image');
  })
}