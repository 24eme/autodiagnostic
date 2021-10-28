var app = new Vue({
  el: '#app',
  data: {
    questionnaire: questionnaire,
    questionCouranteKey: null
  },
  created: function() {
    window.addEventListener('hashchange',this.hashChange);
    this.hashChange();
  },
  methods: {
    hashChange: function() {
      var url = new URL(window.location);
      if(!url.hash.replace(/^#/, '')) {
        return;
      }
      this.questionCouranteKey = url.hash.replace(/^#/, '');
      this.loadQuestionCourante();
    },
    loadQuestionCourante: function() {
      document.title = 'Autodiagnostic - ' + this.getQuestionCourante().libelle;
      const url = new URL(window.location);
      url.hash = this.questionCouranteKey;
      history.pushState({}, this.getQuestionCourante().libelle, url)
    },
    getQuestionCouranteIndex: function() {
      keys = Object.keys(this.questionnaire.questions);

      return keys.indexOf(this.questionCouranteKey);
    },
    getNumeroQuestion: function() {

      return this.getQuestionCouranteIndex() + 1;
    },
    getQuestionCourante: function() {

      return this.questionnaire.questions[this.questionCouranteKey];
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
      this.questionCouranteKey = keys[this.getQuestionCouranteIndex() + 1];
      this.loadQuestionCourante()
    },
    questionPrecedente: function (event) {
      this.questionCouranteKey = keys[this.getQuestionCouranteIndex() - 1];
      this.loadQuestionCourante();
    },
    terminer: function (event) {

    }
  }
});
