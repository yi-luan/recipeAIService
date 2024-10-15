"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
class Recipe {
    constructor(id, name, ingredients, instructions, creator, likes = 0) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.creator = creator;
        this.likes = likes;
    }
}
exports.Recipe = Recipe;
