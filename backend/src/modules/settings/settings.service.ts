import ApiError from "../../shared/errors/ApiError.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";

import SettingsRepository from "./settings.repository.js";

import { SettingsPayload } from "./settings.validation.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

class SettingsService {
  /*
  |--------------------------------------------------------------------------
  | Save Settings (Create / Update)
  |--------------------------------------------------------------------------
  */

  async save(payload: SettingsPayload) {
    const existing =
      await SettingsRepository.getSettings();

    /*
    |--------------------------------------------------------------------------
    | Delete old Cloudinary files if replaced
    |--------------------------------------------------------------------------
    */

    if (existing) {
      // Logo
      if (
        existing.logo.publicId !==
        payload.logo.publicId
      ) {
        await CloudinaryService.delete(
          existing.logo.publicId
        );
      }

      // Favicon
      if (
        existing.favicon.publicId !==
        payload.favicon.publicId
      ) {
        await CloudinaryService.delete(
          existing.favicon.publicId
        );
      }
    }

    const settings =
      await SettingsRepository.createOrUpdate(
        payload
      );

    await AuditService.log({
      module: AuditModule.SETTINGS,
      action: existing
        ? AuditAction.UPDATE
        : AuditAction.CREATE,
      resourceId: settings._id.toString(),
      resourceName: "Website Settings",
    });

    return settings;
  }

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  async getSettings() {
    return SettingsRepository.getSettings();
  }

  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  async getActiveSettings() {
    const settings =
      await SettingsRepository.getActiveSettings();

    if (!settings) {
      throw new ApiError(
        404,
        "Website settings not found."
      );
    }

    return settings;
  }
}

export default new SettingsService();