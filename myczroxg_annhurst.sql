-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2025 at 09:38 AM
-- Server version: 8.0.44
-- PHP Version: 8.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myczroxg_annhurst`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'editor',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banned` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `role`, `created_at`, `name`, `avatar`, `password`, `banned`) VALUES
(1, 'admin@annhurst-gsl.com', 'admin', '2025-11-02 21:57:42', 'Administrator', NULL, '$2b$10$JJHyZZ/vQal34Pt5xRWIt.ykAhAKogNDynmFApkTJrJbb1BM.eSly', 0),
(2, 'dutibe@annhurst-gsl.com', 'admin', '2025-11-02 21:57:42', 'David', NULL, '$2b$10$YY/LB53hHkO5rXhDaM8a5uLJF9AjS2LWKX6I633CZxICiXVuTz33K', 0),
(3, 'deboraheidehen@gmail.com', 'viewer', '2025-11-02 21:57:42', 'Deborah', NULL, '$2b$10$LL1d5QQ/ccuWgW5nr6SCl.7C5JR3RAElyomB6c4cjFt.vtG.sKZ5y', 0),
(4, 'cereoah@annhurst-gsl.com', 'editor', '2025-11-25 15:15:50', 'Cleophas Ereoah', NULL, '$2b$10$EE06e3rRgVVyvAM8dfszhOsh2/mlEbARaT9wO2oUYOZFA7sJHvxbK', 0);

-- --------------------------------------------------------

--
-- Table structure for table `buses`
--

