import DashboardRepository from "./dashboard.repository.js";
import AuditService from "../audit/audit.service.js";

class DashboardService {
    async getStats() {
        return DashboardRepository.getDashboardStats();
    }

    async getRecentActivities() {
        return AuditService.getRecent();
    }
}

export default new DashboardService();