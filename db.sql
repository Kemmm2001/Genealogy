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
  `CodeID` int DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
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
-- Table structure for table `accountaccess`
--

DROP TABLE IF EXISTS `accountaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accountaccess` (
  `AccountID` int NOT NULL,
  `CodeID` int NOT NULL,
  `Amount` int DEFAULT NULL,
  `IsAdmin` bit(1) DEFAULT NULL,
  `AccountAccesscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`AccountID`,`CodeID`),
  CONSTRAINT `AccountAccess` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountaccess`
--

LOCK TABLES `accountaccess` WRITE;
/*!40000 ALTER TABLE `accountaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `ArticleID` int NOT NULL AUTO_INCREMENT,
  `AccountID` int DEFAULT NULL,
  `ArticleUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`ArticleID`),
  KEY `Article_idx` (`AccountID`),
  CONSTRAINT `Article` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `AccountID` int DEFAULT NULL,
  `Status` bit(1) DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `Description` varchar(1000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `IsImportant` bit(1) DEFAULT NULL,
  `Note` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Place` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `RepeatID` int DEFAULT NULL,
  `IsSolarCalendar` bit(1) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  KEY `Eventfamily_idx` (`AccountID`),
  KEY `Repeat_idx` (`RepeatID`),
  CONSTRAINT `Eventfamily` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Repeat` FOREIGN KEY (`RepeatID`) REFERENCES `eventrepetition` (`RepeatID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventrepetition`
--

LOCK TABLES `eventrepetition` WRITE;
/*!40000 ALTER TABLE `eventrepetition` DISABLE KEYS */;
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
  `AccountID` int DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `History_idx` (`AccountID`),
  CONSTRAINT `History` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `MemberName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `NickName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `HasNickName` bit(1) DEFAULT NULL,
  `BirthOrder` int DEFAULT NULL,
  `Origin` text,
  `NationalityID` int DEFAULT NULL,
  `ReligionID` int DEFAULT NULL,
  `Dob` datetime DEFAULT NULL,
  `LunarDob` datetime DEFAULT NULL,
  `BirthPlace` text,
  `IsAlive` bit(1) DEFAULT NULL,
  `Dod` datetime DEFAULT NULL,
  `PlaceOfDeadth` text,
  `GraveSite` text,
  `Note` longtext NOT NULL,
  `Generation` int DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  `CodeID` int DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  KEY `Role_idx` (`RoleID`),
  KEY `religion_idx` (`ReligionID`),
  KEY `Nationality_idx` (`NationalityID`),
  KEY `FamilyTree_idx` (`CodeID`),
  CONSTRAINT `FamilyTree` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nationality` FOREIGN KEY (`NationalityID`) REFERENCES `nationality` (`NationalityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `religion` FOREIGN KEY (`ReligionID`) REFERENCES `religion` (`ReligionID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Role` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
/*!40000 ALTER TABLE `familymember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familyrelationship`
--

DROP TABLE IF EXISTS `familyrelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familyrelationship` (
  `FamilyRelationshipID` int NOT NULL AUTO_INCREMENT,
  `Member1ID` int DEFAULT NULL,
  `Member2ID` int DEFAULT NULL,
  `Relationship1ID` int DEFAULT NULL,
  `Relationship2ID` int DEFAULT NULL,
  PRIMARY KEY (`FamilyRelationshipID`),
  KEY `familyrelationship1_idx` (`Member1ID`,`Member2ID`),
  KEY `familyrelationship2_idx` (`Member2ID`),
  KEY `Relationship1Id_idx` (`Relationship1ID`),
  KEY `Relationship2Id_idx` (`Relationship2ID`),
  CONSTRAINT `familyrelationship1` FOREIGN KEY (`Member1ID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `familyrelationship2` FOREIGN KEY (`Member2ID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Relationship1Id` FOREIGN KEY (`Relationship1ID`) REFERENCES `relationship` (`RelationshipID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Relationship2Id` FOREIGN KEY (`Relationship2ID`) REFERENCES `relationship` (`RelationshipID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyrelationship`
--

LOCK TABLES `familyrelationship` WRITE;
/*!40000 ALTER TABLE `familyrelationship` DISABLE KEYS */;
/*!40000 ALTER TABLE `familyrelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familytree`
--

DROP TABLE IF EXISTS `familytree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familytree` (
  `CodeID` int NOT NULL,
  `TreeName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`CodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familytree`
--

LOCK TABLES `familytree` WRITE;
/*!40000 ALTER TABLE `familytree` DISABLE KEYS */;
/*!40000 ALTER TABLE `familytree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familytreeconfig`
--

DROP TABLE IF EXISTS `familytreeconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familytreeconfig` (
  `AccountID` int NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`AccountID`),
  CONSTRAINT `familyconfig` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `AccountID` int DEFAULT NULL,
  `PhotoUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`PhotoID`),
  KEY `memberPhoto_idx` (`AccountID`),
  CONSTRAINT `memberPhoto` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE
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
-- Table structure for table `nationality`
--

DROP TABLE IF EXISTS `nationality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nationality` (
  `NationalityID` int NOT NULL AUTO_INCREMENT,
  `NationalityName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`NationalityID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nationality`
--

LOCK TABLES `nationality` WRITE;
/*!40000 ALTER TABLE `nationality` DISABLE KEYS */;
/*!40000 ALTER TABLE `nationality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `printingconfig`
--

DROP TABLE IF EXISTS `printingconfig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `printingconfig` (
  `AccountID` int NOT NULL AUTO_INCREMENT,
  `BorderlineColor` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BorderlineDesign` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `AspectRatio` int DEFAULT NULL,
  `TitleID` int DEFAULT NULL,
  `Background` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BackgroundUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BackgroundDesign` int DEFAULT NULL,
  `BackgroundDesignConfig` int DEFAULT NULL,
  `HasCreateDate` bit(1) DEFAULT NULL,
  `HasCreator` bit(1) DEFAULT NULL,
  `CreatorTextColor` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `CreatorTextSize` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  KEY `Title_idx` (`TitleID`),
  CONSTRAINT `AccountPrint` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE,
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
-- Table structure for table `relationship`
--

DROP TABLE IF EXISTS `relationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relationship` (
  `RelationshipID` int NOT NULL AUTO_INCREMENT,
  `RelationshipName` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`RelationshipID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relationship`
--

LOCK TABLES `relationship` WRITE;
/*!40000 ALTER TABLE `relationship` DISABLE KEYS */;
/*!40000 ALTER TABLE `relationship` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
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
  `IsFixedVertical` bit(1) DEFAULT NULL,
  `IsFixedHorizontal` bit(1) DEFAULT NULL,
  `IsBold` bit(1) DEFAULT NULL,
  `IsItalic` bit(1) DEFAULT NULL,
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

-- Dump completed on 2023-09-29 14:35:48
