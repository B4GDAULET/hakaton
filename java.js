// Burger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active')) {
                const isClickInsideMenu = navMenu.contains(event.target);
                const isClickOnBurger = burgerMenu.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnBurger) {
                    burgerMenu.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    }
});

// Базовая анимация для эффекта "menacing" (ゴゴゴ)
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация появления карточек при прокрутке
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за карточками персонажей
    document.querySelectorAll('.character-card').forEach(card => {
        observer.observe(card);
    });

    // Наблюдаем за карточками стендов
    document.querySelectorAll('.stand-card').forEach(card => {
        observer.observe(card);
    });

    // Наблюдаем за частями сюжета
    document.querySelectorAll('.part').forEach(part => {
        observer.observe(part);
    });
});

// Добавляем интерактивность для секции игры
document.addEventListener('DOMContentLoaded', function() {
    // Плавная анимация для карточек при скролле
    const cards = document.querySelectorAll('.feature-card, .fighter-card, .mode-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });

    // Кнопка покупки
    const buyButton = document.querySelector('.game-button');
    if (buyButton) {
        buyButton.addEventListener('click', () => {
            window.open('https://store.steampowered.com/app/1372110/JoJos_Bizarre_Adventure_All_Star_Battle_R/', '_blank');
        });
    }

    // Параллакс эффект для баннера
    const gameHeader = document.querySelector('.game-header');
    if (gameHeader) {
        gameHeader.addEventListener('mousemove', (e) => {
            const banner = gameHeader.querySelector('.game-banner');
            const rect = gameHeader.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            banner.style.transform = `translate(${xPercent}px, ${yPercent}px) scale(1.05)`;
        });

        gameHeader.addEventListener('mouseleave', () => {
            const banner = gameHeader.querySelector('.game-banner');
            banner.style.transform = 'translate(0, 0) scale(1)';
        });
    }
});

// Stand Power Calculator
document.addEventListener('DOMContentLoaded', function() {
    const powerInputs = document.querySelectorAll('.stat-input input[type="range"]');
    const calculateButton = document.getElementById('calculate-power');
    const standRank = document.getElementById('stand-rank');
    const standDescription = document.getElementById('stand-description');

    // Update range background and value display
    powerInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = (this.value - this.min) / (this.max - this.min) * 100;
            this.style.setProperty('--value', `${value}%`);
            
            // Update rank display
            const statValue = this.nextElementSibling;
            const rank = calculateRank(this.value);
            statValue.textContent = rank;
        });
    });

    // Calculate rank based on value
    function calculateRank(value) {
        if (value >= 90) return 'A';
        if (value >= 70) return 'B';
        if (value >= 50) return 'C';
        if (value >= 30) return 'D';
        return 'E';
    }

    // Calculate overall stand power
    calculateButton.addEventListener('click', function() {
        let totalPower = 0;
        powerInputs.forEach(input => {
            totalPower += parseInt(input.value);
        });

        const averagePower = totalPower / powerInputs.length;
        const finalRank = calculateRank(averagePower);
        standRank.textContent = finalRank;

        // Update description based on rank
        const descriptions = {
            'A': 'Ваш стенд обладает невероятной силой! Он способен противостоять даже Star Platinum!',
            'B': 'Отличный стенд с хорошим балансом характеристик.',
            'C': 'Ваш стенд имеет средние показатели, но с правильной стратегией может быть очень эффективен.',
            'D': 'Стенд слабоват, но у него есть потенциал для развития.',
            'E': 'Похоже, вам нужно больше тренироваться со своим стендом...'
        };

        standDescription.textContent = descriptions[finalRank];
        
        // Add animation effect
        standRank.style.animation = 'none';
        standRank.offsetHeight; // Trigger reflow
        standRank.style.animation = 'menacing 0.3s infinite';
    });

    // Timeline animations
    const timelineEvents = document.querySelectorAll('.timeline-event');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });

    timelineEvents.forEach(event => {
        event.style.opacity = '0';
        event.style.transform = 'translateY(20px)';
        event.style.transition = 'all 0.5s ease-out';
        observer.observe(event);
    });

    // Add hover effect to timeline events
    timelineEvents.forEach(event => {
        event.addEventListener('mouseenter', function() {
            const year = this.getAttribute('data-year');
            this.style.zIndex = '1';
            this.querySelector('.event-content').style.transform = 'scale(1.05) translateY(-5px)';
        });

        event.addEventListener('mouseleave', function() {
            this.style.zIndex = '0';
            this.querySelector('.event-content').style.transform = 'none';
        });
    });
});

