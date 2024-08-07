import { UUID } from "crypto";


export type User = {
    name: string,
    description?: string,
}

export type User_configs = {
    id: UUID;
    user_id: UUID;
    config_name: string;
    config_value: string;
    updated_at?: Date;
}  

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

export type Posts = {
    id: UUID;
    user_id: UUID; 
    community_id: UUID;
    content: string;
    content_post: string;
    created_at: Date;
}

export type Comments = {
    id: UUID;
    post_id: UUID;
    user_id: UUID; 
    parent_comment_id: UUID;
    content: string;
    created_at: Date;
}

export type Communities = {
    id: UUID;   
    name: string;
    rules: string[];
    description?: string;
    created_at: Date;
    creator_id: UUID;
    tags: string[];
    links: string[];
    url_icon: string;
    url_banner: string;
}

export type CommentsWithReplies = Comments & {
    replies: CommentsWithReplies[];
}