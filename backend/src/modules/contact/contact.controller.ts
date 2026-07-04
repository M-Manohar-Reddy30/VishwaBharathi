import { Request, Response } from "express";

import asyncHandler from "../../shared/utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import ContactService from "./contact.service.js";

import {
  createContactSchema,
  updateContactStatusSchema,
} from "./contact.validation.js";

import { querySchema } from "../../shared/validators/query.validator.js";

class ContactController {
  /*
  |--------------------------------------------------------------------------
  | Public
  |--------------------------------------------------------------------------
  */

  create = asyncHandler(async (req: Request, res: Response) => {
    const payload = createContactSchema.parse(req.body);

    const contact = await ContactService.create(payload);

    return ApiResponse.created(
      res,
      contact,
      "Enquiry submitted successfully"
    );
  });

  /*
  |--------------------------------------------------------------------------
  | Admin
  |--------------------------------------------------------------------------
  */

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = querySchema.parse(req.query);

    const result = await ContactService.getPaginated(query);

    return ApiResponse.paginated(
      res,
      result.data,
      result.pagination,
      "Enquiries fetched successfully"
    );
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const contact = await ContactService.getById(req.params.id);

    return ApiResponse.success(
      res,
      contact,
      "Enquiry fetched successfully"
    );
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const payload = updateContactStatusSchema.parse(req.body);

    const contact = await ContactService.updateStatus(
      req.params.id,
      payload
    );

    return ApiResponse.success(
      res,
      contact,
      "Enquiry status updated successfully"
    );
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await ContactService.delete(req.params.id);

    return ApiResponse.noContent(
      res,
      "Enquiry deleted successfully"
    );
  });
}

export default new ContactController();