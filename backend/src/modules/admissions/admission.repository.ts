import BaseRepository from "../../shared/repositories/BaseRepository.js";

import Admission, {
  AdmissionDocument,
} from "./admission.model.js";

class AdmissionRepository extends BaseRepository<AdmissionDocument> {
  constructor() {
    super(Admission);
  }

  /*
  |--------------------------------------------------------------------------
  | Singleton
  |--------------------------------------------------------------------------
  */

  async getAdmission() {
    return this.model.findOne();
  }

  async getActiveAdmission() {
    return this.model.findOne({
      status: "ACTIVE",
    });
  }

  async createOrUpdate(data: Partial<AdmissionDocument>) {
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

export default new AdmissionRepository();