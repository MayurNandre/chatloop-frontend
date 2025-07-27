
export const samplechats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John doe",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Roman",
        _id: "2",
        groupChat: false,
        members: ["1", "2"],
    }
];

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Roman",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Dean",
        _id: "2",
    }
]

export const sampleNotifications = [
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Roman"
        }
        ,
        _id: "1",
    },
    {
        sender: {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Dean"
        },
        _id: "2",
    }
]

export const sampleMessage = [
    {
        content: "Message haiiii",
        _id: "hiudhiuhiuehciuwe",
        sender: {
            _id: "user._id",
            name: "chaman"
        },
        chat: "chatId",
        createdAt: "2024-10-30T09:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "asdsad222",
                url: "https://www.w3schools.com/howto/img_avatar.png"
            },
        ],
        _id: "hiudhiuhiuehciuwe22",
        sender: {
            _id: "asdjb",
            name: "chaukati"
        },
        chat: "chatId",
        createdAt: "2024-10-30T09:41:30.630Z",
    }
]


export const dashBoardData = {
    users: [
        {
            name: "Mayur Nandre",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            username: "mayur007",
            friends: 20,
            groups: 5,
        },
        {
            name: "Bhavesh Bundele",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            username: "bhavesb",
            friends: 15,
            groups: 4,
        }
    ],

    chats: [
        {
            name: "Lasun Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [{ _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
            { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "Mayur Nandre",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        }, {
            name: "Chpari Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: false,
            members: [{ _id: "3", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
            { _id: "4", avatar: "https://www.w3schools.com/howto/img_avatar.png" }, { _id: "5", avatar: "https://www.w3schools.com/howto/img_avatar.png" }],
            totalMembers: 3,
            totalMessages: 25,
            creator: {
                name: "Bhavesh Bundele",
                avatar: "https://www.w3schools.com/howto/img_avatar.png"
            }
        }
    ],
    messages: [
        {
            attachments: [],
            content: "Message haiiii",
            _id: "hiudhi",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "chaman"
            },
            chat: "chatId",
             groupChat: false,
            createdAt: "2024-10-30T09:41:30.630Z",
        },
        {
            attachments: [
                {
                    public_id: "asdsad222",
                    url: "https://www.w3schools.com/howto/img_avatar.png"
                },
            ],
            content: "",
            _id: "hiuuwe22",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "chaukati"
            },
            chat: "chatId",
            groupChat: true,
            createdAt: "2024-10-30T09:41:30.630Z",
        }
    ]
}