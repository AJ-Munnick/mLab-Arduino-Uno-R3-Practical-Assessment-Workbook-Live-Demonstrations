const memberList = document.getElementById('member-list');
const adminForm = document.getElementById('admin-form');
const DEFAULT_MEMBERS = [
  'Arsenio Munnick',
  'Jadelyn Loots',
  'Emilio Johnson',
  'Braydon Alexander'
];
const PROJECTS = [
  'Potentiometer LED Dimmer',
  'Automatic Night Light',
  'Push-Button Traffic Light',
  'Potentiometer Servo Controller',
  'Light Controlled Servo',
  'Smart Model Security Gate'
];

function loadMembers() {
  const saved = JSON.parse(localStorage.getItem('member-showcase-members') || 'null');
  if (saved && Array.isArray(saved) && saved.length) {
    return saved;
  }
  localStorage.setItem('member-showcase-members', JSON.stringify(DEFAULT_MEMBERS));
  return [...DEFAULT_MEMBERS];
}

function saveMembers(members) {
  localStorage.setItem('member-showcase-members', JSON.stringify(members));
}

function getMemberVideos(memberName) {
  const key = `member-showcase-videos:${memberName}`;
  const saved = JSON.parse(localStorage.getItem(key) || '{}');
  return saved && typeof saved === 'object' ? saved : {};
}

function saveMemberVideos(memberName, videos) {
  localStorage.setItem(`member-showcase-videos:${memberName}`, JSON.stringify(videos));
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderMembers() {
  const members = loadMembers();
  memberList.innerHTML = '';

  members.forEach((memberName) => {
    const card = document.createElement('div');
    card.className = 'card';

    const name = document.createElement('h2');
    name.textContent = memberName;
    card.appendChild(name);

    const videos = getMemberVideos(memberName);

    PROJECTS.forEach((projectTitle, index) => {
      const projectWrap = document.createElement('div');
      projectWrap.className = 'video-slot';

      const title = document.createElement('h3');
      title.textContent = projectTitle;
      projectWrap.appendChild(title);

      const key = `project-${index + 1}`;
      const savedUrl = videos[key] || '';

      if (savedUrl) {
        const video = document.createElement('video');
        video.src = savedUrl;
        video.controls = true;
        video.preload = 'metadata';
        video.className = 'member-video';
        projectWrap.appendChild(video);
      } else {
        const empty = document.createElement('p');
        empty.textContent = 'No video uploaded yet';
        projectWrap.appendChild(empty);
      }

      const uploadLabel = document.createElement('label');
      uploadLabel.className = 'upload-label';
      uploadLabel.textContent = savedUrl ? 'Replace video' : 'Upload video';

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.dataset.member = memberName;
      input.dataset.project = key;
      uploadLabel.appendChild(input);
      projectWrap.appendChild(uploadLabel);

      card.appendChild(projectWrap);
    });

    memberList.appendChild(card);
  });
}

adminForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.getElementById('new-member-name');
  const value = input.value.trim();

  if (!value) {
    return;
  }

  const members = loadMembers();
  if (members.includes(value)) {
    input.value = '';
    return;
  }

  members.push(value);
  saveMembers(members);
  input.value = '';
  renderMembers();
});

memberList.addEventListener('change', (event) => {
  const input = event.target;
  if (!(input instanceof HTMLInputElement) || input.type !== 'file') {
    return;
  }

  const file = input.files && input.files[0];
  if (!file) {
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    alert('Video exceeds 50 MB. Please choose a smaller file.');
    input.value = '';
    return;
  }

  const memberName = input.dataset.member;
  const projectKey = input.dataset.project;
  const reader = new FileReader();

  reader.onload = () => {
    const url = reader.result;
    const videos = getMemberVideos(memberName);
    videos[projectKey] = url;
    saveMemberVideos(memberName, videos);
    renderMembers();
  };

  reader.readAsDataURL(file);
});

renderMembers();
