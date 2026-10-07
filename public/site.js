// Front page only: show my latest public GitHub push in the "Now building" strip.
// If GitHub can't be reached, the strip simply stays hidden.
(async () => {
  const box = document.getElementById('now');
  const text = document.getElementById('now-text');
  if (!box || !text) return;
  try {
    const res = await fetch('https://api.github.com/users/rileytrottier23/events/public?per_page=30');
    if (!res.ok) return;
    const push = (await res.json()).find((e) => e.type === 'PushEvent');
    if (!push) return;
    const repo = push.repo.name.split('/')[1];
    const days = Math.floor((Date.now() - new Date(push.created_at)) / 86400000);
    const when = days <= 0 ? 'today' : days === 1 ? 'yesterday' : days + ' days ago';
    const link = document.createElement('a');
    link.href = 'https://github.com/' + push.repo.name;
    link.textContent = repo;
    text.append('Latest push to ', link, ' on GitHub, ' + when + '.');
    box.hidden = false;
  } catch {}
})();
