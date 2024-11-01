import { UUID } from "crypto";


export type User = {
    id: UUID,
    name: string,
    email: string,
    password?: string,
    url_icon?: string,
    url_banner?: string,
    description?: string,
}

export type User_configs = {
    id: UUID;
    user_id: UUID;
    config_name: string;
    config_value: string;
    updated_at?: Date;
}  

//posts
export type Liked = {
    id: UUID;
    user_id: UUID;
    post_id: UUID;
    created_at: Date; 
}

export type Liked_comments = {
    id: UUID;
    user_id: UUID;
    comment_id: UUID;
    created_at: Date; 
}

export type saved = {
    id: UUID;
    user_id: UUID;
    post_id: UUID;
    created_at: Date; 
}  

export type News = {
    id: UUID;
    user_id: UUID; 
    title: string;
    tag: string;
    content: string;
    clicks: number;
    pagecontent: string;
    url: string;
    description: string;
    created_at: Date; 
    //
    user_name: string;
}

export type Followers = {
    id: UUID;
    user_id: UUID; 
    follower_id: UUID;
    follower_count?: number;
    user_name?: string;
    user_icon?: string;
    user_description?: string;
}

export type Following = {
    id: UUID;
    user_id: UUID; 
    following_id: UUID;
    following_count?: number;
    user_name?: string;
    user_icon?: string;
    user_description?: string;
}

export type Following_commmunity = {
    id: UUID;
    user_id: UUID; 
    community_id: UUID;
    community_name?: string;
    community_icon?: string;
}

export type Posts = {
    id: UUID;
    user_id: UUID; 
    community_id: UUID;
    content: string;
    content_post: string;
    created_at: Date;
    tags?: string[];
    url_image?: string;
    //Possible Joins
    community_name: string;
    user_name: string;
    likes?: number;
    comments?: number;
    community_icon?: string;
}

export type Comments = {
    id: UUID;
    post_id: UUID;
    user_id: UUID; 
    parent_comment_id: UUID | null;
    content: string;
    created_at: Date;
    user_name?: string;
    user_icon?: string;
    likes?: number;
}

export type CommentsWithReplies = Comments & {
    replies: CommentsWithReplies[];
}

export type Communities = {
    id: UUID;   
    name: string;
    rules: string[];
    description?: string;
    created_at: Date;
    creator_id: UUID;
    tags: string[];
    links?: string[];
    url_icon?: string;
    url_banner?: string;
    //
    followings?: number;
    followings_created_at?: Date;
}
