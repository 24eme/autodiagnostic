var app = new Vue({
  el: '#app',
  data: {
    questionnaire: questionnaire,
    questionCourante: null
  },
  methods: {
    isLastQuestion: function() {
      keys = Object.keys(this.questionnaire.questions);
      index = keys.indexOf(this.questionCourante);
      console.log(index);
      console.log(index >= keys.length - 1);
      return index >= keys.length - 1;
    },
    questionSuivante: function (event) {
      if(this.isLastQuestion()) {
        this.terminer();
      }
      keys = Object.keys(this.questionnaire.questions);
      index = keys.indexOf(this.questionCourante);
      this.questionCourante = keys[index + 1];
    },
    questionPrecedente: function (event) {
      keys = Object.keys(this.questionnaire.questions);
      index = keys.indexOf(this.questionCourante);
      this.questionCourante = keys[index - 1];
    },
    terminer: function (event) {

    }
  }
});
