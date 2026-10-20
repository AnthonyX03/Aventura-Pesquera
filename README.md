# Aventura Pesquera — PWA v1.2

Juego web instalable en móviles y PC. Incluye diez zonas de pesca, jornadas de 30 a 60 segundos, controles A/D/E, enciclopedia de 1.200 especies, sonido, pantalla completa, guardado local y un árbol de 100 habilidades: 30 de Barco, 30 de Caña, 30 de Bodega y 10 de Tiempo.

## Novedades de la versión 1.2

- La caña desciende desde la posición del barco y captura el primer pez que realmente cruza su recorrido. Si no encuentra ninguno, no concede una captura gratuita.
- Al capturar un pez, la jornada y los peces quedan pausados y aparece un menú animado con rareza, peso y valor. Puedes continuar la expedición desde ese menú.
- Cuatro ramas de habilidades: **Barco** (más peces y movimiento), **Caña** (probabilidades de rarezas altas y alcance), **Bodega** (más espacios y mejores precios) y **Tiempo** (10 habilidades de +3 segundos, de 30 a 60 segundos). Hay 100 nodos, costes progresivos y requisitos encadenados. Los nodos se muestran como cuadrados compactos; al pulsarlos aparece una ficha con descripción, precio, requisito y botón de desbloqueo.
- La bodega comienza con **5 espacios** y muestra las capturas en cuadrícula.
- Desbloquear zonas cuesta más, con una progresión económica más exigente.
- Menos peces simultáneos para que cada encuentro sea más legible.

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
- `E` o barra espaciadora: lanzar la caña.
- En móviles, usa las flechas y el botón de pesca en pantalla.

El progreso se guarda en el almacenamiento local del navegador. Borrar los datos del sitio puede borrar la partida.

## Música y volumen

Coloca la banda sonora en `audio/AventuraPesquera.mp3` dentro de la raíz del proyecto (la misma carpeta que `index.html`). El juego intenta reproducirla al abrir la web y vuelve a intentarlo con la primera interacción si el navegador bloquea la reproducción automática. En los ajustes puedes regular por separado la música y los efectos de sonido del 0 al 100 %; ambos valores se guardan en la partida. Para que funcione también sin conexión, abre la aplicación online al menos una vez después de publicar el archivo de audio.
