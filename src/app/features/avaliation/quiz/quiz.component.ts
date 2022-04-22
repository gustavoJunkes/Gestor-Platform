import { Question } from './../../../core/model/question.model';
import { Avaliation } from './../../../core/model/avaliation.model';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/model/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: Question[] = [];
  avaliation!: Avaliation;
  currentQuestion!: Question;
  currentCategory!: Category;
  quizForm!: FormGroup;
  categoryAverage!: number;
  currentQuestionIndex!: number;
  currentCategoryIndex!: number;
  questionsUsed: Question[] = [];
  categoriesUsed: Category[] = []
  isLastCategory: boolean = false;
  isFinished: boolean = false;

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {

    this.quizForm = this.formbuilder.group({
      answer: ['', Validators.required]
    })

    this.avaliation = new Avaliation("10", "Avaliação geral para teste", "Primeira avaliação que cadastramos", 0,
      [
        new Category("10", 0, "Financeiro", "Categoria que representa sua qualidade de vida financeira",
          [
            new Question("10", "Sobre investimentos", "Você possui investimentos para garantir seu patrimonio tararã?", 0, "Investimento"),
            new Question("20", "Sobre poupança", "Você possui um capital financeiro reservado para situações de necessidade?", 0, "Poupança"),
            new Question("20", "Sobre poupança", "Você possui um capital financeiro reservado para situações de necessidade no exterior?", 0, "Poupança"),
          ]),
        new Category("20", 0, "Saude", "Categoria que representa sua qualidade de vida em relação a sua saude",
          [
            new Question("10", "Sobre sua alimentação", "Você come ao menos 3 vezes ao dia?", 0, "Alimentação"),
            new Question("20", "Sobre Saude", "Você come frutas constantemente?", 0, "Alimentação")

          ])
      ]) //getquestions do backend
    this.currentCategory = this.avaliation.categories[0];
    this.currentQuestion = this.currentCategory.questions[0];
    this.categoryAverage = 50;
    this.currentQuestionIndex = 0;
    this.questions = this.currentCategory.questions;
    this.currentCategoryIndex = 0;
  }

  //metodo precisa de muita revisao
  getNextQuestion() {
    //passar pro front a proxima questao a ser exibida    
    //avaliar qual deve ser a proxima questão
    // se media da categoria esta baixa, mais perguntas sobre ela

    if (this.categoriesUsed.length === this.avaliation.categories.length) {
      this.isLastCategory = true;
    }
    this.calculateCategoryAverage();
    // valor minimo de perguntas que tem de ser feitas corresponde a metade das perguntas da categoria - ou definir em var global
    var minimalQuestion = 1; //this.currentCategory.questions.length / 2;
    console.log("current question index: "+this.currentQuestionIndex);
    if (this.categoryAverage < 50/*valor predefinido em variavel global */) {
      // busca outra questão da categoria    
      console.log("-1");
      this.currentQuestion = this.getAvaliationQuestion();
      this.questionsUsed.push(this.currentQuestion);
    } else if (this.currentQuestionIndex <= minimalQuestion) {
      // busca outra questao da categoria
      console.log("-2");
      this.goToNextQuestionOfCategoryOrChangeCategory();
    } else {
      // proxima categoria
      console.log("-3");
      if (this.isLastCategory) {
        this.isLastCategory = true;
      }
      this.changeToNextCategory();
    }

  }

  submitQuestion() {
    if (this.quizForm.valid) {
      window.alert("Enviado!, " + this.quizForm.controls['answer'].value);
      this.currentQuestion.score = this.quizForm.controls['answer'].value;
      this.getNextQuestion();
    }
  }

  isQuestionUsed(question: Question): boolean {
    var isUsed = this.questionsUsed.includes(question);

    return isUsed;
  }

  goToNextQuestionOfCategoryOrChangeCategory(): void{
    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.changeToNextCategory;
    } else {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  //@deprecate(goToNextQuestionOfCategoryOrChangeCategory, "This method is deprecated")
  getAvaliationQuestion(): Question {
    var isUsed = true;
    var question = this.currentQuestion;
    while (isUsed) {
      question = this.currentCategory.questions[this.currentQuestionIndex + 1];
      if (this.isQuestionUsed(question) === false) {
        isUsed = false;
      } else if (this.currentCategory.questions.length === this.questionsUsed.length) {
        this.changeToNextCategory();
      }
    }
    return question;
  }

  changeToNextCategory() {
    this.categoriesUsed.push(this.currentCategory);
    this.currentCategoryIndex++;
    this.currentCategory = this.avaliation.categories[this.currentCategoryIndex];
    this.currentQuestionIndex = 0;
    this.categoryAverage = 0;
    console.log("category index: " + this.currentCategoryIndex);
    console.log(this.currentCategory.questions)
    this.questions = this.currentCategory.questions;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }

  calculateCategoryAverage() {
    this.questionsUsed;
    var categoryScore = 0;
    if (this.questionsUsed.length > 1) {
      for (var i = 0; i < this.questionsUsed.length; i++) {
        categoryScore += this.questionsUsed[i].score;
      }
      console.log(categoryScore);
      this.categoryAverage = categoryScore / this.questionsUsed.length;
      console.log("category average: "+this.categoryAverage);
    }

  }
}
