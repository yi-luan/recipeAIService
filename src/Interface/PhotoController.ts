import axios, { AxiosError } from 'axios';
import console from 'console';
import NodeCache from 'node-cache';
import process from 'process';
import { setTimeout } from 'timers';
import { Get, Route, Tags } from 'tsoa';

@Route('photo')
@Tags('Photo')
export class PhotoController {
	private googleSearchApiKey: string;
	private googleSearchEngineId: string;
	private googleSearchDomain: string;
	private cache: NodeCache;
	private requestQueue: Promise<any>;

	constructor() {
		this.googleSearchApiKey = process.env.Google_Search_API_Key || '';
		this.googleSearchEngineId = process.env.SearchEngineId || '';
		this.googleSearchDomain = process.env.GooogleSearchDomain || '';
		this.cache = new NodeCache({ stdTTL: 3600 }); // 緩存 1 小時
		this.requestQueue = Promise.resolve();

		if (!this.googleSearchApiKey || !this.googleSearchEngineId || !this.googleSearchDomain) {
			console.error('缺少必要的環境變量設置');
		}
	}

	@Get('/dishPhoto/{dishName}')
	async getPhotoByDishName(dishName: string): Promise<string> {
		console.log('接收到的 dishName:', dishName);

		// 檢查緩存
		const cachedResult = this.cache.get<string>(dishName);
		if (cachedResult) {
			console.log('從緩存返回結果:', dishName);
			return cachedResult;
		}

		// 使用隊列來限制並發請求
		return new Promise((resolve, reject) => {
			this.requestQueue = this.requestQueue.then(async () => {
				try {
					const result = await this.fetchPhotoUrl(dishName);
					resolve(result);
				} catch (error) {
					reject(error);
				}
			});
		});
	}

	private async fetchPhotoUrl(dishName: string): Promise<string> {
		const encodedDishName = encodeURIComponent(dishName.trim());
		const url = `${this.googleSearchDomain}?key=${this.googleSearchApiKey}&cx=${this.googleSearchEngineId}&q=${encodedDishName}&searchType=image`;
		console.log('請求的 URL:', url);
		try {
			const response = await this.makeRequestWithRetry(url);
			const imagesResults = response.data.items
				.filter((x: any) => x.link.toLowerCase().endsWith('.jpg'))
				.map((x: any) => ({
					original: x.link,
					queryString: dishName,
				}));
			console.log('過濾後的圖片結果:', imagesResults);
			if (imagesResults && imagesResults.length > 0) {
				const result = imagesResults[0].original;
				this.cache.set(dishName, result);
				return result;
			} else {
				console.log('未找到相關圖片');
				return this.getDefaultImageUrl();
			}
		} catch (error) {
			console.error('獲取圖片時發生錯誤:', error);
			return this.getDefaultImageUrl();
		}
	}

	private async makeRequestWithRetry(url: string, retries = 3): Promise<any> {
		for (let i = 0; i < retries; i++) {
			try {
				return await axios.get(url, {
					headers: {
						'User-Agent':
							'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
						Accept: 'application/json, text/plain, */*',
						'Accept-Language': 'en-US,en;q=0.9',
						Referer: 'https://www.googleapis.com/',
					},
					timeout: 5000, // 5 seconds timeout
				});
			} catch (error) {
				if (i === retries - 1) throw error;
				if (axios.isAxiosError(error)) {
					const axiosError = error as AxiosError;
					if (axiosError.response && axiosError.response.status === 429) {
						// 使用指數退避策略
						const delay = Math.pow(2, i) * 1000;
						await new Promise((resolve) => setTimeout(resolve, delay));
					}
				}
				console.warn(`請求失敗，正在重試 (${i + 1}/${retries})...`);
			}
		}
	}

	private getDefaultImageUrl(): string {
		return 'https://www.bowcity.com.tw/images/nopic.jpg'; // 替換為您的默認圖片 URL
	}
}
