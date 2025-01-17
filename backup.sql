-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 14, 2024 at 01:26 AM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `waitlist_app`
--
CREATE DATABASE IF NOT EXISTS `waitlist_app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `waitlist_app`;

-- --------------------------------------------------------

--
-- Table structure for table `EventParticipants`
--

CREATE TABLE `EventParticipants` (
  `id` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EventParticipants`
--

INSERT INTO `EventParticipants` (`id`, `eventId`, `userId`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 37, 'confirmed', '2024-11-14 18:32:20', '2024-11-14 18:32:20'),
(6, 1, 40, NULL, '2024-11-15 12:04:07', '2024-11-15 12:04:07');

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Events`
--

INSERT INTO `Events` (`id`, `title`, `description`, `date`, `location`, `capacity`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(1, 'Test Events', 'A sample event.', '2024-12-01 00:00:00', 'Virtual', 100, 36, '2024-11-14 18:32:20', '2024-11-18 22:08:40');

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `waitlistId` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `isRead` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Notifications`
--

INSERT INTO `Notifications` (`id`, `userId`, `waitlistId`, `message`, `isRead`, `createdAt`, `updatedAt`) VALUES
(25, 36, 19, 'A new customer has joined your waitlist: KFC', 0, '2024-11-11 20:57:08', '2024-11-11 20:57:08');

-- --------------------------------------------------------

--
-- Table structure for table `SequelizeMeta`
--

CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SequelizeMeta`
--

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20240925140301-create-waitlist.js'),
('20240927042101-create-users.js'),
('20240927210046-create-waitlist-customers.js'),
('20241009192916-add-salt-to-user.js'),
('20241027214058-add-references-to-waitlistcustomers.js'),
('20241028142328-add-email-phone-to-users-and-address-phone-to-waitlists.js'),
('20241105155135-create-notifications.js'),
('20241114083737-create-events.js'),
('20241114084359-create-event-participants.js'),
('20241114231641-add-event-relationships.js');

-- --------------------------------------------------------

--
-- Table structure for table `UserEvents`
--

CREATE TABLE `UserEvents` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'customer',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `role`, `createdAt`, `updatedAt`, `salt`, `email`, `phone`) VALUES
(36, 'Dare', '901797c705cc0d252cf80a85bd5f024b79060857c6e74b4f7001fc9857f6f6eaf2290ccbd263b59677bcd8628c14e55d76d00c6cb7565a437ecd785e3413ae0e', 'business_owner', '2024-10-10 03:06:42', '2024-10-10 03:06:42', '2b2db22a46ab18af96a1e9541ef22800', 'Dare@gmail.com', '2899415184'),
(37, 'Johdoe', '2f23ed83578b731e3645f72f4cd397ab19dd5423b69bbf5ddab6d46b3ad76766f8a806209b07fc673344f1b0458ea878c953562594163acbcfb3efee261d17d2', 'customer', '2024-10-10 03:08:39', '2024-10-10 03:08:39', 'b57959994e0dcf0f16a639a18e407c4a', 'Johdoe@gmail.com', '2656787892'),
(40, 'customer1', '9313368d03960fe9a5e510865020d2e422012ddd26fc5b7d04b7ff59b3fbaea1cc52a21d6d4089def6bc4805be064875abe25872fbe6fd634214eb456c38649d', 'customer', '2024-11-08 14:30:14', '2024-11-08 14:30:14', '7d017d0582685c669a14002779a18e8d', 'customer1@gmail.com', ''),
(41, 'customer2', '6c2b4aee68ba1a59de3465415c19eacfb2d7f5e123e19fee1175bcc57005f95e7040b6ef9fef80c53fba062d1b8a73132b31457c6e39c9586f6b1ff2330bb822', 'customer', '2024-11-20 12:03:59', '2024-11-20 12:03:59', '154a84329e1524254e56cb1a43ed1831', 'customer2@gmail.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `WaitlistCustomers`
--

CREATE TABLE `WaitlistCustomers` (
  `id` int(11) NOT NULL,
  `waitlistId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `WaitlistCustomers`
--

INSERT INTO `WaitlistCustomers` (`id`, `waitlistId`, `userId`, `createdAt`, `updatedAt`) VALUES
(23, 19, 37, '2024-11-08 14:37:35', '2024-11-08 14:37:35');

-- --------------------------------------------------------

--
-- Table structure for table `Waitlists`
--

CREATE TABLE `Waitlists` (
  `id` int(11) NOT NULL,
  `serviceName` varchar(255) DEFAULT NULL,
  `waitTime` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Waitlists`
--

INSERT INTO `Waitlists` (`id`, `serviceName`, `waitTime`, `status`, `createdAt`, `updatedAt`, `address`, `phone`, `ownerId`) VALUES
(19, 'KFC', 5, 'Active', '2024-10-10 03:08:10', '2024-12-10 11:43:40', NULL, NULL, 36),
(20, 'Dominos', 5, 'Active', '2024-11-20 14:29:24', '2024-11-20 14:29:24', 'Gage Park', '2899415183', 36);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EventParticipants`
--
ALTER TABLE `EventParticipants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `eventId` (`eventId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `waitlistId` (`waitlistId`);

--
-- Indexes for table `SequelizeMeta`
--
ALTER TABLE `SequelizeMeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `UserEvents`
--
ALTER TABLE `UserEvents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `eventId` (`eventId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `WaitlistCustomers`
--
ALTER TABLE `WaitlistCustomers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_waitlistcustomers_waitlistid` (`waitlistId`),
  ADD KEY `fk_waitlistcustomers_userid` (`userId`);

--
-- Indexes for table `Waitlists`
--
ALTER TABLE `Waitlists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ownerId` (`ownerId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `EventParticipants`
--
ALTER TABLE `EventParticipants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `UserEvents`
--
ALTER TABLE `UserEvents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `WaitlistCustomers`
--
ALTER TABLE `WaitlistCustomers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `Waitlists`
--
ALTER TABLE `Waitlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `EventParticipants`
--
ALTER TABLE `EventParticipants`
  ADD CONSTRAINT `eventparticipants_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eventparticipants_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Events`
--
ALTER TABLE `Events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`waitlistId`) REFERENCES `Waitlists` (`id`);

--
-- Constraints for table `UserEvents`
--
ALTER TABLE `UserEvents`
  ADD CONSTRAINT `userevents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userevents_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `WaitlistCustomers`
--
ALTER TABLE `WaitlistCustomers`
  ADD CONSTRAINT `fk_waitlistcustomers_userid` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_waitlistcustomers_waitlistid` FOREIGN KEY (`waitlistId`) REFERENCES `Waitlists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `waitlistcustomers_ibfk_1` FOREIGN KEY (`waitlistId`) REFERENCES `Waitlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `waitlistcustomers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `Waitlists`
--
ALTER TABLE `Waitlists`
  ADD CONSTRAINT `fk_ownerId` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `wordpress`
--
CREATE DATABASE IF NOT EXISTS `wordpress` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `wordpress`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
