import console from 'console';

export class RecipeService {
	constructor() {}

	async generateRecipe(ingredientNames: string[]): Promise<string> {
		console.log(ingredientNames);
		return 'recipe';
	}
}
