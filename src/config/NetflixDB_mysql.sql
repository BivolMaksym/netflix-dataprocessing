-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: mysql
-- Время создания: Мар 31 2024 г., 21:05
-- Версия сервера: 10.9.2-MariaDB-1:10.9.2+maria~ubu2204
-- Версия PHP: 8.0.23

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

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`%` PROCEDURE `create_classification` (`in_ClassificationID` INT, `in_InterestedInFilms` TINYINT, `in_InterestedInSeries` TINYINT, `in_PreferedGenres` VARCHAR(10), `in_MinAge` VARCHAR(10), `in_ViewingClassification` INT)   BEGIN
    INSERT INTO Classification (ClassificationID, InterestedInFilms, InterestedInSeries, PreferedGenres, MinAge, ViewingClassification)
    VALUES (in_ClassificationID, in_InterestedInFilms, in_InterestedInSeries, in_PreferedGenres, in_MinAge, in_ViewingClassification);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_movie` (IN `p_ClassificationID` INT, IN `p_MovieTitle` VARCHAR(50), IN `p_MovieDescription` VARCHAR(50), IN `p_AmountOfViews` INT, IN `p_ReleaseDate` DATE, IN `p_Genre` VARCHAR(50), IN `p_AvailableQualities` VARCHAR(10))   BEGIN
    INSERT INTO Movie (ClassificationID, MovieTitle, MovieDescription, AmountOfViews, ReleaseDate, Genre, AvailableQualities)
    VALUES (p_ClassificationID, p_MovieTitle, p_MovieDescription, p_AmountOfViews, p_ReleaseDate, p_Genre, p_AvailableQualities);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_profile` (IN `p_UserID` INT, IN `p_WatchlistID` INT, IN `p_ProfileName` VARCHAR(50), IN `p_ProfilePhoto` TINYINT, IN `p_Age` INT, IN `p_Language` VARCHAR(50))   BEGIN
    -- Validate Profile
    IF p_Age <= 0 OR p_Age > 170 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid age. Age must be between 1 and 170.';
    END IF;

    IF NOT p_ProfileName REGEXP '^[a-zA-Z0-9\s]*$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid profile name. Profile name must not contain special characters.';
    END IF;

    IF LENGTH(p_ProfileName) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid profile name length. Profile name must not exceed 30 characters.';
    END IF;

    -- Check Profile Limit
    IF (SELECT COUNT(*) FROM Profile WHERE UserID = p_UserID) >= 4 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'User has reached the maximum allowed number of profiles (4).';
    END IF;

    -- Insert Profile
    INSERT INTO Profile (UserID, WatchlistID, ProfileName, ProfilePhoto, Age, Language)
    VALUES (p_UserID, p_WatchlistID, p_ProfileName, p_ProfilePhoto, p_Age, p_Language);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_series` (IN `p_SeriesTitle` VARCHAR(50), IN `p_SeriesDescription` VARCHAR(50), IN `p_AmountOfViews` INT, IN `p_AmountOfEpisodes` INT, IN `p_ReleaseDate` DATE, IN `p_Genre` VARCHAR(50), IN `p_AvailableQualities` VARCHAR(10))   BEGIN
    INSERT INTO Series (SeriesTitle, SeriesDescription, AmountOfViews, AmountOfEpisodes, ReleaseDate, Genre, AvailableQualities)
    VALUES (p_SeriesTitle, p_SeriesDescription, p_AmountOfViews, p_AmountOfEpisodes, p_ReleaseDate, p_Genre, p_AvailableQualities);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_subscription` (IN `userID` INT, IN `subscriptionDescription` VARCHAR(50), IN `subscriptionPrice` DOUBLE, IN `subscriptionQuality` VARCHAR(2), IN `signUpDate` DATE, IN `friendInvited` TINYINT, IN `isPaidAccount` TINYINT)   BEGIN
    INSERT INTO Subscription (UserID, Description, Price, Quality, SignUpDate, FriendInvited, IsPaidAccount)
    VALUES (userID, subscriptionDescription, subscriptionPrice, subscriptionQuality, signUpDate, friendInvited, isPaidAccount);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_watchlist` (IN `profileID` INT, OUT `newWatchlistID` INT)   BEGIN
    -- Insert a new watchlist
    INSERT INTO Watchlist (ProfileID) VALUES (profileID);
    SET newWatchlistID = LAST_INSERT_ID();

    -- Update the Profile table with the new WatchlistID
    UPDATE Profile SET WatchlistID = newWatchlistID WHERE ProfileID = profileID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_watchlist_movie` (IN `watchlistID` INT, IN `movieID` INT)   BEGIN
    INSERT INTO WatchlistMovie (WatchlistID, MovieID) VALUES (watchlistID, movieID);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `create_watchlist_series` (IN `watchlistID` INT, IN `seriesID` INT)   BEGIN
    INSERT INTO WatchlistSeries (WatchlistID, SeriesID) VALUES (watchlistID, seriesID);
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_profile` (IN `p_ProfileID` INT)   BEGIN
    DELETE FROM Profile WHERE ProfileID = p_ProfileID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_series` (IN `p_SeriesID` INT)   BEGIN
    DELETE FROM Series WHERE SeriesID = p_SeriesID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_subscription` (IN `userID` INT)   BEGIN
    DELETE FROM Subscription WHERE UserID = userID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_watchlist` (IN `watchlistID` INT)   BEGIN
    -- Remove rows from WatchlistMovie associated with the watchlist
    DELETE FROM WatchlistMovie WHERE WatchlistID = watchlistID;

    -- Remove rows from WatchlistSeries associated with the watchlist
    DELETE FROM WatchlistSeries WHERE WatchlistID = watchlistID;

    -- Delete the watchlist
    DELETE FROM Watchlist WHERE WatchlistID = watchlistID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_watchlist_movie` (IN `watchlistMovieID` INT)   BEGIN
    DELETE FROM WatchlistMovie WHERE WatchlistMovieID = watchlistMovieID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `delete_watchlist_series` (IN `watchlistSeriesID` INT)   BEGIN
    DELETE FROM WatchlistSeries WHERE WatchlistSeriesID = watchlistSeriesID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_classifications` ()   BEGIN
    SELECT * FROM Classification;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_movies` ()   BEGIN
    SELECT * FROM Movie;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_profiles` ()   BEGIN
    SELECT * FROM Profile;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_series` ()   BEGIN
    SELECT * FROM Series;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_subscriptions` ()   BEGIN
    SELECT * FROM Subscription;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_watchlists` ()   BEGIN
    SELECT * FROM Watchlist;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_watchlist_movies` ()   BEGIN
    SELECT * FROM WatchlistMovie;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_all_watchlist_series` ()   BEGIN
    SELECT * FROM WatchlistSeries;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_classification_by_id` (`in_ClassificationID` INT)   BEGIN
    SELECT * FROM Classification WHERE ClassificationID = in_ClassificationID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_movie_by_id` (IN `p_MovieID` INT)   BEGIN
    SELECT * FROM Movie WHERE MovieID = p_MovieID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_profile_by_id` (IN `p_ProfileID` INT)   BEGIN
    SELECT * FROM Profile WHERE ProfileID = p_ProfileID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_series_by_id` (IN `p_SeriesID` INT)   BEGIN
    SELECT * FROM Series WHERE SeriesID = p_SeriesID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_subscription_by_user_id` (IN `userID` INT)   BEGIN
    SELECT * FROM Subscription WHERE UserID = userID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_watchlist_by_id` (IN `watchlistID` INT)   BEGIN
    SELECT * FROM Watchlist WHERE WatchlistID = watchlistID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_watchlist_movie_by_id` (IN `watchlistMovieID` INT)   BEGIN
    SELECT * FROM WatchlistMovie WHERE WatchlistMovieID = watchlistMovieID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `get_watchlist_series_by_id` (IN `watchlistSeriesID` INT)   BEGIN
    SELECT * FROM WatchlistSeries WHERE WatchlistSeriesID = watchlistSeriesID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `remove_classification` (`in_ClassificationID` INT)   BEGIN
    DELETE FROM Classification WHERE ClassificationID = in_ClassificationID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `remove_movie` (IN `p_MovieID` INT)   BEGIN
    DELETE FROM Movie WHERE MovieID = p_MovieID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_classification` (`in_ClassificationID` INT, `in_InterestedInFilms` TINYINT, `in_InterestedInSeries` TINYINT, `in_PreferedGenres` VARCHAR(10), `in_MinAge` VARCHAR(10), `in_ViewingClassification` INT)   BEGIN
    UPDATE Classification
    SET InterestedInFilms = in_InterestedInFilms,
        InterestedInSeries = in_InterestedInSeries,
        PreferedGenres = in_PreferedGenres,
        MinAge = in_MinAge,
        ViewingClassification = in_ViewingClassification
    WHERE ClassificationID = in_ClassificationID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_movie` (IN `p_MovieID` INT, IN `p_ClassificationID` INT, IN `p_MovieTitle` VARCHAR(50), IN `p_MovieDescription` VARCHAR(50), IN `p_AmountOfViews` INT, IN `p_ReleaseDate` DATE, IN `p_Genre` VARCHAR(50), IN `p_AvailableQualities` VARCHAR(10))   BEGIN
    UPDATE Movie
    SET ClassificationID = p_ClassificationID,
        MovieTitle = p_MovieTitle,
        MovieDescription = p_MovieDescription,
        AmountOfViews = p_AmountOfViews,
        ReleaseDate = p_ReleaseDate,
        Genre = p_Genre,
        AvailableQualities = p_AvailableQualities
    WHERE MovieID = p_MovieID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_profile` (IN `p_ProfileID` INT, IN `p_ProfileName` VARCHAR(50), IN `p_ProfilePhoto` TINYINT, IN `p_Age` INT, IN `p_Language` VARCHAR(50))   BEGIN
    -- Validate Profile
    IF p_Age <= 0 OR p_Age > 170 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid age. Age must be between 1 and 170.';
    END IF;

    IF NOT p_ProfileName REGEXP '^[a-zA-Z0-9\s]*$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid profile name. Profile name must not contain special characters.';
    END IF;

    IF LENGTH(p_ProfileName) > 30 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid profile name length. Profile name must not exceed 30 characters.';
    END IF;

    -- Update Profile
    UPDATE Profile
    SET ProfileName = p_ProfileName,
        ProfilePhoto = p_ProfilePhoto,
        Age = p_Age,
        Language = p_Language
    WHERE ProfileID = p_ProfileID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_series` (IN `p_SeriesID` INT, IN `p_SeriesTitle` VARCHAR(50), IN `p_SeriesDescription` VARCHAR(50), IN `p_AmountOfViews` INT, IN `p_AmountOfEpisodes` INT, IN `p_ReleaseDate` DATE, IN `p_Genre` VARCHAR(50), IN `p_AvailableQualities` VARCHAR(10))   BEGIN
    UPDATE Series
    SET SeriesTitle = p_SeriesTitle,
        SeriesDescription = p_SeriesDescription,
        AmountOfViews = p_AmountOfViews,
        AmountOfEpisodes = p_AmountOfEpisodes,
        ReleaseDate = p_ReleaseDate,
        Genre = p_Genre,
        AvailableQualities = p_AvailableQualities
    WHERE SeriesID = p_SeriesID;
