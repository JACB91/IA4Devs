# User Stories

The set of user stories was generated in one prompt, but getting the right order was trickier:

> I want you to come up with 15 user stories for the system. Use the Job Story Framework as much as possible, but if a specific story is better suited to the Outcome-Oriented Hypothesis format, use that instead.  
> At LTI, we're inspired by Lean Startup and want to validate our assumptions as quickly as possible. Prioritise the stories so that we can start to learn as soon as possible.

> (Answering if I want this exported) Yes, please present this in Markdown like this (...) Be creative with that format if you want, as long as you're consistent.

> What's the prioritisation for this list?  It can't be learning opportunity, because the bottom item has high opportunity.

> OK, what you say makes sense and perhaps the problem was me talking about "learning opportunity" as that is well defined. I guess there's a difference between learning _a lot_ and learning something _very important_? Is there established terminology we can use that people would understand?  Can we say that the top stories are more "pivotal"? Perhaps that's taken. Anyway I'd like to see the list again but with a tag after the title denoting this "urgency" that you talked about, and then the "learning opportunity" can be demoted to the notes section. And please make the notes section detail why a story is urgent (if it is), what we hope to learn, and maybe more, so that when people read through the list will mostly nod in agreement.

> Thanks, I've applied the changes. But it's still confusing that US-9 and 10 are listed as nice-to-have but US-15 is critical. What can we do? Talk to me, don't make changes yet.

> We need to reorder them all right, but I don't like the labels. "nice-to-have" next to the title sounds like the functionality would be nice to have (to whom?) but that's not what we're talking about.  So yes, put them in sections, and give the sections descriptive headings and maybe an introductory sentence so that it's clear what the ordering is about.

> Two formatting changes, please: rather than bold-facing the story type, put it in brackets. And don't italicise the job stories.

## Immediate Validation: Critical to De-risking Early Assumptions
These user stories are crucial for validating our core assumptions and ensuring the system meets immediate recruiter needs.

## US-1 Fast triage with AI  
[Job Story]  
When I receive a flood of applications for a role,  
I want the system to automatically screen and rank them using AI,  
so I can focus quickly on the most promising candidates.

**Notes:**  
This tests core product value and validates our AI feature against real-world recruiter needs. This story is urgent because it directly impacts our ability to manage high volumes of applications efficiently. We hope to learn how effective our AI is in real scenarios, and it depends on the successful integration of AI algorithms with our existing systems.

---

## US-2 Candidate engagement through chatbot  
[Job Story]  
When a candidate applies for a role,  
I want the chatbot to conduct an initial conversational screening,  
so we collect structured data in a friendly, scalable way.

**Notes:**  
Tests both UX and candidate adoption. This story is urgent as it addresses the need for an engaging candidate experience right from the start. We aim to learn about user interactions with the chatbot and its effectiveness in data collection. Dependencies include the chatbot's integration with our application system and user interface design.

---

## US-15 Candidates prefer our process  
[Outcome-Oriented Hypothesis]  
We believe candidates will prefer our process if it's faster and more conversational.  
We'll validate this if 80% of candidates complete the application and chatbot flow without dropping off.

**Notes:**  
Directly tests our ability to create a user-friendly funnel — critical for success. This story is urgent because candidate experience is key to attracting top talent. We hope to learn about the factors that influence candidate satisfaction. Dependencies include user testing and feedback mechanisms throughout the application process.

---

## Essential Capabilities: Important but Less Risky
These user stories are valuable for enhancing system capabilities and improving the overall recruitment process, but they carry less immediate risk.

## US-3 Speed to shortlist  
[Outcome-Oriented Hypothesis]  
We believe that automating resume parsing and ranking will reduce time-to-first-screen by 50%.  
We'll validate this if >70% of recruiters create a shortlist within 24 hours of job posting.

**Notes:**  
Quantitative validation of our automation value prop. This story is important as it can significantly improve the efficiency of our hiring process. We hope to learn about the actual time savings and effectiveness of automation tools. Dependencies include the development of the parsing algorithm and access to a diverse set of resumes for testing.

---

## US-4 Easy job posting  
[Job Story]  
When I need to publish a job ad,  
I want to push it to multiple job boards with one click,  
so I can maximize reach without duplicating work.

**Notes:**  
Tests integration complexity and early user expectations. This story is important because it can streamline the job posting process, saving time for recruiters. We hope to learn about the integration challenges and user satisfaction with the feature. Dependencies include partnerships with job boards and technical feasibility studies.

