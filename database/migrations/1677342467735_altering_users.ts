import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlteringUsers extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("profile").notNullable().defaultTo(0);
      table.string("last_name").notNullable().defaultTo("");
      table.integer("id_type").notNullable().defaultTo(0);
      table.string("id_number").notNullable().defaultTo("");
      table.string("address").notNullable().defaultTo("");
      table.integer("neighbourhood").notNullable().defaultTo(0);
      table.integer("department").notNullable().defaultTo(0);
      table.integer("borough").notNullable().defaultTo(0); //municipio
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("profile");
      table.dropColumn("last_name");
      table.dropColumn("id_type");
      table.dropColumn("id_number");
      table.dropColumn("address");
      table.dropColumn("neighbourhood");
      table.dropColumn("department");
      table.dropColumn("borough");
    });
  }
}
