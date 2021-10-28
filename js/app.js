var app = new Vue({
  el: '#app',
  data: {
    questionnaire: questionnaire,
    questionCouranteKey: null,
    isTermine: false,
    reponses: {}
  },
  created: function() {
    this.loadReponses();
    window.addEventListener('hashchange',this.hashChange);
    this.hashChange();
  },
  methods: {
    hashChange: function() {
      var url = new URL(window.location);
      if(!url.hash.replace(/^#/, '')) {
        this.questionCouranteKey = null;
        return;
      }
      if(url.hash.replace(/^#/, '') == 'fin') {
        return this.terminer();
      }
      this.questionCouranteKey = url.hash.replace(/^#/, '');
      this.loadQuestionCourante();
    },
    loadQuestionCourante: function() {
      document.title = 'Autodiagnostic - ' + this.getQuestionCourante().libelle;
      const url = new URL(window.location);
      if(url.hash != '#'+this.questionCouranteKey) {
        url.hash = this.questionCouranteKey;
        history.pushState({}, this.getQuestionCourante().libelle, url);
      }
      this.isTermine = false;
    },
    getQuestionCouranteIndex: function() {

      return Object.keys(this.questionnaire.questions).indexOf(this.questionCouranteKey);
    },
    getNumeroQuestion: function(questionKey) {

      return Object.keys(this.questionnaire.questions).indexOf(questionKey) + 1;
    },
    getQuestionCourante: function() {

      return this.questionnaire.questions[this.questionCouranteKey];
    },
    changeQuestion: function(index) {
      this.questionCouranteKey = Object.keys(this.questionnaire.questions)[index];
      if(this.questionCouranteKey == undefined) {
        this.questionCouranteKey = null;
      }
      this.loadQuestionCourante()
    },
    getNbQuestions: function() {

      return Object.keys(this.questionnaire.questions).length;
    },
    isLastQuestion: function() {

      return this.getNumeroQuestion(this.questionCouranteKey) >= this.getNbQuestions();
    },
    questionSuivante: function (event) {
      if(this.isLastQuestion()) {
        return this.terminer();
      }
      this.storeReponses();
      this.changeQuestion(this.getQuestionCouranteIndex() + 1);
    },
    questionPrecedente: function (event) {
      this.storeReponses();
      this.changeQuestion(this.getQuestionCouranteIndex() - 1);
    },
    loadReponses: function() {
      if(localStorage.getItem('reponses')) {
        this.reponses = JSON.parse(localStorage.getItem('reponses'));
      }
      for(qKey in this.questionnaire.questions) {
        if(this.reponses[qKey]) {
          continue;
        }
        this.reponses[qKey] = null;
      }
    },
    storeReponses: function(event) {
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
    },
    reset: function() {
      localStorage.clear();
      const url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '');
    },
    terminer: function (event) {
      this.storeReponses();
      this.isTermine = true;
      this.questionCouranteKey = Object.keys(this.questionnaire.questions)[this.getNbQuestions - 1];
      const url = new URL(window.location);
      if(url.hash != '#fin') {
        url.hash = "fin";
        history.pushState({}, "Autodiagnostic - Fin", url)
      }
    }
  }
});
