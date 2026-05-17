# VCAA Year 10 Quiz Studio

A student-friendly React test project for Year 10 Science and Mathematics quiz practice.

## Features

- No login required to complete quizzes.
- Optional sign in / sign up UI for future saved results.
- Two subjects: Mathematics and Science.
- Two difficulty levels: Core and Extension.
- Fresh quiz generation from local curriculum-aligned question pools.
- Question explanations after submission.

## Curriculum safety

Quiz questions are generated only from `src/vcaaCurriculum.js`. The app does not invent questions at runtime or call an AI service. To avoid going outside the curriculum, extend the dataset only with verified VCAA Victorian Curriculum F-10 Level 10 statements and teacher-reviewed questions.

The included data is a compact VCAA-aligned sample scope for prototyping and should be reviewed against official VCAA curriculum documentation before production or classroom use.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
