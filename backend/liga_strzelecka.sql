-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2023 at 07:16 AM
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
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` char(36) NOT NULL,
  `login` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `login`, `password`) VALUES
('1', 'login', '$2a$12$mPgy.0ovnvKedIDtUcYwQeyCCr5M0uQmMho2IQ59a/rjPXeel/WXS'),
('a2b8cbbe-2bae-11ee-b16d-001a7dda7113', 'oliwer', '$2a$12$mPgy.0ovnvKedIDtUcYwQeyCCr5M0uQmMho2IQ59a/rjPXeel/WXS');

-- --------------------------------------------------------

--
-- Table structure for table `contesters`
--

CREATE TABLE `contesters` (
  `team_id` char(36) NOT NULL,
  `shooter_id` char(36) NOT NULL,
  `isInTeam` tinyint(1) NOT NULL,
  `shoot_1` int(11) DEFAULT NULL,
  `shoot_2` int(11) DEFAULT NULL,
  `shoot_3` int(11) DEFAULT NULL,
  `shoot_4` int(11) DEFAULT NULL,
  `shoot_5` int(11) DEFAULT NULL,
  `shoot_6` int(11) DEFAULT NULL,
  `shoot_7` int(11) DEFAULT NULL,
  `shoot_8` int(11) DEFAULT NULL,
  `shoot_9` int(11) DEFAULT NULL,
  `shoot_10` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `contesters`
--

INSERT INTO `contesters` (`team_id`, `shooter_id`, `isInTeam`, `shoot_1`, `shoot_2`, `shoot_3`, `shoot_4`, `shoot_5`, `shoot_6`, `shoot_7`, `shoot_8`, `shoot_9`, `shoot_10`) VALUES
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', '5080980d-dbdf-48c1-bb50-4967ddb291fa', 1, 10, 10, 5, 6, 7, 4, 3, 2, 10, 9),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', '1dc2e7b0-fc1d-4594-bb37-791375e55ea5', 1, 8, 6, 7, 10, 9, 5, 6, 10, 9, 9),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', 'f2140456-8848-4086-9f38-0257516ee296', 0, 10, 10, 8, 6, 9, 7, 5, 8, 9, 9),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', 'fbf6ce39-ce0c-403c-865d-435d7598ff3c', 1, 6, 6, 6, 10, 10, 6, 6, 10, 10, 8),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', 'ef6a6bc1-34f5-490a-9392-d567fa6589d7', 1, 8, 5, 6, 7, 9, 8, 5, 6, 9, 10),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', '919faec1-a3db-4465-837e-dab61c83202e', 1, 7, 6, 9, 10, 8, 5, 6, 7, 10, 9),
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', 'b14a9b82-9dd6-45bd-841f-5abcd36168d8', 1, 7, 10, 9, 8, 9, 10, 8, 9, 10, 9),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '65766b3b-b943-43d4-8cce-efacfb56b516', 1, 9, 7, 7, 6, 8, 10, 7, 9, 6, 5),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '30cec6ac-f4b5-4c89-baa7-4085a49528bc', 0, 8, 8, 7, 9, 6, 10, 8, 10, 9, 6),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', 'cd71c365-1f78-4723-99e3-0c24f6738ad6', 1, 9, 5, 4, 7, 10, 9, 6, 3, 0, 4),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '20927ef5-6b77-42cf-9411-2b30933df579', 1, 10, 10, 9, 5, 6, 7, 8, 6, 9, 8),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '4a8087f6-4275-4ddf-95c3-b275b591d5aa', 1, 6, 5, 7, 10, 6, 8, 5, 4, 3, 0),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '74376174-19de-4007-a809-2266f7d550cb', 1, 8, 6, 9, 7, 5, 9, 8, 4, 6, 5),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '3b6670e5-d9f0-413a-ada4-d335ce6c7885', 1, 9, 8, 5, 5, 9, 6, 7, 9, 5, 6),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', '1dc2e7b0-fc1d-4594-bb37-791375e55ea5', 1, 9, 8, 7, 9, 10, 6, 6, 5, 8, 9),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', '5080980d-dbdf-48c1-bb50-4967ddb291fa', 1, 4, 2, 5, 10, 8, 3, 10, 5, 3, 7),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', '919faec1-a3db-4465-837e-dab61c83202e', 1, 10, 7, 6, 6, 5, 5, 5, 3, 3, 7),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', 'b14a9b82-9dd6-45bd-841f-5abcd36168d8', 1, 10, 9, 5, 2, 8, 5, 6, 10, 7, 9),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', 'fbf6ce39-ce0c-403c-865d-435d7598ff3c', 0, 9, 8, 6, 8, 9, 6, 10, 7, 6, 8),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', 'ef6a6bc1-34f5-490a-9392-d567fa6589d7', 1, 6, 8, 8, 9, 10, 7, 4, 3, 6, 5),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', 'f2140456-8848-4086-9f38-0257516ee296', 1, 2, 2, 3, 3, 3, 3, 9, 9, 9, 9),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '20927ef5-6b77-42cf-9411-2b30933df579', 1, 9, 9, 6, 9, 8, 5, 8, 6, 8, 6),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '30cec6ac-f4b5-4c89-baa7-4085a49528bc', 1, 8, 6, 8, 9, 10, 9, 10, 9, 7, 9),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '3b6670e5-d9f0-413a-ada4-d335ce6c7885', 1, 6, 9, 10, 8, 9, 6, 4, 6, 7, 10),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '4a8087f6-4275-4ddf-95c3-b275b591d5aa', 1, 9, 8, 6, 10, 9, 5, 6, 7, 8, 6),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '65766b3b-b943-43d4-8cce-efacfb56b516', 1, 7, 9, 5, 8, 6, 7, 10, 5, 8, 6),
('3cb65a67-2b95-4802-a375-2d3870ba2655', 'cd71c365-1f78-4723-99e3-0c24f6738ad6', 0, 10, 9, 6, 7, 8, 6, 7, 9, 8, 6),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '74376174-19de-4007-a809-2266f7d550cb', 1, 9, 5, 8, 6, 10, 7, 9, 6, 5, 8);

-- --------------------------------------------------------

--
-- Table structure for table `contests`
--

CREATE TABLE `contests` (
  `contest_id` char(36) NOT NULL,
  `date` date NOT NULL,
  `location` char(36) NOT NULL,
  `man_first_place_shooter_id` char(36) DEFAULT NULL,
  `man_second_place_shooter_id` char(36) DEFAULT NULL,
  `man_third_place_shooter_id` char(36) DEFAULT NULL,
  `woman_first_place_shooter_id` char(36) DEFAULT NULL,
  `woman_second_place_shooter_id` char(36) DEFAULT NULL,
  `woman_third_place_shooter_id` char(36) DEFAULT NULL,
  `first_place_team_id` char(36) DEFAULT NULL,
  `second_place_team_id` char(36) DEFAULT NULL,
  `third_place_team_id` char(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `contests`
--

INSERT INTO `contests` (`contest_id`, `date`, `location`, `man_first_place_shooter_id`, `man_second_place_shooter_id`, `man_third_place_shooter_id`, `woman_first_place_shooter_id`, `woman_second_place_shooter_id`, `woman_third_place_shooter_id`, `first_place_team_id`, `second_place_team_id`, `third_place_team_id`) VALUES
('01ffc264-aa17-4cb9-a4cc-e18d16bb08b5', '2022-10-10', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'b14a9b82-9dd6-45bd-841f-5abcd36168d8', 'f2140456-8848-4086-9f38-0257516ee296', '30cec6ac-f4b5-4c89-baa7-4085a49528bc', '1dc2e7b0-fc1d-4594-bb37-791375e55ea5', '20927ef5-6b77-42cf-9411-2b30933df579', 'ef6a6bc1-34f5-490a-9392-d567fa6589d7', '603bca1d-5fbd-4fdd-988b-16664e639e4f', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', NULL),
('4b546385-5dfa-4325-ac90-9b179c6c7b05', '2023-09-18', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('6fb06afe-a72f-44fd-a79a-8fdfcb108ba8', '2024-10-14', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b40b2505-dc5d-468a-9f28-fe339b3d9c67', '2023-02-16', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('c344d1a6-6977-4d2a-be86-2be48daa05c2', '2023-09-11', '603bca1d-5fbd-4fdd-988b-16664e639e4f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` char(36) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`school_id`, `name`) VALUES
('603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Szkoła Podstawowa nr 1 w Kłodawie'),
('9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Zespół Szkół Ogólnokształcących i Technicznych w Kłodawie');

