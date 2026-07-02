## user
Te voy a pegar una descripcion de un videojuego que quiero programar.
Necesito que me los estructures de la mejor forma para que un LLM lo pueda entender prefectamente. Con una breve descripcion, una lista de funcionalidades y una estructura.

## Cursor

Por supuesto! Estaré encantado de ayudarte a estructurar la descripción de tu videojuego. Por favor, comparte la descripción y te ayudaré a organizarla de manera clara y estructurada para que un LLM pueda entenderla perfectamente.
La estructura que utilizaremos será:
1. Descripción General
- Género
- Estilo visual
- Público objetivo
2. Mecánicas Principales
- Lista de funcionalidades core
- Sistemas de juego
3. Elementos del Juego
- Personajes
- Objetos
Escenarios
4. Sistemas Técnicos
- Requisitos técnicos
- Características específicas de implementación
Por favor, comparte tu descripción y la organizaremos siguiendo este formato.

## user
Vamos a programar un videojuego de una forma clara y sencilla. Se trata de un videojuego de memoria que consta de 6 imagenes duplicadas, es decir , 12 imagenes. Hay 3 niveles. La diferencia entre los niveles esta en el contador. El "nivel 1" cuenta con un contador cuenta atras de 40 segundos, el "nivel 2" cuenta con un contador cuenta atras de 30 segundos y el "nivel 1" cuenta con un contador cuenta atras de 20 segundos. Las imagenes estan distribuidas de forma aleatoria en 4 columnas y 3 filas. Al inicio de cada nivel las imagenes estan ocultas. Podemos jugar con propiedades css para usar el blur,opacidad y contraste para ocultar las imagenes. Cuando el usuario elige un nivel y hace click en el boton "empezar", las imagenes se muestran(quitamos propiedades css) durante 5 segundos y se vuelven a ocultar. Desde ese momento empieza la cuenta atras del contador segun el nivel. El usuario solo puede hacer click en 2 de las 12 imagenes. Cuando hace click en la primera imagen elegida, esta se muestra(quitamos propiedades css) y cuando hace click en una segunda, tambien la mostramos. Si las dos imagenes seleccionadas en el grid no coinciden en nombre de la imagen como por ejemeplo "lion.png" y en copia  de la imagen como "lion-copia.png", las imagens se vuelven a ocultar. Si las dos imagenes coinciden en nombre como "lion.png" y en su copia como "lion-copia.png", estas dos imagenes se mantienen visibles(sin propiedades css) y el usaurio puede volver a elegir otras dos imagenes ocultas. Y volveriamos a aplicar la misma logica que hemos comentado con las dos primeras imagenes. Si todas las imagenes estan visibles antes de que la cuenta atras llegue a 0, quiere decir que el usuario ha elegido correctamente la imagen con su copia  antes de que la cuenta atras finalice y el juego habrá finalizado con exito. Si el juego finaliza en caso de exito se muestra un modal con confeti y un texto de "Enhorabuena" y una "x" para cerrar el modal. Si el usuario no logra mostrar todas las imagenes  antes de que la cuenta atras llegue a 0, el videoguego habra finalizado sin exito y se mostrará un modal con un texto de "game over" y una "x" que cierra el modal. El usuario no puede empezar el juego si no elige primero un nivel haciendo click en uno de los botones(nivel 1, nivel 2, nivel 3) y luego haciendo click en el boton "empezar". El videojuego tiene un header con un logo y un contador. Debajo hay 3 botones con "Nivel 1", "Nivel 2" y "Nivel 3". Debajo de estos botones hay un grid con las 12 imagenes y debajo de la seccion de las imagenes hay un boton de "empezar". Hay 6 imagenes en la carpeta img( lion.png,bear.png,monkey.png,koala.png,dog.png,tiger.png) que estan duplicadas con unq copia de la imagen con el mismo nombre de la imagen y con un guion medio y un texto "copia". En el caso de "leon.png" hay otra imagen duplicada llamada "leon-copia.png". Hay un total de 12 imagenes . Puedes ver los png adjuntos con el diseño del videojuego llamados "memo-game-desktop.png" que seria para la version desktop. "memo-game-mobile.png" que seria para la version mobile y "memo-game-modal.png".  En la version mobile los botones se hacen mas pequeños y las imagenes se muestran en 3 columnas y 4 filas. Quiero que sea un videojuego en html, con TailwindCSS y vanilla js

## Cursor

# Memo Game - Documentación Técnica

## Descripción General
- **Nombre**: Memo Game
- **Género**: Juego de memoria
- **Tecnologías**: HTML, TailwindCSS, Vanilla JavaScript
- **Diseño**: Responsive (Desktop y Mobile)

## Características Principales

### Sistema de Niveles
- Nivel 1: 40 segundos
- Nivel 2: 30 segundos
- Nivel 3: 20 segundos

### Mecánica del Juego
- 12 cartas (6 pares de imágenes)
- Distribución aleatoria
- Vista previa inicial de 5 segundos
- Selección de 2 cartas por turno

## Elementos del Juego

### Estructura Visual
- Header (Logo + Contador)
- Botones de Nivel (1, 2, 3)
- Grid de Imágenes
- Botón "Empezar"


### Grid de Imágenes
- Desktop: 4 columnas x 3 filas
- Mobile: 3 columnas x 4 filas

### Assets
/img/
├── lion.png
├── lion-copia.png
├── bear.png
├── bear-copia.png
├── monkey.png
├── monkey-copia.png
├── koala.png
├── koala-copia.png
├── dog.png
├── dog-copia.png
├── tiger.png
└── tiger-copia.png


## Flujo del Juego

### 1. Inicio
- Selección obligatoria de nivel
- Activación con botón "Empezar"

### 2. Desarrollo
- Vista previa inicial (5 segundos)
- Inicio del contador según nivel
- Selección de cartas por pares

### 3. Finalización
#### Victoria
- Todas las cartas descubiertas antes del tiempo
- Modal con confeti y mensaje "Enhorabuena"

#### Derrota
- Tiempo agotado
- Modal con mensaje "Game Over"

## Especificaciones Técnicas

### Estilos
- TailwindCSS para diseño responsive
- Efectos CSS para ocultar cartas:
  - Blur
  - Opacidad
  - Contraste

### Interactividad
1. Validación de selección de nivel
2. Control de tiempo
3. Lógica de comparación de pares
4. Sistema de modales
5. Animaciones y efectos visuales

### Estados de las Cartas
1. Oculta (con efectos CSS)
2. Visible temporalmente (durante selección)
3. Visible permanentemente (par encontrado)

## Responsive Design
- Desktop: 4x3 grid
- Mobile: 3x4 grid
- Adaptación de tamaños de botones
- Diseño fluido para diferentes dispositivos

## User: Se ha trasladado la respuesta al composer y se han añadido 3 prompts mas:

- Necesito que las imagenes sean mas pequeñas, menos altas para que se puedan ver todas de un vistazo en la pantalla.

- Necesito que las imagenes se carguen rapido desde el inicio de la carga

- No funciona bien en el navegador de safari. Algo pasa con las imagenes.