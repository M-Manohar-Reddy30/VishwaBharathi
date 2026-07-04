import ApiError from "../../shared/errors/ApiError.js";

import ContactRepository from "./contact.repository.js";

import {
  ContactPayload,
  UpdateContactStatusPayload,
} from "./contact.validation.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import AuditService from "../audit/audit.service.js";
import {
  AuditAction,
  AuditModule,
} from "../audit/audit.types.js";

class ContactService {
  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  async create(payload: ContactPayload) {
    const contact =
      await ContactRepository.create({
        ...payload,
        status: "UNREAD",
      });

    return contact;
  }

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return ContactRepository.getPaginated(query);
  }

  async getById(id: string) {
    const contact =
      await ContactRepository.findById(id);

    if (!contact) {
      throw new ApiError(
        404,
        "Contact enquiry not found."
      );
    }

    return contact;
  }

  async updateStatus(
    id: string,
    payload: UpdateContactStatusPayload
  ) {
    const contact =
      await ContactRepository.updateStatus(
        id,
        payload.status
      );

    if (!contact) {
      throw new ApiError(
        404,
        "Contact enquiry not found."
      );
    }

    await AuditService.log({
      module: AuditModule.CONTACT,
      action: AuditAction.UPDATE,
      resourceId: contact._id.toString(),
      resourceName: contact.subject,
      metadata: {
        status: payload.status,
      },
    });

    return contact;
  }

  async delete(id: string) {
    const contact =
      await ContactRepository.findById(id);

    if (!contact) {
      throw new ApiError(
        404,
        "Contact enquiry not found."
      );
    }

    await ContactRepository.delete(id);

    await AuditService.log({
      module: AuditModule.CONTACT,
      action: AuditAction.DELETE,
      resourceId: contact._id.toString(),
      resourceName: contact.subject,
    });
  }
}

export default new ContactService();