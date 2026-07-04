import { z } from "zod";

export const reorderGallerySchema = z.object({

    images: z.array(

        z.object({

            id: z.string(),

            displayOrder: z.number()

        })

    )

});