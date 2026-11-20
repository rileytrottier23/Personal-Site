// Example diagram. Files starting with _ are skipped by the build. Copy this to diagrams/<name>.mjs;
// the build writes dist/<name>.png and prints its size for the <img> tag.
import { frame, rows } from '../lib/diagrams.mjs';

export default frame(
  { kicker: 'Building my own apps', title: ['The upkeep behind ', ['three small apps']], sub: 'What came with owning the whole stack, after moving off Replit to Railway.' },
  rows(['The job', 'What I did'], [
    { name: 'Hosting cost', values: ['Keep costs down as they add up', 'App sleep and memory caps on quiet apps, plus usage alerts'] },
    { name: 'Authentication', values: ['Keep sign-ins and identity working', 'Found a Google app in "testing" mode that expired sign-ins every 7 days, and published it'] },
    { name: 'Domains', values: ['Own the domain properly', 'Moved reflectai.net from a reseller into my own registrar account'] },
    { name: 'Backups', values: ["Don't lose journal entries", 'Monthly checked copy to private storage, keeping the last 3'] },
    { name: 'Security', values: ['Find holes before someone else does', 'Monthly read-only scan of all three apps, with fixes I approve one at a time'] },
  ]),
);
