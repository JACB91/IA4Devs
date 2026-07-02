# ✍️ Definición y desarrollo del primer ticket del proyecto LTI 🔴

> Modulo 3: Aprende a utilizar los IDEs del futuro
> Curso: AI4Devs 2026/04
> Fuente: training.lidr.co

🚨** ****La fecha límite es 17 de Mayo al final del día, **
**independientemente del país.**

En el laboratorio de la siguiente sesión, realizaremos en vivo diferentes tareas comunes en equipos de desarrollo apoyados en asistentes de código IA disponibles en IDEs. Pero antes, tú tratarás de realizar unos primeros tickets de trabajo.

Para ello, comenzaremos con un proyecto ya creado y estándar para tod@s, y por eso te compartimos la base del proyecto LTI creada por los mentores (siguiendo un proceso parecido al tuyo en el ejercicio anterior) para que la puedas clonar e importar en tu IDE con IA (Cursor, VS Code, JetBrains...).

## 1. Descarga el repositorio base de Github

En esta sesión el repositorio base en Github es:

[**AI4Devs-lab-ides**](https://github.com/LIDR-academy/AI4Devs-lab-ides-2604)

## 2. Inicializa el proyecto

Encontrarás cómo arrancar el proyecto (backend, frontend y base de datos) en las instrucciones en el Readme.md, **leelas con atención.**

## 3. Realiza el ejercicio

Una vez el proyecto está operativo, es el momento de empezar a contribuir a los tickets de trabajo.

Esta es la historia de usuario que hay que trabajar:

## **Añadir Candidato al Sistema**

**Como** reclutador,
**Quiero** tener la capacidad de añadir candidatos al sistema ATS,
**Para que** pueda gestionar sus datos y procesos de selección de manera eficiente.

**Criterios de Aceptación:**

- 
**Accesibilidad de la función:** Debe haber un botón o enlace claramente visible para añadir un nuevo candidato desde la página principal del dashboard del reclutador.

- 
**Formulario de ingreso de datos:** Al seleccionar la opción de añadir candidato, se debe presentar un formulario que incluya los campos necesarios para capturar la información del candidato como nombre, apellido, correo electrónico, teléfono, dirección, educación y experiencia laboral.

- 
**Validación de datos:** El formulario debe validar los datos ingresados para asegurar que son completos y correctos. Por ejemplo, el correo electrónico debe tener un formato válido y los campos obligatorios no deben estar vacíos.

- 
**Carga de documentos:** El reclutador debe tener la opción de cargar el CV del candidato en formato PDF o DOCX.

- 
**Confirmación de añadido:** Una vez completado el formulario y enviada la información, debe aparecer un mensaje de confirmación indicando que el candidato ha sido añadido exitosamente al sistema.

- 
**Errores y manejo de excepciones:** En caso de error (por ejemplo, fallo en la conexión con el servidor), el sistema debe mostrar un mensaje adecuado al usuario para informarle del problema.

- 
**Accesibilidad y compatibilidad:** La funcionalidad debe ser accesible y compatible con diferentes dispositivos y navegadores web.

**Notas:**

- 
La interfaz debe ser intuitiva y fácil de usar para minimizar el tiempo de entrenamiento necesario para los nuevos reclutadores.

- 
Considerar la posibilidad de integrar funcionalidades de autocompletado para los campos de educación y experiencia laboral, basados en datos preexistentes en el sistema.

**Tareas Técnicas:**

- 
Implementar la interfaz de usuario para el formulario de añadir candidato.

- 
Desarrollar el backend necesario para procesar la información ingresada en el formulario.

- 
Asegurar la seguridad y privacidad de los datos del candidato.

Como ves, hay 3 tareas técnicas necesarias: desarrollar el backend, el frontend y la base de datos. Dado que no hay nada aún en el proyecto base, requerirá tareas extra como crear el modelo de datos, lanzar la migración en PostgreSQL, etc. 

Te recomendamos encarecidamente **definir primero los 3 tickets de trabajo a fondo**, y usarlos como input para el asistente de código.

Recuerda **usar solo plugins como Copilot o CodeGPT, o IDEs con IA como Cursor**, ya no trabajaremos con chatbots.

## **Esperamos tu entrega como un pull request en el repositorio. **

Incluye los **archivos modificados en su lugar correspondiente**, y un** fichero **[**prompts-iniciales.md**](http://prompts-iniciales.md)** en la raíz.**

Para ello, debes seguir los siguientes pasos:

- 
Hacer un fork del repositorio (botón arriba a la derecha)

- 
Clonar (Descargar) el fork, que será un proyecto con el mismo nombre pero bajo tu usuario

- 
Completar el ejercicio: rellenar el prompt y los archivos

- 
Crear una nueva rama para tu entregable del tipo *solved-iniciales*

- 
Hacer Commit

- 
Hacer ⁠Git push

- 
Vas a tu Github, en la interfaz de tu repositorio tendrás una opción llamada “Contribute”, das clic y verás la opción “Open pull request”(Recuerda agregar todas tus iniciales en el nombre del PR).

En caso de que falle, puedes enviar el proyecto en zip por correo a [jorge@lidr.co](mailto:jorge@lidr.co)

Si tienes dudas sobre el ejercicio, consúltalas en el grupo de whatsapp para que podamos apoyarte lo más rápido posible, y que otr@s compañer@s también la resuelvan.
**¡Éxitos!**
