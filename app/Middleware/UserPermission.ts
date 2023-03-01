import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AuthController from "App/Controllers/Http/AuthController";

export default class UserPermission {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    // const authorizationHeader = request.header("authorization");
    // const a = auth["mappingsCache"];
    const a = auth;
    const b = a["mappingsCache"];
    const c = b.get("api");
    const userId = c["user"].id;

    console.log("userId", userId);

    try {
      const authController = new AuthController();
      const profile = await authController.validateProfile(userId);
      await next();
    } catch (error) {
      return response.status(400).send({
        msg: "Unallowed!!!",
        state: 401,
      });
    }
  }
}
