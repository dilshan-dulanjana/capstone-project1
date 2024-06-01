-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 27, 2024 at 08:20 AM
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
-- Database: `capstoneproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `category`) VALUES
(6, 'Dilshan', 'Admin@gmail.com', '$2a$10$KcrLq8su3fK0VaPal3lV.O5PqM7eyFkIncjkLQhJ4Y.oZM9ttNB2G', 'TravelAgent'),
(8, 'Dilshan', 'sxsxsx@gmail.com', '$2a$10$PYAxgGXDfnbGoMdHDx3OP.bGmJI2Em289lSvCnfUFshmXABVgvVYa', 'Traveler'),
(9, 'umesh', 'umesh@gmail.com', '$2a$10$GP9cIAHTXwHkMBjhRADREunqoHtnH4Y5CWVXtAWqehKImlfZquOpi', 'Traveler'),
(10, 'Dilshan', 'AB@gmail.com', '123', 'Traveler'),
(11, 'DD', 'chaminduj96@gmail.com', '123', 'Drivers'),
(13, 'Dilshan', 'Dilshan@mail.com', '$2a$10$YrhszILLgpTqhE1bhrTgj.K6eeYqX22VVdcYIHOyH5LT3IAlP7wre', 'Admin'),
(14, 'guruge', 'guruge@gmail.com', '$2b$10$Hlz64vCYUc20N86wSiJ.cOUwTjzTHZa2kDgQ7Oq/30ep5WQel99aC', 'Admin'),
(15, 'DD', 'DD@gmail.com', '$2b$10$FLDLBSejnQ3Sow8/IY.5jOLNj9i81ue4UhyhO3.aJhyk0sI7fQRX.', 'Driver'),
(19, 'Dilshan', 'cc@gmail.com', '$2b$10$Smj97qhRSzDu.gtzCHMFwuXcpb6ahK53twuCfO.qLPqINMjrezoPC', ''),
(20, 'Dilshan', 'nn@gmail.com', '$2b$10$brnfRvwOixk5aDIWSSXTMeV/S26cbTVoauH.XwSJ7VIgR1IOv6WW.', ''),
(21, 'Dilshan', 'mm@gmail.com', '$2b$10$7wVSH10i0n0fRtvhDNdClOqEj8tYLy79hNipBRoBlpbkFU1zlonf6', ''),
(34, 'saman', 'ag@gmail.com', '123', 'Admin'),
(37, 'saman', 'vvv@gmail.com', '123', ''),
(38, 'amesh', 'amesh@gmail.com', '12', ''),
(39, 'Dilshan', 'nirvana.blisscollective@gmail.com', '12', ''),
(40, 'Dilshan', 'DD@gmail.com', '123', ''),
(41, 'Dilshan', 'v@gmail.com', '123', ''),
(42, 'Dilshan', 'sxsxsx@gmail.com', '12', ''),
(43, 'Dilshan', 'chaminduj96@gmail.com', '123', 'Driver'),
(44, 'Dilshan', 'Admin@gmail.com', '123', ''),
(45, 'saman', 'DD@gmail.com', '12', 'TravelAgent'),
(46, 'Dilshan', 'nirvana.blisscollective@gmail.com', '12', 'Traveler'),
(47, 'guruge', 'Go@gmail.com', '12', 'Traveler'),
(48, 'Dilshan', 'AB@gmail.com', '123', 'AccommodationOwner'),
(49, 'Minidu', 'Minindu@gmail.com', '123', 'Admin'),
(50, 'Amal', 'Amal@gmail.com', '123', 'Traveler'),
(51, 'Navidu', 'Navidu@gmail.com', '123', 'Admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
