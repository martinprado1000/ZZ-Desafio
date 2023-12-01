logOut.addEventListener("click", async (e) => {
  e.preventDefault();
  Swal.fire({
    title: "¿Estás seguro que deseas cerrar la sesion?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, continuar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch("/api/register", {
        method: "DELETE",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              title: "Session eliminada",
              icon: "success",
            });
            setTimeout(() => {
              window.location.href = "http://localhost:8080/login";
            }, 2000);
          } else {
            Swal.fire({
              title: "No se pudo eliminar la sesion",
              icon: "error",
            });
          }
        });
    }
  });
});
