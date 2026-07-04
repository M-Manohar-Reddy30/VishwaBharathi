import ApiError from "../../shared/errors/ApiError.js";

import HeroRepository from "./hero.repository.js";
import { BulkHeroPayload } from "./hero.bulk.validation.js";
import { HeroPayload } from "./hero.types.js";
import { HeroStatus } from "./hero.types.js";
import { PaginationQuery } from "../../shared/types/pagination.types.js";
import { ReorderHeroPayload } from "./hero.reorder.validation.js";
import CloudinaryService from "../../shared/cloudinary/cloudinary.service.js";
import AuditService from "../audit/audit.service.js";
import { AuditAction, AuditModule, } from "../audit/audit.types.js";
  
class HeroService {

    async create(payload: HeroPayload){

        const exists = await HeroRepository.existsByDisplayOrder(
            payload.displayOrder
        );

        if(exists){

            throw new ApiError(
                409,
                "Display order already exists."
            );

        }

        const hero = await HeroRepository.create(payload);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.CREATE,
            resourceId: hero._id.toString(),
            resourceName: hero.title,
            metadata: {
                status: hero.status,
                displayOrder: hero.displayOrder,
            },
        });

        return hero;

    }

    async getAll(){

        return HeroRepository.findMany();

    }

    async getPublished(){

        return HeroRepository.getPublishedHeroes();

    }

    async getById(id:string){

        const hero = await HeroRepository.findById(id);

        if(!hero){

            throw new ApiError(
                404,
                "Hero Banner not found."
            );

        }

        return hero;

    }

    async update(id: string, payload: Partial<HeroPayload>) {

        const hero = await HeroRepository.update(
            id,
            payload
        );

        if (!hero) {
            throw new ApiError(
                404,
                "Hero Banner not found."
            );
        }

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.UPDATE,
            resourceId: hero._id.toString(),
            resourceName: hero.title,
            metadata: {
                status: hero.status,
            },
        });

        return hero;
    }

    async trash(id: string, adminId?: string) {
        const hero = await HeroRepository.findById(id);

        if (!hero) {
            throw new ApiError(404, "Hero Banner not found.");
        }

        if (hero.isDeleted) {
            throw new ApiError(400, "Hero Banner already moved to trash.");
        }

        const deletedHero = await HeroRepository.softDelete(id, adminId);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.TRASH,
            resourceId: hero._id.toString(),
            resourceName: hero.title,
        });

        return deletedHero;
    }

        async restore(id: string) {
            const hero = await HeroRepository.findById(id);

            if (!hero) {
             throw new ApiError(404, "Hero Banner not found.");
            }

            if (!hero.isDeleted) {
                throw new ApiError(
                    400,
                    "Hero Banner is already active."
                );
            }

            const restoredHero = await HeroRepository.restore(id);

            await AuditService.log({
                module: AuditModule.HERO,
                action: AuditAction.RESTORE,
                resourceId: hero._id.toString(),
                resourceName: hero.title,
            });

            return restoredHero;
        }

        async forceDelete(id: string) {
            const hero = await HeroRepository.findById(id);

            if (!hero) {
                throw new ApiError(404, "Hero Banner not found.");
            }

            await CloudinaryService.delete(hero.desktopImage.publicId);

            await CloudinaryService.delete(hero.mobileImage.publicId);

            // ADD THIS
            await AuditService.log({
                module: AuditModule.HERO,
                action: AuditAction.DELETE,
                resourceId: hero._id.toString(),
                resourceName: hero.title,
                metadata: {
                    permanent: true,
                },
            });

            return HeroRepository.forceDelete(id);
        }

        async getTrash() {
            return HeroRepository.getTrashHeroes();
        }

    async publish(id:string){

        const hero = await HeroRepository.update(id, {
            status: HeroStatus.PUBLISHED,
            publishedAt: new Date(),
        });

        if (!hero) {
            throw new ApiError(
                404,
                "Hero Banner not found."
            );
        }

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.PUBLISH,
            resourceId: hero._id.toString(),
            resourceName: hero.title,
        });

        return hero;

    }

    async archive(id: string) {

        const hero = await HeroRepository.update(id, {
            status: HeroStatus.ARCHIVED,
        });

        if (!hero) {
            throw new ApiError(
                404,
                "Hero Banner not found."
            );
        }

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.ARCHIVE,
            resourceId: hero._id.toString(),
            resourceName: hero.title,
        });

        return hero;
    }

    async bulkPublish(payload: BulkHeroPayload) {

        await HeroRepository.bulkPublish(payload.ids);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.BULK_PUBLISH,
            metadata: {
                count: payload.ids.length,
            },
        });

    }

    async bulkArchive(payload: BulkHeroPayload) {
        await HeroRepository.bulkArchive(payload.ids);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.BULK_ARCHIVE,
            metadata: {
                count: payload.ids.length,
            },
        });
    }

    async bulkTrash(payload: BulkHeroPayload) {
        await HeroRepository.bulkTrash(payload.ids);
        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.BULK_DELETE,
            metadata: {
                count: payload.ids.length,
            },
        });
    }

    async bulkRestore(payload: BulkHeroPayload) {
        await HeroRepository.bulkRestore(payload.ids);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.BULK_RESTORE,
            metadata: {
                count: payload.ids.length,
            },
        });
    }

    async bulkForceDelete(payload: BulkHeroPayload) {

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.BULK_DELETE,
            metadata: {
                count: payload.ids.length,
                permanent: true,
            },
        });

        return HeroRepository.bulkForceDelete(payload.ids);
    }

    async getPaginated(query: PaginationQuery) {
        return HeroRepository.getPaginatedHeroes(query);
    }

    async reorder(
        payload: ReorderHeroPayload
    ) {
       const result =
            await HeroRepository.reorder(payload.heroes);

        await AuditService.log({
            module: AuditModule.HERO,
            action: AuditAction.REORDER,
            metadata: {
                count: payload.heroes.length,
            },
        });

        return result;
    }

}
export default new HeroService();