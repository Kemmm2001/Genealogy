CREATE DATABASE  IF NOT EXISTS `genealogy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `genealogy`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: genealogy
-- ------------------------------------------------------
-- Server version	8.0.34

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
  `CodeID` int DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  `TotalMoney` double DEFAULT NULL,
  `FreeSMS` int DEFAULT NULL,
  `FreeGmail` int DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  KEY `account_idx` (`CodeID`),
  KEY `RoleAccount_idx` (`RoleID`),
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
  `CodeID` int DEFAULT NULL,
  PRIMARY KEY (`AlbumID`),
  KEY `Album_idx` (`CodeID`),
  CONSTRAINT `Album` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `CodeID` int DEFAULT NULL,
  `ArticleUrl` varchar(80) DEFAULT NULL,
  `ArticleName` varchar(45) DEFAULT NULL,
  `ArticleDescription` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ArticleID`),
  KEY `Article_idx` (`CodeID`),
  CONSTRAINT `Article` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `ContactID` int NOT NULL AUTO_INCREMENT,
  `MemberID` int NOT NULL,
  `Address` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Phone1` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Phone2` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Email1` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Email2` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `FacebookUrl` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Zalo` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`ContactID`),
  KEY `contact_idx` (`MemberID`),
  CONSTRAINT `contact` FOREIGN KEY (`MemberID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,1,'Yên thủy-hòa bình','0123456789','0123456788','gmai.com','gmai1l.com','123','123'),(2,6,'Yên thủy-hòa bình','0123456789','0123456788','gmai.com','gmai1l.com','123','123'),(11,39,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(14,42,'Địa chỉ 1','Điện thoại 1','Điện Thoại 2',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
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
INSERT INTO `education` VALUES (1,1,'hùng1','hùng đã học ở đây','2001-02-26 00:00:00','2001-02-26 00:00:00'),(2,6,'Yên Thủy A','hùng đã học ở đây','2001-02-26 00:00:00','2001-02-26 00:00:00'),(6,42,'Trường ấp 2','Đây là trường cấp 1','2023-10-17 00:00:00','2023-11-02 00:00:00');
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
  `CodeID` int DEFAULT NULL,
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
  KEY `Eventfamily_idx` (`CodeID`),
  KEY `Repeat_idx` (`RepeatID`),
  CONSTRAINT `Eventfamily` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Repeat` FOREIGN KEY (`RepeatID`) REFERENCES `eventrepetition` (`RepeatID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
INSERT INTO `eventfamily` VALUES (1,'Event1',123,1,'2023-02-02 00:00:00','2023-03-03 00:00:00','Description1',1,'Note1','Place1',1,1,'1');
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
INSERT INTO `eventmember` VALUES (1,'Event test','123','123','2001-02-26 00:00:00','2001-02-26 00:00:00',1);
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
  `CodeID` int DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `History_idx` (`CodeID`),
  CONSTRAINT `History` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `PlaceOfDeadth` text,
  `GraveSite` text,
  `Note` longtext,
  `Generation` int DEFAULT NULL,
  `BloodType` varchar(3) DEFAULT NULL,
  `Male` tinyint NOT NULL,
  `CodeID` int DEFAULT NULL,
  `Image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  KEY `religion_idx` (`ReligionID`),
  KEY `Nationality_idx` (`NationalityID`),
  KEY `FamilyTree_idx` (`CodeID`),
  CONSTRAINT `FamilyTree` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nationality` FOREIGN KEY (`NationalityID`) REFERENCES `nationality` (`NationalityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `religion` FOREIGN KEY (`ReligionID`) REFERENCES `religion` (`ReligionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
INSERT INTO `familymember` VALUES (1,NULL,2,'Test1','NichName1',1,1,'Hòa Bình',1,1,'2001-10-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note1',1,NULL,1,123,NULL),(2,NULL,1,'test2','NichName2',1,1,'Hòa Bình',1,1,'2001-10-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note2',1,NULL,0,123,NULL),(3,1,4,'Test3','NichName3',1,1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note3',2,NULL,1,123,NULL),(4,1,3,'test4','NichName4',1,1,'Hòa Bình',1,1,'2001-05-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note4',2,NULL,0,123,NULL),(5,3,NULL,'test5','NichName5',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note5',3,NULL,1,123,NULL),(6,NULL,7,'A','Tên thường gọi là A',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,'1970-01-01 00:00:00',NULL,NULL,'Note',1,'A',1,123456,NULL),(7,NULL,6,'A\'','NichName1',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',1,'A',0,123456,NULL),(8,6,NULL,'B','NichName1',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',2,'B',1,123456,NULL),(10,8,NULL,'C','C',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',3,'A',1,123456,NULL),(11,8,NULL,'D','D',1,2,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',3,'AB',1,123456,NULL),(12,10,NULL,'E','E',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',4,'A',1,123456,NULL),(13,11,NULL,'M','M',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',4,'A',1,123456,NULL),(14,13,NULL,'N','N',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',5,'A',0,123456,NULL),(15,12,NULL,'F','F',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',5,'B',1,123456,NULL),(16,12,NULL,'H','H',1,2,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',5,'B',0,123456,NULL),(17,12,NULL,'L','L',1,3,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',5,'A',1,123456,NULL),(18,15,NULL,'G','G',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',6,'B',1,123456,NULL),(19,15,39,'Z','Z',1,2,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,'1970-01-01 00:00:00',NULL,NULL,'Note',5,'B',0,123456,NULL),(20,17,NULL,'X','X',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',6,'A',0,123456,NULL),(21,18,NULL,'J','J',1,1,'Hòa Bình',1,1,'2001-03-26 00:00:00','2001-03-26 00:00:00','Hòa Bình',0,NULL,NULL,NULL,'Note',7,'A',0,123456,NULL),(23,17,NULL,'Test1','test',NULL,1,'Hòa Bình',1,1,'2023-10-09 00:00:00','2023-10-09 00:00:00','Hòa Bình',0,NULL,NULL,NULL,NULL,6,'A',1,123456,NULL),(39,NULL,19,'Vợ của Z','z',NULL,1,'Hà Nội',1,2,'2023-10-28 00:00:00','2023-10-28 00:00:00','Hà Nội',0,NULL,NULL,NULL,NULL,6,'A',1,123456,NULL),(42,19,NULL,'Tên con là Z\'','Tên thường gọi là Z',NULL,1,'Hà nội',1,1,'2023-10-09 00:00:00','2023-10-09 00:00:00','Hà bình',0,'1970-01-01 00:00:00',NULL,NULL,NULL,7,'A',1,NULL,NULL);
/*!40000 ALTER TABLE `familymember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familytree`
--

DROP TABLE IF EXISTS `familytree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familytree` (
  `CodeID` int NOT NULL,
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
INSERT INTO `familytree` VALUES (123,'Lê','Kinh','1890-02-23 00:00:00',4),(199,'HUNG1','',NULL,NULL),(123456,'Nguyễn','Mường','1890-02-23 00:00:00',6);
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
  `CodeID` int DEFAULT NULL,
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
  KEY `FamilytreeConfig_idx` (`CodeID`),
  CONSTRAINT `FamilytreeConfig` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO `job` VALUES (1,1,'123','123','1','Test1','2001-02-26 00:00:00','2001-02-26 00:00:00'),(2,1,'Job2','Job2Adress','123','Test2','2001-02-26 00:00:00','2001-02-26 00:00:00'),(4,1,'Test3',NULL,'Role3','JobName3','2022-08-11 00:00:00','2022-09-13 00:00:00'),(5,6,'Job','Job2Adress','Rol1','JobName3','2022-08-11 00:00:00','2022-09-13 00:00:00');
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
INSERT INTO `memberrole` VALUES (1,2,123),(2,2,123),(3,2,123),(NULL,NULL,123),(6,1,NULL);
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
-- Table structure for table `printingconfig`
--

DROP TABLE IF EXISTS `printingconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printingconfig` (
  `PrintID` int NOT NULL AUTO_INCREMENT,
  `CodeID` int DEFAULT NULL,
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
  KEY `PrintConfig_idx` (`CodeID`),
  CONSTRAINT `PrintConfig` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
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

-- Dump completed on 2023-10-31 15:01:40
