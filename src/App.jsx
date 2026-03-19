import { useState } from 'react'
import { create } from 'zustand'
import { BookOpen, Check, CheckCircle2, ChevronRight, Code2, Compass, Copy, Lightbulb, TerminalSquare } from 'lucide-react'
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
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="flex items-start gap-2 rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-50 shadow-soft">
      <code className="flex-1 whitespace-pre-wrap break-words">{children}</code>
      <button
        onClick={handleCopy}
        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-50"
        aria-label="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
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

const CLONE_CMD = 'git clone https://github.com/arai2077/codex-cli-example-repo.git'

function CloneCard() {
  const [copied, setCopied] = useState(false)
  function handleCopy() {
    navigator.clipboard.writeText(CLONE_CMD)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get the example repository</CardTitle>
        <CardDescription>Clone this repo before starting the exercises.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm text-slate-50 shadow-soft">
          <code className="flex-1 break-all font-mono">{CLONE_CMD}</code>
          <button
            onClick={handleCopy}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-50"
            aria-label="Copy to clipboard"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </CardContent>
    </Card>
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

      <CloneCard />
      <Card>
        <CardHeader>
          <CardTitle>Create Python virtual environment</CardTitle>
          <CardDescription>Set up a Python virtual environment and install dependencies.</CardDescription>
        </CardHeader>
        <CardContent>
          <PromptBlock>{`python -m venv .venv\nsource .venv/bin/activate\npip install -r requirements.txt`}</PromptBlock>
        </CardContent>
      </Card>
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
      <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm leading-6 text-yellow-200">
        <span className="font-semibold">Important: </span>Only open Codex CLI in a directory it is allowed to read. Do not use it in customers' repositories unless the customer allows for use of coding agents.
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How to think about Codex CLI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>An agent can take a goal, inspect the environment, and help execute steps toward that goal. However it needs clear instructions and constraints to operate safely and effectively.</p>
            <p>That makes prompt quality more important. A vague prompt leaves too much room for guesswork and increases the risk of surprising changes.</p>
            <p>The safest workflow is iterative: ask it to explain, then make a small change, then review the result carefully.</p>
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
            <CardTitle>Write a good prompt</CardTitle>
            <CardDescription>Focus on giving your prompt enough context and details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-dashed p-4">
              <div className="mb-2 font-medium">Example bad prompt</div>
              <div className="rounded-xl bg-muted p-3 font-mono text-sm">Improve this code.</div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">A vague prompt might give the desired result...or might not. To avoid unexpected outcomes, provide clear and detailed instructions.</p>
            <div>
              <div className="mb-2 font-medium">Think of the following in your prompts:</div>
              <BulletList items={['Objective', 'Context', 'Constraints', 'Scope', 'Output request']} />
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Since this prompt is going to edit the code, the importance of reviewing becomes prevalent.</p>
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
  const [showPrompts, setShowPrompts] = useState(false)
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 4"
        title="Exercise 1: Implementing a feature"
        description="Use Codex CLI to implement a small new feature in the repository."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add a --verbose flag</CardTitle>
            <CardDescription>Work in small steps and inspect the result carefully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Run Codex CLI in the repository.</li>
              <li>Inspect the repository briefly or ask Codex CLI to explain it.</li>
              <li>Think about how you would implement the step yourself.</li>
              <li>Write a prompt that clearly describes the desired change.</li>
              <li>Make sure your prompt includes the necessary context and constraints.</li>
              <li>Review the changed files.</li>
              <li>Refine the prompt if the result is too broad or unclear.</li>
            </ol>
            <div>
              <div className="mb-2 font-bold">Think of the following in your prompts:</div>
              <BulletList items={['Objective', 'Context', 'Constraints', 'Scope', 'Output request']} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Example prompts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {showPrompts ? (
              <>
                <PromptBlock>
                  {`Add a --verbose flag to the CLI. When enabled, it should print extra information about how tasks are loaded and filtered. Keep the implementation simple and beginner-friendly. Update only the files that are necessary, and explain what changed.`}
                </PromptBlock>
                <p className="text-sm leading-6 text-muted-foreground">Optional follow-up</p>
                <PromptBlock>
                  {`Review your changes critically. Did you introduce any unnecessary complexity or alter behavior? If so, simplify the implementation while preserving the same functionality.`}
                </PromptBlock>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowPrompts(true)}>Click me for example prompts</Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Did Codex CLI touch only the files you expected?',
            'Was the flag wired up correctly end-to-end, or did it need follow-up prompts?',
            'Did specifying scope and constraints affect the diff size?',
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
  const [showPrompts, setShowPrompts] = useState(false)
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Section 5"
        title="Exercise 2: Writing tests"
        description="Use Codex CLI to generate meaningful tests for existing code."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Write tests for the reporting logic</CardTitle>
            <CardDescription>Focus on readable tests that cover real behavior, not implementation details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <ol className="list-decimal space-y-2 pl-5">
              <li>Explore the repository to understand the reporting module or ask Codex CLI to explain it.</li>
              <li>Write a prompt that describes what you want tested and how.</li>
              <li>Inspect the generated test file.</li>
              <li>Run the tests and check that they pass.</li>
              <li>Refine the prompt if coverage or readability is lacking.</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Example prompts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {showPrompts ? (
              <>
                <PromptBlock>
                  {`Write pytest tests for the reporting logic in this repository. Cover the main expected behavior and at least one edge case. Keep the tests readable and avoid unnecessary mocking. Explain what scenarios are now covered.`}
                </PromptBlock>
                <p className="text-sm leading-6 text-muted-foreground">Optional follow-up</p>
                <PromptBlock>
                  {`Review the tests you just wrote. Are there any redundant assertions or missing edge cases? Improve the suite without adding unnecessary complexity.`}
                </PromptBlock>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowPrompts(true)}>Click me for example prompts</Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Did the tests pass on the first run, or did they require fixes?',
            'Did the generated tests cover behavior you would have missed writing them by hand?',
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
  const [showPrompts, setShowPrompts] = useState(false)
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Optional Exercise"
        title="Exercise 3: Iterative prompting"
        description="Practice breaking a larger change into a sequence of focused prompts, each building on the last."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pick a target and go step by step</CardTitle>
            <CardDescription>Choose any part of the repository you want to improve. The goal is the process, not the destination.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p>Instead of handing Codex CLI one large task, split it into at least three prompts. Review the diff between each step and only continue when you are satisfied with what was produced.</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Pick a target: a new feature, a refactor, extra error handling, or better CLI output.</li>
              <li>If you don't want to pick yourself, try creating a new --format flag for the tasker CLI.</li>
              <li>Think about how you would implement the change step by step yourself.</li>
              <li>Write a first prompt that covers only the first logical step.</li>
              <li>Review what changed and verify it works before moving on.</li>
              <li>Write a second prompt that builds on the first result.</li>
              <li>Continue until the full change is complete, then review the whole diff end-to-end.</li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Example sequence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {showPrompts ? (
              <>
                <p className="text-sm font-medium text-muted-foreground">Step 1 — understand and plan</p>
                <PromptBlock>
                  {`Look at the tasker CLI entry point and describe how arguments are parsed and passed to the task service. Do not make any changes yet.`}
                </PromptBlock>
                <p className="text-sm font-medium text-muted-foreground">Step 2 — make the first change</p>
                <PromptBlock>
                  {`Add a --format flag that accepts 'plain' or 'json'. For now it only needs to be parsed and stored; it does not need to change output yet. Keep the change minimal.`}
                </PromptBlock>
                <p className="text-sm font-medium text-muted-foreground">Step 3 — wire up the behaviour</p>
                <PromptBlock>
                  {`Now use the --format flag to change how tasks are printed. When 'json' is chosen, output a JSON array of task objects. Do not touch any other behaviour.`}
                </PromptBlock>
                <p className="text-sm font-medium text-muted-foreground">Step 4 — review and tighten</p>
                <PromptBlock>
                  {`Review everything you changed across all three steps. Remove any dead code, fix any inconsistencies, and make sure the flag is documented in the help text. Write a brief summary of the changes at the end.`}
                </PromptBlock>
              </>
            ) : (
              <Button variant="outline" onClick={() => setShowPrompts(true)}>Click me for example prompts</Button>
            )}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
          {[
            'Did splitting the task into steps lead to smaller, easier-to-review diffs?',
            'Did an earlier step constrain or help the direction of a later one?',
            'Would a single large prompt have produced a better or worse result?',
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
          <CardTitle>Main takeaways</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              'Coding agents are more useful when you treat them like a junior developer rather than a chatbot.',
              'Prompt quality directly affects scope, safety, and usefulness.',
              'Review is part of the workflow, not a cleanup step after it.',
              'Iteration is normal and encouraged — you can refine the prompt based on the result until it’s right.',
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
            'Add one small feature with clear constraints',
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
                  A hands-on (or hands-off?) introduction to using Codex CLI effectively. Follow along during the workshop or use this as a reference for your first few sessions with Codex CLI.
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
