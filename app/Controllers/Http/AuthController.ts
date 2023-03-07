import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class AuthController {
  public async loginUser({ auth, request, response }: HttpContextContract) {
    try {
      const email = request.input("email");
      const password = request.input("password");

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "60 mins",
      });
      return response.ok({ message: "User has logged-in successfully", token });
    } catch (error) {
      return response.unauthorized({
        message: "Credentials are not valid.",
        error,
      });
    }
  }

  public async registerUser({ request, auth, response }: HttpContextContract) {
    try {
      const name = request.input("name");
      const email = request.input("email");
      const password = request.input("password");
      const profile = request.input("profile");

      const user = new User();
      user.name = name;
      user.email = email;
      user.password = password;
      user.profile = profile;

      if (await user.save()) {
        const token = await auth.use("api").login(user, {
          expiresIn: "10 days",
        });
        return response.ok({ message: "User successfuly registered", token });
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to create the user.",
        error,
      });
    }
  }
}
