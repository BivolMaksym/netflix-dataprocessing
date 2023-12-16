-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql
-- Время создания: Дек 16 2023 г., 13:49
-- Версия сервера: 11.2.2-MariaDB-1:11.2.2+maria~ubu2204
-- Версия PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `netflix`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Classification`
--

CREATE TABLE `Classification` (
  `ClassificationID` int(11) NOT NULL,
  `PreferenceID` int(11) DEFAULT NULL,
  `InterestedInFilms` tinyint(4) DEFAULT NULL,
  `InterestedInSeries` tinyint(4) DEFAULT NULL,
  `PreferedGenres` varchar(10) DEFAULT NULL,
  `MinimumAge` varchar(10) DEFAULT NULL,
  `ViewingClassification` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Content`
--

CREATE TABLE `Content` (
  `ContentID` int(11) NOT NULL,
  `SeriesID_` int(11) DEFAULT NULL,
  `MovieID_` int(11) DEFAULT NULL,
  `ProfileID_` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Genre`
--

CREATE TABLE `Genre` (
  `GenreID` int(11) NOT NULL,
  `Genre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Movie`
--

CREATE TABLE `Movie` (
  `MovieID` int(11) NOT NULL,
  `GenreID_` int(11) DEFAULT NULL,
  `MovieTitle` varchar(50) DEFAULT NULL,
  `MovieDescription` varchar(50) DEFAULT NULL,
  `Quality` varchar(10) DEFAULT NULL,
  `AmountOfViews` int(11) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `Availability` tinyint(4) DEFAULT NULL,
  `AvailableQualities` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Profile`
--

CREATE TABLE `Profile` (
  `ProfileID` int(11) DEFAULT NULL,
  `UserID_` int(11) DEFAULT NULL,
  `ClassificationID_` int(11) DEFAULT NULL,
  `ContentID_` int(11) DEFAULT NULL,
  `ProfileName` varchar(50) DEFAULT NULL,
  `ProfilePhoto` tinyint(4) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Language` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Series`
--

CREATE TABLE `Series` (
  `SeriesID` int(11) NOT NULL,
  `GenreID_` int(11) DEFAULT NULL,
  `ClassificationID_` int(11) DEFAULT NULL,
  `SeriesTitle` varchar(50) DEFAULT NULL,
  `SeriesDescription` varchar(50) DEFAULT NULL,
  `Quality` varchar(50) DEFAULT NULL,
  `AmountOfViews` int(11) DEFAULT NULL,
  `AmountOfEpisodes` int(11) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `Availability` tinyint(4) DEFAULT NULL,
  `availableQualities` varchar(10) DEFAULT NULL,
  `Classification` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Subscription`
--

CREATE TABLE `Subscription` (
  `SubscriptionID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `Quality` int(11) DEFAULT NULL,
  `SubscriptionType` varchar(50) DEFAULT NULL,
  `SignUpDate` date DEFAULT NULL,
  `FriendInvited` tinyint(4) DEFAULT NULL,
  `IsPaidAccount` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `ActivationStatus` tinyint(4) DEFAULT NULL,
  `LoginAttempts` int(11) DEFAULT NULL,
  `BlockStatus` tinyint(4) DEFAULT NULL,
  `FreeDaysLeft` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Watchlist`
--

CREATE TABLE `Watchlist` (
  `WatchlistID` int(11) NOT NULL,
  `ProfileID` int(11) DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `SeriesID` int(11) DEFAULT NULL,
  `MovieID` int(11) DEFAULT NULL,
  `dateAdded` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Classification`
--
ALTER TABLE `Classification`
  ADD PRIMARY KEY (`ClassificationID`);

--
-- Индексы таблицы `Content`
--
ALTER TABLE `Content`
  ADD PRIMARY KEY (`ContentID`);

--
-- Индексы таблицы `Genre`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`GenreID`);

--
-- Индексы таблицы `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`MovieID`);

--
-- Индексы таблицы `Series`
--
ALTER TABLE `Series`
  ADD PRIMARY KEY (`SeriesID`);

--
-- Индексы таблицы `Subscription`
--
ALTER TABLE `Subscription`
  ADD KEY `FK_Subscription_User` (`UserID`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);

--
-- Индексы таблицы `Watchlist`
--
ALTER TABLE `Watchlist`
  ADD PRIMARY KEY (`WatchlistID`);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Subscription`
--
ALTER TABLE `Subscription`
  ADD CONSTRAINT `FK_Subscription_User` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
