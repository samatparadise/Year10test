import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BookOpen, Brain, CheckCircle2, Lock, RefreshCcw, Sparkles, UserRound } from 'lucide-react';
import { curriculum } from './vcaaCurriculum.js';
import './styles.css';

const QUESTION_COUNT = 6;

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

function App() {
  const [subjectId, setSubjectId] = useState('maths');
  const [levelId, setLevelId] = useState('core');
  const [quizSeed, setQuizSeed] = useState(1);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const quiz = useMemo(() => buildQuiz(subjectId, levelId), [subjectId, levelId, quizSeed]);
  const score = quiz.questions.reduce((total, question) => total + (answers[question.id] === question.answer ? 1 : 0), 0);

  function resetQuiz(nextSubject = subjectId, nextLevel = levelId) {
    setSubjectId(nextSubject);
    setLevelId(nextLevel);
    setAnswers({});
    setSubmitted(false);
    setQuizSeed((seed) => seed + 1);
  }

  return (
    <main>
      <header className="hero">
        <nav>
          <div className="brand"><Sparkles size={22} /> Year 10 Quiz Studio</div>
          <button className="ghost" onClick={() => setShowAuth(true)}><UserRound size={18} /> Sign in / Sign up</button>
        </nav>
        <section className="heroGrid">
          <div>
            <p className="eyebrow">Victoria Year 10 learning practice</p>
            <h1>Student-friendly Science and Maths quizzes, constrained to the included VCAA-aligned curriculum map.</h1>
            <p className="lede">Choose a subject and difficulty, answer without logging in, then generate a fresh quiz when you finish. Signing in is optional and reserved for saving results later.</p>
            <div className="notice"><Lock size={18} /> No account needed to practise. Quiz questions are selected only from the local curriculum dataset.</div>
          </div>
          <div className="panel stats">
            <div><strong>2</strong><span>Subjects</span></div>
            <div><strong>2</strong><span>Difficulty levels</span></div>
            <div><strong>{QUESTION_COUNT}</strong><span>Questions per quiz</span></div>
          </div>
        </section>
      </header>

      <section className="controls panel">
        <div>
          <label>Subject</label>
          <div className="choiceRow">
            {curriculum.subjects.map((subject) => (
              <button key={subject.id} className={subjectId === subject.id ? 'active' : ''} onClick={() => resetQuiz(subject.id, levelId)}>
                <BookOpen size={18} /> {subject.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label>Difficulty</label>
          <div className="choiceRow">
            {quiz.subject.levels.map((level) => (
              <button key={level.id} className={levelId === level.id ? 'active' : ''} onClick={() => resetQuiz(subjectId, level.id)}>
                <Brain size={18} /> {level.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="layout">
        <aside className="panel curriculumCard">
          <h2>{quiz.subject.name} curriculum coverage</h2>
          <p>{quiz.subject.description}</p>
          {quiz.subject.strands.map((strand) => (
            <div className="strand" key={strand.name}>
              <h3>{strand.name}</h3>
              <ul>{strand.topics.map((topic) => <li key={topic.name}>{topic.name}</li>)}</ul>
            </div>
          ))}
        </aside>

        <section className="quiz panel">
          <div className="quizHeader">
            <div>
              <p className="eyebrow">{quiz.subject.name} - {quiz.level.name}</p>
              <h2>Quiz round</h2>
            </div>
            <button className="secondary" onClick={() => resetQuiz()}><RefreshCcw size={18} /> New quiz</button>
          </div>

          {quiz.questions.map((question, index) => (
            <article className="question" key={question.id}>
              <div className="questionMeta">Question {index + 1} - {question.strand} - {question.topic}</div>
              <h3>{question.prompt}</h3>
              <div className="options">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option;
                  const correct = submitted && option === question.answer;
                  const wrong = submitted && selected && option !== question.answer;
                  return (
                    <button
                      key={option}
                      className={`${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}
                      onClick={() => !submitted && setAnswers({ ...answers, [question.id]: option })}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {submitted && <p className="explain"><CheckCircle2 size={16} /> {question.explanation}</p>}
            </article>
          ))}

          <div className="submitBar">
            {submitted ? (
              <div className="score">Score: {score}/{quiz.questions.length}</div>
            ) : (
              <div>{Object.keys(answers).length}/{quiz.questions.length} answered</div>
            )}
            <button disabled={Object.keys(answers).length !== quiz.questions.length} onClick={() => setSubmitted(true)}>
              Check answers
            </button>
          </div>
        </section>
      </section>

      {showAuth && (
        <div className="modalBackdrop" onClick={() => setShowAuth(false)}>
          <section className="modal panel" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setShowAuth(false)}>x</button>
            <h2>Optional account access</h2>
            <p>Practise quizzes stay open to everyone. A future account can save quiz history, show progress by strand, and help students revisit tricky topics.</p>
            <form>
              <input placeholder="Email address" type="email" />
              <input placeholder="Password" type="password" />
              <button type="button">Continue</button>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
