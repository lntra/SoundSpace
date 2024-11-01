const users = [
  {
    id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2',
    name: 'Fernando',
    email: 'fernando@nextmail.com',
    password: 'zfmJc<X-552E',
    url_icon: 'https://i.imgur.com/Ov5YtXh.jpeg',
    url_banner: 'https://i.imgur.com/fMxepcW.jpeg',
    description: 'a'
  },
  {
    id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2',
    name: 'Alice',
    email: 'alice@nextmail.com',
    password: 'garotadaminhavida1511',
    url_icon: 'https://i.imgur.com/inFaAjb.jpeg',
    url_banner: 'https://i.imgur.com/txiayxC.jpeg',
    description: '• 🥇x1 🥈x3'
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John',
    email: 'john123@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/659/2731/1536.jpg?hmac=jwFueQ8WaCS2sR6LVKFGQ3-emm0_HqHEOhQDt8AzHyQ',
    url_banner: 'https://fastly.picsum.photos/id/565/3000/2000.jpg?hmac=Fnxr-MIA5jGXl3nZYRwfqckc0UepeqawFuaoA_U9u1k',
    description: 'Music enthusiast with an ear for everything from classic rock to modern EDM.'
  },
  {
    id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    name: 'David',
    email: 'david@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/669/4869/3456.jpg?hmac=g-4rQWsPdHoLi5g6ahHlvjKubSQzR-D9m7-WtblbmyM',
    url_banner: 'https://fastly.picsum.photos/id/569/2509/1673.jpg?hmac=ZXpC4eOmQpHuu7kQaX5wkzrU2ydqr4UIWrMs72hO0H0',
    description: 'Passionate about exploring new genres and discovering up-and-coming artists. '
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    name: 'Marie',
    email: 'marie@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/646/2509/1673.jpg?hmac=HXykqhktw0TF08mbS0F3J4bxJJvJRQXG74xA4zPYW7Y',
    url_banner: 'https://fastly.picsum.photos/id/635/2509/1673.jpg?hmac=O3P1jEnFp0FqGswH9gRKIuKI-inphuJBkZZ1-enTKEw',
    description: 'Casual music fan with a deep appreciation for jazz, indie, and anything with soulful lyrics.'
  },
  {
    id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e',
    name: 'Mark',
    email: 'mark@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/mark_icon/100/100',
    url_banner: 'https://picsum.photos/seed/mark_banner/800/300',
    description: 'Rock enthusiast and aspiring music critic.'
  },
  {
    id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc',
    name: 'Sophia',
    email: 'sophia@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/sophia_icon/100/100',
    url_banner: 'https://picsum.photos/seed/sophia_banner/800/300',
    description: 'Lover of instrumental music and classical vibes.'
  },
  {
    id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1',
    name: 'Lucas',
    email: 'lucas@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/lucas_icon/100/100',
    url_banner: 'https://picsum.photos/seed/lucas_banner/800/300',
    description: 'Hip-hop head with an eye on underground scenes.'
  },
  {
    id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3',
    name: 'Emma',
    email: 'emma@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/emma_icon/100/100',
    url_banner: 'https://picsum.photos/seed/emma_banner/800/300',
    description: 'Soundtrack lover and a fan of orchestral music.'
  },
  {
    id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f',
    name: 'Chris',
    email: 'chris@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/chris_icon/100/100',
    url_banner: 'https://picsum.photos/seed/chris_banner/800/300',
    description: 'Techno fanatic with a passion for deep house.'
  },
  {
    id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b',
    name: 'Lily',
    email: 'lily@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/lily_icon/100/100',
    url_banner: 'https://picsum.photos/seed/lily_banner/800/300',
    description: 'Indie music lover and vinyl collector.'
  },
  {
    id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    name: 'Ethan',
    email: 'ethan@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/ethan_icon/100/100',
    url_banner: 'https://picsum.photos/seed/ethan_banner/800/300',
    description: 'Dedicated to electronic and dance music.'
  },
  {
    id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8',
    name: 'Nina',
    email: 'nina@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/nina_icon/100/100',
    url_banner: 'https://picsum.photos/seed/nina_banner/800/300',
    description: 'Jazz enthusiast and saxophone player.'
  },
  {
    id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b',
    name: 'Oliver',
    email: 'oliver@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/oliver_icon/100/100',
    url_banner: 'https://picsum.photos/seed/oliver_banner/800/300',
    description: 'Bass music enthusiast and festival goer.'
  },
  {
    id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f',
    name: 'Ava',
    email: 'ava@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/ava_icon/100/100',
    url_banner: 'https://picsum.photos/seed/ava_banner/800/300',
    description: 'World music explorer and cultural fusion fan.'
  },
  {
    id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1',
    name: 'Mason',
    email: 'mason@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/mason_icon/100/100',
    url_banner: 'https://picsum.photos/seed/mason_banner/800/300',
    description: 'Punk rock lover and vintage music collector.'
  },
  {
    id: '3f2a8f94-fdb5-4b6c-90e1-23a7d3f2e6b7',
    name: 'Mia',
    email: 'mia@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/mia_icon/100/100',
    url_banner: 'https://picsum.photos/seed/mia_banner/800/300',
    description: 'Classical music lover and orchestral composer.'
  },
  {
    id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d',
    name: 'Ryan',
    email: 'ryan@nextmail.com',
    password: 'pass123',
    url_icon: 'https://picsum.photos/seed/ryan_icon/100/100',
    url_banner: 'https://picsum.photos/seed/ryan_banner/800/300',
    description: 'Hip-hop fan and aspiring lyricist.'
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    name: 'ADMIN',
    email: 'admin@nextmail.com',
    password: 'ADMINDPOAWKDOPAWJDPOAWJMDFIOAWJKDOPAWKFOAWMFPANFOPA',
  }
];

const configs = [
  {
    config_name: 'theme',
    config_value: 'light',
  },
  {
    config_name: 'notifications',
    config_value: 'enabled'
  },
  {
    config_name: 'blocked',
    config_value: ''
  }
]

const followings = [
  { user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2', following_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2' },
  { user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2', following_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2' },
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', following_id: '410544b2-4001-4271-9855-fec4b6a6442a' },
  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', following_id: '410544b2-4001-4271-9855-fec4b6a6442a' },
  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', following_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b' },
  { user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e', following_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b' },
  { user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc', following_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b' },
  { user_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1', following_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e' },
  { user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3', following_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc' },
  { user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f', following_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1' },
  { user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b', following_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3' },
  { user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41', following_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f' },
  { user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8', following_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b' },
  { user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b', following_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41' },
  { user_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f', following_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8' },
  { user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1', following_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b' },
  { user_id: '3f2a8f94-fdb5-4b6c-90e1-23a7d3f2e6b7', following_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f' },
  { user_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d', following_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1' },
];


