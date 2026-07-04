import BaseRepository from "../../shared/repositories/BaseRepository.js";

import Settings, {
  SettingsDocument,
} from "./settings.model.js";

import { SettingsPayload } from "./settings.validation.js";

class SettingsRepository extends BaseRepository<SettingsDocument> {
  constructor() {
    super(Settings);
  }

  /*
  |--------------------------------------------------------------------------
  | Singleton
  |--------------------------------------------------------------------------
  */

  async getSettings() {
    return this.model
      .findOne()
      .sort({ createdAt: 1 });
  }

  async getActiveSettings() {
    return this.model
      .findOne({
        websiteStatus: "ACTIVE",
      })
      .sort({ createdAt: 1 });
  }

  async createOrUpdate(
    data: SettingsPayload
  ) {
    return this.model.findOneAndUpdate(
      {},
      data,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );
  }

  async exists() {
    return this.model.exists({});
  }
}

export default new SettingsRepository();