export class Question {
    id: string;
    tittle: string;
    description: string;
    score: number;
    theme: string;

    constructor(id: string, tittle: string, description: string, score: number, theme: string) {
        this.id = id;
        this.tittle = tittle;
        this.description = description;
        this.score = score;
        this.theme = theme;
    }
}