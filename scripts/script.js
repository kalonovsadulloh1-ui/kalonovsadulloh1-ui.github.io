// Minimal interactivity
document.documentElement.style.scrollBehavior = 'smooth';

// Helper to switch profile photo if xohlasangiz (1 yoki 2)
window.useProfileImage = function(n){
  const img = document.getElementById('profile-photo');
  if(!img) return;
  if(n === 1) img.src = 'assets/profile1.jpg';
  if(n === 2) img.src = 'assets/profile2.jpg';
};
