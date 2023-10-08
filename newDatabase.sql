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
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `accountaccess`
--

LOCK TABLES `accountaccess` WRITE;
/*!40000 ALTER TABLE `accountaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `accountaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `albumphoto`
--

LOCK TABLES `albumphoto` WRITE;
/*!40000 ALTER TABLE `albumphoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `albumphoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,1,'Yên thủy-hòa bình','0123456789','0123456788','gmai.com','gmai1l.com','123','123');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (1,1,'hùng1','hùng đã học ở đây','2001-02-26 00:00:00','2001-02-26 00:00:00');
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventfamily` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `eventmember`
--

LOCK TABLES `eventmember` WRITE;
/*!40000 ALTER TABLE `eventmember` DISABLE KEYS */;
INSERT INTO `eventmember` VALUES (1,'Event test','123','123','2001-02-26 00:00:00','2001-02-26 00:00:00',1);
/*!40000 ALTER TABLE `eventmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `eventrepetition`
--

LOCK TABLES `eventrepetition` WRITE;
/*!40000 ALTER TABLE `eventrepetition` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventrepetition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `familyhistory`
--

LOCK TABLES `familyhistory` WRITE;
/*!40000 ALTER TABLE `familyhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `familyhistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
INSERT INTO `familymember` VALUES (1,NULL,NULL,'Test1','NichName1',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note1',1,123,NULL),(2,NULL,NULL,'test2','NichName2',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note2',2,123,NULL),(3,NULL,NULL,'Test3','NichName3',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note3',0,123,NULL),(4,NULL,NULL,'Test4','NichName4',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note4',2,123,NULL),(5,NULL,NULL,'Test5','NichName5',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note5',3,123,NULL),(6,NULL,NULL,'Test6','NichName6',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note6',4,123,NULL),(7,NULL,NULL,'Test7','NichName7',_binary '',1,'Hòa Bình',1,1,'2001-02-26 00:00:00','2001-02-26 00:00:00','Hòa Bình',_binary '',NULL,NULL,NULL,'Note7',5,123,NULL);
/*!40000 ALTER TABLE `familymember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `familytree`
--

LOCK TABLES `familytree` WRITE;
/*!40000 ALTER TABLE `familytree` DISABLE KEYS */;
INSERT INTO `familytree` VALUES (123,'Hùng'),(199,'HUNG1');
/*!40000 ALTER TABLE `familytree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `familytreeconfig`
--

LOCK TABLES `familytreeconfig` WRITE;
/*!40000 ALTER TABLE `familytreeconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `familytreeconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (1,1,'123','123','1','Test1','2001-02-26 00:00:00','2001-02-26 00:00:00');
/*!40000 ALTER TABLE `job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `memberphoto`
--

LOCK TABLES `memberphoto` WRITE;
/*!40000 ALTER TABLE `memberphoto` DISABLE KEYS */;
/*!40000 ALTER TABLE `memberphoto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `memberrole`
--

LOCK TABLES `memberrole` WRITE;
/*!40000 ALTER TABLE `memberrole` DISABLE KEYS */;
INSERT INTO `memberrole` VALUES (1,1);
/*!40000 ALTER TABLE `memberrole` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `nationality`
--

LOCK TABLES `nationality` WRITE;
/*!40000 ALTER TABLE `nationality` DISABLE KEYS */;
INSERT INTO `nationality` VALUES (1,'Việt Nam'),(2,'Ba Lan'),(3,'Ba Tư'),(4,'Belarus'),(5,'Bồ Đầu Nha'),(6,'Bun-ga-ri'),(7,'Canada'),(8,'Croatia'),(9,'Đan Mạch'),(10,'Đức'),(11,'Lào'),(12,'Hà Lan');
/*!40000 ALTER TABLE `nationality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `printingconfig`
--

LOCK TABLES `printingconfig` WRITE;
/*!40000 ALTER TABLE `printingconfig` DISABLE KEYS */;
/*!40000 ALTER TABLE `printingconfig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `religion`
--

LOCK TABLES `religion` WRITE;
/*!40000 ALTER TABLE `religion` DISABLE KEYS */;
INSERT INTO `religion` VALUES (1,'Hòa hảo'),(2,'Hồi giáo'),(3,'Hindu'),(4,'Thiên chúa giáo'),(5,'Ấn độ giáo'),(6,'Phật giáo'),(7,'Công giáo'),(8,'Tin lành'),(9,'Cao đài'),(10,'Tôn giáo khác');
/*!40000 ALTER TABLE `religion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Tổ Phụ'),(2,'Tộc Trưởng'),(3,'Normal');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roleaccount`
--

LOCK TABLES `roleaccount` WRITE;
/*!40000 ALTER TABLE `roleaccount` DISABLE KEYS */;
/*!40000 ALTER TABLE `roleaccount` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2023-10-08 22:01:22
