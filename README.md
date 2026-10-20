# Aventura Pesquera — PWA

Juego web instalable en móviles y PC. Incluye diez zonas de pesca, jornadas de 30 segundos, controles A/D/E, mejoras, bodega, ventas, enciclopedia de 1.200 especies, sonidos, pantalla completa y guardado local.

## Ejecutar localmente

La PWA necesita servirse desde `localhost` o HTTPS para que el service worker y la instalación funcionen. Con Python instalado, abre una terminal en esta carpeta y ejecuta:

```bash
python -m http.server 8080
```

Después abre `http://localhost:8080` en el navegador.

## Instalar

- **PC (Chrome/Edge):** abre la dirección local o HTTPS y usa el icono Instalar de la barra de direcciones si aparece.
- **Android:** abre la página en Chrome y elige «Instalar aplicación» o «Añadir a pantalla de inicio».
- **iPhone/iPad:** abre la página en Safari, pulsa Compartir y después «Añadir a pantalla de inicio».

## Controles

- `A`: mover el barco a la izquierda.
- `D`: mover el barco a la derecha.
- `E` o barra espaciadora: lanzar/recoger la caña.
- En móviles, usa las flechas y el botón de pesca en pantalla.

El progreso se guarda en el almacenamiento local del navegador. Borrar los datos del sitio puede borrar la partida.
