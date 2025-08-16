// Aici, vom selecta formularul de înregistrare după ID-ul său, de exemplu, 'registerForm'.
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  // Adăugăm un eveniment de 'submit' pentru formular
  registerForm.addEventListener('submit', async (e) => {
    // Prevenim comportamentul implicit al formularului
    e.preventDefault();

    // Obținem valorile introduse de utilizator
    const username = registerForm.querySelector('input[type="text"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    
    // Afișăm în consolă datele introduse
    console.log('Username:', username);
    console.log('Password:', password);

    try {
      // Trimitem o cerere POST către server, la ruta '/register'
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Așteptăm răspunsul de la server
      const data = await response.text();
      console.log('Server response:', data);

      // Verificăm dacă înregistrarea a fost un succes
      if (response.ok) {
        alert('Înregistrare reușită! Te poți loga acum.');
        // Poți redirecționa utilizatorul către pagina de login
        // window.location.href = '/'; 
      } else {
        alert('Înregistrarea a eșuat: ' + data);
      }

    } catch (error) {
      // Gestionăm erorile de rețea
      console.error('Error:', error);
      alert('A apărut o eroare la înregistrare.');
    }
  });
}
