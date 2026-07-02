# 🎥 Mejores prácticas de seguridad en la interacción con LLMs 🔴 — 28 min

> Modulo 6: Etica, Regulacion y Privacidad en el uso de IA
> Curso: AI4Devs 2026/04
> Fuente: training.lidr.co

⏳ Tiempo estimado: 28 min

En el tema 6 veremos a fondo algunas de las mejores prácticas de ciberseguridad (independientemente del uso de asistentes IA), como el concepto de seguridad por diseño o seguridad a la izquierda (*shift-left security*). También veremos cómo los asistentes IA nos pueden ayudar a implementar dichas prácticas de manera sistemática y sin tener tanta dependencia en el conocimiento en ciberseguridad de los desarrolladores del equipo.

En esta sección, sin embargo, vamos a centrarnos en un problema muy concreto: **cómo mitigar o evitar por completo la fuga de información sensible** de la organización cuando usamos (o construimos) LLMs y asistentes IA.

📢 **Por qué esto importa más que nunca (2025-2026)**

El **OWASP Top 10 for LLM Applications (edición 2025)** elevó *"Sensitive Information Disclosure"* del puesto #6 al #2, y añadió dos nuevas categorías directamente relacionadas con esta lección: **LLM02 (Sensitive Information Disclosure)**, **LLM07 (System Prompt Leakage)** y **LLM08 (Vector and Embedding Weaknesses)**.

En paralelo, las obligaciones del **EU AI Act para sistemas de alto riesgo entran en vigor el 2 de agosto de 2026**, con sanciones de hasta **35M€ o el 7% de la facturación global**. Incidentes reales como **EchoLeak (CVE-2025-32711)** — exfiltración zero-click de Microsoft 365 Copilot mediante un email preparado — han demostrado que la fuga de datos vía LLM ya no es teórica.

En esta lección vamos a ver **cuatro capas de defensa** que todo equipo debería considerar: de-identificación, AI Gateway como plano de control, ejecución privada, y políticas de retención del proveedor.

## **1. De-identificación**

La primera alternativa es utilizar la **de-identificación** de todo dato personal, confidencial o sensible antes de que llegue al LLM.

La de-identificación (o anonimización) es el proceso de eliminar o sustituir información personal identificable (**PII** — *Personally Identifiable Information*) de un conjunto de datos para proteger la privacidad de las personas: nombres, direcciones, números de identificación, emails, teléfonos, historiales médicos… cualquier dato que permita identificar a un individuo específico.

El patrón arquitectónico de referencia es el **Privacy Data Vault**: un almacén separado y cifrado donde vive el PII real, mientras que los sistemas de aplicación (incluyendo los LLMs) solo manejan **tokens** que lo representan. Este patrón aplica mucho más allá de los LLMs: es la base técnica con la que empresas sujetas a GDPR, HIPAA o PCI-DSS cumplen con los principios de *data minimization* y *purpose limitation*.

En el siguiente diagrama puedes ver el flujo típico: la aplicación captura datos sensibles, los envía al vault para ser tokenizados, y a partir de ese momento los sistemas downstream (base de datos analítica, logs, LLMs…) solo ven tokens. El dato real solo se recupera cuando un usuario autorizado lo solicita explícitamente.

Flujo de Privacy Data Vault: datos con PII entran al vault, se tokenizan, y los sistemas downstream (incluidos LLMs) solo ven tokens

Lo importante del diagrama: el vault actúa como **single point of enforcement** para políticas de privacidad. Si cambias una regla (por ejemplo, "los analistas ya no pueden ver emails completos, solo el dominio"), solo tienes que cambiarla en un sitio — no en cada base de datos, log o prompt.

## **1.1 De-identificación en la fase de inferencia**

La **fase de inferencia** es cuando interactuamos con el LLM a través de prompts, adjuntamos ficheros o hacemos RAG. Es la fase de mayor exposición diaria: cada developer, cada chatbot de atención al cliente, cada agente autónomo está potencialmente enviando datos sensibles al modelo en cada turno de la conversación.

El patrón de defensa es insertar una capa de de-identificación **antes** de que el prompt salga de tu red, y una capa de re-identificación en el camino de vuelta. El siguiente diagrama ilustra el ciclo completo:

Flujo de de-identificación en inferencia: prompt del usuario → redacción/tokenización de PII → LLM recibe solo tokens → respuesta del LLM → re-identificación → usuario final recibe respuesta con datos reales

Los tres momentos críticos que muestra el diagrama:

- 
**Pre-procesado del prompt**: detectar PII y sustituirla por tokens antes de invocar la API del LLM.

