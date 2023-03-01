import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class AlteringUserAgains extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn("id_number", "user_id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn("user_id", "id_number");
    });
  }
}
