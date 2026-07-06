--
-- PostgreSQL database dump
--


-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 17.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: mesas; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mesas (
    id integer NOT NULL,
    numero integer NOT NULL,
    capacidad integer NOT NULL,
    disponible boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: mesas_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mesas_id_seq OWNED BY public.mesas.id;


--
-- Name: reservaciones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reservaciones (
    id integer NOT NULL,
    fecha date NOT NULL,
    hora time without time zone NOT NULL,
    personas integer NOT NULL,
    estado character varying(20) DEFAULT 'pendiente'::character varying NOT NULL,
    usuario_id integer NOT NULL,
    mesa_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT reservaciones_estado_check CHECK (((estado)::text = ANY ((ARRAY['pendiente'::character varying, 'confirmada'::character varying, 'cancelada'::character varying])::text[])))
);


--
-- Name: reservaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reservaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reservaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reservaciones_id_seq OWNED BY public.reservaciones.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    correo character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'cliente'::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['cliente'::character varying, 'admin'::character varying])::text[])))
);


--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: mesas id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesas ALTER COLUMN id SET DEFAULT nextval('public.mesas_id_seq'::regclass);


--
-- Name: reservaciones id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservaciones ALTER COLUMN id SET DEFAULT nextval('public.reservaciones_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: mesas; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.mesas VALUES (1, 1, 2, true, '2026-06-25 00:43:46.124176');
INSERT INTO public.mesas VALUES (2, 2, 4, true, '2026-06-25 00:43:46.124176');
INSERT INTO public.mesas VALUES (3, 3, 6, false, '2026-06-25 00:43:46.124176');


--
-- Data for Name: reservaciones; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.reservaciones VALUES (1, '2026-06-25', '12:00:00', 2, 'confirmada', 2, 1, '2026-06-25 00:43:46.124176');
INSERT INTO public.reservaciones VALUES (2, '2026-06-25', '14:00:00', 4, 'pendiente', 3, 2, '2026-06-25 00:43:46.124176');
INSERT INTO public.reservaciones VALUES (3, '2026-06-26', '19:00:00', 5, 'pendiente', 2, 3, '2026-06-25 00:43:46.124176');


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.usuarios VALUES (1, 'Carlos Mendoza', 'carlos@email.com', '123456', 'admin', '2026-06-25 00:43:46.124176');
INSERT INTO public.usuarios VALUES (2, 'Ana García', 'ana@email.com', '123456', 'cliente', '2026-06-25 00:43:46.124176');
INSERT INTO public.usuarios VALUES (3, 'Luis Pérez', 'luis@email.com', '123456', 'cliente', '2026-06-25 00:43:46.124176');


--
-- Name: mesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.mesas_id_seq', 3, true);


--
-- Name: reservaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reservaciones_id_seq', 3, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- Name: mesas mesas_numero_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_numero_key UNIQUE (numero);


--
-- Name: mesas mesas_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mesas
    ADD CONSTRAINT mesas_pkey PRIMARY KEY (id);


--
-- Name: reservaciones reservaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_correo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_correo_key UNIQUE (correo);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: reservaciones reservaciones_mesa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_mesa_id_fkey FOREIGN KEY (mesa_id) REFERENCES public.mesas(id);


--
-- Name: reservaciones reservaciones_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reservaciones
    ADD CONSTRAINT reservaciones_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- PostgreSQL database dump complete
--


