import BaseRepository from "../../shared/repositories/BaseRepository.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import Gallery, {
  GalleryDocument,
} from "./gallery.model.js";

class GalleryRepository extends BaseRepository<GalleryDocument> {
  constructor() {
    super(Gallery);
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
        "title",
        "description",
        "tags",
      ],
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
    images: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    return this.model.bulkWrite(
      images.map((image) => ({
        updateOne: {
          filter: {
            _id: image.id,
          },
          update: {
            displayOrder: image.displayOrder,
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

export default new GalleryRepository();