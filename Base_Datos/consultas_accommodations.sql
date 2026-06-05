-- ============================================================
--  GUÍA DE CONSULTAS SQL – accommodations_tourism
--  Motor    : PostgreSQL 14+
--  Proyecto : Sistema de gestión de alojamientos turísticos
--  Programa : Curso Transformación Digital para la Docencia Técnica 2
--  Año      : 2026
-- ============================================================

-- ============================================================
-- INSERT (Consultas 01 – 04)
-- ============================================================

-- ------------------------------------------------------------
-- 01. INSERT – Insertar propietario
--     Agrega un nuevo propietario a la tabla owners.
--     La PK owner_id se genera automáticamente con la secuencia.
-- ------------------------------------------------------------

INSERT INTO owners (
    first_name,
    last_name,
    company_name,
    email,
    phone,
    city,
    state,
    country
)
VALUES (
    'Carlos',
    'Ramírez',
    NULL,
    'carlos.ramirez.insal@correo.com',
    '+503-7890-1234',
    'San Salvador',
    'San Salvador',
    'El Salvador'
);


-- ------------------------------------------------------------
-- 02. INSERT – Insertar alojamiento vinculado al propietario
--     Crea un alojamiento asociado a un propietario existente
--     (owner_id = 1), tipo Hotel (accommodation_type_id = 1)
--     y ubicación existente (location_id = 19, El Salvador).
-- ------------------------------------------------------------

INSERT INTO accommodations (
    owner_id,
    accommodation_type_id,
    location_id,
    name,
    description,
    max_guests,
    bedroom_count,
    bathroom_count,
    base_price_per_night,
    currency_code,
    check_in_time,
    check_out_time,
    is_active
)
VALUES (
    1,
    1,
    19,
    'Casa Vista al Volcán',
    'Propiedad rodeada de naturaleza con vista al volcán de Santa Ana.',
    6,
    3,
    2,
    180.00,
    'USD',
    '14:00:00',
    '11:00:00',
    TRUE
);


-- ------------------------------------------------------------
-- 03. INSERT – Registrar huésped y reserva en un solo bloque
--     Se usa una CTE con RETURNING para capturar el guest_id
--     generado y usarlo directamente en el INSERT de bookings.
-- ------------------------------------------------------------

WITH nuevo_huesped AS (
    INSERT INTO guests (
        first_name,
        last_name,
        email,
        phone,
        nationality
    )
    VALUES (
        'Ana',
        'López',
        'ana.lopez.insal2026@correo.com',
        '+503-6543-2100',
        'El Salvador'
    )
    RETURNING guest_id
)
INSERT INTO bookings (
    guest_id,
    accommodation_id,
    booking_status_id,
    check_in_date,
    check_out_date,
    adult_count,
    child_count,
    subtotal_amount,
    tax_amount,
    discount_amount,
    total_amount,
    booking_reference
)
SELECT
    guest_id,      -- tomado del RETURNING de la CTE
    1,             -- accommodation_id existente
    1,             -- booking_status_id = 1 (Pending)
    '2026-08-01',
    '2026-08-05',
    2,
    0,
    720.00,
    108.00,
    0.00,
    828.00,
    'BK-INSAL-001'
FROM nuevo_huesped;


-- ------------------------------------------------------------
-- 04. INSERT – Registrar pago de una reserva
--     Se registra el pago de la reserva booking_id = 1,
--     que tiene total_amount = 266.00 (dato original).
-- ------------------------------------------------------------

INSERT INTO payments (
    booking_id,
    amount,
    payment_method,
    payment_status,
    transaction_reference
)
VALUES (
    1,
    266.00,
    'credit_card',
    'completed',
    'TXN-INSAL-20260529'
);


-- ============================================================
-- SELECT (Consultas 05 – 07)
-- ============================================================

-- ------------------------------------------------------------
-- 05. SELECT – Listar alojamientos activos
--     Filtra por is_active = TRUE e incluye el nombre del tipo
--     mediante INNER JOIN con accommodation_types.
--     Ordenado de mayor a menor precio por noche.
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name                  AS alojamiento,
    at2.type_name           AS tipo,
    a.base_price_per_night  AS precio_noche,
    a.currency_code,
    a.max_guests            AS capacidad
FROM accommodations a
INNER JOIN accommodation_types at2
        ON a.accommodation_type_id = at2.accommodation_type_id
WHERE a.is_active = TRUE
ORDER BY a.base_price_per_night DESC;


-- ------------------------------------------------------------
-- 06. SELECT – Huéspedes filtrados por nacionalidad
--     Recupera todos los huéspedes cuya nationality = 'México'.
--     Cambiar el valor para consultar otras nacionalidades
--     presentes en el conjunto de datos.
-- ------------------------------------------------------------

SELECT
    guest_id,
    first_name,
    last_name,
    email,
    nationality
