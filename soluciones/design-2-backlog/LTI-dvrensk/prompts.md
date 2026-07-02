# All the Prompts!

For this exercise I've used GPT-4.5 (unless otherwise noted) to generate the responses. Before this, I had a brief conversation in a separate thread to try to establish some realistic background for this exercise. Like, _why_ are we building this system? Why are _we_ building this system? And now?

I've asked ChatGPT to dump the prompts with a numbered heading.  As you can see, it's not very good at counting, going 1, 2, 3, 4, 4, 5, 5, 5, etc.  I don't think that matters too much and have kept it as a cute detail.

## Prompt 1
We are LTI, a software company specialised in developing SaaS and PaaS for SMEs.  Some of our existing clients have expressed an interest in an Applicant Tracking System — some of them are unhappy with the ones they are using, and some of them don't use any specialised software for this task today.
You are an experienced business developer / product owner with extensive knowledge of the ATS market and the needs of SMEs. I am the CEO of LTI and am now sitting down with you to start this project. The goal for today is to go from nothing to a broad system design that we can present to the CTO.
First: give me a list of the 10-15 most important features of _existing_ ATS SaaS offerings. Order the features from most important to least important.

## Prompt 2
Thanks. I'm surprised to see _Job posting and distribution_ topping the list. Why is that more important than items 2, 3 and 5, which in my experience can be a lot of work?

## Prompt 3
You said \"historically\" and I think that might be a key word. In the last couple of years we've been in an economic downturn (do you agree?) and most job postings have been bombarded with applications in a very short time. Do you have any experience or data about the last couple of years?

## Prompt 4
I like the updated list a lot but I can't help noticing that it only has 14 items compared to the original 15. What's missing?

## Prompt 4
Wonderful! So now we have a prioritised list of features if we want to build something similar to what is offered today. Using your experience and knowledge of recruitment trends and technological advances (e.g. AI), what are some _new_ features that we could add, and what are some features that could stand to be updated?

## Prompt 5
Sure, give me a broad system architecture!

## Prompt 5
Can you output the diagram as mermaid JS?

## Prompt 5
Add a Lean Canvas diagram to understand the business model

## Prompt 6
Sorry, I meant, please _generate_ a Lean Canvas diagram. Separately.

## Prompt 7
Can you make it look more like a traditional LC diagram? See here for an example: https://www.leanfoundry.com/articles/what-is-lean-canvas
If Mermaid is limiting, propose some other tool.

## Prompt 8
OK, let's use plantuml. Can you regenerate the diagram, adhering strictly to the layout of the example I gave you before?

## Prompt 8
Still not what I want. How about you generate HTML (with CSS in the file) for this template: https://litslink.com/wp-content/uploads/2020/06/google-lean-canvas-model-1.png

## Prompt 9
OK, I'm going to try some other tool. Of the OpenAI LLMs, available to me, which one is most probable to generate an HTML version of that table?

## Prompt 10
I don't know what 4 Turbo is. I have 4o, 4, 4.5 (that's you), 3-mini-high (which says it's \"great at coding and logic\")

## Prompt 10
What do you mean you're currently using GPT-4? It says right here it's using GPT-4.5.

## Prompt 11
OK, then generate a self-contained HTML file that looks as close as possible to this image.

_At this point, I gave up on GPT-4.5 and switched to Claude for this task. It produced the HTML file I wanted._

## Prompt 12
_Back in ChatGPT:_
I've created a lean canvas as html (referenced). Can you read it and list the 12 headings here?

## Prompt 13
I like your suggestions, but we need terser language so that it fits in the template. Can you boil down the content you have and rehash it for me here?

## Prompt 13
I need you to combine the things we already agreed on with your new suggestions, and then distill that so that it's fits in the template.

## Prompt 14:

Diving deeper into the system design, what are the 10 most important use cases (in order) the way you'd describe them to a fellow software analyst?

## Prompt 15:

Please make use case diagrams in plantuml for the following 3 cases:
1. Candidate Resume Submission & Parsing
2. AI-driven Candidate Screening & Ranking
3. Conversational Chatbot Screening

## Prompt 16:

Now, switching hats to your role as an experienced software architect, render an entity-relationship diagram in mermaid.

## Prompt 17:

Keep your architect hat on. We need to decide on an architecture for this system. Propose 3 alternatives to some reasonable level of detail and argue for the best one.

## Prompt 18:

Please generate a suggested system diagram using plantuml, assuming we are going to host the system on AWS.

## Prompt 19:

Can you use the AWS icons from the plantuml stdlib?

## Prompt 20:

That didn't quite work — it returns a 404 for the `Compute/ECS.puml`. Can you use the bundled icons using the syntax `!include <awslib/...>` instead of referencing the web?

## Prompt 21:

That didn't work either. Looking at docs, it seems like version 18 is built in, and can be referenced like this:
```
!include <aws/common>
!include <aws/Compute/AmazonECS/AmazonECS>
```
The rest of the references also need to be updated. Can you do that? You might find useful info at https://github.com/milo-minderbinder/AWS-PlantUML

_Here I gave up on ChatGPT for a while and switched to Copilot in VS Code. It did a much better job of getting the AWS imports right, but ultimately it, too, failed, possibly because the diagram itself wasn't correct._


## Prompt 22:

_Back in ChatGPT:_
I've lost a lot of time trying to get that to work. What are some other options for rendering this diagram?

## Prompt 23:

Let's go with python. What do I need?

## Prompt 24:

1st, please note that I had to work to fix the file to get it running. When making changes, please refer to the working file.  
2nd, I'm very uncomfortable with all these components talking directly to the database. They should probably talk to the core service, unless you can come up with something better.  
3rd, please lay out the diagram from left to right instead of top to bottom.

## Prompt 25:

Write a half-page introduction to ATS/LTI followed by a list of how it stands out in the competition and what value it adds. After that, a list of the main functionality, basically the 15 features we discussed before. Put it at the beginning of the README.

## Prompt 26:

Please expand on each of the features.

---

* Please make a Use Case diagram for the use case "Candidate Resume Submission & Parsing".  Render it as PlantUML and add a few lines of textual explanation.
* Please make a Use Case diagram for the use case "AI-driven Candidate Screening & Ranking".  Render it as PlantUML and add a few lines of textual explanation.
* Please make a Use Case diagram for the use case "Conversational Chatbot Screening".  Render it as PlantUML and add a few lines of textual explanation.

---

* Generate a top-level C4 diagram (the "first C") for the system. Use PlantUML with the built-in C4 library.
* Generate a C4 "container" diagram for the system. Use PlantUML with the built-in C4 library.
* Generate a C4 "component" diagram for the "AI Microservices" component. Use PlantUML with the built-in C4 library.

# Week 2 --- we're going deeper!

## Prompt-n

You're a business analyst and I want you to read this brief of the ATS system. Then ask me if anything is unclear or ambiguous (but not necessarily to fill in all knowledge gaps).

## Prompt-n

I want you to come up with 15 user stories for the system. Use the Job Story Framework as much as possible, but if a specific story is better suited to the Outcome-Oriented Hypothesis format, use that instead.
At LTI, we're inspired by Lean Startup and want to validate our assumptions as quickly as possible. Prioritise the stories so that we can start to learn as soon as possible.

## Prompt-n

Yes, please present this in Markdown like this 
```
## US-1 short title (high/mid/low learning opportunity)
The filled template
Any other notes or context you see fit
```
Be creative with that format if you want, as long as you're consistent.

## Prompt-n

