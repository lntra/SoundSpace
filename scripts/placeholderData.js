const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John',
    email: 'john123@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/659/2731/1536.jpg?hmac=jwFueQ8WaCS2sR6LVKFGQ3-emm0_HqHEOhQDt8AzHyQ',
    url_banner: 'https://fastly.picsum.photos/id/565/3000/2000.jpg?hmac=Fnxr-MIA5jGXl3nZYRwfqckc0UepeqawFuaoA_U9u1k'
  },
  {
    id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    name: 'David',
    email: 'David@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/669/4869/3456.jpg?hmac=g-4rQWsPdHoLi5g6ahHlvjKubSQzR-D9m7-WtblbmyM',
    url_banner: 'https://fastly.picsum.photos/id/569/2509/1673.jpg?hmac=ZXpC4eOmQpHuu7kQaX5wkzrU2ydqr4UIWrMs72hO0H0'
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    name: 'Marie',
    email: 'marie@nextmail.com',
    password: 'pass123',
    url_icon: 'https://fastly.picsum.photos/id/646/2509/1673.jpg?hmac=HXykqhktw0TF08mbS0F3J4bxJJvJRQXG74xA4zPYW7Y',
    url_banner: 'https://fastly.picsum.photos/id/635/2509/1673.jpg?hmac=O3P1jEnFp0FqGswH9gRKIuKI-inphuJBkZZ1-enTKEw'
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e',
    name: 'ADMIN',
    email: 'ADMIN@nextmail.com',
    password: 'ADMIN',
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
  }
  
];