FROM guests
WHERE nationality = 'México'
ORDER BY last_name, first_name;


-- ------------------------------------------------------------
-- 07. SELECT – Reservas dentro de un rango de fechas (BETWEEN)
--     BETWEEN es inclusivo en ambos extremos.
--     Equivale a: check_in_date >= '2026-01-01'
--             AND check_in_date <= '2026-12-31'
-- ------------------------------------------------------------

SELECT
    b.booking_id,
    b.booking_reference,
    b.check_in_date,
    b.check_out_date,
    b.total_nights,
    b.total_amount
FROM bookings b
WHERE b.check_in_date BETWEEN '2026-01-01' AND '2026-12-31'
ORDER BY b.check_in_date;


-- ============================================================
-- UPDATE (Consultas 08 – 09)
-- ============================================================

-- ------------------------------------------------------------
-- 08. UPDATE – Actualizar precio de un alojamiento
--     Modifica el base_price_per_night del alojamiento 8
--     (Cozy Lodge Ville). El trigger trg_accommodations_updated_at
--     actualiza el campo updated_at automáticamente.
-- ------------------------------------------------------------

UPDATE accommodations
SET
    base_price_per_night = 55.00
WHERE accommodation_id = 8;


-- ------------------------------------------------------------
-- 09. UPDATE – Cambiar el estado de una reserva
--     Confirma la reserva 1 (Pending → Confirmed).
--     La condición doble evita actualizar reservas que ya
--     cambiaron de estado (patrón de transición segura).
-- ------------------------------------------------------------

UPDATE bookings
SET
    booking_status_id = 2        -- 2 = Confirmed
WHERE booking_id      = 1
  AND booking_status_id = 1;    -- solo si aún está en Pending


-- ============================================================
-- DELETE (Consulta 10)
-- ============================================================

-- ------------------------------------------------------------
-- 10. DELETE – Eliminar una reseña específica
--     Elimina la reseña con review_id = 60 mediante DELETE
--     con cláusula WHERE. Sin WHERE se borrarían todas las filas.
-- ------------------------------------------------------------

DELETE FROM reviews
WHERE review_id = 60;


-- ============================================================
-- JOIN (Consultas 11 – 13)
-- ============================================================

-- ------------------------------------------------------------
-- 11. JOIN – Reservas con datos del huésped (INNER JOIN)
--     Combina bookings y guests para mostrar en una sola fila
--     los datos del huésped y los detalles de su reserva.
-- ------------------------------------------------------------

SELECT
    b.booking_id,
    b.booking_reference,
    g.first_name || ' ' || g.last_name  AS huesped,
    g.nationality,
    b.check_in_date,
    b.check_out_date,
    b.total_nights,
    b.total_amount
FROM bookings b
INNER JOIN guests g ON b.guest_id = g.guest_id
ORDER BY b.check_in_date DESC;


-- ------------------------------------------------------------
-- 12. JOIN – Vista completa del alojamiento (INNER JOIN múltiple)
--     Encadena cuatro tablas (accommodations, accommodation_types,
--     locations, owners) para obtener el perfil completo
--     de cada propiedad en una sola consulta.
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name                              AS alojamiento,
    at2.type_name                       AS tipo,
    l.city                              AS ciudad,
    l.country                           AS pais,
    o.first_name || ' ' || o.last_name  AS propietario,
    a.base_price_per_night              AS precio_noche,
    a.currency_code,
    a.max_guests                        AS capacidad,
    a.is_active                         AS activo
FROM accommodations a
INNER JOIN accommodation_types at2 ON a.accommodation_type_id = at2.accommodation_type_id
INNER JOIN locations           l   ON a.location_id           = l.location_id
INNER JOIN owners              o   ON a.owner_id              = o.owner_id
ORDER BY a.name;


-- ------------------------------------------------------------
-- 13. JOIN – Pagos con reservas y huésped (JOIN combinado)
--     Recorre tres tablas: payments → bookings → guests.
--     Permite ver el nombre del huésped, la referencia de
--     reserva y el detalle del pago en una sola fila.
-- ------------------------------------------------------------

SELECT
    p.payment_id,
    b.booking_reference,
    g.first_name || ' ' || g.last_name  AS huesped,
    p.amount,
    p.payment_method,
    p.payment_status,
    p.payment_date
FROM payments p
INNER JOIN bookings b ON p.booking_id = b.booking_id
INNER JOIN guests   g ON b.guest_id   = g.guest_id
ORDER BY p.payment_date DESC;


-- ============================================================
-- LEFT JOIN (Consultas 14 – 15)
-- ============================================================

-- ------------------------------------------------------------
-- 14. LEFT JOIN – Reservas que no tienen reseña
--     LEFT JOIN devuelve TODAS las reservas; donde no hay
--     reseña asociada, las columnas de reviews llegan como NULL.
--     El filtro WHERE r.review_id IS NULL aísla esas reservas.
-- ------------------------------------------------------------

