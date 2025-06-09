export function getProfile() {
  const stored = localStorage.getItem('profile');
  return stored ? JSON.parse(stored) : null;
}

export function saveProfile(profile) {
  localStorage.setItem('profile', JSON.stringify(profile));
}

