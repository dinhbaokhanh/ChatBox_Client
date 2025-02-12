export const sampleChats = [
  {
    avatar: ['https://w3schools.com/howto/img_avatar.png'],
    name: 'John Doe',
    _id: '1',
    groupChat: false,
    members: ['1', '2'],
  },
  {
    avatar: ['https://w3schools.com/howto/img_avatar.png'],
    name: 'John 3KA',
    _id: '2',
    groupChat: false,
    members: ['1', '2'],
  },
]

export const sampleUsers = [
  {
    avatar: ['https://w3schools.com/howto/img_avatar.png'],
    name: 'John Doe',
    _id: '1',
  },
  {
    avatar: ['https://w3schools.com/howto/img_avatar.png'],
    name: 'John 3KA',
    _id: '2',
  },
]

export const sampleNotifications = [
  {
    sender: {
      avatar: ['https://w3schools.com/howto/img_avatar.png'],
      name: 'John Doe',
    },
    _id: '1',
  },
  {
    sender: {
      avatar: ['https://w3schools.com/howto/img_avatar.png'],
      name: 'John 3KA',
    },
    _id: '2',
  },
]

export const sampleMessage = [
  {
    attachments: [
      {
        public_id: 'asdsad',
        url: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    ],
    content: 'L*uda ka Message hai',
    _id: 'sfnsdjkfsdnfkjsbnd',
    sender: {
      _id: 'user_id',
      name: 'LMAO ',
    },
    chat: 'chatId',
    createdAt: '2024-02-12T10:41:30.630Z',
  },
  {
    attachments: [
      {
        public_id: 'sgfdvsd',
        url: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    ],
    content: 'Lsdfdsfsdgytrdfgbai',
    _id: 'sfnsdjkfssadasddnfkjsbnd',
    sender: {
      _id: 'sdsdsdsds',
      name: '3KA ',
    },
    chat: 'chatId',
    createdAt: '2024-02-12T10:41:32.630Z',
  },
]

export const dashboardData = {
  users: [
    {
      _id: '1',
      name: 'John Doe',
      avatar: ['https://w3schools.com/howto/img_avatar.png'],

      friends: 20,
      groups: 5,
    },
    {
      _id: '2',
      name: 'John 3KA',
      avatar: ['https://w3schools.com/howto/img_avatar.png'],

      friends: 15,
      groups: 6,
    },
  ],

  chats: [
    {
      name: 'GI Group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '1',
      groupChat: false,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Doe',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
    {
      name: 'HSR Group',
      avatar: ['https://www.w3schools.com/howto/img_avatar.png'],
      _id: '2',
      groupChat: true,
      members: [
        { _id: '1', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
        { _id: '2', avatar: 'https://www.w3schools.com/howto/img_avatar.png' },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: 'John Boi',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: 'Gacha 50/50 vai',
      _id: 'sfnsdjkfsdnfkjsbnd',
      sender: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: '3KA',
      },
      chat: 'chatId',
      groupChat: false,
      createdAt: '2024-02-12T10:41:30.630Z',
    },
    {
      attachments: [
        {
          public_id: 'sdada 2',
          url: 'https://www.w3schools.com/howto/img_avatar.png',
        },
      ],
      content: 'Gacha de vai',
      _id: 'dfasfsfsdfasfs',
      sender: {
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        name: '3KA',
      },
      chat: 'chatId',
      groupChat: true,
      createdAt: '2024-02-12T10:41:30.630Z',
    },
  ],
}
