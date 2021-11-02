const Questionnaire = Vue.createApp({
  data() {
    return {
      questionnaire: questionnaire,
      questionCouranteKey: null,
      isTermine: false,
      reponses: []
    }
  },
  mounted() {
    if(localStorage.getItem('reponses')) {
      this.reponses = localStorage.getItem('reponses');
    }
    var url = new URL(window.location);
    if(!url.hash.replace(/^#/, '')) {
      this.questionCouranteKey = null;
      return;
    }
    if(url.hash.replace(/^#/, '') == 'fin') {
      return this.terminer();
    }
    this.gotoquestion(url.hash.replace(/^#/, ''));
  },
  methods: {
    storeReponses: function(event) {
      localStorage.setItem('reponses', this.reponses);
    },
    gotoquestion: function(index) {
      document.title = 'Autodiagnostic - ' + this.questionnaire.questions[index].libelle;
      const url = new URL(window.location);
      if(url.hash != '#'+index) {
        url.hash = index;
        history.pushState({}, this.questionnaire.questions[index].libelle, url);
      }
      this.questionCouranteKey = index;
      this.isTermine = false;
    },
    terminer: function () {
      this.isTermine = true;
      this.questionCouranteKey = null;
      var url = new URL(window.location);
      if(url.hash != '#fin') {
        url.hash = "fin";
        history.pushState({}, "Autodiagnostic - Fin", url)
      }
    },
    reset: function() {
      localStorage.clear();
      this.isTermine = false;
      this.questionCouranteKey = null;
      var url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '');
    },
    getprogression: function() {
      return Math.round((this.questionCouranteKey + 1) * 100 / this.questionnaire.questions.length);
    }
  }
});
Questionnaire.mount('#questionnaire');
