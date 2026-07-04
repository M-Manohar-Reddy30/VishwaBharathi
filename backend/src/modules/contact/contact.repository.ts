import BaseRepository from "../../shared/repositories/BaseRepository.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import Contact, {
  ContactDocument,
} from "./contact.model.js";

class ContactRepository extends BaseRepository<ContactDocument> {
  constructor() {
    super(Contact);
  }

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return this.findPaginated(query, {
      searchFields: [
        "name",
        "email",
        "subject",
        "message",
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Mark as Read / Unread
  |--------------------------------------------------------------------------
  */

  async updateStatus(
    id: string,
    status: "READ" | "UNREAD"
  ) {
    return this.model.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }
}

export default new ContactRepository();