CREATE TABLE `buses` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bus_code` text,
  `driver` bigint DEFAULT NULL,
  `letter` tinyint(1) DEFAULT NULL,
  `e_payment` bigint DEFAULT NULL,
  `contract_date` date DEFAULT NULL,
  `agreed_date` date DEFAULT NULL,
  `date_collected` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `first_pay` date DEFAULT NULL,
  `initial_owe` bigint DEFAULT NULL,
  `deposited` bigint DEFAULT NULL,
  `t_income` bigint DEFAULT NULL,
  `plate_no` text,
  `coordinator` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `buses`
--

INSERT INTO `buses` (`id`, `created_at`, `bus_code`, `driver`, `letter`, `e_payment`, `contract_date`, `agreed_date`, `date_collected`, `start_date`, `first_pay`, `initial_owe`, `deposited`, `t_income`, `plate_no`, `coordinator`) VALUES
(1, '2025-09-03 15:53:51', 'L07', 3, 0, 60000, '2025-04-07', '2027-01-03', '2025-04-12', '2025-04-14', '2025-04-20', 5600000, 250000, 3450000, 'KTU 724 YK', 4),
(3, '2025-09-03 16:40:53', 'M01', 2, 0, 65000, '2025-06-20', '2027-03-14', '2025-07-11', '2025-07-14', '2025-07-20', 5863000, 300000, 783000, 'KTU 211 YL', 1),
(4, '2025-09-03 16:46:19', 'L08', 1, 0, 60000, '2025-04-07', '2027-01-03', '2025-04-12', '2025-04-14', '2025-04-20', 5600000, 250000, 1685000, 'KTU 725 YK', 4),
(5, '2025-09-09 19:14:13', 'TR', 5, 0, 50000, '2023-08-28', '2024-12-29', '2023-08-30', '2023-08-28', '2023-09-10', 3500000, 100000, 2825000, 'GGE 257 YH', 2),
(6, '2025-09-09 19:15:53', 'I03', 4, 0, 50000, '2024-10-04', '2025-11-30', '2024-10-04', '2024-10-13', '2024-11-03', 2400000, 0, 1820000, 'GGE 413 YH', 4),
(7, '2025-09-09 20:23:13', 'J03', 6, 0, 50000, '2025-02-17', '2025-12-07', '2025-02-18', '2025-02-27', '2025-03-02', 2000000, 0, 1350000, 'KRD 464 YH', 4),
(8, '2025-09-09 20:24:15', 'J09', 7, 0, 40000, '2024-10-05', '2026-07-03', '2024-08-26', '2024-08-26', '2024-09-01', 2000000, 0, 1845000, 'FST 212YH', 3),
(9, '2025-09-09 20:25:45', 'K02', 8, 0, 40000, '2024-10-04', '2026-01-11', '2024-10-04', '2024-10-13', '2024-10-20', 2670000, 100000, 1940000, 'LSD 536 YJ', 1),
(10, '2025-09-09 20:26:22', 'K04', 9, 0, 50000, '2025-05-08', '2026-03-12', '2025-05-10', '2025-05-25', '2025-05-25', 2000000, 0, 800000, 'EKY 410YJ', 1),
(11, '2025-09-09 20:27:04', 'K05', 10, 0, 50000, '2025-05-11', '2026-03-23', '2025-05-11', '2025-05-18', '2025-05-19', 2300000, 0, 800000, 'LSD 537 YJ', 3),
(12, '2025-09-09 20:27:39', 'K06', 11, 0, 50000, '2024-01-31', '2025-10-26', '2024-02-02', '2024-02-05', '2024-02-10', 3700000, 150000, 3430000, 'LSD 882YJ', 1),
(13, '2025-09-09 20:28:17', 'K07', 12, 0, 50000, '2025-01-13', '2025-11-16', '2025-01-21', '2025-01-26', '2025-02-03', 2200000, 100000, 1700000, 'LSD 881YJ', 1),
(14, '2025-09-09 20:28:58', 'K08', 13, 1, 70000, '2025-02-07', '2025-12-07', '2025-02-07', '2025-02-10', '2025-02-23', 2200000, 100000, 1520000, 'FKJ 142YJ', 4),
(15, '2025-09-09 20:29:29', 'K09', 14, 1, 60000, '2024-01-25', '2025-11-09', '2024-02-19', '2024-02-19', '2024-02-26', 3700000, 150000, 3390000, 'FKJ 141YJ', 1),
(16, '2025-09-09 20:30:06', 'K10', 15, 0, 40000, '2024-03-08', '2025-12-07', '2024-03-11', '2024-03-12', '2024-03-17', 3700000, 125000, 3235000, 'FST 576YJ', 4),
(17, '2025-09-09 20:30:41', 'K11', 16, 1, 55000, '2024-03-11', '2025-12-14', '2024-03-11', '2024-03-12', '2024-03-18', 3700000, 125000, 3219000, 'FST 579YJ', 1),
(18, '2025-09-09 20:31:08', 'K12', 17, 1, 80000, '2025-02-07', '2025-12-07', '2025-02-07', '2025-02-10', '2025-02-17', 2200000, 100000, 1500000, 'FST 578YJ', 3),
(19, '2025-09-09 20:31:40', 'K13', 18, 0, 40000, '2024-03-09', '2025-11-16', '2024-03-09', '2024-03-11', '2024-03-17', 3600000, 150000, 3270000, 'FST 581YJ', 3),
(20, '2025-09-11 10:01:04', 'K14', 19, 1, 50000, '2024-03-09', '2025-11-16', '2024-03-09', '2024-03-11', '2024-03-18', 3600000, 150000, 3220000, 'FST 580YJ', 1),
(21, '2025-09-11 10:35:29', 'K15', 20, 0, 50000, '2025-01-23', '2025-12-21', '2025-01-27', '2025-02-03', '2025-02-10', 2600000, 100000, 1600000, 'FST 686YJ', 1),
(22, '2025-09-11 10:54:45', 'K16', 21, 0, 50000, '2024-03-01', '2025-12-21', '2024-04-05', '2024-04-08', '2024-04-15', 3600000, 150000, 3090000, 'FST 685YJ', 1),
(23, '2025-09-11 11:02:00', 'K17', 22, 0, 40000, '2024-04-19', '2026-01-18', '2024-04-23', '2024-04-24', '2024-04-29', 3700000, 150000, 3045000, 'AGL 52YJ', 1),
(24, '2025-09-11 11:05:54', 'K18', 23, 0, 40000, '2024-04-19', '2026-01-04', '2024-04-24', '2024-04-25', '2024-04-29', 3600000, 150000, 2765000, 'AGL 50YJ', 1),
(25, '2025-09-11 11:09:33', 'L01', 24, 0, 60000, '2025-02-13', '2026-11-22', '2025-02-14', '2025-02-17', '2025-02-23', 5700000, 250000, 1990000, 'MUS 950YH', 4),
(26, '2025-09-11 11:12:17', 'L02', 25, 0, 60000, '2025-02-09', '2026-11-15', '2025-02-09', '2025-02-10', '2025-02-15', 5600000, 249999, 2050000, 'MUS 949YH', 3),
(27, '2025-09-11 11:15:16', 'L03', 26, 0, 60000, '2025-03-03', '2026-12-20', '2025-03-13', '2025-03-17', '2025-03-23', 5700000, 250000, 1750000, 'KTU 720YK', 3),
(28, '2025-09-11 11:17:56', 'L04', 27, 0, 60000, '2025-02-14', '2026-12-09', '2025-03-14', '2025-02-17', '2025-03-23', 5600000, 250000, 1750000, 'KTU 721YK', 4),
(29, '2025-09-11 11:25:52', 'L05', 28, 0, 60000, '2025-03-03', '2026-12-20', '2025-03-14', '2025-03-17', '2025-03-23', 5700000, 250000, 1750000, 'KTU 722YK', 3),
(30, '2025-09-11 11:29:16', 'L06', 29, 0, 60000, '2025-03-03', '2026-12-09', '2025-03-14', '2025-02-17', '2025-03-23', 5600000, 250000, 1750000, 'KTU 723YK', 3),
(31, '2025-09-11 11:33:50', 'L09', 30, 0, 60000, '2025-03-03', '2026-12-20', '2025-03-14', '2025-03-17', '2025-03-23', 5700000, 250000, 1570000, 'SMK 834YK', 3),
(32, '2025-09-11 11:37:15', 'L10', 31, 0, 60000, '2025-03-03', '2027-03-07', '2025-06-01', '2025-03-16', '2025-06-08', 5700000, 250000, 1070000, 'KRD 741 YL', 3),
(33, '2025-09-11 11:39:56', 'L11', 32, 0, 60000, '2025-03-03', '2027-03-07', '2025-05-31', '2025-06-02', '2025-06-08', 5700000, 250000, 1070000, 'EKY 427 YL', 3),
(34, '2025-09-11 11:44:27', 'L12', 33, 0, 60000, '2025-05-04', '2027-03-07', '2025-05-31', '2025-06-02', '2025-06-08', 5700000, 250000, 1070000, 'KRD 740 YL', 3),
(35, '2025-09-11 11:54:50', 'L13', 34, 0, 60000, '2025-03-30', '2027-03-07', '2025-03-31', '2025-06-02', '2025-06-08', 5700000, 250000, 1070000, 'EKY 428 YL', 4),
(36, '2025-09-11 11:57:58', 'L14', 35, 0, 60000, '2025-05-25', '2027-03-07', '2025-05-31', '2025-06-02', '2025-06-08', 5700000, 250000, 1070000, 'KRD 742 YL', 4),
(37, '2025-09-11 12:16:25', 'L15', 36, 0, 65000, '2025-06-01', '2027-02-07', '2025-06-01', '2025-06-02', '2025-06-26', 5900000, 400000, 1090000, 'KRD 739 YL', 4),
(38, '2025-09-11 12:20:39', 'L16', 37, 0, 60000, '2025-05-31', '2027-02-21', '2025-05-31', '2025-06-02', '2025-06-08', 5600000, 250000, 1070000, 'KRD 743 YL', 3),
(39, '2025-09-11 12:24:54', 'L17', 38, 0, 60000, '2025-05-31', '2027-02-21', '2025-06-02', '2025-06-02', '2025-06-08', 5600000, 250000, 1070000, 'KRD 744 YL', 4),
(40, '2025-09-11 12:27:31', 'L18', 39, 0, 65000, '2025-05-31', '2027-01-31', '2025-06-01', '2025-06-02', '2025-06-08', 5900000, 300000, 1185000, 'EKY 429 YL', 4),
(41, '2025-09-11 12:30:31', 'M02', 40, 0, 65000, '2025-06-13', '2027-03-21', '2025-07-11', '2025-07-14', '2025-07-20', 6000000, 300000, 845000, 'KTU 213 YL', 1),
(42, '2025-09-11 12:32:47', 'M03', 41, 0, 65000, '2025-06-26', '2027-04-11', '2025-08-01', '2025-08-04', NULL, 6000000, 300000, 625000, 'AKD 885 YL', 3),
(43, '2025-09-12 09:19:55', 'M04', 42, 0, 65000, '2025-06-05', '2027-03-21', '2025-07-14', '2025-07-14', '2025-07-18', 6000000, 300000, 820000, 'KTU 210 YL', 1),
(44, '2025-09-12 09:22:20', 'M05', 43, 0, 65000, '2025-06-04', '2027-04-11', '2025-07-26', '2025-07-28', '2025-08-03', 6000000, 300000, 665000, 'KTU 172 YL', 3),
(45, '2025-09-12 09:25:07', 'M06', 44, 0, 65000, '2025-03-27', '2027-03-28', '2025-07-26', '2025-07-28', '2025-07-20', 6000000, 300000, 795000, 'KTU 209 YL', 3),
(46, '2025-09-12 09:27:35', 'M07', 45, 0, 65000, '2025-06-30', '2027-03-28', '2025-07-26', '2025-07-28', '2025-08-02', 6000000, 300000, 665000, 'KTU 173 YL', 3),
(47, '2025-09-12 09:29:51', 'M08', 46, 0, 65000, '2025-06-23', '2027-04-11', '2025-07-26', '2025-07-28', '2025-08-02', 6000000, 300000, 665000, 'KTU 171 YL', 4),
(48, '2025-09-12 09:32:39', 'M09', 47, 0, 65000, '2025-06-23', '2027-04-11', '2025-07-26', '2025-07-28', '2025-08-01', 6000000, 300000, 665000, 'KTU 144 YL', 4),
(49, '2025-09-12 09:35:40', 'M10', 48, 0, 65000, '2025-06-04', '2027-03-14', '2025-07-11', '2025-07-14', '2025-07-20', 5900000, 300000, 820000, 'KTU 212 YL', 1),
(50, '2025-09-12 09:37:42', 'M11', 49, 0, 65000, '2025-07-02', '2027-04-04', '2025-08-01', '2025-08-04', '2025-08-10', 5900000, 300000, 625000, 'AKD 887 YL', 4),
(51, '2025-09-12 09:40:27', 'M12', 50, 0, 65000, '2025-06-30', '2027-08-09', '2025-08-30', '2025-09-07', '2025-09-07', 6000000, 300000, 365000, 'AKD 276 YL', 4),
(52, '2025-09-12 09:42:48', 'M13', 51, 0, 65000, '2025-06-30', '2027-03-28', '2025-07-26', '2025-07-28', '2025-08-03', 5900000, 300000, 665000, 'KTU 170 YL', 4),
(53, '2025-09-12 09:44:43', 'M15', 52, 0, 65000, '2025-07-21', '2027-04-11', '2025-08-01', '2025-08-04', '2025-08-10', 6000000, 300000, 625000, 'AKD 886 YL', 3),
(54, '2025-09-12 09:49:55', 'M17', 53, 0, 65000, '2025-07-07', '2027-05-09', '2025-08-31', '2025-09-01', '2025-09-08', 5900000, 300000, 355000, 'AKD 278 YL', 1),
(55, '2025-09-12 09:52:26', 'M18', 54, 0, 65000, '2025-06-20', '2027-03-28', '2025-07-26', '2025-07-28', '2025-09-03', 5900000, 300000, 665000, 'KTU 169 YL', 1),
(56, '2025-10-09 11:41:54', 'N04', 57, 0, 65000, '2025-09-30', '2027-02-04', '2025-09-27', '2025-09-28', '2025-10-05', 6500000, 300000, 365000, 'AKD 922 YL', 4),
(57, '2025-10-10 12:36:53', 'N01', 55, 0, 65000, '2025-09-12', '2027-03-05', '2025-08-30', '2025-09-07', '2025-10-05', 6000000, 300000, 3650000, 'AKD 235 YL', 4),
(58, '2025-10-10 12:41:36', 'N02', 56, 0, 65000, '2025-08-23', '2027-03-05', '2025-08-30', '2025-09-07', '2025-10-05', 6500000, 300000, 0, 'AKD 913 YL', 3),
(59, '2025-10-10 12:44:45', 'N07', 58, 0, 65000, '2025-08-23', '2027-05-03', '2025-08-30', '2025-09-07', '2025-10-05', 6000000, 65000, 365000, 'AKD 249 YL', 1),
(60, '2025-10-10 12:49:04', 'N13', 59, 0, 65000, '2025-09-27', '2027-03-03', '2025-08-30', '2025-09-07', '2025-10-05', 6000000, 299999, 365000, 'AKD 930 YL', 4),
(61, '2025-10-10 12:53:24', 'N15', 60, 0, 65000, '2025-08-30', '2027-02-07', '2025-08-30', '2025-09-07', '2025-09-07', 6000000, 300000, 699000, 'AKD 277 YL', 3),
(62, '2025-12-03 11:28:54', 'N14', 61, 0, 65000, '2025-07-21', '2027-07-25', '2025-11-12', '2025-11-13', '2025-11-18', 6000000, 300000, 395000, 'BDG 761 YL', 4);

-- --------------------------------------------------------

--
-- Table structure for table `bus_status_history`
--

CREATE TABLE `bus_status_history` (
  `id` bigint NOT NULL,
  `bus` bigint NOT NULL,
  `status` text NOT NULL,
  `note` text,
  `changed_by` bigint DEFAULT NULL,
  `changed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bus_status_history`
--

INSERT INTO `bus_status_history` (`id`, `bus`, `status`, `note`, `changed_by`, `changed_at`) VALUES
(1, 14, 'Letter Issued', 'Old Letter', 2, '2025-12-03 21:29:01'),
(2, 18, 'Letter Issued', 'Old letter', 2, '2025-12-03 21:29:50'),
(3, 15, 'Letter Issued', 'Old letter', 2, '2025-12-03 21:30:34'),
(4, 17, 'Letter Issued', 'Old letter', 2, '2025-12-03 21:31:02'),
(5, 20, 'Letter Issued', 'Old letter', 2, '2025-12-03 21:31:41'),
(6, 5, 'Completed', 'Payment Completed on 02/12/2025', 2, '2025-12-03 22:02:14'),
(7, 17, 'Completed', 'Payment Completed on 24/11/2025', 2, '2025-12-03 22:03:38'),
(8, 20, 'Completed', 'Payment completed at 14/11/2025', 2, '2025-12-03 22:05:43'),
(9, 15, 'Completed', 'Payment Completed 19/10/2025', 2, '2025-12-03 22:08:37');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `coordinator` bigint DEFAULT NULL,
  `driver` bigint DEFAULT NULL,
  `subject` bigint DEFAULT NULL,
  `transaction_date` date DEFAULT NULL,
  `message` text,
  `is_starred` tinyint(1) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT NULL,
  `attachment` text,
  `sender` text,
  `receiver` text,
  `sender_email` text,
  `receiver_email` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `created_at`, `coordinator`, `driver`, `subject`, `transaction_date`, `message`, `is_starred`, `is_read`, `attachment`, `sender`, `receiver`, `sender_email`, `receiver_email`) VALUES
(1, '2025-09-19 11:10:53', 4, 1, 1, NULL, 'When will you pay?', NULL, 1, NULL, 'Cleophas', 'TAIWO TOLA SEUN', 'ereoahcleophas@gmail.com', 'taiwo@annhurst-ts.com'),
(2, '2025-09-19 11:15:46', 4, 3, 4, NULL, 'I have gear issue, that is why i will delay payment', NULL, 1, NULL, 'ESSIEN ELIZABETH', 'Cleophas', 'essien@annhurst-ts.com', 'ereoahcleophas@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` text,
  `email` text,
  `phone` text,
  `company` text,
  `subject` text,
  `message` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coordinators`
--

CREATE TABLE `coordinators` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` json DEFAULT NULL,
  `user_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `banned` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coordinators`
