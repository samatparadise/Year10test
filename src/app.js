import { curriculum } from './vcaaCurriculum.js';

const QUESTION_COUNT = 10;
const PRACTICE_POOL_SIZE = 100;
const RECENT_HISTORY_LIMIT = 40;

const state = {
  subjectId: 'maths',
  levelId: 'core',
  answers: {},
  submitted: false,
  showAuth: false,
  quiz: null,
  recentQuestionIds: {},
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function rotateOptions(question, offset) {
  const options = [...question.options];
  const rotated = [...options.slice(offset % options.length), ...options.slice(0, offset % options.length)];
  return rotated;
}

function buildPracticePool(baseQuestions) {
  const promptFrames = [
    (prompt) => prompt,
    (prompt) => `Quick check: ${prompt}`,
    (prompt) => `Apply the idea: ${prompt}`,
    (prompt) => `Revision question: ${prompt}`,
    (prompt) => `Confidence builder: ${prompt}`,
  ];

  return Array.from({ length: PRACTICE_POOL_SIZE }, (_, index) => {
    const baseQuestion = baseQuestions[index % baseQuestions.length];
    const frame = promptFrames[index % promptFrames.length];
    return {
      ...baseQuestion,
      id: `${baseQuestion.id}-practice-${index + 1}`,
      originalId: baseQuestion.id,
      prompt: frame(baseQuestion.prompt),
      options: rotateOptions(baseQuestion, index),
    };
  });
}

function buildQuiz(subjectId, levelId) {
  const subject = curriculum.subjects.find((item) => item.id === subjectId);
  const level = subject.levels.find((item) => item.id === levelId);
  const baseQuestions = subject.strands.flatMap((strand) =>
    strand.topics.flatMap((topic) =>
      topic.questions
        .filter((question) => question.level === levelId)
        .map((question) => ({ ...question, strand: strand.name, topic: topic.name }))
    )
  );
  const historyKey = `${subjectId}-${levelId}`;
  const recentIds = state.recentQuestionIds[historyKey] || [];
  const practicePool = buildPracticePool(baseQuestions);
  const freshQuestions = shuffle(practicePool).filter((question) => !recentIds.includes(question.id));
  const fallbackQuestions = shuffle(practicePool);
  const questions = [...freshQuestions, ...fallbackQuestions]
    .filter((question, index, list) => list.findIndex((item) => item.id === question.id) === index)
    .slice(0, QUESTION_COUNT);

  const selectedIds = questions.map((question) => question.id);
  state.recentQuestionIds[historyKey] = [...selectedIds, ...recentIds].slice(0, RECENT_HISTORY_LIMIT);

  return {
    subject,
    level,
    questions,
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
          <div class="brand"><span class="trafficLights"><i></i><i></i><i></i></span> Year 10 Quiz Studio</div>
          <button class="ghost" data-action="show-auth">${icon('👤')} Sign in / Sign up</button>
        </nav>
        <section class="heroGrid">
          <div>
            <p class="eyebrow">Victoria Year 10 learning practice</p>
            <h1>Focused Year 10 practice that feels calm, clear and fast.</h1>
            <p class="lede">Choose Science or Maths, pick a level, and complete a fresh 10-question set without logging in. Optional accounts can save results later.</p>
            <div class="notice">${icon('🔒')} No account needed to practise. Quiz questions are selected only from the local curriculum dataset.</div>
          </div>
          <div class="panel stats">
            <div><strong>2</strong><span>Subjects</span></div>
            <div><strong>2</strong><span>Difficulty levels</span></div>
            <div><strong>${QUESTION_COUNT}</strong><span>Questions each round</span></div>
            <div><strong>${PRACTICE_POOL_SIZE}</strong><span>Practice variants</span></div>
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
