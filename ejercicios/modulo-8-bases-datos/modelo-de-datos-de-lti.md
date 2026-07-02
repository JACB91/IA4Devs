# ✍️ Modelo de datos de LTI 🔴

> Modulo 8: Bases de datos
> Curso: AI4Devs 2026/04
> Fuente: training.lidr.co

⏱** La fecha límite es domingo 21 de Junio al final del día.**

En este ejercicio vamos a trabajar a fondo con el modelo de datos de LTI.

## 1. Descarga el repositorio base de Github

Apóyate en el repositorio base para este ejercicio:

[**AI4Devs-db**](https://github.com/LIDR-academy/AI4Devs-db-2604)

## 2. Realiza el ejercicio

Tu misión en este ejercicio es **actualizar la base de datos con las nuevas entidades **que nos permitan operar el flujo completo de aplicación para diversas posiciones.

Usando la IA (y los conocimientos adquiridos en este módulo) procede a **convertir el ERD en formato mermaid que te proporcionamos, a un script SQL**. Analiza la base de datos del código actual y el script SQL y expande la estructura de datos usando las migraciones de Prisma.

Recuerda **aplicar buenas prácticas**, como la definición de Indices y la normalización de la base datos, ya que el ERD proporcionado no cuenta con ello.

Por otra parte, **utiliza herramientas visuales para bases de datos PostgreSQL** como [PGAdmin](https://www.pgadmin.org/) para verificar que puedes conectar, y que la estructura creada es correcta. También podrás probar a guardar algunos datos y realizar consultas con lo aprendido en este módulo.

ERD:

erDiagram
     COMPANY {
         int id PK
         string name
     }
     EMPLOYEE {
         int id PK
         int company_id FK
         string name
         string email
         string role
         boolean is_active
     }
     POSITION {
         int id PK
         int company_id FK
         int interview_flow_id FK
         string title
         text description
         string status
         boolean is_visible
         string location
         text job_description
         text requirements
         text responsibilities
         numeric salary_min
         numeric salary_max
         string employment_type
         text benefits
         text company_description
         date application_deadline
         string contact_info
     }
     INTERVIEW_FLOW {
         int id PK
         string description
     }
     INTERVIEW_STEP {
         int id PK
         int interview_flow_id FK
         int interview_type_id FK
         string name
         int order_index
     }
     INTERVIEW_TYPE {
         int id PK
         string name
         text description
     }
     CANDIDATE {
         int id PK
         string firstName
         string lastName
         string email
         string phone
         string address
     }
     APPLICATION {
         int id PK
         int position_id FK
         int candidate_id FK
         date application_date
         string status
         text notes
     }
     INTERVIEW {
         int id PK
         int application_id FK
         int interview_step_id FK
         int employee_id FK
         date interview_date
         string result
         int score
         text notes
     }

     COMPANY ||--o{ EMPLOYEE : employs
     COMPANY ||--o{ POSITION : offers
     POSITION ||--|| INTERVIEW_FLOW : assigns
     INTERVIEW_FLOW ||--o{ INTERVIEW_STEP : contains
     INTERVIEW_STEP ||--|| INTERVIEW_TYPE : uses
     POSITION ||--o{ APPLICATION : receives
     CANDIDATE ||--o{ APPLICATION : submits
     APPLICATION ||--o{ INTERVIEW : has
     INTERVIEW ||--|| INTERVIEW_STEP : consists_of
     EMPLOYEE ||--o{ INTERVIEW : conducts
 
## 

 

## 3. Entrega el ejercicio

Esperamos tu entrega como un **pull request en el repositorio que solo incluya:**

- 
**Los cambios de modelo y la migración .sql en la carpeta *backend/prisma***

- 
**Un fichero *prompts-iniciales.md* en la carpeta *prompts*.**

Para ello, debes seguir los siguientes pasos una vez ya tengas el repositorio preparado como se ha explicado en el paso anterior:

- 
Completar el ejercicio: rellenar el prompt, actualizar el modelo *schema.prisma *e incluir la migración .sql que nos permitiría replicar la actualización de base de datos

- 
Crear una nueva rama para tu entregable con el nombre *db-iniciales*

- 
Hacer commit

- 
⁠Git push

- 
En la interfaz de tu repositorio te saldrá un aviso arriba para hacer ⁠Pull request

En caso de que falle, puedes enviar el proyecto en zip por correo a [dago@lidr.es](mailto:dago@lidr.es).

Si tienes dudas sobre el ejercicio, consúltalas en el grupo de whatsapp para que podamos apoyarte lo más rápido posible, y que otr@s compañer@s también la resuelvan.

Por último, no olvides añadir tus prompts en prompts.md dentro de la carpeta prompts. 
  

¡A por ello!