--

INSERT INTO `coordinators` (`id`, `created_at`, `email`, `password`, `name`, `avatar`, `phone`, `user_id`, `banned`) VALUES
(1, '2025-11-02 21:57:41', 'chuksmanny97@gmail.com', '$2b$10$C.SmZ1kgoDckWZcyyzn5oe92q2W4yyxb4JDDCSoDfz0wWmrDVZ7qm', 'Emmanuel', NULL, '[\"09054257289\"]', '8f05ba64-005d-4c56-b426-3badd4596c0f', 0),
(2, '0000-00-00 00:00:00', 'abisomukailaabiso@gmail.com', '$2b$10$9EE9HssIFrTnPNhX/0APt.RcJiB9jGEefpyO.2Dk61GGAt46gxEme', 'Mukaila', NULL, '[\"09063750685\"]', '646ee4e2-f49f-4789-bb75-0bec72a64d60', 0),
(3, '2025-11-02 21:57:41', 'rolandogbaisi75@gmail.com', '$2b$10$g/ymd7RjN3EfZxM4KzFp6uGLqBEo.OoLtLZ7mkbuQgZJxBIBH1JTe', 'Roland', NULL, '[\"08122574825\"]', 'd74e5de5-02e4-4bd1-9249-92ca931012f5', 0),
(4, '2025-11-02 21:57:41', 'ereoahcleophas@gmail.com', '$2b$10$PlWiI/EeLf6dQazDGXS5OezLMPZmkDAG79ySRPnVvC859LvNaOuem', 'Cleophas', NULL, '[\"07065226741\"]', '1a145b44-0dc3-41d1-b024-36fbca710578', 0);

-- --------------------------------------------------------

--
-- Table structure for table `co_subject`
--

