import User from "App/Models/User";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UsersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("id");
      const user = await User.findOrFail(userId);
      response.status(200).json({ Users: user });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }

  public async show({ request, response }: HttpContextContract) {
    try {
      const users = await User.all();
      response.status(200).json({ Users: users });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const userId = request.param("id");
    const name = request.input("name");
    const email = request.input("email");
    try {
      const user = await User.findOrFail(userId);
      user.name = name;
      user.email = email;

      await user.save();
      response.status(500).json({ msg: "updated successfully" });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    try {
      const userId = request.param("id");
      await User.query().where("id", userId).delete();
      response.status(500).json({ msg: "deleted succesfully" });
    } catch (error) {
      response.status(400).json({ msg: error });
    }
  }
}
