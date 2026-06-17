import React, { useMemo, useState } from 'react'

const BA_PASS_MARK = 80
const BA_TEST_COUNT = 30

const baQuestions = [
  {
    "id": 1,
    "question": "Once a door has been opened in order to search a room, what should be checked before entering the room?",
    "answer": "Check the operation of the door furniture to ensure it works",
    "distractors": [
      "Check the colour of the door",
      "Remove the door furniture before entering",
      "Enter immediately without checking the door"
    ],
    "explanation": "Check the operation of the door furniture to ensure it works"
  },
  {
    "id": 2,
    "question": "If re-entry procedures are initiated by the OIC, what must be the minimum contents on the pressure gauge?",
    "answer": "150 bar",
    "distractors": [
      "90 bar",
      "100 bar",
      "200 bar"
    ],
    "explanation": "150 bar"
  },
  {
    "id": 3,
    "question": "What is the maximum number of BA wearers that may be under the control of a Stage 1 BA Entry Control Officer?",
    "answer": "6",
    "distractors": [
      "2",
      "4",
      "10"
    ],
    "explanation": "6"
  },
  {
    "id": 4,
    "question": "Why must a minimum pressure of 10 bar remain in the cylinder?",
    "answer": "To prevent a build up of condensation inside the cylinder which may lead to corrosion",
    "distractors": [
      "To increase the working duration",
      "To activate the DSU",
      "To test the low pressure warning whistle"
    ],
    "explanation": "To prevent a build up of condensation inside the cylinder which may lead to corrosion"
  },
  {
    "id": 5,
    "question": "When receiving a BA tally from a BA wearer about to enter a risk area, what information must the Stage 1 BA Entry Control Officer check?",
    "answer": "The name of the BA wearer and the cylinder pressure are correct",
    "distractors": [
      "Only the time of entry",
      "Only the BA set serial number",
      "The wearer\u2019s boot size and helmet number"
    ],
    "explanation": "The name of the BA wearer and the cylinder pressure are correct"
  },
  {
    "id": 6,
    "question": "At what point will BA Entry Control Procedures be implemented?",
    "answer": "Whenever BA is worn",
    "distractors": [
      "Only at major incidents",
      "Only when Stage 2 is declared",
      "Only during night operations"
    ],
    "explanation": "Whenever BA is worn"
  },
  {
    "id": 7,
    "question": "When descending a flight of stairs that has not been checked for security for the first time, which method should a BA team adopt?",
    "answer": "Descend backwards, keeping to the wall side, testing each step carefully",
    "distractors": [
      "Descend forwards in the centre of the stairs",
      "Run down quickly to reduce exposure",
      "Slide down the handrail"
    ],
    "explanation": "Descend backwards, keeping to the wall side, testing each step carefully"
  },
  {
    "id": 8,
    "question": "How long is the safety margin for the Dr\u00e4ger PSS 7000?",
    "answer": "10 minutes",
    "distractors": [
      "5 minutes",
      "15 minutes",
      "20 minutes"
    ],
    "explanation": "10 minutes"
  },
  {
    "id": 9,
    "question": "What is the maximum number of entry control points that may be used under Stage 1 BA Entry Control?",
    "answer": "1",
    "distractors": [
      "2",
      "3",
      "4"
    ],
    "explanation": "1"
  },
  {
    "id": 10,
    "question": "What is the minimum content that a 300 bar cylinder must have before commencement of a general check?",
    "answer": "90%",
    "distractors": [
      "50%",
      "75%",
      "100%"
    ],
    "explanation": "90%"
  },
  {
    "id": 11,
    "question": "For the body to function satisfactorily, what is the minimum percentage of oxygen that must be present?",
    "answer": "20%",
    "distractors": [
      "10%",
      "15%",
      "25%"
    ],
    "explanation": "20%"
  },
  {
    "id": 12,
    "question": "What is the purpose of the Distress Signal Unit fitted to the Bodyguard Unit?",
    "answer": "To give an audible warning should the BA wearer become distressed, trapped or unconscious",
    "distractors": [
      "To measure hose pressure",
      "To cool the facemask",
      "To increase cylinder pressure"
    ],
    "explanation": "To give an audible warning should the BA wearer become distressed, trapped or unconscious"
  },
  {
    "id": 13,
    "question": "What is the purpose of the Low Pressure Warning Whistle fitted to the Dr\u00e4ger PSS 7000 BA?",
    "answer": "To indicate to the wearer that the remaining cylinder contents provides only the safety margin",
    "distractors": [
      "To show the cylinder is full",
      "To indicate the start of working duration",
      "To confirm the facemask is clean"
    ],
    "explanation": "To indicate to the wearer that the remaining cylinder contents provides only the safety margin"
  },
  {
    "id": 14,
    "question": "When can the Rapid Deployment Board be brought into operation and for what purpose?",
    "answer": "Prevention of a dangerous escalation of an incident",
    "distractors": [
      "Only after the incident is closed",
      "Only for routine equipment checks",
      "Only when no BA is being worn"
    ],
    "explanation": "Prevention of a dangerous escalation of an incident"
  },
  {
    "id": 15,
    "question": "Who decides when BA is to be worn at an incident?",
    "answer": "The OIC",
    "distractors": [
      "The newest firefighter",
      "The casualty",
      "The pump operator"
    ],
    "explanation": "The OIC"
  },
  {
    "id": 16,
    "question": "When is a general check of a BA set carried out?",
    "answer": "At the commencement of each duty period when taking over a set, after any servicing or testing",
    "distractors": [
      "Only once per year",
      "Only after the cylinder is empty",
      "Only when the DSU activates"
    ],
    "explanation": "At the commencement of each duty period when taking over a set, after any servicing or testing"
  },
  {
    "id": 17,
    "question": "A BA cylinder must have the charging pressure in bars marked on it. What else will be marked on the cylinder?",
    "answer": "The cylinder identification number",
    "distractors": [
      "The wearer\u2019s name",
      "The station phone number",
      "The hose diameter"
    ],
    "explanation": "The cylinder identification number"
  },
  {
    "id": 18,
    "question": "What action should be taken if a BA team member\u2019s Pressure Reducer Relief Valve operates whilst in a risk area?",
    "answer": "Inform the team leader who will detail the team to leave the risk area",
    "distractors": [
      "Ignore it and continue working",
      "Remove the facemask to check it",
      "Operate the supplementary supply continuously"
    ],
    "explanation": "Inform the team leader who will detail the team to leave the risk area"
  },
  {
    "id": 19,
    "question": "How long is the short length of the BA personal line?",
    "answer": "1.25 metres",
    "distractors": [
      "0.5 metres",
      "2 metres",
      "5 metres"
    ],
    "explanation": "1.25 metres"
  },
  {
    "id": 20,
    "question": "What action should firefighters take if their bare skin has come into contact with a dead body?",
    "answer": "Apply a suitable disinfectant to the area in contact and visit a hospital as soon as possible",
    "distractors": [
      "Continue without reporting it",
      "Wash with plain water only and ignore it",
      "Wait until the end of the week"
    ],
    "explanation": "Apply a suitable disinfectant to the area in contact and visit a hospital as soon as possible"
  },
  {
    "id": 21,
    "question": "Which factors can enhance a firefighter's ability to work in hot and humid conditions?",
    "answer": "Training, fitness, water intake and electrolyte balance",
    "distractors": [
      "Only helmet size",
      "Only cylinder colour",
      "Avoiding water intake"
    ],
    "explanation": "Training, fitness, water intake and electrolyte balance"
  },
  {
    "id": 22,
    "question": "If a BA wearer remains immobile for 21-25 seconds, the DSU will sound a pre-alarm. What action prevents full alarm?",
    "answer": "The BA wearer must move within 8 seconds",
    "distractors": [
      "Close the cylinder valve",
      "Remove the facemask",
      "Operate the supplementary supply"
    ],
    "explanation": "The BA wearer must move within 8 seconds"
  },
  {
    "id": 23,
    "question": "What colour are CABA cylinders?",
    "answer": "Cactus grey with black and white quartered shoulder",
    "distractors": [
      "Solid red",
      "Blue with yellow shoulder",
      "Black with red shoulder"
    ],
    "explanation": "Cactus grey with black and white quartered shoulder"
  },
  {
    "id": 24,
    "question": "By which method is a Distress Signal Unit operated?",
    "answer": "Manually by the BA wearer and automatically by sensing a lack of movement",
    "distractors": [
      "Only by the OIC",
      "Only by radio signal",
      "Only by cylinder pressure"
    ],
    "explanation": "Manually by the BA wearer and automatically by sensing a lack of movement"
  },
  {
    "id": 25,
    "question": "As a two-person BA team searching a building, you find a conscious casualty in a room. What action should you take?",
    "answer": "The BA team should assist the casualty out of the building to prevent them becoming disorientated or overcome",
    "distractors": [
      "Leave the casualty and continue searching",
      "Tell the casualty to wait until later",
      "Remove your BA set and give it to the casualty"
    ],
    "explanation": "The BA team should assist the casualty out of the building to prevent them becoming disorientated or overcome"
  },
  {
    "id": 26,
    "question": "Why does the manufacturer seal the BA Pressure Reducing Valve?",
    "answer": "To prevent it being tampered with in order to maintain its warranty",
    "distractors": [
      "To make the set heavier",
      "To stop the whistle sounding",
      "To hide the cylinder number"
    ],
    "explanation": "To prevent it being tampered with in order to maintain its warranty"
  },
  {
    "id": 27,
    "question": "What is the standard emergency evacuation signal?",
    "answer": "Short repeated blasts on an Acme Thunderer type whistle",
    "distractors": [
      "One long blast on a vehicle horn",
      "Three radio clicks",
      "A hand signal only"
    ],
    "explanation": "Short repeated blasts on an Acme Thunderer type whistle"
  },
  {
    "id": 28,
    "question": "Which line is used to attach the members of a BA team to each other?",
    "answer": "Personal line",
    "distractors": [
      "Guide line",
      "Suction line",
      "Hose reel tubing"
    ],
    "explanation": "Personal line"
  },
  {
    "id": 29,
    "question": "Which additional responsibility applies to a Stage 2 BA Entry Control Officer?",
    "answer": "Ensure suitable and sufficient emergency arrangements are established at all BA entry control points",
    "distractors": [
      "Only collect the first tally",
      "Only operate the pump",
      "Only issue fireground signals"
    ],
    "explanation": "Ensure suitable and sufficient emergency arrangements are established at all BA entry control points"
  },
  {
    "id": 30,
    "question": "When worn correctly, how much weight of the BA set is carried on the hips?",
    "answer": "Two thirds",
    "distractors": [
      "One quarter",
      "Half",
      "All of it"
    ],
    "explanation": "Two thirds"
  },
  {
    "id": 31,
    "question": "What is the minimum constant flow to the facemask of the Dr\u00e4ger PSS 7000 when supplementary flow is activated?",
    "answer": "60 litres per minute",
    "distractors": [
      "10 litres per minute",
      "30 litres per minute",
      "100 litres per minute"
    ],
    "explanation": "60 litres per minute"
  },
  {
    "id": 32,
    "question": "What are the effects of carbon monoxide on the body\u2019s red blood corpuscles?",
    "answer": "It prevents them taking oxygen from the lungs",
    "distractors": [
      "It improves oxygen transfer",
      "It cools the blood",
      "It only affects the skin"
    ],
    "explanation": "It prevents them taking oxygen from the lungs"
  },
  {
    "id": 33,
    "question": "At what pressure is the Dr\u00e4ger PSS 7000 BA Low Pressure Warning Whistle set to operate?",
    "answer": "60-50 bar cylinder pressure",
    "distractors": [
      "150-140 bar",
      "100-90 bar",
      "10-0 bar"
    ],
    "explanation": "60-50 bar cylinder pressure"
  },
  {
    "id": 34,
    "question": "What term is given to the time from when a BA cylinder valve is opened until the Low Pressure Warning Whistle operates?",
    "answer": "Working Duration",
    "distractors": [
      "Safety margin",
      "Turnaround time",
      "Re-entry period"
    ],
    "explanation": "Working Duration"
  },
  {
    "id": 35,
    "question": "If lost or disorientated whilst wearing BA in smoke, which action should be taken?",
    "answer": "Retrace the hose lines",
    "distractors": [
      "Run towards the loudest noise",
      "Remove the facemask",
      "Operate supplementary supply continuously"
    ],
    "explanation": "Retrace the hose lines"
  },
  {
    "id": 36,
    "question": "Which action should not be carried out if trapped inside a risk area and waiting rescue?",
    "answer": "Operate the supplementary supply",
    "distractors": [
      "Remain calm",
      "Conserve air",
      "Signal for assistance"
    ],
    "explanation": "Operate the supplementary supply"
  },
  {
    "id": 37,
    "question": "Why is a donning and start-up check carried out on BA?",
    "answer": "To ensure that the set is functioning correctly and that no faults have developed since the general check",
    "distractors": [
      "To empty the cylinder before use",
      "To test the ladder",
      "To check the hydrant plate"
    ],
    "explanation": "To ensure that the set is functioning correctly and that no faults have developed since the general check"
  },
  {
    "id": 38,
    "question": "A BA team closes down and then makes another entry with cylinders less than 80% full, approved by the OIC. What type of entry is this?",
    "answer": "A re-entry, fresh records are required",
    "distractors": [
      "A new initial entry with no record",
      "A Stage 2 entry only",
      "A rapid deployment only"
    ],
    "explanation": "A re-entry, fresh records are required"
  },
  {
    "id": 39,
    "question": "When searching a large room after a complete circuit of the walls, what should a BA team do?",
    "answer": "The room should be diagonally crossed to make sure no one is lying in the centre",
    "distractors": [
      "Leave immediately without checking the centre",
      "Open every window first",
      "Wait outside for another team"
    ],
    "explanation": "The room should be diagonally crossed to make sure no one is lying in the centre"
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

export default function BAQuizSection() {
  const [mode, setMode] = useState('practice')
  const [testQuestions, setTestQuestions] = useState(() => shuffle(baQuestions).slice(0, BA_TEST_COUNT))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState('')
  const [answers, setAnswers] = useState({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [testComplete, setTestComplete] = useState(false)

  const activeQuestions = mode === 'test' ? testQuestions : baQuestions
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
    setTestQuestions(shuffle(baQuestions).slice(0, BA_TEST_COUNT))
    setAnswers({})
    setSelected('')
    setShowAnswer(false)
    setCurrentIndex(0)
    setTestComplete(false)
  }

  function submit() {
    if (!selected) return
    setAnswers(prev => ({ ...prev, [current.id]: selected }))

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
        <p className="kicker">BA Test Complete</p>
        <h2>{finalPercent >= BA_PASS_MARK ? 'Pass' : 'Needs more revision'}</h2>
        <p className="large-score">You scored {score}/{activeQuestions.length} ({finalPercent}%). Pass mark: {BA_PASS_MARK}%.</p>
        <div className="progress"><div style={{ width: `${finalPercent}%` }} /></div>
        <button className="primary" onClick={startTest}>New BA test</button>
        <button className="secondary" onClick={resetPractice}>BA practice</button>

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
      <p className="kicker">Breathing Apparatus</p>
      <h1>BA</h1>

      <div className="actions">
        <button className={mode === 'practice' ? 'primary' : 'secondary'} onClick={resetPractice}>
          Practice all {baQuestions.length}
        </button>
        <button className={mode === 'test' ? 'primary' : 'secondary'} onClick={startTest}>
          Test: {BA_TEST_COUNT} random
        </button>
      </div>

      <div className="question-meta">
        <span>{mode === 'test' ? 'Test' : 'Practice'}</span>
        <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
        <span>Answered {answeredCount}</span>
        <span>Score {score}</span>
        <span>Pass mark {BA_PASS_MARK}%</span>
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
        <div className="exam-note">Test mode: answers and explanations are hidden until the end.</div>
      )}
    </section>
  )
}