CREATE TABLE `co_subject` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nin` bigint DEFAULT NULL,
  `phone` json DEFAULT NULL,
  `address` json DEFAULT NULL,
  `kyc` tinyint(1) DEFAULT '0',
  `banned` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `created_at`, `email`, `password`, `name`, `avatar`, `dob`, `nin`, `phone`, `address`, `kyc`, `banned`) VALUES
(5, '2025-11-02 21:57:42', 'kenedy@annhurst-ts.com', '$2b$10$T30BHnAohpZFLybXiBkGIeZSsISp4BAlWvDDwEDNsGtNvQcJRzPdu', 'Kenedy Idialu', NULL, '1990-02-09', 12345678901, '[\"09016289173\"]', '[\"Mama Bar street\", \"Itedo Lekki Lagos Nigeria\"]', 0, 0),
(6, '2025-11-02 21:57:42', 'ismaheel@annhurst-ts.com', '$2b$10$ytVGsE.veAos7smJvrcFouPeg1B13cEMTmbJICIWnGK3vGMdWxI1G', 'Ismaheel Lawal', NULL, '1990-01-09', 12345678901, '[\"08114660214\"]', '[\"30 Lekki farm road\", \"After farm City\", \"Lekki phase 1\", \"Lagos Nigeria\"]', 0, 0),
(7, '2025-11-02 21:57:42', 'bashiru@annhurst-ts.com', '$2b$10$JG0GdLc0APhyHaiIfl/bWOkpF8Z./lRNlEC6bF6kazHnCYUqT14RO', 'Bashiru Kunmi Sunday', NULL, '1990-05-09', 12345678901, '[\"08037397161\"]', '[\"HSE 2\", \"Okunusi Mopo off Oyinbo Road\", \"Ajah Lagos Nigeria\"]', 0, 0),
(8, '2025-11-02 21:57:43', 'ayodele@annhurst-ts.com', '$2b$10$A8ZeF9jpoE0Rz0N7zwMOqeSJOlOtK3H9z8qgLLoICDHl9TEuQfhOC', 'Ayodele Rasheed', NULL, '1990-09-09', 12345678901, '[\"08112756959\"]', '[\"Ojo-Oto Bulala bus stop Okun Mopo Abraham Adesanya Ajah Lagos Nigeria\"]', 0, 0),
(9, '2025-11-02 21:57:43', 'sanusi@annhurst-ts.com', '$2b$10$jfEljuKcHwpaOs1lUDkuveEhO/lrYql5iY4VdHvK7iia2lGFu1pIK', 'Sanusi Taofeek Adesina', NULL, '1989-05-09', 12345678901, '[\"07062771436\"]', '[\"Plot 2\", \"Layi yusuf crescent\", \"off admiralty way lekki phase 1 Lagos Nigeria\"]', 0, 0),
(10, '2025-11-02 21:57:43', 'abdullahi@annhurst-ts.com', '$2b$10$z4BzC2qJXHOw/n8prNjZ2.l3o8DbvJh1p3d2UdZEKmEEmGitctoeG', 'Abdullahi Yusuf', NULL, '1990-01-09', 12345678901, '[\"07089670810\"]', '[\"1\", \"Saka Oluguna orile maroko\", \"Ajah Lagos Nigeria\"]', 0, 0),
(11, '2025-11-02 21:57:43', 'aderemi@annhurst-ts.com', '$2b$10$agIr7vNsT39/elGojQCwTeb8vipFfnrc8iK7VSt5UMg.kwkG7c3vm', 'Aderemi Rufai Safiu', NULL, '1990-10-09', 12345678901, '[\"08119946144\"]', '[\"Ifedapo street\", \"Baba nla lekki farm Lagos Nigeria\"]', 0, 0),
(12, '2025-11-02 21:57:43', 'fadare@annhurst-ts.com', '$2b$10$sVpCsIydqttI1AO0q/gIPenyeoOK6V2RZG5U1GD40njqxAs3QPScS', 'Fadare Sarafadeen Adewale', NULL, '1990-12-09', 12345678901, '[\"08136194190\"]', '[\"11 Akilo Road\", \"Agege Ogba road\", \"Agege Lagos Nigeria\"]', 0, 0),
(13, '2025-11-02 21:57:43', 'adepoju@annhurst-ts.com', '$2b$10$KXwQDvC1a2bQ9SWiD1jNB.e7wygvrJzq4KwLiDQm.fKRpB4QnapJa', 'Adepoju Babatunde Adebowale', NULL, '1990-10-09', 12345678901, '[\"09138461046\"]', '[\"17 Temidire Ajaguro Imota Ikorodu Lagos Nigeria\"]', 0, 0),
(14, '2025-11-02 21:57:43', 'damola@annhurst-ts.com', '$2b$10$xW2My57TBXeySyPBHo92P.kfgPpEnG6TVTCV6xWvnk9zJMEEqJMhG', 'DAMOLA SHOWOBI MUMEEN', NULL, '1990-05-09', 12345678901, '[\"08030779806\"]', '[\"Back of poultry\", \"green house\", \"tipper garage bus stop\", \"eleko Lagos Nigeria\"]', 0, 0),
(15, '2025-11-02 21:57:43', 'kolajo@annhurst-ts.com', '$2b$10$Ms7dcFxA5TEJmcwvLMi7WuwNOG8XVDei7pkQtZqMQHCargBs80AQe', 'Kolajo Isaac', NULL, '1990-11-09', 12345678901, '[\"08033697112\"]', '[\"5\", \"Sanni Eleku street\", \"Awoyaya\", \"Ibeju Lekki Lagos Nigeria\"]', 0, 0),
(16, '2025-11-02 21:57:43', 'maliki@annhurst-ts.com', '$2b$10$hi24Sq58LjJ/GGtptnsNKuAkY6JW8VjzRpkKZWh/5/EIP0jqEy.jW', 'Maliki Simpa Yahaya', NULL, '1990-06-09', 12345678901, '[\"08070518881\", \"09130461493\"]', '[\"48\", \"TALABI STR\", \"OKE IJEBU ODONLA IKORODU\"]', 0, 0),
(17, '2025-11-02 21:57:43', 'hange@annhurst-ts.com', '$2b$10$1.Sv8xUxf6UdOSo2OQRzkuoCu3cQGsQl2vw7VUICZ6G3LT6RFyUFC', 'HANGE TERHEMEN BENJAMIN', NULL, '1990-04-09', 12345678901, '[\"08146923004\"]', '[\"6\", \"Oluwalogbon Oworonshoki Lagos Nigeria\"]', 0, 0),
(18, '2025-11-02 21:57:43', 'ajayi@annhurst-ts.com', '$2b$10$jmnA3f2Usw9P5NfGmmbcFOD6ZKtv0rsqPGXhGqiWCjBl7HmeVJ1NO', 'Ajayi Akorede Segun', NULL, '1990-12-09', 12345678901, '[\"08028316736\"]', '[\"21B Adedayo Adedeji street\", \"Abanje road\", \"IKOTUN Lagos Nigeria\"]', 0, 0),
(19, '2025-11-02 21:57:43', 'ridwan@annhurst-ts.com', '$2b$10$kGu9z/6wsPqZhaiV.1xb3OEY/4jp4ysOw1Syycro32gKdyzYM6do2', 'OLAMILEKAN RIDWAN', NULL, '1990-01-10', 12345678901, '[\"07065705493\"]', '[\"169 PRINCE ADEMOLA ROAD OFF ONIRU ESTATE\"]', 0, 0),
(20, '2025-11-02 21:57:43', 'abbas@annhurst-ts.com', '$2b$10$.Z1rTiCwyALwNr2QsyfT1eCIDYYW53Q.72Od1R7geDTWp52ihWsbC', 'ABBAS ABDULLAHI', NULL, '1990-07-24', 12345678901, '[\"08028453325\"]', '[\"7\", \"MOBIL ROAD\", \"AJAH\"]', 0, 0),
(21, '2025-11-02 21:57:43', 'livinus@annhurst-ts.com', '$2b$10$5HJLFyLYvOeUHBjycw6MzOaWZbRMUU.AdIwwUcyhsTPNlVvOHDNty', 'LIVINUS PETER AKWITAL', NULL, '1990-10-15', 12345678901, '[\"08113049993\"]', '[\"3/4\", \"ODO OGUN CLOSE OFF KEFFI OBALENDE\"]', 0, 0),
(22, '2025-11-02 21:57:44', 'olaoye@annhurst-ts.com', '$2b$10$xqQQMheFJn66gg586DZPyugDnWym7JmCbP7W7eejqlbDg2ogkVkhG', 'OLAOYE OLADEJI', NULL, '1990-12-16', 12345678901, '[\"07012298111\"]', '[\"PRIME OLAYINKA STR\", \"MOBILE ROAD\", \"AJAH\"]', 0, 0),
(23, '2025-11-02 21:57:44', 'balogun@annhurst-ts.com', '$2b$10$2vOkek.8TW8sS7mfEmAQ0ODVuAcqjINsBrJ5T0w8fQi7T41AAyJDq', 'OLARENWAJU YUSUF BALOGUN', NULL, '1990-05-13', 12345678901, '[\"08147117310\"]', '[\"10 AGUGI AJIREN LEKKI LAGOS NIGERIA\"]', 0, 0),
(24, '2025-11-02 21:57:44', 'laitan@annhurst-ts.com', '$2b$10$Grdoms/O5jqCDqQMdkXzW.polpLfrxFzaoamzYcVhVTT.z9.2yHdK', 'LAITAN TAJUDEEN SHOWOBI', NULL, '1990-02-22', 12345678901, '[\"08028871638\"]', '[\"18\", \"ALPHA BEACH\", \"NEW ROAD LEKKI\"]', 0, 0),
(25, '2025-11-02 21:57:44', 'muritala@annhurst-ts.com', '$2b$10$ObW4pzvpvVY9bLTj65dBNuQKWs/l5gwTeZDqZ6kxdAfKxAo.6GMUO', 'MURITALA AKANDE ORI-ADE', NULL, '1990-08-08', 12345678901, '[\"09075800613\"]', '[\"3\", \"ATUNRASE ALAKUKO AGBADO\"]', 0, 0),
(26, '2025-11-02 21:57:44', 'abini@annhurst-ts.com', '$2b$10$KkbgAAFuG316hMNcNwwNoOODD60Uj4hlNRUb.XXnnA59gS2ERBoka', 'MONDAY ABINI AJAYI', NULL, '1990-09-17', 12345678901, '[\"09067083030\", \"07060853526\"]', '[\"54\", \"ISALE IJEBU STREET\", \"AJAH LAGOS\"]', 0, 0),
(27, '2025-11-02 21:57:44', 'ihedigbo@annhurst-ts.com', '$2b$10$7XIFRk0toR5xhYU/Mksw6e/wvpz.ibIx13Ui3/6sn/UogRjEP4rQ6', 'JOSHUA IHEDIGBO', NULL, '1990-09-17', 12345678901, '[\"09125699739\"]', '[\"ROAD 6\", \"RIO GARDEN ESTATE ARAROMI\"]', 0, 0),
(28, '2025-11-02 21:57:44', 'samson@annhurst-ts.com', '$2b$10$jolGSNFELs6rkb28MV3JDOho9SlZ.tuP2DR.KFz8wUauQeJzywSk2', 'MONDAY SAMSON UDOETETE', NULL, '1990-12-06', 12345678901, '[\"08141517792\"]', '[\"8\", \"OWOPEJO CLOSE\", \"SHAPATI IBEJU LEKKI\"]', 0, 0),
(29, '2025-11-02 21:57:44', 'aderibigbe@annhurst-ts.com', '$2b$10$YV4QrwM5V7sYjUI9bR1uVuJVTQqvIsKkvAr9MI23J9AOlXJI19o4e', 'LANRE ADERIBIGBE', NULL, '1990-04-29', 12345678901, '[\"08038295709\"]', '[\"12\", \"BALEGI AVENUE\", \"IGODO MAGBORO OGUN STATE\"]', 0, 0),
(30, '2025-11-02 21:57:44', 'sodiq@annhurst-ts.com', '$2b$10$SNofr0rojmAo3up5FAo35eZ9hbh8wnKloRpV4fY9FOFVwHJPaba/W', 'MOHAMMED SODIQ', NULL, '1990-07-08', 12345678901, '[\"08080289082\"]', '[\"6\", \"FOREST OFF IGBOEFON BUS STOP LEKKI\"]', 0, 0),
(31, '2025-11-02 21:57:44', 'wasiu@annhurst-ts.com', '$2b$10$IY1fHikckgueDeiwVcErTujqgabOOqXEpVlsD124Xq3iSZ7Z2c1Eq', 'WASIU ADELEKE', NULL, '1990-11-25', 12345678901, '[\"09122515577\"]', '[\"6\", \"EJIO STREET\", \"ODONLA\", \"IKORODU\", \"LAGOS\"]', 0, 0),
(32, '2025-11-02 21:57:44', 'azeez@annhurst-ts.com', '$2b$10$YfbkiHQTKOHSKEHmFWiY4.9Yf7EJjZiiU2v.D87FmIyAnWUgBUwKm', 'IBRAHIM ABDULAZEEZ ALIU', NULL, '1990-04-24', 12345678901, '[\"08037921475\"]', '[\"2\", \"OYALEYE CLOSE\", \"ALIMOSHO\"]', 0, 0),
(33, '2025-11-02 21:57:44', 'ayandele@annhurst-ts.com', '$2b$10$Zf305TKRlii5OZe8nZaTjuUBfnQiMkKhPJ9VUpHZj0AO2HFbKuzi2', 'AYANDELE YUSUF OLAREWAJU', NULL, '1990-11-06', 12345678901, '[\"09071221212\"]', '[\"13\", \"JIDE AWAWO STREET\", \"OFF WAZOBIA BUS STOP\", \"IKOTUN\", \"LAGOS\"]', 0, 0),
(34, '2025-11-02 21:57:44', 'sylvanus@annhurst-ts.com', '$2b$10$GwiRXZURa28i8ANLWLwIV.LwS3WbX5mwqp7SMCsK05CZECSKLAThe', 'VICTOR SYLVANUS UMOH', NULL, '1990-11-12', 12345678901, '[\"09016038311\"]', '[\"6\", \"MUNIRU PAPA STREET\", \"ALAGUNTAN\", \"AJAH\"]', 0, 0),
(35, '2025-11-02 21:57:45', 'hamzat@annhurst-ts.com', '$2b$10$s/xPU3jP552xlM9AvhpIveKDi6HAzeWYY30FIITGTs0LBnrOF9jve', 'HAMZAT IBRAHIM OLAMILEKAN', NULL, '1990-11-15', 12345678901, '[\"08118209670\", \"08079750783\"]', '[\"5\", \"ABULE PARAPO\", \"OFF DEEPER LIFE\", \"AWOYAYA\", \"IBEJU LEKKI\"]', 0, 0),
(36, '2025-11-02 21:57:45', 'okon@annhurst-ts.com', '$2b$10$NSEPIETqtw7HvV5cSFlWeeWhVMWWnVfhS6NCc3vGuaG1sAOgaLgKm', 'EFFIONG ESSIEN OKON', NULL, '1990-08-05', 12345678901, '[\"08023497731\"]', '[\"12\", \"PEDRIS STREET\", \"ILAJE\", \"MOBIL ROAD\", \"AJAH\"]', 0, 0),
(37, '2025-11-02 21:57:45', 'bidemi@annhurst-ts.com', '$2b$10$QoSyKn0XjwMNVNsWFtTDUOfhLT/.xnUJBmstKYEF5MJigpAQTauQe', 'OBIYELE TUNDE BIDEMI', NULL, '1990-09-27', 12345678901, '[\"09035378114\"]', '[\"24\", \"BASHORUN JUNCTION\", \"IGBOGBO\", \"IKORODU\", \"LAGOS\"]', 0, 0),
(38, '2025-11-02 21:57:45', 'kodi@annhurst-ts.com', '$2b$10$gpN/9Q9IwUtpkwauPNz8Vu1AHWmnO5JFrkJyfrQusogZzCER6/nw6', 'KODI DONALD', NULL, '1990-02-21', 12345678901, '[\"08038160136\", \"07032151313\"]', '[\"48\", \"OFFICE DEPOT\", \"MAJEK\", \"IBEJU LEKKI\", \"LAGOS\"]', 0, 0),
(39, '2025-11-02 21:57:45', 'ndimele@annhurst-ts.com', '$2b$10$haTfI5GbioUS7vNifE7aFuqkqIOudRrh0oltvSKtXBcj1cu4NudjK', 'NDIMELE PRECIOUS OLUCHI', NULL, '1990-04-26', 12345678901, '[\"08069602794\"]', '[\"10\", \"OSEREN KOJO GANDER STREET\", \"OFF ADEBA BUS STOP\", \"LAKOWE\"]', 0, 0),
(40, '2025-11-02 21:57:45', 'okem@annhurst-ts.com', '$2b$10$E6Ca2HgS1vQMpif73rtNc.EEv3DJQVuB2ZVebvsBzKKF1N1UoWkfC', 'DANIEL OKEM UGBEM', NULL, '1990-11-20', 12345678901, '[\"08113401089\"]', '[\"2A\", \"OKOAWO STREET\", \"OPPOSITE EKO HOTEL\", \"ROUNDABOUT\", \"VI\"]', 0, 0),
(41, '2025-11-02 21:57:45', 'alonge@annhurst-ts.com', '$2b$10$VYyiI5mqrugTTZ5U6vNs2OWTZmI2AsIAMI83DzThsB8G6zXOgWBp6', 'DARE JACOB ALONGE', NULL, '1990-11-26', 12345678901, '[\"08062741343\"]', '[\"59\", \"ADESAN ROAD\", \"OFF MADAM POULTRY BUS STOP\", \"MOWE\", \"OGUN STATE\"]', 0, 0),
(42, '2025-11-02 21:57:45', 'oshualale@annhurst-ts.com', '$2b$10$z39PnFKI6rHq9o83vdDowOWUOoZC.AmtXM/WBxYefuQxCOzOSaQFm', 'BASHIRU TAIWO OSHUALALE', NULL, '1990-06-13', 12345678901, '[\"09125557316\"]', '[\"71\", \"HAMMED STREET\", \"MOPO AKINLADE\", \"ABRAHAM ADESANYA\"]', 0, 0),
(43, '2025-11-02 21:57:45', 'ege@annhurst-ts.com', '$2b$10$c1AOGZMR/CwDrYRejDe2H.gJhKLnlsoLirAbsi.zk6grdBrlQ8CFC', 'OLADIMEJI KAZEEM EGE', NULL, '1990-08-05', 12345678901, '[\"09026787560\"]', '[\"4\", \"LAYI YUSUF STREET\", \"OFF ADMIRALTY WAY\", \"LEKKI PHASE 1\"]', 0, 0),
(44, '2025-11-02 21:57:45', 'sabo@annhurst-ts.com', '$2b$10$30/SHgz79L/.n1PHQOkMc.hqkEVENLy841fHAcFYxLAWDmFHfgqIa', 'BENNY SABO FAVOUR SIMON', NULL, '1990-04-29', 12345678901, '[\"07072805008\", \"09127226095\"]', '[\"1\", \"PATRICK OKNJE\", \"GBARADA NNPC BUS STOP\", \"IBEJU LEKKI\"]', 0, 0),
(45, '2025-11-02 21:57:45', 'godspower@annhurst-ts.com', '$2b$10$5WduX3eY4ZtTzdGJNT.nzeLIYCrJyGsN1hs2ojVn0/WJT3wHDGNne', 'GODSPOWER SUNNY OGAGA', NULL, '1990-11-13', 12345678901, '[\"08037027177\"]', '[\"1\", \"AL-ITAJJAJ STREET\", \"OFF PLANTINUM WAY\", \"JAKANDE FIST GATE\", \"LEKKI\"]', 0, 0),
(46, '2025-11-02 21:57:45', 'osunjimi@annhurst-ts.com', '$2b$10$TD4sdDDZhyE460MvvAfoD.iIl.tLtxZimt5bwey/1vJSDTnPFeDJW', 'LAWRENCE ADEBAYO OSUNJIMI', NULL, '1990-09-02', 12345678901, '[\"08036005363\"]', '[\"6\", \"HOTEL STREET\", \"IGBOJIYA ROAD\", \"MOLETE TOWN\", \"IBEJU LEKKI\"]', 0, 0),
(47, '2025-11-02 21:57:45', 'ogunloye@annhurst-ts.com', '$2b$10$ptQk/zNASMBeWRYoEakjwuWNnoZ8.bf8UxDNJe8s1PboRSEVM1HkO', 'OLALEKAN WAHAB OGUNLOYE', NULL, '1990-11-20', 12345678901, '[\"07061432081\"]', '[\"2\", \"ORIKUTA STREET\", \"OGIJO\", \"IKORODU\"]', 0, 0),
(48, '2025-11-02 21:57:46', 'oshati@annhurst-ts.com', '$2b$10$oiBwth5/qijXOrBL8VI0yut6ySS8F5x6WAKSV5RaVCXi4UARE/iZe', 'IMOLE EMMANUEL OSHATI', NULL, '1990-12-11', 12345678901, '[\"09051310413\"]', '[\"3\", \"VFC CLOSE\", \"OFF STILL WATER\", \"IKATE ELEGUSHI\", \"LEKKI\"]', 0, 0),
(49, '2025-11-02 21:57:46', 'tsunday@annhurst-ts.com', '$2b$10$LimoY4D0bHgqBeqPWngQTOLeYCxE7d82KhbF5pHGkrdWv9nXCN9yi', 'EMMANUEL TUNDE SUNDAY', NULL, '1990-10-30', 12345678901, '[\"08104391373\"]', '[\"BLOCK 15\", \"FLAT 4\", \"ROAD 401\", \"ABRAHAM ADESANYA ESTATE\", \"AJAH\"]', 0, 0),
(50, '2025-11-02 21:57:46', 'adeniji@annhurst-ts.com', '$2b$10$vnz3ARhoqrhz7/jrIlL/7O.rkUmOJsGfDMKU0Z0Ke3APvYxCphXwC', 'ADEDEJI FEMI ADENIJI', NULL, '1990-12-11', 12345678901, '[\"08127332045\"]', '[\"57\", \"BAALE AYIETORO\", \"OFF AYETORO BOUNDARY\", \"AJEGUNLE\", \"APAPA\"]', 0, 0),
(51, '2025-11-02 21:57:46', 'etimothy@annhurst-ts.com', '$2b$10$rtTd9RzY2tNnXOv0O1SPN.PQhghEPoSF22YGyCr7EOl0cMklXbY82', 'EMMANUEL TIMOTHY', NULL, '1990-09-24', 12345678901, '[\"09163294627\"]', '[\"23\", \"ISALE IJEBU STREET\", \"AJAH\", \"LAGOS\"]', 0, 0),
(52, '2025-11-02 21:57:46', 'aminat@annhurst-ts.com', '$2b$10$tzywSZmgpOD/CX6n11GgGeLNUqiDqcV20nlx7P9n0dRc/cDroAd.C', 'AMINAT OMOWUMI OYINLOLA', NULL, '1990-06-20', 12345678901, '[\"09154606854\"]', '[\"24\", \"IFA MOROTI STREET\", \"ADDO ROAD\", \"AJAH\"]', 0, 0),
(53, '2025-11-02 21:57:46', 'ogar@annhurst-ts.com', '$2b$10$NNA17W4Ob7JjKgm4CBoGAOS696VHKna0O4MPq9TAIFfJtpYZ2ewte', 'OGAR KELVIN OGBAJI', NULL, '1990-07-25', 12345678901, '[\"07032933029\"]', '[\"51\", \"ISALE IJEBU STREET\", \"OFF ALESH HOTEL\", \"AJAH\"]', 0, 0),
(54, '2025-11-02 21:57:46', 'umoru@annhurst-ts.com', '$2b$10$f8RHEz4Mm3gsYs0pE2L1JeowthorUg4E.K23pU/k7r6Qm2PdIrFGi', 'ELIJAH JUNIOR UMORU', NULL, '1990-10-23', 12345678901, '[\"07045419890\"]', '[\"13\", \"JEHOVAH WITHNESS\", \"OKOLOMI\", \"OFF LEKKI EPE EXPRESS WAY\", \"BOGIJE\"]', 0, 0),
(55, '2025-11-02 21:57:46', 'adebimpe@annhurst-ts.com', '$2b$10$bHbJgMMYaiIxHvkofOSjUu5m/pgwrYOt/s3Dk/fShE6b7PHtMKZwq', 'ADEBIMPE RUKAYAT ADEDIRAN', NULL, '1990-01-09', 12345678901, '[\"09054503143\"]', '[\"HAMMED BY COMPLEX\", \"OFF OKUN AJAH ROAD\", \"MOPO AKINLADE\"]', 0, 0),
(56, '2025-11-02 21:57:46', 'saheed@annhurst-ts.com', '$2b$10$4tCYfmJGbNrtQ7lNM1U.D.4U5jCmUXkpvSqsIHgKxVDRKgzI7E56y', 'SAHEED OWOLEMI OLAIDE', NULL, '1990-01-09', 12345678901, '[\"07038557029\", \"09012656075\"]', '[\"17\", \"OLORUNTEDO\", \"KOLA\", \"MASALASHI BUS STOP\", \"ALAKUKO\", \"LAGOS\"]', 0, 0),
(57, '2025-11-02 21:57:46', 'debam@annhurst-ts.com', '$2b$10$6cnGiDLEHVcx1X7bX7znaezdooj3l7Ep1Vjkks1v8V752tESAPpLW', 'DEBAM NICHOLAS AONDOYILA', NULL, '1990-01-14', 12345678901, '[\"07084693041\"]', '[\"888\", \"BALARABE MUSA CRESENT\", \"VICTORIA ISLAND\", \"LAGOS\"]', 0, 0),
(58, '2025-11-02 21:57:46', 'andy@annhurst-ts.com', '$2b$10$8A.zXk2jToXAYhwoGvrC5u158LbWRt391Absyf9.Qf9iGZNoSKC1u', 'ANDY OBOR OTETE', NULL, '1991-10-08', 12347678901, '[\"09127996842\"]', '[\"14\", \"COMMUNITY STREET\", \"ITA LUWO\", \"IKORODU\"]', 0, 0),
(59, '2025-11-02 21:57:46', 'george@annhurst-ts.com', '$2b$10$ACyPM.ePfXs/WeuHuBp1bO8YNpYyFQm8FvD.yyz/EMJcgssB.OQn.', 'GEORGE DAVID OWOLABI ALFRED', NULL, '1989-12-06', 12345678901, '[\"08146684722\"]', '[\"18\", \"KEBBI STREET\", \"OSBORNE ESTATE\", \"IKOYI\"]', 0, 0),
(60, '2025-11-02 21:57:46', 'olufemi@annhurst-ts.com', '$2b$10$K/EUd72ZojAkIRbuhz/5D.WTq.UqS76z6JjDznM3IORKBm3S8vLNy', 'OLUFEMI ISAAC OLUTOBA', NULL, '1986-05-20', 12345678901, '[\"07046489367\", \"08091163197\"]', '[\"29\", \"ARO - BABA STREET\", \"OFF PIPELINE ROAD\", \"IKOTUN\", \"LAGOS\"]', 0, 0),
(61, '2025-12-03 10:53:54', 'radediran@annhurst-ts.com', '$2b$10$yIiE1HIMcsiFt4GXfyC93urOf81oMpzpybl6FqASNN7g8iE1De92m', 'ROTIMI ADENIYI ADEDIRAN', NULL, '1990-01-01', 12345678901, '[\"07065266672\"]', '[\"6\", \"GOSHEN ROAD\", \"UPDC ESTATE\", \"MARWA\", \"LAGOS NIGERIA\"]', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `expected_payment`
--

CREATE TABLE `expected_payment` (
  `id` bigint NOT NULL,
  `bus` bigint NOT NULL,
  `week_start` date NOT NULL,
  `amount` bigint NOT NULL,
  `reason` text,
  `created_by` bigint DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

CREATE TABLE `inspection` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `month` date DEFAULT NULL,
  `coordinator` text,
  `bus` bigint DEFAULT NULL,
  `pdf` text,
  `video` text,
  `code` text,
  `d_uploaded` date DEFAULT NULL,
  `video_gp` text,
  `plate_number` text,
  `bus_uploaded` text,
  `issue` text,
  `both_vid_pdf` text,
  `inspection_completed_by` text,
  `issues` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `inspection`
--

INSERT INTO `inspection` (`id`, `created_at`, `month`, `coordinator`, `bus`, `pdf`, `video`, `code`, `d_uploaded`, `video_gp`, `plate_number`, `bus_uploaded`, `issue`, `both_vid_pdf`, `inspection_completed_by`, `issues`) VALUES
(1, '2025-12-02 13:41:53', '2025-11-01', 'Emmanuel', 3, '/uploads/4b7cb6ec-5877-4e69-89d1-31d30ddcf8ed-M1.pdf', '/uploads/inspections/127c4196-0959-423b-9f7f-89bece70285d.mp4', '/uploads/inspections/781e3bd7-981a-43d0-b469-8b59e773bec2.webm', '2025-12-02', NULL, 'KTU 211 YL', NULL, 'None', 'YES', 'Emmanuel', 'No issues'),
(2, '2025-12-02 15:11:43', '2025-11-01', 'Emmanuel', 9, NULL, '/uploads/inspections/de7cc55a-de31-4617-91a1-953eb53525d3.webm', '/uploads/inspections/56e51359-bc9e-47a7-9183-b34dd3f94d3b.webm', '2025-12-02', NULL, 'LSD 536 YJ', NULL, 'No', 'NO', 'Emmanuel', 'None');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint NOT NULL,
  `title` text NOT NULL,
  `slug` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `meta_description` text,
  `is_published` tinyint(1) DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hero_big_black` text,
  `hero_big_primary` text,
  `hero_text` text,
  `hero_primary_button` text,
  `hero_secondary_button` text,
  `hero_year` text,
  `hero_year_span` text,
  `hero_100` text,
  `hero_100_span` text,
  `hero_24` text,
  `hero_24_span` text,
  `body_heading` text,
  `body_sub_heading` text,
  `body_first_text` text,
  `body_second_text` text,
  `body_heading2` text,
  `body_sub_heading2` text,
  `body_heading3` text,
  `body_sub_heading3` text,
  `body_heading4` text,
  `body_sub_heading4` text,
  `box_text` text,
  `box_head` text,
  `box_text2` text,
  `box_head2` text,
  `box_text3` text,
  `box_head3` text,
  `box_text4` text,
  `box_head4` text,
  `box_text5` text,
  `box_head5` text,
  `box_text6` text,
  `box_head6` text,
  `box_text7` text,
  `box_head7` text,
  `box_text8` text,
  `box_head8` text,
  `box_text9` text,
  `box_head9` text,
  `team_img` text,
  `team_text` text,
  `team_role` text,
  `team_img2` text,
  `team_text2` text,
  `team_role2` text,
  `team_img3` text,
  `team_text3` text,
  `team_role3` text,
  `section_head` text,
  `section_text` text,
  `section_primary_btn` text,
  `section_secondary_btn` text,
  `hp` json DEFAULT NULL,
  `fm` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `title`, `slug`, `text`, `meta_description`, `is_published`, `views`, `created_at`, `updated_at`, `hero_big_black`, `hero_big_primary`, `hero_text`, `hero_primary_button`, `hero_secondary_button`, `hero_year`, `hero_year_span`, `hero_100`, `hero_100_span`, `hero_24`, `hero_24_span`, `body_heading`, `body_sub_heading`, `body_first_text`, `body_second_text`, `body_heading2`, `body_sub_heading2`, `body_heading3`, `body_sub_heading3`, `body_heading4`, `body_sub_heading4`, `box_text`, `box_head`, `box_text2`, `box_head2`, `box_text3`, `box_head3`, `box_text4`, `box_head4`, `box_text5`, `box_head5`, `box_text6`, `box_head6`, `box_text7`, `box_head7`, `box_text8`, `box_head8`, `box_text9`, `box_head9`, `team_img`, `team_text`, `team_role`, `team_img2`, `team_text2`, `team_role2`, `team_img3`, `team_text3`, `team_role3`, `section_head`, `section_text`, `section_primary_btn`, `section_secondary_btn`, `hp`, `fm`) VALUES