- 
**Inferencia con datos tokenizados**: el LLM genera su respuesta sin haber "visto" jamás el PII real.

- 
**Post-procesado de la respuesta**: re-identificar los tokens en la respuesta para devolver al usuario autorizado un resultado útil.

## **Herramientas actuales de de-identificación (panorama 2025-2026)**

El ecosistema ha madurado muchísimo desde las primeras versiones de este módulo. Estas son hoy las referencias, ordenadas por nivel de control y adopción real en la industria:

- 
**Microsoft Presidio** *(open source, MIT)*: estándar de facto para detectar, anonimizar y enmascarar PII en texto. Integración directa con LiteLLM, LangChain y LangGraph como *pre/post-call guardrail*. Precisión ~60-70% en datos reales complejos — suficiente para la mayoría de casos no regulados, pero insuficiente para salud o banca.

- 
**Skyflow LLM Privacy Vault**: implementación comercial del patrón Privacy Vault **específicamente para LLMs**. Tokeniza PII antes de que llegue al modelo y restaura los valores reales solo en la respuesta, según políticas de gobierno por rol.

- 
[**Protecto.ai**](http://Protecto.ai): su diferencial es la **tokenización preservando contexto** — sustituye "Juan García, 45 años" por CUST_NAME_045, AGE_BAND_40_50 de forma consistente, lo que mantiene la utilidad semántica de la respuesta del LLM. Soporta RBAC para desenmascarado diferenciado por rol.

- 
**Nightfall AI**: líder en protección frente al *"Shadow AI"* (empleados usando ChatGPT/Copilot/Gemini sin supervisión de seguridad). Monitoriza interacciones vía plugins de navegador y agentes endpoint. Según sus benchmarks, 1.5-2x más preciso que AWS Comprehend, Google DLP o Microsoft Purview.

- 
**Private AI (Limina)**: *claim* de 99.5% de detección en 50+ idiomas. En benchmarks independientes los servicios cloud genéricos (AWS, Google, Azure) pierden entre 13.8% y 46.5% del PII; Private AI, entre 0.2% y 7%. Opción seria para industrias altamente reguladas.

- 
**Servicios cloud nativos**: Azure AI Language PII (ahora con modo syntheticReplacement, que sustituye PII por valores sintéticos en vez de enmascarar), Google Sensitive Data Protection (rebautizado desde Cloud DLP, con 150+ tipos detectables), y la novedad **Snowflake AI_REDACT** (GA en diciembre 2025, redacción con LLM directamente en el data warehouse).

💡 **Prueba esto ahora**: instala Presidio localmente (pip install presidio-analyzer presidio-anonymizer) y ejecuta el quickstart con un CV ficticio. Verás en 5 minutos cómo detecta nombres, emails y teléfonos, y cómo los sustituye manteniendo el contexto gramatical.

## **1.2 De-identificación en la fase de entrenamiento**

Si tu organización entrena su propio modelo (o hace *fine-tuning* sobre uno base), la fase de entrenamiento es un paso fundamental y, al mismo tiempo, **el de mayor riesgo de filtración permanente**: cualquier PII que el modelo vea durante el entrenamiento puede quedar memorizada en sus pesos y aflorar después en forma de *memorization attacks* o *training data extraction*.

Para evitarlo, tienes dos alternativas complementarias:

## **Alternativa A — De-identificar el dataset de entrenamiento**

Es un paso conceptualmente similar al de la fase de inferencia, pero aplicado **antes** de que el dataset toque el pipeline de entrenamiento o fine-tuning. El diagrama de Skyflow ilustra el patrón de forma muy clara:

Diagrama de Skyflow: los datos crudos con PII entran al vault, se de-identifican con tokens consistentes, y el dataset resultante (sin PII real) es el que alimenta el pipeline de entrenamiento del modelo

## Fíjate en tres detalles del flujo:

- 
**El PII nunca sale del vault**: los pesos del modelo solo aprenden patrones sobre tokens, nunca sobre valores reales.

- 
**Los tokens son consistentes**: "Juan García" se convierte siempre en el mismo token PER_00234, lo que permite al modelo aprender correlaciones (ej. *"PER_00234 siempre aparece con ORG_0012"*) sin exponer identidades.

- 
**La re-identificación es opcional y controlada**: solo los consumidores del modelo que estén autorizados y lo necesiten pueden resolver los tokens.

**Técnicas complementarias que han ganado tracción en 2025-2026**:

- 
**Differential Privacy durante el entrenamiento**: añade ruido matemático controlado a los gradientes para garantizar que la contribución de cualquier individuo al modelo es estadísticamente indistinguible. Soportado nativamente en PyTorch (Opacus) y TensorFlow Privacy.

- 
**Federated Learning**: el modelo va a los datos, no al revés. Los datos nunca abandonan el dispositivo/empresa del cliente — solo se comparten gradientes agregados. Google lo usa en Gboard, Apple en Siri, y frameworks como **Flower** o **NVIDIA FLARE** lo han hecho accesible para equipos no-especialistas.

- 
**Machine Unlearning**: técnicas para "desentrenar" un modelo sobre datos específicos cuando se recibe un *GDPR right-to-erasure request*. Todavía área de investigación activa, pero ya con implementaciones prácticas.

## **Alternativa B — Usar contenido sintético para el entrenamiento**

Si es absolutamente necesario introducir cierta información sensible (en lugar de tokens) para mejorar el rendimiento del modelo en tareas específicas, una opción es usar **contenido sintético** — información generada artificialmente que preserva las propiedades estadísticas de los datos reales sin corresponder a personas o eventos reales.

Para medir la calidad de estos datos, se compara la base sintética con la real evaluando tres dimensiones: **fidelidad estadística** (mismas distribuciones, correlaciones y casos extremos), **utilidad** (un modelo entrenado con datos sintéticos rinde igual que uno entrenado con datos reales) y **privacidad** (imposibilidad de re-identificar individuos del dataset original).

**Ventajas del contenido sintético — contexto 2025-2026**:

- 
**Menor riesgo de filtración de PII**: al no corresponder a personas reales, se elimina casi por completo el riesgo de desanonimización, *membership inference attacks* y otros problemas asociados a datos reales. Este año Gartner ha publicado que el 75% de las empresas usarán IA generativa para crear datos sintéticos de cliente en 2026, frente a menos del 5% en 2023.

- 
**Mejor calidad y balance del dataset**: los pipelines modernos de generación sintética permiten corregir etiquetas erróneas, completar valores ausentes, balancear clases minoritarias e incluso inyectar *edge cases* raros que el dataset real no cubre (muy útil para entrenar modelos robustos en fraude, diagnóstico de enfermedades raras, etc.).

- 

**Corrección activa de sesgos**: los datos reales reflejan sesgos históricos (de género, raza, geografía…) que los modelos aprenden y amplifican. Los datos sintéticos pueden diseñarse con **restricciones de equidad estadística** (*demographic parity, equalized odds*) para corregir estos sesgos desde la base.

Un ejemplo clásico: si un catálogo de contenidos tiene un 90% de autoría masculina y un 10% femenina por razones históricas, un dataset sintético puede redistribuirse al 50/50 sin romper las correlaciones útiles para el modelo.

🔄 **Cambio de referente en el mercado (marzo 2025)**

[**Gretel.ai**](http://Gretel.ai), herramienta referente en este espacio y mencionada en ediciones anteriores de este módulo, fue **adquirida por NVIDIA** en marzo de 2025 por más de 320M$. Su tecnología se ha integrado en **NVIDIA NeMo Data Designer**, parte del stack NeMo para pipelines de entrenamiento empresariales. El dominio [gretel.ai](http://gretel.ai) redirige ahora a las páginas de datos sintéticos de NVIDIA.

## **Herramientas actuales para datos sintéticos**

- 
**NVIDIA NeMo Data Designer** *(sucesor de Gretel)*: orientado a pipelines de entrenamiento a escala empresarial, integrado con el resto del stack NeMo (Guardrails, Curator, Evaluator).

- 
**MOSTLY AI** *(Viena)*: SDK open source bajo Apache 2.0 y tier gratuito (2 créditos/día). Excelente punto de partida para experimentar sin compromiso comercial y con la mejor documentación didáctica del espacio.

- 
[**Tonic.ai**](http://Tonic.ai): tres productos diferenciados — *Structural* (datos de test para bases de datos), **Textual** (PII en texto no estructurado, muy útil para pipelines RAG y fine-tuning de LLMs) y *Fabricate* (generación sintética con IA, lanzado en noviembre 2025). Integración nativa con Microsoft Fabric.

- 
**Synthetic Data Vault (SDV)**: librería Python open source (modelos GaussianCopula, CTGAN, TVAE). Opción para quien prefiere control total, coste cero y ejecución 100% on-premises.

- 
**Synthea**: estándar de facto en el sector salud para generación de pacientes sintéticos con historiales clínicos longitudinales completos.

▶[ ](https://www.youtube.com/watch?v=Tf2MDDcCq00)[**Microsoft Presidio: Privacidad y protección de datos, anonimización de PII en LLMs**](https://www.youtube.com/watch?v=9cKkSRQFcE4)

**2. AI Gateway como plano de control** *(patrón arquitectónico emergente)*

Una evolución moderna — y prácticamente obligatoria — del concepto de Privacy Vault es situar un **AI Gateway** como plano de control entre tus aplicaciones y los proveedores de LLM. En lugar de que cada microservicio hable directamente con OpenAI / Anthropic / Google, todo el tráfico pasa por un gateway que centraliza:

- 
**DLP / enmascaramiento de PII** antes de que el prompt salga de tu red

- 
**Virtual keys**: ninguna aplicación conoce la API key real del proveedor. Se emiten claves efímeras y con scope limitado.

- 
**Control de coste**, rate limiting y caching semántico (hasta 90% de reducción de latencia y coste en consultas repetidas)

- 
**Logs de auditoría** unificados por usuario, equipo y modelo (imprescindibles para cumplimiento de SOC 2, HIPAA, EU AI Act)

- 
**Guardrails** de entrada y salida contra prompt injection, jailbreaks y contenido dañino

## **Herramientas líderes (2025-2026)**

- 
**Cloudflare AI Gateway**: edge-native, integra DLP con el mismo motor de Cloudflare One, guardrails vía Llama Guard 3, caching agresivo y **facturación unificada** para OpenAI, Anthropic y Google en una sola factura. Ideal para equipos que ya usan Cloudflare.

- 
**Portkey AI Gateway**: líder para LLMOps de producción. SOC 2 Type 2, ISO 27001, GDPR, HIPAA. Enruta a 1.600+ LLMs con 
💡 **Por qué este patrón es obligatorio**: elimina el antipatrón de tener API keys del proveedor dispersas en variables de entorno de cada aplicación, crea un único punto de enforcement de políticas, y da al equipo de seguridad visibilidad de qué están haciendo los developers con los LLMs — cosa que hoy pocos CISOs tienen.

⚠ **Nota de consolidación del mercado (2025)**: dos adquisiciones relevantes que conviene conocer si sigues el espacio — **Pangea** (AI Guard, 50+ tipos de PII, *format-preserving encryption*) fue adquirida por **CrowdStrike** por ~260M$, y **Prompt Security** fue adquirida por **SentinelOne**. La tendencia clara es que los incumbentes de ciberseguridad están absorbiendo startups GenAI-native para incorporar estas capacidades a sus plataformas EDR/XDR.

## **3. Ejecutar los LLMs de manera privada en tu propia infraestructura**

Esta aproximación es cada vez más relevante en 2026 por dos motivos: (1) los LLMs open source han alcanzado e incluso superado a los modelos comerciales en muchos benchmarks (DeepSeek V3.2, Llama 4, Qwen3), y (2) el tooling de despliegue (vLLM, NIM, SGLang) ha reducido drásticamente la fricción operativa.

En 2026 tiene sentido distinguir **tres niveles** de despliegue privado según el grado de control — y coste — que necesites:

**Tier 1 — Cloud privado gestionado** *(los datos no salen de tu cuenta cloud)*

El proveedor gestiona la infraestructura pero garantiza contractualmente que tus datos no se usan para entrenamiento y no cruzan tu perímetro lógico:

- 
**Azure OpenAI Service**: mismos modelos que OpenAI con cumplimiento HIPAA/SOC2 y residencia de datos en 10+ regiones geográficas.

- 
**AWS Bedrock**: 61+ modelos (Claude, Llama, Titan, Mistral…) con VPC endpoints, IAM y Bedrock Guardrails integrados. La nueva API ApplyGuardrail funciona incluso con modelos fuera de Bedrock.

- 
**Google Vertex AI**: Gemini 2.5 Pro/Flash con fine-tuning y **zero data retention** configurable por proyecto.

- 
**Snowflake Cortex AI** *(GA noviembre 2025)*: funciones SQL (AI_COMPLETE, AI_EXTRACT, AI_TRANSLATE, AI_REDACT) con datos que nunca abandonan el perímetro de Snowflake. Tras el partnership con OpenAI de febrero 2026, soporta Claude, GPT, Llama, Mistral y DeepSeek.

Este último caso — Snowflake — es especialmente interesante porque ilustra el patrón arquitectónico general de *"el modelo va a los datos, no al revés"*. El siguiente diagrama muestra el **Snowpark Model Registry + Container Services**, la arquitectura original que en 2025 evolucionó a Cortex AI:

Arquitectura Snowpark Model Registry + Container Services: el modelo LLM (open source o propio) se registra en el Model Registry y se ejecuta en contenedores dentro de la cuenta de Snowflake, accediendo a los datos gobernados sin que éstos salgan del perímetro

Los tres elementos que conviene entender del diagrama — y que aplican a **cualquier** plataforma del Tier 1, no solo a Snowflake:

- 
**Model Registry**: el modelo LLM se cataloga, versiona y gobierna como cualquier otro artefacto ML.

- 
**Container Services**: el modelo corre en contenedores aislados, dentro del perímetro de seguridad de la plataforma (mismas VPC, mismo IAM, mismo audit log).

- 
**Acceso controlado a datos**: los datos sensibles permanecen en las tablas originales con sus políticas de row-level security; el modelo solo los ve según lo que su identidad/rol le permita.

En 2026 la evolución natural de este patrón es **Snowflake Cortex AI**, que encapsula esta misma idea pero exponiéndola como funciones SQL, eliminando la complejidad de gestionar contenedores manualmente.

**Tier 2 — Self-hosted inference** *(motores open source en tu hardware)*

Control total del modelo y del hardware, a cambio de operar tú mismo la infraestructura:

- 
**vLLM**: motor dominante (~75K ⭐ en GitHub). Su técnica **PagedAttention** elimina el 60-80% del desperdicio de memoria GPU. El reciente **Model Runner V2** añade +56% de throughput frente a versiones anteriores.

- 
**NVIDIA NIM**: contenedores Docker pre-construidos y optimizados para GPUs NVIDIA. Ofrece 1.5-3.7x mejor rendimiento que open source "crudo" en escenarios de alta concurrencia.

- 
**SGLang**: +29% de throughput frente a vLLM en ciertos benchmarks gracias a su *RadixAttention*. Menos maduro operativamente pero interesante para cargas muy exigentes.

**Tier 3 — Full on-premises** *(máximo control, máxima inversión)*

Modelos abiertos corriendo en hardware propio, sin ningún vendor externo en el camino:

- 
**Meta Llama 4** (Scout 109B o Maverick 400B MoE) — licencia comercial con restricciones de usuarios

- 
**DeepSeek-V3.2** (671B total / 37B activos, licencia MIT) — rival directo de GPT-4 en benchmarks de razonamiento

- 
**Qwen3-235B** (Apache 2.0) — fuerte en tareas multilingües, especialmente chino/español

- 
**Confidential computing**: NVIDIA H100 con TEE ya está en producción en Azure (NCCads H100 v5) con solo 4-8% de overhead. La nueva generación **B200 Blackwell** lleva este overhead prácticamente a cero y añade NVLink cifrado para multi-GPU seguro.

📊 **Regla de decisión económica**: el punto de equilibrio entre self-hosting y APIs gestionadas está alrededor de **2 millones de tokens/día** (~8.000 conversaciones diarias). Por debajo de ese volumen, los proveedores gestionados casi siempre salen más baratos una vez sumas amortización de GPU, electricidad, operaciones y el coste de tu SRE.

## **4. Revisar y configurar las políticas de retención del proveedor**

Una medida complementaria a menudo olvidada — y que no cuesta nada activar — es **revisar y configurar activamente la política de retención y uso para entrenamiento** del proveedor antes de enviarle datos.

⚠ **Cambio crítico que debes conocer (septiembre 2025)**: Anthropic revirtió su postura histórica en **Claude consumer (**[**claude.ai**](http://claude.ai)**)** — los usuarios ahora deben elegir **explícitamente** si permiten que sus datos se usen para entrenamiento, con retención de hasta **5 años** si optan por el "sí". Los clientes de **API y Enterprise siguen completamente excluidos** y bajo los términos anteriores.

Moraleja operativa: **para uso profesional, usa siempre las APIs empresariales** (a través de tu propio gateway o cliente), nunca las interfaces consumer ([claude.ai](http://claude.ai), [chatgpt.com](http://chatgpt.com), [gemini.google.com](http://gemini.google.com)) — aunque la interfaz web sea más cómoda, la política de datos es radicalmente distinta.

## **Recapitulación: las 4 capas de defensa**

Ninguna capa por sí sola es suficiente; el estándar de facto en 2026 es **defense in depth**: gateway → de-identificación → modelo (ejecutado en entorno apropiado) → políticas de retención revisadas.

Si quieres profundizar en alguna de estas prácticas, te toca a ti llegar a la información (y compartirla con tus compañer@s) en el ejercicio de este módulo **"Aprendiendo sobre privacidad con la IA"**.
