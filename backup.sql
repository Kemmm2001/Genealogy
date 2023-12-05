-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: genealogy
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AccountFamilyTree`
--

DROP TABLE IF EXISTS `AccountFamilyTree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountFamilyTree` (
  `AccountID` int NOT NULL,
  `CodeID` varchar(20) NOT NULL,
  `RoleID` int NOT NULL,
  `AccessTime` datetime DEFAULT NULL,
  KEY `acc_idx` (`AccountID`),
  KEY `Code_idx` (`CodeID`),
  KEY `role_idx` (`RoleID`),
  CONSTRAINT `acc` FOREIGN KEY (`AccountID`) REFERENCES `account` (`AccountID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `code` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role` FOREIGN KEY (`RoleID`) REFERENCES `roleaccount` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountFamilyTree`
--

LOCK TABLES `AccountFamilyTree` WRITE;
/*!40000 ALTER TABLE `AccountFamilyTree` DISABLE KEYS */;
INSERT INTO `AccountFamilyTree` VALUES (1,'325-255-564',1,NULL),(11,'577-862-785',1,NULL),(14,'258191',1,'2023-11-08 00:00:00'),(14,'325-255-564',3,'2023-11-10 00:00:00'),(1,'227585',1,NULL),(1,'258191',3,'2023-11-17 14:29:44'),(16,'163412',1,'2023-11-17 14:40:41'),(1,'779275',3,'2023-11-17 16:05:32'),(1,'258191',3,'2023-11-18 11:15:09'),(1,'123456',3,'2023-11-18 18:20:11'),(1,'258191',3,'2023-11-18 18:22:46'),(1,'258191',3,'2023-11-19 19:32:28'),(17,'962359',1,'2023-11-20 05:21:10'),(1,'258191',3,'2023-11-22 18:33:36'),(1,'962359',2,'2023-11-22 18:43:59'),(17,'779275',3,'2023-11-22 18:50:08'),(17,'779275',3,'2023-11-22 18:50:14'),(17,'779275',3,'2023-11-22 18:54:16'),(1,'962359',2,'2023-11-22 19:13:46'),(19,'571016',1,'2023-11-22 19:52:18'),(17,'779275',3,'2023-11-22 19:58:10'),(11,'258191',3,'2023-11-22 20:00:35'),(11,'258191',3,'2023-11-23 07:19:22'),(11,'571016',3,'2023-11-23 07:23:54'),(20,'959884',1,'2023-11-23 07:31:06'),(11,'571016',3,'2023-11-23 07:46:30'),(17,'571016',3,'2023-11-23 07:47:55'),(8,'110148',1,'2023-11-23 08:19:29'),(19,'258191',3,'2023-11-23 14:21:45'),(18,'700848',1,'2023-11-23 15:18:14'),(21,'194518',1,'2023-11-23 15:22:34'),(18,'962359',3,'2023-11-23 15:42:31'),(19,'258191',3,'2023-11-23 16:35:43'),(19,'258191',3,'2023-11-24 03:33:42'),(14,'325-255-564',3,'2023-11-24 03:36:50'),(18,'962359',3,'2023-11-24 03:41:09'),(23,'574467',1,'2023-11-24 06:22:47'),(17,'779275',3,'2023-11-24 13:23:14'),(14,'325-255-564',3,'2023-11-27 14:23:31'),(14,'325-255-564',3,'2023-11-27 14:23:54'),(19,'258191',3,'2023-11-27 14:24:33'),(1,'962359',3,'2023-11-28 08:05:18'),(1,'962359',3,'2023-11-28 14:52:46'),(1,'258191',3,'2023-11-29 08:04:17'),(1,'258191',3,'2023-11-29 08:05:04'),(1,'779275',3,'2023-11-29 08:06:03'),(1,'258191',3,'2023-11-29 08:06:03'),(1,'258191',3,'2023-11-29 08:06:15'),(1,'962359',3,'2023-11-29 08:06:17'),(1,'962359',3,'2023-11-29 08:06:24'),(1,'258191',3,'2023-11-29 08:06:30'),(1,'258191',3,'2023-11-29 08:07:51'),(1,'962359',3,'2023-11-29 08:07:57'),(1,'962359',3,'2023-11-29 14:08:48'),(1,'258191',3,'2023-11-29 14:11:33'),(1,'779275',3,'2023-11-29 14:11:38'),(1,'962359',3,'2023-11-29 14:11:51'),(1,'962359',3,'2023-11-29 14:12:04'),(24,'328767',1,'2023-12-02 10:00:14'),(24,'571016',3,'2023-12-02 10:02:37'),(23,'779275',3,'2023-12-02 10:03:30'),(24,'571016',3,'2023-12-02 10:20:58'),(23,'328767',3,'2023-12-02 10:22:09'),(23,'779275',3,'2023-12-02 10:22:16'),(23,'779275',3,'2023-12-02 10:23:10'),(19,'574467',2,'2023-12-02 16:16:41'),(27,'590183',1,'2023-12-03 12:37:15'),(31,'650608',1,'2023-12-05 14:57:10'),(22,'491913',1,'2023-12-05 15:12:22'),(32,'745499',1,'2023-12-05 15:17:18');
/*!40000 ALTER TABLE `AccountFamilyTree` ENABLE KEYS */;
UNLOCK TABLES;

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
  `TotalMoney` double DEFAULT NULL,
  `FreeSMS` int DEFAULT NULL,
  `FreeEmail` int DEFAULT NULL,
  `RePassToken` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`AccountID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'test1','$2b$10$VvVJof/E51Ng5Env2Jtte.OLKDhbsNi.zMtfIomX8gsSWdTYBeSJa','test1@gmail.com',NULL,NULL,5,NULL),(8,'tuan','$2b$10$qhqU9eU3rjJCsvQ4F9lPWe4r0NQmW6DDPfb4VVfOY4kF0SBls6UyK','na1@gmail.com',NULL,NULL,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hMUBnbWFpbC5jb20iLCJpYXQiOjE3MDA3MjQwMTcsImV4cCI6MTcwMDcyNDkxN30.ZHZKzJhsOowTBmNf_IGK46R5C-l0ua4luToT0tiWk_E'),(11,'nguyenlehung','$2b$10$QSCqvpAYsTPwoHOBg/me8uweuNHcYpUyL0rrsHC4KisNGkTP3sTom','nguyenlehung26012@gmail.com',NULL,NULL,5,NULL),(12,'nguyenlehung','$2b$10$.v5vG7T3q8DW28rXMWGYiO4.psfHwbj5aEhCRO3l1dCOwXqtAaC1y','hung@gmail.com',NULL,NULL,5,NULL),(13,'hung123','$2b$10$RychH0zj6Cg8Hcq3wzQDxe.1cclN8Q74Ihn61ZnXQESPjd90w/zCq','hung123456@gmail.com',NULL,NULL,5,NULL),(14,'lehung2001','$2b$10$wPIGc0w6/zijt/I1so3KQejW/XyaCgPtMcWkjnC4t05gDVXD6x1Aq','admin@gmail.com',NULL,5,5,NULL),(15,'test','tesst','test100@gmail.com',NULL,NULL,5,NULL),(16,'anhtuan123bn','$2b$10$7tl3Wz.cKCJ/.fsYIOuxe.qr.MXp68JUGB7Kwz0iKABBI2REZZ43q','nanhtuan1001@gmail.com',NULL,5,5,NULL),(17,'anhtuan123bn','$2b$10$xR2Aj4vz20PFQf3SRIq/OetP9pD0Fm1qT1ek.A4bFfOJdSNSO3wh2','nanhtuan1003@gmail.com',NULL,5,5,NULL),(18,'nhatanh','$2b$10$lYf0ozEHjzr0P4kulw/sX.Afn1AZ5VWT9Z7PWLtTj1.YPiIrCSRQu','na2@gmail.com',NULL,5,5,NULL),(19,'test@gmail.com','$2b$10$plSOM5l4g83lXAucivwrb.moDvtgPZFrcZi6AFHRB1Xae0IGrI/AW','test@gmail.com',NULL,5,5,NULL),(20,'tuannahe150029@fpt.edu.vn432324','$2b$10$lX9SoZfZ3jdohMxRr/JaIe5oH93/8lh9Elh68ewCaVwFyAOuylYlq','tuannahe150029@fpt.edu.vn',NULL,5,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1YW5uYWhlMTUwMDI5QGZwdC5lZHUudm4iLCJpYXQiOjE3MDA3MjczNzgsImV4cCI6MTcwMDcyODI3OH0.Cim0BPCapiXpClfM4tQD66xG0nTY-6oHz00A_DYj7pA'),(21,'baolan0598@gmail.com','$2b$10$gfLiwnm/kZnefKVoBCTbNOFn2jZPioLZ9spmS/5X0qJK3.bv68BJq','baolan0598@gmail.com',NULL,5,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhb2xhbjA1OThAZ21haWwuY29tIiwiaWF0IjoxNzAxNjA2MjY3LCJleHAiOjE3MDE2MDcxNjd9.3DnXj1527qp3sgRSVS38MbgMQY7RtIaW-Pj12H_rWps'),(22,'324324','$2b$10$i.PnjOm0s6yTDdUGCI.XDe8HpHDoz/AvZ0RkC.nLei9qmjq1ih4RO','lamlthe153027@fpt.edu.vn',NULL,5,5,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbWx0aGUxNTMwMjdAZnB0LmVkdS52biIsImlhdCI6MTcwMTUxNjExMywiZXhwIjoxNzAxNTE3MDEzfQ.pgBoiI1EFm4-vzVWRukr_HER3fBMRz8Yz8oo3RceUyY'),(23,'Test Message','$2b$10$f8pOQFiq8hwEFcf1lv0MAOhfuu61ArrX58yyWKl7CPHSgisoN1WAO','testmes@gmail.com',NULL,5,5,NULL),(24,' vaposaw914','$2b$10$td.5jruTNd/UbuJm3XIaUOZOszYnUajcGn3DDiV1qeJvl3qhw/1JW',' vaposaw914@tohup.com',NULL,5,5,NULL),(25,' vaposaw914@tohup.com','$2b$10$JF06qrPiNw6/s4B69zLfGeZtxkACXTKKACwzbUcAEvubz8.OibRBq','vaposaw914@tohup.com',NULL,5,5,NULL),(26,'','$2b$10$1h5vaqf/T9KiQmHuEtVem.502SfeY9w6Lk0Ia.IUPu9G6pxXNppTO','',NULL,5,5,NULL),(27,'ikasamlea@gmail.com','$2b$10$tUc1a0uN268lOw0TWjwkjui.bJ8tFhcbzw3Ghg69T/ThDUwTrSlpS','ikasamlea@gmail.com',NULL,5,5,NULL),(28,'abc@gmail.com','$2b$10$HQ.yjbZAFHe8iPlQ3sXL9egcj6b4OIzHerOjeb7d7sqc8LETlN7Ve','abc@gmail.com',NULL,5,5,NULL),(29,'aaa@gmail.com','$2b$10$BO87qPj89GeRY0AtsHuMNunS/koDnmznkhNAu76M68Gsh6.ek3tOK','aaa@gmail.com',NULL,5,5,NULL),(30,'123','$2b$10$YtqEufJqajnG5wKP5.NyI..tib6wmPEbQkJ0YOZOorFRPnGSEiudi','123@gmail.com',NULL,5,5,NULL),(31,'nhat anh','$2b$10$tfABNICRvSsB1OULUmOykumHOOXGKxEn7yUhoXqL683PLfSuPRyuC','tanhatanh76@gmail.com',NULL,5,5,NULL),(32,'whwhwhw','$2b$10$ygwWH0QPBE2qt5GDa3Z55ulV6cWuYmT.ytYca9E6b6PNT74efFHs2','hhh@gmail.com',NULL,5,5,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
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
  `description` varchar(200) DEFAULT NULL,
  `BackGroundPhoto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AlbumID`),
  KEY `ablum_idx` (`CodeID`),
  CONSTRAINT `ablum` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albumphoto`
