/* global Vue */
/* global questionnaire */

const Questionnaire = Vue.createApp({
  data() {
    return {
      questionnaire: questionnaire,
      categories: [],
      indexCourant: null,
      indexPrecedent: null,
      isTermine: false,
      reponses: {}
    }
  },
  mounted() {
    let categorie = null;
    let num = 0;
    this.questionnaire.questions.forEach(function (question, index) {
      if (question.type == 'categorie') {
        num = 0;
        categorie = question;
        this.categories.push({"name": question.libelle, "couleur": categorie.couleur, "questions": 0, "index": [index]})
        return;
      }
      if (categorie) {
        question.categorie_couleur = categorie.couleur;
        question.num = num;
        num++;

        const cat = this.categories.find(cat => cat.name === categorie.libelle);
        cat.questions += 1;
        cat.index.push(index)
      }
    }, this);

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
    updateCategorieProgress: function (categorie) {
      const selfIndex = this.categories.findIndex(cat => cat.name === categorie.name)
      const currentCategorie = this.categories.findIndex(cat => cat.index.includes(this.indexCourant) === true)

      if (selfIndex > currentCategorie) {
        return 0;
      }

      if (selfIndex < currentCategorie) {
        return 100;
      }

      return categorie.index.indexOf(this.indexCourant) * 100 / categorie.questions;
    },
    calculateCategorieWidth: function (categorie) {
      return Math.ceil((categorie.questions * 100)) / (this.questionnaire.questions.length - this.categories.length);
    },
    getReponsesIds: function() {
      return Object.keys(this.reponses);
    },
    getInitialNbQuestions: function() {
      return this.questionnaire.questions.length - this.categories.length;
    }
  }
});
Questionnaire.mount('#questionnaire');
