(function () {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/frontend/views/home/home.html';
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const ahora = Math.floor(Date.now() / 1000);

    if (payload.exp < ahora) {
      localStorage.removeItem('token');
      window.location.href = '/frontend/views/home/home.html';
      return;
    }

    if (payload.role === 'Visitante') {
      window.location.href = '/frontend/views/index_main.html';
      return;
    }

    

  } catch (error) {
    console.error('Token corrupto:', error);
    localStorage.removeItem('token');
    window.location.href = '/frontend/views/home/home.html';
  }
})();