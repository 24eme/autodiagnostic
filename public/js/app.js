/* global Vue */
const currentCampagne = campagne;
const file = 'data/questionnaire.'+currentCampagne+'.yml'
const lastCampagne = currentCampagne-1;

const Questionnaire = Vue.createApp({
  delimiters: ['{%', '%}'],
  data() {
    return {
      questionnaire: {questions:[]},
      categories: [],
      indexCourant: null,
      indexPrecedent: null,
      isTermine: false,
      reponses: {},
      modeQuestionsNonRepondues: false,
      nombreQuestionsTotal: 0,
      lastCampagneReponse: ''
    }
  },
  mounted() {
    // @See https://github.com/bedakb/vue-typeahead-component/blob/master/src/components/Typeahead.vue#L55
    // @See https://github.com/bedakb/vue-typeahead-component/blob/master/src/components/Typeahead.vue#L83
    this.loadQuestions(file)
    window.addEventListener('hashchange', this.hashChange);
    fetch('/api/reponses/' + lastCampagne)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network not ok');
        }
        return response.json();
      })
      .then(data => {
        this.lastCampagneReponse = data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  },
  computed: {
    questionnaireStarted() {
      return this.getReponsesIds().length > 0
    }
  },
  methods: {
    init: function() {
      let categorie = null;
      let num = 0;
      this.nombreQuestionsTotal = this.getQuestions().length;

      if(localStorage.key('reponses')) {
        var json = JSON.parse(localStorage.getItem('reponses'));
        if(!json["CAMPAGNE"] || json["CAMPAGNE"] != currentCampagne){
          localStorage.clear();
          this.reponses = {};
        }
      }

      this.reponses["CAMPAGNE"] = currentCampagne;

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
          question.categorie_libelle = categorie.libelle;
          question.categorie_id = categorie.id;
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

      if (localStorage.key('reponses')) {
        this.reponses = JSON.parse(localStorage.getItem('reponses'));
        this.cleanOldQuestions()
      }
    },
    loadQuestions: function(file) {
      fetch(file)
        .then(stream => stream.text())
        .then(data => this.questionnaire = jsyaml.load(data))
        .then(() => this.init())
        .then(() => this.hashChange())
        .catch(function(error) {
          document.body.innerHTML = '';
          document.body.appendChild(
            document.createTextNode('Error: ' + error.message + '(L' + error.lineNumber + ' C' + error.columnNumber + ')')
          );
        })
    },
    hashChange: function() {
      const url = new URL(window.location);
      let index = null;

      if(!url.hash.replace(/^#/, '')) {
        index = -1;
      } else if(url.hash.replace(/^#/, '') == 'fin') {
        index = this.nombreQuestionsTotal;
      } else if(url.hash.startsWith('#start')) {
        this.continuerQuestions();
        return;
      } else {
        index = this.getQuestionIndex(url.hash.replace(/^#/, ''));
      }

      this.indexCourant = index
      this.deplacer(index, true);
    },
    storeReponses: function(question = null, deplacer = false) {
      this.gererReponsesAutomatiques(question);
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
      if (question && deplacer) {
        this.deplacer(this.getQuestionIndex(question.id) + 1);
      }
    },
    cleanOldQuestions: function() {
      const oldQuestions = Object.keys(this.reponses).filter((qId) => qId.substr(0,4) !== 'DTL_' && this.getQuestionIndex(qId) === -1)
      oldQuestions.forEach((id) => delete this.reponses[id])
    },
    gererReponsesAutomatiques: function(question = null) {
      if (question && question.reponses) {
        this.resetReponsesAutomatiques(question);
        let reponse = this.reponses[question.id];
        if (!reponse) {
          return;
        }
        if (!Array.isArray(reponse)) {
          reponse = [reponse];
        }
        const self = this;
        reponse.forEach(function(rep){
          let ind = question.reponses.findIndex(r => r.id == rep);
          if (ind >= 0) {
            let reponse = question.reponses[ind];
            if (reponse.reponses_automatiques) {
              for(let index in reponse.reponses_automatiques) {
                let valeur = reponse.reponses_automatiques[index];
                self.reponses[index] = valeur;
                self.gererReponsesAutomatiques(self.getQuestions()[self.getQuestionIndex(index)]);
              }
            }
          }
        });
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
    getLastQuestionRepondueIndex: function() {
      let lastIndex = -1;
      let questionsAutomatique = [];
      for(let index in this.questionnaire.questions) {
        let question = this.questionnaire.questions[index];
        if(question.type == 'categorie') {
          continue;
        }
        if(this.getReponsesIds().includes(question.id) && question.reponses) {
          for(let indexReponse in question.reponses) {
            let reponseConfig = question.reponses[indexReponse];
            if(reponseConfig.id != this.reponses[question.id]) {
              continue;
            }
            for(let idAuto in reponseConfig.reponses_automatiques) {
              questionsAutomatique.push(idAuto);
            }
          }

        }
        if(!this.getReponsesIds().includes(question.id)) {
          continue;
        }
        if(questionsAutomatique.includes(question.id)) {
          continue;
        }
        lastIndex = index;
      }

      return lastIndex*1;
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
        const question = this.questionnaire.questions[index];

        // On check si c'est une categorie et que toutes les questions sont répondues
         if (question.type === 'categorie' && this.categorieFullAnswered(question.id)) {
           return (index > this.indexCourant) ? this.deplacer(index + 1) : this.deplacer(index - 1);
         }

        // On check si il y a une réponse, ou s'il y a un tableau vide (checkbox)
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

      /*Prérempli les questions avec prérempli à true*/
      if(!this.lastCampagneReponse){
        return;
      }
      const keys = Object.keys(JSON.parse(JSON.stringify(this.lastCampagneReponse)));
      var tabSousReponses;
      for(var key in keys){
        if(!question.prerempli){
          continue
        }
        if(keys[key] != question.id){
          continue
        }
        if(!question.multiple){
          if(!this.reponses[keys[key]]){
            this.reponses[keys[key]] = this.lastCampagneReponse[keys[key]];
          }
          continue
        }else{
          if(!this.reponses[keys[key]].length){
            var reponsesArray = this.lastCampagneReponse[keys[key]].slice(0, Math.ceil(this.lastCampagneReponse[keys[key]].length / 2)); //on récupere la première moitié  du tableau qui correspondent aux réponses (la deuxième moitié correspon aux libelle)
            tabSousReponses = reponsesArray
            this.reponses[keys[key]] = reponsesArray;
          }

          tabSousReponses = Object.assign({}, tabSousReponses); //proxy object to object pour récupérer les réponses

          if(question.reponses && tabSousReponses){ //s'il y a des sous réponses aux questions multiple :
            for(var sousReponse in tabSousReponses){
              if(!question.reponses[sousReponse].question){
                continue
              }
              if(!this.reponses[question.reponses[sousReponse].question.id]){
                this.reponses[question.reponses[sousReponse].question.id] = this.lastCampagneReponse[question.reponses[sousReponse].question.id]
              }
            }
          }
        }
      }
      localStorage.setItem('reponses', JSON.stringify(this.reponses));
    },
    categorieFullAnswered: function (id) {
      const categorie = this.categories.findIndex(c => c.id === id)

      // Est-ce que chaque question de la categorie sont dans les réponses ?
      return this.categories[categorie].index.every(function (qIndex, arrayIndex) {
        if (arrayIndex === 0) return true; // Le premier élément est la catégorie
                                           // donc pas dans le tab de réponses

        const questionId = this.getQuestions()[qIndex].id
        return this.getReponsesIds().includes(questionId);
      }, this)
    },
    nonConcerne: function (index) {
      const q = this.getQuestions()[index];

      (Array.isArray(this.reponses[q.id]))
        ? this.reponses[q.id] = ["NC"]
        : this.reponses[q.id] = "NC"

      this.storeReponses()
      this.deplacer(index + 1)
    },
    isNonConcerne: function (index) {
      const q = this.getQuestions()[index];
      const r = Vue.toRaw(this.reponses[q.id])

      const equals = (a, b) =>
        a.length === b.length &&
        a.every((v, i) => v === b[i]);

      return (Array.isArray(r))
        ? equals(r, ["NC"])
        : r === "NC"
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
      if(this.getLastQuestionRepondueIndex() == this.nombreQuestionsTotal - 1) {
        this.terminer();
        return;
      }
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
      localStorage.clear();
    },
    synthetiser: function() {
      let file = new File([localStorage.getItem('reponses')], "reponses.json", {type:"application/json"});
      let container = new DataTransfer();
      container.items.add(file);
      document.getElementById("jsonReponses").files = container.files;
      document.forms["synthetiserForm"].submit();
    },
    reset: function() {
      if(!confirm('Étes-vous sûr de vouloir effacer toutes vos réponses ?')) {
        return;
      }
      localStorage.clear();
      this.reponses = {}
      this.modeQuestionsNonRepondues = false;
      this.intro();
      var url = new URL(window.location);
      document.location = url.href.replace(/#.*/, '#');
    },
    clean: function (obj) {
      Object.keys(obj).forEach(function (k) {
        if (obj[k] === "") delete obj[k];
        if (Array.isArray(obj[k]) && obj[k].length > 1 && obj[k].includes('NC')) {
          const key = obj[k].findIndex(el => el === 'NC')
          obj[k].splice(key, 1)
        }
      });
    },
    updateCategorieProgress: function (categorie) {
      if (this.isTermine) {
        return 100;
      }

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

      if (typeof question !== "undefined") {
        return (question.categorie_couleur) ? question.categorie_couleur : question.couleur;
      }
    },
    getCategorieTexteCouleur: function (index) {
      const question = this.questionnaire.questions[index]

      if (typeof question !== "undefined") {
        return (question.categorie_couleur_texte) ? question.categorie_couleur_texte : question.couleur_texte;
      }
    },
    getRealReponses: function() {
      let reponses = {};
      Object.keys(this.reponses).forEach(key => {
        if (key == 'CAMPAGNE') {
          return;
        }
        if (key.substr(0,4) == 'DTL_') {
          return;
        }
        if (!Array.isArray(this.reponses[key]) || this.reponses[key].length > 0) {
          reponses[key] = this.reponses[key];
        }
      });
      return reponses;
    },
    getReponsesIds: function() {
      return Object.keys(this.getRealReponses());
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
      return Math.ceil((this.getReponsesIds().length) * 100 / this.getInitialNbQuestions());
    },
    passerQuestionsEnAttentesReponses: function() {
      this.modeQuestionsNonRepondues = true;
      this.indexCourant = -1;
      this.deplacer(0);
    },
    verifierQuestions: function() {
      this.modeQuestionsNonRepondues = false;
      this.deplacer(0);
    },
    continuerQuestions: function() {
      this.modeQuestionsNonRepondues = false;
      this.deplacer(this.getLastQuestionRepondueIndex() + 1);
    },
    switchModeQuestions: function () {
      this.modeQuestionsNonRepondues = ! this.modeQuestionsNonRepondues;
    },
    formatNumber: function (value) {
      if (isNaN(Number(value))) {
        return;
      }

      if (Number.parseInt(value) === Number(value)) {
        value = Number(value).toFixed(2);
        return value;
      }

      if (value.toString().split('.')[1].length <= 2) {
        value = Number(value).toFixed(2)
        return value;
      }

      if (value.toString().split('.')[1].length <= 4 || value.toString().split('.')[1].length > 4) {
        value = Number(value).toFixed(4)
        return value;
      }
    }
  }
});

Questionnaire.use(Maska)
Questionnaire.mount('#questionnaire');
