document.addEventListener("DOMContentLoaded", async () => {
    const mensaje = document.getElementById('message');
    const reloadButton = document.getElementById('reload');

    // Función para cargar las imágenes al iniciar la página
    await cargarImagenes(mensaje);

    // Event listener para el botón "Reload"
    reloadButton.addEventListener("click", async () => {
        // Limpiar el mensaje anterior antes de cargar nuevas imágenes
        mensaje.innerHTML = "<p>Cargando imágenes...</p>";
        // Obtener y mostrar las imágenes de nuevo
        await cargarImagenes(mensaje);
    });
});

// Función para cargar las imágenes
const cargarImagenes = async (mensaje) => {
    // Obtener la imagen desde el servidor
    const imagenData = await obtenerImagen();

    // Verificar si la solicitud fue exitosa
    if (imagenData.mri_image && imagenData.mask_image && imagenData.blended_image) {
        // Crear las imágenes en formato base64 para mostrar
        mensaje.innerHTML = `
            <h3>Imágenes obtenidas:</h3>
            <h4>Imagen MRI:</h4>
            <img src="data:image/png;base64,${imagenData.mri_image}" alt="MRI Image" />
            <h4>Máscara:</h4>
            <img src="data:image/png;base64,${imagenData.mask_image}" alt="Mask Image" />
            <h4>Imagen Combinada:</h4>
            <img src="data:image/png;base64,${imagenData.blended_image}" alt="Blended Image" />
        `;
    } else {
        mensaje.innerHTML = `<p>Error al cargar las imágenes.</p>`;
    }
}

const obtenerImagen = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/get_images`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las imágenes');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
