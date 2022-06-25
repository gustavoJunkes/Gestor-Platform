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
        new Category("20", 0, "Saude", "Categoria que representa sua qualidade de vida em relação a sua saude",
          [
            new Question("10", "Sobre sua alimentação", "Eu costumo comer o que me agrada, não necessariamente o que deveria", 0, "Alimentação", true),
            new Question("20", "Sobre exercícios físicos", "Eu pratico exercícios físicos regulares", 0, "Exercícios físicos", false),
            new Question("20", "Sobre Saude", "Estou satisfeito com minha saúde física", 0, "Saude", false),
            new Question("20", "Sobre Saude", "Possuo problemas de saúde", 0, "Saude", true)

          ]),
        new Category("10", 0, "Financeiro", "Categoria que representa sua qualidade de vida financeira",
          [
            new Question("10", "Sobre Dinheiro", "Estou satisfeito com a minha condição financeira atual", 0, "Dinheiro", false),
            new Question("20", "Sobre segurança financeira", "Eu possuo reservas financeiras básicas para me proteger de eventos inesperados", 0, "Segurança financeira", false),
            new Question("20", "Sobre segurança financeira", "Eu possuo mais de uma fonte de renda", 0, "Segurança financeira", false),
            new Question("20", "Sobre Dinheiro", "Deixo de fazer coisas que gostaria por falta de dinheiro", 0, "Dinheiro", true)
          ]),
        new Category("10", 0, "Social", "Categoria que representa sua qualidade de vida social",
          [
            new Question("10", "Sobre encontros sociais", "Eu costumo ser convidado para eventos sociais", 0, "Encontros sociais", false),
            new Question("20", "Sobre encontros sociais", "Costumo aceitar quando amigos me convidam para atividades diferentes", 0, "Encontros sociais", false),
            new Question("20", "Sobre vida social", "Estou feliz com a imagem que as pessoas têm de mim", 0, "Vida social", false),
            new Question("20", "Sobre vida social", "Sei a imagem que as pessoas têm sobre mim", 0, "Vida social", false),
            new Question("20", "Sobre relacionamentos", "Possuo amigos de quem realmente gosto", 0, "Relacionamentos", false)
          ]),  
        new Category("10", 0, "Mental", "Categoria que representa sua qualidade de vida mental",
          [
            new Question("10", "Sobre confiança", "Estou satisfeito com minha aparência fisica", 0, "Encontros sociais", false),
            new Question("20", "Sobre confiança", "Me considero uma pessoa autoconfiante", 0, "Encontros sociais", false),
            new Question("20", "Sobre confiança", "Tenho conhecimento do meu eu ideal", 0, "Vida social", false),
            new Question("20", "Sobre família", "Possuo problemas familiares", 0, "Relacionamentos", true), // algumas questões deveriam ter mais de um theme
            new Question("20", "Sobre saude mental", "Estou feliz com minha vida em geral", 0, "Saude mental", false),
            new Question("20", "Sobre hobbies", "Possuo um hobby que pratico e me destaco", 0, "Saude mental", false),
            new Question("20", "Sobre saude mental", "Me sinto irritado com facilidade", 0, "Frustação e ansiedade", true),
            new Question("20", "Sobre confiança", "Frequentemente me sinto ansioso a respeito das coisas", 0, "Frustação e ansiedade", true),
            new Question("20", "Sobre saude mental", "Me considero higiênico", 0, "Higiene pessoal, confiança, frustração", false),
            new Question("20", "Sobre saude mental", "Frequentemente me sinto injustiçado", 0, "Frustração e ansiedade", true),
            new Question("20", "Sobre saude mental", "Frequentemente as coisas parecem dar errado para mim", 0, "Frustração", true),
            new Question("20", "Sobre saude mental", "Frequentemente me sinto sozinho", 0, "ansiedade, vazio", true)
          ]),    
        new Category("10", 0, "Conciência", "Categoria que representa sua qualidade de vida de consiência moral",
          [
            new Question("10", "Sobre conduta", "Estou satisfeito com minha conduta", 0, "Conciência", false),
            new Question("20", "Sobre conduta", "Me considero uma pessoa íntegra ", 0, "Conciência", false),
            new Question("20", "Sobre conduta", "Me considero uma pessoa justa", 0, "Conciência", false),
            new Question("20", "Sobre conduta", "Me considero uma pessoa honesta", 0, "Conciência", false)
          ]),
        new Category("10", 0, "Propósito", "Categoria que representa sua percepção de propósito",
          [
            new Question("10", "Sobre conduta", "Não vejo propósito na vida", 0, "Conciência", true),
            new Question("20", "Sobre conduta", "Possuo uma ideia clara do meu proposito em vida ", 0, "Conciência", false),
            new Question("20", "Sobre conduta", "Ao meu ver, minha existência contribui para a humanidade", 0, "Conciência", false)
          ]),            
          // TODO: esquema condicional de perguntas. Por exemplo, uma pergunta que dependendo da pontuação de sua resposta, outra será ou não feita. Como as questoes da categoria proposito.
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
      
    }
    if (this.currentCategoryIndex === this.avaliation.categories.length - 1) {
      this.isLastCategory = true;
      console.log("last category in bout")
    }

    if (this.isLastCategory && this.questionsUsed.length === this.questions.length) {
      this.isFinished = true;
    }
    this.calculateCategoryAverage();
    // valor minimo de perguntas que tem de ser feitas corresponde a metade das perguntas da categoria - ou definir em var global
    var minimalQuestion = 1; //this.currentCategory.questions.length / 2;
    console.log("current question index: "+this.currentQuestionIndex);
    if (this.categoryAverage < 50/*valor predefinido em variavel global */) {
      // busca outra questão da categoria    
      console.log("-1");
      this.goToNextQuestionOfCategoryOrChangeCategory();
      this.questionsUsed.push(this.currentQuestion);
    } else if (this.currentQuestionIndex <= minimalQuestion) {
      // busca outra questao da categoria
      console.log("-2");
      this.goToNextQuestionOfCategoryOrChangeCategory();
    } else {
      // proxima categoria
      console.log("-3");
      
      this.changeToNextCategory();
    }
    if (this.isLastCategory && this.questionsUsed.length === this.questions.length) {
      this.isFinished = true;
    }
    
  }
  
  submitQuestion() {
    if (this.quizForm.valid && !this.isFinished) {
      //window.alert("Enviado!, " + this.quizForm.controls['answer'].value);
      var score = this.quizForm.controls['answer'].value;

      if(this.currentQuestion.isNegative) {
        score = 100 - score; // inverte a pontuação  
      }      
      this.currentQuestion.score = score;
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
