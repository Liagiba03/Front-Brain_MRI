document.addEventListener("DOMContentLoaded", async () => {
    const mensaje = document.getElementById('message');
    const reloadButton = document.getElementById('reload');

    await cargarImagenes(mensaje);

    reloadButton.addEventListener("click", async () => {
        mensaje.innerHTML = "<p>Cargando imágenes...</p>";
        await cargarImagenes(mensaje);
    });
});

const cargarImagenes = async (mensaje) => {
    const imagenData = await obtenerImagen();

    if (imagenData.mri_image && imagenData.mask_image && imagenData.blended_image) {
        mensaje.innerHTML = `
            <h3>Imágenes obtenidas:</h3>
            <div>
                <h4>Imagen MRI:</h4>
                <img src="data:image/png;base64,${imagenData.mri_image}" alt="MRI Image" />
            </div>
            <div>
                <h4>Máscara:</h4>
                <img src="data:image/png;base64,${imagenData.mask_image}" alt="Mask Image" />
            </div>
            <div>
                <h4>Imagen Combinada:</h4>
                <img src="data:image/png;base64,${imagenData.blended_image}" alt="Blended Image" />
            </div>
        `;
    } else {
        mensaje.innerHTML = `<p>Error al cargar las imágenes.</p>`;
    }
}

const obtenerImagen = async () => {
    try {
        const response = await fetch(`https://brain-api-v1.onrender.com/get_images`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error('Error al obtener las imágenes');

        return await response.json();
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
