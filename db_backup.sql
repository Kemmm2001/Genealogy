CREATE DATABASE  IF NOT EXISTS `genealogy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `genealogy`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 14.225.254.123    Database: genealogy
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `AccountID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Email` varchar(150) DEFAULT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  `TotalMoney` double DEFAULT NULL,
  `FreeSMS` int DEFAULT NULL,
  `FreeEmail` int DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  KEY `RoleAccount_idx` (`RoleID`),
  KEY `account_idx` (`CodeID`),
  CONSTRAINT `account` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RoleAccount` FOREIGN KEY (`RoleID`) REFERENCES `roleaccount` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account access`
--

DROP TABLE IF EXISTS `account access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account access` (
  `AccountID` int NOT NULL,
  `Token` varchar(200) DEFAULT NULL,
  `Refesh - Token` varchar(200) DEFAULT NULL,
  `ExpireTime` int DEFAULT NULL,
  KEY `accountaccess_idx` (`AccountID`),
  CONSTRAINT `accountaccess` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account access`
--

LOCK TABLES `account access` WRITE;
/*!40000 ALTER TABLE `account access` DISABLE KEYS */;
/*!40000 ALTER TABLE `account access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albumphoto`
--

DROP TABLE IF EXISTS `albumphoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albumphoto` (
  `AlbumID` int NOT NULL AUTO_INCREMENT,
  `AlbumName` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`AlbumID`),
  KEY `ablum_idx` (`CodeID`),
  CONSTRAINT `ablum` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albumphoto`
--

LOCK TABLES `albumphoto` WRITE;
/*!40000 ALTER TABLE `albumphoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `albumphoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `ArticleID` int NOT NULL AUTO_INCREMENT,
  `CodeID` varchar(20) DEFAULT NULL,
  `ArticleUrl` varchar(80) DEFAULT NULL,
  `ArticleName` varchar(45) DEFAULT NULL,
  `ArticleDescription` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ArticleID`),
  KEY `article_idx` (`CodeID`),
  CONSTRAINT `article` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `CityId` int NOT NULL AUTO_INCREMENT,
  `CittName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`CityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `ContactID` int NOT NULL AUTO_INCREMENT,
  `MemberID` int NOT NULL,
  `Address` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Phone` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FacebookUrl` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Zalo` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`ContactID`),
  KEY `contact_idx` (`MemberID`),
  CONSTRAINT `contact` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `DistrictId` int NOT NULL AUTO_INCREMENT,
  `DistrictName` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CityId` int DEFAULT NULL,
  PRIMARY KEY (`DistrictId`),
  KEY `City_idx` (`CityId`),
  CONSTRAINT `City` FOREIGN KEY (`CityId`) REFERENCES `city` (`CityId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `EducationID` int NOT NULL AUTO_INCREMENT,
  `MemberID` int DEFAULT NULL,
  `School` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Description` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`EducationID`),
  KEY `education_idx` (`MemberID`),
  CONSTRAINT `education` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventfamily`
--

DROP TABLE IF EXISTS `eventfamily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventfamily` (
  `EventID` int NOT NULL AUTO_INCREMENT,
  `EventName` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `Status` tinyint DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Description` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `IsImportant` tinyint DEFAULT NULL,
  `Note` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Place` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `RepeatID` int DEFAULT NULL,
  `IsSolarCalendar` tinyint DEFAULT NULL,
  `eventfamilycol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  KEY `Repeat_idx` (`RepeatID`),
  KEY `event_idx` (`CodeID`),
  CONSTRAINT `event` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Repeat` FOREIGN KEY (`RepeatID`) REFERENCES `eventrepetition` (`RepeatID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
INSERT INTO `eventfamily` VALUES (1,'Event1','123',1,'2023-02-02 00:00:00','2023-03-03 00:00:00','Description1',1,'Note1','Place1',1,1,'1');
/*!40000 ALTER TABLE `eventfamily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventmember`
--

DROP TABLE IF EXISTS `eventmember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventmember` (
  `EventMemberID` int NOT NULL AUTO_INCREMENT,
  `EventMemberName` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Location` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Description` varchar(300) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `MemberID` int DEFAULT NULL,
  PRIMARY KEY (`EventMemberID`),
  KEY `eventMember_idx` (`MemberID`),
  CONSTRAINT `eventMember` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventmember`
--

LOCK TABLES `eventmember` WRITE;
/*!40000 ALTER TABLE `eventmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventrepetition`
--

DROP TABLE IF EXISTS `eventrepetition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventrepetition` (
  `RepeatID` int NOT NULL AUTO_INCREMENT,
  `RepeatName` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`RepeatID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventrepetition`
--

LOCK TABLES `eventrepetition` WRITE;
/*!40000 ALTER TABLE `eventrepetition` DISABLE KEYS */;
INSERT INTO `eventrepetition` VALUES (1,'Year'),(2,'Month'),(3,'No Repeat');
/*!40000 ALTER TABLE `eventrepetition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familyhistory`
--

DROP TABLE IF EXISTS `familyhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familyhistory` (
  `HistoryID` int NOT NULL AUTO_INCREMENT,
  `CodeID` varchar(20) DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `history_idx` (`CodeID`),
  CONSTRAINT `history` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyhistory`
--

LOCK TABLES `familyhistory` WRITE;
/*!40000 ALTER TABLE `familyhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `familyhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familymember`
--

DROP TABLE IF EXISTS `familymember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familymember` (
  `MemberID` int NOT NULL AUTO_INCREMENT,
  `ParentID` int DEFAULT NULL,
  `MarriageID` int DEFAULT NULL,
  `MemberName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `NickName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `HasNickName` tinyint DEFAULT NULL,
  `BirthOrder` int DEFAULT NULL,
  `Origin` text,
  `NationalityID` int DEFAULT NULL,
  `ReligionID` int DEFAULT NULL,
  `Dob` datetime DEFAULT NULL,
  `LunarDob` datetime DEFAULT NULL,
  `BirthPlace` text,
  `IsDead` tinyint NOT NULL,
  `Dod` datetime DEFAULT NULL,
  `PlaceOfDeath` text,
  `GraveSite` text,
  `Note` longtext,
  `Generation` int DEFAULT NULL,
  `BloodType` varchar(3) DEFAULT NULL,
  `Male` tinyint NOT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `LunarDod` datetime DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  KEY `religion_idx` (`ReligionID`),
  KEY `Nationality_idx` (`NationalityID`),
  KEY `FamilyTree_idx` (`CodeID`),
  CONSTRAINT `familyMember` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nationality` FOREIGN KEY (`NationalityID`) REFERENCES `nationality` (`NationalityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `religion` FOREIGN KEY (`ReligionID`) REFERENCES `religion` (`ReligionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
INSERT INTO `familymember` VALUES (1,NULL,2,'Nguyễn Văn Nhượng','',1,7,'Hưng Yên',1,2,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,1,'A',1,'123456','',NULL),(2,NULL,1,'Bùi Thị Tỷ','',1,7,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,1,'A',0,'123456','',NULL),(3,1,4,'Nguyễn Văn Nghịnh','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',1,'123456','',NULL),(4,NULL,3,'Bùi Thị Thêu','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'B',0,'123456','',NULL),(5,1,6,'Nguyễn Thị Kiến','',1,2,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',0,'123456','',NULL),(6,NULL,5,'Bùi Văn Y','',1,2,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',1,'123456','',NULL),(7,1,8,'Nguyễn Văn Mùi','',1,3,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',1,'123456','',NULL),(8,NULL,7,'Bùi Thị Bi','',1,3,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'AB',0,'123456','',NULL),(9,1,NULL,'Nguyễn Văn Tất','',1,4,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',1,'123456','',NULL),(10,1,11,'Nguyễn Văn Giáng','',1,5,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'O',1,'123456','',NULL),(11,NULL,10,'Quách Thị Nhung','',1,5,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',0,'123456','',NULL),(12,1,13,'Nguyễn Thị Huế','',1,6,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',0,'123456','',NULL),(13,NULL,12,'Trịnh Đình Chí','',1,6,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,2,'A',1,'123456','',NULL),(14,3,15,'Nguyễn Văn Vĩnh','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',1,'123456','',NULL),(15,NULL,14,'Bùi Thị Diện','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',0,'123456','',NULL),(16,3,17,'Nguyễn Thị Viễn','',1,2,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',0,'123456','',NULL),(17,NULL,16,'Hả Kế Tần','',1,2,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',1,'123456','',NULL),(18,7,19,'Nguyễn Sinh Cháu','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',1,'123456','',NULL),(19,NULL,18,'Phạm Thị Thực','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'O',0,'123456','',NULL),(20,10,21,'Nguyễn Văn Giang','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',1,'123456','',NULL),(21,NULL,20,'Bùi Thị Phong','',1,1,'Hưng Yên',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hưng Yên',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',0,'123456','',NULL),(22,10,23,'Nguyễn Ngọc Sơn','',1,2,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',1,'123456','',NULL),(23,NULL,22,'Bùi Thị Miền','',1,2,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',0,'123456','',NULL),(24,10,25,'Nguyễn Thị Lạc','',1,3,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'A',0,'123456','',NULL),(25,NULL,24,'Bùi Xuân Đắc','',1,3,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',1,'123456','',NULL),(26,10,NULL,'Nguyễn Văn Thúy','',1,4,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',1,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',0,'123456','',NULL),(27,10,28,'Nguyễn Ngọc Hồng','',1,5,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'B',1,'123456','',NULL),(28,NULL,27,'Phạm Thị Thông','',1,5,'Hòa Bình',1,1,'1980-05-24 00:00:00','1980-05-24 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,3,'O',0,'123456','',NULL),(29,14,30,'Nguyễn Thị Kim Quế','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(30,NULL,29,'Nguyễn Văn Quỳnh','',1,1,'Hòa Bình',1,1,'1966-01-12 00:00:00','1966-01-12 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',1,'123456','',NULL),(31,14,32,'Nguyễn Thị Huệ','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(32,NULL,31,'Bùi Văn Lư','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(33,14,34,'Nguyễn Thị Hiền','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',0,'123456','',NULL),(34,NULL,33,'Vũ Văn Toàn','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',1,'123456','',NULL),(35,14,36,'Nguyễn Thị Thanh','',1,4,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'O',0,'123456','',NULL),(36,NULL,35,'Bùi Văn Nhiên','',1,4,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',1,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',1,'123456','',NULL),(37,14,38,'Nguyễn Duy Chiến','',1,5,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'O',1,'123456','',NULL),(38,NULL,37,'Bùi Thị Loan','',1,5,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',0,'123456','',NULL),(39,14,40,'Nguyễn Hữu Hòa','',1,6,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'O',1,'123456','',NULL),(40,NULL,39,'Trần Thị Thoan','',1,6,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(41,14,42,'Nguyễn Hữu Hợp','',1,7,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',1,'123456','',NULL),(42,NULL,41,'Bùi Thị Ngân','',1,7,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(43,18,44,'Nguyễn Văn Loan','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(44,NULL,43,'Quach Thị Sen','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(45,18,46,'Nguyễn Ngọc Chanh','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(46,NULL,45,'Trần Thị Huế','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(47,18,48,'Nguyễn Thị Ngàn','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(48,NULL,47,'Bùi Văn Vĩnh','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(49,20,50,'Nguyễn Thị Phương','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',0,'123456','',NULL),(50,NULL,49,'Vũ Đình Nam','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(51,20,52,'Nguyễn Thị Linh','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(52,NULL,51,'Lâm A Niên','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(53,20,54,'Nguyễn Văn Trường','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(54,NULL,53,'Đinh Thị Thu','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(55,20,56,'Nguyễn Văn Giang','',1,4,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',1,'123456','',NULL),(56,NULL,55,'Dương Phương Anh','',1,4,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'O',0,'123456','',NULL),(57,22,58,'Nguyễn Ngọc Sang','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',1,'123456','',NULL),(58,NULL,57,'Nguyễn Thị Mai','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',0,'123456','',NULL),(59,22,60,'Nguyễn Ngọc Hoàng','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',1,'123456','',NULL),(60,NULL,59,'Bùi Thanh Huyền','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',0,'123456','',NULL),(61,27,62,'Nguyễn Thị Thủy','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(62,NULL,61,'Nguyễn Văn Tâm','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'O',1,'123456','',NULL),(63,27,64,'Nguyễn Minh Hiếu','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',1,'123456','',NULL),(64,NULL,63,'Trăm Thị Xuyên','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'AB',0,'123456','',NULL),(65,27,66,'Nguyễn Thị Thảo','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'B',0,'123456','',NULL),(66,NULL,65,'Hoàng Văn Nga','',1,3,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa  Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,4,'A',1,'123456','',NULL),(67,37,NULL,'Nguyễn Duy Mạnh','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'A',1,'123456','',NULL),(68,37,NULL,'Nguyễn Duy Tuấn','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'A',1,'123456','',NULL),(69,39,NULL,'Nguyễn Thi Hương','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'A',0,'123456','',NULL),(70,39,NULL,'Nguyễn Hữu Phái','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'B',0,'123456','',NULL),(71,41,NULL,'Nguyễn Bảo Vy','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'A',0,'123456','',NULL),(72,41,NULL,'Nguyễn Hữu Thành','',1,2,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'B',1,'123456','',NULL),(73,43,NULL,'Nguyễn Thanh Mai','',1,1,'Hòa Bình',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'AB',0,'123456','',NULL),(74,43,NULL,'Nguyễn Thành Đại','',1,2,'Hòa Bình1',1,1,'1968-08-03 00:00:00','1968-08-03 00:00:00','Hòa Bình',0,'1980-05-24 00:00:00',NULL,NULL,NULL,5,'AB',1,'123456','',NULL),(75,NULL,2,'John Doe','Johnny',1,1,'New York',1,2,'1980-05-24 00:00:00','1980-03-15 00:00:00','New York Hospital',1,'1980-05-24 00:00:00',NULL,NULL,NULL,1,'A',1,'123','\\uploads\\images\\member-photo\\8198bedc9efaeb1090ba163a0db781.png',NULL),(77,NULL,2,'John Doe','Johnny',1,1,'New York',1,2,'1980-05-24 00:00:00','1980-03-15 00:00:00','New York Hospital',1,'1980-05-24 00:00:00',NULL,NULL,NULL,1,'A',1,'123','\\uploads\\images\\member-photo\\84477edcdda14b01cecfd3a26ce8b4.png',NULL),(79,NULL,NULL,'John Doe','Johnny',NULL,1,'New York',NULL,NULL,'1980-05-24 00:00:00','1980-03-15 00:00:00','New York Hospital',1,'1980-05-24 00:00:00','Nam Dinh','Khong biet','day la note',0,'A',1,'123',NULL,'2000-05-24 00:00:00');
/*!40000 ALTER TABLE `familymember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familytree`
--

DROP TABLE IF EXISTS `familytree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familytree` (
  `CodeID` varchar(20) NOT NULL,
  `TreeName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Ethnicity` varchar(45) NOT NULL,
  `DeathAnniversary` datetime DEFAULT NULL,
  `MemberId` int DEFAULT NULL,
  PRIMARY KEY (`CodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familytree`
--

LOCK TABLES `familytree` WRITE;
/*!40000 ALTER TABLE `familytree` DISABLE KEYS */;
INSERT INTO `familytree` VALUES ('123','Lê','Kinh','1890-02-23 00:00:00',4),('123456','Nguyễn','Mường','1890-02-23 00:00:00',6),('123456789','Thị','Mường','1998-01-23 12:45:56',NULL);
/*!40000 ALTER TABLE `familytree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familytreeconfig`
--

DROP TABLE IF EXISTS `familytreeconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familytreeconfig` (
  `TreeConfigID` int NOT NULL AUTO_INCREMENT,
  `CodeID` varchar(20) DEFAULT NULL,
  `Generations` int DEFAULT NULL,
  `ChartWidth` int DEFAULT NULL,
  `ChartHeight` int DEFAULT NULL,
  `ColorIntensity` int DEFAULT NULL,
  `PhotoBorder` int DEFAULT NULL,
  `BasicScale` int DEFAULT NULL,
  `AncestorScale` int DEFAULT NULL,
  `TextColor` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `AncestorBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FamilyHeadBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `MaleBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FemaleBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `UnknownGenderBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `DeadBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FocusBackground` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FamilyHeadLineColor` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `ParentChildLineColor` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `HusbandWifeLineColor` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `familytreeconfigcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TreeConfigID`),
  KEY `treeConfig_idx` (`CodeID`),
  CONSTRAINT `treeConfig` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familytreeconfig`
--

LOCK TABLES `familytreeconfig` WRITE;
/*!40000 ALTER TABLE `familytreeconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `familytreeconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job`
--

DROP TABLE IF EXISTS `job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job` (
  `JobID` int NOT NULL AUTO_INCREMENT,
  `MemberID` int DEFAULT NULL,
  `Organization` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `OrganizationAddress` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Role` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `JobName` varchar(4000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  PRIMARY KEY (`JobID`),
  KEY `JobID_idx` (`MemberID`),
  CONSTRAINT `Job` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberphoto`
--

DROP TABLE IF EXISTS `memberphoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberphoto` (
  `PhotoID` int NOT NULL AUTO_INCREMENT,
  `AlbumID` int DEFAULT NULL,
  `PhotoUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`PhotoID`),
  KEY `memberPhoto_idx` (`AlbumID`),
  CONSTRAINT `memberPhoto` FOREIGN KEY (`AlbumID`) REFERENCES `albumphoto` (`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberphoto`
--

LOCK TABLES `memberphoto` WRITE;
/*!40000 ALTER TABLE `memberphoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `memberphoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberrole`
--

DROP TABLE IF EXISTS `memberrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberrole` (
  `MemberID` int DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  `CodeId` int DEFAULT NULL,
  KEY `roleMember_idx` (`MemberID`),
  KEY `RoleID_idx` (`RoleID`),
  CONSTRAINT `RoleID` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roleMember` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberrole`
--

LOCK TABLES `memberrole` WRITE;
/*!40000 ALTER TABLE `memberrole` DISABLE KEYS */;
INSERT INTO `memberrole` VALUES (NULL,NULL,123),(1,1,123456);
/*!40000 ALTER TABLE `memberrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `money`
--

DROP TABLE IF EXISTS `money`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `money` (
  `MoneyID` int NOT NULL AUTO_INCREMENT,
  `AccountID` int DEFAULT NULL,
  `TransactionAmount` double DEFAULT NULL,
  `DayTrading` datetime DEFAULT NULL,
  PRIMARY KEY (`MoneyID`),
  KEY `moneyu_idx` (`AccountID`),
  CONSTRAINT `moneyu` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `money`
--

LOCK TABLES `money` WRITE;
/*!40000 ALTER TABLE `money` DISABLE KEYS */;
/*!40000 ALTER TABLE `money` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nationality`
--

DROP TABLE IF EXISTS `nationality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nationality` (
  `NationalityID` int NOT NULL AUTO_INCREMENT,
  `NationalityName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`NationalityID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nationality`
--

LOCK TABLES `nationality` WRITE;
/*!40000 ALTER TABLE `nationality` DISABLE KEYS */;
INSERT INTO `nationality` VALUES (1,'Việt Nam'),(2,'Ba Lan'),(3,'Ba Tư'),(4,'Belarus'),(5,'Bồ Đầu Nha'),(6,'Bun-ga-ri'),(7,'Canada'),(8,'Croatia'),(9,'Đan Mạch'),(10,'Đức'),(11,'Lào'),(12,'Hà Lan');
/*!40000 ALTER TABLE `nationality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificationhistory`
--

DROP TABLE IF EXISTS `notificationhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificationhistory` (
  `NotificationHistoryId` int NOT NULL AUTO_INCREMENT,
  `NotificationContent` varchar(5000) DEFAULT NULL,
  `NotificationDate` datetime DEFAULT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`NotificationHistoryId`),
  KEY `Notification_idx` (`CodeID`),
  CONSTRAINT `Notification` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationhistory`
--

LOCK TABLES `notificationhistory` WRITE;
/*!40000 ALTER TABLE `notificationhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificationhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printingconfig`
--

DROP TABLE IF EXISTS `printingconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printingconfig` (
  `PrintID` int NOT NULL AUTO_INCREMENT,
  `CodeID` varchar(20) DEFAULT NULL,
  `BorderlineColor` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BorderlineDesign` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `AspectRatio` int DEFAULT NULL,
  `TitleID` int DEFAULT NULL,
  `Background` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BackgroundUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BackgroundDesign` int DEFAULT NULL,
  `BackgroundDesignConfig` int DEFAULT NULL,
  `HasCreateDate` tinyint DEFAULT NULL,
  `HasCreator` tinyint DEFAULT NULL,
  `CreatorTextColor` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CreatorTextSize` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`PrintID`),
  KEY `Title_idx` (`TitleID`),
  KEY `printConfig_idx` (`CodeID`),
  CONSTRAINT `printConfig` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Title` FOREIGN KEY (`TitleID`) REFERENCES `title` (`TitleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `printingconfig`
--

LOCK TABLES `printingconfig` WRITE;
/*!40000 ALTER TABLE `printingconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `printingconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `religion`
--

DROP TABLE IF EXISTS `religion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `religion` (
  `ReligionID` int NOT NULL AUTO_INCREMENT,
  `ReligionName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`ReligionID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
INSERT INTO `religion` VALUES (1,'Hòa hảo'),(2,'Hồi giáo'),(3,'Hindu'),(4,'Thiên chúa giáo'),(5,'Ấn độ giáo'),(6,'Phật giáo'),(7,'Công giáo'),(8,'Tin lành'),(9,'Cao đài'),(10,'Tôn giáo khác');
/*!40000 ALTER TABLE `religion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Tổ Phụ'),(2,'Tộc Trưởng'),(3,'Normal');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roleaccount`
--

DROP TABLE IF EXISTS `roleaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roleaccount` (
  `RoleID` int NOT NULL AUTO_INCREMENT,
  `RoleName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleaccount`
--

LOCK TABLES `roleaccount` WRITE;
/*!40000 ALTER TABLE `roleaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `roleaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `title`
--

DROP TABLE IF EXISTS `title`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `title` (
  `TitleID` int NOT NULL AUTO_INCREMENT,
  `TitleName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Font` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FamilyName` varchar(40) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `IsFixedVertical` tinyint DEFAULT NULL,
  `IsFixedHorizontal` tinyint DEFAULT NULL,
  `IsBold` tinyint DEFAULT NULL,
  `IsItalic` tinyint DEFAULT NULL,
  `TextSize` int DEFAULT NULL,
  `LineSpacing` int DEFAULT NULL,
  `TextColor` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `UploadedTitleUrl` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`TitleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `title`
--

LOCK TABLES `title` WRITE;
/*!40000 ALTER TABLE `title` DISABLE KEYS */;
/*!40000 ALTER TABLE `title` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-12 11:30:40