// Quiz functionality
const quizQuestions = [
    {
        question: "Какой стенд принадлежит Джотаро Куджо?",
        answers: [
            "Star Platinum",
            "The World",
            "Crazy Diamond",
            "Gold Experience"
        ],
        correct: 0
    },
    {
        question: "Кто является главным антагонистом в Diamond is Unbreakable?",
        answers: [
            "ДИО",
            "Дьяволо",
            "Йошикаге Кира",
            "Энрико Пуччи"
        ],
        correct: 2
    },
    {
        question: "Какая способность у Gold Experience Requiem?",
        answers: [
            "Останавливать время",
            "Возвращать действия к нулю",
            "Ускорять время",
            "Создавать жизнь"
        ],
        correct: 1
    },
    {
        question: "Как называется энергия, используемая в первых двух частях JoJo?",
        answers: [
            "Стенд",
            "Спин",
            "Хамон",
            "Рипл"
        ],
        correct: 2
    },
    {
        question: "Кто обучил Джонатана Джостара технике Хамона?",
        answers: [
            "Роберт Э. О. Спидвагон",
            "Уильям Цеппели",
            "Лиза Лиза",
            "Тонпетти"
        ],
        correct: 1
    },
    {
        question: "Какой стенд у Дио в Stardust Crusaders?",
        answers: [
            "King Crimson",
            "Killer Queen",
            "The World",
            "Made in Heaven"
        ],
        correct: 2
    },
    {
        question: "Кто является дочерью Джотаро Куджо?",
        answers: [
            "Джолин Куджо",
            "Триш Уна",
            "Эрмес Костелло",
            "Люси Стил"
        ],
        correct: 0
    },
    {
        question: "Какое истинное имя Дьяволо?",
        answers: [
            "Йошикаге Кира",
            "Соллидо Наццо",
            "Винегар Доппио",
            "Неизвестно"
        ],
        correct: 3
    },
    {
        question: "Что является слабостью вампиров в JoJo?",
        answers: [
            "Серебро",
            "Солнечный свет",
            "Чеснок",
            "Святая вода"
        ],
        correct: 1
    },
    {
        question: "Какой стенд может останавливать время дольше всех?",
        answers: [
            "Star Platinum",
            "The World",
            "Made in Heaven",
            "King Crimson"
        ],
        correct: 1
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const startQuizButton = document.getElementById('start-quiz');
    const retryQuizButton = document.getElementById('retry-quiz');
    const quizStart = document.getElementById('quiz-start');
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');
    const progressFill = document.getElementById('progress-fill');
    const currentQuestionSpan = document.getElementById('current-question');
    const totalQuestionsSpan = document.getElementById('total-questions');
    const scoreSpan = document.getElementById('score');
    const maxScoreSpan = document.getElementById('max-score');
    const resultMessage = document.getElementById('result-message');
    const resultImage = document.getElementById('result-image');

    let currentQuestion = 0;
    let score = 0;
    let questions = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startQuiz() {
        questions = shuffleArray([...quizQuestions]);
        currentQuestion = 0;
        score = 0;
        quizStart.style.display = 'none';
        quizContent.style.display = 'block';
        quizResult.style.display = 'none';
        totalQuestionsSpan.textContent = questions.length;
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestion];
        questionText.textContent = question.question;
        currentQuestionSpan.textContent = currentQuestion + 1;
        progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;

        answersContainer.innerHTML = '';
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-button';
            button.textContent = answer;
            button.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(button);
        });
    }

    function selectAnswer(answerIndex) {
        const question = questions[currentQuestion];
        const buttons = answersContainer.querySelectorAll('.answer-button');
        buttons.forEach(button => button.disabled = true);

        if (answerIndex === question.correct) {
            buttons[answerIndex].classList.add('correct');
            score++;
        } else {
            buttons[answerIndex].classList.add('wrong');
            buttons[question.correct].classList.add('correct');
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }, 1500);
    }

    function showResult() {
        quizContent.style.display = 'none';
        quizResult.style.display = 'block';
        scoreSpan.textContent = score;
        maxScoreSpan.textContent = questions.length;

        let resultText = '';
        let resultImageSrc = '';

        if (score === questions.length) {
            resultText = 'Йаре йаре дазе... Ты настоящий мастер JoJo!';
            resultImageSrc = 'images/jotaro.jpg';
        } else if (score >= questions.length * 0.7) {
            resultText = 'Отличный результат! Ты хорошо знаешь мир JoJo!';
            resultImageSrc = 'images/josuke.jpg';
        } else if (score >= questions.length * 0.5) {
            resultText = 'Неплохо! Но тебе ещё есть куда расти.';
            resultImageSrc = 'images/joseph.jpg';
        } else {
            resultText = 'Похоже, тебе нужно пересмотреть JoJo...';
            resultImageSrc = 'images/dio brando.jpg';
        }

        resultMessage.textContent = resultText;
        resultImage.src = resultImageSrc;
    }

    startQuizButton.addEventListener('click', startQuiz);
    retryQuizButton.addEventListener('click', startQuiz);
});

