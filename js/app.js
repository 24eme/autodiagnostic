const Questionnaire = Vue.createApp({
  data() {
    return {
      questionnaire: questionnaire,
      indexCourant: null,
      indexPrecedent: null,
      isTermine: false,
      reponses: {}
    }
  },
  mounted() {
    if(localStorage.getItem('reponses')) {
      this.reponses = JSON.parse(localStorage.getItem('reponses'));
    }
    window.addEventListener('hashchange',this.hashChange);
    this.hashChange();
  },
  methods: {
    hashChange: function() {
      var url = new URL(window.location);
      if(!url.hash.replace(/^#/, '')) {
        this.gotoquestion(-1);
        return;
      }
      if(url.hash.replace(/^#/, '') == 'fin') {
        this.gotoquestion(this.questionnaire.questions.length);
        return;
      }
      this.deplacer(index);
    },
    storeReponses: function() {
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
    },
    getQuestionIndex: function(id) {
      for(index in this.questionnaire.questions) {
        if(this.questionnaire.questions[index].id == id) {
          return parseInt(index);
        }
      }
      return -1;
    },
    deplacer: function(index) {
      if(this.indexPrecedent === null) {
        this.indexPrecedent = index;
      } else {
        this.indexPrecedent = this.indexCourant;
      }
      if(index < 0) {
        this.intro();
        return;
      }
      if(index > this.questionnaire.questions.length - 1) {
        this.terminer();
        return;
      }
      var question = this.questionnaire.questions[index];

      document.title = 'Autodiagnostic - ' + question.libelle;
      var url = new URL(window.location);
      if(url.hash != '#'+question.id) {
        url.hash = question.id;
        history.pushState({}, question.libelle, url);
      }
      this.indexCourant = index;
      this.isTermine = false;
      this.storeReponses();
      setTimeout(function() {document.querySelector('#question_' + question.id + ' input').focus()}, 100);
    },
    intro: function() {
      this.isTermine = false;
      this.indexCourant = -1;
      var url = new URL(window.location);
      if(url.hash != "") {
        url.hash = "";
        history.pushState({}, "Autodiagnostic", url);
      }
    },
    terminer: function () {
      this.isTermine = true;
      this.indexCourant = this.questionnaire.questions.length;
      var url = new URL(window.location);
      if(url.hash != '#fin') {
        url.hash = "fin";
        history.pushState({}, "Autodiagnostic - Fin", url)
      }
      this.storeReponses();
    },
    reset: function() {
      localStorage.clear();
      this.intro();
      var url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '#');
    },
    getprogression: function() {
      return Math.round((this.indexCourant + 1) * 100 / this.questionnaire.questions.length);
    }
  }
});
Questionnaire.mount('#questionnaire');
