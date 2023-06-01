-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Maj 2023, 09:56
-- Wersja serwera: 10.4.19-MariaDB
-- Wersja PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `liga_strzelecka`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `admini`
--

CREATE TABLE `admini` (
  `id_admina` int(11) NOT NULL,
  `login` text COLLATE utf8_polish_ci NOT NULL,
  `haslo` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `druzyny`
--

CREATE TABLE `druzyny` (
  `id_druzyny` int(11) NOT NULL,
  `id_szkoly` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `podium`
--

CREATE TABLE `podium` (
  `id_zawodow` int(11) NOT NULL,
  `id_uzytkownika_miejsce_1` int(11) NOT NULL,
  `id_uzytkownika_miejsce_2` int(11) NOT NULL,
  `id_uzytkownika_miejsce_3` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `strzelcy`
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
-- Struktura tabeli dla tabeli `szkoly`
--

CREATE TABLE `szkoly` (
  `id_szkoly` int(11) NOT NULL,
  `nazwa` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `id_uzytkownika` int(11) NOT NULL,
  `imie` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `nazwisko` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `id_szkoly` int(11) NOT NULL,
  `mezczyzna` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `wyniki`
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
-- Struktura tabeli dla tabeli `zawody`
--

CREATE TABLE `zawody` (
  `id_zawodow` int(11) NOT NULL,
  `data` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `admini`
--
ALTER TABLE `admini`
  ADD PRIMARY KEY (`id_admina`),
  ADD UNIQUE KEY `login` (`login`) USING HASH;

--
-- Indeksy dla tabeli `druzyny`
--
ALTER TABLE `druzyny`
  ADD PRIMARY KEY (`id_druzyny`),
  ADD KEY `id_szkoly` (`id_szkoly`);

--
-- Indeksy dla tabeli `podium`
--
ALTER TABLE `podium`
  ADD KEY `id_zawodow` (`id_zawodow`),
  ADD KEY `id_uzytkownika_miejsce_1` (`id_uzytkownika_miejsce_1`),
  ADD KEY `id_uzytkownika_miejsce_2` (`id_uzytkownika_miejsce_2`),
  ADD KEY `id_uzytkownika_miejsce_3` (`id_uzytkownika_miejsce_3`);

--
-- Indeksy dla tabeli `strzelcy`
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
-- Indeksy dla tabeli `szkoly`
--
ALTER TABLE `szkoly`
  ADD PRIMARY KEY (`id_szkoly`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`id_uzytkownika`),
  ADD KEY `id_szkoly` (`id_szkoly`);

--
-- Indeksy dla tabeli `wyniki`
--
ALTER TABLE `wyniki`
  ADD KEY `id_druzyny` (`id_druzyny`),
  ADD KEY `id_uzytkownika` (`id_uzytkownika`);

--
-- Indeksy dla tabeli `zawody`
--
ALTER TABLE `zawody`
  ADD PRIMARY KEY (`id_zawodow`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `admini`
--
ALTER TABLE `admini`
  MODIFY `id_admina` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `druzyny`
--
ALTER TABLE `druzyny`
  MODIFY `id_druzyny` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `szkoly`
--
ALTER TABLE `szkoly`
  MODIFY `id_szkoly` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `id_uzytkownika` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zawody`
--
ALTER TABLE `zawody`
  MODIFY `id_zawodow` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `druzyny`
--
ALTER TABLE `druzyny`
  ADD CONSTRAINT `druzyny_ibfk_1` FOREIGN KEY (`id_szkoly`) REFERENCES `szkoly` (`id_szkoly`);

--
-- Ograniczenia dla tabeli `podium`
--
ALTER TABLE `podium`
  ADD CONSTRAINT `podium_ibfk_1` FOREIGN KEY (`id_zawodow`) REFERENCES `zawody` (`id_zawodow`),
  ADD CONSTRAINT `podium_ibfk_2` FOREIGN KEY (`id_uzytkownika_miejsce_1`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `podium_ibfk_3` FOREIGN KEY (`id_uzytkownika_miejsce_2`) REFERENCES `uzytkownicy` (`id_uzytkownika`),
  ADD CONSTRAINT `podium_ibfk_4` FOREIGN KEY (`id_uzytkownika_miejsce_3`) REFERENCES `uzytkownicy` (`id_uzytkownika`);

--
-- Ograniczenia dla tabeli `strzelcy`
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
-- Ograniczenia dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD CONSTRAINT `uzytkownicy_ibfk_1` FOREIGN KEY (`id_szkoly`) REFERENCES `szkoly` (`id_szkoly`);

--
-- Ograniczenia dla tabeli `wyniki`
--
ALTER TABLE `wyniki`
  ADD CONSTRAINT `wyniki_ibfk_1` FOREIGN KEY (`id_druzyny`) REFERENCES `druzyny` (`id_druzyny`),
  ADD CONSTRAINT `wyniki_ibfk_2` FOREIGN KEY (`id_uzytkownika`) REFERENCES `uzytkownicy` (`id_uzytkownika`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