--

LOCK TABLES `albumphoto` WRITE;
/*!40000 ALTER TABLE `albumphoto` DISABLE KEYS */;
INSERT INTO `albumphoto` VALUES (4,'Đời thứ 2','123','day la doi thu 2',NULL),(13,'aaa','123',NULL,NULL),(16,'hhhh1','123','aaaa',NULL),(18,'test','123',NULL,NULL),(25,'undefined','123','aaaa','\\uploads\\images\\album-photo\\47e013ab910c490f5d4c74397af0d7.jpg'),(26,'1','258191','1','undefined'),(28,'ggg2','700848','gg1','null'),(30,'ggg1','700848','gg',NULL),(90,'Lính Mỹ chiếm thành phố Mexico','328767','Lính Mỹ chiếm thành phố Mexico','\\uploads\\images\\album-photo\\dfe982e12d640ecd2d7c0ceecdf789.jpg'),(91,'Lính Mỹ chiếm thành phố Mexico','328767','Lính Mỹ chiếm thành phố Mexico','/uploads/images/album-photo/72398bc50f5930424f2cfbc41d7550.jfif'),(92,'Lính Mỹ chiếm thành phố Mexico','328767','Lính Mỹ chiếm thành phố Mexico','/uploads/images/album-photo/e5bf410215ea0de849a76b1f8b9bb1.jpg'),(93,'Lính Mỹ chiếm thành phố Mexico','328767','Lính Mỹ chiếm thành phố Mexico','/uploads/images/album-photo/e2bd32cad693cca4aeceb3f7cfa55f.jpg'),(99,'undefined','328767','undefined','null'),(100,'undefined','328767','undefined','null'),(129,'43','571016','4',NULL);
/*!40000 ALTER TABLE `albumphoto` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventattendance`
--

DROP TABLE IF EXISTS `eventattendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventattendance` (
  `EventAttendanceID` int NOT NULL AUTO_INCREMENT,
  `EventID` int DEFAULT NULL,
  `MemberID` int DEFAULT NULL,
  `IsGoing` tinyint DEFAULT NULL,
  `Token` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`EventAttendanceID`),
  KEY `EventID` (`EventID`),
  KEY `MemberID` (`MemberID`),
  CONSTRAINT `eventattendance_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `eventfamily` (`EventID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=557 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventattendance`
--

LOCK TABLES `eventattendance` WRITE;
/*!40000 ALTER TABLE `eventattendance` DISABLE KEYS */;
INSERT INTO `eventattendance` VALUES (531,13,1096,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MSwiaWF0IjoxNzAxNzAzNTUxLCJleHAiOjE3MDIwNDkxNTF9.ihQUmXHPaYLaYG6vqLMmsB88OldCBTF6HG7ULFMT644'),(556,33,1494,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTQ5NCwiZXZlbnRJZCI6MzMsImlhdCI6MTcwMTc4OTIwMCwiZXhwIjoxNzAxNzg5MjYwfQ.tAFMI0WAVNflsS1Y5UTJPuy0lU8bKX7YDi7bqVOW8S8');
/*!40000 ALTER TABLE `eventattendance` ENABLE KEYS */;
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
  PRIMARY KEY (`EventID`),
  KEY `event_idx` (`CodeID`),
  CONSTRAINT `event` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
