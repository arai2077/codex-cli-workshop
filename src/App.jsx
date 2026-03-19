import { create } from 'zustand'
import { BookOpen, CheckCircle2, ChevronRight, Code2, Compass, Lightbulb, TerminalSquare } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const agenda = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'mental-model', label: 'Mental Model' },
  { id: 'demo-1', label: 'Demo 1: Explain the Repo' },
  { id: 'demo-2', label: 'Demo 2: Refactoring' },
  { id: 'exercise-1', label: 'Exercise 1: New Feature' },
  { id: 'exercise-2', label: 'Exercise 2: Writing Tests' },
  { id: 'exercise-3', label: 'Exercise 3: Optional' },
  { id: 'tips', label: 'Tips and Pitfalls' },
  { id: 'wrap-up', label: 'Wrap-up' },
]

const useWorkshopStore = create((set) => ({
  activeSection: 'welcome',
  setActiveSection: (activeSection) => set({ activeSection }),
}))

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-muted-foreground">{eyebrow}</div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
    </div>
  )
}

function PromptBlock({ children }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-50 shadow-soft">
      <code className="whitespace-pre-wrap break-words">{children}</code>
    </div>
  )
}

function BulletList({ items }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function WelcomeSection({ onNavigate }) {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Codex CLI Workshop"
        title="Use AI agents with confidence"
        description="This website gives you an overview of the workshop flow, instructions, prompts, and exercises to get started with Codex CLI."
      />

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>What you will learn</CardTitle>
            <CardDescription>By the end of the session, you should be comfortable using Codex CLI on your own repositories.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                'Understand the difference between chat and an agent',
                'Ask Codex CLI to explain a repository',
                'Write better prompts with clearer constraints',
                'Review changes rather than blindly accepting them',
                'Use Codex CLI for refactoring, features, and tests',
                'Break larger tasks into safer, smaller steps',
              ].map((item) => (
                <div key={item} className="rounded-2xl border p-4 text-sm leading-6">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MentalModelSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 1"
        title="Mental model: chat vs. agent"
        description="Codex CLI does more than answer questions. It can inspect files, propose changes, and work through tasks inside a repository."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How to think about Codex CLI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>Chat gives you answers. An agent can take a goal, inspect the environment, and help execute steps toward that goal.</p>
            <p>That makes prompt quality more important. A vague prompt leaves too much room for guesswork and increases the risk of surprising changes.</p>
            <p>For those just starting out with coding agents, the safest workflow is: ask it to explain, then make a small change, then review the result carefully.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Prompt checklist</CardTitle>
            <CardDescription>Keep these in mind before you hit enter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'What exactly do I want Codex CLI to do?',
              'Which file or part of the repo is involved?',
              'What must not change?',
              'How small can I keep the scope?',
              'Do I want an explanation or summary at the end?',
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-muted p-3 text-sm leading-6">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ExplainDemoSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 2"
        title="Demo 1: Asking Codex CLI to explain the repository"
        description="Helps with understanding the codebase before making changes."
      />
      <Card>
        <CardHeader>
          <CardTitle>Demo steps</CardTitle>
          <CardDescription>Feel free to try it yourself if you please :)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Open the repository in your terminal</li>
            <li>Start Codex CLI</li>
            <li>Run the prompt below</li>
          </ol>
          <PromptBlock>
            {`Explain this repository to a developer who is new to it. Summarize the purpose of the project, the main modules and features and how the CLI works.`}
          </PromptBlock>
          <ol className="list-decimal space-y-2 pl-5" start={4}>
            <li>Watch which files the agent inspects.</li>
            <li>Check whether it finds the real entry point and the key modules.</li>
            <li>Ask for a shorter summary if needed.</li>
          </ol>
          <PromptBlock>
            {`Now give me a shorter summary in bullet points, and include the most important files I should read first.`}
          </PromptBlock>
        </CardContent>
      </Card>
    </div>
  )
}

function RefactoringDemoSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 3"
        title="Demo 2: Refactoring with Codex CLI"
        description="Helps with improving code quality and readability while keeping functionality intact."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demo steps</CardTitle>
            <CardDescription>Focus on giving your prompt enough context and details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-dashed p-4">
              <div className="mb-2 font-medium">Example bad prompt</div>
              <div className="rounded-xl bg-muted p-3 font-mono text-sm">Improve this code.</div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">An ambiguous prompt might give the desired result...or might not. To avoid unexpected outcomes, provide clear and detailed instructions.</p>
            <div>
              <div className="mb-2 font-medium">Think of the following in your prompts:</div>
              <BulletList items={['Objective', 'Context', 'Constraints', 'Scope', 'Output request']} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Example improved prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <PromptBlock>
              {`Refactor tasker/task_service.py to improve readability and maintainability. Do not change functionality. Keep the implementation simple and beginner-friendly, reduce duplication where possible, and add brief docstrings if useful. Only modify this file. At the end, explain the key changes and any assumptions you made.`}
            </PromptBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FeatureExerciseSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 4"
        title="Exercise 1: Implementing a feature"
        description="Use Codex CLI to implement a small new feature in the repository."
      />
      <Card>
        <CardHeader>
          <CardTitle>Add a --verbose flag</CardTitle>
          <CardDescription>Work in small steps and inspect the result carefully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Inspect the repository briefly.</li>
            <li>Write your own prompt.</li>
            <li>Run Codex CLI.</li>
            <li>Review the changed files.</li>
            <li>Refine the prompt if the result is too broad or unclear.</li>
          </ol>
          <PromptBlock>
            {`codex "Add a --verbose flag to the CLI. When enabled, it should print extra information about how tasks are loaded and filtered. Keep the implementation simple and beginner-friendly. Update only the files that are necessary, and explain what changed."`}
          </PromptBlock>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Optional follow-up prompt</p>
          <PromptBlock>
            {`codex "Review your changes critically. Did you introduce any unnecessary complexity or alter behavior? If so, simplify the implementation while preserving the same functionality."`}
          </PromptBlock>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Did Codex CLI touch only the files you expected?',
            'Was the flag wired up correctly end-to-end, or did it need follow-up prompts?',
            'How did specifying scope and constraints affect the diff size?',
            'What would you change in your prompt if you ran this again?',
          ].map((item) => (
            <div key={item} className="rounded-2xl border p-3">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}



function TestExerciseSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 5"
        title="Exercise 2: Writing tests"
        description="Use Codex CLI to generate meaningful tests for existing code."
      />
      <Card>
        <CardHeader>
          <CardTitle>Write tests for the reporting logic</CardTitle>
          <CardDescription>Focus on readable tests that cover real behavior, not implementation details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Explore the repository to understand the reporting logic.</li>
            <li>Write a prompt that describes what you want tested and how.</li>
            <li>Run Codex CLI and inspect the generated test file.</li>
            <li>Run the tests and check that they pass.</li>
            <li>Refine the prompt if coverage or readability is lacking.</li>
          </ol>
          <PromptBlock>
            {`codex "Write pytest tests for the reporting logic in this repository. Cover the main expected behavior and at least one edge case. Keep the tests readable and avoid unnecessary mocking. Explain what scenarios are now covered."`}
          </PromptBlock>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Optional follow-up prompt</p>
          <PromptBlock>
            {`codex "Review the tests you just wrote. Are there any redundant assertions or missing edge cases? Improve the suite without adding unnecessary complexity."`}
          </PromptBlock>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Did the generated tests cover behavior you would have missed writing them by hand?',
            'Were there any assertions that felt too tightly coupled to implementation details?',
            'Did the tests pass on the first run, or did they require fixes?',
            'How did asking for an explanation change your understanding of the coverage?',
          ].map((item) => (
            <div key={item} className="rounded-2xl border p-3">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function OptionalExerciseSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Optional Exercise"
        title="Compare a bad prompt to a good prompt"
        description="Pick any part of the repository and run Codex CLI twice — once with a vague prompt, once with a specific one. Compare the results."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Step 1: run the bad prompt</CardTitle>
            <CardDescription>Keep it vague — no context, no constraints, no output request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>Pick any file or feature in the repository, then run something like:</p>
            <PromptBlock>
              {`codex "Improve this code."`}
            </PromptBlock>
            <p>Note what Codex CLI does: which files it touches, what it changes, and whether the result matches your intent.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Step 2: run the good prompt</CardTitle>
            <CardDescription>Same target, but with objective, context, constraints, and an output request.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>Undo the previous changes, then rerun with a specific prompt, for example:</p>
            <PromptBlock>
              {`codex "Refactor tasker/task_service.py to improve readability. Do not change any behavior or public interfaces. Only modify that file. Explain what you changed and why."`}
            </PromptBlock>
            <p>Compare the diff, scope, and explanation to what the bad prompt produced.</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Which prompt produced a smaller, more focused diff?',
            'Did the bad prompt touch files you did not expect?',
            'Was the explanation from the good prompt more useful?',
            'What would you add to the bad prompt to make it equally precise?',
          ].map((item) => (
            <div key={item} className="rounded-2xl border p-3">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function TipsSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 5"
        title="Tips and common pitfalls"
        description="Most beginner problems come from prompts that are too vague, too broad, or missing constraints."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Common mistakes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Being too vague: "Fix this."',
              'Asking for too much at once',
              'Forgetting to say what must not change',
              'Letting the scope grow across many files',
              'Accepting the first result without review',
            ].map((item) => (
              <div key={item} className="rounded-2xl border p-3 text-sm leading-6">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Better habits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Start by asking the agent to explain the repository',
              'Keep tasks small and focused',
              'Tell it what not to change',
              'Ask for a summary of the changes',
              'Inspect the diff and test the result',
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-muted p-3 text-sm leading-6">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WrapUpSection() {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 6"
        title="Wrap-up and next steps"
        description="The goal is not to be perfect on the first try. The goal is to learn how to guide, constrain, and review an AI agent effectively."
      />
      <Card>
        <CardHeader>
          <CardTitle>Three takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              'Codex CLI is more useful when you treat it like an agent, not just a chatbot.',
              'Prompt quality directly affects scope, safety, and usefulness.',
              'Review is part of the workflow, not a cleanup step after it.',
            ].map((item) => (
              <div key={item} className="rounded-2xl border p-4 text-sm leading-6">
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Try this next</CardTitle>
          <CardDescription>Good first real-world tasks after the workshop.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            'Ask Codex CLI to explain a codebase you work on',
            'Refactor one messy file without changing behavior',
            'Add one small CLI feature with clear constraints',
            'Generate tests for a focused module',
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-muted p-3 text-sm leading-6">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

const sectionMap = {
  welcome: WelcomeSection,
  'mental-model': MentalModelSection,
  'demo-1': ExplainDemoSection,
  'demo-2': RefactoringDemoSection,
  'exercise-1': FeatureExerciseSection,
  'exercise-2': TestExerciseSection,
  'exercise-3': OptionalExerciseSection, // reuse the test exercise for the optional third exercise
  tips: TipsSection,
  'wrap-up': WrapUpSection,
}

export default function App() {
  const activeSection = useWorkshopStore((state) => state.activeSection)
  const setActiveSection = useWorkshopStore((state) => state.setActiveSection)
  const ActiveSectionComponent = sectionMap[activeSection]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[2rem] border bg-gradient-to-br from-background to-muted/60 p-6 shadow-soft">
          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr] lg:items-end">
            <div className="space-y-4">
              <Badge className="w-fit">Workshop Companion</Badge>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">Codex CLI Workshop</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  A hands-on introduction to using Codex CLI effectively. Follow along during the workshop or use this as a reference for your first few sessions with Codex CLI.
                </p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>At a glance</CardTitle>
                <CardDescription>Designed for attendees who are new to AI agents.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ['Format', '1 hour'],
                  ['Style', 'Hands-on'],
                  ['Audience', 'Beginners'],
                  ['Focus', 'Prompting + review'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-muted p-3">
                    <div className="font-medium">{label}</div>
                    <div className="text-muted-foreground">{value}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Agenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {agenda.map((item) => {
                  const isActive = item.id === activeSection
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full rounded-2xl border px-3 py-3 text-left transition ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </aside>

          <main className="space-y-4">
            <ActiveSectionComponent onNavigate={setActiveSection} />
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => {
                const currentIndex = agenda.findIndex((item) => item.id === activeSection)
                const nextItem = agenda[(currentIndex + 1) % agenda.length]
                setActiveSection(nextItem.id)
              }}>
                Next section
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
