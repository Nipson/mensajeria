<!-- JavaScript MODIFICADO para manejar archivos -->
    <script>
        // Funcionalidad del menú móvil
        const menuButton = document.querySelector('.menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');
        const closeMenu = document.querySelector('.close-menu');
        const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            menuButton.classList.add('active');
            mobileMenuOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        function closeMenuMobile() {
            mobileMenu.classList.remove('active');
            menuButton.classList.remove('active');
            mobileMenuOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }

        closeMenu.addEventListener('click', closeMenuMobile);
        mobileMenuOverlay.addEventListener('click', closeMenuMobile);

        // Funcionalidad de preguntas frecuentes
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Cerrar todos los demás elementos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });

                // Alternar el elemento actual
                item.classList.toggle('active');
            });
        });

        // SCRIPT MODIFICADO PARA MANEJAR ARCHIVOS

// SCRIPT MODIFICADO PARA MANEJAR ARCHIVOS (continuación)
        document.getElementById("contacto-form").addEventListener("submit", function (e) {
            e.preventDefault();
            
            const fileInput = document.getElementById('archivo');
            const file = fileInput.files[0];
            const submitBtn = document.getElementById('submitBtn');
            const loadingMessage = document.getElementById('loadingMessage');
            
            // Validar tamaño del archivo (25MB máximo)
            if (file && file.size > 25 * 1024 * 1024) {
                alert('El archivo es muy grande. El tamaño máximo permitido es 25MB.');
                return;
            }
            
            // Mostrar mensaje de carga
            submitBtn.disabled = true;
            submitBtn.style.display = 'none';
            loadingMessage.classList.remove('hidden');
            
            // Función para convertir archivo a base64
            const fileToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = error => reject(error);
                });
            };
            
            // Función para enviar el formulario
            const enviarFormulario = async () => {
                try {
                    const formData = new FormData(this);
                    
                    // Si hay archivo, convertirlo a base64
                    if (file) {
                        const base64File = await fileToBase64(file);
                        formData.append('archivoBase64', base64File);
                        formData.append('archivoNombre', file.name);
                        formData.append('archivoTipo', file.type);
                    }
                    
                    // AQUÍ ESTÁ TU NUEVA URL
                    const response = await fetch("https://script.google.com/macros/s/AKfycbwS2Zb9uNpUUcuG2ZY6XaVOr9ir3slM7QROGOY3HRp6AgAPa-egMcsBK6l0pdkQS31V/exec", {
                        method: "POST",
                        body: formData
                    });
                    
                    const result = await response.text();
                    
                    // Ocultar mensaje de carga y habilitar botón
                    submitBtn.disabled = false;
                    submitBtn.style.display = 'block';
                    loadingMessage.classList.add('hidden');
                    
                    // Redirigir a página de confirmación
                    window.location.href = "retroalimentacion.html";
                    
                } catch (error) {
                    console.error("Error al enviar el formulario:", error);
                    alert("Error al enviar el mensaje. Por favor, intenta de nuevo.");
                    submitBtn.disabled = false;
                    submitBtn.style.display = 'block';
                    loadingMessage.classList.add('hidden');
                }
            };
            
            enviarFormulario();
        });

        // Scroll suave para los enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar menú móvil si está abierto
                    if (mobileMenu.classList.contains('active')) {
                        closeMenuMobile();
                    }
                }
            });
        });

        // Validación adicional del archivo al seleccionarlo
        document.getElementById('archivo').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validar tamaño
                if (file.size > 25 * 1024 * 1024) {
                    alert('El archivo es muy grande. El tamaño máximo permitido es 25MB.');
                    e.target.value = '';
                    return;
                }
                
                // Validar tipo de archivo
                const allowedTypes = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/vnd.ms-excel',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.ms-powerpoint',
                    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                    'image/jpeg',
                    'image/jpg',
                    'image/png',
                    'application/zip',
                    'application/x-rar-compressed'
                ];
                
                if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|jpg|jpeg|png|zip|rar)$/i)) {
                    alert('Tipo de archivo no permitido. Por favor, sube archivos PDF, Word, Excel, PowerPoint, imágenes o archivos comprimidos.');
                    e.target.value = '';
                    return;
                }
                
                // Mostrar información del archivo seleccionado
                console.log(`Archivo seleccionado: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
            }
        });
    </script>
</body>
</html>