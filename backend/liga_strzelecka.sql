-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2023 at 09:41 PM
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

-
-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `school_id` char(36) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shooters`
--

CREATE TABLE `shooters` (
  `shooter_id` char(36) NOT NULL,
  `school_id` char(36) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `secondName` varchar(32) NOT NULL,
  `isMan` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

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
