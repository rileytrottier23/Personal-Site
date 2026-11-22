import { frame, rows } from '../lib/diagrams.mjs';

export default frame(
  { kicker: 'Agent Skills', title: ['The roadmap, ', ['in my repos']], sub: 'Three items Anthropic proposed to start with, and where each one meets my skills repos.' },
  rows(['The proposed item', 'In my library'], [
    { name: 'Versioned spec releases', values: ['Numbered versions of the Agent Skills format', 'Each repo already keeps a changelog of skill changes, and the format would get versions too'] },
    { name: 'A formal proposal process', values: ['A set way to propose and discuss spec changes in public', 'A change to how skills load would be visible before it reaches my setup'] },
    { name: 'Security guidance', values: ['Guidance for people who write and install skills', 'Applies first to vendored/, the skills other people wrote, pinned to an upstream commit'] },
  ]),
);
