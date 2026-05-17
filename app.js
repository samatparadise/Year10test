import { curriculum } from './vcaaCurriculum.js';

const QUESTION_COUNT = 6;

const state = {
  subjectId: 'maths',
  levelId: 'core',
  answers: {},
  submitted: false,
  showAuth: false,
  quiz: null,
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildQuiz(subjectId, levelId) {
  const subject = curriculum.subjects.find((item) => item.id === subjectId);
  const level = subject.levels.find((item) => item.id === levelId);
  const questionPool = subject.strands.flatMap((strand) =>
    strand.topics.flatMap((topic) =>
      topic.questions
        .filter((question) => question.level === levelId)
        .map((question) => ({ ...question, strand: strand.name, topic: topic.name }))
    )
  );

  return {
    subject,
    level,
    questions: shuffle(questionPool).slice(0, QUESTION_COUNT),
  };
}

function resetQuiz(nextSubject = state.subjectId, nextLevel = state.levelId) {
  state.subjectId = nextSubject;
  state.levelId = nextLevel;
  state.answers = {};
  state.submitted = false;
  state.quiz = buildQuiz(state.subjectId, state.levelId);
  render();
}

function icon(label) {
  return `<span aria-hidden="true">${label}</span>`;
}

function render() {
  if (!state.quiz) {
    state.quiz = buildQuiz(state.subjectId, state.levelId);
  }

  const score = state.quiz.questions.reduce(
    (total, question) => total + (state.answers[question.id] === question.answer ? 1 : 0),
    0
  );

  document.getElementById('root').innerHTML = `
    <main>
      <header class="hero">
        <nav>
          <div class="brand">${icon('✨')} Year 10 Quiz Studio</div>
          <button class="ghost" data-action="show-auth">${icon('👤')} Sign in / Sign up</button>
        </nav>
        <section class="heroGrid">
          <div>
            <p class="eyebrow">Victoria Year 10 learning practice</p>
            <h1>Student-friendly Science and Maths quizzes, constrained to the included VCAA-aligned curriculum map.</h1>
            <p class="lede">Choose a subject and difficulty, answer without logging in, then generate a fresh quiz when you finish. Signing in is optional and reserved for saving results later.</p>
            <div class="notice">${icon('🔒')} No account needed to practise. Quiz questions are selected only from the local curriculum dataset.</div>
          </div>
          <div class="panel stats">
            <div><strong>2</strong><span>Subjects</span></div>
            <div><strong>2</strong><span>Difficulty levels</span></div>
            <div><strong>${QUESTION_COUNT}</strong><span>Questions per quiz</span></div>
          </div>
        </section>
      </header>

      <section class="controls panel">
        <div>
          <label>Subject</label>
          <div class="choiceRow">
            ${curriculum.subjects.map((subject) => `
              <button class="${state.subjectId === subject.id ? 'active' : ''}" data-subject="${subject.id}">
                ${icon('📘')} ${subject.name}
              </button>
            `).join('')}
          </div>
        </div>
        <div>
          <label>Difficulty</label>
          <div class="choiceRow">
            ${state.quiz.subject.levels.map((level) => `
              <button class="${state.levelId === level.id ? 'active' : ''}" data-level="${level.id}">
                ${icon('🧠')} ${level.name}
              </button>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="layout">
        <aside class="panel curriculumCard">
          <h2>${state.quiz.subject.name} curriculum coverage</h2>
          <p>${state.quiz.subject.description}</p>
          ${state.quiz.subject.strands.map((strand) => `
            <div class="strand">
              <h3>${strand.name}</h3>
              <ul>${strand.topics.map((topic) => `<li>${topic.name}</li>`).join('')}</ul>
            </div>
          `).join('')}
        </aside>

        <section class="quiz panel">
          <div class="quizHeader">
            <div>
              <p class="eyebrow">${state.quiz.subject.name} - ${state.quiz.level.name}</p>
              <h2>Quiz round</h2>
            </div>
            <button class="secondary" data-action="new-quiz">${icon('🔄')} New quiz</button>
          </div>

          ${state.quiz.questions.map((question, index) => `
            <article class="question">
              <div class="questionMeta">Question ${index + 1} - ${question.strand} - ${question.topic}</div>
              <h3>${question.prompt}</h3>
              <div class="options">
                ${question.options.map((option) => {
                  const selected = state.answers[question.id] === option;
                  const correct = state.submitted && option === question.answer;
                  const wrong = state.submitted && selected && option !== question.answer;
                  return `
                    <button class="${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}" data-question="${question.id}" data-answer="${option}">
                      ${option}
                    </button>
                  `;
                }).join('')}
              </div>
              ${state.submitted ? `<p class="explain">${icon('✅')} ${question.explanation}</p>` : ''}
            </article>
          `).join('')}

          <div class="submitBar">
            ${state.submitted ? `<div class="score">Score: ${score}/${state.quiz.questions.length}</div>` : `<div>${Object.keys(state.answers).length}/${state.quiz.questions.length} answered</div>`}
            <button data-action="submit" ${Object.keys(state.answers).length !== state.quiz.questions.length ? 'disabled' : ''}>Check answers</button>
          </div>
        </section>
      </section>

      ${state.showAuth ? `
        <div class="modalBackdrop" data-action="hide-auth">
          <section class="modal panel" data-modal>
            <button class="close" data-action="hide-auth">x</button>
            <h2>Optional account access</h2>
            <p>Practise quizzes stay open to everyone. A future account can save quiz history, show progress by strand, and help students revisit tricky topics.</p>
            <form>
              <input placeholder="Email address" type="email" />
              <input placeholder="Password" type="password" />
              <button type="button">Continue</button>
            </form>
          </section>
        </div>
      ` : ''}
    </main>
  `;

  bindEvents();
}

function bindEvents() {
  document.querySelectorAll('[data-subject]').forEach((button) => {
    button.addEventListener('click', () => resetQuiz(button.dataset.subject, state.levelId));
  });

  document.querySelectorAll('[data-level]').forEach((button) => {
    button.addEventListener('click', () => resetQuiz(state.subjectId, button.dataset.level));
  });

  document.querySelectorAll('[data-question]').forEach((button) => {
    button.addEventListener('click', () => {
      if (state.submitted) return;
      state.answers[button.dataset.question] = button.dataset.answer;
      render();
    });
  });

  document.querySelectorAll('[data-action="new-quiz"]').forEach((button) => {
    button.addEventListener('click', () => resetQuiz());
  });

  document.querySelectorAll('[data-action="submit"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.submitted = true;
      render();
    });
  });

  document.querySelectorAll('[data-action="show-auth"]').forEach((button) => {
    button.addEventListener('click', () => {
      state.showAuth = true;
      render();
    });
  });

  document.querySelectorAll('[data-action="hide-auth"]').forEach((element) => {
    element.addEventListener('click', () => {
      state.showAuth = false;
      render();
    });
  });

  document.querySelectorAll('[data-modal]').forEach((modal) => {
    modal.addEventListener('click', (event) => event.stopPropagation());
  });
}

render();
