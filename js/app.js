/* global Vue */
/* global questionnaire */

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
    let categorie = null;
    let num = 0;
    for(let i in this.questionnaire.questions) {
      if (this.questionnaire.questions[i].type == 'categorie') {
        num = 0;
        categorie = this.questionnaire.questions[i];
        continue;
      }
      if (categorie) {
        this.questionnaire.questions[i].categorie_couleur = categorie.couleur;
        this.questionnaire.questions[i].num = num;
        num++;
      }
    }
    if(localStorage.getItem('reponses')) {
      this.reponses = JSON.parse(localStorage.getItem('reponses'));
    }
    window.addEventListener('hashchange', this.hashChange);
    this.hashChange();
  },
  methods: {
    hashChange: function() {
      var url = new URL(window.location);
      var index = null;
      if(!url.hash.replace(/^#/, '')) {
        index = -1;
      } else if(url.hash.replace(/^#/, '') == 'fin') {
        index = this.questionnaire.questions.length;
      } else {
        index = this.getQuestionIndex(url.hash.replace(/^#/, ''));
      }
      this.deplacer(index);
    },
    storeReponses: function() {
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
    },
    getQuestionIndex: function(id) {
      for(let index in this.questionnaire.questions) {
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
      this.updatePageInfos('#'+question.id, question.libelle);
      this.indexCourant = index;
      this.isTermine = false;
      this.storeReponses();
      if (document.querySelector('#question_' + question.id + ' input')) {
        setTimeout(function() {document.querySelector('#question_' + question.id + ' input').focus()}, 100);
      }
    },
    updatePageInfos: function (hash, title) {
      let libelle = (title)? 'Autodiagnostic - ' + title : 'Autodiagnostic';
      document.title = libelle;
      var url = new URL(window.location);
      if(url.hash != hash) {
        url.hash = hash;
        history.pushState({}, libelle, url);
      }
    },
    intro: function() {
      this.isTermine = false;
      this.indexCourant = -1;
      this.updatePageInfos('', '');
    },
    terminer: function () {
      this.isTermine = true;
      this.indexCourant = this.questionnaire.questions.length;
      this.updatePageInfos('#fin', 'Fin');
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