// Stand Evolution Animation
const evolutionCards = document.querySelectorAll('.evolution-card');
evolutionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const arrow = card.querySelector('.evolution-arrow');
        arrow.style.animation = 'pulse 1s infinite';
    });

    card.addEventListener('mouseleave', () => {
        const arrow = card.querySelector('.evolution-arrow');
        arrow.style.animation = 'none';
    });
});

// Battle Techniques Interaction
const techniqueCards = document.querySelectorAll('.technique-card');
techniqueCards.forEach(card => {
    card.addEventListener('click', () => {
        // Toggle expanded state
        card.classList.toggle('expanded');
        
        // Get details section
        const details = card.querySelector('.technique-details');
        
        if (card.classList.contains('expanded')) {
            details.style.maxHeight = details.scrollHeight + 'px';
        } else {
            details.style.maxHeight = null;
        }
    });
});

// Add parallax effect to section backgrounds
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.stand-evolution-section, .battle-techniques-section');
    
    sections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        section.style.backgroundPosition = `center ${rate}px`;
    });
});

// Добавим эффект появления элементов при скролле
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.evolution-card, .technique-card').forEach(el => {
    observer.observe(el);
});

// JoJo Poses Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    const poseFilters = document.querySelectorAll('.pose-filter');
    const poseCards = document.querySelectorAll('.pose-card');
    const poseDetails = document.getElementById('pose-details');
    const closeDetails = document.querySelector('.close-details');

    // Pose information database
    const poseInfo = {
        'jonathan': {
            title: 'Джентльменская поза Джонатана',
            description: 'Классическая поза, отражающая благородный характер первого ДжоДжо.',
            facts: [
                'Вдохновлена греческими статуями',
                'Стала основой для поз будущих поколений',
                'Отражает джентльменский характер Джонатана'
            ]
        },
        'joseph': {
            title: 'Тактическая поза Джозефа',
            description: 'Хитрая поза, часто сопровождающая его предсказания следующей фразы противника.',
            facts: [
                'Часто используется перед его знаменитым трюком предсказания',
                'Сочетает в себе хамон и актёрское мастерство',
                'Стала мемом в сообществе фанатов'
            ]
        },
        'jotaro': {
            title: 'Угрожающая поза Джотаро',
            description: 'Культовая поза, часто сопровождаемая его фирменным "Yare Yare Daze".',
            facts: [
                'Стала одной из самых узнаваемых поз в серии',
                'Часто копируется другими персонажами',
                'Идеально сочетается со Star Platinum'
            ]
        },
        'josuke': {
            title: 'Поза Джоске',
            description: 'Энергичная поза, отражающая его бунтарский характер и стиль 90-х.',
            facts: [
                'Вдохновлена модой японских школьников 90-х',
                'Подчеркивает его знаменитую прическу',
                'Сочетается со способностями Crazy Diamond'
            ]
        },
        'giorno': {
            title: 'Решительная поза Джорно',
            description: 'Элегантная поза, символизирующая его амбиции и решительность.',
            facts: [
                'Содержит элементы поз ДИО и Джонатана',
                'Стала символом части 5',
                'Отражает его королевские амбиции'
            ]
        },
        'jolyne': {
            title: 'Боевая поза Джолин',
            description: 'Динамичная поза, показывающая её бойцовский характер.',
            facts: [
                'Сочетает в себе элементы поз Джотаро',
                'Подчеркивает гибкость Stone Free',
                'Отражает её независимый характер'
            ]
        }
    };

    // Filter functionality
    poseFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            poseFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');

            const selectedPart = filter.dataset.part;
            
            // Show/hide cards based on filter
            poseCards.forEach(card => {
                if (selectedPart === 'all' || card.dataset.part === selectedPart) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Card click functionality
    poseCards.forEach(card => {
        card.addEventListener('click', () => {
            const character = card.querySelector('h3').textContent.split(' ')[1].toLowerCase();
            const info = poseInfo[character];
            
            if (info) {
                // Update details content
                const detailsImage = poseDetails.querySelector('.pose-details-image img');
                const detailsTitle = poseDetails.querySelector('.pose-details-info h3');
                const detailsDesc = poseDetails.querySelector('.pose-description');
                const factsList = poseDetails.querySelector('.facts-list');

                detailsImage.src = card.querySelector('img').src;
                detailsTitle.textContent = info.title;
                detailsDesc.textContent = info.description;
                
                // Clear and update facts
                factsList.innerHTML = '';
                info.facts.forEach(fact => {
                    const li = document.createElement('li');
                    li.textContent = fact;
                    factsList.appendChild(li);
                });

                // Show details
                poseDetails.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close details functionality
    closeDetails.addEventListener('click', () => {
        poseDetails.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close details when clicking outside
    poseDetails.addEventListener('click', (e) => {
        if (e.target === poseDetails) {
            poseDetails.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Add hover effect for menacing text
    const menacingEffects = document.querySelectorAll('.menacing-effect');
    menacingEffects.forEach(effect => {
        effect.addEventListener('mouseenter', () => {
            effect.style.animation = 'menacingFloat 0.5s infinite';
        });

        effect.addEventListener('mouseleave', () => {
            effect.style.animation = 'menacingFloat 2s infinite';
        });
    });
});

// Music Player
document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicOn = document.getElementById('musicOn');
    const musicOff = document.getElementById('musicOff');
    let isPlaying = false;

    function playMusic() {
        bgMusic.play();
        isPlaying = true;
        musicToggle.classList.add('playing');
        musicOn.classList.add('active');
        musicOff.classList.remove('active');
    }

    function pauseMusic() {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicOn.classList.remove('active');
        musicOff.classList.add('active');
    }

    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    musicOn.addEventListener('click', playMusic);
    musicOff.addEventListener('click', pauseMusic);

    // Set initial state
    musicOff.classList.add('active');
});


