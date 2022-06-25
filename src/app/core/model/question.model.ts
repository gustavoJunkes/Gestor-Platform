export class Question {
    id: string;
    tittle: string;
    description: string;
    score: number;
    theme: string;
    isNegative: boolean; // defines if the question is a negative so bigger the answer smaller is the score.

    constructor(id: string, tittle: string, description: string, score: number, theme: string, isNegative: boolean) {
        this.id = id;
        this.tittle = tittle;
        this.description = description;
        this.score = score;
        this.theme = theme;
        this.isNegative = isNegative;
    }
}