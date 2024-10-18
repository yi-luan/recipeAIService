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
	private flickrApiKey: string | undefined;
	constructor() {
		this.serpApiKey = process.env.SerpApi_API_Key;
		this.serpApiDomain = process.env.SerpApi_GoogleSearch_Domain;
		this.flickrApiKey = process.env.Flickr_API_Key;
	}

	// @Get('/dishPhoto/{dishName}')
	// async getPhotoByDishName(dishName: string): Promise<Photo | string> {
	// 	console.log('接收到的 dishName:', dishName);
	// 	const encodedDishName = encodeURIComponent(dishName);
	// 	const url = `${this.serpApiDomain}&q=${encodedDishName}&api_key=${this.serpApiKey}`;
	// 	console.log('請求 URL:', url);

	// 	try {
	// 		const response = await axios.get(url);
	// 		const imagesResults = response.data.images_results as Photo[];

	// 		if (imagesResults && imagesResults.length > 0) {
	// 			const randomIndex = Math.floor(Math.random() * 10) + 1;
	// 			return imagesResults[randomIndex].original;
	// 		} else {
	// 			console.log('未找到相關圖片');
	// 			return '';
	// 		}
	// 	} catch (error) {
	// 		if (axios.isAxiosError(error)) {
	// 			console.error('獲取圖片時發生錯誤:', error.response?.data);
	// 		} else {
	// 			console.error('獲取圖片時發生未知錯誤:', error);
	// 		}
	// 		throw error;
	// 	}
	// }

	@Get('/dishPhoto/{dishName}')
	async getPhotoByDishName(dishName: string): Promise<Photo> {
		try {
			const encodedDishName = encodeURIComponent(dishName);
			const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.flickrApiKey}&text=${encodedDishName}&format=json&nojsoncallback=1&per_page=10`;

			const response = await axios.get(url, {
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
					Accept: 'application/json, text/plain, */*',
					'Accept-Language': 'en-US,en;q=0.9',
					Referer: 'https://www.flickr.com/',
				},
			});

			if (
				response.data.photos &&
				response.data.photos.photo &&
				response.data.photos.photo.length > 0
			) {
				console.log('圖片網址:', response.data.photos.photo);
				const randomIndex = Math.floor(Math.random() * response.data.photos.photo.length);
				const photo = response.data.photos.photo[randomIndex];
				const photoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
				return { original: photoUrl, queryString: dishName } as Photo;
			} else {
				return null;
			}
		} catch (error) {
			console.error('Error fetching photo from Flickr:', error);
			return null;
		}
	}
}
