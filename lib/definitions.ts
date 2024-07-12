import { UUID } from "crypto";

export type News = {
    id: UUID;
    user_id: UUID; 
    title: string;
    tag: string;
    content: string;
    pagecontent: string;
    url: string;
    description: string;
    created_at: Date; 
}