-- --------------------------------------------------------

--
-- Table structure for table `shooters`
--

CREATE TABLE `shooters` (
  `shooter_id` char(36) NOT NULL,
  `school_id` char(36) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `secondName` varchar(32) NOT NULL,
  `isMan` tinyint(1) NOT NULL,
  `isArchived` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `shooters`
--

INSERT INTO `shooters` (`shooter_id`, `school_id`, `firstName`, `secondName`, `isMan`, `isArchived`) VALUES
('1dc2e7b0-fc1d-4594-bb37-791375e55ea5', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Beata ', 'Szydło', 0, NULL),
('20927ef5-6b77-42cf-9411-2b30933df579', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Joanna', 'Murańska', 0, NULL),
('30cec6ac-f4b5-4c89-baa7-4085a49528bc', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Rafał', 'Borkowski', 1, NULL),
('3b6670e5-d9f0-413a-ada4-d335ce6c7885', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Joanna', 'Jędrzejczyk', 0, NULL),
('4a8087f6-4275-4ddf-95c3-b275b591d5aa', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Karolina', 'Kowalkiewicz', 0, NULL),
('5080980d-dbdf-48c1-bb50-4967ddb291fa', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Marcin', 'Wrzosek', 1, NULL),
('65766b3b-b943-43d4-8cce-efacfb56b516', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Dobromir', 'Sośnierz', 1, NULL),
('74376174-19de-4007-a809-2266f7d550cb', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Oliwer', 'Klauze', 1, NULL),
('919faec1-a3db-4465-837e-dab61c83202e', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Grzegorz', 'Braun', 1, NULL),
('b14a9b82-9dd6-45bd-841f-5abcd36168d8', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Karol', 'Morawiecki', 1, NULL),
('cd71c365-1f78-4723-99e3-0c24f6738ad6', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'Jacek', 'Murański', 1, NULL),
('ef6a6bc1-34f5-490a-9392-d567fa6589d7', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Anna', 'Bryłka', 0, NULL),
('f2140456-8848-4086-9f38-0257516ee296', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Tadeusz', 'Bosak', 1, NULL),
('fbf6ce39-ce0c-403c-865d-435d7598ff3c', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'Anna', 'Seneszyn', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` char(36) NOT NULL,
  `school_id` char(36) NOT NULL,
  `contest_id` char(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `school_id`, `contest_id`) VALUES
('280b00fe-2d9a-427f-9ec7-e2260634ee8a', '603bca1d-5fbd-4fdd-988b-16664e639e4f', '01ffc264-aa17-4cb9-a4cc-e18d16bb08b5'),
('3cb65a67-2b95-4802-a375-2d3870ba2655', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', 'b40b2505-dc5d-468a-9f28-fe339b3d9c67'),
('aa00151c-2ba8-44fe-80db-1b58dd74b61c', '603bca1d-5fbd-4fdd-988b-16664e639e4f', 'b40b2505-dc5d-468a-9f28-fe339b3d9c67'),
('b4cd8d7d-b036-4bf1-9b2f-e3cdfcbfa72d', '9c328cf6-cb0c-40fc-be8f-721261e9b66e', '01ffc264-aa17-4cb9-a4cc-e18d16bb08b5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `login` (`login`) USING HASH;

--
-- Indexes for table `contesters`
--
ALTER TABLE `contesters`
  ADD KEY `shooter_id` (`shooter_id`),
  ADD KEY `team_id` (`team_id`);

--
-- Indexes for table `contests`
--
ALTER TABLE `contests`
  ADD PRIMARY KEY (`contest_id`),
  ADD KEY `first_place_shooter_id` (`man_first_place_shooter_id`),
  ADD KEY `second_place_shooter_id` (`man_second_place_shooter_id`),
  ADD KEY `third_place_shooter_id` (`man_third_place_shooter_id`),
  ADD KEY `woman_first_place_shooter_id` (`woman_first_place_shooter_id`),
  ADD KEY `woman_second_place_shooter_id` (`woman_second_place_shooter_id`),
  ADD KEY `woman_third_place_shooter_id` (`woman_third_place_shooter_id`),
  ADD KEY `location` (`location`),
  ADD KEY `contests_ibfk_7` (`first_place_team_id`),
  ADD KEY `contests_ibfk_8` (`second_place_team_id`),
  ADD KEY `contests_ibfk_9` (`third_place_team_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`school_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `shooters`
--
ALTER TABLE `shooters`
  ADD PRIMARY KEY (`shooter_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `contest_id` (`contest_id`),
  ADD KEY `school_id` (`school_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contesters`
--
ALTER TABLE `contesters`
  ADD CONSTRAINT `contesters_ibfk_1` FOREIGN KEY (`shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contesters_ibfk_2` FOREIGN KEY (`team_id`) REFERENCES `teams` (`team_id`);

--
-- Constraints for table `contests`
--
ALTER TABLE `contests`
  ADD CONSTRAINT `contests_ibfk_1` FOREIGN KEY (`man_first_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_10` FOREIGN KEY (`location`) REFERENCES `schools` (`school_id`),
  ADD CONSTRAINT `contests_ibfk_2` FOREIGN KEY (`man_second_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_3` FOREIGN KEY (`man_third_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_4` FOREIGN KEY (`woman_first_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_5` FOREIGN KEY (`woman_second_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_6` FOREIGN KEY (`woman_third_place_shooter_id`) REFERENCES `shooters` (`shooter_id`),
  ADD CONSTRAINT `contests_ibfk_7` FOREIGN KEY (`first_place_team_id`) REFERENCES `schools` (`school_id`),
  ADD CONSTRAINT `contests_ibfk_8` FOREIGN KEY (`second_place_team_id`) REFERENCES `schools` (`school_id`),
  ADD CONSTRAINT `contests_ibfk_9` FOREIGN KEY (`third_place_team_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints for table `shooters`
--
ALTER TABLE `shooters`
  ADD CONSTRAINT `shooters_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);

--
-- Constraints for table `teams`
--
ALTER TABLE `teams`
  ADD CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`contest_id`) REFERENCES `contests` (`contest_id`),
  ADD CONSTRAINT `teams_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `schools` (`school_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
