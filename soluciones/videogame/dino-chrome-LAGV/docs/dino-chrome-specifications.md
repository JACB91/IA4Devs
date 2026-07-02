
# Chrome Dino Game Documentation

## 1. Overview
El **Chrome Dino Game** es un juego de navegador desarrollado por el equipo de Google para el navegador Chrome. Se activa cuando no hay conexión a Internet, presentando un dinosaurio pixelado que corre a través de un desierto infinito, esquivando obstáculos para alcanzar la máxima puntuación posible.

### Objetivo
El objetivo del juego es esquivar obstáculos (cactus y pterodáctilos) mientras el dinosaurio corre automáticamente, acumulando puntos con el tiempo.

---

## 2. Features

### A. Gameplay
- **Scroll Infinito**: El dinosaurio corre a través de un escenario infinito en un bucle.
- **Obstáculos**: 
  - Cactus (varios tamaños y combinaciones).
  - Pterodáctilos (vuelan a diferentes alturas).
- **Velocidad**:
  - Incrementa gradualmente con el tiempo, aumentando la dificultad.
- **Puntos**: 
  - Se incrementan con la distancia recorrida.
  - Un sonido o animación destaca cada 100 puntos acumulados.
- **Colisión**:
  - Termina el juego si el dinosaurio choca con un obstáculo.
  - Aparece un mensaje de "Game Over".

### B. Controles
- **Teclado**:
  - Barra espaciadora (`Space`) o flecha arriba (`ArrowUp`): Saltar.
  - Flecha abajo (`ArrowDown`): Agacharse (para esquivar pterodáctilos).
- **Touch** (dispositivos móviles):
  - Tap para saltar.
  - Swipe down para agacharse.

### C. Escenario
- **Desierto Pixelado**:
  - Fondo minimalista en tonos monocromáticos (blanco y negro).
  - Suelo con líneas discontinuas representando el camino.
- **Ciclo Día-Noche**:
  - Cambio gradual entre día y noche a medida que avanza el tiempo.
  - Estrellas y luna aparecen durante la noche.

### D. Animaciones
- **Dinosaurio**:
  - Animación de correr (dos frames alternados).
  - Animación de saltar y agacharse.
- **Obstáculos**:
  - Cactus estáticos.
  - Pterodáctilos animados batiendo alas.
- **Game Over**:
  - Dinosaurio con cabeza caída.
  - Texto: "GAME OVER".

### E. Mecánicas Avanzadas
- **Spawn Aleatorio de Obstáculos**:
  - Generación de obstáculos basada en la velocidad y el tiempo transcurrido.
- **Rangos de Altura de Pterodáctilos**:
  - Bajo: Puede ser esquivado agachándose.
  - Medio y alto: Puede ser esquivado saltando.
- **Velocidad Progresiva**:
  - Incrementa linealmente en función del tiempo.
  - Máxima velocidad limitada para mantener la jugabilidad.
- **Sonidos**:
  - Salto, colisión y puntos destacados.

### F. Puntuación y Record
- **Puntuación en Vivo**:
  - Mostrada en la parte superior derecha de la pantalla.
- **High Score**:
  - Se guarda en el almacenamiento local del navegador (si está disponible).
  - Se muestra junto a la puntuación actual.

### G. Estilo Visual
- **Minimalista**:
  - Estilo pixel art monocromático.
  - Fondo blanco y sprites en negro.
- **Resolución Escalable**:
  - Se adapta al tamaño de la ventana del navegador.

---

## 3. Technical Details

### A. Tecnología
- **HTML5**: 
  - Canvas para gráficos.
- **JavaScript**:
  - Lógica del juego y manejo de eventos.
- **CSS3**:
  - Estilo del contenedor.

### B. Lógica del Juego
1. **Bucle Principal**:
   - Actualiza la posición de los elementos (scroll).
   - Detecta colisiones.
   - Renderiza gráficos.
2. **Sistema de Colisiones**:
   - Basado en detección de límites (bounding boxes).
3. **Sistema de Puntos**:
   - Incremento por frame basado en la velocidad actual.
4. **Gestión de Obstáculos**:
   - Generación procedural.
   - Eliminación de obstáculos fuera de la pantalla.

---


## 4. References
- [Chrome Dino Game Wiki](https://en.wikipedia.org/wiki/Dinosaur_Game)
- [Original Chrome Dino Game](chrome://dino)
- [Chrome Dino Game Demo](https://chromedino.com/)

