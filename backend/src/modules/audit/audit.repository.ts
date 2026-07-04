import BaseRepository from "../../shared/repositories/BaseRepository.js";
import AuditLog, { AuditDocument } from "./audit.model.js";

class AuditRepository extends BaseRepository<AuditDocument> {
  constructor() {
    super(AuditLog);
  }

  async getRecent(limit = 10) {
    return this.model
      .find()
      .sort({
        createdAt: -1,
      })
      .limit(limit);
  }
}

export default new AuditRepository();