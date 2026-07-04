import HeroBanner from "../hero/hero.model.js";
import Gallery from "../gallery/gallery.model.js";
import Event from "../events/events.model.js";
import Staff from "../staff/staff.model.js";
import Notice from "../notices/notice.model.js";
import Admission from "../admissions/admission.model.js";
import Contact from "../contact/contact.model.js";

import { HeroStatus } from "../hero/hero.types.js";
import { CONTACT_STATUS } from "../contact/contact.constants.js";

class DashboardRepository {
  async getDashboardStats() {
    const [
      // Hero Statistics
      totalHeroes,
      publishedHeroes,
      draftHeroes,
      archivedHeroes,
      trashedHeroes,

      // Overview Statistics
      totalGallery,
      totalEvents,
      totalStaff,
      totalNotices,
      totalAdmissions,
      totalContacts,

      // Contact Statistics
      unreadContacts,
      resolvedContacts,
    ] = await Promise.all([
      /* -------------------------------------------------------------------------- */
      /* Hero */
      /* -------------------------------------------------------------------------- */

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

      /* -------------------------------------------------------------------------- */
      /* Gallery */
      /* -------------------------------------------------------------------------- */

      Gallery.countDocuments({
        isDeleted: false,
      }),

      /* -------------------------------------------------------------------------- */
      /* Events */
      /* -------------------------------------------------------------------------- */

      Event.countDocuments({
        isDeleted: false,
      }),

      /* -------------------------------------------------------------------------- */
      /* Staff */
      /* -------------------------------------------------------------------------- */

      Staff.countDocuments({
        isDeleted: false,
      }),

      /* -------------------------------------------------------------------------- */
      /* Notices */
      /* -------------------------------------------------------------------------- */

      Notice.countDocuments({
        isDeleted: false,
      }),

      /* -------------------------------------------------------------------------- */
      /* Admissions */
      /* -------------------------------------------------------------------------- */

      Admission.countDocuments(),

      /* -------------------------------------------------------------------------- */
      /* Contact */
      /* -------------------------------------------------------------------------- */

      Contact.countDocuments(),

      Contact.countDocuments({
        status: CONTACT_STATUS.UNREAD,
      }),

      Contact.countDocuments({
        status: CONTACT_STATUS.RESOLVED,
      }),
    ]);

    return {
      overview: {
        heroes: totalHeroes,
        gallery: totalGallery,
        events: totalEvents,
        staff: totalStaff,
        notices: totalNotices,
        admissions: totalAdmissions,
        contacts: totalContacts,
      },

      hero: {
        total: totalHeroes,
        published: publishedHeroes,
        draft: draftHeroes,
        archived: archivedHeroes,
        trashed: trashedHeroes,
      },

      contacts: {
        total: totalContacts,
        unread: unreadContacts,
        resolved: resolvedContacts,
      },
    };
  }
}

export default new DashboardRepository();