---

## US-5 Build our career page ourselves  
[Job Story]  
When I set up my company's hiring presence,  
I want to build a career page without involving designers or devs,  
so we can move fast and stay on brand.

**Notes:**  
Useful for self-service UX learning, esp. if tested with non-technical SME users. This story is important as it empowers teams to create their own content quickly. We hope to learn about the usability of the self-service tools we provide. Dependencies include the development of user-friendly templates and content management systems.

---

## US-6 See candidate pipeline at a glance  
[Job Story]  
When managing multiple roles and candidates,  
I want to view the pipeline visually,  
so I always know who’s where in the process.

**Notes:**  
Tests usability of pipeline interface and visual prioritization. This story is important as it enhances visibility into the hiring process, helping recruiters manage tasks effectively. We hope to learn about user preferences for visual data representation. Dependencies include UI/UX design resources and feedback from potential users.

---

## US-7 Collaborative hiring decisions  
[Job Story]  
When reviewing applicants with my team,  
I want to leave notes and tag colleagues,  
so we can make faster, better-informed decisions.

**Notes:**  
Validates collaborative workflows and social features. This story is important because it promotes teamwork and reduces decision-making time. We hope to learn about the effectiveness of collaboration tools in the hiring process. Dependencies include the development of tagging and commenting features within our platform.

---

## US-8 Keep interviews on schedule  
[Job Story]  
When I select candidates for interviews,  
I want the system to automatically schedule them,  
so I don’t have to coordinate manually across calendars.

**Notes:**  
Tests integration with calendar APIs and recruiter time savings. This story is important as it can significantly reduce the administrative burden on recruiters. We hope to learn about the reliability of scheduling algorithms and user satisfaction. Dependencies include access to calendar APIs and user testing for the scheduling interface.

---

## US-11 Onboard new recruiters fast  
[Job Story]  
When I bring a new recruiter into the team,  
I want them to get up and running with minimal training,  
so they can contribute right away.

**Notes:**  
Validates intuitive UI and onboarding flows. This story is important as it affects the speed at which new hires can become productive. We hope to learn about the effectiveness of our onboarding materials and processes. Dependencies include the development of training resources and feedback from new users.

---

## US-12 GDPR without stress  
[Job Story]  
When I manage candidate data,  
I want the system to handle GDPR compliance automatically,  
so I avoid legal issues without adding work.

**Notes:**  
Important for trust, but unlikely to produce early usage insights unless something goes wrong. This story is important as it ensures compliance with legal standards, reducing risk for the company. We hope to learn about user confidence in data handling. Dependencies include legal consultations and compliance checks.

---

## US-13 Unified candidate view  
[Job Story]  
When preparing for an interview,  
I want to see the candidate’s resume, scores, and notes in one place,  
so I can assess them efficiently.

**Notes:**  
Tests data synthesis and UI coherence across sources. This story is important as it can streamline the interview preparation process. We hope to learn about user preferences for information organization. Dependencies include integration of various data sources and UI design efforts.

---

## Future Value: Lower Urgency, Strategic Learning
These user stories focus on long-term insights and strategic improvements, providing value but with less immediate urgency.

## US-9 Reuse great past candidates  
[Job Story]  
When I’m hiring for a role similar to one we’ve filled before,  
I want to search and filter our past applicants,  
so I can save time and reduce sourcing costs.

**Notes:**  
Longer-term insight; requires sufficient data volume. This story is a nice-to-have as it could enhance our recruitment efficiency but is not immediately urgent. We hope to learn how often past candidates can be reused effectively in new roles. Dependencies include a robust database of past applicants and search functionality.

---

## US-10 Predict who will stay  
[Outcome-Oriented Hypothesis]  
We believe predictive analytics can identify candidates likely to stay long-term.  
We'll validate this if hires from the top 25% of predicted "fit" churn less within 6 months.

**Notes:**  
Valuable but slow to validate; useful to prototype but not urgent. This story is a nice-to-have as it can provide insights into employee retention. We hope to learn about the accuracy of our predictive models. Dependencies include data analytics capabilities and historical employee data.

---

## US-14 Feedback that flows  
[Job Story]  
When collecting interview feedback from my team,  
I want it stored in a structured, searchable way,  
so I can compare candidates fairly.

**Notes:**  
Focus on workflow validation and future analytics. This story is important as it facilitates better decision-making based on feedback. We hope to learn about the effectiveness of our feedback collection process. Dependencies include the design of feedback forms and data storage solutions.

