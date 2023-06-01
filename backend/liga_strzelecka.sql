-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2023 at 03:08 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liga_strzelecka`
--

-- --------------------------------------------------------

--
-- Table structure for table `admini`
--

CREATE TABLE `admini` (
  `id_admina` int(11) NOT NULL,
  `login` text NOT NULL,
  `haslo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `admini`
--

INSERT INTO `admini` (`id_admina`, `login`, `haslo`) VALUES
(1, 'login', '$2a$12$DfDy4NZPvi4QqfN/s/KFDeDHMJRmZ2QbzEUrNcLrjxkrNWSe5LZ5q');

-- --------------------------------------------------------

--
-- Table structure for table `druzyny`
--

CREATE TABLE `druzyny` (
  `id_druzyny` int(11) NOT NULL,
  `id_szkoly` int(11) NOT NULL,
  `id_zawodow` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `podium`
--

CREATE TABLE `podium` (
  `id_zawodow` int(11) NOT NULL,
  `id_uzytkownika_miejsce_1` int(11) NOT NULL,
  `id_uzytkownika_miejsce_2` int(11) NOT NULL,
  `id_uzytkownika_miejsce_3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `strzelcy`
--

CREATE TABLE `strzelcy` (
  `id_druzyny` int(11) NOT NULL,
  `id_strzelec1` int(11) NOT NULL,
  `id_strzelec2` int(11) NOT NULL,
  `id_strzelec3` int(11) NOT NULL,
  `id_strzelec4` int(11) NOT NULL,
  `id_strzelec5` int(11) NOT NULL,
  `id_strzelec6` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `szkoly`
--

CREATE TABLE `szkoly` (
  `id_szkoly` int(11) NOT NULL,
  `nazwa` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id_uzytkownika` int(11) NOT NULL,
  `imie` varchar(30) NOT NULL,
  `nazwisko` varchar(30) NOT NULL,
  `id_szkoly` int(11) NOT NULL,
  `mezczyzna` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wyniki`
--

CREATE TABLE `wyniki` (
  `id_uzytkownika` int(11) NOT NULL,
  `id_druzyny` int(11) NOT NULL COMMENT 'Jesli brak id_druzyny jest to strzal indiwidualny',
  `Strzal1` int(11) NOT NULL,
  `Strzal2` int(11) NOT NULL,
  `Strzal3` int(11) NOT NULL,
  `Strzal4` int(11) NOT NULL,
  `Strzal5` int(11) NOT NULL,
  `Strzal6` int(11) NOT NULL,
  `Strzal7` int(11) NOT NULL,
  `Strzal8` int(11) NOT NULL,
  `Strzal9` int(11) NOT NULL,
  `Strzal10` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zawody`
--

CREATE TABLE `zawody` (
  `id_zawodow` int(11) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admini`
--
ALTER TABLE `admini`
  ADD PRIMARY KEY (`id_admina`),
  ADD UNIQUE KEY `login` (`login`) USING HASH;

--
-- Indexes for table `druzyny`
--
ALTER TABLE `druzyny`
  ADD PRIMARY KEY (`id_druzyny`),
  ADD KEY `id_szkoly` (`id_szkoly`),
  ADD KEY `id_zawodow` (`id_zawodow`);

--
-- Indexes for table `podium`
--
ALTER TABLE `podium`
  ADD KEY `id_zawodow` (`id_zawodow`),
  ADD KEY `id_uzytkownika_miejsce_1` (`id_uzytkownika_miejsce_1`),
  ADD KEY `id_uzytkownika_miejsce_2` (`id_uzytkownika_miejsce_2`),
  ADD KEY `id_uzytkownika_miejsce_3` (`id_uzytkownika_miejsce_3`);

--
-- Indexes for table `strzelcy`
--
ALTER TABLE `strzelcy`
  ADD KEY `id_druzyny` (`id_druzyny`),
  ADD KEY `id_strzelec1` (`id_strzelec1`),
  ADD KEY `id_strzelec2` (`id_strzelec2`),
  ADD KEY `id_strzelec3` (`id_strzelec3`),
  ADD KEY `id_strzelec4` (`id_strzelec4`),
  ADD KEY `id_strzelec5` (`id_strzelec5`),
  ADD KEY `id_strzelec6` (`id_strzelec6`);

--
-- Indexes for table `szkoly`
--
ALTER TABLE `szkoly`
  ADD PRIMARY KEY (`id_szkoly`);

--
-- Indexes for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id_uzytkownika`),
  ADD KEY `id_szkoly` (`id_szkoly`);

--
-- Indexes for table `wyniki`
--
ALTER TABLE `wyniki`
  ADD KEY `id_druzyny` (`id_druzyny`),
  ADD KEY `id_uzytkownika` (`id_uzytkownika`);

--
-- Indexes for table `zawody`
--
ALTER TABLE `zawody`
  ADD PRIMARY KEY (`id_zawodow`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admini`
--
ALTER TABLE `admini`
  MODIFY `id_admina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `druzyny`
--
ALTER TABLE `druzyny`
  MODIFY `id_druzyny` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `szkoly`
--
ALTER TABLE `szkoly`
  MODIFY `id_szkoly` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id_uzytkownika` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zawody`
--
ALTER TABLE `zawody`
  MODIFY `id_zawodow` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `druzyny`
--
ALTER TABLE `druzyny`
  ADD CONSTRAINT `druzyny_ibfk_1` FOREIGN KEY (`id_szkoly`) REFERENCES `szkoly` (`id_szkoly`),
  ADD CONSTRAINT `druzyny_ibfk_2` FOREIGN KEY (`id_zawodow`) REFERENCES `zawody` (`id_zawodow`);

--
-- Constraints for table `podium`
--
ALTER TABLE `podium`
  ADD CONSTRAINT `podium_ibfk_1` FOREIGN KEY (`id_zawodow`) REFERENCES `zawody` (`id_zawodow`),
  ADD CONSTRAINT `podium_ibfk_2` FOREIGN KEY (`id_uzytkownika_miejsce_1`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `podium_ibfk_3` FOREIGN KEY (`id_uzytkownika_miejsce_2`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `podium_ibfk_4` FOREIGN KEY (`id_uzytkownika_miejsce_3`) REFERENCES `uzytkownicy` (`id_uzytkownika`);

--
-- Constraints for table `strzelcy`
--
ALTER TABLE `strzelcy`
  ADD CONSTRAINT `strzelcy_ibfk_1` FOREIGN KEY (`id_druzyny`) REFERENCES `druzyny` (`id_druzyny`),
  ADD CONSTRAINT `strzelcy_ibfk_2` FOREIGN KEY (`id_strzelec1`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `strzelcy_ibfk_3` FOREIGN KEY (`id_strzelec2`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `strzelcy_ibfk_4` FOREIGN KEY (`id_strzelec3`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `strzelcy_ibfk_5` FOREIGN KEY (`id_strzelec4`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `strzelcy_ibfk_6` FOREIGN KEY (`id_strzelec5`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `strzelcy_ibfk_7` FOREIGN KEY (`id_strzelec6`) REFERENCES `uzytkownicy` (`id_uzytkownika`);

--
-- Constraints for table `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD CONSTRAINT `uzytkownicy_ibfk_1` FOREIGN KEY (`id_szkoly`) REFERENCES `szkoly` (`id_szkoly`);

--
-- Constraints for table `wyniki`
--
ALTER TABLE `wyniki`
  ADD CONSTRAINT `wyniki_ibfk_1` FOREIGN KEY (`id_druzyny`) REFERENCES `druzyny` (`id_druzyny`),
  ADD CONSTRAINT `wyniki_ibfk_2` FOREIGN KEY (`id_uzytkownika`) REFERENCES `uzytkownicy` (`id_uzytkownika`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
