
import React, { useMemo, useState } from 'react'
import { Flame, RotateCcw, GraduationCap, CheckCircle2, XCircle } from 'lucide-react'

const PASS_MARK = 70
const EXAM_COUNT = 20

const questions = [
  {
    category: 'Extinguishing techniques',
    difficulty: 'Core',
    question: 'Which four methods are used to extinguish fire?',
    options: ['Cooling, smothering, starving and chemical interruption', 'Cooling, ventilation, dilution and ignition', 'Smothering, damping, spreading and oxidising', 'Heating, starving, oxygenating and turning over'],
    answer: 'Cooling, smothering, starving and chemical interruption',
    explanation: 'The four main techniques are cooling, smothering, starving and chemical interruption. These work by limiting heat, oxygen, fuel or the chemical chain reaction.'
  },
  {
    category: 'Extinguishing techniques',
    difficulty: 'Core',
    question: 'Cooling mainly removes or reduces which element?',
    options: ['Heat', 'Oxygen', 'Fuel', 'Smoke'],
    answer: 'Heat',
    explanation: 'Cooling reduces heat. Water is commonly used on suitable Class A fires because it absorbs heat from the burning material.'
  },
  {
    category: 'Extinguishing techniques',
    difficulty: 'Core',
    question: 'Smothering works mainly by limiting what?',
    options: ['Oxygen', 'Fuel', 'Heat', 'The extinguisher label'],
    answer: 'Oxygen',
    explanation: 'Smothering reduces or removes oxygen from the fire.'
  },
  {
    category: 'Extinguishing techniques',
    difficulty: 'Core',
    question: 'Starving a fire means limiting what?',
    options: ['Fuel', 'Oxygen', 'Heat', 'Visibility'],
    answer: 'Fuel',
    explanation: 'Starving reduces the available fuel. Anything combustible may act as a fuel source.'
  },
  {
    category: 'Extinguishing techniques',
    difficulty: 'Core',
    question: 'Chemical interruption affects which part of combustion?',
    options: ['The chemical chain reaction', 'Only the smoke layer', 'The hose pressure', 'Only the fuel container'],
    answer: 'The chemical chain reaction',
    explanation: 'Chemical interruption interferes with the chain reaction that sustains flaming combustion.'
  },
  {
    category: 'Fire behaviour',
    difficulty: 'Core',
    question: 'According to the notes, what is the fuel in many combustible materials?',
    options: ['The vapour', 'The extinguisher pin', 'The water droplet', 'The warning sign'],
    answer: 'The vapour',
    explanation: 'The notes state that the vapour is the fuel. Combustible materials can release flammable vapours.'
  },
  {
    category: 'Fire behaviour',
    difficulty: 'Applied',
    question: 'Why can invisible fire gases be dangerous after a fire appears knocked down?',
    options: ['They may ignite from an ember', 'They guarantee the fire is out', 'They remove all fuel', 'They stop re-ignition completely'],
    answer: 'They may ignite from an ember',
    explanation: 'Invisible fire gases may still ignite if an ember or heat source remains.'
  },
  {
    category: 'Turning over and damping down',
    difficulty: 'Core',
    question: 'What is a key reason for turning over and damping down?',
    options: ['To prevent spot fires and cool the area', 'To spread fuel around the room', 'To avoid using water completely', 'To hide remaining embers'],
    answer: 'To prevent spot fires and cool the area',
    explanation: 'Turning over and damping down helps prevent spot fires and cools the affected material.'
  },
  {
    category: 'Turning over and damping down',
    difficulty: 'Applied',
    question: 'Why might damping down still be justified even if flooding is a concern?',
    options: ['To reduce the chance of invisible fire gases igniting', 'To make the fire burn faster', 'To increase vapour release', 'To avoid checking the area'],
    answer: 'To reduce the chance of invisible fire gases igniting',
    explanation: 'The notes suggest damping down may be justified to prevent invisible fire gases igniting, even if flooding is a concern.'
  },
  {
    category: 'Special cases',
    difficulty: 'Advanced',
    question: 'Which material type is identified as a special case?',
    options: ['Self-oxidising metals', 'Paper', 'Cardboard', 'Untreated wood'],
    answer: 'Self-oxidising metals',
    explanation: 'Self-oxidising metals are a special case and may need specialist treatment.'
  },
  {
    category: 'FAFFA',
    difficulty: 'Core',
    question: 'What does FAFFA stand for?',
    options: ['First Aid Fire Fighting Appliances', 'Fire Alarm Fault Finding Assessment', 'Foam Application Fire Fighting Area', 'First Attack Fire Flow Appliance'],
    answer: 'First Aid Fire Fighting Appliances',
    explanation: 'FAFFA stands for First Aid Fire Fighting Appliances.'
  },
  {
    category: 'FAFFA',
    difficulty: 'Core',
    question: 'Which item is listed as FireMark equipment?',
    options: ['Stored pressure water appliance', 'Breathing apparatus set', 'Hydraulic ram', 'Thermal imaging camera'],
    answer: 'Stored pressure water appliance',
    explanation: 'The notes list stored pressure water, foam, dry powder, CO2, hose reel, foam trolley, fire blanket, wet chemical and metal powder appliances.'
  },
  {
    category: 'FAFFA',
    difficulty: 'Core',
    question: 'Which appliance is used for cooking oil and fat fires?',
    options: ['Wet chemical appliance', 'Water appliance', 'CO2 appliance only', 'Foam only'],
    answer: 'Wet chemical appliance',
    explanation: 'Wet chemical is used for Class F fires involving cooking oils and fats.'
  },
  {
    category: 'Extinguisher markings',
    difficulty: 'Core',
    question: 'What colour are all extinguishers described as in the notes?',
    options: ['Red', 'Blue', 'Black', 'Green'],
    answer: 'Red',
    explanation: 'The notes state that all extinguishers are red.'
  },
  {
    category: 'Extinguisher markings',
    difficulty: 'Core',
    question: 'Which information should extinguisher markings include?',
    options: ['Contents, operating instructions, fire classes and warnings', 'Only the manufacturer name', 'Only the price', 'Only the building name'],
    answer: 'Contents, operating instructions, fire classes and warnings',
    explanation: 'The notes list description of contents, operational instructions, pictures, fire classes and relevant warnings.'
  },
  {
    category: 'Safety procedure',
    difficulty: 'Core',
    question: 'What should always be done before approaching a fire with an extinguisher?',
    options: ['Test the extinguisher', 'Turn your back to the exit', 'Stand in smoke', 'Remove the label'],
    answer: 'Test the extinguisher',
    explanation: 'The notes clearly state that the extinguisher should always be tested before approaching the fire.'
  },
  {
    category: 'Safety procedure',
    difficulty: 'Applied',
    question: 'Why might an extinguisher be used during escape?',
    options: ['To aid escape if safe', 'To replace raising the alarm', 'To guarantee complete extinguishment', 'To enter deeper into smoke'],
    answer: 'To aid escape if safe',
    explanation: 'Extinguishers are often used to aid escape, not to encourage unsafe fire attack.'
  },
  {
    category: 'Safety procedure',
    difficulty: 'Core',
    question: 'What is required for extinguisher locations?',
    options: ['Signage', 'No labels', 'Hidden storage', 'Only verbal instruction'],
    answer: 'Signage',
    explanation: 'The notes state that signage is required.'
  },
  {
    category: 'Safety procedure',
    difficulty: 'Applied',
    question: 'Why should contractors bring their own firefighting media?',
    options: ['So they do not take away media allocated to the building', 'Because site extinguishers never work', 'Because contractors cannot fight any fire', 'Because water extinguishers are banned'],
    answer: 'So they do not take away media allocated to the building',
    explanation: 'Contractors should bring their own firefighting media so building provision is not reduced.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Class A fires involve what?',
    options: ['Solid combustible materials', 'Flammable liquids', 'Flammable gases', 'Cooking oils only'],
    answer: 'Solid combustible materials',
    explanation: 'Class A fires involve ordinary solid combustibles such as wood, paper and textiles.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which media are listed for Class A fires?',
    options: ['Water, foam, dry powder and wet chemical', 'CO2 only', 'Metal powder only', 'Wet chemical only'],
    answer: 'Water, foam, dry powder and wet chemical',
    explanation: 'The notes list water, foam, dry powder and wet chemical for Class A fires.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Class B fires involve what?',
    options: ['Flammable liquids', 'Wood and paper', 'Cooking oils only', 'Metals'],
    answer: 'Flammable liquids',
    explanation: 'Class B fires involve flammable liquids.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which media are listed for Class B fires?',
    options: ['Foam, dry powder and CO2', 'Water only', 'Wet chemical only', 'Metal powder only'],
    answer: 'Foam, dry powder and CO2',
    explanation: 'The notes list foam, dry powder and CO2 for Class B fires.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Class C fires involve what?',
    options: ['Flammable gases', 'Cooking oils', 'Metals', 'Paper'],
    answer: 'Flammable gases',
    explanation: 'Class C fires involve flammable gases.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which medium is listed for Class C fires?',
    options: ['Dry powder', 'Water', 'Wet chemical', 'Foam only'],
    answer: 'Dry powder',
    explanation: 'The notes list dry powder for Class C fires.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Class D fires involve what?',
    options: ['Metals', 'Flammable liquids', 'Electrical equipment', 'Cooking oils'],
    answer: 'Metals',
    explanation: 'Class D fires involve combustible metals.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which medium is listed for Class D fires?',
    options: ['Dry powder', 'Water', 'Foam', 'CO2 only'],
    answer: 'Dry powder',
    explanation: 'The notes list dry powder for Class D. Specialist metal powder may be required in practice.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which media are listed for electrical fires?',
    options: ['Dry powder and CO2', 'Water and foam', 'Wet chemical only', 'Metal powder and water'],
    answer: 'Dry powder and CO2',
    explanation: 'The notes list dry powder and CO2 for electrical fires.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Class F fires involve what?',
    options: ['Cooking oils and fats', 'Petrol vapour', 'Burning metals', 'Live wiring only'],
    answer: 'Cooking oils and fats',
    explanation: 'Class F fires involve cooking oils and fats.'
  },
  {
    category: 'Classes of fire',
    difficulty: 'Core',
    question: 'Which medium is listed for Class F fires?',
    options: ['Wet chemical', 'CO2 only', 'Water only', 'Metal powder'],
    answer: 'Wet chemical',
    explanation: 'Wet chemical is listed for Class F fires.'
  },
  {
    category: 'Large appliances',
    difficulty: 'Core',
    question: 'Where are 90 L, 100 L and 10 kg extinguishers described as useful?',
    options: ['Military Transport and fuel storage areas', 'Domestic bedrooms only', 'Office desks only', 'Computer keyboards only'],
    answer: 'Military Transport and fuel storage areas',
    explanation: 'The notes state they are useful for MT and fuel storage areas.'
  },
  {
    category: 'Scenario questions',
    difficulty: 'Applied',
    question: 'A small paper bin is burning. Which fire class is most likely?',
    options: ['Class A', 'Class B', 'Class C', 'Class F'],
    answer: 'Class A',
    explanation: 'Paper is a solid combustible material, so this is a Class A fire.'
  },
  {
    category: 'Scenario questions',
    difficulty: 'Applied',
    question: 'A small petrol spill is burning. Which fire class is most likely?',
    options: ['Class B', 'Class A', 'Class D', 'Class F'],
    answer: 'Class B',
    explanation: 'Petrol is a flammable liquid, so this is a Class B fire.'
  },
  {
    category: 'Scenario questions',
    difficulty: 'Applied',
    question: 'A small fire involves live electrical equipment. Which media are listed?',
    options: ['Dry powder or CO2', 'Water or foam', 'Wet chemical only', 'Water only'],
    answer: 'Dry powder or CO2',
    explanation: 'The notes list dry powder and CO2 for electrical fires.'
  },
  {
    category: 'Scenario questions',
    difficulty: 'Applied',
    question: 'A pan of cooking oil has ignited. Which appliance is most suitable?',
    options: ['Wet chemical appliance', 'Water appliance', 'Metal powder appliance', 'Hose reel'],
    answer: 'Wet chemical appliance',
    explanation: 'Cooking oil fires are Class F, and wet chemical is listed for Class F.'
  },
  {
    category: 'Scenario questions',
    difficulty: 'Advanced',
    question: 'A fire is growing, smoke is increasing and your escape route is uncertain. What is the safest decision?',
    options: ['Withdraw, raise the alarm and protect life', 'Continue until the extinguisher is empty', 'Move deeper into the building', 'Open all doors and windows immediately'],
    answer: 'Withdraw, raise the alarm and protect life',
    explanation: 'First-aid firefighting should not place you at risk. Life safety and escape come first.'
  }
]

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function percent(value, total) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

