# 📄 Buenas prácticas en bases de datos 🔴 — 21 min

> Modulo 8: Bases de datos
> Curso: AI4Devs 2026/04
> Fuente: training.lidr.co

⏳ Tiempo estimado: 21 min

En todo sistema que construimos necesitamos guardar los datos que hemos recibido y/o generado. Un sistema que no puede recordar la información que le hemos provisto no es un sistema que sirva de mucho. En este módulo vamos a explorar un poco de teoría sobre bases de datos, sin entrar en grandes detalles.

Existen dos familias principales: bases de datos **relacionales (SQL)** y **no relacionales (NoSQL)**, con una tercera categoría emergente que mezcla ambas filosofías: **NewSQL / serverless** (Neon, Supabase, PlanetScale, CockroachDB, Turso).

## Bases de Datos Relacionales (SQL)

Las bases de datos relacionales almacenan datos en tablas con filas y columnas, y utilizan el lenguaje SQL para realizar operaciones. Los datos se organizan en tablas relacionadas entre sí mediante claves *primary* y *foreign*.

**Pros** *(vigentes en 2026)*:

- 
Integridad de datos garantizada por restricciones (FK, CHECK, UNIQUE) y transacciones.

- 
Cumplen con las características **ACID** (Atomicidad, Consistencia, Aislamiento, Durabilidad) para transacciones confiables y seguras.

- 
Lenguaje SQL estandarizado para consultas complejas.

- 
Soportan procedimientos almacenados y triggers.

- 
**Ecosistema maduro de herramientas**: EXPLAIN ANALYZE, pg_stat_statements, pganalyze, Datadog Database Monitoring.

- 
**PostgreSQL 18 (sept 2025)** añade I/O asíncrono, UUID v7 nativo, columnas generadas virtuales, *skip scan* en B-tree multicolumna y autenticación OAuth 2.0. Con extensiones (pgvector, PostGIS, pg_trgm, pg_duckdb) se convierte en la base de datos casi universal.

**Contras** *(matizados en 2026)*:

- 
**Escalado horizontal tradicionalmente más costoso operativamente que NoSQL**, aunque Postgres 18 + *read replicas*, particionado nativo, y opciones serverless (Neon, Aurora, CockroachDB) cierran rápidamente la brecha.

- 
**Esquema tipado** — históricamente visto como rigidez, hoy considerado una ventaja. JSONB + índices GIN permiten flexibilidad NoSQL dentro de SQL cuando se necesita.

- 
Rendimiento inferior para ciertos casos de uso (*key-value* puro, *write-heavy* extremo).

- 
Complejidad en el diseño y mantenimiento.

- 
Sobrecarga por mantener integridad referencial (real, pero proporcional al beneficio).

**Algunas bases de datos SQL son:**

- 
**PostgreSQL** 18 (referencia open-source, con ecosistema de extensiones dominante)

- 
**MySQL / MariaDB**

- 
**Microsoft SQL Server**

- 
**Oracle**

- 
**SQLite** — con renacimiento fuerte vía Turso/libSQL y Cloudflare D1 (GA desde abril 2024)

## Bases de Datos No Relacionales (NoSQL)

Las bases de datos NoSQL no utilizan tablas relacionales, sino que almacenan datos en documentos, pares clave-valor, grafos u otros formatos. Son *esquema-libre* y escalables horizontalmente.

**Pros:**

- 
Escalabilidad horizontal para manejar grandes volúmenes de datos.

- 
Esquema flexible, fácil de cambiar.

- 
Alto rendimiento para ciertos casos de uso (clave-valor, *write-heavy*).

- 
Buena opción para datos no estructurados o semi-estructurados.

- 
Escalamiento más sencillo que en bases de datos relacionales tradicionales.

**Contras:**

- 
Falta de estandarización y lenguaje de consulta unificado.

- 
Integridad de datos no garantizada por defecto (consistencia eventual).

- 
Consultas y joins complejos son difíciles de implementar.

- 
Riesgo de inconsistencia de datos al escalar.

- 
Curva de aprendizaje más pronunciada por motor.

**Algunas bases de datos NoSQL son:**

- 
**MongoDB** 8.2 (2025) — documentos BSON, Atlas Vector Search GA para RAG, *MCP server* oficial GA sep-2025

- 
**Redis** — clave-valor, caché, colas, pub/sub

- 
**Cassandra** — familia de columnas, *write-heavy*, escalado lineal

- 
**Amazon DynamoDB** — clave-valor / documento, serverless AWS

- 
**Apache HBase** — familia de columnas, ecosistema Hadoop

## Bases de Datos NewSQL, Serverless y Edge

Categoría emergente (consolidada en 2024–2026) que combina ACID + SQL con escalado nativo cloud y flujos de trabajo tipo *branching* Git:

