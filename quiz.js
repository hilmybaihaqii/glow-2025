document.addEventListener('DOMContentLoaded', function() {

    const quizData = [
        {
            question: "What is Cloud Computing?",
            options: [
                "A type of weather forecasting system",
                "Storing and accessing data and applications over the Internet using remote servers",
                "A method of cooling computer systems",
                "A software programming language"
            ],
            correct: 1,
            explanation: "Cloud Computing is the delivery of computing services—including servers, storage, databases, and software—over the Internet ('the cloud')."
        },
        {
            question: "Which of the following is an example of Software as a Service (SaaS)?",
            options: [
                "Amazon EC2",
                "Google Compute Engine",
                "Gmail",
                "Microsoft Azure Virtual Machines"
            ],
            correct: 2,
            explanation: "SaaS provides ready-to-use software directly to end-users. Gmail is a classic example, while the others are primarily IaaS (Infrastructure as a Service)."
        },
        {
            question: "What does IaaS stand for in cloud computing?",
            options: [
                "Internet as a Service",
                "Infrastructure as a Service",
                "Information as a Service",
                "Integration as a Service"
            ],
            correct: 1,
            explanation: "IaaS stands for Infrastructure as a Service. It provides the fundamental computing infrastructure like virtual servers, storage, and networking."
        },
        {
            question: "Which cloud service model provides a platform for developers to build and deploy applications?",
            options: [
                "SaaS (Software as a Service)",
                "IaaS (Infrastructure as a Service)",
                "PaaS (Platform as a Service)",
                "DaaS (Desktop as a Service)"
            ],
            correct: 2,
            explanation: "PaaS (Platform as a Service) offers a complete development and deployment environment in the cloud, without the complexity of managing the underlying infrastructure."
        },
        {
            question: "What is one of the main advantages of cloud computing mentioned in the content?",
            options: [
                "Requires expensive hardware installation",
                "Only accessible from office computers",
                "Cost-effective and pay-for-what-you-use model",
                "Requires advanced programming knowledge"
            ],
            correct: 2,
            explanation: "One of the key benefits is cost savings. The pay-as-you-go model eliminates the need for large upfront investments in hardware."
        },
        {
            question: "Which of these is NOT typically considered a cloud computing layer?",
            options: [
                "Application Layer (SaaS)",
                "Platform Layer (PaaS)",
                "Infrastructure Layer (IaaS)",
                "Hardware Layer (HaaS)"
            ],
            correct: 3,
            explanation: "The three main, widely-accepted cloud service models are IaaS, PaaS, and SaaS. 'Hardware as a Service' is not a standard category."
        },
        {
            question: "According to the content, which company provides Google Drive as a cloud service?",
            options: [
                "Microsoft",
                "Amazon",
                "Google",
                "Apple"
            ],
            correct: 2,
            explanation: "Google Drive is a popular cloud storage service developed and provided by Google."
        },
        {
            question: "What type of cloud service is Netflix considered to be?",
            options: [
                "Infrastructure service for server hosting",
                "Platform service for developers",
                "Software service for video streaming",
                "Database service for data storage"
            ],
            correct: 2,
            explanation: "Netflix is a prime example of SaaS. It provides a software application (video streaming) directly to millions of end-users over the internet."
        },
        {
            question: "Which characteristic best describes cloud computing accessibility?",
            options: [
                "Only accessible during business hours",
                "Requires physical presence at data center",
                "Accessible from anywhere, anytime with internet",
                "Only works on specific devices"
            ],
            correct: 2,
            explanation: "Ubiquitous access is a core feature of the cloud. As long as you have an internet connection, you can access your services from virtually anywhere."
        },
        {
            question: "What makes cloud computing scalable?",
            options: [
                "Fixed resource allocation that never changes",
                "Ability to increase or decrease resources based on demand",
                "Requires manual hardware installation for scaling",
                "Only scales up, never scales down"
            ],
            correct: 1,
            explanation: "This is known as 'elasticity'. The cloud allows you to dynamically scale resources up or down to precisely match demand, ensuring performance and cost-efficiency."
        }
    ];

    // DOM Elements
    const quizWrapper = document.getElementById('quiz-wrapper');
    const resultsContainer = document.getElementById('results-container');
    const questionCurrent = document.getElementById('question-current');
    const questionTotal = document.getElementById('question-total');
    const progressBar = document.getElementById('progress-bar');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const explanationText = document.getElementById('explanation-text');
    const nextBtn = document.getElementById('next-btn');
    const retryBtn = document.getElementById('retry-btn');
    const scoreCircle = document.getElementById('score-circle');
    const scoreCorrect = document.getElementById('score-correct');
    const scoreTotal = document.getElementById('score-total');
    const resultsFeedback = document.getElementById('results-feedback');

    // Quiz State
    let currentQuestionIndex = 0;
    let score = 0;

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        quizWrapper.style.display = 'block';
        resultsContainer.style.display = 'none';
        nextBtn.style.display = 'none';
        loadQuestion();
    }

    function loadQuestion() {
        // Reset from previous question
        answerOptions.innerHTML = '';
        explanationText.style.display = 'none';
        nextBtn.style.display = 'none';

        const currentQuestion = quizData[currentQuestionIndex];
        questionText.innerText = currentQuestion.question;
        questionCurrent.innerText = currentQuestionIndex + 1;
        questionTotal.innerText = quizData.length;
        progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.innerText = option;
            button.classList.add('answer-btn');
            button.dataset.index = index;
            button.addEventListener('click', selectAnswer);
            answerOptions.appendChild(button);
        });
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correctIndex = quizData[currentQuestionIndex].correct;
        const selectedIndex = parseInt(selectedButton.dataset.index);

        if (selectedIndex === correctIndex) {
            score++;
        }

        // Show feedback
        Array.from(answerOptions.children).forEach(button => {
            const buttonIndex = parseInt(button.dataset.index);
            if (buttonIndex === correctIndex) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
            button.disabled = true; // Disable all buttons
        });

        // Show explanation
        explanationText.innerText = quizData[currentQuestionIndex].explanation;
        explanationText.style.display = 'block';
        
        // Show Next or Finish button
        if (currentQuestionIndex < quizData.length - 1) {
            nextBtn.innerText = 'Next Question';
        } else {
            nextBtn.innerText = 'Finish Quiz';
        }
        nextBtn.style.display = 'block';
    }

    function showResults() {
        quizWrapper.style.display = 'none';
        resultsContainer.style.display = 'block';

        const percentage = Math.round((score / quizData.length) * 100);
        scoreCircle.innerText = `${percentage}%`;
        scoreCorrect.innerText = score;
        scoreTotal.innerText = quizData.length;

        let feedback = '';
        let circleColor = '';

        if (percentage === 100) {
            feedback = 'Perfect! You are a Cloud Master!';
            circleColor = '#27ae60'; // Green
        } else if (percentage >= 80) {
            feedback = 'Excellent! You have a great understanding.';
            circleColor = '#2980b9'; // Blue
        } else if (percentage >= 60) {
            feedback = 'Good job! A little more study and you\'ll be an expert.';
            circleColor = 'var(--secondary-accent)'; // Orange
        } else {
            feedback = 'Keep learning! Review the concepts to improve your score.';
            circleColor = 'var(--primary-accent)'; // Red
        }
        resultsFeedback.innerText = feedback;
        scoreCircle.style.backgroundColor = circleColor;
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    retryBtn.addEventListener('click', startQuiz);

    // Initial load
    startQuiz();
});