(1, 'About Us', 'about', 'Our impact in numbers', 'Learn about our company mission and values', 1, 0, '2025-12-11 21:54:17', '2025-12-11 21:54:17', 'About', 'Annhurst Transport', 'Leading the way in bus higher purchase solutions across Nigeria and beyond', '', '', '', '', '', '', '', '', 'Our Story', '', 'Founded with a vision to democratize investment opportunities in Nigeria, Annhurst Transport Services Limited has been at the forefront of providing accessible, profitable investment options for individuals and businesses across the country.', 'With over 5 years of proven excellence, we have built a reputation for reliability, transparency, and consistent returns. Our expertise spans across transportation, real estate, and business expansion sectors, making us your one-stop solution for investment opportunities.', 'Driving growth in transportation', 'Our Purpose', 'The principles that guide us', 'Our Values', 'Meet the experts behind our success', 'Our Team', 'To provide accessible, reliable, and innovative financing solutions that empower transportation businesses to grow their fleets and expand their operations, contributing to economic development across Nigeria.', 'Our Mission', 'To be the leading provider of transportation financing solutions in West Africa, recognized for our innovation, reliability, and commitment to customer success.', 'Our Vision', 'We put our customers at the heart of everything we do, ensuring their success is our priority.', 'Customer First', 'We strive for excellence in all aspects of our business, from customer service to financial solutions.', 'Excellence', 'We continuously innovate our services to meet the evolving needs of the transportation industry.', 'Innovation', 'Years in Business', '5+', 'Buses Financed', '200+', 'Satisfied Clients', '100+', 'Team Members', '25+', '', 'Strategic leadership and vision', 'Management Team', '', 'Specialized in transportation financing', 'Finance Experts', '', 'Dedicated to your success', 'Customer Support', '', 'Our team of experienced professionals brings together decades of expertise in transportation finance, customer service, and business development.', '', '', NULL, NULL),
(2, 'Services', 'services', 'From 12% APR', 'Comprehensive bus financing and management services', 1, 0, '2025-12-11 22:09:40', '2025-12-11 22:09:40', 'Our', 'Services', 'Comprehensive bus financing solutions designed to help your transportation business grow and succeed', 'Get Started', 'Learn More', 'Custom Pricing', '', '', '', '', '', 'Complete financing solutions', 'What We Offer', 'From initial consultation to final payment, we provide end-to-end support for all your bus financing needs.', '', 'Simple 4-step process', 'How It Works', 'Benefits that set us apart', 'Why Choose Us', 'We\'re here to help you succeed', 'Additional Support', 'Our flagship service offering flexible higher purchase agreements for buses of all sizes and types. Perfect for businesses looking to expand their fleet while maintaining operational cash flow.', 'Higher Purchase', 'Comprehensive fleet management services to help you optimize operations, reduce costs, and maximize the value of your bus fleet investment.', 'Fleet Management', 'Submit your application with basic business information and requirements', 'Application', 'Our team reviews your application and conducts necessary assessments', 'Review', 'Receive approval and finalize terms of your financing agreement', 'Approval', 'Get your buses and start growing your transportation business', 'Funding', 'We offer some of the most competitive interest rates in the industry, helping you save money on your financing.', 'Competitive Rates', 'Our streamlined process ensures quick approval and funding, so you can get your buses on the road faster.', 'Fast Processing', 'Your financial information is protected with bank-level security, and our services are backed by years of experience.', 'Secure & Reliable', '', 'We help you gather and organize all necessary documents for a smooth application process.', 'Documentation Support', '', 'Our customer support team is available around the clock to answer your questions and provide assistance.', '24/7 Support', '', 'Get expert advice on fleet expansion, route optimization, and business growth strategies.', 'Business Consulting', 'Ready to get started?', 'Contact our team today to discuss your bus financing needs and discover how we can help you grow your transportation business.', 'Contact Us', 'Learn More', '[\"Competitive interest rates\", \"Flexible payment terms\", \"Quick approval process\", \"No hidden fees\"]', '[\"Maintenance scheduling\", \"Insurance management\", \"Performance tracking\", \"Cost optimization\"]'),
(3, 'Contact', 'contact', 'Located in the heart of Lagos business district, our office is easily accessible and ready to welcome you.', 'Contact information and inquiry form', 1, 10, '2025-08-12 01:25:38', '2025-08-12 01:25:38', 'Contact', 'Us', 'Ready to expand your bus fleet? Get in touch with our team today and discover how we can help you grow your transportation business.', 'Call Now', 'Email', 'I have a bus', '+234 707 857 1856', '+234 809 318 3556', 'customerservices@annhurst-gsl.com', NULL, 'Info@annhurst-gsl.com', 'Send us a message', NULL, 'Full Name *', NULL, 'Get in touch', NULL, 'Visit our office', 'Find Us', 'Frequently asked questions', 'FAQ', 'You\'ll need your business registration documents, financial statements, driver\'s license, and proof of income. Our team will provide a complete checklist during your initial consultation.', 'What documents do I need to apply for bus financing?', 'Typically, we can provide approval within 2-3 business days for complete applications. The entire process from application to funding usually takes 1-2 weeks.', 'How long does the approval process take?', 'We finance all types of buses including minibuses, coaches, school buses, and luxury buses. We work with both new and used vehicles from reputable manufacturers.', 'What types of buses do you finance?', 'Yes, we offer refinancing solutions for existing bus loans. This can help you get better rates or more favorable terms. Contact us to discuss your options.', 'Do you offer refinancing options?', 'Our customer support team is available to help you with urgent inquiries and quick questions about our services.', 'Need immediate assistance?', 'Send Message', 'Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 2:00 PM', 'Sunday: Closed', '13 Association Avenue', 'Shangisha, Ketu', 'Lagos, Nigeria', 'Email Address *', 'Phone Number', 'Company Name', 'Service of Interest', 'Message *', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]', '[]'),
(4, 'Home', 'home', 'Investment Success', 'Leading provider of bus financing and fleet management services', 1, 10, '2025-08-12 01:25:38', '2025-08-12 01:25:38', 'Bus Higher Purchase', 'Solutions', 'Annhurst Transport Service Limited provides comprehensive bus financing solutions for transportation businesses. Get your fleet on the road with our flexible higher purchase options.', 'Explore Services', 'Get Started', '5+', 'Years of excellence', '100%', 'On-Time-Payments', '24/7', 'Customer Support', 'Everything you need for your bus fleet', 'Why Choose Us', 'We understand the challenges of running a transportation business. That\'s why we\'ve designed our services to be flexible, reliable, and tailored to your needs.', 'High Returns', 'Comprehensive bus financing solutions', 'Our Services', 'Trusted by transportation businesses', 'Join hundreds of successful companies who have grown their fleet with us', NULL, NULL, 'Our secure financing options ensure you get the best rates while maintaining financial stability for your business.', 'Secure Financing', 'Fast approval process with minimal documentation requirements. Get your buses on the road in record time.', 'Quick Approval', 'Our team of transportation finance experts is here to guide you through every step of the process.', 'Expert Support', 'Flexible higher purchase agreements with competitive interest rates. Own your buses while maintaining cash flow for operations.', 'Higher Purchase', 'Comprehensive fleet management services including maintenance scheduling, insurance, and operational support.', 'Fleet Management', 'Buses Financed', '200+', 'Happy Clients', '100+', 'Years Experience', '5+', 'Success Rate', '98%', 'Bus Investment ROI', 'Customer Satisfaction', '98%', NULL, NULL, NULL, NULL, NULL, NULL, 'Ready to expand your fleet?', 'Get in touch with our team today and discover how we can help you grow your transportation business.', 'Contact Us', 'Learn More', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `week` date DEFAULT NULL,
  `coordinator` text,
  `bus` bigint DEFAULT NULL,
  `p_week` text,
  `receipt` text,
  `amount` bigint DEFAULT NULL,
  `sender` text,
  `payment_day` text,
  `payment_date` date DEFAULT NULL,
  `pay_type` text,
  `pay_complete` text,
  `issue` text,
  `inspection` text,
  `completed_by` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `created_at`, `week`, `coordinator`, `bus`, `p_week`, `receipt`, `amount`, `sender`, `payment_day`, `payment_date`, `pay_type`, `pay_complete`, `issue`, `inspection`, `completed_by`) VALUES
