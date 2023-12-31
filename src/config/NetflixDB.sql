USE [master]
GO
/****** Object:  Database [NetflixDB]    Script Date: 08.12.2023 20:13:38 ******/
CREATE DATABASE [NetflixDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'NetflixDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\NetflixDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'NetflixDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\NetflixDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [NetflixDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [NetflixDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [NetflixDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [NetflixDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [NetflixDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [NetflixDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [NetflixDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [NetflixDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [NetflixDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [NetflixDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [NetflixDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [NetflixDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [NetflixDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [NetflixDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [NetflixDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [NetflixDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [NetflixDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [NetflixDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [NetflixDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [NetflixDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [NetflixDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [NetflixDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [NetflixDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [NetflixDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [NetflixDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [NetflixDB] SET  MULTI_USER 
GO
ALTER DATABASE [NetflixDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [NetflixDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [NetflixDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [NetflixDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [NetflixDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [NetflixDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [NetflixDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [NetflixDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [NetflixDB]
GO
/****** Object:  Table [dbo].[Classification]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Classification](
	[ClassificationID] [int] NOT NULL,
	[PreferenceID] [int] NULL,
	[InterestedInFilms] [bit] NULL,
	[InterestedInSeries] [bit] NULL,
	[PreferedGenres--] [nchar](10) NULL,
	[MinimumAge--] [nchar](10) NULL,
	[ViewingClassification--] [nchar](10) NULL,
 CONSTRAINT [PK_Classification] PRIMARY KEY CLUSTERED 
(
	[ClassificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Content]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Content](
	[ContentID] [int] NOT NULL,
	[SeriesID_] [int] NULL,
	[MovieID_] [int] NULL,
	[ProfileID_] [int] NULL,
 CONSTRAINT [PK_Content] PRIMARY KEY CLUSTERED 
(
	[ContentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genre]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genre](
	[GenreID] [int] NOT NULL,
	[Genre] [varchar](50) NULL,
 CONSTRAINT [PK_Genre] PRIMARY KEY CLUSTERED 
(
	[GenreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movie]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movie](
	[MovieID] [int] NOT NULL,
	[GenreID_] [int] NULL,
	[MovieTitle] [varchar](50) NULL,
	[MovieDescription] [varchar](50) NULL,
	[Quality--] [nchar](10) NULL,
	[AmountOfViews] [int] NULL,
	[ReleaseDate] [date] NULL,
	[Genre] [varchar](50) NULL,
	[Availability] [bit] NULL,
	[AvailableQualities--] [nchar](10) NULL,
 CONSTRAINT [PK_Movie] PRIMARY KEY CLUSTERED 
(
	[MovieID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Profile]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Profile](
	[ProfileID] [int] NULL,
	[UserID_] [int] NULL,
	[ClassificationID_] [int] NULL,
	[ContentID_] [int] NULL,
	[ProfileName] [varchar](50) NULL,
	[ProfilePhoto] [bit] NULL,
	[Age] [int] NULL,
	[Language] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Series]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Series](
	[SeriesID] [int] NOT NULL,
	[GenreID_] [int] NULL,
	[ClassificationID_] [int] NULL,
	[SeriesTitle] [varchar](50) NULL,
	[SeriesDescription] [varchar](50) NULL,
	[Quality] [varchar](50) NULL,
	[AmountOfViews] [int] NULL,
	[AmountOfEpisodes] [int] NULL,
	[ReleaseDate] [date] NULL,
	[Genre] [varchar](50) NULL,
	[Availability] [bit] NULL,
	[availableQualities--] [nchar](10) NULL,
	[Classification] [varchar](50) NULL,
 CONSTRAINT [PK_Series] PRIMARY KEY CLUSTERED 
(
	[SeriesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Subscription]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Subscription](
	[SubscriptionID] [int] NULL,
	[UserID] [int] NULL,
	[Description] [varchar](50) NULL,
	[Price] [float] NULL,
	[Quality--] [int] NULL,
	[SubscriptionType--] [varchar](50) NULL,
	[SignUpDate] [date] NULL,
	[FriendInvited] [bit] NULL,
	[IsPaidAccount] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserID] [int] NOT NULL,
	[Username] [varchar](50) NULL,
	[Email] [varchar](50) NULL,
	[Password] [varchar](50) NULL,
	[ActivationStatus] [bit] NULL,
	[LoginAttempts] [int] NULL,
	[BlockStatus] [bit] NULL,
	[FreeDaysLeft] [int] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Watchlist]    Script Date: 08.12.2023 20:13:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Watchlist](
	[WatchlistID] [int] NOT NULL,
	[ProfileID] [int] NULL,
	[UserID] [int] NULL,
	[SeriesID] [int] NULL,
	[MovieID] [int] NULL,
	[dateAdded] [date] NULL,
 CONSTRAINT [PK_Watchlist] PRIMARY KEY CLUSTERED 
(
	[WatchlistID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Subscription]  WITH CHECK ADD  CONSTRAINT [FK_Subscription_User] FOREIGN KEY([UserID])
REFERENCES [dbo].[User] ([UserID])
GO
ALTER TABLE [dbo].[Subscription] CHECK CONSTRAINT [FK_Subscription_User]
GO
USE [master]
GO
ALTER DATABASE [NetflixDB] SET  READ_WRITE 
GO