const posts = [
  { 
    id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    content: 'Favorite Rock Bands?',
    content_post: 'What are some of your all-time favorite rock bands? I can’t get enough of Led Zeppelin and Queen!'
  },
  { 
    id: 'b33d8d23-25fe-4446-98f3-3418551495c1', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    content: 'Classical Music for Studying',
    content_post: 'Does anyone have recommendations for classical music that helps you focus while studying? I’m looking for something calming.'
  },
  { 
    id: 'c12d23a7-e2c5-4e6a-8b8c-6d5f456c8b9e', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    content: 'Best Hip Hop Albums of All Time',
    content_post: 'What do you guys think are the best hip hop albums of all time? My top pick is Nas’s "Illmatic".'
  },
  { 
    id: 'e27b8f5a-1d3a-4b97-8c3b-7c4f8b2d5a9e', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    content: 'Jazz Improvisation Tips',
    content_post: 'Any tips for improving my jazz improvisation skills? I’m struggling to make my solos sound natural.'
  },
  { 
    id: 'e4c6f8d1-9452-4bb1-9a57-9b746d512f5b', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890', 
    content: 'Best Indie Albums of the Year',
    content_post: 'What are your top indie albums of the year so far? I’m loving Phoebe Bridgers’ latest release!'
  },
  { 
    id: 'f5a26b76-1edb-4c2e-bf93-f7a5f1a7d43a', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    community_id: '1b9e3c45-2d5a-4e6b-bc5a-2d1234567890', 
    content: 'Top Pop Songs for a Party',
    content_post: 'What are some must-have pop songs for a party playlist? I need some new tracks to get everyone dancing!'
  },
  { 
    id: '2b9cfe34-78a6-44d3-92b2-1c9a6e4a1234', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '2c0f4e56-3e7b-4f8b-cd6a-3e1234567890', 
    content: 'Jazz Fusion Essentials',
    content_post: 'What are some essential jazz fusion albums or artists that every fan should know about? Looking to dive deeper into the genre.'
  },
  { 
    id: 'c3e9d51b-7b47-4f21-a8fc-5d7e5f1b2345', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    community_id: '0a8d5e32-1e4f-4a9a-9f5d-1c1234567890', 
    content: 'Favorite Acoustic Tracks',
    content_post: 'What are your go-to acoustic tracks for a relaxing evening? I’m always looking for new recommendations!'
  }
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
    id: '22222222-2222-2222-2222-222222222220',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the reply to the top level comment',
    parent_comment_id: '22222222-2222-2222-2222-222222222222',
  },
  {
    id: '22222222-2222-2222-2222-222222222200',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the reply to the top level comment',
    parent_comment_id: '22222222-2222-2222-2222-222222222220',
  },
  {
    id: '22222222-2222-2222-2222-222222222210',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the reply to the top level comment',
    parent_comment_id: '22222222-2222-2222-2222-222222222200',
  },
  {
    id: '22222222-2222-2222-2222-222222222000',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the reply to the top level comment',
    parent_comment_id: '22222222-2222-2222-2222-222222222210',
  },
  {
    id: '22222222-2222-2222-2222-222222222221',
    post_id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338',
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    content: 'This is a reply to the top level comment2',
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
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Radiohead Announces New Album Release Date', 
    tag: 'Short Stories', 
    content: 'Legendary alternative rock band Radiohead has announced that their highly anticipated new album will be released this fall. The album, titled "Echoes of the Past," promises to blend their signature sound with new experimental elements.', 
    url: 'https://media.npr.org/assets/img/2021/12/09/radiohead-comp-x-holborn-studios-2000-c-tom-sheehan-1-scaled_wide-6c54113b5f52b7399d9509292aa8e5628a5b743d.jpg?s=1400&c=100&f=jpeg',
    description: 'Radiohead band Photo',
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
    pagecontent: `
      Taylor Swift has once again solidified her status as a streaming powerhouse with her latest single. The track has broken records across major platforms, becoming the most-streamed song within 24 hours of its release. Fans have taken to social media to express their excitement, sharing clips and praising Swift's innovative approach and lyrical depth. The song's success is a testament to her ability to evolve and stay relevant in an ever-changing music industry.

Swift's new single not only showcases her exceptional songwriting skills but also features a collaboration with a renowned producer, adding a fresh dynamic to her sound. Critics have lauded the single for its catchy melody and poignant lyrics, which delve into themes of love, heartbreak, and self-discovery. The accompanying music video has also garnered millions of views, further cementing Swift's position as a visual and musical artist.

As Swift continues to break records and set new standards, her latest release underscores her influence and impact on the music industry. With numerous awards and accolades already under her belt, this achievement adds another milestone to her illustrious career. Fans eagerly anticipate what Swift will deliver next, as she continues to push boundaries and redefine pop music.
    `
  },
  { 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04e', 
    title: 'Beyoncé Headlines Global Music Festival 2024', 
    tag: 'Report', 
    content: 'Beyoncé has been announced as the headliner for the 2024 Global Music Festival. The festival will feature performances from artists around the world and will take place in multiple cities simultaneously, promoting unity through music.',
    url: 'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/beyonce-2-1.jpg?w=1220&h=674&crop=1',
    description: 'Beyoncé Photo',
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
    url: 'https://www.apple.com/newsroom/images/product/music/standard/Apple-Music-Live-Ed-Sheeran-with-guitar_big.jpg.large.jpg',
    description: 'Ed Sheeran photo',
    pagecontent: `
      Ed Sheeran has emerged victorious in a high-profile lawsuit concerning copyright infringement, marking a significant triumph for the British singer-songwriter. The case revolved around allegations that Sheeran's hit song bore similarities to another artist's work. After a lengthy legal battle, the court ruled in Sheeran's favor, finding no evidence of plagiarism. The decision not only clears Sheeran's name but also reinforces his commitment to artistic integrity.

The lawsuit had drawn considerable attention, with many in the music industry closely monitoring the proceedings. Sheeran's defense argued that the similarities cited were coincidental and that the song in question was a result of his unique creative process. The court's ruling acknowledged the complexity of musical composition and the inevitability of certain commonalities in popular music. Sheeran's legal team emphasized the importance of protecting artists' rights to their original work.

Following the verdict, Sheeran expressed relief and gratitude to his supporters. He reaffirmed his dedication to his craft and his belief in the originality of his music. The outcome of the lawsuit has broader implications for the music industry, highlighting the challenges of navigating copyright issues in an era where digital distribution and global reach can lead to increased scrutiny. Sheeran's victory is seen as a precedent-setting moment, offering reassurance to artists striving to create without fear of unwarranted legal challenges.
    `
  },
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
    configs,
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