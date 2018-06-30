import { Component, Inject, Logger } from "@nestjs/common";
import { UserRepository } from "../repositories/user-repository.interface";
import { users as usersDev } from "./data/user-seed.data";
import { users as usersProd } from "./data/user-prod.data";

@Component()
export class UserFixture {
  constructor(@Inject(UserRepository) private _userRepo: UserRepository,
    @Inject(SchoolConfigService) private _schoolConfigService: SchoolConfigService) { }

  async load(production: boolean): Promise<boolean> {

    if (!production) {
      const schoolConfigs = await this._schoolConfigService.findAll();

      usersDev[0].profile.schoolConfigId = schoolConfigs[2]._id;

      if ((await this._userRepo.findAll()).length === 0) {
        Logger.log("Users have not yet been configured. Creating users from data fixture.", "UserFixture.load");
        await this._userRepo.insertMany(usersDev);

      } else
        Logger.log("Users already configured, moving on.", "UserFixture.load (Dev)");

      return true;
    }
    // // Production + condition
    // else if ((await this._userRepo.findAll()).length === 0) {
    //   Logger.log("Users have not yet been configured. Creating users from data fixture.", "UserFixture.load");
    //   await this._userRepo.insertMany(usersDev);
    // }
    else
      Logger.log("Users already configured, moving on.", "UserFixture.load (Production)");

    return true;
  }
}
