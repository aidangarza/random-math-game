const fanfare = new Audio('audio/fanfare.mp3');
const buzzer = new Audio('audio/buzzer.mp3');

const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard'
};

const OPERATIONS = {
  ADDITION: '+',
  SUBTRACTION: '-',
  MULTIPLICATION: 'x'
};

const OPERATIONS_MAP = {
  [DIFFICULTY.EASY]: [OPERATIONS.ADDITION],
  [DIFFICULTY.MEDIUM]: [OPERATIONS.ADDITION, OPERATIONS.SUBTRACTION],
  [DIFFICULTY.HARD]: [OPERATIONS.ADDITION, OPERATIONS.SUBTRACTION, OPERATIONS.MULTIPLICATION]
}

const MAX_MAP = {
  [DIFFICULTY.EASY]: 100,
  [DIFFICULTY.MEDIUM]: 1000,
  [DIFFICULTY.HARD]: 1000000
}

function getDifficulty() {
  console.log('[getDifficulty]');
  const savedDifficulty = localStorage.getItem('difficulty');

  if (savedDifficulty) {
    console.log(' -> savedDifficulty', savedDifficulty);
    return savedDifficulty;
  }

  const currentDifficulty = document.getElementById('difficulty').value;
  console.log(' -> currentDifficulty', currentDifficulty);
  return currentDifficulty;
}

function setDifficulty(difficulty) {
  console.log('[setDifficulty]', difficulty);

  localStorage.setItem('difficulty', difficulty);

  document.getElementById('difficulty').value = difficulty;
}

function changeDifficulty(event) {
  console.log('[changeDifficulty]');
  const difficulty = event.target.value;
  setDifficulty(difficulty);
  generateNewQuestion();
}

let num1 = 0;
let num2 = 0;
let operator = '';

function generateNewQuestion() {
  const difficulty = getDifficulty();
  const max = MAX_MAP[difficulty];
  
  num1 = Math.round(Math.random() * max);
  document.getElementById('num1').innerText = num1;

  num2 = Math.round(Math.random() * max);
  document.getElementById('num2').innerText = num2;
  
  const operations = OPERATIONS_MAP[difficulty];
  operator = operations[Math.floor(Math.random() * operations.length)];
  document.getElementById('operator').innerText = operator;
}

function checkAnswer() {
  const answerField = document.getElementById('answer');
  const answer = parseInt(answerField.value);

  let correctAnswer;

  switch (operator) {
    case OPERATIONS.ADDITION:
      correctAnswer = num1 + num2;
      break;
    case OPERATIONS.SUBTRACTION:
      correctAnswer = num1 - num2;
      break;
    case OPERATIONS.MULTIPLICATION:
      correctAnswer = num1 * num2;
      break;
    default:
      correctAnswer = 0;
  }

  return answer === correctAnswer;
}

function submitAnswer(event) {
  event.preventDefault();

  const isCorrect = checkAnswer();

  if (isCorrect) {
    document.getElementById('wrongAnswer').classList.remove('show');
    document.getElementById('rightAnswer').classList.add('show');
    document.getElementById('answer').setAttribute('disabled', true);
    fanfare.play();
  } else {
    document.getElementById('rightAnswer').classList.remove('show');
    document.getElementById('wrongAnswer').classList.add('show');
    buzzer.play();
  }
}

function nextQuestion() {
  document.getElementById('rightAnswer').classList.remove('show');
  document.getElementById('wrongAnswer').classList.remove('show');
  document.getElementById('answer').removeAttribute('disabled');
  document.getElementById('answer').value = '';
  generateNewQuestion();
}

setDifficulty(getDifficulty());

generateNewQuestion();