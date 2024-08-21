const notesForm = document.getElementById('note-form');
// const homeBtn = document.getElementById('home-btn');

// homeBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = '/';
// });

// Handle when a user submits feedback

if (notesForm) {
  notesForm
    .addEventListener('submit', (e) => {
      e.preventDefault();

      // Get the feedback text from the DOM and assign it to a variable
      let title = document.getElementById('noteTitle').value;
      // Get the username text and add it to a variable
      let text = document.getElementById('noteText').value.trim();

      // Create an object with the username and feedback
      const newFeedback = {
        title,
        text,
    
      };

      // Fetch POST request to the server
      fetch('api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.status);
          title = '';
          text = '';
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
