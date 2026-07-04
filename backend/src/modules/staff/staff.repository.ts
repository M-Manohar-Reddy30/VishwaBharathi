import BaseRepository from "../../shared/repositories/BaseRepository.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import Staff, {
  StaffDocument,
} from "./staff.model.js";

class StaffRepository extends BaseRepository<StaffDocument> {
  constructor() {
    super(Staff);
  }

  /*
  |--------------------------------------------------------------------------
  | Pagination
  |--------------------------------------------------------------------------
  */

  async getPaginated(query: PaginationQuery) {
    return this.findPaginated(query, {
      filter: {
        isDeleted: false,
      },
      searchFields: [
        "name",
        "designation",
        "qualification",
        "bio",
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Active Staff
  |--------------------------------------------------------------------------
  */

  async getActive() {
    return this.model
      .find({
        status: "ACTIVE",
        isDeleted: false,
      })
      .sort({
        displayOrder: 1,
      });
  }

  /*
  |--------------------------------------------------------------------------
  | Trash
  |--------------------------------------------------------------------------
  */

  async getTrash() {
    return this.model
      .find({
        isDeleted: true,
      })
      .sort({
        deletedAt: -1,
      });
  }

  async softDelete(
    id: string,
    adminId?: string
  ) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId ?? null,
      },
      {
        new: true,
      }
    );
  }

  async restore(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      },
      {
        new: true,
      }
    );
  }

  async forceDelete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  /*
  |--------------------------------------------------------------------------
  | Display Order
  |--------------------------------------------------------------------------
  */

  async existsByDisplayOrder(
    displayOrder: number
  ) {
    return this.model.exists({
      displayOrder,
      isDeleted: false,
    });
  }

  async reorder(
    staff: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    return this.model.bulkWrite(
      staff.map((member) => ({
        updateOne: {
          filter: {
            _id: member.id,
          },
          update: {
            displayOrder: member.displayOrder,
          },
        },
      }))
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Bulk Operations
  |--------------------------------------------------------------------------
  */

  async bulkTrash(ids: string[]) {
    return this.model.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        isDeleted: true,
        deletedAt: new Date(),
      }
    );
  }

  async bulkRestore(ids: string[]) {
    return this.model.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        isDeleted: false,
        deletedAt: null,
        deletedBy: null,
      }
    );
  }

  async bulkForceDelete(ids: string[]) {
    return this.model.deleteMany({
      _id: {
        $in: ids,
      },
    });
  }
}

export default new StaffRepository();