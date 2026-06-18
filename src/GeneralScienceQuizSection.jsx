import React, { useMemo, useState } from 'react'

const GENERAL_SCIENCE_PASS_MARK = 80
const GENERAL_SCIENCE_TEST_COUNT = 30

const generalScienceQuestions = [
  {
    "id": 1,
    "question": "What effect will doubling the velocity have on the amount of water being delivered from a length of hose?",
    "answer": "Twice the quantity of water being delivered.",
    "distractors": [
      "Half the quantity of water being delivered.",
      "Four times the quantity of water being delivered.",
      "No change to the quantity of water being delivered."
    ],
    "explanation": "Twice the quantity of water being delivered."
  },
  {
    "id": 2,
    "question": "Which of the following statements is correct?",
    "answer": "A. Friction loss varies directly with the length of a pipe.",
    "distractors": [
      "B. For an increase in velocity, friction loss decreases.",
      "C. Friction loss is dependent on pressure.",
      "D. Friction loss decreases with the roughness of the interior of a pipe."
    ],
    "explanation": "A. Friction loss varies directly with the length of a pipe."
  },
  {
    "id": 3,
    "question": "What are the four principle types of extinguishing agents?",
    "answer": "Water, Foam, CO² and Dry Powder.",
    "distractors": [
      "Water, Steam, Sand and Oxygen.",
      "Foam, Petrol, CO² and Dry Powder.",
      "Water, Air, CO² and Electricity."
    ],
    "explanation": "Water, Foam, CO² and Dry Powder."
  },
  {
    "id": 4,
    "question": "Which term can be defined as the amount by which a unit length of a substance expands when its temperature is raised by one degree Celsius (1°C)?",
    "answer": "Co-efficient of linear expansion of a substance.",
    "distractors": [
      "Flash point.",
      "Cubical expansion.",
      "Optimum pressure."
    ],
    "explanation": "Co-efficient of linear expansion of a substance."
  },
  {
    "id": 5,
    "question": "What are the two most common thermometric scales in use?",
    "answer": "Celsius and Fahrenheit.",
    "distractors": [
      "Kelvin and Rankine.",
      "Pascal and Bar.",
      "Celsius and Newton."
    ],
    "explanation": "Celsius and Fahrenheit."
  },
  {
    "id": 6,
    "question": "One (1) Bar is equal to approximately what?",
    "answer": "100,000 N/m².",
    "distractors": [
      "10,000 N/m².",
      "1,000 N/m².",
      "1,000,000 N/m²."
    ],
    "explanation": "100,000 N/m²."
  },
  {
    "id": 7,
    "question": "Dry Powder when discharged is suspended in gas as a dense expanding cloud which: (pick one)",
    "answer": "A. Rapidly cools the fuel below the temperature for burning to continue.",
    "distractors": [
      "It will decrease.",
      "It will remain unchanged.",
      "Water Hammer."
    ],
    "explanation": "A. Rapidly cools the fuel below the temperature for burning to continue."
  },
  {
    "id": 8,
    "question": "When water is being projected from a branch, a force equal to and opposite that of the jet takes place at the nozzle. What is this called?",
    "answer": "Jet Reaction",
    "distractors": [
      "Water Hammer",
      "Tuberculation",
      "Cubical expansion"
    ],
    "explanation": "Jet Reaction"
  },
  {
    "id": 9,
    "question": "What pressure does a column of air 1 m² and extending to the upper limits of the atmosphere exert at sea level?",
    "answer": "1 bar.",
    "distractors": [
      "0.1 bar.",
      "2 bar.",
      "10 bar."
    ],
    "explanation": "1 bar."
  },
  {
    "id": 10,
    "question": "How many litres of water are there in 1 cubic metre (1 m3) of water?",
    "answer": "1,000 litres.",
    "distractors": [
      "100 litres.",
      "10,000 litres.",
      "500 litres."
    ],
    "explanation": "1,000 litres."
  },
  {
    "id": 11,
    "question": "What three factors are needed to make the ‘Triangle of Combustion’?",
    "answer": "Oxygen, fuel and heat.",
    "distractors": [
      "Fuel, smoke and water.",
      "Oxygen, nitrogen and foam.",
      "Heat, steam and carbon dioxide."
    ],
    "explanation": "Oxygen, fuel and heat."
  },
  {
    "id": 12,
    "question": "What is the capacity of a rectangular tank with dimensions of 6 m x 4 m x 2 m (L x W x D)?",
    "answer": "48,000 litres.",
    "distractors": [
      "12,000 litres.",
      "24,000 litres.",
      "96,000 litres."
    ],
    "explanation": "48,000 litres."
  },
  {
    "id": 13,
    "question": "What is the chemical composition of water?",
    "answer": "H²O.",
    "distractors": [
      "CO².",
      "O².",
      "H²SO⁴."
    ],
    "explanation": "H²O."
  },
  {
    "id": 14,
    "question": "What happens when liquefied gases stored in cylinders are heated above their critical temperature?",
    "answer": "The liquefied gas vaporises increasing the pressure with a risk of explosion.",
    "distractors": [
      "The pressure always decreases.",
      "The gas becomes harmless.",
      "The cylinder contents freeze solid."
    ],
    "explanation": "The liquefied gas vaporises increasing the pressure with a risk of explosion."
  },
  {
    "id": 15,
    "question": "What will be the effect on frictional loss if the interior surface of pipe becomes rougher?",
    "answer": "It will increase.",
    "distractors": [
      "It will decrease.",
      "It will remain unchanged.",
      "It will become zero."
    ],
    "explanation": "It will increase."
  },
  {
    "id": 16,
    "question": "The amount by which unit of length of a substance expands when its temperature is raised by one degree Celsius (1°C) is referred to as what?",
    "answer": "The Coefficient of Linear Expansion.",
    "distractors": [
      "Flash point.",
      "Cubical expansion.",
      "Optimum pressure."
    ],
    "explanation": "The Coefficient of Linear Expansion."
  },
  {
    "id": 17,
    "question": "Which term is defined as the lowest temperature at which a substance gives off sufficient flammable vapour in the air to produce a momentary flash on the application of a small flame?",
    "answer": "Flash Point.",
    "distractors": [
      "Boiling point.",
      "Ignition pressure.",
      "Optimum pressure."
    ],
    "explanation": "Flash Point."
  },
  {
    "id": 18,
    "question": "Which of the following describes the boiling point of water?",
    "answer": "100°C ,  212°F",
    "distractors": [
      "0°C / 32°F.",
      "50°C / 122°F.",
      "200°C / 392°F."
    ],
    "explanation": "100°C ,  212°F"
  },
  {
    "id": 19,
    "question": "What is the optimum pressure for a 20 mm nozzle?",
    "answer": "5.0 bar.",
    "distractors": [
      "1.5 bar.",
      "3.0 bar.",
      "10.0 bar."
    ],
    "explanation": "5.0 bar."
  },
  {
    "id": 20,
    "question": "What is the approximate capacity of a 70 mm hose 23 m long?",
    "answer": "100 litres.",
    "distractors": [
      "50 litres.",
      "200 litres.",
      "1,000 litres."
    ],
    "explanation": "100 litres."
  },
  {
    "id": 21,
    "question": "What is the mass of 1 cubic metre of water?",
    "answer": "1000 kg.",
    "distractors": [
      "100 kg.",
      "10 kg.",
      "10,000 kg."
    ],
    "explanation": "1000 kg."
  },
  {
    "id": 22,
    "question": "Which term is used to describe the pressure at which a nozzle delivers water most efficiently?",
    "answer": "Optimum Pressure.",
    "distractors": [
      "Flash point.",
      "Jet reaction.",
      "Static lift."
    ],
    "explanation": "Optimum Pressure."
  },
  {
    "id": 23,
    "question": "What in the term that describes the transfer of heat by Radiation?",
    "answer": "Heat being transmitted in straight lines, does not involve contact between bodies, the heat diminishes with distance.",
    "distractors": [
      "Heat transfer through direct contact only.",
      "Heat transfer only through liquids.",
      "Heat transfer caused by friction loss in a hose."
    ],
    "explanation": "Heat being transmitted in straight lines, does not involve contact between bodies, the heat diminishes with distance."
  },
  {
    "id": 24,
    "question": "Dry Powder when discharged is suspended in gas as a dense expanding cloud which?",
    "answer": "Displaces flaming vapours and occupies the space above the fuel.",
    "distractors": [
      "Rapidly cools the fuel below the temperature for burning to continue.",
      "Spreads over the surface and drives the flame off the surface of the fuel.",
      "Powdered particles attach to the fuel preventing the combustion process."
    ],
    "explanation": "Displaces flaming vapours and occupies the space above the fuel."
  },
  {
    "id": 25,
    "question": "Which of the following describes the term kinetic energy?",
    "answer": "Energy possessed by a moving body.",
    "distractors": [
      "Energy stored in a stationary body only.",
      "Energy caused by chemical corrosion.",
      "Energy that only exists in gases."
    ],
    "explanation": "Energy possessed by a moving body."
  },
  {
    "id": 26,
    "question": "What term used to describe the damage that may occur to pipes and joints when a hydrant is closed too quickly?",
    "answer": "water hammer.",
    "distractors": [
      "Tuberculation.",
      "Flashover.",
      "Linear expansion."
    ],
    "explanation": "water hammer."
  },
  {
    "id": 27,
    "question": "Which of the following describes Spontaneous Combustion?",
    "answer": "A biological or chemical reaction that produces its own heat resulting in combustion.",
    "distractors": [
      "Combustion caused only by a naked flame.",
      "Combustion caused only by electricity.",
      "Combustion that cannot produce heat."
    ],
    "explanation": "A biological or chemical reaction that produces its own heat resulting in combustion."
  },
  {
    "id": 28,
    "question": "A basic way of remembering what affects the frictional loss in a hose is by using the mnemonic method. In relation to frictional loss what does ‘LIDS’ stand for?",
    "answer": "Length of hose, Internal roughness, Diameter, Speed (Velocity) of flow",
    "distractors": [
      "Lift, Intake, Delivery, Suction.",
      "Length, Ignition, Density, Steam.",
      "Level, Internal pressure, Discharge, Supply."
    ],
    "explanation": "Length of hose, Internal roughness, Diameter, Speed (Velocity) of flow"
  },
  {
    "id": 29,
    "question": "What pressure (in bar) would be registered on a gauge fitted at the bottom of a water tank where the water level is 20 m above the gauge?",
    "answer": "2 bar.",
    "distractors": [
      "0.2 bar.",
      "1 bar.",
      "20 bar."
    ],
    "explanation": "2 bar."
  },
  {
    "id": 30,
    "question": "Which class of fire involves gases and liquefied gases?",
    "answer": "Class C.",
    "distractors": [
      "Class A.",
      "Class B.",
      "Class F."
    ],
    "explanation": "Class C."
  },
  {
    "id": 31,
    "question": "What term is used to describe the pressure at which a nozzle delivers water most efficiently?",
    "answer": "Optimum Pressure.",
    "distractors": [
      "Flash point.",
      "Jet reaction.",
      "Static lift."
    ],
    "explanation": "Optimum Pressure."
  },
  {
    "id": 32,
    "question": "Which of the following is the definition of combustion?",
    "answer": "A chemical reaction in which heat and light are evolved",
    "distractors": [
      "A physical reaction where only pressure is produced.",
      "A cooling process involving water only.",
      "A method of heat transfer by contact only."
    ],
    "explanation": "A chemical reaction in which heat and light are evolved"
  },
  {
    "id": 33,
    "question": "What happens to the pressure of a gas when it is heated provided the volume is unchanged?",
    "answer": "It will increase.",
    "distractors": [
      "It will decrease.",
      "It will remain unchanged.",
      "It will become zero."
    ],
    "explanation": "It will increase."
  },
  {
    "id": 34,
    "question": "The burning of organic solids (e.g. wood and paper) falls into what ‘Class’ of fire?",
    "answer": "Class A.",
    "distractors": [
      "Class B.",
      "Class C.",
      "Class D."
    ],
    "explanation": "Class A."
  },
  {
    "id": 35,
    "question": "Velocity is expressed in what units?",
    "answer": "Metres per second (m/s).",
    "distractors": [
      "Litres per minute.",
      "Bars per metre.",
      "Kilograms per litre."
    ],
    "explanation": "Metres per second (m/s)."
  },
  {
    "id": 36,
    "question": "What is 0° Kelvin in Celsius (°C)?",
    "answer": "-273°C.",
    "distractors": [
      "0°C.",
      "-100°C.",
      "273°C."
    ],
    "explanation": "-273°C."
  },
  {
    "id": 37,
    "question": "Which of the following terms describes the extinguishing of a fire by reducing the Oxygen content in the vicinity of the burning material so combustion ceases?",
    "answer": "Smothering",
    "distractors": [
      "Starving.",
      "Cooling.",
      "Radiation."
    ],
    "explanation": "Smothering"
  },
  {
    "id": 38,
    "question": "Why is foam so effective when used on fires involving liquid fuels?",
    "answer": "It excludes the oxygen from the fuel surface.",
    "distractors": [
      "It increases oxygen supply.",
      "It heats the fuel above flash point.",
      "It converts the fuel into a solid."
    ],
    "explanation": "It excludes the oxygen from the fuel surface."
  },
  {
    "id": 39,
    "question": "Approximately, how much water is contained in a 23 m length of charged 70 mm delivery hose?",
    "answer": "100 litres.",
    "distractors": [
      "50 litres.",
      "200 litres.",
      "1,000 litres."
    ],
    "explanation": "100 litres."
  },
  {
    "id": 40,
    "question": "When pressure energy is converted into a flow (velocity), what is this known as?",
    "answer": "Kinetic energy.",
    "distractors": [
      "Potential energy.",
      "Linear expansion.",
      "Tuberculation."
    ],
    "explanation": "Kinetic energy."
  },
  {
    "id": 41,
    "question": "The electrical resistance properties of ‘Platinum’, is used as a method of recording the temperature between what range?",
    "answer": "-200°C - 1200°C.",
    "distractors": [
      "0°C - 100°C.",
      "-50°C - 300°C.",
      "100°C - 500°C."
    ],
    "explanation": "-200°C - 1200°C."
  },
  {
    "id": 42,
    "question": "Which of the following terms describes the extinguishing of a fire by removing the combustible materials (fuel)?",
    "answer": "Starving.",
    "distractors": [
      "It will decrease.",
      "It will remain unchanged.",
      "Water Hammer."
    ],
    "explanation": "Starving."
  },
  {
    "id": 43,
    "question": "What is the pressure at the base of a column of water 3 m high?",
    "answer": "0.3 bar.",
    "distractors": [
      "3 bar.",
      "0.03 bar.",
      "30 bar."
    ],
    "explanation": "0.3 bar."
  },
  {
    "id": 44,
    "question": "The capacity of what shape of object may be calculated using the formula: Capacity = Length x Breadth x Height x 1000?",
    "answer": "Rectangular with a flat base.",
    "distractors": [
      "Circular with a flat base.",
      "Triangular only.",
      "Spherical only."
    ],
    "explanation": "Rectangular with a flat base."
  },
  {
    "id": 45,
    "question": "What term is used to describe how the corrosion inside a water main affects the flow of water?",
    "answer": "Tuberculation.",
    "distractors": [
      "Jet reaction.",
      "Flash point.",
      "Cubical expansion."
    ],
    "explanation": "Tuberculation."
  },
  {
    "id": 46,
    "question": "When water is propelled through a hose some of this energy is lost due to friction. What are the factors that can cause frictional loss?",
    "answer": "Length of hose, internal roughness of hose and diameter of hose.",
    "distractors": [
      "Only water temperature.",
      "Only the colour of the hose.",
      "Only the type of branch."
    ],
    "explanation": "Length of hose, internal roughness of hose and diameter of hose."
  },
  {
    "id": 47,
    "question": "Which of the following statements is correct?",
    "answer": "A. Downward pressure of a fluid in an open vessel is proportional to its depth.",
    "distractors": [
      "It will decrease.",
      "It will remain unchanged.",
      "Water Hammer."
    ],
    "explanation": "A. Downward pressure of a fluid in an open vessel is proportional to its depth."
  },
  {
    "id": 48,
    "question": "π r²h x 1000 or 0.7854 x D²h x 1000?",
    "answer": "Circular with a flat base.",
    "distractors": [
      "Rectangular with a flat base.",
      "Triangular with a sloped base.",
      "Irregular shape only."
    ],
    "explanation": "Circular with a flat base."
  },
  {
    "id": 49,
    "question": "When lifting water from an open source and the Compound Gauge registers 0.6 on the vacuum side, what is the ‘lift’ in metres?",
    "answer": "6 metres.",
    "distractors": [
      "0.6 metres.",
      "3 metres.",
      "60 metres."
    ],
    "explanation": "6 metres."
  },
  {
    "id": 50,
    "question": "If the flow of water is cut off suddenly, the kinetic energy possessed by the moving water is converted into pressure energy. The sudden shock may be so great that failure of pipes and fittings may occur. This phenomenon is known as?",
    "answer": "Water Hammer.",
    "distractors": [
      "Tuberculation.",
      "Flashover.",
      "Linear expansion."
    ],
    "explanation": "Water Hammer."
  },
  {
    "id": 51,
    "question": "When a liquid is heated what term defines the method of expansion?",
    "answer": "Cubical expansion.",
    "distractors": [
      "Linear expansion.",
      "Flash expansion.",
      "Optimum expansion."
    ],
    "explanation": "Cubical expansion."
  }
]

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5)
}

