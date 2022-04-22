import { Question } from "./question.model";

export class Category {
    id: string;
    score: number;
    categoryName: string;
    description: string;
    questions: Question[];

    constructor(id: string, score: number, categoryName: string, description: string, questions: Question[]) {
        this.id = id;
        this.score = score;
        this.categoryName = categoryName;
        this.description = description;
        this.questions = questions;
    }
}