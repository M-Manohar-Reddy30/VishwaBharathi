import ApiError from "../../shared/errors/ApiError.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";

import AdmissionRepository from "./admission.repository.js";

import { AdmissionPayload } from "./admission.validation.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

class AdmissionService {
  /*
  |--------------------------------------------------------------------------
  | Save Admission (Create or Update)
  |--------------------------------------------------------------------------
  */

  async save(payload: AdmissionPayload) {
    const existing =
      await AdmissionRepository.getAdmission();

    /*
    |--------------------------------------------------------------------------
    | Delete old Cloudinary files if replaced
    |--------------------------------------------------------------------------
    */

    if (existing) {
      // Banner Image
      if (
        existing.bannerImage.publicId !==
        payload.bannerImage.publicId
      ) {
        await CloudinaryService.delete(
          existing.bannerImage.publicId
        );
      }

      // Fee Structure PDF
      if (
        existing.feeStructurePdf?.publicId &&
        payload.feeStructurePdf?.publicId &&
        existing.feeStructurePdf.publicId !==
          payload.feeStructurePdf.publicId
      ) {
        await CloudinaryService.delete(
          existing.feeStructurePdf.publicId
        );
      }

      // Brochure PDF
      if (
        existing.brochurePdf?.publicId &&
        payload.brochurePdf?.publicId &&
        existing.brochurePdf.publicId !==
          payload.brochurePdf.publicId
      ) {
        await CloudinaryService.delete(
          existing.brochurePdf.publicId
        );
      }
    }

    const admission =
      await AdmissionRepository.createOrUpdate(
        payload
      );

    await AuditService.log({
      module: AuditModule.ADMISSION,
      action: existing
        ? AuditAction.UPDATE
        : AuditAction.CREATE,
      resourceId: admission._id.toString(),
      resourceName: "Admissions Page",
    });

    return admission;
  }

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  async getAdmission() {
    return AdmissionRepository.getAdmission();
  }

  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  async getActiveAdmission() {
    const admission =
      await AdmissionRepository.getActiveAdmission();

    if (!admission) {
      throw new ApiError(
        404,
        "Admission page not found."
      );
    }

    return admission;
  }
}

export default new AdmissionService();