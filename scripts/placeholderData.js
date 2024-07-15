const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John',
    email: 'john123@nextmail.com',
    password: 'john123',
  },
  {
    id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b',
    name: 'David',
    email: 'David@nextmail.com',
    password: 'lifeisgreat',
  },
  {
    id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b',
    name: 'Marie',
    email: 'marie@nextmail.com',
    password: 'pass123',
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
  { id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', name: 'RealTime', description: 'Description for community 1' },
  { id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', name: 'SunDown', description: 'Description for community 2' },
];

const posts = [
  { 
    id: 'd1adf5ec-c0af-4608-8aa2-72c0f9228338', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    title: 'Favorite Rock Bands?',
    content: 'What are some of your all-time favorite rock bands? I can’t get enough of Led Zeppelin and Queen!'
  },
  { 
    id: 'b33d8d23-25fe-4446-98f3-3418551495c1', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    title: 'Classical Music for Studying',
    content: 'Does anyone have recommendations for classical music that helps you focus while studying? I’m looking for something calming.'
  },
  { 
    id: 'c12d23a7-e2c5-4e6a-8b8c-6d5f456c8b9e', 
    user_id: 'f8c2b5cb-6d24-4c6d-bb1d-9f19f6f6d44b', 
    community_id: '97f4d418-eb4a-425d-97d0-83f6acbc435a', 
    title: 'Best Hip Hop Albums of All Time',
    content: 'What do you guys think are the best hip hop albums of all time? My top pick is Nas’s "Illmatic".'
  },
  { 
    id: 'e27b8f5a-1d3a-4b97-8c3b-7c4f8b2d5a9e', 
    user_id: '71d03b1a-d4fb-4b10-9fa9-2763271ff04b', 
    community_id: '3edb55a2-a037-48a7-81af-d19c99b00dc1', 
    title: 'Jazz Improvisation Tips',
    content: 'Any tips for improving my jazz improvisation skills? I’m struggling to make my solos sound natural.'
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