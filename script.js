// script.js

const quizData = [
    {
        question: "Quem é o autor de 'A República'?",
        options: ["Platão", "Aristóteles", "Sócrates", "Nietzsche"],
        answer: "Platão"
    },
    {
        question: "O que é a 'dialética' para Hegel?",
        options: ["Conflito entre opostos", "Lei natural", "Estudo da ética", "Forma de conhecimento lógico"],
        answer: "Conflito entre opostos"
    },
    {
        question: "Qual filósofo é conhecido pela teoria do 'niilismo'?",
        options: ["Nietzsche", "Kant", "Descartes", "Sartre"],
        answer: "Nietzsche"
    },
    {
        question: "Quem escreveu a obra 'Crítica da Razão Pura'?",
        options: ["Kant", "Hegel", "Marx", "Descartes"],
        answer: "Kant"
    },
    {
        question: "O que é o 'imperativo categórico' na filosofia de Kant?",
        options: ["Lei moral universal", "Princípio da experiência", "Teoria da causa e efeito", "Fundamento da ética utilitarista"],
        answer: "Lei moral universal"
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = ''; // Limpar opções antigas

    questionData.options.forEach(option => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(optionButton);
    });

    document.getElementById("next-button").disabled = true;
}

function checkAnswer(selectedOption) {
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        correctAnswers++;
    } else {
        incorrectAnswers++;
    }

    // Desabilitar as opções
    const optionButtons = document.querySelectorAll("#options-container button");
    optionButtons.forEach(button => button.disabled = true);

    // Habilitar o botão "Próxima Pergunta"
    document.getElementById("next-button").disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    const totalQuestions = quizData.length;

    // Calculando a porcentagem de acertos
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);

    // Exibindo os resultados
    document.getElementById("score").innerHTML = `
        <p><strong>Você acertou ${correctAnswers} de ${totalQuestions} perguntas.</strong></p>
        <p>Você errou ${incorrectAnswers} de ${totalQuestions} perguntas.</p>
        <p>Sua porcentagem de acertos é: ${percentage}%.</p>
    `;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("result-container").style.display = "none";
    loadQuestion();
}

// Carregar a primeira pergunta
loadQuestion();