- 
**Neon** — PostgreSQL serverless con *branching* Git-like y *scale-to-zero*. Adquirida por Databricks en mayo 2025 (~$1B). Señal del mercado: ~80% de las DBs creadas en Neon las crean agentes de IA, no humanos.

- 
**Supabase** — Postgres gestionado + Auth + Storage + Realtime. **MCP server oficial en **mcp.supabase.com/mcp.

- 
**PlanetScale** — MySQL + Vitess con *DB-as-code*. ⚠ Eliminó el free tier "Hobby" en abril 2024; plan mínimo ~$39/mes.

- 
**Turso / libSQL** — SQLite distribuido, ideal para *DB-por-tenant*.

- 
**Cloudflare D1** — SQLite global integrado en Workers, GA desde abril 2024.

- 
**CockroachDB / TiDB** — SQL distribuido compatible con Postgres/MySQL.

## Bases Vectoriales y pgvector

Para casos de uso RAG, *semantic search* y embeddings, en 2026 hay dos caminos principales:

- 
pgvector** (extensión de PostgreSQL)** — opción por defecto si ya usas Postgres y tienes menos de ~50M vectores. Soporta índices **HNSW** con *recall* equivalente a bases dedicadas. Beneficio clave: transacciones ACID entre tus datos relacionales y los embeddings. Integrado nativamente en Drizzle (tipo vector).

- 

**Base vectorial dedicada** — cuando el volumen o la latencia lo exija:

**Qdrant** (OSS, Rust) — líder en *performance* con filtros, latencia p50 ~4 ms

- 
**Pinecone** — *fully-managed*, *zero-ops*

- 
**Weaviate** — híbrido vector + BM25

[!important]

**Consenso 2026:** empieza con pgvector (una dependencia menos, transacciones cruzadas con tus datos relacionales). Migra a Qdrant o Pinecone solo cuando un *benchmark* real lo justifique.

En resumen, las bases de datos relacionales son ideales para datos estructurados con relaciones complejas; las NoSQL son mejores para grandes volúmenes de datos no estructurados y escalabilidad horizontal; las NewSQL buscan el punto medio, y pgvector hace de puente con el mundo de la IA.

La elección depende de los requisitos específicos del proyecto. Como veremos, la IA puede ayudarnos a analizar los requerimientos del proyecto y recomendar el tipo adecuado.

## Conceptos de base de datos SQL que ayudan a mejorar los resultados

Vamos a ver 2 conceptos clave del buen diseño de bases de datos relacionales: la **normalización de estructuras** y la **creación de índices**.

## 1. Normalización de Estructuras

La normalización en bases de datos relacionales es un proceso sistemático para organizar los datos en tablas de forma eficiente y evitar redundancias e inconsistencias. **Estos principios no cambian** — son los mismos que Codd definió en los 70 y siguen siendo currículum estándar en 2026.

Los niveles más conocidos son:

## Primera Forma Normal (1FN)

- 
Elimina los valores múltiples de una celda (valores atómicos).

- 
Cada registro tiene una clave principal única.

- 
Facilita la integridad de los datos al evitar grupos repetidos.

## Segunda Forma Normal (2FN)

- 
Cumple la 1FN.

- 
Todos los atributos que no son clave dependen completamente de la clave principal.

- 
Elimina la redundancia parcial de datos.

## Tercera Forma Normal (3FN)

- 
Cumple la 1FN y 2FN.

- 
Todos los atributos que no son clave dependen únicamente de la clave principal, no de otros atributos no clave.

- 
Elimina dependencias transitivas.

## Forma Normal de Boyce-Codd (FNBC)

- 
Cumple la 3FN.

- 
Todas las claves candidatas son únicas e identifican de forma única cada registro.

- 
Evita ciertas anomalías de actualización.

**Razones para normalizar:**

- 
Reducen la redundancia de datos y el espacio de almacenamiento requerido.

- 
Aumentan la integridad de los datos al minimizar inconsistencias.

- 
Facilitan las operaciones de actualización, inserción y eliminación de datos.

- 
Mejoran el rendimiento de las consultas.

- 
Simplifican el diseño de la base de datos y su mantenimiento a largo plazo.

**Compensación moderna:** cuando un patrón de lectura castiga la normalización, **desnormaliza de forma controlada** mediante JSONB, columnas calculadas (GENERATED ALWAYS AS) o vistas materializadas. No rompas las formas normales "a mano" por rendimiento — usa estas herramientas del motor.

El proceso de normalización puede llegar a ser complejo, sobre todo cuando estamos añadiendo nuevas tablas a una estructura existente. Gracias a la IA, que tiene conocimiento de buenas prácticas, puede ayudarnos a diseñar una estructura que siga estas normas.

## Ejemplo de normalización

