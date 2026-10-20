# Aventura Pesquera — PWA v1.1

Juego web instalable en móviles y PC. Incluye diez zonas de pesca, jornadas de 30 segundos, controles A/D/E, enciclopedia de 1.200 especies, sonido, pantalla completa, guardado local y un árbol de 21 habilidades repartidas en tres ramas.

## Novedades de la versión 1.1

- La caña desciende desde la posición del barco y captura el primer pez que realmente cruza su recorrido. Si no encuentra ninguno, no concede una captura gratuita.
- Al capturar un pez, la jornada y los peces quedan pausados y aparece un menú animado con rareza, peso y valor. Puedes continuar la expedición desde ese menú.
- Tres ramas de habilidades: **Barco** (más peces y movimiento), **Caña** (mejores probabilidades de rarezas altas y mayor alcance) y **Bodega** (más espacios y precios de venta superiores). Son 21 nodos con requisitos y costes.
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
