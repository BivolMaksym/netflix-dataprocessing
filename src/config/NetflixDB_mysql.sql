-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: mysql
-- Время создания: Янв 10 2024 г., 17:00
-- Версия сервера: 11.2.2-MariaDB-1:11.2.2+maria~ubu2204
-- Версия PHP: 8.2.14

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
  `SeriesID` int(11) DEFAULT NULL,
  `MovieID` int(11) DEFAULT NULL,
  `ProfileID` int(11) DEFAULT NULL
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
  `GenreID` int(11) DEFAULT NULL,
  `ClassificationID` int(11) NOT NULL,
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
  `ProfileID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ClassificationID` int(11) DEFAULT NULL,
  `ContentID` int(11) DEFAULT NULL,
  `WatchlistID` int(11) NOT NULL,
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
  `GenreID` int(11) DEFAULT NULL,
  `ClassificationID` int(11) DEFAULT NULL,
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
  `SubscriptionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `Quality` int(11) DEFAULT NULL,
  `SubscriptionType` varchar(50) DEFAULT NULL,
  `SignUpDate` date DEFAULT current_timestamp(),
  `FriendInvited` tinyint(4) DEFAULT NULL,
  `IsPaidAccount` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `SubscriptionID` int(11) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `ActivationStatus` tinyint(4) DEFAULT NULL,
  `LoginAttempts` int(11) DEFAULT NULL,
  `BlockStatus` tinyint(4) DEFAULT NULL,
  `FreeDaysLeft` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Watchlist`
--

CREATE TABLE `Watchlist` (
  `WatchlistID` int(11) NOT NULL,
  `ProfileID` int(11) DEFAULT NULL,
  `dateAdded` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `WatchlistMovie`
--

CREATE TABLE `WatchlistMovie` (
  `WatchlistMovieID` int(11) NOT NULL,
  `WatchlistID` int(11) NOT NULL,
  `MovieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `WatchlistSeries`
--

CREATE TABLE `WatchlistSeries` (
  `WatchlistSeriesID` int(11) NOT NULL,
  `WatchlistID` int(11) NOT NULL,
  `SeriesID` int(11) NOT NULL
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
  ADD PRIMARY KEY (`ContentID`),
  ADD KEY `MovieID` (`MovieID`) USING BTREE,
  ADD KEY `SeriesID` (`SeriesID`) USING BTREE,
  ADD KEY `ProfileID` (`ProfileID`) USING BTREE;

--
-- Индексы таблицы `Genre`
--
ALTER TABLE `Genre`
  ADD PRIMARY KEY (`GenreID`);

--
-- Индексы таблицы `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`MovieID`),
  ADD KEY `ClassificationID` (`ClassificationID`),
  ADD KEY `GenreID` (`GenreID`) USING BTREE;

--
-- Индексы таблицы `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`ProfileID`),
  ADD KEY `WatchlistID` (`WatchlistID`),
  ADD KEY `UserID` (`UserID`) USING BTREE,
  ADD KEY `ClassificationID` (`ClassificationID`) USING BTREE,
  ADD KEY `ContentID` (`ContentID`) USING BTREE;

--
-- Индексы таблицы `Series`
--
ALTER TABLE `Series`
  ADD PRIMARY KEY (`SeriesID`),
  ADD KEY `GenreID` (`GenreID`) USING BTREE,
  ADD KEY `ClassificationID` (`ClassificationID`) USING BTREE;

--
-- Индексы таблицы `Subscription`
--
ALTER TABLE `Subscription`
  ADD PRIMARY KEY (`SubscriptionID`),
  ADD KEY `UserID` (`UserID`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `SubscriptionID` (`SubscriptionID`);

--
-- Индексы таблицы `Watchlist`
--
ALTER TABLE `Watchlist`
  ADD PRIMARY KEY (`WatchlistID`),
  ADD KEY `ProfileID` (`ProfileID`);

--
-- Индексы таблицы `WatchlistMovie`
--
ALTER TABLE `WatchlistMovie`
  ADD PRIMARY KEY (`WatchlistMovieID`),
  ADD KEY `WatchlistID` (`WatchlistID`),
  ADD KEY `MovieID` (`MovieID`);

--
-- Индексы таблицы `WatchlistSeries`
--
ALTER TABLE `WatchlistSeries`
  ADD PRIMARY KEY (`WatchlistSeriesID`),
  ADD KEY `SeriesID` (`SeriesID`),
  ADD KEY `WatchlistID` (`WatchlistID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Classification`
--
ALTER TABLE `Classification`
  MODIFY `ClassificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Content`
--
ALTER TABLE `Content`
  MODIFY `ContentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Genre`
--
ALTER TABLE `Genre`
  MODIFY `GenreID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Movie`
--
ALTER TABLE `Movie`
  MODIFY `MovieID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Profile`
--
ALTER TABLE `Profile`
  MODIFY `ProfileID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Series`
--
ALTER TABLE `Series`
  MODIFY `SeriesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Subscription`
--
ALTER TABLE `Subscription`
  MODIFY `SubscriptionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `WatchlistMovie`
--
ALTER TABLE `WatchlistMovie`
  MODIFY `WatchlistMovieID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `WatchlistSeries`
--
ALTER TABLE `WatchlistSeries`
  MODIFY `WatchlistSeriesID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Content`
--
ALTER TABLE `Content`
  ADD CONSTRAINT `Content_ibfk_1` FOREIGN KEY (`MovieID`) REFERENCES `Movie` (`MovieID`),
  ADD CONSTRAINT `Content_ibfk_2` FOREIGN KEY (`ProfileID`) REFERENCES `Profile` (`ProfileID`),
  ADD CONSTRAINT `Content_ibfk_3` FOREIGN KEY (`SeriesID`) REFERENCES `Series` (`SeriesID`);

--
-- Ограничения внешнего ключа таблицы `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `Movie_ibfk_1` FOREIGN KEY (`GenreID`) REFERENCES `Genre` (`GenreID`),
  ADD CONSTRAINT `Movie_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`);

