import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import Roles from "App/resources/profiles";

export default class AddingRecords extends BaseSchema {
  protected tableName = "profiles";

  public async up() {
    // this.schema.createTable(this.tableName, (table) => {
    //   table.increments('id')
    //   table.timestamps(true)
    // })
    this.defer(async (db) => {
      await db.table(this.tableName).insert([
        {
          id: Roles.ADMIN,
          description: "Admin User",
        },
        {
          id: Roles.MEMBER,
          description: "Basic User",
        },
        {
          id: Roles.SUPERVISOR,
          description: "Supervisor User",
        },
      ]);
    });
  }

  public async down() {
    // this.schema.dropTable(this.tableName);
  }
}
