-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 04, 2023 at 07:18 AM
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
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '6586cf68-ac8f-4f34-9dac-a5ea449d8f05', 1, 8, 10, 6, 5, 1, 5, 4, 5, 4, 3),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '5965d2a7-ed44-45e4-ae4e-be17f0572339', 1, 5, 4, 4, 3, 5, 5, 8, 9, 10, 10),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '6ad0889c-5c3c-4093-a167-598f5c69532f', 1, 10, 7, 5, 8, 4, 9, 8, 4, 3, 5),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '7b041347-86e8-4857-add3-a21eac055218', 1, 8, 9, 2, 7, 4, 5, 5, 6, 9, 8),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '1bf8fa74-7c11-410b-a3de-4c6243c84ed2', 1, 5, 6, 9, 4, 7, 5, 5, 5, 9, 8),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '077bd7ec-05c7-46a6-b8c0-6250919b162e', 1, 8, 9, 5, 6, 9, 8, 5, 9, 6, 9),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', 'c337637a-31c5-4561-a56d-9a297677ad0a', 0, 9, 9, 9, 9, 9, 8, 8, 8, 7, 7),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '873a2498-5f92-42b3-97fa-642a1bdeef52', 0, 10, 10, 10, 5, 4, 8, 9, 6, 5, 9),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', 'cf43cb43-95ae-4602-baf9-0b45cd2032c2', 0, 4, 10, 10, 10, 10, 10, 10, 10, 10, 10),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '20fa0602-45ab-4c4a-9c5b-7230d5aa023b', 0, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '9aab953c-6daf-4f1e-95b4-ade861748a07', 0, 7, 4, 8, 8, 5, 3, 1, 5, 6, 4),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', '0fe2a2e8-a300-4773-a49d-0eb0913b318d', 0, 8, 7, 3, 5, 1, 0, 0, 0, 9, 8),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '529455cd-601d-47d8-82d0-97f99768607f', 1, 10, 9, 9, 9, 9, 8, 8, 10, 10, 10),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'ae13cb63-c080-4414-a316-7210bc8bba05', 1, 8, 8, 9, 10, 10, 8, 7, 7, 8, 8),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'c2719a78-b96a-48db-ba6c-f9d0cefa4ad5', 1, 10, 10, 8, 9, 5, 4, 8, 7, 7, 7),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'de786b52-63cf-4c38-9ee4-36ca902c0e0d', 1, 5, 9, 10, 10, 10, 8, 4, 5, 6, 9),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '5c3f13a7-fe97-46be-a1dc-e797ea3c7ae8', 1, 8, 7, 9, 10, 10, 10, 9, 8, 8, 7),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'd0c1ea40-70c0-4295-9e29-6d0100a00c69', 1, 6, 6, 10, 10, 5, 10, 10, 10, 10, 9),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '82772be8-cc10-4ef3-abab-b1a47a0254c3', 0, 9, 10, 10, 8, 7, 4, 3, 5, 6, 10),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '841ab1f6-6c74-431a-94ea-26df6454fa01', 0, 9, 8, 8, 5, 10, 5, 4, 8, 9, 10),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '57cb0d42-862c-4583-87f0-2e2a8c90e21c', 0, 7, 7, 0, 0, 0, 1, 10, 10, 8, 8),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', '87d8f94b-7c51-4832-ba35-f5fb5d88ca5e', 0, 5, 6, 6, 6, 4, 6, 6, 6, 6, 10),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'a3f943e5-33f2-4aae-8db8-49c9072dc9b6', 0, 8, 8, 5, 5, 5, 5, 5, 5, 5, 5),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', '503c4410-ed55-449d-adb8-06c4c1e78897', 1, 10, 9, 9, 9, 9, 9, 0, 9, 10, 10),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', '4bdfc164-a7f9-47b2-9754-c402dc03245d', 1, 8, 9, 5, 4, 7, 3, 8, 8, 7, 7),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', '104bb0a4-29ca-46b3-ad6f-ac9161f3deec', 1, 10, 9, 8, 5, 6, 7, 10, 8, 8, 5),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', '4caee806-7af3-40ca-ae63-430e0c9d4fc3', 1, 6, 6, 6, 9, 9, 10, 10, 7, 7, 9),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', '5eedca54-1bb3-412d-a5b6-8c696f508d64', 0, 9, 6, 8, 5, 2, 3, 6, 5, 7, 10),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', 'c4ce0ab9-e684-420b-b69b-37cc194739ac', 1, 10, 10, 7, 4, 0, 0, 1, 3, 5, 5),
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', 'd6f83c1c-5b85-4d5c-b133-d5900da245df', 1, 5, 3, 1, 4, 7, 3, 3, 3, 3, 3),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'ae13cb63-c080-4414-a316-7210bc8bba05', 1, 9, 8, 5, 9, 10, 6, 5, 4, 7, 9),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'd0c1ea40-70c0-4295-9e29-6d0100a00c69', 1, 5, 5, 9, 5, 4, 4, 6, 7, 8, 9),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'f356e206-109b-43de-9ff3-a35b121a9165', 0, 5, 5, 8, 9, 7, 4, 8, 5, 10, 10),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'c2719a78-b96a-48db-ba6c-f9d0cefa4ad5', 1, 10, 10, 10, 10, 10, 9, 9, 10, 8, 9),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', '57cb0d42-862c-4583-87f0-2e2a8c90e21c', 1, 10, 6, 6, 5, 8, 7, 4, 5, 4, 4),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', '87d8f94b-7c51-4832-ba35-f5fb5d88ca5e', 1, 3, 4, 4, 4, 5, 5, 5, 5, 5, 9),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'a3f943e5-33f2-4aae-8db8-49c9072dc9b6', 1, 5, 6, 9, 8, 7, 5, 4, 6, 7, 8),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', '5c3f13a7-fe97-46be-a1dc-e797ea3c7ae8', 0, 9, 5, 6, 10, 9, 8, 7, 10, 8, 7),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', '9f939690-4a59-4286-8c6f-be3e9f242d17', 1, 10, 9, 5, 6, 9, 5, 8, 9, 9, 5),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', 'd6f83c1c-5b85-4d5c-b133-d5900da245df', 1, 5, 9, 9, 9, 9, 8, 7, 7, 9, 10),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', '0b634531-3d39-43aa-badd-0c31f80866f6', 1, 6, 10, 9, 9, 9, 9, 9, 8, 8, 7),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', '4bdfc164-a7f9-47b2-9754-c402dc03245d', 0, 5, 5, 9, 9, 8, 8, 7, 7, 7, 7),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', '4caee806-7af3-40ca-ae63-430e0c9d4fc3', 1, 10, 9, 9, 9, 9, 9, 9, 8, 8, 7),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', '1f35897b-a315-4872-a2a2-564a323dd208', 1, 10, 5, 4, 4, 8, 7, 7, 7, 9, 9),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', 'a08722c2-16ec-4c9a-a03b-95c86d693d8c', 1, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10);

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
('30c2404c-a490-41a0-87fe-79b10fb21924', '2023-01-24', 'ea239938-8ae2-4e53-88ef-43ee71991c17', NULL, NULL, NULL, NULL, NULL, NULL, 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'ea239938-8ae2-4e53-88ef-43ee71991c17'),
('51283587-2b29-4f49-87d3-3a2823975c11', '2023-04-05', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('73b3753e-2c11-4229-ba7e-dfc907db45da', '2022-05-06', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('b2d9c20c-eeb0-4271-aa09-b051ef46bfb9', '2023-03-24', '8b211ba0-e077-4def-b560-88ac3a8edfec', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('caff0671-a123-4308-a199-eb78b3c26577', '2022-06-17', 'b322993b-f22f-4509-b6d9-1243c773ae4f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
('b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'LO Koło'),
('b322993b-f22f-4509-b6d9-1243c773ae4f', 'Szkoła Podstawowa nr 1 w Kłodawie'),
('d34a974e-f8ad-4c91-ba62-59534c685516', 'UKS \"Jedynka\" w Kłodawie'),
('300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Zespół Szkół w Lubrańcu Marysinie'),
('b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'ZSOIT w Kłodawie'),
('0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'ZSOIT w Kłodawie II'),
('8b211ba0-e077-4def-b560-88ac3a8edfec', 'ZSP nr1 w Łęczycy'),
('ea239938-8ae2-4e53-88ef-43ee71991c17', 'ZSRCKU w Kościelcu');

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
('00b1cf9b-9685-4442-96ec-374b10354c76', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Natalia', 'Malinowska', 0, NULL),
('077bd7ec-05c7-46a6-b8c0-6250919b162e', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Nikola', 'Pochylska', 0, NULL),
('07ddd94e-b5d4-4687-8cd9-151f8e22a69f', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Michalina', 'Kalinowska', 0, NULL),
('08804355-d117-4312-9005-52bb9922ab33', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Hubert', 'Pałka', 1, NULL),
('0b634531-3d39-43aa-badd-0c31f80866f6', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Magdalena', 'Rybińska', 0, NULL),
('0db2adb8-2bbf-4783-a5b7-d272a7eaab6f', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Oliwier', 'Rzepka', 1, NULL),
('0fe2a2e8-a300-4773-a49d-0eb0913b318d', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Alan', 'Głowiński', 1, NULL),
('104bb0a4-29ca-46b3-ad6f-ac9161f3deec', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Kacper', 'Sarnowski', 1, NULL),
('106a1cac-d5ba-439a-bcf0-a2b305d8b05c', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Marcel', 'Barański', 1, NULL),
('149d01ec-ac54-4c08-8a28-cb15c5123fdd', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Sandra', 'Masiera', 0, NULL),
('152174bb-da95-4e52-9fb2-321e91c465b3', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Zuzanna', 'Sosnowska', 0, NULL),
('166e993d-2ca8-4980-b6e2-fce3dbe25414', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Gabriel', 'Retkowski', 1, NULL),
('1746b85e-2fbd-4ccd-98f0-78d125f75899', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Maja', 'Kucia', 0, NULL),
('1ac86f88-91d9-40d2-80bc-e36a730d08a3', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Michał', 'Bernyś', 1, NULL),
('1bf8fa74-7c11-410b-a3de-4c6243c84ed2', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Krystian', 'Nijak', 1, NULL),
('1df8ad81-558c-4c6a-a7f0-505eecfae7b8', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Agata', 'Wojciechowska', 0, NULL),
('1f35897b-a315-4872-a2a2-564a323dd208', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Zofia', 'Kowalewska', 0, NULL),
('1fca25e5-d4c5-4400-bfcb-48f08792b950', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Natalia', 'Robaczyńska', 0, NULL),
('20fa0602-45ab-4c4a-9c5b-7230d5aa023b', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Natalia', 'Russek', 0, NULL),
('223540e0-ec02-421c-bc4f-f58b2a3da273', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Filip', 'Kumiejowski', 1, NULL),
('2d9c262f-64ed-4470-85e8-91be0851f9c3', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Wiktor', 'Buchmiller', 1, NULL),
('3b5df1cd-2608-402c-b990-fc2555111f83', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Nikola', 'Stegenda', 0, NULL),
('46b34c9e-d82a-43b2-ad4e-ff928db9f81e', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Maja', 'Michalak', 0, NULL),
('4bdfc164-a7f9-47b2-9754-c402dc03245d', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Nadia', 'Walczak', 0, NULL),
('4caee806-7af3-40ca-ae63-430e0c9d4fc3', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Filip', 'Pietrzak', 1, NULL),
('503c4410-ed55-449d-adb8-06c4c1e78897', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Agata', 'Winiecka', 0, NULL),
('529455cd-601d-47d8-82d0-97f99768607f', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Jan', 'Felczyński', 1, NULL),
('57cb0d42-862c-4583-87f0-2e2a8c90e21c', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Cezary', 'Olesiński', 1, 0),
('5965d2a7-ed44-45e4-ae4e-be17f0572339', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Sebastian', 'Dębski', 1, NULL),
('5a671fb4-7f66-4285-9688-543733e30a10', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Franciszek', 'Broda', 1, NULL),
('5c3f13a7-fe97-46be-a1dc-e797ea3c7ae8', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Wiktoria', 'Frątczak', 0, NULL),
('5c55baba-4ac5-48be-b45a-cf18c3c5f346', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Stanisław', 'Musiał', 1, NULL),
('5eedca54-1bb3-412d-a5b6-8c696f508d64', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Gabriela', 'Onderska', 0, NULL),
('6586cf68-ac8f-4f34-9dac-a5ea449d8f05', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Wiktoria', 'Kowalewska', 0, NULL),
('66b0afba-464a-4275-a2d5-ba2fee99283d', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Jan', 'Kwiatkowski', 1, NULL),
('6ad0889c-5c3c-4093-a167-598f5c69532f', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Filip', 'Gruszczyński', 1, NULL),
('6f650b31-dbc9-4ac4-b138-9a0377cee2d1', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Eliza', 'Sieradzka', 0, NULL),
('72abc936-10db-42e8-b0ef-04ae0f08197d', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Krystian', 'Pietrzak', 1, NULL),
('77535231-6257-41dd-a12f-9e37afc15b98', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Maja', 'Rakowska', 0, NULL),
('7b041347-86e8-4857-add3-a21eac055218', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Nikola', 'Szymańska', 0, NULL),
('7b7adf17-7ad5-496f-b0fd-6d7b027666f3', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Norbert', 'Sowiński', 1, NULL),
('812e57a6-f630-4433-b0b8-d5a0d130da20', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Wiktor', 'Kuczyński', 1, NULL),
('82772be8-cc10-4ef3-abab-b1a47a0254c3', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Mikołaj', 'Szafrański', 1, NULL),
('841ab1f6-6c74-431a-94ea-26df6454fa01', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Michał', 'Stelmach', 1, NULL),
('873a2498-5f92-42b3-97fa-642a1bdeef52', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Miłosz', 'Jóźwiak', 1, NULL),
('87d8f94b-7c51-4832-ba35-f5fb5d88ca5e', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Adrian', 'Kwiatkowski', 1, NULL),
('94041e0a-011a-4a8b-bcb1-1f4839b085e4', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Justyna', 'Kołodziejska', 0, NULL),
('9aa7c4fe-f626-4c80-8644-892fc83ae4b5', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Jonasz', 'Jabłoński', 1, NULL),
('9aab953c-6daf-4f1e-95b4-ade861748a07', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Oliwia', 'Kotarska', 0, NULL),
('9e16be2d-77dc-4804-b59c-c185f8b98b32', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Natalia', 'Maciejewska', 0, NULL),
('9f939690-4a59-4286-8c6f-be3e9f242d17', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Mikołaj', 'Marchlewski', 1, NULL),
('a08722c2-16ec-4c9a-a03b-95c86d693d8c', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Nadia', 'Komodzińska', 0, NULL),
('a3f943e5-33f2-4aae-8db8-49c9072dc9b6', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Bartosz', 'Kołodziejski', 1, NULL),
('a4fb7c82-95cb-4499-8328-08f81bd8b68c', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Sandra', 'Mosiera', 0, NULL),
('a6230f22-c831-4566-82f2-3c282d31062f', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Kacper', 'Kacprzak', 1, NULL),
('aa667ed5-6831-4304-be7e-339e861e2d9a', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Anita', 'Dębska', 0, NULL),
('aad23ca0-715a-4cc2-b01f-26a336be99ef', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Wiktor', 'Kucia', 1, NULL),
('ad31baf7-3bba-4fe0-96b7-1d159aef0b62', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Jagoda', 'Bierzyńska', 0, NULL),
('ae13cb63-c080-4414-a316-7210bc8bba05', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Oskar', 'Rutkowski', 1, NULL),
('b0ea13e4-b0c3-4753-9dee-cf6dafad6b84', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Filip', 'Rumiejowski', 1, NULL),
('b349a5ef-c7a8-47f9-b293-ced75afcf7e5', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Patrycja', 'Kaźmierczak', 0, NULL),
('bc6b5687-19e8-4d3b-9f57-2556420e39e3', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Mateusz', 'Karolak', 1, NULL),
('c2719a78-b96a-48db-ba6c-f9d0cefa4ad5', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Wiktor', 'Andrzejewski', 1, NULL),
('c337637a-31c5-4561-a56d-9a297677ad0a', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Tomasz', 'Fabiszak', 1, NULL),
('c4ce0ab9-e684-420b-b69b-37cc194739ac', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Magda', 'Rybińska', 0, NULL),
('cdfde672-e18b-4a8b-8c10-d6343d3f31c6', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Stanisław', 'Stańczyk', 1, NULL),
('ce92ef72-9669-4bc1-8338-27657b4e7295', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Zuzanna', 'Jędrzejczak', 0, NULL),
('cf43cb43-95ae-4602-baf9-0b45cd2032c2', 'ea239938-8ae2-4e53-88ef-43ee71991c17', 'Szymon', 'Radka', 1, NULL),
('d05e59f8-06b9-4f01-b381-165a0f5eb910', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Anna', 'Nowak', 0, NULL),
('d0c1ea40-70c0-4295-9e29-6d0100a00c69', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Antoni', 'Kowalewski', 1, NULL),
('d2bbbfe0-8da1-4ba5-9930-d8202fa0a557', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Kacper', 'Jankowski', 1, NULL),
('d6f83c1c-5b85-4d5c-b133-d5900da245df', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Wiktoria', 'Turbakiewicz', 0, NULL),
('de786b52-63cf-4c38-9ee4-36ca902c0e0d', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Kinga', 'Kalinowska', 0, NULL),
('debce392-abdc-463f-a34f-907d2f3a9577', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Klaudia', 'Nowak', 0, NULL),
('df0a6543-933d-4a43-bea3-00847bf9c2b8', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Wiktoria', 'Sosnowska', 0, NULL),
('df2bd543-a581-46bc-a8dd-7985ef77dead', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Julia', 'Michalska', 0, NULL),
('e25cfec0-6d43-4861-beef-2be530aeb3b2', '0a8e7249-61f1-49c7-98e7-532c1efb5c84', 'Kacper', 'Machina', 1, NULL),
('e3bd84bd-e1be-4971-82bb-baa0423252cd', '8b211ba0-e077-4def-b560-88ac3a8edfec', 'Antonina', 'Raj', 0, NULL),
('e46e2ed8-967f-4a8d-a9e7-891e35ff6f9a', 'b322993b-f22f-4509-b6d9-1243c773ae4f', 'Milena', 'Małecka', 0, NULL),
('ed6efdb4-5cf8-4d51-8122-9ac17bd76cec', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Adam', 'Woźniak', 1, 0),
('f2dc7dac-673f-4119-ad0e-325aeff178f4', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Dominika', 'Madajczyk', 0, NULL),
('f356e206-109b-43de-9ff3-a35b121a9165', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', 'Wiktor', 'Bolewski', 1, NULL),
('f660fb03-6684-4c8b-8a46-81d7d95f0c1f', 'b67f1bac-c16e-4ed4-8ac9-0d30ca258bbf', 'Kamil', 'Antczak', 1, NULL),
('fb0ce514-dcce-4482-a257-768bfe86d95b', '300e25c0-d7b1-45b3-a8bc-910bd5dc0264', 'Michał', 'Włodarzewski', 1, NULL);

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
('0e5eb700-7196-4ab6-af46-7155d3f2dc45', 'b322993b-f22f-4509-b6d9-1243c773ae4f', '30c2404c-a490-41a0-87fe-79b10fb21924'),
('34a6b70f-6bc0-49f9-8834-77c5ff22b110', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', '30c2404c-a490-41a0-87fe-79b10fb21924'),
('5993ff82-20b0-47ad-ad5d-71a67389ca83', 'b322993b-f22f-4509-b6d9-1243c773ae4f', '51283587-2b29-4f49-87d3-3a2823975c11'),
('6b0cf4d2-8375-4ea6-9636-1eceb3106135', 'ea239938-8ae2-4e53-88ef-43ee71991c17', '30c2404c-a490-41a0-87fe-79b10fb21924'),
('792b0239-c725-4267-9ace-6dce3d4ab6fa', 'b7ff4bc0-1863-42d3-8e9a-106ea3890f2f', '51283587-2b29-4f49-87d3-3a2823975c11');

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