function percent(value, total) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

function getChoices(question) {
  return shuffle([question.answer, ...question.distractors])
}

export default function GeneralScienceQuizSection() {
  const [mode, setMode] = useState('practice')
  const [testQuestions, setTestQuestions] = useState(() => shuffle(generalScienceQuestions).slice(0, GENERAL_SCIENCE_TEST_COUNT))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [answers, setAnswers] = useState({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [testComplete, setTestComplete] = useState(false)

  const activeQuestions = mode === 'test' ? testQuestions : generalScienceQuestions
  const current = activeQuestions[currentIndex]
  const choices = useMemo(() => current ? getChoices(current) : [], [currentIndex, mode, testQuestions])
  const answeredCount = activeQuestions.filter(q => answers[q.id]).length
  const score = activeQuestions.filter(q => answers[q.id] === q.answer).length
  const finalPercent = percent(score, activeQuestions.length)

  function resetPractice() {
    setMode('practice')
    setAnswers({})
    setSelected('')
    setShowAnswer(false)
    setCurrentIndex(0)
    setTestComplete(false)
  }

  function startTest() {
    setMode('test')
    setTestQuestions(shuffle(generalScienceQuestions).slice(0, GENERAL_SCIENCE_TEST_COUNT))
    setAnswers({})
    setSelected('')
    setShowAnswer(false)
    setCurrentIndex(0)
    setTestComplete(false)
  }

  function submit() {
    if (!selected) return

    const updatedAnswers = { ...answers, [current.id]: selected }
    setAnswers(updatedAnswers)

    if (mode === 'practice') {
      setShowAnswer(true)
      return
    }

    if (currentIndex === activeQuestions.length - 1) {
      setTestComplete(true)
    } else {
      setCurrentIndex(i => i + 1)
      setSelected('')
      setShowAnswer(false)
    }
  }

  function goTo(index) {
    setCurrentIndex(index)
    setSelected(answers[activeQuestions[index].id] || '')
    setShowAnswer(mode === 'practice' && Boolean(answers[activeQuestions[index].id]))
  }

  if (!current) return null

  if (mode === 'test' && testComplete) {
    return (
      <section className="question-card">
        <p className="kicker">General Science Test Complete</p>
        <h2>{finalPercent >= GENERAL_SCIENCE_PASS_MARK ? 'Pass' : 'Needs more revision'}</h2>
        <p className="large-score">You scored {score}/{activeQuestions.length} ({finalPercent}%). Pass mark: {GENERAL_SCIENCE_PASS_MARK}%.</p>
        <div className="progress"><div style={{ width: `${finalPercent}%` }} /></div>
        <button className="primary" onClick={startTest}>New General Science test</button>
        <button className="secondary" onClick={resetPractice}>General Science practice</button>

        <div className="review">
          {activeQuestions.map((q, index) => {
            const correct = answers[q.id] === q.answer
            return (
              <div key={q.id} className={correct ? 'review-item correct-review' : 'review-item wrong-review'}>
                <h3>Question {index + 1}: {q.question}</h3>
                <p>Your answer: <strong>{answers[q.id]}</strong></p>
                {!correct && <p>Correct answer: <strong>{q.answer}</strong></p>}
                <p>{q.explanation}</p>
              </div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="question-card">
      <p className="kicker">General Science</p>
      <h1>General Science</h1>

      <div className="actions">
        <button className={mode === 'practice' ? 'primary' : 'secondary'} onClick={resetPractice}>
          Practice all {generalScienceQuestions.length}
        </button>
        <button className={mode === 'test' ? 'primary' : 'secondary'} onClick={startTest}>
          Test: {GENERAL_SCIENCE_TEST_COUNT} random
        </button>
      </div>

      <div className="question-meta">
        <span>{mode === 'test' ? 'Test' : 'Practice'}</span>
        <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
        <span>Answered {answeredCount}</span>
        {mode === 'practice' && <span>Score {score}</span>}
        <span>Pass mark {GENERAL_SCIENCE_PASS_MARK}%</span>
      </div>

      <div className="progress">
        <div style={{ width: `${percent(currentIndex + 1, activeQuestions.length)}%` }} />
      </div>

      <h2>{current.question}</h2>

      <div className="options">
        {choices.map(option => {
          let className = 'option'
          if (selected === option) className += ' selected'
          if (mode === 'practice' && showAnswer && option === current.answer) className += ' correct'
          if (mode === 'practice' && showAnswer && selected === option && option !== current.answer) className += ' wrong'

          return (
            <button key={option} className={className} onClick={() => !showAnswer && setSelected(option)}>
              {option}
            </button>
          )
        })}
      </div>

      <div className="actions">
        <button className="secondary" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}>Previous</button>
        <button className="primary" disabled={!selected || (mode === 'practice' && showAnswer)} onClick={submit}>
          {mode === 'test' && currentIndex === activeQuestions.length - 1 ? 'Finish test' : mode === 'test' ? 'Submit and continue' : 'Check answer'}
        </button>
        {mode === 'practice' && showAnswer && currentIndex < activeQuestions.length - 1 && (
          <button className="secondary" onClick={() => goTo(currentIndex + 1)}>Next</button>
        )}
      </div>

      {mode === 'practice' && showAnswer && (
        <div className={answers[current.id] === current.answer ? 'feedback good' : 'feedback bad'}>
          <div>
            <h3>{answers[current.id] === current.answer ? 'Correct' : 'Not quite'}</h3>
            {answers[current.id] !== current.answer && <p>Correct answer: <strong>{current.answer}</strong></p>}
            <p>{current.explanation}</p>
          </div>
        </div>
      )}

      {mode === 'test' && (
        <div className="exam-note">Test mode: answers, explanations and score are hidden until the end.</div>
      )}
    </section>
  )
}
