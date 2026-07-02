import BaseRepository from "../../shared/repositories/BaseRepository.js";
import HeroBanner, { HeroDocument } from "./hero.model.js";
import { HeroStatus } from "./hero.types.js";

class HeroRepository extends BaseRepository<HeroDocument> {
  constructor() {
    super(HeroBanner);
  }

  async getPublishedHeroes() {
    const now = new Date();

    return this.model
      .find({
        status: HeroStatus.PUBLISHED,
        $and: [
          {
            $or: [
              { publishedAt: null },
              { publishedAt: { $lte: now } },
            ],
          },
          {
            $or: [
              { expiresAt: null },
              { expiresAt: { $gt: now } },
            ],
          },
        ],
      })
      .sort({
        displayOrder: 1,
      });
  }

  async existsByDisplayOrder(displayOrder: number) {
    return this.model.exists({
      displayOrder,
    });
  }
}

export default new HeroRepository();