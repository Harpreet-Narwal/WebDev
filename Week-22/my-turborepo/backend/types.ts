
import { z } from "zod";

export const CreateAvatarSchema = z.object({
    name: z.string(),
    image: z.string()
})

declare global{
    namespace Express{
        interface Request{
            userId?: string
        }
    }
}