SELECT
    b.booking_id,
    b.booking_reference,
    g.first_name || ' ' || g.last_name  AS huesped,
    b.check_out_date,
    r.review_id                          AS review_existente
FROM bookings b
INNER JOIN guests  g ON b.guest_id   = g.guest_id
LEFT  JOIN reviews r ON b.booking_id = r.booking_id
WHERE r.review_id IS NULL
ORDER BY b.check_out_date DESC;


-- ------------------------------------------------------------
-- 15. LEFT JOIN – Alojamientos que nunca han tenido reserva
--     Patrón clásico: LEFT JOIN + WHERE columna_derecha IS NULL
--     para identificar registros sin relación en la tabla derecha.
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name                  AS alojamiento,
    a.base_price_per_night  AS precio_noche,
    a.is_active             AS activo,
    b.booking_id            AS reserva_existente
FROM accommodations a
LEFT JOIN bookings b ON a.accommodation_id = b.accommodation_id
WHERE b.booking_id IS NULL
ORDER BY a.accommodation_id;


-- ============================================================
-- FUNCIONES DE AGREGACIÓN (Consultas 16 – 18)
-- ============================================================

-- ------------------------------------------------------------
-- 16. AGG – Total de ingresos por alojamiento (SUM)
--     Suma los montos de todas las reservas de cada propiedad.
--     GROUP BY es obligatorio al mezclar columnas normales con
--     funciones de agregación.
--     Nota: las monedas son mixtas (USD, BRL, EUR, MXN).
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name               AS alojamiento,
    a.currency_code,
    COUNT(b.booking_id)  AS total_reservas,
    SUM(b.total_amount)  AS ingresos_totales
FROM accommodations a
INNER JOIN bookings b ON a.accommodation_id = b.accommodation_id
GROUP BY a.accommodation_id, a.name, a.currency_code
ORDER BY ingresos_totales DESC;


-- ------------------------------------------------------------
-- 17. AGG – Promedio de rating por alojamiento (AVG)
--     Combina AVG, MIN y MAX para obtener estadísticas completas
--     de valoración. ROUND(..., 2) limita a dos decimales.
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name                   AS alojamiento,
    COUNT(r.review_id)       AS total_resenas,
    ROUND(AVG(r.rating), 2)  AS rating_promedio,
    MIN(r.rating)            AS rating_minimo,
    MAX(r.rating)            AS rating_maximo
FROM accommodations a
INNER JOIN reviews r ON a.accommodation_id = r.accommodation_id
GROUP BY a.accommodation_id, a.name
ORDER BY rating_promedio DESC;


-- ------------------------------------------------------------
-- 18. AGG – Top 5 alojamientos más reservados (COUNT + LIMIT)
--     COUNT agrupa las reservas por propiedad. ORDER BY DESC
--     + LIMIT 5 devuelve únicamente el top-5.
-- ------------------------------------------------------------

SELECT
    a.accommodation_id,
    a.name               AS alojamiento,
    COUNT(b.booking_id)  AS total_reservas
FROM accommodations a
INNER JOIN bookings b ON a.accommodation_id = b.accommodation_id
GROUP BY a.accommodation_id, a.name
ORDER BY total_reservas DESC
LIMIT 5;


-- ============================================================
-- GROUP BY + HAVING (Consulta 19)
-- ============================================================

-- ------------------------------------------------------------
-- 19. HAVING – Huéspedes con más de 3 reservas
--     HAVING filtra DESPUÉS de la agrupación (GROUP BY),
--     mientras que WHERE filtra antes de agrupar.
--     Solo se pueden usar funciones de agregación en HAVING.
-- ------------------------------------------------------------

SELECT
    g.guest_id,
    g.first_name || ' ' || g.last_name  AS huesped,
    g.email,
    COUNT(b.booking_id)                  AS total_reservas,
    SUM(b.total_amount)                  AS gasto_total
FROM guests g
INNER JOIN bookings b ON g.guest_id = b.guest_id
GROUP BY g.guest_id, g.first_name, g.last_name, g.email
HAVING COUNT(b.booking_id) > 3
ORDER BY total_reservas DESC;


-- ============================================================
-- SUBCONSULTAS (Consulta 20)
-- ============================================================

-- ------------------------------------------------------------
-- 20. Subconsulta – Alojamiento(s) con el precio más alto
--     La subconsulta interna calcula el precio máximo entre los
--     alojamientos activos. La consulta externa localiza todos
--     los registros que igualan ese precio (maneja empates).
-- ------------------------------------------------------------

SELECT
    accommodation_id,
    name,
    base_price_per_night,
    currency_code
FROM accommodations
WHERE base_price_per_night = (
    SELECT MAX(base_price_per_night)
    FROM   accommodations
    WHERE  is_active = TRUE
)
  AND is_active = TRUE;
