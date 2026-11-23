import { frame, compare } from '../lib/diagrams.mjs';

export default frame(
  { kicker: 'Agent Skills', title: ['A standard moves to a ', ['neutral home']], sub: 'Anthropic gave Agent Skills to the Agentic AI Foundation on October 22, 2026.' },
  compare([
    { title: 'What moved', tag: 'Now held by the foundation', pick: true, points: ['The Agent Skills name and logo', 'The GitHub organization where the spec lives', 'The agentskills.io domain'] },
    { title: 'What stays the same', tag: 'For anyone who writes or installs skills', points: ['A skill is still a folder with a SKILL.md file', 'The spec is still published at agentskills.io', 'No need to join the foundation to use it', 'Nothing in my three repos needs editing'] },
  ]),
);
