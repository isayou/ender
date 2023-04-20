class Question {
    constructor(text, choices, answer, image) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
      this.image = image;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question(
      "Bonsoir. Ne cherche pas a savoir qui je suis, ceci est une perte de temps, tes parents sont absent ce soir, tu vas faire tout ce que je te demande afin de survivre.",
      ["Très bien je le ferai", "Non sans façon", "Ignorer le message"],
      "Très bien je le ferai",
      "https://cdn.discordapp.com/attachments/932683089077997588/1098690666671915109/Capture_decran_2023-03-24_a_16.34.34.png"
    ),
    new Question(
      "Sors de ta chambre et vas dans la cuisine.",
      ["Aller dans la cuisine","Ne pas y aller", "Ignorer le message"],
      "Aller dans la cuisine",
      "https://www.gamepur.com/wp-content/uploads/wp-content/uploads/2022/10/03080656/42-Edgefield-Road-Phasmophobia-850x478.jpg"
    ), 
    new Question("Comme tu peux le voir, il y a rien dans cette pièce. Retourne dans ta chambre.", 
    ["Retourner dans la chambre","Ne pas y aller", "Ignorer le message"], 
    "Retourner dans la chambre()",
    "https://progameguides.com/wp-content/uploads/2022/06/Phasmophobia-Deogen-Loop-Tanglewood-Kitchen.jpg?resize=900%2C506"
    ),
    new Question("Maintenant que tu as trouvé la citrouille vas dans la chambre de tes parents.",
     ["Répondre que je veux arrêter le jeu","Y aller", "Ignorer le message"],
      "Répondre que je veux arrêter le jeu",
      "https://astucejeuxps4.com/wp-content/uploads/2022/10/1665473389_220_Tous-les-bonbons-dHalloween-et-Jack-o-Lanterns-sur-Willow-Street-dans.jpg"
      ),
      new Question("Hors de question, c'est moi qui décide quand le jeu fini.",
     ["Aller dans la chambre des parents","Refuser", "Ignorer le message"],
      "Répondre que je veux arrêter le jeu",
      "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/06/phasmophobia-900x506.jpg"
      ),
      new Question("Il n'y a rien ici, vas dans le garage.",
     ["Aller dans le garage","Ne pas y aller", "Ignorer le message"],
      "Aller dans le garage",
      "https://preview.redd.it/photoshoot-featuring-tanglewood-street-house-v0-ukq2lpoylmt81.jpg?width=640&crop=smart&auto=webp&s=b8decadabcd3701aa3ed164fd16ccb43e2d1e690"
      ),
      new Question("Le compteur est a 0 il n'y a plus de lumière chez toi.",
     ["Laisse moi tranquille !","Aller dormir dans le salon","Ignorer le message"],
      "Aller dormir dans le salon",
      "https://progameguides.com/wp-content/uploads/2022/06/Phasmophobia-Deogen-Loop-Edgefield-Garage.jpg?resize=900%2C506"
      ),
      new Question("Très bien dans se cas à la prochaine.",
     [". . .",". . .",". . ."],
      ". . .",
      "https://astucejeuxps4.com/wp-content/uploads/2022/10/1665473389_254_Tous-les-bonbons-dHalloween-et-Jack-o-Lanterns-sur-Willow-Street-dans.jpg"
      ),
  ];
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Immersion terminé !</h1>
        <h3>Merci d'avoir joué ! :)</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
        let questionContainer = document.getElementById("question-container");
        questionContainer.innerHTML = "";
      
        let currentQuestion = quiz.getCurrentQuestion();
        let questionText = currentQuestion.text;
        let questionImage = currentQuestion.image; // nouvelle variable image
        let questionImageElement = ""; // nouvelle variable imageElement
      
        if (questionImage) { // ajouter un élément img s'il y a une image
          questionImageElement = `<img src="${questionImage}" alt="Question Image">`;
        }
      
        let questionHTML = `
          <div id="question-text">${questionText}</div>
          <div id="question-image">${questionImageElement}</div>
        `;
      
        questionContainer.innerHTML = questionHTML;
      },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