INSERT INTO `eventfamily` VALUES (3,'giỗ tổ1','258191',0,'2023-11-21 00:00:00','2023-11-21 00:00:00','Đây là ngày giỗ tổ cụ',1,'Tất cả mọi người phải có mặt đầy đủ','Nhà ông long'),(5,'fff','258191',0,'2023-11-01 11:00:00','2023-11-03 12:00:00','fff',1,'gggg','gggg'),(7,'1','959884',1,'2023-11-28 01:01:00','2023-11-28 01:01:00','1',1,'1','1'),(8,'2','959884',1,'2023-11-20 02:02:00','2023-11-07 02:02:00','2',1,'2','2'),(9,'1222222222','574467',0,'2023-11-15 23:01:00','2023-11-11 14:01:00','1',0,'12222222222','1'),(10,'1','700848',1,'2023-11-07 01:11:00','2023-11-16 02:02:00',NULL,0,'1','haf nooij'),(11,'111','574467',0,'2023-11-08 01:01:00','2023-11-16 01:01:00','111',1,'1','1'),(12,'1','574467',0,'2023-10-10 01:01:00','2023-11-11 01:01:00','1',1,'1','1'),(13,'1','574467',1,'2023-12-13 01:01:00','2023-12-14 01:01:00','1',1,'1','1'),(14,'1','574467',0,'2000-09-09 01:01:00','2000-09-09 02:02:00','1',1,'1','1'),(15,'mmm','962359',0,'2023-11-01 11:11:00','2023-11-15 12:12:00',NULL,0,'fff','fffff'),(16,'aaaa','962359',0,'2023-11-04 11:11:00','2023-11-06 22:22:00',NULL,0,'aa','aa'),(18,'123','574467',0,'2023-11-30 01:01:00','2023-12-01 01:01:00',NULL,0,NULL,'hb'),(19,'ggg','962359',0,'2023-11-29 01:01:00','2023-12-01 01:01:00',NULL,0,NULL,'ff'),(21,'1','574467',1,'2023-12-21 01:01:00','2023-12-08 02:02:00',NULL,0,'1','123'),(24,'3','571016',1,'2023-12-12 03:05:00','2023-12-13 03:03:00','2',1,'3','3'),(25,'Minh Mạng đổi tên nước thành Đại Nam','328767',1,'1839-02-15 00:00:00','1839-02-15 01:00:00','Minh Mạng đổi tên nước thành Đại Nam',1,NULL,'Việt Nam'),(26,'Kết thúc Chiến tranh Pháp–Đại Nam','328767',1,'1884-06-06 00:00:00','1884-06-06 01:00:00','Hòa ước Giáp Thân, kết thúc Chiến tranh Pháp–Đại Nam, triều đình nhà Nguyễn chấp nhận sự bảo hộ của Pháp',1,NULL,'Việt Nam'),(27,'Thực dân Pháp thành lập Liên bang Đông Dương','328767',1,'1887-10-17 00:00:00','1887-10-17 01:00:00','thực dân Pháp thành lập Liên bang Đông Dương',1,NULL,'Việt Nam'),(28,'Lào gia nhập Liên bang Đông Dương','328767',1,'1893-10-03 00:00:00','1893-10-03 01:00:00',NULL,0,NULL,'Việt Nam'),(29,'Liên bang Đông Dương dời thủ đô về Hà Nội','328767',1,'1902-09-09 00:00:00','1902-09-09 01:00:00','Liên bang Đông Dương dời thủ đô về Hà Nội',1,NULL,'Việt Nam'),(30,'Nguyễn Ái Quốc gửi Yêu sách của nhân dân An Nam tới Hội nghị Hòa bình Versailles','328767',1,'1919-06-18 00:00:00','1919-06-18 01:00:00','Nguyễn Ái Quốc gửi Yêu sách của nhân dân An Nam tới Hội nghị Hòa bình Versailles',1,NULL,'Việt Nam'),(32,'Event2','123',1,'2023-05-05 00:00:00','2023-06-06 00:00:00','Description2',0,'Note2','Place2'),(33,'test','650608',1,'2023-12-04 01:11:00','2023-12-06 11:11:00','test',1,NULL,'ck');
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
-- Table structure for table `familyhistory`
--

