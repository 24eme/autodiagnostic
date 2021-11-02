const Questionnaire = Vue.createApp({
  data() {
    return {
      questionnaire: questionnaire,
      indexCourant: null,
      isTermine: false,
      reponses: []
    }
  },
  mounted() {
    if(localStorage.getItem('reponses')) {
      this.reponses = localStorage.getItem('reponses');
    }
    window.addEventListener('hashchange',this.hashChange);
    this.hashChange();
  },
  methods: {
    hashChange: function() {
      var url = new URL(window.location);
      if(!url.hash.replace(/^#/, '')) {
        this.indexCourant = null;
        return;
      }
      if(url.hash.replace(/^#/, '') == 'fin') {
        return this.terminer();
      }
      this.gotoquestion(this.getQuestionIndex(url.hash.replace(/^#/, '')));
    },
    storeReponses: function(event) {
      localStorage.setItem('reponses', this.reponses);
    },
    getQuestionIndex: function(id) {
      for(index in this.questionnaire.questions) {
        if(this.questionnaire.questions[index].id == id) {

          return index;
        }
      }

      return null;
    },
    gotoquestion: function(index) {
      if(index < 0) {
        this.indexCourant = null;
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
    },
    terminer: function () {
      this.isTermine = true;
      this.indexCourant = null;
      var url = new URL(window.location);
      if(url.hash != '#fin') {
        url.hash = "fin";
        history.pushState({}, "Autodiagnostic - Fin", url)
      }
    },
    reset: function() {
      localStorage.clear();
      this.isTermine = false;
      this.indexCourant = null;
      var url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '');
    },
    getprogression: function() {
      return Math.round((this.indexCourant + 1) * 100 / this.questionnaire.questions.length);
    }
  }
});
Questionnaire.mount('#questionnaire');