Vamos a utilizar para este ejemplo sencillo una de las referencias anteriores: el sistema de reservas de bicicletas.

Supongamos que tenemos una tabla Rental no normalizada con la siguiente estructura:

Para normalizar esta tabla, podemos dividirla en tres tablas siguiendo las formas normales:

[!tip]

**Prueba esto ahora — normalización asistida con Claude Code: **

`bash

## Con el MCP server de Postgres/Supabase configurado:

claude "Analiza el schema actual y dime qué tablas violan la 3FN.

Para cada violación propón el split, genera la migración Prisma y calcula el coste de backfill para 10M filas."

## 2. Índices

Los índices son estructuras de datos auxiliares en las bases de datos que mejoran el rendimiento de las consultas a cambio de coste en escritura y espacio.

**Tipos de índices en PostgreSQL 18** *(saber cuándo usar cada uno es señal de seniority):*

**Beneficios de los índices:**

- 
**Búsquedas más rápidas**: localizan datos de forma mucho más eficiente que búsquedas secuenciales, especialmente en tablas grandes.

- 
**Mejoran los joins**: los índices en columnas de unión aceleran enormemente las operaciones de join.

- 
**Aplican filtros eficientemente** en las consultas.

- 
**Mantienen datos ordenados**: los índices agrupados mantienen los datos físicamente ordenados según la clave del índice.

- 
**Evitan operaciones costosas**: como ordenamientos y agregaciones temporales.

**Reglas prácticas:**

- 
Indexa las columnas de WHERE, JOIN, ORDER BY y GROUP BY más frecuentes.

- 
Cada índice cuesta escrituras; mide con pg_stat_user_indexes qué índices no se usan.

- 
Usa HypoPG para probar índices hipotéticos sin crearlos (soportado en Supabase y en la mayoría de distribuciones gestionadas).

## Cómo la IA puede ayudar a decidir qué índices crear

Las herramientas de IA pueden analizar los patrones de consultas y cargas de trabajo de una base de datos para recomendar índices óptimos:

- 
**Analizando consultas frecuentes**: la IA identifica las consultas más comunes y sugiere índices que las acelerarían.

- 
**Detectando cuellos de botella**: mediante monitoreo de rendimiento, detecta consultas lentas y propone índices para optimizarlas.

- 
**Simulando escenarios**: la IA puede simular diferentes configuraciones de índices y cargas de trabajo para evaluar beneficios potenciales.

- 
**Considerando estadísticas**: utilizando estadísticas de tablas y consultas, determina qué índices serían más efectivos.

- 
**Aprendiendo patrones**: con técnicas de aprendizaje automático, puede reconocer patrones complejos y recomendar índices en consecuencia.

**Herramientas en 2026:** Claude Code conectado a un **MCP server de Postgres o Supabase** puede leer pg_stat_statements y tu schema real, detectar queries costosas, proponer índices y ejecutar EXPLAIN ANALYZE iterativo. Herramientas como **pganalyze** y **Datadog Database Monitoring** complementan con monitoring continuo e *index advisor* con señales de ML.

## Ejemplos de creación de índice

**SQL plano:**

CREATE INDEX idx_user_email ON "User" (email);

**El mismo índice en Prisma (stack AI4Devs):**

model User {
  id    Int    @id @default(autoincrement())
  email String @unique   // genera B-tree único automáticamente
  @@index([createdAt(sort: Desc)])
}

**Con Drizzle + pgvector (puente hacia el Lab 1 de RAG):**

import { pgTable, serial, text, vector, index } from 'drizzle-orm/pg-core';

export const docs = pgTable('docs', {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  embedding: vector('embedding', { dimensions: 1536 }),
}, (t) => [
  index('docs_emb_hnsw').using('hnsw', t.embedding.op('vector_cosine_ops')),
]);

[!tip]

**Prueba esto ahora — optimización con Claude Code + MCP:**

`bash claude "Analiza el schema via MCP, identifica las 3 queries más lentas de pg_stat_statements y propón los índices faltantes.

Genera las migraciones con drizzle-kit y mide con EXPLAIN ANALYZE antes y después."

