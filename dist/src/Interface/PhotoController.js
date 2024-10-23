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
const node_cache_1 = __importDefault(require("node-cache"));
const process_1 = __importDefault(require("process"));
const timers_1 = require("timers");
const tsoa_1 = require("tsoa");
let PhotoController = class PhotoController {
    constructor() {
        this.googleSearchApiKey = process_1.default.env.Google_Search_API_Key || '';
        this.googleSearchEngineId = process_1.default.env.SearchEngineId || '';
        this.googleSearchDomain = process_1.default.env.GooogleSearchDomain || '';
        this.cache = new node_cache_1.default({ stdTTL: 3600 }); // 緩存 1 小時
        this.requestQueue = Promise.resolve();
        if (!this.googleSearchApiKey || !this.googleSearchEngineId || !this.googleSearchDomain) {
            console_1.default.error('缺少必要的環境變量設置');
        }
    }
    getPhotoByDishName(dishName) {
        return __awaiter(this, void 0, void 0, function* () {
            console_1.default.log('接收到的 dishName:', dishName);
            // 檢查緩存
            const cachedResult = this.cache.get(dishName);
            if (cachedResult) {
                console_1.default.log('從緩存返回結果:', dishName);
                return cachedResult;
            }
            // 使用隊列來限制並發請求
            return new Promise((resolve, reject) => {
                this.requestQueue = this.requestQueue.then(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield this.fetchPhotoUrl(dishName);
                        resolve(result);
                    }
                    catch (error) {
                        reject(error);
                    }
                }));
            });
        });
    }
    fetchPhotoUrl(dishName) {
        return __awaiter(this, void 0, void 0, function* () {
            const encodedDishName = encodeURIComponent(dishName.trim());
            const url = `${this.googleSearchDomain}?key=${this.googleSearchApiKey}&cx=${this.googleSearchEngineId}&q=${encodedDishName}&searchType=image`;
            console_1.default.log('請求的 URL:', url);
            try {
                const response = yield this.makeRequestWithRetry(url);
                const imagesResults = response.data.items
                    .filter((x) => x.link.toLowerCase().endsWith('.jpg'))
                    .map((x) => ({
                    original: x.link,
                    queryString: dishName,
                }));
                console_1.default.log('過濾後的圖片結果:', imagesResults);
                if (imagesResults && imagesResults.length > 0) {
                    const result = imagesResults[0].original;
                    this.cache.set(dishName, result);
                    return result;
                }
                else {
                    console_1.default.log('未找到相關圖片');
                    return this.getDefaultImageUrl();
                }
            }
            catch (error) {
                console_1.default.error('獲取圖片時發生錯誤:', error);
                return this.getDefaultImageUrl();
            }
        });
    }
    makeRequestWithRetry(url, retries = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < retries; i++) {
                try {
                    return yield axios_1.default.get(url, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                            Accept: 'application/json, text/plain, */*',
                            'Accept-Language': 'en-US,en;q=0.9',
                            Referer: 'https://www.googleapis.com/',
                        },
                        timeout: 5000, // 5 seconds timeout
                    });
                }
                catch (error) {
                    if (i === retries - 1)
                        throw error;
                    if (axios_1.default.isAxiosError(error)) {
                        const axiosError = error;
                        if (axiosError.response && axiosError.response.status === 429) {
                            // 使用指數退避策略
                            const delay = Math.pow(2, i) * 1000;
                            yield new Promise((resolve) => (0, timers_1.setTimeout)(resolve, delay));
                        }
                    }
                    console_1.default.warn(`請求失敗，正在重試 (${i + 1}/${retries})...`);
                }
            }
        });
    }
    getDefaultImageUrl() {
        return 'https://www.bowcity.com.tw/images/nopic.jpg'; // 替換為您的默認圖片 URL
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
