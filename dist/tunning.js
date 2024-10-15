"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tunningData = void 0;
exports.tunningData = [
    {
        role: 'user',
        parts: ['我有薑 鹽 糖 魚 蛋 醋 蔥 豬肉 蛤蠣 我要做出三菜一湯'],
    },
    {
        role: 'model',
        parts: [
            '```json\n[\n    {\n        "dishName": "糖醋魚",\n        "ingredients": ["魚", "薑", "蔥", "鹽", "糖", "醋", "醬油"],\n        "image": "https://i.imgur.com/87hO28A.jpg",\n        "instructions": [\n            "將魚洗淨，切塊，用鹽醃製15分鐘",\n            "鍋中熱油，煎魚至兩面金黃",\n            "加入薑片和蔥段爆香",\n            "倒入醬油、糖、醋，翻炒均勻，淋上少許水，蓋鍋燜煮至魚肉熟透",\n            "出鍋前撒上蔥花，可淋少許香油提香"\n        ]\n    },\n    {\n        "dishName": "薑絲炒肉",\n        "ingredients": ["豬肉", "薑", "蔥", "鹽", "醬油", "糖"],\n        "image": "https://www.dcard.tw/f/food/p/236847896-93476530-2389-4a3e-9f24-4950ab6b9a04",\n        "instructions": [\n            "豬肉切片，用鹽、醬油、糖醃製15分鐘",\n            "鍋中熱油，加入薑絲爆香",\n            "放入豬肉片翻炒至變色",\n            "加入少許醬油和糖調味，翻炒均勻即可"\n        ]\n    },\n    {\n        "dishName": "蔥蛋",\n        "ingredients": ["蛋", "蔥", "鹽", "糖"],\n        "image": "https://i.imgur.com/V8Z60nQ.jpg",\n        "instructions": [\n            "打開雞蛋，加入少許鹽和糖調味",\n            "鍋中熱油，倒入蛋液，快速翻炒至蛋液凝固，即可盛盤",\n            "可撒上少許蔥花"\n        ]\n    },\n    {\n        "dishName": "蛤蜊湯",\n        "ingredients": ["蛤蠣", "薑", "鹽", "蔥"],\n        "image": "https://i.imgur.com/zK7J53D.jpg",\n        "instructions": [\n            "蛤蜊浸泡在鹽水中吐沙",\n            "鍋中加水，放入薑片，煮沸後放入蛤蜊",\n            "蓋上鍋蓋，煮至蛤蜊全部打開即可",\n            "加入鹽調味，可加少許蔥花"\n        ]\n    }\n]\n\n\n```',
        ],
    },
    {
        role: 'user',
        parts: ['我有薑 鹽 糖 魚 蛋 醋 蔥 雞肉 豬肉 牛肉 高麗菜 我要做出四菜一湯'],
    },
    {
        role: 'model',
        parts: [
            '```json\n[\n  {\n    "dishName": "糖醋魚",\n    "ingredients": ["魚", "薑", "蔥", "鹽", "糖", "醋", "醬油"],\n    "image": "https://i.imgur.com/87hO28A.jpg",\n    "instructions": [\n      "將魚洗淨，切塊，用鹽醃製15分鐘",\n      "鍋中熱油，煎魚至兩面金黃",\n      "加入薑片和蔥段爆香",\n      "倒入醬油、糖、醋，翻炒均勻，淋上少許水，蓋鍋燜煮至魚肉熟透",\n      "出鍋前撒上蔥花，可淋少許香油提香"\n    ]\n  },\n  {\n    "dishName": "薑絲炒肉",\n    "ingredients": ["豬肉", "薑", "蔥", "鹽", "醬油", "糖"],\n    "image": "https://www.dcard.tw/f/food/p/236847896-93476530-2389-4a3e-9f24-4950ab6b9a04",\n    "instructions": [\n      "豬肉切片，用鹽、醬油、糖醃製15分鐘",\n      "鍋中熱油，加入薑絲爆香",\n      "放入豬肉片翻炒至變色",\n      "加入少許醬油和糖調味，翻炒均勻即可"\n    ]\n  },\n  {\n    "dishName": "蔥爆牛肉",\n    "ingredients": ["牛肉", "蔥", "薑", "鹽", "醬油", "糖", "料酒", "澱粉"],\n    "image": "https://d3l76hx23vw40a.cloudfront.net/recipe/bk164-008.jpg",\n    "instructions": [\n      "牛肉切片，用醬油、料酒、糖、澱粉醃製15分鐘",\n      "鍋中熱油，加入薑絲爆香",\n      "放入牛肉片翻炒至變色",\n      "加入蔥段，翻炒片刻",\n      "出鍋前淋上少許香油"\n    ]\n  },\n  {\n    "dishName": "清炒高麗菜",\n    "ingredients": ["高麗菜", "薑", "鹽"],\n    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxRbDRQYJaX8q-dzZ41gXpfJv_Bu3rPT96xw&s",\n    "instructions": [\n      "高麗菜切絲",\n      "鍋中熱油，加入薑絲爆香",\n      "倒入高麗菜絲翻炒",\n      "加少許鹽調味，出鍋前淋上少許香油"\n    ]\n  },\n  {\n    "dishName": "雞湯",\n    "ingredients": ["雞肉", "薑", "鹽"],\n    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Gl6ZjzAhlWQnYz-vVfDroEDDlxVwENlX7g&s",\n    "instructions": [\n      "雞肉洗淨，切塊",\n      "鍋中加水，放入雞肉和薑片，大火煮沸後轉小火慢燉",\n      "燉至雞肉軟爛，加少許鹽調味即可"\n    ]\n  }\n]\n\n\n```',
        ],
    },
];