`

## Queries y Joins complejos asistidos con IA

La normalización de bases de datos, si bien es una práctica recomendada para mantener la integridad y evitar redundancias, puede llevar a un aumento en la complejidad de las consultas, especialmente aquellas que involucran *joins* entre múltiples tablas. Algunas razones por las que la normalización puede hacer las consultas con *joins* más complejas:

- 
**Fragmentación de datos**: al normalizar, los datos se dividen en múltiples tablas relacionadas, lo que requiere realizar *joins* para recuperar datos completos.

- 
**Relaciones complejas**: a medida que se alcanzan niveles más altos de normalización (3FN, BCNF), se crean más tablas y relaciones.

- 
**Rendimiento vs. normalización**: a veces, para mejorar el rendimiento, se desnormalizan datos, combinando información relacionada en una sola tabla y evitando *joins* costosos.

- 
**Optimización de consultas**: las consultas complejas con múltiples *joins* pueden requerir técnicas de optimización como la creación de índices adecuados, vistas materializadas, particionamiento, etc.

**Estrategias para mitigar la complejidad:**

- 
**Diseño adecuado de índices** en columnas de *join* y filtro.

- 
**Desnormalización controlada** (JSONB, vistas materializadas, columnas generadas).

- 
**Query planning asistido**: EXPLAIN (ANALYZE, BUFFERS, VERBOSE) + explain.depesz.com o pgMustard.

- 
**Text-to-SQL con LLM**: en 2026 los modelos *reasoning* (Claude Sonnet 4.5, GPT-5, Gemini 2.5 Pro) dominan los benchmarks BIRD y Spider. Herramientas como [**Vanna.ai**](http://Vanna.ai)** 2.0** generan SQL en producción.

## Ejemplo de JOIN

**SQL plano:**

SELECT "User".name, "Bicycle".model, "Rental".start_time, "Rental".end_time
FROM "Rental"
INNER JOIN "User"    ON "Rental".user_id    = "User".user_id
INNER JOIN "Bicycle" ON "Rental".bicycle_id = "Bicycle".bicycle_id;

**El mismo JOIN en Prisma:**

await prisma.rental.findMany({
  select: {
    startTime: true,
    endTime: true,
    user:    { select: { name: true } },
    bicycle: { select: { model: true } },
  },
});

[!warning]

## N+1: el bug de rendimiento #1 en apps Node.js + ORM

Patrón anti-performance: cargas N entidades y, por cada una, haces otra query para sus relaciones → **N+1 queries en vez de 1 o 2**.

**Detección en tests (Vitest):**

`ts

let n = 0;

prisma.$on('query', () => n++);

// ...ejecuta el endpoint...

expect(n).toBeLessThan(5); // falla si hubo N+1

`

**Solución:** include / select en Prisma, with en Drizzle, DataLoader por request en GraphQL.

## Apuntes rápidos de producción

Tres cosas que diferencian código "que compila" de código "listo para producción":

## Seguridad esencial

- 
**SQL injection**: Prisma y Drizzle parametrizan por defecto. Evita prisma.$queryRawUnsafe y sql.raw.

- 

**Row Level Security (RLS) en Postgres/Supabase**: activa RLS en tablas públicas. Usa el patrón (select auth.uid()) en las *policies* — sin el *wrap* degrada el rendimiento ~10×.

CREATE POLICY own_rows ON todos FOR SELECT TO authenticated
USING ((select auth.uid()) = user_id);
CREATE INDEX ON todos (user_id);

- 
**Secrets management**: Doppler, Infisical o HashiCorp Vault. Nunca .env en producción.

- 
**Cifrado**: sslmode=verify-full en conexiones; TDE gestionado por el proveedor; pgcrypto para cifrado a nivel columna.

- 
**Audit logging**: extensión pgaudit para cumplimiento GDPR.

## Testing de bases de datos con Vitest

**Testcontainers es el estándar de facto en 2026** para tests de integración con DB real:

// vitest.globalSetup.ts
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function setup() {
  const c = await new PostgreSqlContainer('postgres:18-alpine').start();
  process.env.DATABASE_URL = c.getConnectionUri();
  // ejecuta migraciones y seed aquí
}

**Cuándo usar qué:**

- 
**Mocks** → lógica pura sin DB.

- 
pg-mem** / **mongodb-memory-server → feedback ultra-rápido en TDD.

- 
**Testcontainers** → integración con paridad total a producción (recomendado para CI).

- 
**Reset entre tests**: transacción + ROLLBACK es ~10× más rápido que TRUNCATE.

## Migraciones zero-downtime

Patrón **Expand-Contract** (obligatorio en producción):

- 
**Expand** — añade columna nueva (nullable) y escribe en ambas.

- 
**Backfill** — job por lotes con statement_timeout corto.

- 
**Migrate reads** — cambia lecturas a la nueva columna.

- 
**Contract** — DROP columna antigua en migración separada.

Herramientas: **Prisma Migrate**, **Drizzle Kit**, **Atlas (**[**ariga.io**](http://ariga.io)**)** — esta última detecta operaciones bloqueantes en CI y las rechaza antes del deploy.

**Conexión con otros módulos del máster:**

- 
pgvector enlaza directamente con el **Lab 1 de RAG y Chatbots**.

- 
Testcontainers anticipa la **Sesión 7 de Testing** (Vitest + IA para generar tests).

- 
El bloque Claude Code + MCP refuerza el mensaje transversal: la IA no solo genera código, **también opera infraestructura** vía protocolos estándar.
