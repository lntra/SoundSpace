const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'João',
    email: 'user1@nextmail.com',
    password: 'joao123',
  },
  {
    id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    name: 'User 2',
    email: 'user2@nextmail.com',
    password: 'vivavida',
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    name: 'User 3',
    email: 'user3@nextmail.com',
    password: 'senha123',
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    name: 'ADMIN',
    email: 'ADMIN@nextmail.com',
    password: 'ADMIN',
  }
];

const followings = [
  {
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    following_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    following_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    following_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
  },
]

const followers = [
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a', 
    follower_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    follower_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
  },
  {
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    follower_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
  },
]

const communities = [
  { id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', name: 'Community 1', description: 'Description for community 1' },
  { id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', name: 'Community 2', description: 'Description for community 2' },
];

const posts = [
  { id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    content: 'Post content 1' },

  { id: 'b33d8d23-25fe-4446-98f3-3418551495c1', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    content: 'Post content 2' },
];

const comments = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    content: 'This is a top-level comment',
    parent_comment_id: null,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the top-level comment',
    parent_comment_id: '11111111-1111-1111-1111-111111111111',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    content: 'This is another top-level comment',
    parent_comment_id: null,
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the second top-level comment',
    parent_comment_id: '33333333-3333-3333-3333-333333333333',
  },
];

const news = [
  { 
    id: '8f57c1d4-a1f1-48d3-b3db-054b1c34a73e',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 1', 
    tag: 'Short Stories', 
    content: 'News content 1 about the latest in technology.' 
  },
  { 
    id: '8c1e8c62-38d2-4c33-b69e-03e742e5c6c3',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 2', 
    tag: 'News', 
    content: 'News content 2 about recent scientific discoveries.' 
  },
  { 
    id: 'f4d5a7c8-8127-4a6f-8a4a-5d9a7c8e9b4c',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 3', 
    tag: 'Report', 
    content: 'News content 3 discussing health and wellness tips.' 
  },
  { 
    id: 'c2b5a1d8-47d3-4f2b-9f3e-2a5b7c9d1e4f',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 4', 
    tag: 'Article', 
    content: 'News content 4 about the latest trends in education.' 
  },
  { 
    id: 'd3e2c1b7-58a3-4b6d-9c1e-7a3d4e5f6b2c',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 5', 
    tag: 'Article', 
    content: 'News content 5 covering recent entertainment news.' 
  },
  { 
    id: 'd3e2c1b7-58a3-4b6d-9c1e-7a3d4e5f6b2d',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'News Title 6', 
    tag: 'News', 
    content: 'News content 6 covering recent entertainment news.' 
  }
];

const liked = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
];

const likedComments = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    comment_id: '11111111-1111-1111-1111-111111111111' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    comment_id: '44444444-4444-4444-4444-444444444444' },
];

const savedMedia = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    post_id: 'b33d8d23-25fe-4446-98f3-3418551495c1' },
]

module.exports = {
    users,
    followings,
    followers,
    communities,
    posts,
    comments,
    news,
    liked,
    likedComments,
    savedMedia
}