(1, '2025-09-10 19:47:48', '2025-09-08', 'Cleophas', 1, 'First', 'L07,N100000,06.09.2025,DR Receipt.PNG', 100000, 'Elizabeth Mary', 'SAT', '2025-09-06', 'ACCOUNT', 'YES', 'NO', 'YES', 'Cleophas'),
(2, '2025-09-10 21:08:11', '2025-09-08', 'Cleophas', 4, 'First', 'L08,N65000,08.09.2025,DR Receipt.PNG', 65000, 'Taiwo Tola Seun', 'MON', '2025-09-08', 'ACCOUNT', 'YES', 'Bus to be Repossessed', 'YES', 'Cleophas'),
(3, '2025-09-12 17:11:13', '2025-07-21', 'Emmanuel', 3, 'First', 'M01,N65000,20.07.2025,DR Receipt.jpg', 65000, 'OLADAYO SUNDAY ALAO', 'SUN', '2025-07-20', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(4, '2025-09-12 17:14:26', '2025-07-28', 'Emmanuel', 3, 'First', 'M01,N28000,29.07.2025,DR Receipt.jpeg', 28000, 'OLADAYO SUNDAY ALAO', 'TUE', '2025-07-29', 'ACCOUNT', 'YES', 'Bus Down', 'YES', 'Emmanuel'),
(5, '2025-09-12 17:17:32', '2025-08-04', 'Emmanuel', 3, 'First', 'M01,N65000,03.08.2025,DR Receipt.pdf', 65000, 'M1 WEEK', 'SUN', '2025-08-03', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(6, '2025-09-12 17:20:49', '2025-08-11', 'Emmanuel', 3, 'First', 'M01,N65000,10.09.2025,DR Receipt.pdf', 65000, 'M1 WEEK', 'SUN', '2025-08-10', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(7, '2025-09-12 17:24:20', '2025-08-18', 'Emmanuel', 3, 'First', 'M01,N40000,17.08.2025,DR Receipt.pdf', 40000, 'M1 WEEK', 'SUN', '2025-08-17', 'ACCOUNT', 'NO', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(8, '2025-09-12 17:25:42', '2025-08-18', 'Emmanuel', 3, 'Second', 'M01,N25000,18.08.2025,DR Receipt.pdf', 25000, 'M1 WEEK', 'MON', '2025-08-18', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(9, '2025-09-12 17:41:51', '2025-08-25', 'Emmanuel', 3, 'First', 'M01,N65000,24.08.2025,DR Receipt.pdf', 65000, 'M1 WEEK', 'SUN', '2025-08-24', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(10, '2025-09-12 17:44:51', '2025-09-01', 'Emmanuel', 3, 'First', 'M01,N65000,31.08.2025,DR Receipt.jpeg', 65000, 'M1 WEEK', 'SUN', '2025-08-31', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(11, '2025-09-12 17:47:09', '2025-09-08', 'Emmanuel', 3, 'First', 'M01,N65000,08.09.2025,DR Receipt.pdf', 65000, 'OLADAYO SUNDAY ALAO', 'SUN', '2025-09-08', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(12, '2025-09-29 17:25:56', '2025-09-29', 'Emmanuel', 43, 'First', 'M04,N65000,28.09.2025,DR Receipt.jpeg', 65000, 'OSUOLALE TAIWO BASIRU', 'SUN', '2025-09-28', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(13, '2025-09-29 18:44:44', '2025-09-22', 'Emmanuel', 15, 'First', 'K09,N60000,22.09.2025,DR Receipt.pdf', 60000, 'DAMOLA MUMEEN SHOWOBI', 'MON', '2025-09-22', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(14, '2025-09-29 19:17:18', '2025-09-29', 'Emmanuel', 49, 'First', 'M10,N65000,29.09.2025,DR Receipt.jpg', 65000, 'EMMANUEL IMOLE OSHATI', 'MON', '2025-09-29', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(15, '2025-09-29 19:26:09', '2025-09-29', 'Emmanuel', 23, 'Second', 'K17,N20000,28.09.2025,DR Receipt.jpeg', 20000, 'OLAOYE OLADEJI', 'SUN', '2025-09-28', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(16, '2025-11-06 16:28:21', '2025-11-03', 'Emmanuel', 21, 'First', 'K15,N50000,06.11.2025,DR Receipt.jpg', 50000, 'God did', 'THU', '2025-11-06', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'NO', 'Emmanuel'),
(17, '2025-11-06 17:15:54', '2025-11-03', 'Emmanuel', 20, 'First', 'K14,N50000,03.11.2025,DR Receipt.pdf', 50000, 'USER', 'MON', '2025-11-03', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'NO', 'Emmanuel'),
(18, '2025-11-27 09:38:49', '2025-11-24', 'Emmanuel', 3, 'First', 'M01,N65000,23.11.2025,DR Receipt.jpg', 65000, 'Oladayo sunday', 'SUN', '2025-11-23', 'ACCOUNT', 'YES', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel'),
(22, '2025-11-27 10:48:59', '2025-11-24', 'Emmanuel', 23, 'First', 'K17,N30000,25.11.2025,DR Receipt.jpeg', 30000, 'OLAOYE OLADEJI', 'TUE', '2025-11-25', 'ACCOUNT', 'NO', 'N/A - No Issues Collecting Money', 'YES', 'Emmanuel');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` json DEFAULT NULL,
  `email` json DEFAULT NULL,
  `address` text,
  `logo` text,
  `footer_write` text,
  `footer_head` text,
  `footer_head2` text,
  `services` json DEFAULT NULL,
  `bottom_left` text,
  `bottom_right` json DEFAULT NULL,
  `logo_blk` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `created_at`, `phone`, `email`, `address`, `logo`, `footer_write`, `footer_head`, `footer_head2`, `services`, `bottom_left`, `bottom_right`, `logo_blk`) VALUES
(1, '2025-11-02 21:57:42', '[\"+234 707 857 1856\"]', '[\"customerservices@annhurst-gsl.com\"]', '13 Association Avenue, Shangisha, Ketu\nLagos, Nigeria', 'settings/1759583109440-ats1.png', 'Your trusted partner in bus higher purchase solutions. We provide comprehensive financing options for transportation businesses across the globe.', 'Quick Links', 'Our Services', '[\"Bus Financing\", \"Higher Purchase\", \"Lease Options\", \"Fleet Management\", \"Insurance Solutions\"]', 'Annhurst Transport Service Limited. All rights reserved.', '[\"Privacy Policy\", \"Terms of Service\"]', 'settings/1759582964099-ats.png');

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id`, `created_at`, `subject`) VALUES
(1, '2025-11-02 21:57:42', 'Transaction Complaint'),
(2, '2025-11-02 21:57:42', 'Bus Down (Engine Issue)'),
(3, '2025-11-02 21:57:42', 'Bus Down (Accident)'),
(4, '2025-11-02 21:57:42', 'Bus Down (Gear Issue)'),
(5, '2025-11-02 21:57:42', 'Bus Seized (LASTMA/Police)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_admins_email` (`email`),
  ADD UNIQUE KEY `admins_email_key` (`email`);

--
-- Indexes for table `buses`
--
ALTER TABLE `buses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bus_status_history`
--
ALTER TABLE `bus_status_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coordinators`
--
ALTER TABLE `coordinators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `co_subject`
--
ALTER TABLE `co_subject`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expected_payment`
--
ALTER TABLE `expected_payment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `expected_payment_bus_week_start_key` (`bus`,`week_start`);

--
-- Indexes for table `inspection`
--
ALTER TABLE `inspection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pages_slug_key` (`slug`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `buses`
--
ALTER TABLE `buses`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `bus_status_history`
--
ALTER TABLE `bus_status_history`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coordinators`
--
ALTER TABLE `coordinators`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `co_subject`
--
ALTER TABLE `co_subject`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `expected_payment`
--
ALTER TABLE `expected_payment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inspection`
--
ALTER TABLE `inspection`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
