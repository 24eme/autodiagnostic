var app = new Vue({
  el: '#app',
  data: {
    questionnaire: questionnaire,
    questionCourante: null
  },
  methods: {
    questionSuivante: function (event) {
      qKeyFind = (this.questionCourante === null);
      for(qKey in this.questionnaire.questions) {
        if(qKeyFind) {
          this.questionCourante = qKey;
          break;
        }
        if(qKey == this.questionCourante) {
          qKeyFind = true;
        }
      }
    },
    questionPrecedente: function (event) {
      qKeyPecedente = null;
      for(qKey in this.questionnaire.questions) {
        if(qKey == this.questionCourante) {
          this.questionCourante = qKeyPecedente;
          break;
        }
        qKeyPecedente = qKey;
      }
    }
  }
});
