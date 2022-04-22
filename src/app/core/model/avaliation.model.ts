import { Category } from "./category.model";

export class Avaliation {
    id: string;
    tittle: string;
    description: string;
    score: number;
    categories: Category[]

    constructor(id: string, tittle: string, description: string, score: number, categories: Category[]){
        this.id = id;
        this.tittle = tittle;
        this.description = description;
        this.score = score;
        this.categories = categories;
    }
}