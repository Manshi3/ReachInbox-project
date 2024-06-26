async function connectGoogleAccount() {
    const response = await fetch('/google/auth');
    const data = await response.json();
    window.location.href = data.url;
}

// async function connectMSAccount() {
//     const response = await fetch('/auth/outlook');
//     const data = await response.json();
//     window.location.href = data.url;
// }

// document.addEventListener('DOMContentLoaded', function() {
//     const signinGoogle = document.getElementById('connect-google');
  
//     signinGoogle.addEventListener('click', async function() {
//         const response = await fetch('/auth-url');
//         const data = await response.json();
//         window.location.href = data.url;
//     });

//     const signinMS = document.getElementById('connect-ms');
  
//     signinMS.addEventListener('click', function() {
//         window.location.href = 'https://reachinbox-assignment-4rf9.onrender.com/outlook/signin';
//     });
// });
