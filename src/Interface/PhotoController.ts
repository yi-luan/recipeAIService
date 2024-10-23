import axios, { AxiosError } from 'axios';
import console from 'console';
import process from 'process';
import { setTimeout } from 'timers';
import { Get, Route, Tags } from 'tsoa';

@Route('photo')
@Tags('Photo')
export class PhotoController {
	private googleSearchApiKey: string;
	private googleSearchEngineId: string;
	private googleSearchDomain: string;

	constructor() {
		this.googleSearchApiKey = process.env.Google_Search_API_Key || '';
		this.googleSearchEngineId = process.env.SearchEngineId || '';
		this.googleSearchDomain = process.env.GooogleSearchDomain || '';

		if (!this.googleSearchApiKey || !this.googleSearchEngineId || !this.googleSearchDomain) {
			console.error('缺少必要的環境變量設置');
		}
	}

	@Get('/dishPhoto/{dishName}')
	async getPhotoByDishName(dishName: string): Promise<string> {
		console.log('接收到的 dishName:', dishName);
		const encodedDishName = encodeURIComponent(dishName.trim());
		const url = `${this.googleSearchDomain}?key=${this.googleSearchApiKey}&cx=${this.googleSearchEngineId}&q=${encodedDishName}&searchType=image`;

		try {
			const response = await this.makeRequestWithRetry(url);
			const imagesResults = response.data.items
				.filter((x: any) => x.link.toLowerCase().endsWith('.jpg'))
				.map((x: any) => ({
					original: x.link,
					queryString: dishName,
				}));

			if (imagesResults && imagesResults.length > 0) {
				const randomIndex = Math.floor(Math.random() * Math.min(10, imagesResults.length));
				return imagesResults[randomIndex].original;
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
						// Rate limit exceeded, wait before retrying
						await new Promise((resolve) => setTimeout(resolve, 2000));
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
