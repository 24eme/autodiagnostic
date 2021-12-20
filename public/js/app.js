/* global Vue */
/* global questionnaire */

const Questionnaire = Vue.createApp({
  delimiters: ['{%', '%}'],
  data() {
    return {
      questionnaire: questionnaire,
      categories: [],
      indexCourant: null,
      indexPrecedent: null,
      isTermine: false,
      reponses: {},
      modeQuestionsNonRepondues: true,
      nombreQuestionsTotal: 0
    }
  },
  mounted() {
    let categorie = null;
    let num = 0;
    this.nombreQuestionsTotal = this.getQuestions().length;
    this.getQuestions().forEach(function (question, index) {
      if (question.type == 'categorie') {
        num = 0;
        categorie = question;
        this.categories.push({"id": question.id, "name": question.libelle, "couleur": categorie.couleur, "opacite": categorie.opacite, "couleur_texte": categorie.couleur_texte, "questions": 0, "index": [index]})
        return;
      }
      if (categorie) {
        question.categorie_couleur = categorie.couleur;
        question.categorie_couleur_texte = categorie.couleur_texte;
        question.num = num;
        num++;

        const cat = this.categories.find(cat => cat.name === categorie.libelle);
        cat.questions += 1;
        cat.index.push(index)
      }
      if (question.type == 'question' && question.multiple === true) {
        this.reponses[question.id] = [];
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
        index = this.nombreQuestionsTotal;
      } else {
        index = this.getQuestionIndex(url.hash.replace(/^#/, ''));
      }
      this.deplacer(index);
    },
    storeReponses: function(question = null) {
      this.gererReponsesAutomatiques(question);
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
    },
    gererReponsesAutomatiques: function(question = null) {
      if (question && question.reponses) {
        this.resetReponsesAutomatiques(question);
        let reponses = this.reponses;
        let reponse = reponses[question.id];
        if (!reponse) {
          return;
        }
        if (!Array.isArray(reponse)) {
          reponse = [reponse];
        }
        reponse.forEach(function(rep){
          let ind = question.reponses.findIndex(r => r.id == rep);
          if (ind >= 0) {
            let reponse = question.reponses[ind];
            if (reponse.reponses_automatiques) {
              for(let index in reponse.reponses_automatiques) {
                let valeur = reponse.reponses_automatiques[index];
                reponses[index] = valeur;
              }
            }
          }
        });
        this.reponses = reponses;
      }
    },
    resetReponsesAutomatiques: function(question) {
      let reponses = this.reponses;
      question.reponses.forEach(function(reponse) {
        if (reponse.reponses_automatiques) {
          for(let index in reponse.reponses_automatiques) {
            if (reponses[index]) {
              delete(reponses[index]);
            }
          }
        }
      });
      this.reponses = reponses;
    },
    getQuestionIndex: function(id) {
      return this.getQuestions().findIndex(q => q.id == id);
    },
    deplacer: function(index) {
      if(index < 0) {
        this.intro();
        return;
      }

      if(index > this.nombreQuestionsTotal - 1) {
        this.terminer();
        return;
      }

      if (this.modeQuestionsNonRepondues && index < this.nombreQuestionsTotal) {
        const question = this.questionnaire.questions[index]
        if (this.getReponsesIds().includes(question.id)) {
          return (index > this.indexCourant) ? this.deplacer(index + 1) : this.deplacer(index - 1);
        }
      }

      if(this.indexPrecedent === null) {
        this.indexPrecedent = index;
      } else {
        this.indexPrecedent = this.indexCourant;
      }

      var question = this.getQuestions()[index];
      this.updatePageInfos('#'+question.id, question.libelle);
      this.indexCourant = index;
      this.isTermine = false;
      if (document.querySelector('#question_' + question.id + ' input')) {
        setTimeout(function() {document.querySelector('#question_' + question.id + ' input').focus()}, 100);
      }
    },
    nonConcerne: function (index) {
      const q = this.getQuestions()[index]
      this.reponses[q.id] = "NC"
      this.storeReponses()
      this.deplacer(index + 1)
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
      this.clean(this.reponses)
      this.isTermine = true;
      this.indexCourant = this.nombreQuestionsTotal;
      this.updatePageInfos('#fin', 'Fin');
      this.storeReponses();
    },
    synthetiser: function() {
      let file = new File([localStorage.getItem('reponses')], "test.json", {type:"application/json"});
      let container = new DataTransfer();
      container.items.add(file);
      document.getElementById("jsonReponses").files = container.files;
      document.forms["synthetiserForm"].submit();
    },
    reset: function() {
      localStorage.clear();
      this.reponses = {}
      this.modeQuestionsNonRepondues = true;
      this.intro();
      var url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '#');
    },
    clean: function (obj) {
      Object.keys(obj).forEach((k) => obj[k] == "" && delete obj[k]);
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
      return Math.ceil((categorie.questions * 100)) / (this.nombreQuestionsTotal - this.categories.length);
    },
    getCategorieCouleur: function (index) {
      const question = this.questionnaire.questions[index]
      return (question.categorie_couleur) ? question.categorie_couleur : question.couleur;
    },
    getCategorieTexteCouleur: function (index) {
      const question = this.questionnaire.questions[index]
      return (question.categorie_couleur_texte) ? question.categorie_couleur_texte : question.couleur_texte;
    },
    getReponsesIds: function() {
      return Object.keys(this.reponses);
    },
    getInitialNbQuestions: function() {
      return this.nombreQuestionsTotal - this.categories.length;
    },
    hasQuestionsEnAttentesReponses: function () {
      return this.getInitialNbQuestions() !== this.getReponsesIds().length;
    },
    getQuestions: function() {
      return this.questionnaire.questions;
    },
    getProgress: function () {
      return Math.ceil((this.indexCourant) * 100 / this.nombreQuestionsTotal);
    },
    passerQuestionsEnAttentesReponses: function() {
      this.modeQuestionsNonRepondues = true;
      this.deplacer(0);
    },
    passerToutesQuestions: function() {
      this.modeQuestionsNonRepondues = false;
      this.deplacer(0);
    },
    switchModeQuestions: function () {
      this.modeQuestionsNonRepondues = ! this.modeQuestionsNonRepondues;
    }
  }
});
Questionnaire.mount('#questionnaire');
