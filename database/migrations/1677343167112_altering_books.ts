import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlteringBooks extends BaseSchema {
  protected tableName = "books";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("editorial");
      table.integer("format");
      table.integer("pages").unsigned();
      table.string("user_id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("editorial");
      table.dropColumn("format");
      table.dropColumn("pages");
      table.dropColumn("user_id");
    });
  }
}
