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
exports.PhotoController = void 0;
const axios_1 = __importDefault(require("axios"));
const console_1 = __importDefault(require("console"));
const process_1 = __importDefault(require("process"));
const tsoa_1 = require("tsoa");
let PhotoController = class PhotoController {
    constructor() {
        this.serpApiKey = process_1.default.env.SerpApi_API_Key;
        this.serpApiDomain = process_1.default.env.SerpApi_GoogleSearch_Domain;
    }
    getPhotoByDishName(dishName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console_1.default.log('接收到的 dishName:', dishName);
            const encodedDishName = encodeURIComponent(dishName);
            const url = `${this.serpApiDomain}&q=${encodedDishName}&api_key=${this.serpApiKey}`;
            console_1.default.log('請求 URL:', url);
            try {
                const response = yield axios_1.default.get(url);
                const imagesResults = response.data.images_results;
                if (imagesResults && imagesResults.length > 0) {
                    const randomIndex = Math.floor(Math.random() * 10) + 1;
                    return imagesResults[randomIndex].original;
                }
                else {
                    console_1.default.log('未找到相關圖片');
                    return '';
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error)) {
                    console_1.default.error('獲取圖片時發生錯誤:', (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
                }
                else {
                    console_1.default.error('獲取圖片時發生未知錯誤:', error);
                }
                throw error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/dishPhoto/{dishName}'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "getPhotoByDishName", null);
PhotoController = __decorate([
    (0, tsoa_1.Route)('photo'),
    (0, tsoa_1.Tags)('Photo'),
    __metadata("design:paramtypes", [])
], PhotoController);
exports.PhotoController = PhotoController;
