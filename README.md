# Fire Extinguishers Quiz App

Interactive React/Vite multiple-choice quiz for Day 2 Fire Extinguishers revision.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build for deployment

```bash
npm run build
```

This creates a `dist` folder.

## Preview the production build locally

```bash
npm run preview
```

## Vercel deployment settings

- Framework preset: Vite
- Build command: npm run build
- Output directory: dist

## Netlify deployment settings

- Build command: npm run build
- Publish directory: dist


## Friday Exam section

The Friday Exam section contains:

- Practice mode: all 50 questions with immediate feedback.
- Test mode: 30 questions selected randomly from the 50-question bank.
- Four shuffled answer choices for every question.
- Final score and full answer review.

To change the Friday Exam questions, open `src/App.jsx` and edit the
`fridayQuestions` array. Each question contains:

- `question`
- `answer`
- `distractors` (three incorrect choices)
- `explanation`
- `category`

After editing, run:

```bash
npm run dev
```

To deploy the update, commit and push the changed files to the GitHub repository
connected to Vercel or Netlify.
