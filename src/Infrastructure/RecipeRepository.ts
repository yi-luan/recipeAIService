import console from 'console';
import { Recipe } from '../Domain/Entity/Recipe';

export class RecipeRepository {
	constructor() {}

	async save(recipe: Recipe): Promise<Recipe> {
		// 實現保存邏輯
		console.log(recipe);
		return recipe;
		// 返回保存的食譜
	}

	async findById(): Promise<Recipe | null> {
		// 實現查詢邏輯
		const recipe: Recipe = new Recipe('', [], []);
		return recipe;
		// 返回查詢到的食譜，如果沒有找到則返回 null
	}
}