DROP TABLE IF EXISTS `familyhistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familyhistory` (
  `HistoryID` int NOT NULL AUTO_INCREMENT,
  `CodeID` varchar(20) DEFAULT NULL,
  `Description` varchar(2000) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `order_position` int DEFAULT NULL,
  PRIMARY KEY (`HistoryID`),
  KEY `history_idx` (`CodeID`),
  CONSTRAINT `history` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyhistory`
--

LOCK TABLES `familyhistory` WRITE;
/*!40000 ALTER TABLE `familyhistory` DISABLE KEYS */;
INSERT INTO `familyhistory` VALUES (1,'258191','Ngày ông tổ cụ ra đời','1948-11-11 00:00:00','0198-11-11 00:00:00',3),(2,'258191','Ngày ông tổ lấy vợ','1948-11-11 00:00:00','0198-11-11 00:00:00',2),(3,'258191','Ngày ông tổ cụ mất ','1948-11-11 00:00:00','1948-11-11 00:00:00',1),(6,'959884','Lịch sử đầu tiên ','2023-11-01 00:00:00','2023-11-29 00:00:00',4),(7,'574467','\n\'oiuytrew','2023-11-21 00:00:00','2023-11-06 00:00:00',4),(8,'571016','dd','2023-11-23 00:00:00','2023-11-23 00:00:00',4),(9,'571016','ddd','1111-11-11 00:00:00','1111-11-11 00:00:00',4),(10,'571016','efwe','2222-02-22 00:00:00','2222-02-22 00:00:00',4),(11,'574467','1','2023-12-14 00:00:00','2023-11-30 00:00:00',4),(12,'574467','2','2023-12-30 00:00:00','2023-12-05 00:00:00',4),(13,'574467','2','2023-12-01 00:00:00','2023-12-29 00:00:00',4),(14,'574467','222','2023-12-29 00:00:00','2023-12-04 00:00:00',4),(15,'574467','2222222222','2023-12-16 00:00:00','2023-12-12 00:00:00',4),(16,'574467','222222222222','2023-12-22 00:00:00','2023-12-11 00:00:00',4),(17,'574467','22222222','2023-12-23 00:00:00','2023-12-13 00:00:00',4),(18,'574467','2222222222','2023-12-22 00:00:00','2023-12-14 00:00:00',4),(25,'328767','Mông Cổ tấn công Đại Việt lần đầu tiên','1257-05-01 00:00:00','1257-05-23 00:00:00',4),(26,'328767','Mông Cổ tấn công Đại Việt lần thứ hai','1285-02-05 00:00:00','1285-08-21 00:00:00',4),(27,'328767','Hồ Quý Ly truyền ngôi lại cho con','1400-02-02 00:00:00','1401-02-23 00:00:00',4),(28,'328767','Lê Lợi đánh tan nhà Minh','1418-01-02 00:00:00','1427-03-31 00:00:00',4),(29,'328767','Nhà Lê đối đầu với nhà Mạc','1527-02-11 00:00:00','1533-02-25 00:00:00',4),(30,'962359','gggg','2023-12-02 00:00:00','2023-12-14 00:00:00',4),(31,'574467','1','2023-12-07 00:00:00','2023-12-14 00:00:00',5);
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
  `FatherID` int DEFAULT NULL,
  `MotherID` int DEFAULT NULL,
  `MemberName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `NickName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `BirthOrder` int DEFAULT NULL,
  `Origin` text,
  `NationalityID` int DEFAULT NULL,
  `ReligionID` int DEFAULT NULL,
  `Dob` datetime DEFAULT NULL,
  `LunarDob` datetime DEFAULT NULL,
  `BirthPlace` text,
  `IsDead` tinyint NOT NULL,
  `Dod` datetime DEFAULT NULL,
  `LunarDod` datetime DEFAULT NULL,
  `PlaceOfDeath` text,
  `GraveSite` text,
  `Note` longtext,
  `Generation` int DEFAULT NULL,
  `BloodType` varchar(3) DEFAULT NULL,
  `Male` tinyint NOT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `Image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  KEY `religion_idx` (`ReligionID`),
  KEY `Nationality_idx` (`NationalityID`),
  KEY `FamilyTree_idx` (`CodeID`),
  CONSTRAINT `familyMember` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nationality` FOREIGN KEY (`NationalityID`) REFERENCES `nationality` (`NationalityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `religion` FOREIGN KEY (`ReligionID`) REFERENCES `religion` (`ReligionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1518 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
INSERT INTO `familymember` VALUES (1511,NULL,NULL,'32',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'962359',NULL),(1512,1511,NULL,'23',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'962359',NULL),(1513,1512,NULL,'32',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'962359',NULL),(1514,1513,NULL,'3r2',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'962359',NULL),(1517,1513,NULL,'3r2',NULL,2,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'962359',NULL);
/*!40000 ALTER TABLE `familymember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `familyphoto`
--

DROP TABLE IF EXISTS `familyphoto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `familyphoto` (
  `PhotoID` int NOT NULL AUTO_INCREMENT,
  `AlbumID` int DEFAULT NULL,
  `PhotoUrl` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`PhotoID`),
  KEY `memberPhoto_idx` (`AlbumID`),
  CONSTRAINT `memberPhoto` FOREIGN KEY (`AlbumID`) REFERENCES `albumphoto` (`AlbumID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=178 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyphoto`
--

LOCK TABLES `familyphoto` WRITE;
/*!40000 ALTER TABLE `familyphoto` DISABLE KEYS */;
INSERT INTO `familyphoto` VALUES (22,4,'\\uploads\\images\\family-photo\\cc1eefbc82228f4133b701f44179c4.jpg'),(23,4,'\\uploads\\images\\family-photo\\13b45d633a6d9baefceb8ec12c0965.jpg'),(28,28,'\\uploads\\images\\family-photo\\98a8af8719b154b4a22a307654c040.jpg'),(29,30,'\\uploads\\images\\family-photo\\65f5be8d05a2594dfce650fcbc8737.jpg'),(30,30,'\\uploads\\images\\family-photo\\f925b2349fca37bce8b00b23ee2e6d.jpg'),(134,90,'/uploads/images/family-photo/628b41a1bea09dbee68b4d6cfc0fbe.jfif'),(135,90,'/uploads/images/family-photo/5fddd7aa5dbc2219a84fd71777bf24.jpg'),(136,90,'/uploads/images/family-photo/55bcfa8b0095bdfc6ea6350896f649.jpg'),(137,90,'/uploads/images/family-photo/ce317ca76428a99f1940907ddb6e7a.jpg'),(166,26,'/uploads/images/family-photo/9e2ff5798a9317f574cd7e016abc90.jpg'),(167,26,'/uploads/images/family-photo/dc746bd46bb004ed1970800bf35517.jpg'),(168,26,'/uploads/images/family-photo/b225f7c2690efa2bec2edec3edfd22.jpg');
/*!40000 ALTER TABLE `familyphoto` ENABLE KEYS */;
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
  PRIMARY KEY (`CodeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familytree`
--

LOCK TABLES `familytree` WRITE;
/*!40000 ALTER TABLE `familytree` DISABLE KEYS */;
INSERT INTO `familytree` VALUES ('104-639-914','hahhh','aaa',NULL),('110148','Nguyễn ','Kinh','2023-11-22 00:00:00'),('120884','sssss','sssss',NULL),('123','Lê','Kinh','1890-02-23 00:00:00'),('123456','Nguyễn','Mường','1890-02-23 00:00:00'),('123456789','Thị','Mường','1998-01-23 12:45:56'),('154-659-449','tuan','tuan',NULL),('163412','Nguyễn','Kinh','1998-06-15 00:00:00'),('194518','Phùng','Kinh','2023-11-08 00:00:00'),('227585','hahhh','aaa',NULL),('250-935-233','Lưu','Kinh','2023-11-09 00:00:00'),('258191','Nguyễn ','Mường','2023-11-08 00:00:00'),('275-996-062','Nguyễn','Kinh','2023-11-09 00:00:00'),('301-487-964','Nguyễn','Kinh',NULL),('303-302-655','hahhh','aaa',NULL),('325-255-564','Vũ','Kinh',NULL),('328767','AAA','A','2023-12-12 00:00:00'),('335-359-852','Nguyễn','Kinh',NULL),('405-610-909','Lưu','Kinh','2023-11-09 00:00:00'),('491913','gg','gg','2023-12-08 00:00:00'),('571016','Test','Kinh','2023-11-08 00:00:00'),('574467','Messages','','2023-11-21 00:00:00'),('577-862-785','Nguyễn','Mường',NULL),('590183','Nguyễn','Kinh','2023-12-06 00:00:00'),('650608','Ta','Kinh','2000-06-07 00:00:00'),('700848','Nguyễn ','kinh','2023-11-22 00:00:00'),('745499','gg','gg','2023-12-09 00:00:00'),('779275','sssss','sssss',NULL),('959884','FPT','Kinh',NULL),('962359','Nguyễn','Kinh','2023-11-02 00:00:00');
/*!40000 ALTER TABLE `familytree` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marriage`
--

DROP TABLE IF EXISTS `marriage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marriage` (
  `marriageID` int NOT NULL AUTO_INCREMENT,
  `husbandID` int NOT NULL,
  `wifeID` int NOT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `MarriageNumber` int DEFAULT NULL,
  PRIMARY KEY (`marriageID`),
  KEY `husband_idx` (`husbandID`,`wifeID`),
  KEY `wife_idx` (`wifeID`),
  KEY `code_idx` (`CodeID`),
  CONSTRAINT `CodeIDD` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `husband` FOREIGN KEY (`husbandID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wife` FOREIGN KEY (`wifeID`) REFERENCES `familymember` (`MemberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marriage`
--

LOCK TABLES `marriage` WRITE;
/*!40000 ALTER TABLE `marriage` DISABLE KEYS */;
/*!40000 ALTER TABLE `marriage` ENABLE KEYS */;
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
  `CodeId` varchar(45) DEFAULT NULL,
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
INSERT INTO `memberrole` VALUES (NULL,NULL,'123'),(1511,1,'962359');
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
-- Table structure for table `notificationemail`
--

DROP TABLE IF EXISTS `notificationemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificationemail` (
  `NotificationEmailId` int NOT NULL AUTO_INCREMENT,
  `EmailSubject` varchar(60) NOT NULL,
  `EmailContent` varchar(500) DEFAULT NULL,
  `EmailDate` datetime DEFAULT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`NotificationEmailId`),
  KEY `email_idx` (`CodeID`),
  CONSTRAINT `email` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationemail`
--

LOCK TABLES `notificationemail` WRITE;
/*!40000 ALTER TABLE `notificationemail` DISABLE KEYS */;
INSERT INTO `notificationemail` VALUES (1,'Test','test send email','2023-11-15 00:00:00','258191'),(2,'test History','Đây là chức năng test history','2023-11-21 07:59:28','258191'),(3,'Test chủ đề','Chúng ta đang có vài vấn đề ','2023-11-23 15:39:37','959884'),(4,'Test chủ đề','Chúng ta đang có vài vấn đề ','2023-11-23 15:44:45','959884'),(5,'ererre','ererer','2023-11-24 09:31:04','574467'),(6,'sdvdsv','dsvds','2023-11-24 09:36:12','574467'),(7,'ewfwewe','eewfewf','2023-11-24 09:36:30','574467'),(8,'ewfwewe','eewfewfeewf','2023-11-24 09:36:44','574467'),(9,'khoi','eewfewfeewf','2023-11-24 09:36:56','574467'),(10,'đooooooooooo','aaaaaaaaaaaaaa','2023-11-24 09:43:40','574467'),(11,'đooooooooooo1111','aaaaaaaaaaaaaa2222','2023-11-24 09:45:14','574467'),(12,'1','111111111111111','2023-11-24 10:07:31','574467'),(13,'Check chức năng send sms','Check chức năng send smsCheck chức năng send smsCheck chức năng send sms','2023-11-24 10:08:44','574467'),(14,'ok','đang test email ','2023-11-24 10:53:43','574467'),(15,'èwewfew','ềwfewfew','2023-11-24 12:43:08','574467'),(16,'gt','gt','2023-11-24 14:38:38','574467'),(17,'giỗ tổ','ngày 25/11/2023 là ngày giỗ tổ.Đề nghị mọi người có mặt và tham gia đầy đủ','2023-11-24 14:41:05','258191'),(18,'4343','4334','2023-11-29 08:02:35','571016');
/*!40000 ALTER TABLE `notificationemail` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationhistory`
--

LOCK TABLES `notificationhistory` WRITE;
/*!40000 ALTER TABLE `notificationhistory` DISABLE KEYS */;
INSERT INTO `notificationhistory` VALUES (1,'11111111','2023-11-13 00:00:00','258191'),(2,'Thu chức năng set history send sms','2023-11-13 10:47:55','258191'),(3,'324324','2023-11-24 08:26:10','123456'),(4,'32432432432342','2023-11-24 08:26:39','123456'),(5,'1111','2023-11-24 08:50:28','700848'),(6,'test send sms','2023-11-24 09:24:31','574467'),(7,'rereer','2023-11-24 09:30:58','574467'),(8,'rereer','2023-11-24 09:30:58','574467'),(9,'check chức năng gửi all sms','2023-11-24 10:08:01','574467'),(10,'Test gửi sms nhé ','2023-11-24 10:22:17','574467'),(11,'tttt','2023-11-24 10:52:10','574467'),(12,'đang test sms nhé ','2023-11-24 10:53:29','574467'),(13,'uuuuuuuu','2023-11-24 11:10:06','574467'),(14,'test','2023-11-24 12:45:57','574467'),(15,'test','2023-11-24 12:46:29','574467'),(16,'343','2023-11-29 08:02:29','571016');
/*!40000 ALTER TABLE `notificationhistory` ENABLE KEYS */;
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
INSERT INTO `religion` VALUES (1,'Không tôn giáo nào'),(2,'Hồi giáo'),(3,'Hindu'),(4,'Thiên chúa giáo'),(5,'Ấn độ giáo'),(6,'Phật giáo'),(7,'Công giáo'),(8,'Tin lành'),(9,'Cao đài'),(10,'Tôn giáo khác');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roleaccount`
--

LOCK TABLES `roleaccount` WRITE;
/*!40000 ALTER TABLE `roleaccount` DISABLE KEYS */;
INSERT INTO `roleaccount` VALUES (1,'IsAdmin'),(2,'CanEdit'),(3,'CanView');
/*!40000 ALTER TABLE `roleaccount` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-05 22:18:50
