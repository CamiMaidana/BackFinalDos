document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:3000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      // Guardar el token en el almacenamiento local (localStorage)
      localStorage.setItem("token", token);
      // Redireccionar a la página principal o realizar otras acciones necesarias
      window.location.href = "http://127.0.0.1:5500/Frontend/index.html";
    } else {
      alert("Error de inicio de sesión. Por favor, verifique sus credenciales.");
    }
  });
  