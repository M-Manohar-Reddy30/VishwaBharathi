import HeroBanner from "../hero/hero.model.js";
import { HeroStatus } from "../hero/hero.types.js";

class DashboardRepository {
  async getHeroStats() {
    const [
      totalHeroes,
      publishedHeroes,
      draftHeroes,
      archivedHeroes,
      trashedHeroes,
    ] = await Promise.all([
      HeroBanner.countDocuments(),
      HeroBanner.countDocuments({
        status: HeroStatus.PUBLISHED,
        isDeleted: false,
      }),
      HeroBanner.countDocuments({
        status: HeroStatus.DRAFT,
        isDeleted: false,
      }),
      HeroBanner.countDocuments({
        status: HeroStatus.ARCHIVED,
        isDeleted: false,
      }),
      HeroBanner.countDocuments({
        isDeleted: true,
      }),
    ]);

    return {
      totalHeroes,
      publishedHeroes,
      draftHeroes,
      archivedHeroes,
      trashedHeroes,
    };
  }
}

export default new DashboardRepository();