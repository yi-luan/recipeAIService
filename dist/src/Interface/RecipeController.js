"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const generative_ai_1 = require("@google/generative-ai");
const console_1 = __importDefault(require("console"));
const process_1 = __importDefault(require("process"));
const tsoa_1 = require("tsoa");
let RecipeController = class RecipeController {
    constructor() {
        this.geminiApiKey = process_1.default.env.Gemini_API_Key;
    }
    generateRecipe(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = [];
            try {
                if (!this.geminiApiKey) {
                    throw new Error('Gemini API 密鑰未設置');
                }
                const genAI = new generative_ai_1.GoogleGenerativeAI(this.geminiApiKey);
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
                const chat = model.startChat({
                    history: [
                        {
                            role: 'user',
                            parts: [
                                {
                                    text: '我只有 薑 鹽 糖 魚 蛋 醋 蔥 雞肉 豬肉 牛肉 高麗菜 我要做出 四菜一湯的西式料理，需要甜點，請按照我擁有的食材給出json格式的食譜，不要菜餚中出現我沒有的材料，並確保包含 dishName, ingredients 和 instructions 欄位。',
                                },
                            ],
                        },
                        {
                            role: 'model',
                            parts: [
                                {
                                    text: JSON.stringify([
                                        {
                                            dishName: '香煎鮭魚佐薑汁醬',
                                            ingredients: ['魚', '薑', '鹽', '糖', '醋', '蔥'],
                                            instructions: [
                                                '將魚洗淨，擦乾，用鹽和糖醃製15分鐘',
                                                '鍋中熱油，將魚煎至兩面金黃',
                                                '將薑切成細絲，加入少許糖和醋，攪拌成醬汁',
                                                '將醬汁淋在煎好的魚上，撒上蔥花即可',
                                            ],
                                        },
                                    ]),
                                },
                            ],
                        },
                        {
                            role: 'user',
                            parts: [
                                {
                                    text: '地瓜粉不是地瓜，樹薯粉不是樹薯',
                                },
                            ],
                        },
                        {
                            role: 'model',
                            parts: [
                                {
                                    text: '你说得完全正确！我的数据库中出现了错误，地瓜粉和树薯粉不是指地瓜和树薯本身，而是指用它们做成的淀粉。非常感谢你指正，我会尽快修正我的数据库，避免类似错误再次发生。 \n\n请问你还有其他问题需要我帮忙吗？ 我会尽力用更准确的知识来回答你的问题！ \n',
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        maxOutputTokens: 1000,
                    },
                });
                const desert = request.desert ? '需要甜點' : '不需要甜點';
                const prompt = `只能用到${request.ingredients} 我要做出 ${request.numberOfDishes} 菜${request.numberOfSoups}湯的${request.type}料理，${desert}，請按照我擁有的食材給出json格式的食譜且不要有回應中不要有多餘的非json格式文字，不要菜餚中出現我沒有的材料，並確保包含 dishName, ingredients 和 instructions`;
                const result = yield chat.sendMessage(prompt);
                const generatedText = result.response.text();
                // 嘗試解析生成的文本為 JSON
                try {
                    const cleanedText = generatedText
                        .replace('```json', '')
                        .replace('```', '')
                        .replace(/```json\n?|\n?```/g, '')
                        .trim();
                    response = JSON.parse(cleanedText);
                }
                catch (parseError) {
                    console_1.default.error('無法解析生成的文本為 JSON:', parseError);
                    return parseError;
                }
            }
            catch (error) {
                console_1.default.error('生成食譜時發生錯誤:', error);
                throw error;
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)('/generateRecipe'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "generateRecipe", null);
RecipeController = __decorate([
    (0, tsoa_1.Route)('recipe'),
    (0, tsoa_1.Tags)('Recipe'),
    __metadata("design:paramtypes", [])
], RecipeController);
exports.RecipeController = RecipeController;