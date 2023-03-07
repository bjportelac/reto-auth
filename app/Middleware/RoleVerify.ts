import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class RoleVerify {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authHeader = ctx.request.header("authorization");
    const email = ctx.request.header("email");

    if (authHeader == undefined) {
      return ctx.response.forbidden({
        mensaje: "Authorization token is missing",
      });
    }

    try {
      const user = await User.findBy("email", email);
      if (!user) {
        return ctx.response.forbidden({
          message: "You have no permission to access this route",
        });
      } else if (user.profile != 1) {
        return ctx.response.forbidden({
          message: "You have no permission to access this route",
        });
      }

      await next();
    } catch (error) {
      console.log(error);
      ctx.response.forbidden("This token is no longer useful");
    }
  }
}
