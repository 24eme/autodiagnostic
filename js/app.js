var app = new Vue({
  el: '#app',
  data: {
    questionnaire: questionnaire,
    questionCourante: null,
  },
  methods: {
    getQuestionCouranteIndex: function() {
      keys = Object.keys(this.questionnaire.questions);

      return keys.indexOf(this.questionCourante);
    },
    getNumeroQuestion: function() {

      return this.getQuestionCouranteIndex() + 1;
    },
    getNbQuestions: function() {

      return Object.keys(this.questionnaire.questions).length - 1;
    },
    isLastQuestion: function() {

      return this.getNumeroQuestion() >= this.getNbQuestions();
    },
    questionSuivante: function (event) {
      if(this.isLastQuestion()) {
        return this.terminer();
      }

      this.questionCourante = keys[this.getQuestionCouranteIndex() + 1];
    },
    questionPrecedente: function (event) {

      this.questionCourante = keys[this.getQuestionCouranteIndex() - 1];
    },
    terminer: function (event) {

    }
  }
});