function FireExtinguishersApp() {
  const [mode, setMode] = useState('revision')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [randomise, setRandomise] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [answers, setAnswers] = useState({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [examQuestions, setExamQuestions] = useState(() => shuffle(questions).slice(0, EXAM_COUNT))
  const [examComplete, setExamComplete] = useState(false)

  const categories = ['All', ...new Set(questions.map(q => q.category))]
  const difficulties = ['All', 'Core', 'Applied', 'Advanced']

  const revisionQuestions = useMemo(() => {
    const filtered = questions.filter(q =>
      (category === 'All' || q.category === category) &&
      (difficulty === 'All' || q.difficulty === difficulty)
    )
    return randomise ? shuffle(filtered) : filtered
  }, [category, difficulty, randomise])

  const activeQuestions = mode === 'exam' ? examQuestions : revisionQuestions
  const current = activeQuestions[currentIndex]
  const answeredCount = activeQuestions.filter(q => answers[q.question]).length
  const score = activeQuestions.filter(q => answers[q.question] === q.answer).length
  const progress = percent(currentIndex + 1, activeQuestions.length)
  const examScore = percent(score, EXAM_COUNT)

  function resetRevision() {
    setAnswers({})
    setSelected('')
    setShowAnswer(false)
    setCurrentIndex(0)
    setExamComplete(false)
  }

  function startExam() {
    setMode('exam')
    setExamQuestions(shuffle(questions).slice(0, EXAM_COUNT))
    setAnswers({})
    setSelected('')
    setShowAnswer(false)
    setCurrentIndex(0)
    setExamComplete(false)
  }

  function submit() {
    if (!selected || !current) return
    setAnswers(prev => ({ ...prev, [current.question]: selected }))

    if (mode === 'revision') {
      setShowAnswer(true)
      return
    }

    if (currentIndex === activeQuestions.length - 1) {
      setExamComplete(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelected('')
      setShowAnswer(false)
    }
  }

  function goTo(index) {
    setCurrentIndex(index)
    setSelected(answers[activeQuestions[index].question] || '')
    setShowAnswer(mode === 'revision' && Boolean(answers[activeQuestions[index].question]))
  }

  function next() {
    if (currentIndex < activeQuestions.length - 1) goTo(currentIndex + 1)
  }

  function previous() {
    if (currentIndex > 0) goTo(currentIndex - 1)
  }

  if (!current) {
    return (
      <main className="app">
        <div className="empty-card">
          <h1>No questions found</h1>
          <p>Change your filters and try again.</p>
          <button onClick={() => { setCategory('All'); setDifficulty('All') }}>Reset filters</button>
        </div>
      </main>
    )
  }

  const userAnswer = answers[current.question]
  const isCorrect = userAnswer === current.answer

  return (
    <main className="app">
      <div className="container">
        <header className="hero">
          <div>
            <p className="kicker">Fire Service College Revision</p>
            <h1><Flame size={42} /> Day 2 Fire Extinguishers Quiz</h1>
            <p>Interactive multi-choice revision covering extinguishing techniques, FAFFA, extinguisher markings, fire classes, safety procedure, turning over and damping down.</p>
          </div>

          <div className="stats">
            <div><span>Mode</span><strong>{mode === 'exam' ? 'Exam' : 'Revision'}</strong></div>
            <div><span>Answered</span><strong>{answeredCount}</strong></div>
            <div><span>Score</span><strong>{mode === 'exam' ? `${score}/${EXAM_COUNT}` : score}</strong></div>
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <section className="panel">
              <h2>Mode</h2>
              <button className={mode === 'revision' ? 'mode active' : 'mode'} onClick={() => { setMode('revision'); resetRevision() }}>
                Revision Mode <span>Instant explanations after each question.</span>
              </button>
              <button className={mode === 'exam' ? 'mode active' : 'mode'} onClick={startExam}>
                Exam Mode <span>20 random questions, 70% pass mark.</span>
              </button>
            </section>

            {mode === 'revision' && (
              <section className="panel">
                <h2>Revision filters</h2>

                <label>Category</label>
                <select value={category} onChange={e => { setCategory(e.target.value); resetRevision() }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>

                <label>Difficulty</label>
                <select value={difficulty} onChange={e => { setDifficulty(e.target.value); resetRevision() }}>
                  {difficulties.map(d => <option key={d}>{d}</option>)}
                </select>

                <label className="check-row">
                  <span>Randomise questions</span>
                  <input type="checkbox" checked={randomise} onChange={e => { setRandomise(e.target.checked); resetRevision() }} />
                </label>

                <button className="secondary" onClick={resetRevision}><RotateCcw size={16} /> Restart</button>
              </section>
            )}

            <section className="panel">
              <h2>Question map</h2>
              <div className="question-map">
                {activeQuestions.map((q, index) => {
                  const answered = Boolean(answers[q.question])
                  const correct = answers[q.question] === q.answer
                  return (
                    <button key={q.question} className={`${index === currentIndex ? 'current' : ''} ${answered ? (correct ? 'correct' : 'wrong') : ''}`} onClick={() => goTo(index)}>
                      {index + 1}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="panel tip">
              <h2><GraduationCap size={20} /> Exam logic</h2>
              <p>Identify the fire class, choose the correct media, then consider whether it is safe to approach. Always keep escape in mind.</p>
            </section>
          </aside>

          <section>
            {mode === 'exam' && examComplete ? (
              <section className="question-card">
                <p className="kicker">Exam complete</p>
                <h2>{examScore >= PASS_MARK ? 'Pass' : 'Needs more revision'}</h2>
                <p className="large-score">You scored {score}/{EXAM_COUNT} ({examScore}%). Pass mark: {PASS_MARK}%.</p>
                <div className="progress"><div style={{ width: `${examScore}%` }} /></div>
                <button className="primary" onClick={startExam}>Start new exam</button>
                <button className="secondary" onClick={() => { setMode('revision'); resetRevision() }}>Back to revision</button>

                <div className="review">
                  {activeQuestions.map((q, index) => {
                    const answer = answers[q.question]
                    const correct = answer === q.answer
                    return (
                      <div className={correct ? 'review-item correct-review' : 'review-item wrong-review'} key={q.question}>
                        <h3>Question {index + 1}: {q.question}</h3>
                        <p>Your answer: <strong>{answer}</strong></p>
                        {!correct && <p>Correct answer: <strong>{q.answer}</strong></p>}
                        <p>{q.explanation}</p>
                      </div>
                    )
                  })}
                </div>
              </section>
            ) : (
              <section className="question-card">
                <p className="kicker">{mode === 'exam' ? 'Exam question' : 'Revision question'}</p>
                <div className="question-meta">
                  <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                  <span>{current.category}</span>
                  <span>{current.difficulty}</span>
                </div>

                <div className="progress"><div style={{ width: `${progress}%` }} /></div>

                <h2>{current.question}</h2>

                <div className="options">
                  {current.options.map(option => {
                    let className = 'option'
                    if (selected === option) className += ' selected'
                    if (mode === 'revision' && showAnswer && option === current.answer) className += ' correct'
                    if (mode === 'revision' && showAnswer && selected === option && option !== current.answer) className += ' wrong'

                    return (
                      <button key={option} className={className} onClick={() => !showAnswer && setSelected(option)}>
                        {option}
                      </button>
                    )
                  })}
                </div>

                <div className="actions">
                  <button className="secondary" disabled={currentIndex === 0} onClick={previous}>Previous</button>
                  <button className="primary" disabled={!selected || (mode === 'revision' && showAnswer)} onClick={submit}>
                    {mode === 'exam' && currentIndex === activeQuestions.length - 1 ? 'Finish exam' : mode === 'exam' ? 'Submit and continue' : 'Check answer'}
                  </button>
                  {mode === 'revision' && showAnswer && currentIndex < activeQuestions.length - 1 && (
                    <button className="secondary" onClick={next}>Next</button>
                  )}
                </div>

                {mode === 'revision' && showAnswer && (
                  <div className={isCorrect ? 'feedback good' : 'feedback bad'}>
                    {isCorrect ? <CheckCircle2 /> : <XCircle />}
                    <div>
                      <h3>{isCorrect ? 'Correct' : 'Not quite'}</h3>
                      {!isCorrect && <p>Correct answer: <strong>{current.answer}</strong></p>}
                      <p>{current.explanation}</p>
                    </div>
                  </div>
                )}

                {mode === 'exam' && (
                  <div className="exam-note">Exam mode: explanations are hidden until the end.</div>
                )}
              </section>
            )}

            <section className="reference-card">
              <h2>Quick reference</h2>
              <table>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Typical fuel</th>
                    <th>Media from notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>A</td><td>Solid combustibles</td><td>Water, foam, dry powder, wet chemical</td></tr>
                  <tr><td>B</td><td>Flammable liquids</td><td>Foam, dry powder, CO2</td></tr>
                  <tr><td>C</td><td>Flammable gases</td><td>Dry powder</td></tr>
                  <tr><td>D</td><td>Metals</td><td>Dry powder / specialist metal powder</td></tr>
                  <tr><td>Electrical</td><td>Live electrical equipment</td><td>Dry powder, CO2</td></tr>
                  <tr><td>F</td><td>Cooking oils and fats</td><td>Wet chemical</td></tr>
                </tbody>
              </table>
            </section>
          </section>
        </div>
      </div>
    </main>
  )
}

const FRIDAY_TEST_COUNT = 30
const fridayQuestions = [
  {
    "id": 1,
    "category": "Pump and priming",
    "question": "What is the minimum depth that the strainer should be submerged when using a centrifugal pump to lift water from an open source?",
    "answer": "Three times the suction hose diameter",
    "distractors": [
      "The same depth as the suction hose diameter",
      "Twice the suction hose diameter",
      "Four times the suction hose diameter"
    ],
    "explanation": "The top of the strainer should be submerged to a minimum depth equal to three times the suction hose diameter."
  },
  {
    "id": 2,
    "category": "Ground monitor",
    "question": "Which statement applies when operating a ground monitor?",
    "answer": "It delivers a large volume of water, allowing manpower to be reduced or withdrawn",
    "distractors": [
      "It delivers only a low-volume spray and must always be hand-held",
      "It can be operated safely without being secured",
      "It is used only for applying foam"
    ],
    "explanation": "A ground monitor can deliver a large volume of water while allowing firefighters to reduce their exposure."
  },
  {
    "id": 3,
    "category": "Drill ground commands",
    "question": "The command “REST” is used on the drill ground to correct a mistake. Who is authorised to give it?",
    "answer": "The trainer",
    "distractors": [
      "Any crew member",
      "Only the Officer in Charge",
      "Only the pump operator"
    ],
    "explanation": "REST is used by the trainer to stop the drill and correct a mistake."
  },
  {
    "id": 4,
    "category": "Hose and fittings",
    "question": "What is the purpose of a hose reel adaptor?",
    "answer": "To connect a hose reel to a 45 mm or 70 mm hose",
    "distractors": [
      "To connect two hard suction hoses",
      "To divide one delivery into two deliveries",
      "To attach a branch directly to a hydrant"
    ],
    "explanation": "The hose reel adaptor allows hose reel equipment to be connected to 45 mm or 70 mm hose."
  },
  {
    "id": 5,
    "category": "Pump gauges",
    "question": "What is the purpose of a compound gauge?",
    "answer": "To measure pressure and vacuum on the inlet side of the pump",
    "distractors": [
      "To measure delivery pressure only",
      "To measure engine speed",
      "To measure the amount of water remaining in the tank"
    ],
    "explanation": "The compound gauge shows positive inlet pressure or negative pressure/vacuum at the pump inlet."
  },
  {
    "id": 6,
    "category": "Hydrants",
    "question": "What do the numbers on a hydrant indicator plate represent?",
    "answer": "The top number is the main diameter in millimetres; the bottom number is the distance to the hydrant in metres",
    "distractors": [
      "The top number is water pressure; the bottom number is flow rate",
      "The top number is distance; the bottom number is main diameter",
      "The top number is hydrant depth; the bottom number is installation year"
    ],
    "explanation": "The upper figure identifies the main diameter and the lower figure gives the distance from the plate to the hydrant."
  },
  {
    "id": 7,
    "category": "Hydrants",
    "question": "What is the spindle made from on a screw-down hydrant?",
    "answer": "Bronze or gunmetal",
    "distractors": [
      "Mild steel only",
      "Aluminium alloy",
      "PVC"
    ],
    "explanation": "The spindle is made from bronze or gunmetal."
  },
  {
    "id": 8,
    "category": "Hydrant indicator plates",
    "question": "What does a Class A hydrant indicator plate indicate?",
    "answer": "A hydrant plate for general use except on roads of motorway standard",
    "distractors": [
      "An emergency water supply plate",
      "A meter-bypass valve plate",
      "A hydrant plate used only on roads of motorway standard"
    ],
    "explanation": "Class A plates are used generally, except on roads of motorway standard."
  },
  {
    "id": 9,
    "category": "Electrical safety",
    "question": "What is the maximum working voltage for the new standard electrical safety gloves?",
    "answer": "7,500 volts",
    "distractors": [
      "1,000 volts",
      "5,000 volts",
      "10,000 volts"
    ],
    "explanation": "The question set gives a maximum working voltage of 7,500 V."
  },
  {
    "id": 10,
    "category": "Hose stowage",
    "question": "What are the two methods of making up delivery hose before it is stowed on an appliance?",
    "answer": "Conventionally rolled and Dutch rolled",
    "distractors": [
      "Figure-of-eight and coiled",
      "Flat packed and spiral rolled",
      "Single rolled and double rolled"
    ],
    "explanation": "Delivery hose is normally made up using a conventional roll or a Dutch roll."
  },
  {
    "id": 11,
    "category": "Water mains",
    "question": "What are the two types of water main in general use on MOD establishments?",
    "answer": "Ring main and straight main",
    "distractors": [
      "Wet main and dry main",
      "Primary main and reserve main",
      "High-pressure main and low-pressure main"
    ],
    "explanation": "The two types listed are ring mains and straight mains."
  },
  {
    "id": 12,
    "category": "Pump fault diagnosis",
    "question": "If a pump fails to prime and the compound gauge shows no vacuum, what may be the cause?",
    "answer": "Loose or faulty suction joints",
    "distractors": [
      "A fully submerged strainer",
      "A closed delivery valve",
      "Excessive delivery pressure"
    ],
    "explanation": "Loose or faulty suction joints can admit air and prevent a vacuum from forming."
  },
  {
    "id": 13,
    "category": "Pump operation",
    "question": "What minimum pressure should be maintained in a pump to support efficient cooling and hold the prime?",
    "answer": "1.5 bar",
    "distractors": [
      "0.5 bar",
      "1.0 bar",
      "2.5 bar"
    ],
    "explanation": "The minimum pressure given is 1.5 bar."
  },
  {
    "id": 14,
    "category": "Suction hose",
    "question": "When should suction hose be tested?",
    "answer": "On acceptance, during the quarterly vehicle pump test and after operational use",
    "distractors": [
      "Monthly only",
      "Annually only",
      "On acceptance and after repair only"
    ],
    "explanation": "The listed test points are acceptance, the quarterly pump test and after operational use."
  },
  {
    "id": 15,
    "category": "Equipment inspection",
    "question": "Which mnemonic describes the daily inspection of powered rescue equipment?",
    "answer": "POWER: Petrol, Oil, Water, Electrics and Rubber",
    "distractors": [
      "PUMP: Pressure, Use, Maintenance and Power",
      "HOSE: Hydraulics, Oil, Safety and Electrics",
      "CHECK: Controls, Hydraulics, Engine, Couplings and Kit"
    ],
    "explanation": "POWER stands for Petrol, Oil, Water, Electrics and Rubber."
  },
  {
    "id": 16,
    "category": "Hose and fittings",
    "question": "What is the coupling size on a dividing breech?",
    "answer": "65 mm",
    "distractors": [
      "45 mm",
      "70 mm",
      "100 mm"
    ],
    "explanation": "The question set gives the dividing breech coupling size as 65 mm."
  },
  {
    "id": 17,
    "category": "Centrifugal pumps",
    "question": "What are the main advantages of a centrifugal pump?",
    "answer": "Compactness, constant flow, ease of maintenance and ease of operation",
    "distractors": [
      "Self-priming, no moving parts and no maintenance",
      "Ability to pump gases, silent operation and zero friction",
      "Low flow, high weight and complex operation"
    ],
    "explanation": "The listed advantages are compactness, constant flow, ease of maintenance and ease of operation."
  },
  {
    "id": 18,
    "category": "Water relay",
    "question": "When a base pump is working from open water in a relay, what maximum suction lift should not be exceeded?",
    "answer": "3 metres",
    "distractors": [
      "1 metre",
      "5 metres",
      "8 metres"
    ],
    "explanation": "For relay efficiency, the base pump suction lift should not exceed 3 m."
  },
  {
    "id": 19,
    "category": "Centrifugal pumps",
    "question": "Which set contains component parts of a main centrifugal water pump?",
    "answer": "Volute, guide vanes and impeller",
    "distractors": [
      "Piston, crankshaft and spark plug",
      "Strainer, branch and standpipe",
      "Battery, sensor and display screen"
    ],
    "explanation": "The volute, guide vanes and impeller are pump components."
  },
  {
    "id": 20,
    "category": "Electrical safety",
    "question": "What action should be taken if an electrically insulated tool is perished or its insulation is cracked?",
    "answer": "Treat it as unserviceable and remove it from use",
    "distractors": [
      "Wrap the damaged area with tape and continue using it",
      "Use it only at reduced voltage",
      "Return it to service after wiping it clean"
    ],
    "explanation": "Damaged electrical insulation makes the tool unserviceable."
  },
  {
    "id": 21,
    "category": "Ladders",
    "question": "Whenever possible, where should a ladder be pitched within a window or other opening?",
    "answer": "In the safest position for access, egress and rescue",
    "distractors": [
      "Directly in the centre regardless of conditions",
      "Against the weakest side of the opening",
      "As far from the opening as possible"
    ],
    "explanation": "The ladder position should support safe access, exit and rescue."
  },
  {
    "id": 22,
    "category": "Priming systems",
    "question": "Which parts play a major role in achieving a prime when operating a water-ring primer?",
    "answer": "Impeller, oval housing and hollow axle",
    "distractors": [
      "Piston, cylinder and crankshaft",
      "Volute, branch and delivery valve",
      "Strainer, basket and suction wrench"
    ],
    "explanation": "The water-ring primer relies on the impeller, oval housing and hollow axle."
  },
  {
    "id": 23,
    "category": "Hydrant indicator plates",
    "question": "Which class of indicator plate is used for meter-bypass valves?",
    "answer": "Class D",
    "distractors": [
      "Class A",
      "Class B",
      "Class C"
    ],
    "explanation": "Class D plates identify meter-bypass valves."
  },
  {
    "id": 24,
    "category": "Pump fault diagnosis",
    "question": "Which suction-side defect can prevent a pump from priming while producing no vacuum reading?",
    "answer": "Loose or faulty suction joints",
    "distractors": [
      "A correctly fitted basket strainer",
      "A fully closed tank-to-pump valve",
      "A branch opened gradually"
    ],
    "explanation": "Air entering through loose or faulty suction joints prevents the pump from establishing a vacuum."
  },
  {
    "id": 25,
    "category": "Ladders",
    "question": "What is the correct frequency of tests for fire service ladders?",
    "answer": "On acceptance, three-monthly visual inspection, visual inspection after operational use and an annual load test",
    "distractors": [
      "Monthly load test only",
      "On acceptance and every five years",
      "Annual visual inspection with no load test"
    ],
    "explanation": "The schedule includes acceptance, quarterly visual checks, post-use inspection and an annual load test."
  },
  {
    "id": 26,
    "category": "Pump gauges",
    "question": "What will the vacuum gauge show if the suction strainer becomes blocked?",
    "answer": "An increased vacuum reading",
    "distractors": [
      "A decreased vacuum reading",
      "No change at all",
      "A positive delivery pressure reading"
    ],
    "explanation": "A blocked strainer increases suction resistance, causing the vacuum reading to rise."
  },
  {
    "id": 27,
    "category": "Hydrants",
    "question": "Hydrants conforming to BS 750:1984 should produce at least 2,000 L/min at what constant pressure?",
    "answer": "1.7 bar",
    "distractors": [
      "1.0 bar",
      "1.5 bar",
      "3.0 bar"
    ],
    "explanation": "The specified figure in the question set is 2,000 L/min at 1.7 bar."
  },
  {
    "id": 28,
    "category": "Hydrant indicator plates",
    "question": "Which class of indicator plate is used for an emergency water supply (EWS)?",
    "answer": "Class C",
    "distractors": [
      "Class A",
      "Class B",
      "Class D"
    ],
    "explanation": "Class C plates identify emergency water supplies."
  },
  {
    "id": 29,
    "category": "Pump fault diagnosis",
    "question": "You notice an unexpected and significant decrease in delivery pressure. What is a likely cause?",
    "answer": "A burst length of hose",
    "distractors": [
      "A branch being closed down",
      "An increase in engine speed",
      "A blocked suction strainer causing greater vacuum only"
    ],
    "explanation": "A burst hose length can cause a sudden and significant loss of delivery pressure."
  },
  {
    "id": 30,
    "category": "Priming systems",
    "question": "Which three components are central to the operation of a water-ring primer?",
    "answer": "Impeller, oval housing and hollow axle",
    "distractors": [
      "Piston, connecting rod and cylinder",
      "Delivery valve, branch and nozzle",
      "Compound gauge, delivery gauge and tachometer"
    ],
    "explanation": "The key water-ring primer components listed are the impeller, oval housing and hollow axle."
  },
  {
    "id": 31,
    "category": "Pump fault diagnosis",
    "question": "What causes crackling jets?",
    "answer": "Air being taken into the pump with the water",
    "distractors": [
      "Excessive foam concentrate",
      "A fully closed branch",
      "Water being too cold"
    ],
    "explanation": "Air mixed with the water is compressed and expands as it leaves the nozzle, producing a crackling jet."
  },
  {
    "id": 32,
    "category": "Hydrants",
    "question": "Why is a frost valve fitted to a hydrant?",
    "answer": "To drain the hydrant body and prevent freezing damage or inoperability",
    "distractors": [
      "To increase hydrant pressure",
      "To measure water flow",
      "To stop the hydrant being opened slowly"
    ],
    "explanation": "The frost valve allows the body to drain so trapped water does not freeze."
  },
  {
    "id": 33,
    "category": "Suction hose",
    "question": "What are the two common diameters of hard suction hose?",
    "answer": "100 mm and 140 mm",
    "distractors": [
      "45 mm and 70 mm",
      "65 mm and 90 mm",
      "70 mm and 100 mm"
    ],
    "explanation": "Hard suction hose is commonly supplied in 100 mm and 140 mm diameters."
  },
  {
    "id": 34,
    "category": "Hose testing",
    "question": "When should lay-flat delivery hose and hose reel tubing be subjected to a pressure test according to this question set?",
    "answer": "On acceptance, annually and after operational use",
    "distractors": [
      "Monthly only",
      "Quarterly only",
      "On acceptance and after repair only"
    ],
    "explanation": "The supplied answer lists acceptance, annual testing and testing after operational use."
  },
  {
    "id": 35,
    "category": "Pump gauges",
    "question": "Which gauge measures both pressure and vacuum on the inlet side of a fire pump?",
    "answer": "The compound gauge",
    "distractors": [
      "The delivery pressure gauge",
      "The tachometer",
      "The tank contents gauge"
    ],
    "explanation": "The compound gauge reads inlet pressure and vacuum."
  },
  {
    "id": 36,
    "category": "Priming systems",
    "question": "What engine speed is appropriate for operation of a water-ring primer?",
    "answer": "2,500 RPM",
    "distractors": [
      "1,000 RPM",
      "1,500 RPM",
      "3,500 RPM"
    ],
    "explanation": "The question set gives an operating speed of 2,500 RPM."
  },
  {
    "id": 37,
    "category": "Ladders",
    "question": "How far from the base of a building should the heel of a ladder be positioned for operational use?",
    "answer": "One third of the ladder’s working height",
    "distractors": [
      "One quarter of the working height",
      "One half of the working height",
      "The same distance as the working height"
    ],
    "explanation": "The supplied answer uses a heel distance equal to one third of the working height."
  },
  {
    "id": 38,
    "category": "Hydrants",
    "question": "What item provides an access point to a mains water supply for firefighting?",
    "answer": "A hydrant",
    "distractors": [
      "A dividing breech",
      "A collecting head",
      "A hose reel adaptor"
    ],
    "explanation": "A hydrant provides access to the mains water supply."
  },
  {
    "id": 39,
    "category": "Water relay",
    "question": "Which two measures help maximise the efficiency of a water relay from open water at the base pump?",
    "answer": "Keep the lift to a maximum of 3 metres and reduce the distance to the next pump to two hose lengths",
    "distractors": [
      "Use an 8-metre lift and increase the first spacing to six hose lengths",
      "Position the base pump farther from the source and close all deliveries",
      "Use the smallest available hose and maximise suction lift"
    ],
    "explanation": "The base pump should have no more than a 3 m lift, with reduced spacing to the next pump."
  },
  {
    "id": 40,
    "category": "Open-water pumping",
    "question": "What are the practical and theoretical maximum lifts from an open water source?",
    "answer": "8 metres practical and 10 metres theoretical",
    "distractors": [
      "3 metres practical and 5 metres theoretical",
      "5 metres practical and 8 metres theoretical",
      "10 metres practical and 12 metres theoretical"
    ],
    "explanation": "The practical lift is approximately 8 m, while the theoretical limit is 10 m."
  },
  {
    "id": 41,
    "category": "Pump gauges",
    "question": "What could cause a rapid increase in the delivery pressure gauge reading when operating a centrifugal pump?",
    "answer": "Closing down a hand-controlled branch",
    "distractors": [
      "Opening another delivery",
      "A burst hose length",
      "Increasing the flow through every branch"
    ],
    "explanation": "Closing a branch reduces flow and can cause delivery pressure to rise rapidly."
  },
  {
    "id": 42,
    "category": "Drill ground commands",
    "question": "The command “STILL” is used only in an emergency. Who may give it?",
    "answer": "Any crew member or the Officer in Charge",
    "distractors": [
      "Only the trainer",
      "Only the pump operator",
      "Only the most senior firefighter present"
    ],
    "explanation": "STILL is an emergency safety command and may be given by anyone who identifies the danger."
  },
  {
    "id": 43,
    "category": "Pump gauges",
    "question": "How does a blocked suction strainer affect the vacuum gauge?",
    "answer": "It causes the vacuum reading to increase",
    "distractors": [
      "It causes the reading to become positive pressure",
      "It causes the reading to fall to zero in every case",
      "It affects only the delivery gauge"
    ],
    "explanation": "A restriction on the suction side increases the vacuum needed to draw water."
  },
  {
    "id": 44,
    "category": "Water supplies",
    "question": "What are the three types of water supply on an MOD unit?",
    "answer": "Mains, secondary and natural supplies",
    "distractors": [
      "Primary, tertiary and foam supplies",
      "Hydrant, hose reel and tanker supplies",
      "High-pressure, low-pressure and gravity supplies"
    ],
    "explanation": "The three groups are mains, secondary and natural water supplies."
  },
  {
    "id": 45,
    "category": "Hose protection",
    "question": "What is the primary purpose of a hose ramp?",
    "answer": "To protect hose from damage when vehicles drive over it",
    "distractors": [
      "To increase pressure in the hose",
      "To allow hose to kink safely around corners",
      "To connect two delivery hoses"
    ],
    "explanation": "Hose ramps prevent vehicles from crushing or deforming hose laid across a roadway."
  },
  {
    "id": 46,
    "category": "Hose protection",
    "question": "What should be used when a charged hose must cross a road used by vehicles?",
    "answer": "Hose ramps",
    "distractors": [
      "A dividing breech",
      "A collecting head",
      "A basket strainer"
    ],
    "explanation": "Hose ramps protect the hose and permit safer vehicle passage."
  },
  {
    "id": 47,
    "category": "Pump operation",
    "question": "What pressure should be maintained to support the pump cooling system and retain the prime?",
    "answer": "At least 1.5 bar",
    "distractors": [
      "At least 0.5 bar",
      "Exactly 1.0 bar",
      "At least 4 bar"
    ],
    "explanation": "The question set specifies a minimum of 1.5 bar."
  },
  {
    "id": 48,
    "category": "Open-water pumping",
    "question": "After achieving a prime from open water, what pressure must be maintained to hold water until it is needed?",
    "answer": "Not less than 1.5 bar",
    "distractors": [
      "Not less than 0.5 bar",
      "Exactly 1.0 bar",
      "Not less than 4 bar"
    ],
    "explanation": "Maintaining at least 1.5 bar helps hold the prime and support cooling."
  },
  {
    "id": 49,
    "category": "Hose testing",
    "question": "How often should fire service delivery hose be pressure tested?",
    "answer": "On acceptance, after operational use and annually",
    "distractors": [
      "Every month only",
      "Every five years only",
      "On acceptance and after repair only"
    ],
    "explanation": "The listed schedule is acceptance, after operational use and annually."
  },
  {
    "id": 50,
    "category": "Delivery hose",
    "question": "What are the two common diameters of fire service delivery hose?",
    "answer": "45 mm and 70 mm",
    "distractors": [
      "65 mm and 100 mm",
      "70 mm and 140 mm",
      "19 mm and 45 mm"
    ],
    "explanation": "Delivery hose is commonly supplied in 45 mm and 70 mm diameters."
  }
]

function shuffleFridayItems(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function prepareFridayQuestions(items) {
  return items.map((item) => ({
    ...item,
    options: shuffleFridayItems([item.answer, ...item.distractors])
  }))
}

function FridayExamApp() {
  const [mode, setMode] = useState('practice')
  const [practiceQuestions, setPracticeQuestions] = useState(() => prepareFridayQuestions(fridayQuestions))
  const [testQuestions, setTestQuestions] = useState(() =>
    prepareFridayQuestions(shuffleFridayItems(fridayQuestions).slice(0, FRIDAY_TEST_COUNT))
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [answers, setAnswers] = useState({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [testComplete, setTestComplete] = useState(false)

  const activeQuestions = mode === 'test' ? testQuestions : practiceQuestions
  const current = activeQuestions[currentIndex]
  const answeredCount = activeQuestions.filter((q) => answers[q.id]).length
  const score = activeQuestions.filter((q) => answers[q.id] === q.answer).length
  const progress = percent(currentIndex + 1, activeQuestions.length)
  const testScore = percent(score, FRIDAY_TEST_COUNT)

  function resetPractice() {
    setPracticeQuestions(prepareFridayQuestions(fridayQuestions))
    setCurrentIndex(0)
    setSelected('')
    setAnswers({})
    setShowAnswer(false)
    setTestComplete(false)
  }

  function startPractice() {
    setMode('practice')
    resetPractice()
  }

  function startTest() {
    setMode('test')
    setTestQuestions(
      prepareFridayQuestions(
        shuffleFridayItems(fridayQuestions).slice(0, FRIDAY_TEST_COUNT)
      )
    )
    setCurrentIndex(0)
    setSelected('')
    setAnswers({})
    setShowAnswer(false)
    setTestComplete(false)
  }

  function submitAnswer() {
    if (!selected || !current) return

    setAnswers((previous) => ({
      ...previous,
      [current.id]: selected
    }))

    if (mode === 'practice') {
      setShowAnswer(true)
      return
    }

    if (currentIndex === activeQuestions.length - 1) {
      setTestComplete(true)
      return
    }

    setCurrentIndex((index) => index + 1)
    setSelected('')
    setShowAnswer(false)
  }

  function goToQuestion(index) {
    if (
      mode === 'test' &&
      index > currentIndex &&
      !answers[activeQuestions[index]?.id]
    ) {
      return
    }

    setCurrentIndex(index)
    setSelected(answers[activeQuestions[index]?.id] || '')
    setShowAnswer(
      mode === 'practice' &&
      Boolean(answers[activeQuestions[index]?.id])
    )
  }

  function nextQuestion() {
    if (currentIndex < activeQuestions.length - 1) {
      goToQuestion(currentIndex + 1)
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1)
    }
  }

  if (!current) return null

  const userAnswer = answers[current.id]
  const isCorrect = userAnswer === current.answer

  return (
    <main className="app friday-app">
      <div className="container">
        <header className="hero friday-hero">
          <div>
            <p className="kicker">Friday assessment revision</p>
            <h1><GraduationCap size={42} /> Friday Exam</h1>
            <p>
              Practise all 50 questions with immediate feedback, or start a test containing
              30 questions selected randomly from the full question bank.
            </p>
          </div>

          <div className="stats">
            <div><span>Question bank</span><strong>50</strong></div>
            <div><span>Current set</span><strong>{activeQuestions.length}</strong></div>
            <div><span>Score</span><strong>{score}</strong></div>
          </div>
        </header>

        <div className="layout">
          <aside className="sidebar">
            <section className="panel">
              <h2>Friday Exam modes</h2>
              <button
                className={mode === 'practice' ? 'mode active' : 'mode'}
                onClick={startPractice}
              >
                Practice all 50
                <span>Immediate marking and an explanation after every answer.</span>
              </button>
              <button
                className={mode === 'test' ? 'mode active' : 'mode'}
                onClick={startTest}
              >
                Random 30-question test
                <span>Answers remain hidden until the test is complete.</span>
              </button>
            </section>

            <section className="panel">
              <h2>Progress</h2>
              <p><strong>{answeredCount}</strong> of {activeQuestions.length} answered</p>
              <div className="progress small-progress">
                <div style={{ width: `${percent(answeredCount, activeQuestions.length)}%` }} />
              </div>
              <button
                className="secondary"
                onClick={mode === 'test' ? startTest : resetPractice}
              >
                <RotateCcw size={16} />
                {mode === 'test' ? 'Generate new test' : 'Restart practice'}
              </button>
            </section>

            <section className="panel">
              <h2>Question map</h2>
              <div className="question-map friday-map">
                {activeQuestions.map((question, index) => {
                  const hasAnswer = Boolean(answers[question.id])
                  const correct = answers[question.id] === question.answer
                  const locked =
                    mode === 'test' &&
                    index > currentIndex &&
                    !hasAnswer

                  let className = index === currentIndex ? 'current' : ''
                  if (hasAnswer && mode === 'practice') {
                    className += correct ? ' correct' : ' wrong'
                  } else if (hasAnswer) {
                    className += ' answered'
                  }

                  return (
                    <button
                      key={question.id}
                      className={className}
                      disabled={locked}
                      onClick={() => goToQuestion(index)}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="panel tip">
              <h2><GraduationCap size={20} /> Test rules</h2>
              <p>
                Each new test randomly selects 30 different questions from the bank of 50.
                The four choices are also shuffled whenever a new practice session or test begins.
              </p>
            </section>
          </aside>

          <section>
            {mode === 'test' && testComplete ? (
              <section className="question-card">
                <p className="kicker">Friday test complete</p>
                <h2>{testScore >= PASS_MARK ? 'Pass' : 'Needs more revision'}</h2>
                <p className="large-score">
                  You scored {score}/{FRIDAY_TEST_COUNT} ({testScore}%).
                  The current pass mark is {PASS_MARK}%.
                </p>

                <div className="progress">
                  <div style={{ width: `${testScore}%` }} />
                </div>

                <button className="primary" onClick={startTest}>Generate another test</button>
                <button className="secondary" onClick={startPractice}>Practise all 50</button>

                <div className="review">
                  {activeQuestions.map((question, index) => {
                    const answer = answers[question.id]
                    const correct = answer === question.answer

                    return (
                      <div
                        className={correct ? 'review-item correct-review' : 'review-item wrong-review'}
                        key={question.id}
                      >
                        <p className="review-category">{question.category}</p>
                        <h3>Question {index + 1}: {question.question}</h3>
                        <p>Your answer: <strong>{answer || 'Not answered'}</strong></p>
                        {!correct && (
                          <p>Correct answer: <strong>{question.answer}</strong></p>
                        )}
                        <p>{question.explanation}</p>
                      </div>
                    )
                  })}
                </div>
              </section>
            ) : (
              <section className="question-card">
                <p className="kicker">
                  {mode === 'test' ? 'Random 30-question test' : 'Practice all 50'}
                </p>

                <div className="question-meta">
                  <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                  <span>{current.category}</span>
                  <span>{mode === 'test' ? 'Test' : 'Practice'}</span>
                </div>

                <div className="progress">
                  <div style={{ width: `${progress}%` }} />
                </div>

                <h2>{current.question}</h2>

                <div className="options">
                  {current.options.map((option) => {
                    let className = 'option'
                    if (selected === option) className += ' selected'
                    if (
                      mode === 'practice' &&
                      showAnswer &&
                      option === current.answer
                    ) className += ' correct'
                    if (
                      mode === 'practice' &&
                      showAnswer &&
                      selected === option &&
                      option !== current.answer
                    ) className += ' wrong'

                    return (
                      <button
                        key={option}
                        className={className}
                        onClick={() => !showAnswer && setSelected(option)}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>

                <div className="actions">
                  <button
                    className="secondary"
                    disabled={currentIndex === 0}
                    onClick={previousQuestion}
                  >
                    Previous
                  </button>

                  <button
                    className="primary"
                    disabled={!selected || (mode === 'practice' && showAnswer)}
                    onClick={submitAnswer}
                  >
                    {mode === 'test' && currentIndex === activeQuestions.length - 1
                      ? 'Finish test'
                      : mode === 'test'
                        ? 'Submit and continue'
                        : 'Check answer'}
                  </button>

                  {mode === 'practice' &&
                    showAnswer &&
                    currentIndex < activeQuestions.length - 1 && (
                      <button className="secondary" onClick={nextQuestion}>
                        Next
                      </button>
                    )}
                </div>

                {mode === 'practice' && showAnswer && (
                  <div className={isCorrect ? 'feedback good' : 'feedback bad'}>
                    {isCorrect ? <CheckCircle2 /> : <XCircle />}
                    <div>
                      <h3>{isCorrect ? 'Correct' : 'Not quite'}</h3>
                      {!isCorrect && (
                        <p>Correct answer: <strong>{current.answer}</strong></p>
                      )}
                      <p>{current.explanation}</p>
                    </div>
                  </div>
                )}

                {mode === 'test' && (
                  <div className="exam-note">
                    Test mode: the correct answers and explanations are shown only after
                    all 30 questions have been completed.
                  </div>
                )}
              </section>
            )}

            <section className="reference-card">
              <h2>Friday Exam structure</h2>
              <table>
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Questions</th>
                    <th>Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Practice</td>
                    <td>All 50</td>
                    <td>Immediate answer and explanation</td>
                  </tr>
                  <tr>
                    <td>Test</td>
                    <td>30 randomly selected from 50</td>
                    <td>Results and review after completion</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </section>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const [section, setSection] = useState('extinguishers')

  return (
    <>
      <nav className="site-nav" aria-label="Quiz sections">
        <div className="site-nav-inner">
          <button
            className={section === 'extinguishers' ? 'section-tab active' : 'section-tab'}
            onClick={() => setSection('extinguishers')}
          >
            Fire Extinguishers
          </button>
          <button
            className={section === 'friday' ? 'section-tab active' : 'section-tab'}
            onClick={() => setSection('friday')}
          >
            Friday Exam
          </button>
        </div>
      </nav>

      {section === 'extinguishers'
        ? <FireExtinguishersApp />
        : <FridayExamApp />}
    </>
  )
}

