// Navigation is deliberately independent from Supabase so the forum can always be opened.
// Subtle tab click sound generated locally with Web Audio (no external audio file).
let tabAudioContext=null;
function playTabClick(){
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass)return;
    tabAudioContext=tabAudioContext||new AudioContextClass();
    if(tabAudioContext.state==='suspended')tabAudioContext.resume();
    const now=tabAudioContext.currentTime;
    const oscillator=tabAudioContext.createOscillator();
    const gain=tabAudioContext.createGain();
    oscillator.type='triangle';
    oscillator.frequency.setValueAtTime(620,now);
    oscillator.frequency.exponentialRampToValueAtTime(880,now+0.055);
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.exponentialRampToValueAtTime(0.035,now+0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001,now+0.075);
    oscillator.connect(gain);gain.connect(tabAudioContext.destination);
    oscillator.start(now);oscillator.stop(now+0.08);
  }catch(error){/* Audio is optional; navigation must always work. */}
}
document.addEventListener('click',event=>{
  const tab=event.target.closest('button.navbtn');
  if(tab)playTabClick();
},true);

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
  const forumNav = document.querySelector('[data-filter="alle"]');
  const chatNav = document.getElementById('chatNav');
  const pollSection = document.querySelector('.poll-section');
  const composer = document.querySelector('.composer');
  const sectionHead = document.querySelector('.section-head');
  const feed = document.getElementById('feed');
  const chatPanel = document.getElementById('chatPanel');
  const mainArea = document.getElementById('forumStart');
  const setActive = active => document.querySelectorAll('.navbtn').forEach(item => item.classList.toggle('active', item === active));
  const showForum = () => {
    setActive(forumNav);
    if (pollSection) pollSection.hidden = true;
    if (chatPanel) chatPanel.hidden = true;
    mainArea?.classList.remove('chat-mode');
    if (composer) composer.hidden = true;
    if (sectionHead) sectionHead.hidden = false;
    if (feed) feed.hidden = false;
    forum?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const pollMode = button.dataset.filter === 'Umfragen';
      setActive(button);
      if (pollSection) pollSection.hidden = !pollMode;
      if (chatPanel) chatPanel.hidden = true;
      mainArea?.classList.remove('chat-mode');
      if (composer) composer.hidden = true;
      if (sectionHead) sectionHead.hidden = pollMode;
      if (feed) feed.hidden = pollMode;
      if (pollMode) pollSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else showForum();
    });
  });
  chatNav?.addEventListener('click', () => {
    setActive(chatNav);
    if (pollSection) pollSection.hidden = true;
    if (composer) composer.hidden = true;
    if (sectionHead) sectionHead.hidden = true;
    if (feed) feed.hidden = true;
    if (chatPanel) chatPanel.hidden = false;
    mainArea?.classList.add('chat-mode');
    chatPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
