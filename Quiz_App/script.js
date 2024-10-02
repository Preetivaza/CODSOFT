let quizzes = [];
let currentQuiz = null;
let userAnswers = [];

function showCreateQuiz()
{
    document.getElementById('home').classList.add('hidden');
    document.getElementById('create-quiz').classList.remove('hidden');

}
function showTakeQuiz()
{
    document.getElementById('home').classList.add('hidden');
    document.getElementById('take-quiz').classList.remove('hidden');
    displayQuizList();
}

function goHome()
{
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('create-quiz').classList.add('hidden');
    document.getElementById('take-quiz').classList.add('hidden');
    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('quiz-result').classList.add('hidden');

}
function addQuestion()
{
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML=
    `<input type="text" placeholder="Enter Question" class="question-text"></input>
     <input type="text" placeholder="Option 1" class="option">
     <input type="text" placeholder="Option 2" class="option">
     <input type="text" placeholder="Option 3" class="option">
     <input type="text" placeholder="Option 4" class="option">
     <input type="text" placeholder="Correct Answer(1-4)" class="correct-answer">
    `;
    document.getElementById('questions-container').appendChild(questionDiv);
}

function saveQuiz()
{
    const quizTitle = document.getElementById('quizTitle').value;
    const questionElements = document.querySelectorAll('.question');
    const questions = [];

    questionElements.forEach((q)=>{
        const questionText = q.querySelector('.question-text').value;
        const options = Array.from(q.querySelectorAll('.option')).map(o=>o.value);
        const correctAnswer = q.querySelector('.correct-answer').value;

        questions.push({
            questionText,
            options,
            correctAnswer:parseInt(correctAnswer)
        });

    });
    quizzes.push({title:quizTitle,questions});
    alert('Quiz Saved Sucessfully!');
    goHome();
}
function displayQuizList()
{
        const quizListDiv = document.getElementById('quiz-list');
        quizListDiv.innerHTML = '';
        quizzes.forEach((quiz,index)=>
        {
            const quizButton = document.createElement('button');
            quizButton.textContent = quiz.title;
            quizButton.onclick = () => startQuiz(index);
    quizListDiv.appendChild(quizButton);
  });
}

function startQuiz(index) {
  currentQuiz = quizzes[index];
  document.getElementById('take-quiz').classList.add('hidden');
  document.getElementById('quiz-page').classList.remove('hidden');

  document.getElementById('quiz-title').textContent = currentQuiz.title;
  const quizQuestionsDiv = document.getElementById('quiz-questions');
  quizQuestionsDiv.innerHTML = '';

  currentQuiz.questions.forEach((q, i) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
      <h4>${i + 1}. ${q.questionText}</h4>
      ${q.options.map((option, j) => `
        <label><input type="radio" name="question${i}" value="${j + 1}"> ${option}</label>
      `).join('<br>')}
    `;
    quizQuestionsDiv.appendChild(questionDiv);
  });
}

function submitQuiz() {
  const userAnswers = [];
  currentQuiz.questions.forEach((q, i) => {
    const selectedOption = document.querySelector(`input[name="question${i}"]:checked`);
    userAnswers.push(selectedOption ? parseInt(selectedOption.value) : 0);
  });

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';
  let score = 0;

  currentQuiz.questions.forEach((q, i) => {
    const userAnswer = userAnswers[i];
    const correctAnswer = q.correctAnswer;
    if (userAnswer === correctAnswer) {
      score++;
      resultDiv.innerHTML += `<p>Question ${i + 1}: Correct</p>`;
    } else {
      resultDiv.innerHTML += `<p>Question ${i + 1}: Incorrect. Correct answer was ${correctAnswer}</p>`;
    }
  });

  resultDiv.innerHTML += `<h3>Your Score: ${score} / ${currentQuiz.questions.length}</h3>`;
  document.getElementById('quiz-page').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
}
