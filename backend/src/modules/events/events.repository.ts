import BaseRepository from "../../shared/repositories/BaseRepository.js";

import { PaginationQuery } from "../../shared/types/pagination.types.js";

import Event, {
  EventDocument,
} from "./events.model.js";

import { EVENT_STATUS } from "./events.constants.js";

class EventRepository extends BaseRepository<EventDocument> {
  constructor() {
    super(Event);
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
        "venue",
      ],
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Public Events
  |--------------------------------------------------------------------------
  */

  async getPublished() {
    return this.model
      .find({
        status: EVENT_STATUS.PUBLISHED,
        isDeleted: false,
      })
      .sort({
        displayOrder: 1,
        startDate: 1,
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
  | Status
  |--------------------------------------------------------------------------
  */

  async publish(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        status: EVENT_STATUS.PUBLISHED,
        publishedAt: new Date(),
      },
      {
        new: true,
      }
    );
  }

  async archive(id: string) {
    return this.model.findByIdAndUpdate(
      id,
      {
        status: EVENT_STATUS.ARCHIVED,
      },
      {
        new: true,
      }
    );
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
    events: {
      id: string;
      displayOrder: number;
    }[]
  ) {
    return this.model.bulkWrite(
      events.map((event) => ({
        updateOne: {
          filter: {
            _id: event.id,
          },
          update: {
            displayOrder: event.displayOrder,
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

  async bulkPublish(ids: string[]) {
    return this.model.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        status: EVENT_STATUS.PUBLISHED,
        publishedAt: new Date(),
      }
    );
  }

  async bulkArchive(ids: string[]) {
    return this.model.updateMany(
      {
        _id: {
          $in: ids,
        },
      },
      {
        status: EVENT_STATUS.ARCHIVED,
      }
    );
  }

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

export default new EventRepository();