const followers = [
  { user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2', follower_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2' },
  { user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2', follower_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2' },
  { user_id: '410544b2-4001-4271-9855-fec4b6a6442a', follower_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b' },
  { user_id: '410544b2-4001-4271-9855-fec4b6a6442a', follower_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b' },
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', follower_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b' },
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', follower_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e' },
  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', follower_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc' },
  { user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e', follower_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1' },
  { user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc', follower_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3' },
  { user_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1', follower_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f' },
  { user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3', follower_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b' },
  { user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f', follower_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41' },
  { user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b', follower_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8' },
  { user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41', follower_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b' },
  { user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8', follower_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f' },
  { user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b', follower_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1' },
  { user_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f', follower_id: '3f2a8f94-fdb5-4b6c-90e1-23a7d3f2e6b7' },
  { user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1', follower_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d' },
];


const communities = [
  { 
    id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    name: 'The Band, from Outer Space', 
    description: 'Welcome to the "The Band from Outer Space" community! Here, we explore the cosmic musical frontiers together. Connect, share your space passion, and embark on this intergalactic sound journey with us! 🚀🎶', 
    rules: [
      'Mutual Respect: Be courteous and respectful to all members.',
      'Keep Discussions on Theme: Ensure all posts and discussions are related to cosmic music, space exploration, or related topics. Off-topic posts should be kept to a minimum.',
      'Share Your Space Passion Constructively: When sharing music or content, provide context and engage thoughtfully with others. Avoid spamming or repetitive posts.',
      'No Unauthorized Promotions: Do not promote products, services, or external links without permission. Self-promotion should be relevant and approved by community moderators.'
    ],
    tags: [
      'Rock',
      'Guitar',
      'Experimental',
      'Dreamy'
    ],
    links: [
      'Discord: insertherealinktothedesiredpage',
      'Website: insertherealinktothedesiredpage',
      'Merch: insertherealinktothedesiredpage',
      'Instagram: insertherealinktothedesiredpage'
    ],
    url_icon: 'https://fastly.picsum.photos/id/446/3072/1728.jpg?hmac=62VykY0FNeXxvrUhPIGiucHvYI1qd_VzMTmk98U-D5Y',
    url_banner: 'https://fastly.picsum.photos/id/377/4884/3256.jpg?hmac=OLVw864UkoqYrrRmC1Xh5-5DtczeP7iEZKMlv1YLwac',
    creator_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e'
  },
  { 
    id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    name: 'SunDown', 
    description: 'It\'s our time to go out while we watch the sun down',
    rules: [
      'Mutual Respect: Be courteous and respectful to all members.',
      'Keep Discussions on Theme: Ensure all posts and discussions are related to cosmic music, space exploration, or related topics. Off-topic posts should be kept to a minimum.',
    ],
    tags: [
      'Rap',
      'Synthesizer',
      'Experimental',
      'Sad'
    ],
    links: [
      'Merch: insertherealinktothedesiredpage',
    ],
    url_icon: 'https://fastly.picsum.photos/id/548/5000/3333.jpg?hmac=BdycqoDMwkZoSovCL9E2F8MAyqdhkHVj8yYkHvkkkVM',
    url_banner: 'https://fastly.picsum.photos/id/459/2310/1534.jpg?hmac=3GuIBHCecDx0ymJJzLe_lGSQDAlbf-PiXYnCc7iM2MI',
    creator_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e'
  },
  { 
    id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890', 
    name: 'Indie Harmony', 
    description: 'Welcome to "Indie Harmony," a community for fans of indie music. Discover new artists, share your favorite tracks, and connect with fellow indie enthusiasts! 🎸🎤', 
    rules: [
      'Respect Everyone: Treat all members with kindness and respect.',
      'Stay On Topic: Keep discussions focused on indie music and related topics.',
      'No Spam: Avoid repetitive posts or unsolicited promotions.',
      'Engage Thoughtfully: Share music and content with meaningful context and engage in constructive discussions.'
    ],
    tags: [
      'Indie',
      'Acoustic',
      'Alternative',
      'Folk'
    ],
    links: [
      'Facebook: insertherealinktothedesiredpage',
      'Twitter: insertherealinktothedesiredpage',
      'Bandcamp: insertherealinktothedesiredpage'
    ],
    url_icon: 'https://fastly.picsum.photos/id/672/5000/3333.jpg?hmac=u6anJjrup8TAGrJxZSY3u-9OmftJ1Dn4P_6vPqF7a7U',
    url_banner: 'https://fastly.picsum.photos/id/686/4462/2975.jpg?hmac=0zEvyDYF4spIPxLjZ8icrcelNZLNmiGEEIeJGCACufo',
    creator_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e'
  },
  { 
    id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890', 
    name: 'Pop Vibes', 
    description: 'Join "Pop Vibes" to celebrate the best of pop music. From chart-toppers to hidden gems, share your favorite pop tunes and discuss the latest trends with fellow fans! 🎶🌟', 
    rules: [
      'Be Kind: Show respect and kindness to all members.',
      'Relevant Content: Ensure all posts and discussions are related to pop music and its subgenres.',
      'No Advertising: Avoid promoting products or services without permission.',
      'Constructive Feedback: When sharing music or opinions, do so constructively and respectfully.'
    ],
    tags: [
      'Pop',
      'Dance',
      'Electropop',
      'Top 40'
    ],
    links: [
      'Instagram: insertherealinktothedesiredpage',
      'Spotify: insertherealinktothedesiredpage',
      'YouTube: insertherealinktothedesiredpage'
    ],
    url_icon: 'https://fastly.picsum.photos/id/815/2074/1383.jpg?hmac=z5kVymrNUTKCDBhKG3oays-sesL-_APZSoaWQJInU4s',
    url_banner: 'https://fastly.picsum.photos/id/820/4592/3448.jpg?hmac=_rSeK9tbzkwqjB3OVLyNewUr5r8uSFInGjOEfMQ6cBw',
    creator_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e'
  },
  { 
    id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890', 
    name: 'Jazz Lounge', 
    description: 'Welcome to "Jazz Lounge," a community for jazz lovers. Share your favorite tracks, discover new artists, and enjoy the smooth sounds of jazz with fellow enthusiasts. 🎷🎵', 
    rules: [
      'Respect and Courtesy: Be polite and respectful in all interactions.',
      'Stay Jazz-Focused: Keep discussions centered on jazz music and its various styles.',
      'No Self-Promotion: Do not promote your own content or services without prior approval.',
      'Quality Contributions: Share music and opinions thoughtfully and engage in meaningful discussions.'
    ],
    tags: [
      'Jazz',
      'Smooth Jazz',
      'Blues',
      'Swing'
    ],
    links: [
      'Twitter: insertherealinktothedesiredpage',
      'SoundCloud: insertherealinktothedesiredpage',
      'Patreon: insertherealinktothedesiredpage'
    ],
    url_icon: 'https://fastly.picsum.photos/id/755/5000/3800.jpg?hmac=kHxjzz3TQ4ZQLtUF3fNgIiBMwHc04Kf9xg9jfYsabxM',
    url_banner: 'https://fastly.picsum.photos/id/742/3333/5000.jpg?hmac=1h4142hspZLLliCUiOdb_KSEynj9f4mxi2fFk1spyG4',
    creator_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e'
  },
  {
    id: "7c49e48d-4b23-4d57-bf47-93f43e7f4f7a",
    name: "Synthwave Society",
    description: "Dive into the retro-futuristic sounds of synthwave! Share your favorite tracks and artists from this electrifying genre. 🌌🎹",
    rules: [
      "Celebrate All Synthwave: Embrace the variety within the genre.",
      "Stay Relevant: Focus discussions on synthwave and related genres.",
      "Engage and Share: Include your thoughts when sharing tracks.",
      "No Spam: Limit promotions unless they are authorized."
    ],
    tags: [
      "Synthwave",
      "Retro",
      "Electronic",
      "80s"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/synthicon/640/360",
    url_banner: "https://picsum.photos/seed/synth/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "7e3e64a7-09ae-4f3c-bb19-6f9d9751ac0b",
    name: "Metalheads United",
    description: "For all metal fans! Share your favorite bands, tracks, and live experiences. Let’s thrash together! 🤘🎸",
    rules: [
      "Respect All Sub-genres: Metal is diverse; embrace all styles.",
      "Stay On Topic: Focus discussions on metal music and culture.",
      "Share Your Passion: Engage with others by sharing thoughts on tracks.",
      "No Unauthorized Ads: Keep promotions relevant and approved."
    ],
    tags: [
      "Metal",
      "Thrash",
      "Heavy",
      "Progressive"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/metalicon/640/360",
    url_banner: "https://picsum.photos/seed/metal/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "2f33b788-09e7-45eb-bebd-3de3c6f2b547",
    name: "Chill Hop Collective",
    description: "Relax and unwind with chill hop beats! Share your favorite tracks and discover new artists in the genre. ☕🎶",
    rules: [
      "Respect the Vibe: Keep discussions chill and positive.",
      "Stay On Topic: Focus on chill hop and related genres.",
      "Engage with Others: Provide context when sharing music.",
      "No Spam: Limit irrelevant promotions and ads."
    ],
    tags: [
      "Chill",
      "Hip-Hop",
      "Lo-fi",
      "Beats"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/chillicon/640/360",
    url_banner: "https://picsum.photos/seed/chill/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "5c8941d6-bd08-4ae4-9d55-c1f9f644e90f",
    name: "Punk Rock Revolution",
    description: "A community for punk rock enthusiasts! Share your favorite bands and discuss the punk scene. 🎸🖤",
    rules: [
      "Respect the Scene: Honor all punk styles and artists.",
      "Stay Focused: Keep discussions relevant to punk rock music.",
      "Share and Engage: Include your thoughts when posting music.",
      "No Spam: Avoid unnecessary promotions and advertisements."
    ],
    tags: [
      "Punk",
      "DIY",
      "Alternative",
      "Rebellion"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/punkicon/640/360",
    url_banner: "https://picsum.photos/seed/punk/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "dfcfa89b-d075-4e3c-9016-7f5b270fc97c",
    name: "Folk Music Haven",
    description: "Celebrate the beauty of folk music! Share your favorite artists, songs, and stories from the folk tradition. 🌾🎻",
    rules: [
      "Honor the Tradition: Respect all folk music styles and their histories.",
      "Stay On Topic: Keep discussions focused on folk music.",
      "Engage Thoughtfully: Provide context when sharing songs.",
      "No Spam: Limit irrelevant promotions and ads."
    ],
    tags: [
      "Folk",
      "Acoustic",
      "Storytelling",
      "Tradition"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/folkicon/640/360",
    url_banner: "https://picsum.photos/seed/folk/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "e03f2c6d-1e54-48e7-b1a5-9b543f3d43e8",
    name: "Cosmic Jazz Explorers",
    description: "Join us in exploring the limitless boundaries of jazz intertwined with cosmic sounds. Let’s create stellar harmonies and share our favorite tracks! 🌌🎷",
    rules: [
      "Respect All Genres: Jazz comes in many forms; embrace all styles and artists.",
      "Stay On Topic: Discussions should revolve around jazz and cosmic music themes.",
      "Be Constructive: Provide thoughtful insights and engage with fellow members.",
      "No Spam: Refrain from spamming or irrelevant promotions."
    ],
    tags: [
      "Jazz",
      "Space",
      "Experimental",
      "Fusion"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/cosmicicon/640/360",
    url_banner: "https://picsum.photos/seed/cosmic/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "b54b30b4-df3d-4b2d-baa0-7e4b15e31d56",
    name: "Indie Soundscapes",
    description: "Discover and share the finest indie tracks and artists with like-minded fans. Let's vibe together! 🌍🎶",
    rules: [
      "Encourage Creativity: Share your own music and support independent artists.",
      "Relevant Posts: Ensure all content is related to indie music and its various styles.",
      "Provide Context: When sharing a song or artist, include your thoughts.",
      "No Unapproved Promotions: Keep promotions relevant and approved."
    ],
    tags: [
      "Indie",
      "Acoustic",
      "Alternative",
      "Vibes"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/indieicons/640/360",
    url_banner: "https://picsum.photos/seed/indiess/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "6c8954af-290f-4b1d-8207-7b0c2f7e68b7",
    name: "Rock 'n' Roll Odyssey",
    description: "For rock lovers to connect, share, and relive the greatest moments in rock history. Let’s keep the spirit alive! 🎸🌠",
    rules: [
      "Respect Differences: Honor all rock sub-genres and the diversity they bring.",
      "Stay Focused: Posts should relate to rock music and its evolution.",
      "Engage Thoughtfully: Share your insights and listen to others.",
      "No Uninvited Ads: Limit promotions unless authorized."
    ],
    tags: [
      "Rock",
      "Classic",
      "Live",
      "Legends"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/rockicon/640/360",
    url_banner: "https://picsum.photos/seed/rock/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "12bfa9f5-2db1-4732-95e7-728fb65c69d7",
    name: "Electronic Vibes Collective",
    description: "Unite with fans of electronic music! Share your favorite tracks, artists, and the latest trends in the scene. ⚡🎧",
    rules: [
      "Embrace All Genres: Electronic music is diverse; share all styles.",
      "Stay Relevant: Keep discussions focused on electronic music.",
      "Engage and Share: Provide context when sharing music.",
      "No Unauthorized Promotions: Keep ads and promotions relevant and approved."
    ],
    tags: [
      "Electronic",
      "Dance",
      "House",
      "Ambient"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/electricicon/640/360",
    url_banner: "https://picsum.photos/seed/electric/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "1f8f03c3-4776-4c79-8663-5420e7d9e7e5",
    name: "Hip Hop Universe",
    description: "Explore the rich world of hip hop! Share your favorite tracks, discuss artists, and learn about the culture. 🎤🌍",
    rules: [
      "Respect All Artists: Embrace the diversity of hip hop artists.",
      "Stay Focused: Keep discussions centered on hip hop music and culture.",
      "Provide Insight: When sharing, include your personal thoughts.",
      "No Spam: Limit unnecessary promotions and ads."
    ],
    tags: [
      "Hip-Hop",
      "Rap",
      "Culture",
      "Lyrics"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/hiphopicon/640/360",
    url_banner: "https://picsum.photos/seed/hiphop/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  },
  {
    id: "4dbb11f0-f4a0-4861-b9d1-6d23cfed7ebf",
    name: "Global Rhythms Collective",
    description: "Celebrate music from around the globe! Share your favorite international tracks and discover new genres together. 🌏🎶",
    rules: [
      "Respect Cultural Differences: Honor the diversity of global music.",
      "Keep It On Topic: Focus on international music discussions.",
      "Engage Thoughtfully: When sharing music, provide context.",
      "No Spam: Avoid irrelevant promotions and ads."
    ],
    tags: [
      "World",
      "Folk",
      "Cultural",
      "Fusion"
    ],
    links: [
      "Discord: insertherealinktothedesiredpage",
      "Website: insertherealinktothedesiredpage",
      "Merch: insertherealinktothedesiredpage",
      "Instagram: insertherealinktothedesiredpage"
    ],
    url_icon: "https://picsum.photos/seed/globalicon/640/360",
    url_banner: "https://picsum.photos/seed/global/1280/720",
    creator_id: "71d03b1a-d4fb-4b10-9fa9-2763271ff04e"
  }
];

const following_commmunity = [
  {
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
  },
  {
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890', 
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
  },
  {
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890', 
  },
  {
    user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
  },
  {
    user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
  },
  {
    user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
  },
  {
    user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  },
  {
    user_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
  },
  {
    user_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
  },
  {
    user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
  },
  {
    user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  },
  {
    user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
  },
  {
    user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
  },
  {
    user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
  },
  {
    user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  },
  {
    user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
  },
  {
    user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
  },
  {
    user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
  },
  {
    user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
  },
  {
    user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
  },
  {
    user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
  },
  {
    user_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
  },
  {
    user_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  },
  {
    user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
  },
  {
    user_id: '3f2a8f94-fdb5-4b6c-90e1-23a7d3f2e6b7',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
  },
  {
    user_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
  }
];

const posts = [
  {
    id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228312',
    user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Não existe nada nesse mundo que eu ame mais que minha namorada',
    content_post: 'Vocês também já tiveram esse sentimento de nunca querer sair de perto de uma pessoa? Sentir que a proximidade é o calor necessário do seu coração para uma rotina fria? Pois eu já, Alice, minha namorada, é tudo que eu sempre quis, e eu vou amar e cuidar da sua pessoa e a nossa relação para todos sempre',
    tags: ['Love'],
    url_image: 'https://i.imgur.com/JVdSnoC.jpeg'
  },
  {
    id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
    content: 'Favorite Rock Bands?',
    content_post: 'What are some of your all-time favorite rock bands? I can’t get enough of Led Zeppelin and Queen!',
    tags: ['Rock', 'Upbeat', 'Artist Spotlight'],
    url_image: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ'
  },
  {
    id: 'b33d8d23-25fe-4446-98f3-3418551495c1',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Classical Music for Studying',
    content_post: 'Does anyone have recommendations for classical music that helps you focus while studying? I’m looking for something calming.',
    tags: ['Classical', 'Relaxing', 'Recommendations'],
    url_image: 'https://fastly.picsum.photos/id/192/2352/2352.jpg?hmac=jN5UExysObV7_BrOYLdxoDKzm_c_lRM6QkaInKT_1Go'
  },
  {
    id: 'c12d23a7-e2c5-4e6a-8b8c-6d5f456c8b9e',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
    content: 'Best Hip Hop Albums of All Time',
    content_post: 'What do you guys think are the best hip hop albums of all time? My top pick is Nas’s "Illmatic".',
    tags: ['Hip-Hop', 'Energetic', 'Album Review'],
    url_image: 'https://fastly.picsum.photos/id/43/1280/831.jpg?hmac=glK-rQ0ppFClW-lvjk9FqEWKog07XkOxJf6Xg_cU9LI'
  },
  {
    id: 'e27b8f5a-1d3a-4b97-8c3b-7c4f8b2d5a9e',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Jazz Improvisation Tips',
    content_post: 'Any tips for improving my jazz improvisation skills? I’m struggling to make my solos sound natural.',
    tags: ['Jazz'],
  },
  {
    id: 'e4c6f8d1-9452-4bb1-9a57-9b746d512f5b',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Best Indie Albums of the Year',
    content_post: 'What are your top indie albums of the year so far? I’m loving Phoebe Bridgers’ latest release!',
    tags: ['Indie', 'Recommendations'],
  },
  {
    id: 'f5a26b76-1edb-4c2e-bf93-f7a5f1a7d43a',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Top Pop Songs for a Party',
    content_post: 'What are some must-have pop songs for a party playlist? I need some new tracks to get everyone dancing!',
    tags: ['Pop', 'Upbeat'],
    url_image: 'https://picsum.photos/seed/popsong/1280/720'
  },
  {
    id: '2b9cfe34-78a6-44d3-92b2-1c9a6e4a1234',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
    content: 'Jazz Fusion Essentials',
    content_post: 'What are some essential jazz fusion albums or artists that every fan should know about? Looking to dive deeper into the genre.',
    tags: ['Jazz', 'Nostalgic'],
  },
  {
    id: 'c3e9d51b-7b47-4f21-a8fc-5d7e5f1b2345',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Favorite Acoustic Tracks',
    content_post: 'What are your go-to acoustic tracks for a relaxing evening? I’m always looking for new recommendations!',
    tags: ['Acoustic', 'Relaxing'],
    url_image: 'https://fastly.picsum.photos/id/139/3465/3008.jpg?hmac=52Trc4YpfCnGBPi5fsPPwSkRarjMuUV4O_uLBufPgII'
  },
  {
    id: 'a3b8e5de-e7f9-4a7a-9b20-674f1c3a1dc0',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Top Indie Artists?',
    content_post: 'Who are your top indie artists right now? I love Phoebe Bridgers and Mitski!',
    tags: ['Indie', 'Chill', 'New Discoveries'],
    url_image: 'https://picsum.photos/seed/indiesongs/1280/720'
  },
  {
    id: 'c7fd5c62-7d8f-4d4b-9f6d-f8236c434d9a',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Favorite Lyrics?',
    content_post: 'What’s a lyric that’s always stuck with you? For me, it’s “We’re just two lost souls swimming in a fishbowl."',
    tags: ['Lyrics', 'Discussion', 'Emotional'],
    url_image: 'https://picsum.photos/seed/lyricsfav/1280/720'
  },
  {
    id: 'd8ae7d28-f70a-4d8b-a1c4-343dfcf1bcd1',
    user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: '90s Hits!',
    content_post: 'What 90s hits still get you dancing? I can never skip a Spice Girls song!',
    tags: ['90s', 'Pop', 'Throwback'],
    url_image: 'https://picsum.photos/seed/nineties/1280/720'
  },
  {
    id: '23b2e6af-7cbb-4b0b-949f-2dbf9a4bbd3d',
    user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
    content: 'Chill Vibes Playlist?',
    content_post: 'I need recommendations for a chill playlist! Looking for relaxing tunes.',
    tags: ['Chill', 'Relax', 'Playlists'],
    url_image: 'https://picsum.photos/seed/chillphonk/1280/720'
  },
  {
    id: 'a34c8e72-19f1-4f88-b93a-5b964c0c23f4',
    user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
    content: 'Your Workout Jams?',
    content_post: 'What songs get you pumped up for a workout? Share your best workout songs!',
    tags: ['Workout', 'Upbeat', 'Motivation'],
    url_image: 'https://picsum.photos/seed/gymmotivation/1280/720'
  },
  {
    id: 'd9bf9e2a-e5f2-4f64-a8d2-d9c73e1b32d4',
    user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Classic R&B Songs?',
    content_post: 'Which R&B songs are timeless to you? I’m a big fan of Marvin Gaye and Whitney Houston!',
    tags: ['R&B', 'Classics', 'Love Songs'],
    url_image: 'https://picsum.photos/seed/soulrb/1280/720'
  },
  {
    id: 'e8ce5b6c-9d4d-4b78-8b1e-348e4a94f3d9',
    user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Live Performances?',
    content_post: 'What’s the best live performance you’ve seen? I’d love to hear your experiences!',
    tags: ['Live', 'Concert', 'Experiences'],
    url_image: 'https://picsum.photos/seed/liveperformances/1280/720'
  },
  {
    id: 'f0a1f9bc-c3df-47b5-a3d9-cb44c8b556fc',
    user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Summer Tunes?',
    content_post: 'What’s on your summer playlist? Share your go-to summer vibes!',
    tags: ['Summer', 'Feel Good', 'Playlists'],
    url_image: 'https://picsum.photos/seed/summersongs/1280/720'
  },
  {
    id: 'f3e6dafe-e973-41fb-9c4e-82eabc2d7f23',
    user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Epic Movie Soundtracks?',
    content_post: 'Which movie soundtrack do you think is unforgettable? The Gladiator soundtrack is one of my favorites.',
    tags: ['Soundtracks', 'Movies', 'Epic'],
    url_image: 'https://picsum.photos/seed/epic/1280/720'
  },
  {
    id: 'b7f7d9f9-7633-4b3a-b6d6-e1e3d7c1f8c2',
    user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Best Instrumentals?',
    content_post: 'What’s the best instrumental track you’ve heard? I love anything by Explosions in the Sky.',
    tags: ['Instrumental', 'Calm', 'Focus'],
    url_image: 'https://picsum.photos/seed/instrumentalssongs/1280/720'
  },
  {
    id: 'c3d0ebf8-96c3-49ed-9a12-b0b0c7f66dbd',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Top Jazz Classics?',
    content_post: 'Who are your favorite jazz artists? I’ve been listening to Miles Davis non-stop lately.',
    tags: ['Jazz', 'Classics', 'Relax'],
    url_image: 'https://picsum.photos/seed/jazzfavs/1280/720'
  },
  {
    id: 'e5c3b1d4-2836-4a95-81c1-f35a3c627f3a',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a',
    content: 'Rock Album Recommendations?',
    content_post: 'Any new rock albums I should check out? I’m always looking for something fresh!',
    tags: ['Rock', 'New Releases', 'Album Recommendations'],
    url_image: 'https://picsum.photos/seed/recommendations/1280/720'
  },
  {
    id: 'a2d3e4c1-f3b5-4a2f-b6d8-c3b8c6d7f2f4',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
    content: 'Songs with Best Vocals?',
    content_post: 'Who do you think has the best vocal range? For me, it’s Freddie Mercury hands down!',
    tags: ['Vocals', 'Legendary', 'Artists'],
  },
  {
    id: 'f7e4c5d6-8537-4b2a-a3f1-e1e2d3b5a4f8',
    user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Festival Lineup 2024?',
    content_post: 'Who are you most excited to see in the 2024 festival lineup? I’m hoping to see Arctic Monkeys!',
    tags: ['Festival', 'Excitement', 'Live Music'],
  },
  {
    id: 'b5d4f6a8-725b-4539-a1d7-d2c3f7e8c6d4',
    user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b',
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1',
    content: 'Electronic Music Favorites?',
    content_post: 'Any electronic artists you’d recommend? Been vibing to a lot of Deadmau5 recently!',
    tags: ['Electronic', 'Upbeat', 'Artists'],
    url_image: 'https://picsum.photos/seed/electronicmusicfestival/1280/720'
  },
  {
    id: 'c3b8f6d5-4352-4921-b3e1-f8c5d4b2e9c7',
    user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Favorite Road Trip Songs?',
    content_post: 'What songs are a must for a road trip? Need to spice up my playlist!',
    tags: ['Road Trip', 'Adventure', 'Playlist'],
    url_image: 'https://picsum.photos/seed/carsongs/1280/720'
  },
  {
    id: 'd6e5f3c2-b4a8-4d9c-b3e1-f2a9d8b1c7f5',
    user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f',
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890',
    content: 'Most Uplifting Songs?',
    content_post: 'Share some songs that lift you up instantly! Could use some positive vibes.',
    tags: ['Uplifting', 'Feel Good', 'Motivation'],
    url_image: 'https://picsum.photos/seed/wakingup/1280/720'
  },
  {
    id: 'a8c7d9f3-2b8a-4f3d-8c7b-3f6d5c1b8f9e',
    user_id: '79b05c59-d6f2-4d4d-91f1-4d8b67d2238e',
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890',
    content: '90s Hip-Hop Anthems?',
    content_post: 'Which 90s hip-hop tracks are classics to you? Tupac and Biggie are timeless!',
    tags: ['90s', 'Hip-Hop', 'Classics'],
    url_image: 'https://picsum.photos/seed/ninetieshiphop/1280/720'
  },
  {
    id: 'b3f6d4a9-8b5d-4e8f-b9c7-3a5c4f8e7d2c',
    user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41',
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890',
    content: 'Chill Lo-Fi Beats?',
    content_post: 'Any lo-fi beats playlists you’d recommend? Perfect for late-night study sessions.',
    tags: ['Lo-Fi', 'Chill', 'Study'],
    url_image: 'https://picsum.photos/seed/lofibeatstosleep/1280/720'
  }
];



const comments = [
  {
    id: '22111111-1111-1111-1111-111111111111',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228312',
    user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056af2',
    content: 'Te amo lindão',
    parent_comment_id: null,
  },
  {
    id: '11111111-1111-1111-1111-111111111111',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    content: 'TBFOS, They\'re so good',
    parent_comment_id: null,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'What do you mean',
    parent_comment_id: '11111111-1111-1111-1111-111111111111',
  },
  {
    id: '22222222-2222-2222-2222-222222222220',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'WHY?',
    parent_comment_id: '22222222-2222-2222-2222-222222222222',
  },
  {
    id: '22222222-2222-2222-2222-222222222200',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'WHY?',
    parent_comment_id: '22222222-2222-2222-2222-222222222220',
  },
  {
    id: '22222222-2222-2222-2222-222222222210',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'WHY?',
    parent_comment_id: '22222222-2222-2222-2222-222222222200',
  },
  {
    id: '22222222-2222-2222-2222-222222222000',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'WHY?',
    parent_comment_id: '22222222-2222-2222-2222-222222222210',
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'S2',
    parent_comment_id: '11111111-1111-1111-1111-111111111111',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    content: 'I really like Radiohead',
    parent_comment_id: null,
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'Just is "just" peak',
    parent_comment_id: '33333333-3333-3333-3333-333333333333',
  },
];

const news = [
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Radiohead Announces New Album Release Date', 
    tag: 'Article', 
    content: 'Legendary alternative rock band Radiohead has announced that their highly anticipated new album will be released this fall. The album, titled "Echoes of the Past," promises to blend their signature sound with new experimental elements.', 
    url: 'https://media.npr.org/assets/img/2021/12/09/radiohead-comp-x-holborn-studios-2000-c-tom-sheehan-1-scaled_wide-6c54113b5f52b7399d9509292aa8e5628a5b743d.jpg?s=1400&c=100&f=jpeg',
    description: 'Radiohead band Photo',
    clicks: 2040,
    pagecontent: `Legendary band Radiohead has thrilled fans with the announcement of their upcoming album release date, sparking widespread excitement among music enthusiasts. The band official statement revealed that the new album, titled "Light Up the Sky," is set to be released later this year. This announcement comes after months of speculation and anticipation, as Radiohead has been teasing new material through various cryptic posts and hints.

The new album is expected to continue Radiohead tradition of pushing musical boundaries and experimenting with innovative sounds. Known for their ability to reinvent themselves with each release, the band has hinted that "Light Up the Sky" will explore new themes and sonic landscapes. The album production involved collaborations with several prominent producers, promising a fresh and dynamic listening experience.

Fans have eagerly welcomed the news, sharing their excitement on social media and speculating about the album content. Radiohead previous releases have consistently garnered critical acclaim and commercial success, and expectations for "Light Up the Sky" are high. The band ability to evolve while maintaining their distinct identity has endeared them to generations of listeners. As the release date approaches, anticipation continues to build, with fans eagerly awaiting the next chapter in Radiohead illustrious career.
`
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Taylor Swift Breaks Streaming Records with Latest Single', 
    tag: 'News', 
    content: 'Pop sensation Taylor Swift\'s latest single, "Midnight Sun," has broken streaming records within hours of its release. The song has garnered millions of plays across platforms, making it one of the biggest hits of the year.', 
    url: 'https://www.billboard.com/wp-content/uploads/2024/06/taylor-swift-eras-tour-liverpool-tortured-poets-june-2023-billboard-1548.jpg?w=942&h=623&crop=1',
    description: 'Taylor Swift Photo',
    clicks: 1020,
    pagecontent: `
      Taylor Swift has once again solidified her status as a streaming powerhouse with her latest single. The track has broken records across major platforms, becoming the most-streamed song within 24 hours of its release. Fans have taken to social media to express their excitement, sharing clips and praising Swift's innovative approach and lyrical depth. The song's success is a testament to her ability to evolve and stay relevant in an ever-changing music industry.

Swift's new single not only showcases her exceptional songwriting skills but also features a collaboration with a renowned producer, adding a fresh dynamic to her sound. Critics have lauded the single for its catchy melody and poignant lyrics, which delve into themes of love, heartbreak, and self-discovery. The accompanying music video has also garnered millions of views, further cementing Swift's position as a visual and musical artist.

As Swift continues to break records and set new standards, her latest release underscores her influence and impact on the music industry. With numerous awards and accolades already under her belt, this achievement adds another milestone to her illustrious career. Fans eagerly anticipate what Swift will deliver next, as she continues to push boundaries and redefine pop music.
    `
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Beyoncé Headlines Global Music Festival 2024', 
    tag: 'News', 
    content: 'Beyoncé has been announced as the headliner for the 2024 Global Music Festival. The festival will feature performances from artists around the world and will take place in multiple cities simultaneously, promoting unity through music.',
    url: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/beyonce-2-1.jpg?w=1220&h=674&crop=1',
    description: 'Beyoncé Photo',
    clicks: 894,
    pagecontent: `
      Iconic singer Beyoncé is set to headline the highly anticipated Global Music Festival 2024, marking one of the most significant events in the music calendar. Known for her electrifying performances and chart-topping hits, Beyoncé's presence promises to make this year's festival a monumental event. Her participation underscores the festival's commitment to bringing top-tier talent to the global stage.

Beyoncé's performance at the Global Music Festival 2024 is expected to feature a mix of her greatest hits and new material, showcasing her versatility as an artist. Fans from around the world are eagerly awaiting her live performance, which is set to include elaborate stage designs, stunning choreography, and powerful vocal performances. The festival lineup also includes other prominent artists, but Beyoncé's headline act is undoubtedly the highlight.

The announcement of Beyoncé as the headliner has generated a wave of excitement and anticipation. Her previous performances at major events have been nothing short of spectacular, and fans are expecting nothing less at the Global Music Festival. This event not only highlights Beyoncé's enduring appeal but also solidifies her position as one of the most influential and dynamic performers in contemporary music.

    `
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Billie Eilish Releases New Documentary', 
    tag: 'Article', 
    content: 'Grammy-winning artist Billie Eilish has released a new documentary titled "Inside My World." The film provides an in-depth look at her rise to fame, her creative process, and personal struggles, giving fans a rare glimpse into her life.',
    url: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2022/10/billie.jpg?w=1075&h=674&crop=1',
    description: 'Billie Eilish photo',
    clicks: 640,
    pagecontent: `
      Grammy-winning artist Billie Eilish has unveiled a revealing new documentary that offers an intimate look into her life and career. Titled "The World's A Little Blurry," the film explores Eilish's journey to stardom, providing fans with unprecedented access to her personal experiences and creative process. Directed by R.J. Cutler, the documentary has already garnered widespread acclaim for its candid portrayal of the young star.

The documentary covers Eilish's rise from an aspiring musician recording songs in her bedroom to becoming a global phenomenon. It includes behind-the-scenes footage of her recording sessions, tours, and interactions with fans, as well as personal moments with her family. Eilish's openness and vulnerability throughout the film have resonated with viewers, offering a deeper understanding of her artistry and the challenges she has faced.

"The World's A Little Blurry" has been praised for its authenticity and emotional depth. Critics have highlighted Eilish's genuine connection with her fans and her dedication to her craft. The documentary not only celebrates her achievements but also sheds light on the pressures and complexities of fame. For Eilish's fans, the film is a powerful reminder of her resilience and passion for music.
    `
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'K-pop Group BTS Announces Hiatus', 
    tag: 'Article', 
    content: 'Global K-pop phenomenon BTS has announced a temporary hiatus as the members focus on individual projects. The group assures fans that this is not a permanent breakup and that they plan to reunite in the future for more music.',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/BTS_during_a_White_House_press_conference_May_31%2C_2022_%28cropped%29.jpg',
    description: 'K-pop photo',
    clicks: 594,
    pagecontent: `
      Global sensation BTS has announced a temporary hiatus from their whirlwind schedule, leaving fans with mixed emotions. The group, known for their relentless work ethic and constant output of music and content, cited the need for rest and rejuvenation as the primary reason for the break. In a heartfelt message to their fans, the members of BTS expressed gratitude for the unwavering support they have received and assured them of their eventual return.

This hiatus marks a rare moment of respite for the chart-topping group, who have consistently dominated the international music scene with their infectious music and captivating performances. Since their debut, BTS has achieved numerous milestones, including topping the Billboard charts, selling out stadiums worldwide, and amassing a dedicated global fanbase known as ARMY. The group's decision to take a break highlights the importance of mental and physical well-being, even for top-tier artists.

During this period, the members of BTS plan to focus on individual projects and personal growth. While the announcement may have initially surprised fans, many have expressed understanding and support for the group's decision. The hiatus is seen as an opportunity for BTS to recharge and come back stronger than ever. As fans eagerly await their return, the group's legacy and impact on the music industry remain firmly intact.

    `
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Ed Sheeran Wins Lawsuit Over Copyright Infringement', 
    tag: 'News', 
    content: 'Singer-songwriter Ed Sheeran has won a major copyright lawsuit filed against him, alleging that his hit song "Shape of You" copied another artist\'s work. The court ruled in Sheeran\'s favor', 
    url: 'https://www.nme.com/wp-content/uploads/2017/02/Ed-Sheeran-1.jpg',
    description: 'Ed Sheeran photo',
    clicks: 600,
    pagecontent: `
      Ed Sheeran has emerged victorious in a high-profile lawsuit concerning copyright infringement, marking a significant triumph for the British singer-songwriter. The case revolved around allegations that Sheeran's hit song bore similarities to another artist's work. After a lengthy legal battle, the court ruled in Sheeran's favor, finding no evidence of plagiarism. The decision not only clears Sheeran's name but also reinforces his commitment to artistic integrity.

The lawsuit had drawn considerable attention, with many in the music industry closely monitoring the proceedings. Sheeran's defense argued that the similarities cited were coincidental and that the song in question was a result of his unique creative process. The court's ruling acknowledged the complexity of musical composition and the inevitability of certain commonalities in popular music. Sheeran's legal team emphasized the importance of protecting artists' rights to their original work.

Following the verdict, Sheeran expressed relief and gratitude to his supporters. He reaffirmed his dedication to his craft and his belief in the originality of his music. The outcome of the lawsuit has broader implications for the music industry, highlighting the challenges of navigating copyright issues in an era where digital distribution and global reach can lead to increased scrutiny. Sheeran's victory is seen as a precedent-setting moment, offering reassurance to artists striving to create without fear of unwarranted legal challenges.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Adele Announces 2024 World Tour',
    tag: 'News',
    content: 'Adele has announced her much-anticipated 2024 world tour, with stops across Europe, North America, and Asia. Tickets are expected to sell out fast.',
    url: 'https://picsum.photos/seed/ADELE/700/400',
    description: 'Adele image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
    In an exciting announcement for music fans worldwide, pop superstar Adele has revealed her much-anticipated 2024 world tour. The tour will feature a series of electrifying performances across Europe, North America, and Asia, showcasing her powerful vocals and heartfelt ballads.

Adele, known for her chart-topping hits and emotional lyrics, promises to deliver an unforgettable experience for her fans. "I can't wait to hit the stage again and connect with my audience," she stated. "This tour is a celebration of love, heartbreak, and everything in between, and I want to share that journey with all of you."

The tour is set to kick off in [insert start date] in [insert starting city], with stops in major cities including [insert notable cities]. Fans can expect to hear classic hits like "Rolling in the Deep," "Someone Like You," and tracks from her latest album, [insert album name], which has received critical acclaim.

Given Adele's massive popularity, ticket sales are expected to be competitive. Fans are encouraged to sign up for pre-sale notifications on her official website to secure their chance to purchase tickets before they sell out.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Drake Breaks Streaming Records with New Album',
    tag: 'News',
    content: 'Canadian rapper Drake has shattered streaming records yet again with his latest album, amassing millions of streams in the first 24 hours.',
    url: 'https://picsum.photos/seed/DRAKES/700/400', 
    description: 'Drake image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      Canadian rapper Drake has once again proven his dominance in the music industry by breaking streaming records with his newly released album, [Album Title]. Within just 24 hours, the album garnered millions of streams across various platforms, showcasing Drake's massive fanbase and influence. The lead single, '[Single Title],' has already topped the charts, receiving widespread acclaim from critics and fans alike. With this latest achievement, Drake continues to solidify his position as one of the top artists in the world.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Beyoncé Launches New Fashion Line',
    tag: 'News',
    content: 'Beyoncé has unveiled her new fashion line, inspired by her personal style and celebrating diversity and self-expression.',
    url: 'https://picsum.photos/seed/BEYONNCE/700/400',
    description: 'Beyoncé image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      Global icon Beyoncé has officially launched her new fashion line, [Fashion Line Name], which is designed to reflect her personal style while celebrating diversity and self-expression. The collection features a range of clothing and accessories that cater to various body types and aesthetics. "Fashion is a way to express who you are," Beyoncé stated during the launch. The line aims to empower individuals to embrace their uniqueness and feel confident in their own skin. With this launch, Beyoncé continues to inspire fans both in music and fashion.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Coldplay Announces Carbon-Neutral Tour',
    tag: 'News',
    content: 'British rock band Coldplay has announced plans to make their next world tour carbon-neutral, a first in the music industry.',
    url: 'https://picsum.photos/seed/COLDPLAY/700/400',
    description: 'Coldplay image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      British rock band Coldplay has made headlines with their groundbreaking announcement to host a carbon-neutral world tour. This initiative is aimed at reducing their environmental impact while providing fans with an unforgettable concert experience. The band plans to implement eco-friendly practices throughout the tour, including sustainable stage designs and carbon offset programs. "We want our fans to enjoy our music without compromising the health of our planet," said lead singer Chris Martin. The tour sets a precedent for sustainability in the music industry, inspiring other artists to follow suit.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Harry Styles Tops Charts with New Single',
    tag: 'News',
    content: 'Harry Styles has achieved another hit with his new single, which debuted at number one on multiple music charts worldwide.',
    url: 'https://picsum.photos/seed/HARRYSTYLES/700/400',
    description: 'Harry Styles image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      Pop sensation Harry Styles has struck gold again with his latest single, '[Single Title],' which has debuted at number one on multiple music charts around the globe. The song, characterized by its catchy melody and heartfelt lyrics, has resonated with fans and critics alike. Styles took to social media to express his gratitude, stating, "Thank you to everyone who has supported me. This one is for you!" With this new release, Styles continues to prove his versatility and talent in the ever-evolving music landscape.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Lizzo Advocates for Body Positivity in New Campaign',
    tag: 'News',
    content: 'Singer Lizzo has launched a new campaign promoting body positivity and self-love, continuing her mission to inspire confidence and acceptance.',
    url: 'https://picsum.photos/seed/LIZZO/700/400', 
    description: 'Lizzo image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      Renowned singer Lizzo has embarked on a powerful new campaign aimed at promoting body positivity and self-love. The initiative encourages individuals to embrace their bodies, regardless of societal standards. "Your body is your own, and it's beautiful," Lizzo declared during the campaign launch. The campaign includes a series of inspiring videos and social media challenges to foster confidence and acceptance. Lizzo continues to be a beacon of empowerment, using her platform to inspire millions around the world.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Billie Eilish Wins Grammy for Best Song',
    tag: 'News',
    content: 'Young star Billie Eilish has won the Grammy Award for Best Song, adding another major accolade to her already impressive career.',
    url: 'https://picsum.photos/seed/BILLIEILISH/700/400',
    description: 'Billie Eilish image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      In a spectacular night at the Grammy Awards, Billie Eilish took home the prestigious award for Best Song with her hit '[Song Title].' The young artist, known for her unique sound and style, has quickly risen to prominence in the music industry. During her acceptance speech, Billie thanked her fans and collaborators, expressing her disbelief at the honor. "This is a dream come true," she said. With this Grammy win, Eilish continues to solidify her status as one of the leading voices of her generation.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'Bruno Mars Teases New Album',
    tag: 'News',
    content: 'Bruno Mars has teased fans with news of his upcoming album, promising a return to his funk and R&B roots.',
    url: 'https://picsum.photos/seed/BRUNOMARS/700/400', 
    description: 'Bruno Mars image',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      Bruno Mars has excited fans with a sneak peek into his forthcoming album, which promises a nostalgic return to his funk and R&B roots. The artist shared a teaser on social media, hinting at new sounds and collaborations. "I've been working hard on this project, and I can't wait for you all to hear it," Mars expressed in his post. As anticipation builds, fans are eagerly waiting for more details about the album's release.
    `
  },
  {
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    title: 'The Weeknd Collaborates with Daft Punk on New Track',
    tag: 'News',
    content: 'The Weeknd has dropped a surprise collaboration with Daft Punk, blending their unique sounds into a chart-topping hit.',
    url: 'https://picsum.photos/seed/WEEKEND/700/400',
    description: 'The Weeknd and Daft Punk in the studio',
    clicks: Math.floor(Math.random() * 1000),
    pagecontent: `
      In an unexpected twist, The Weeknd has teamed up with the legendary electronic duo Daft Punk for a new track titled '[Track Title].' The collaboration fuses their distinctive styles into a mesmerizing soundscape that has already begun climbing the charts. The Weeknd expressed his excitement, stating, "Working with Daft Punk was a dream come true. This song is special to me." As the track gains momentum, fans are buzzing with anticipation for the accompanying music video and performances.
    `
  }
];

const liked = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },
  { user_id: '7e4e1a5e-c52c-4b4a-96e1-e06d52b2f0c8', post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },

  { user_id: 'd1b7f2a7-6d2e-4675-b1d4-2b1ef1a8e4c1', post_id: 'b33d8d23-25fe-4446-98f3-3418551495c1' },
  { user_id: '9f4e3f28-8534-467b-944e-4f1f61e7e0d3', post_id: 'b33d8d23-25fe-4446-98f3-3418551495c1' },

  { user_id: '1e8a7d98-07b3-4f84-985d-05375e0c8b7f', post_id: 'c12d23a7-e2c5-4e6a-8b8c-6d5f456c8b9e' },
  { user_id: '5b2f4a33-2b7c-4d74-bc8e-2f327c527b4b', post_id: 'c12d23a7-e2c5-4e6a-8b8c-6d5f456c8b9e' },

  { user_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d', post_id: 'c7fd5c62-7d8f-4d4b-9f6d-f8236c434d9a' },
  { user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1', post_id: 'c7fd5c62-7d8f-4d4b-9f6d-f8236c434d9a' },
  { user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b', post_id: 'c7fd5c62-7d8f-4d4b-9f6d-f8236c434d9a' },
  { user_id: '82a4e1c6-13b4-4b85-b1c9-e51c5a8bdb41', post_id: 'c7fd5c62-7d8f-4d4b-9f6d-f8236c434d9a' },

  { user_id: 'b8f02c18-c87f-4a91-a0ae-0f2d2fdaff1b', post_id: 'd8ae7d28-f70a-4d8b-a1c4-343dfcf1bcd1' },
  { user_id: '6d5f9a4e-03b2-437c-b19e-f54c9d2e4c6f', post_id: 'd8ae7d28-f70a-4d8b-a1c4-343dfcf1bcd1' },

  { user_id: '0d2f6f67-d34f-4b6a-a3e6-1623b4e3d6e1', post_id: 'e27b8f5a-1d3a-4b97-8c3b-7c4f8b2d5a9e' },
  { user_id: '3f2a8f94-fdb5-4b6c-90e1-23a7d3f2e6b7', post_id: 'e27b8f5a-1d3a-4b97-8c3b-7c4f8b2d5a9e' },

  { user_id: 'b9d0f1a9-3c5e-4c9b-ae0f-3e2d3f5a7b9d', post_id: 'a3b8e5de-e7f9-4a7a-9b20-674f1c3a1dc0' },
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', post_id: 'a3b8e5de-e7f9-4a7a-9b20-674f1c3a1dc0' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', post_id: 'a8c7d9f3-2b8a-4f3d-8c7b-3f6d5c1b8f9e' },

  { user_id: 'ed2f6b9d-913d-4379-84a5-b2a34868edbc', post_id: 'c3e9d51b-7b47-4f21-a8fc-5d7e5f1b2345' },
];

const likedComments = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    comment_id: '11111111-1111-1111-1111-111111111111' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    comment_id: '44444444-4444-4444-4444-444444444444' },

  { user_id: 'd8a79957-8ef9-482e-9c90-8b1e4f056fa2', 
    comment_id: '22111111-1111-1111-1111-111111111111' },  

];

const savedMedia = [
  { user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338' },

  { user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    post_id: 'b33d8d23-25fe-4446-98f3-3418551495c1' },
]

module.exports = {
    users,
    configs,
    followings,
    followers,
    communities,
    following_commmunity,
    posts,
    comments,
    news,
    liked,
    likedComments,
    savedMedia
}