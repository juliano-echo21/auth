import User from "App/Models/User";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Response } from "@adonisjs/core/build/standalone";

export default class AuthController {
  public async resgister({ request, response, auth }: HttpContextContract) {
    const name = request.input("name");
    const email = request.input("email");
    const password = request.input("password");
    const userId = request.input("userId");
    const profile = request.input("profile");

    const curUser = await User.query().where("userId", userId);
    // console.log("cur", curUser);

    if (curUser.length === 0) {
      const user = new User();
      user.name = name;
      user.password = password;
      user.email = email;
      user.userId = userId;
      user.profile = profile;

      await user.save();

      const token = await auth.use("api").login(user, {
        expiresIn: "30 mins",
      });

      return {
        token,
        msg: "usuario registrado",
      };
    } else {
      response.status(403).json({ msg: "the user already exists" });
    }

    // console.log(curUser);
    // return curUser;
  }

  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    // const profile = request.input("profile");

    try {
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "30 mins",
      });

      return {
        token,
        msg: "usuario logueado",
      };
    } catch (error) {
      console.log(error);
      return response.status(400).json({ msg: error });
    }
  }

  public async validateProfile(userId) {
    const myQuery = await User.query().where("id", userId);
    const curUser = myQuery[0];
    const profileType = curUser["$original"]["profile"];
    // console.log("curUser", curUser);
    // console.log("pro tpye", profileType);
    if (profileType != 1) {
      throw new Error("Access denied !!!");
    }
  }
}
