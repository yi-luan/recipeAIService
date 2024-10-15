import axios from 'axios';
import console from 'console';
import process from 'process';
import { Get, Route, Tags } from 'tsoa';
import { Photo } from '../Domain/Entity/Photo';

@Route('photo')
@Tags('Photo')
export class PhotoController {
	private serpApiKey: string | undefined;
	private serpApiDomain: string | undefined;
	constructor() {
		this.serpApiKey = process.env.SerpApi_API_Key;
		this.serpApiDomain = process.env.SerpApi_GoogleSearch_Domain;
	}

	@Get('/dishPhoto/{dishName}')
	async getPhotoByDishName(dishName: string): Promise<Photo | string> {
		console.log('接收到的 dishName:', dishName);
		const encodedDishName = encodeURIComponent(dishName);
		const url = `${this.serpApiDomain}&q=${encodedDishName}&api_key=${this.serpApiKey}`;
		console.log('請求 URL:', url);

		try {
			const response = await axios.get(url);
			const imagesResults = response.data.images_results as Photo[];

			if (imagesResults && imagesResults.length > 0) {
				const randomIndex = Math.floor(Math.random() * 10) + 1;
				return imagesResults[randomIndex].original;
			} else {
				console.log('未找到相關圖片');
				return '';
			}
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.error('獲取圖片時發生錯誤:', error.response?.data);
			} else {
				console.error('獲取圖片時發生未知錯誤:', error);
			}
			throw error;
		}
	}
}
