import { UUID } from "crypto";

export type News = {
    id: UUID;
    user_id: UUID; 
    title: string;
    tag: string;
    content: string;
    created_at: Date; 
}