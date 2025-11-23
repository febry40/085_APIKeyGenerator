// Cek kalau halaman ini adalah dashboard admin
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('userTable');
  if (tableBody) {
    fetch('/admin/data')
      .then(res => res.json())
      .then(users => {
        tableBody.innerHTML = '';
        users.forEach(u => {
          const status = new Date(u.out_of_date) > new Date() ? 'Valid' : 'Invalid';
          const row = `
            <tr>
              <td>${u.first_name} ${u.last_name}</td>
              <td>${u.email}</td>
              <td>${u.key || '-'}</td>
              <td>${status}</td>
            </tr>`;
          tableBody.innerHTML += row;
        });
      })
      .catch(err => console.error('❌ Gagal mengambil data user:', err));
  }
});
