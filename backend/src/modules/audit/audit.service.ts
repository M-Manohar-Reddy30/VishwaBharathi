import AuditRepository from "./audit.repository.js";
import { AuditLogPayload } from "./audit.types.js";

class AuditService {
    async log(payload: AuditLogPayload) {
        return AuditRepository.create(payload);
    }

    async getRecent(limit = 10) {
        return AuditRepository.getRecent(limit);
    }
}

export default new AuditService();