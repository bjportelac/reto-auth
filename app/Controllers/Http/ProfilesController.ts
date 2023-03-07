import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Profile from "App/Models/Profile";

export default class ProfilesController {
  public async registerProfile({ request, response }: HttpContextContract) {
    try {
      const profileType = request.input("profileType");
      const profile = new Profile();
      profile.profileType = profileType;
      if (await profile.save()) {
        return response.created({
          message: "profile successfuly stored.",
          profile,
        });
      }
    } catch (error) {
      return response.internalServerError({
        message: "Unable to store the book",
        error,
      });
    }
  }

  public async listProfiles({ response }: HttpContextContract) {
    try {
      const profiles = await Profile.query();
      if (profiles) {
        return response.ok({
          profiles,
        });
      }
    } catch (error) {
        return response.internalServerError({
            message: "Unable to fetch the profiles",
            error,
          });
    }
  }

}