--
-- Ограничения внешнего ключа таблицы `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `Profile_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`),
  ADD CONSTRAINT `Profile_ibfk_3` FOREIGN KEY (`ContentID`) REFERENCES `Content` (`ContentID`),
  ADD CONSTRAINT `Profile_ibfk_4` FOREIGN KEY (`WatchlistID`) REFERENCES `Watchlist` (`WatchlistID`);

--
-- Ограничения внешнего ключа таблицы `Series`
--
ALTER TABLE `Series`
  ADD CONSTRAINT `Series_ibfk_1` FOREIGN KEY (`GenreID`) REFERENCES `Genre` (`GenreID`),
  ADD CONSTRAINT `Series_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`);

--
-- Ограничения внешнего ключа таблицы `Subscription`
--
ALTER TABLE `Subscription`
  ADD CONSTRAINT `Subscription_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

--
-- Ограничения внешнего ключа таблицы `User`
--
ALTER TABLE `User`
  ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`SubscriptionID`) REFERENCES `Subscription` (`SubscriptionID`);

--
-- Ограничения внешнего ключа таблицы `Watchlist`
--
ALTER TABLE `Watchlist`
  ADD CONSTRAINT `Watchlist_ibfk_1` FOREIGN KEY (`ProfileID`) REFERENCES `Profile` (`ProfileID`);

--
-- Ограничения внешнего ключа таблицы `WatchlistMovie`
--
ALTER TABLE `WatchlistMovie`
  ADD CONSTRAINT `WatchlistMovie_ibfk_1` FOREIGN KEY (`WatchlistID`) REFERENCES `Watchlist` (`WatchlistID`),
  ADD CONSTRAINT `WatchlistMovie_ibfk_2` FOREIGN KEY (`MovieID`) REFERENCES `Movie` (`MovieID`);

--
-- Ограничения внешнего ключа таблицы `WatchlistSeries`
--
ALTER TABLE `WatchlistSeries`
  ADD CONSTRAINT `WatchlistSeries_ibfk_1` FOREIGN KEY (`SeriesID`) REFERENCES `Series` (`SeriesID`),
  ADD CONSTRAINT `WatchlistSeries_ibfk_2` FOREIGN KEY (`WatchlistID`) REFERENCES `Watchlist` (`WatchlistID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