END$$

CREATE DEFINER=`root`@`%` PROCEDURE `update_subscription` (IN `userID` INT, IN `subscriptionDescription` VARCHAR(50), IN `subscriptionPrice` DOUBLE, IN `subscriptionQuality` VARCHAR(2), IN `signUpDate` DATE, IN `friendInvited` TINYINT, IN `isPaidAccount` TINYINT)   BEGIN
    UPDATE Subscription 
    SET Description = subscriptionDescription, Price = subscriptionPrice, Quality = subscriptionQuality, SignUpDate = signUpDate, FriendInvited = friendInvited, IsPaidAccount = isPaidAccount
    WHERE UserID = userID;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `Classification`
--

CREATE TABLE `Classification` (
  `ClassificationID` int(11) NOT NULL,
  `InterestedInFilms` tinyint(4) DEFAULT NULL,
  `InterestedInSeries` tinyint(4) DEFAULT NULL,
  `PreferedGenres` varchar(10) DEFAULT NULL,
  `MinimumAge` varchar(10) DEFAULT NULL,
  `ViewingClassification` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Classification`
--

INSERT INTO `Classification` (`ClassificationID`, `InterestedInFilms`, `InterestedInSeries`, `PreferedGenres`, `MinimumAge`, `ViewingClassification`) VALUES
(1, 0, 0, 'horror', '15', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Movie`
--

CREATE TABLE `Movie` (
  `MovieID` int(11) NOT NULL,
  `ClassificationID` int(11) DEFAULT NULL,
  `MovieTitle` varchar(50) DEFAULT NULL,
  `MovieDescription` varchar(50) DEFAULT NULL,
  `AmountOfViews` int(11) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `AvailableQualities` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Movie`
--

INSERT INTO `Movie` (`MovieID`, `ClassificationID`, `MovieTitle`, `MovieDescription`, `AmountOfViews`, `ReleaseDate`, `Genre`, `AvailableQualities`) VALUES
(1, NULL, '123123', '123123123', 123123321, '2024-01-02', NULL, '123'),
(2, 1, 'Adventure time', 'Bad film', 4, '2004-12-12', 'action', 'HD');

-- --------------------------------------------------------

--
-- Структура таблицы `Profile`
--

CREATE TABLE `Profile` (
  `ProfileID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `ClassificationID` int(11) DEFAULT NULL,
  `WatchlistID` int(11) DEFAULT NULL,
  `ProfileName` varchar(50) DEFAULT NULL,
  `ProfilePhoto` tinyint(4) DEFAULT NULL,
  `Age` int(11) DEFAULT NULL,
  `Language` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Profile`
--

INSERT INTO `Profile` (`ProfileID`, `UserID`, `ClassificationID`, `WatchlistID`, `ProfileName`, `ProfilePhoto`, `Age`, `Language`) VALUES
(1, NULL, NULL, 28, 'Maksym', 1, 18, 'English');

-- --------------------------------------------------------

--
-- Структура таблицы `Series`
--

CREATE TABLE `Series` (
  `SeriesID` int(11) NOT NULL,
  `ClassificationID` int(11) DEFAULT NULL,
  `SeriesTitle` varchar(50) DEFAULT NULL,
  `SeriesDescription` varchar(50) DEFAULT NULL,
  `AmountOfViews` int(11) DEFAULT NULL,
  `AmountOfEpisodes` int(11) DEFAULT NULL,
  `ReleaseDate` date DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `availableQualities` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Series`
--

INSERT INTO `Series` (`SeriesID`, `ClassificationID`, `SeriesTitle`, `SeriesDescription`, `AmountOfViews`, `AmountOfEpisodes`, `ReleaseDate`, `Genre`, `availableQualities`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, NULL, 'Wahtever', 'Good film haa', NULL, NULL, '2004-12-12', 'romance', 'SD'),
(4, NULL, 'Wahtever', 'Good film haa', NULL, NULL, '2004-12-12', 'romance', 'SD');

-- --------------------------------------------------------

--
-- Структура таблицы `Subscription`
--

CREATE TABLE `Subscription` (
  `SubscriptionID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Price` double DEFAULT NULL,
  `Quality` varchar(2) DEFAULT NULL,
  `SignUpDate` date DEFAULT current_timestamp(),
  `FriendInvited` tinyint(4) DEFAULT NULL,
  `IsPaidAccount` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Subscription`
--

INSERT INTO `Subscription` (`SubscriptionID`, `UserID`, `Description`, `Price`, `Quality`, `SignUpDate`, `FriendInvited`, `IsPaidAccount`) VALUES
(10, 2, 'agd', 2012, 'HD', '2022-06-24', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `SubscriptionID` int(11) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(250) DEFAULT NULL,
  `ActivationStatus` tinyint(4) DEFAULT NULL,
  `LoginAttempts` int(11) DEFAULT NULL,
  `BlockStatus` tinyint(4) DEFAULT NULL,
  `FreeDaysLeft` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`UserID`, `SubscriptionID`, `Username`, `Email`, `Password`, `ActivationStatus`, `LoginAttempts`, `BlockStatus`, `FreeDaysLeft`, `role`) VALUES
(2, NULL, 'fsdsfdg', 'sgfdsgdfsgdf', 'fgdsgfdsdgsf', 1, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `Watchlist`
--

CREATE TABLE `Watchlist` (
  `WatchlistID` int(11) NOT NULL,
  `ProfileID` int(11) NOT NULL,
  `dateAdded` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Watchlist`
--

INSERT INTO `Watchlist` (`WatchlistID`, `ProfileID`, `dateAdded`) VALUES
(28, 1, '2024-01-19');

-- --------------------------------------------------------

--
-- Структура таблицы `WatchlistMovie`
--

CREATE TABLE `WatchlistMovie` (
  `WatchlistMovieID` int(11) NOT NULL,
  `WatchlistID` int(11) NOT NULL,
  `MovieID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `WatchlistSeries`
--

CREATE TABLE `WatchlistSeries` (
  `WatchlistSeriesID` int(11) NOT NULL,
  `WatchlistID` int(11) NOT NULL,
  `SeriesID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Classification`
--
ALTER TABLE `Classification`
  ADD PRIMARY KEY (`ClassificationID`),
  ADD KEY `ViewingClassification` (`ViewingClassification`);

--
-- Индексы таблицы `Movie`
--
ALTER TABLE `Movie`
  ADD PRIMARY KEY (`MovieID`),
  ADD KEY `ClassificationID` (`ClassificationID`);

--
-- Индексы таблицы `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`ProfileID`),
  ADD KEY `WatchlistID` (`WatchlistID`),
  ADD KEY `UserID` (`UserID`) USING BTREE,
  ADD KEY `ClassificationID` (`ClassificationID`) USING BTREE;

--
-- Индексы таблицы `Series`
--
ALTER TABLE `Series`
  ADD PRIMARY KEY (`SeriesID`),
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
  ADD PRIMARY KEY (`UserID`);

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
  MODIFY `ClassificationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Movie`
--
ALTER TABLE `Movie`
  MODIFY `MovieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `Profile`
--
ALTER TABLE `Profile`
  MODIFY `ProfileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Series`
--
ALTER TABLE `Series`
  MODIFY `SeriesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Subscription`
--
ALTER TABLE `Subscription`
  MODIFY `SubscriptionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Watchlist`
--
ALTER TABLE `Watchlist`
  MODIFY `WatchlistID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `WatchlistMovie`
--
ALTER TABLE `WatchlistMovie`
  MODIFY `WatchlistMovieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `WatchlistSeries`
--
ALTER TABLE `WatchlistSeries`
  MODIFY `WatchlistSeriesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Movie`
--
ALTER TABLE `Movie`
  ADD CONSTRAINT `Movie_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`);

--
-- Ограничения внешнего ключа таблицы `Profile`
--
ALTER TABLE `Profile`
  ADD CONSTRAINT `Profile_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  ADD CONSTRAINT `Profile_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`),
  ADD CONSTRAINT `Profile_ibfk_4` FOREIGN KEY (`WatchlistID`) REFERENCES `Watchlist` (`WatchlistID`);

--
-- Ограничения внешнего ключа таблицы `Series`
--
ALTER TABLE `Series`
  ADD CONSTRAINT `Series_ibfk_2` FOREIGN KEY (`ClassificationID`) REFERENCES `Classification` (`ClassificationID`);

--
-- Ограничения внешнего ключа таблицы `Subscription`
--
ALTER TABLE `Subscription`
  ADD CONSTRAINT `Subscription_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

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
