"use strict";
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
exports.RecipeRepository = void 0;
const console_1 = __importDefault(require("console"));
const Recipe_1 = require("../Domain/Entity/Recipe");
class RecipeRepository {
    constructor() { }
    save(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            // 實現保存邏輯
            console_1.default.log(recipe);
            return recipe;
            // 返回保存的食譜
        });
    }
    findById() {
        return __awaiter(this, void 0, void 0, function* () {
            // 實現查詢邏輯
            const recipe = new Recipe_1.Recipe('', [], []);
            return recipe;
            // 返回查詢到的食譜，如果沒有找到則返回 null
        });
    }
}
exports.RecipeRepository = RecipeRepository;
