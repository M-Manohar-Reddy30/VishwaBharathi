import ApiError from "../../shared/errors/ApiError.js";

import HeroRepository from "./hero.repository.js";
import { HeroPayload } from "./hero.types.js";
import { HeroStatus } from "./hero.types.js";

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

        return HeroRepository.create(payload);

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

    async update(id:string,payload:Partial<HeroPayload>){

        const hero = await HeroRepository.update(
            id,
            payload
        );

        if(!hero){

            throw new ApiError(
                404,
                "Hero Banner not found."
            );

        }

        return hero;

    }

    async delete(id:string){

        const hero = await HeroRepository.findById(id);

        if(!hero){

            throw new ApiError(
                404,
                "Hero Banner not found."
            );

        }

        /**
         * Later
         *
         * Delete Cloudinary Images
         */

        await HeroRepository.delete(id);

    }

    async publish(id:string){

        return HeroRepository.update(
            id,
            {
                status:HeroStatus.PUBLISHED,
                publishedAt:new Date()
            }
        );

    }

    async archive(id:string){

        return HeroRepository.update(
            id,
            {
                status:HeroStatus.ARCHIVED
            }
        );

    }

}
export default new HeroService();