---

# 🧾 MVP Backlog – US-2: Candidate Engagement via Chatbot

> So let's say that we have nothing (which is true) and we want to build enough of US-2 to do us some validated learning.  What do we need to build?  Assume that are using Ruby on Rails with Hotwire, our team consists of a full-stack engineer and a designer with HMTL/CSS chops. Give me a list of tickets.  
> We need some actual LLM interaction, not just hardcoded questions. We're validating that the users _feel_ the difference between just submitting an application to a portal and handing it in to the actual recruiter who asks a couple of personal questions.

> (answering) A dev-ready backlog, please! Do you need anything more from me?  
> (answering) go!

> Markdown please

This backlog delivers a minimal, LLM-powered screening chatbot that feels like a real recruiter. Built with Rails + Hotwire + OpenAI.

---

## 🔹 Setup & Models

### ✅ Initialize Rails + Hotwire project
**Why**: Foundation for reactive, real-time UI.  
**What**:
- Install Turbo + Stimulus
- Add TailwindCSS (or use simple layout)

**Labels**: backend, frontend, infra  
**Effort**: S

---

### ✅ Add `Candidate` and `ScreeningSession` models
**Why**: Track each applicant and their interaction.  
**What**:
- Candidate: `name`, `email`
- ScreeningSession: `candidate_id`, `status`, `started_at`, `completed_at`

**Labels**: backend  
**Effort**: S

---

### ✅ Add `ChatMessage` model
**Why**: Persist messages exchanged during screening.  
**What**:
- `screening_session_id`, `sender`, `content`, `created_at`

**Labels**: backend  
**Effort**: S

---

## 🔹 Chat Interface & LLM Flow

### ✅ Build chat interface with Turbo Frames
**Why**: Conversational, familiar user experience.  
**What**:
- Chat bubble layout (system vs. candidate)
- Scrollable message history
- Turbo Frame for message input

**Labels**: frontend, design  
**Effort**: M

---

### ✅ Add “Ana is typing…” indicator (Stimulus)
**Why**: Mimic human response behavior.  
**What**:
- Show typing bubble after candidate message
- Artificial 1.5–2s delay

**Labels**: frontend, design  
**Effort**: S

---

### ✅ Integrate OpenAI for system messages
**Why**: Generate authentic, unscripted screening questions.  
**What**:
- Use OpenAI API
- Prompt includes recruiter persona + chat history (last 3–5 messages)

**Labels**: backend, llm  
**Effort**: M

---

### ✅ Submit message → get response → update chat
**Why**: Core user interaction loop.  
**What**:
- Save candidate message
- Trigger LLM response
- Save + render system reply

**Labels**: backend, frontend, llm  
**Effort**: M

---

### ✅ End conversation after 3–4 questions
**Why**: Keep the flow short and purposeful.  
**What**:
- Count questions
- Send final message (“Thanks! We'll be in touch.”)
- Mark session as complete

**Labels**: backend  
**Effort**: S

---

## 🔹 Admin & Validation

### ✅ Create admin view to review chat sessions
**Why**: Internal QA and insight.  
**What**:
- List all candidates
- Show full chat history per session
- Completion status

**Labels**: frontend, backend  
**Effort**: M

---

### ✅ Add candidate feedback prompt (at end)
**Why**: Validate perceived human-ness.  
**What**:
- Ask: “Did this feel like a real recruiter was asking?” → Yes/No + comment
- Store in `ScreeningSession`

**Labels**: frontend, backend  
**Effort**: S

---

### ✅ Track drop-off + conversation metrics
**Why**: Learn where users exit.  
**What**:
- Log message count, timestamps
- Mark incomplete sessions
- Simple dashboard view

**Labels**: backend, analytics  
**Effort**: M

---

## 🔹 Deployment

### ✅ Deploy to Fly.io or Heroku
**Why**: Get real user feedback.  
**What**:
- Set up deployment pipeline
- Use real job (e.g. “Junior UX Designer”)
- Add error handling

**Labels**: infra, ops  
**Effort**: M

---

## 🧠 Example Prompt
```text
You are Ana, a recruiter hiring for a Junior UX Designer role. You're warm, curious, and human. Ask the candidate friendly questions one at a time, like:
"What drew you to this role?" or
"What kind of work environment brings out your best?"

Do not ask more than 4 questions. Then thank them and close the chat.
```
