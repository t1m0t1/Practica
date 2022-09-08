-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-09-2022 a las 16:10:36
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_p`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre` char(50) DEFAULT NULL,
  `fecha_modificacion` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre`, `fecha_modificacion`) VALUES
(1, 'sistemas', '2022-07-08'),
(2, 'contable', '2022-08-11'),
(3, 'legales', '2022-08-11'),
(4, 'tramites', '2022-08-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulo`
--

CREATE TABLE `articulo` (
  `id_articulo` int(11) NOT NULL,
  `nombre_articulo` varchar(50) NOT NULL,
  `categoria_articulo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `punto_reposicion` int(11) NOT NULL,
  `sector` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `articulo`
--

INSERT INTO `articulo` (`id_articulo`, `nombre_articulo`, `categoria_articulo`, `cantidad`, `punto_reposicion`, `sector`) VALUES
(18, 'teclado genius', 1, 15, 5, 2),
(19, 'teclado genius', 1, 15, 5, 2),
(20, 'mouse mickey', 1, 13, 6, 2),
(21, 'toner hp', 1, 16, 6, 2),
(22, 'toner samsung', 1, 166, 25, 2),
(23, 'toner samsung', 1, 166, 25, 2),
(24, 'toner samsung', 1, 166, 25, 2),
(25, 'banana', 2, 50, 10, 1),
(26, 'yerba', 2, 50, 2, 1),
(27, 'peluches', 5, 1000, 999, 1),
(28, 'llaveros', 5, 10, 1, 1),
(29, 'terciopelo', 3, 45, 5, 3),
(30, 'asfdasfasdf', 3, 123, 23, 3),
(31, 'qweqwrqwe', 3, 12312, 213, 3),
(32, 'qweqwrqwe', 3, 12312, 213, 3),
(33, 'qweqwrqwe', 3, 12312, 213, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`) VALUES
(1, 'informatica'),
(2, 'comestible'),
(3, 'limpieza'),
(4, 'limpieza lts'),
(5, 'papeleria'),
(6, 'libreria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int(11) NOT NULL,
  `id_articulo` int(11) NOT NULL,
  `stock_inicial` int(4) NOT NULL DEFAULT 0,
  `modificacion` int(4) NOT NULL,
  `stock_final` int(4) DEFAULT 0,
  `username` int(11) NOT NULL,
  `fecha` date NOT NULL DEFAULT current_timestamp(),
  `tipo` int(11) NOT NULL,
  `peticion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticion`
--

CREATE TABLE `peticion` (
  `id_peticion` int(11) NOT NULL,
  `fecha_peticion` date DEFAULT current_timestamp(),
  `estado` int(11) NOT NULL DEFAULT 0,
  `username` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticion_articulo`
--

CREATE TABLE `peticion_articulo` (
  `id_peticion_articulo` int(11) NOT NULL,
  `id_peticion` int(11) DEFAULT NULL,
  `id_articulo` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sector`
--

CREATE TABLE `sector` (
  `id_sector` int(11) NOT NULL,
  `nombre_sector` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sector`
--

INSERT INTO `sector` (`id_sector`, `nombre_sector`) VALUES
(1, 'contable'),
(2, 'sistemas'),
(3, 'limpieza');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('j3FPzEDK0FK9en8r8pTGj8L443JA4R_2', 1662559059, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":{\"id_usuario\":24,\"username\":456456,\"nombre\":\"benito\",\"apellido\":\"camelo\",\"area\":2,\"fecha_creacion_usuario\":\"2022-08-11T03:00:00.000Z\",\"password\":\"$2a$10$gcd/f5VNeuob65Q8h3Zd9.mGkVzeqq27EC1ZARo1/8EfHQdO5nGNm\",\"rol\":3}},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `username` int(11) DEFAULT NULL,
  `nombre` char(50) DEFAULT NULL,
  `apellido` varchar(50) NOT NULL,
  `area` int(11) NOT NULL,
  `fecha_creacion_usuario` date DEFAULT current_timestamp(),
  `password` varchar(60) NOT NULL,
  `rol` int(11) NOT NULL DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `username`, `nombre`, `apellido`, `area`, `fecha_creacion_usuario`, `password`, `rol`) VALUES
(12, 7, 'benjamin', 'montevideo', 1, '2022-07-11', '$2a$10$4nVK6.BJnX/dmV9Rca4SnOf', 3),
(13, 990099, 'Jose', 'manuelito', 1, '2022-07-11', '$2a$10$rBwkrcEupdMUABf0MevmJOF', 3),
(14, 889988, 'Jose', 'silva', 1, '2022-07-11', '$2a$09$RMkSc7Fpg5dlwqi/a/jg9.E', 3),
(15, 151515, 'rodolfo', 'mengano', 1, '2022-07-11', '$2a$10$DZGu5CYhpSV1NHnwWg3qBub', 3),
(16, 1610, 'leonardo', 'lazo', 1, '2022-07-11', '$2a$16$oIwfo3yZNW1EFe0zArIe.eu', 3),
(17, 544554, '5555555', '5555555', 1, '2022-07-12', '$2a$10$Wipx6egtdsPtFZTxNM8okO0', 3),
(18, 54321, '123123', '123123123', 1, '2022-07-12', '54321', 3),
(19, 159159, '124124', '12412412', 1, '2022-07-12', '$2a$10$SPJYyemV/2/TkIqCTSLY2Oe', 3),
(20, 159159, 'admin', 'admin', 1, '2022-07-27', '$2a$10$4oHXImfILCAGuvTydhDsW.h', 3),
(21, 852852852, '852852852', '852852852', 1, '2022-08-03', '$2a$10$WCdKA8z/LsjWlpDAZ5BBDOox9hagMdKEmEbNQYUR/aHr6eqvgvepG', 3),
(22, 852852, 'Marcelo', 'Conocelo', 1, '2022-08-08', '$2a$10$EqprwanHu9mMFSRn8/450Od3hI4X4azVAlghv3225o.K39E9DdEry', 3),
(24, 456456, 'benito', 'camelo', 2, '2022-08-11', '$2a$10$gcd/f5VNeuob65Q8h3Zd9.mGkVzeqq27EC1ZARo1/8EfHQdO5nGNm', 3),
(25, 123123, 'juan', 'ElLoco', 1, '2022-08-29', '$2a$10$rQhjEjQtktVXEPMtclmBVevlsDID9Wp5.RRDU3RCzGECDjIGDgpHO', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD PRIMARY KEY (`id_articulo`),
  ADD KEY `categoria_articulo` (`categoria_articulo`),
  ADD KEY `sector` (`sector`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id_historial`),
  ADD KEY `id_usuario` (`username`),
  ADD KEY `peticion` (`peticion`),
  ADD KEY `id_articulo` (`id_articulo`);

--
-- Indices de la tabla `peticion`
--
ALTER TABLE `peticion`
  ADD PRIMARY KEY (`id_peticion`),
  ADD KEY `responsable_peticion` (`username`);

--
-- Indices de la tabla `peticion_articulo`
--
ALTER TABLE `peticion_articulo`
  ADD PRIMARY KEY (`id_peticion_articulo`),
  ADD KEY `id_peticion` (`id_peticion`),
  ADD KEY `id_articulo` (`id_articulo`);

--
-- Indices de la tabla `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`id_sector`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `area` (`area`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `articulo`
--
ALTER TABLE `articulo`
  MODIFY `id_articulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id_historial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `peticion`
--
ALTER TABLE `peticion`
  MODIFY `id_peticion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `peticion_articulo`
--
ALTER TABLE `peticion_articulo`
  MODIFY `id_peticion_articulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sector`
--
ALTER TABLE `sector`
  MODIFY `id_sector` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `articulo`
--
ALTER TABLE `articulo`
  ADD CONSTRAINT `articulo_ibfk_1` FOREIGN KEY (`categoria_articulo`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `articulo_ibfk_2` FOREIGN KEY (`sector`) REFERENCES `sector` (`id_sector`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_4` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_ibfk_5` FOREIGN KEY (`username`) REFERENCES `usuario` (`username`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_ibfk_6` FOREIGN KEY (`peticion`) REFERENCES `peticion` (`id_peticion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `peticion`
--
ALTER TABLE `peticion`
  ADD CONSTRAINT `peticion_ibfk_1` FOREIGN KEY (`username`) REFERENCES `usuario` (`username`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `peticion_articulo`
--
ALTER TABLE `peticion_articulo`
  ADD CONSTRAINT `peticion_articulo_ibfk_1` FOREIGN KEY (`id_peticion`) REFERENCES `peticion` (`id_peticion`),
  ADD CONSTRAINT `peticion_articulo_ibfk_2` FOREIGN KEY (`id_articulo`) REFERENCES `articulo` (`id_articulo`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`area`) REFERENCES `area` (`id_area`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
