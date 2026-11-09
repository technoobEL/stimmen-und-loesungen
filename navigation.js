// Navigation is deliberately independent from Supabase so the forum can always be opened.
document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');
  const enter = document.getElementById('enterForum');
  const forum = document.getElementById('forumStart');
  if (enter && welcome) {
    enter.addEventListener('click', () => {
      welcome.classList.add('welcome-exit');
      window.setTimeout(() => {
        welcome.style.display = 'none';
        forum?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 650);
    });
  }
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
      const pollSection = document.querySelector('.poll-section');
      const composer = document.querySelector('.composer');
      const sectionHead = document.querySelector('.section-head');
      const feed = document.getElementById('feed');
      const pollMode = filter === 'Umfragen';
      if (pollSection) pollSection.hidden = !pollMode;
      if (composer) composer.hidden = true;
      if (sectionHead) sectionHead.hidden = pollMode;
      if (feed) feed.hidden = pollMode;
      if (pollMode) pollSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else forum?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
