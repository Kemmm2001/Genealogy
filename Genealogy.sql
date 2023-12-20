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
INSERT INTO `AccountFamilyTree` VALUES (35,'795176',1,'2023-12-05 15:26:39'),(36,'131717',1,'2023-12-18 17:09:22'),(37,'543739',1,'2023-12-17 21:57:43'),(38,'544556',1,'2023-12-18 14:31:51'),(39,'632561',1,'2023-12-07 11:20:45'),(40,'237062',1,'2023-12-07 13:30:57'),(42,'571539',1,'2023-12-07 16:44:05'),(42,'571539',1,'2023-12-07 16:44:05'),(45,'131717',2,'2023-12-07 18:17:55'),(44,'968143',1,'2023-12-07 18:27:27'),(44,'968143',1,'2023-12-07 18:27:27'),(46,'665575',1,'2023-12-08 06:41:19'),(46,'665575',1,'2023-12-08 06:41:19'),(47,'215847',1,'2023-12-18 19:00:09'),(47,'215847',1,'2023-12-18 19:00:09'),(44,'544556',3,'2023-12-08 13:27:45'),(68,'645631',1,'2023-12-09 09:32:04'),(68,'645631',1,'2023-12-09 09:32:04'),(68,'544556',3,'2023-12-09 13:58:45'),(72,'755100',1,'2023-12-09 14:18:56'),(72,'755100',1,'2023-12-09 14:18:56'),(68,'755100',1,'2023-12-09 15:02:15'),(37,'755100',3,'2023-12-09 17:19:59'),(47,'645631',3,'2023-12-13 12:47:39'),(79,'127451',1,'2023-12-13 14:17:59'),(79,'127451',1,'2023-12-13 14:17:59'),(47,'543739',3,'2023-12-13 17:06:40'),(45,'854631',1,'2023-12-14 13:53:01'),(45,'854631',1,'2023-12-14 13:53:01'),(36,'215847',3,'2023-12-14 13:57:50'),(80,'207693',1,'2023-12-14 22:45:18'),(80,'207693',1,'2023-12-14 22:45:18'),(81,'141263',1,'2023-12-18 18:18:05'),(81,'141263',1,'2023-12-18 18:18:05');
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
  `RePassToken` varchar(400) DEFAULT NULL,
  `IsActive` tinyint DEFAULT NULL,
  `RegisterToken` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`AccountID`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (34,'kkk','$2b$10$jjKEIkBKWgd9c3e1ro95o.qYm3CEfHkuJl9c6MpFsTkRCQeJ3ekFS','kkk@gmail.com',NULL,10,50,NULL,1,NULL),(35,'ggg','$2b$10$y3j5qjIStszpEtIsMqVqmelrIW488okoxl01KFwtfhvqcrxeYH.xG','ggg@gmail.com',NULL,10,50,NULL,1,NULL),(36,'nanhtuan1003xxxx','$2b$10$wOhavH6mdcvXKmo3DRszw.gk8LVpff5Nj5yTeg7v.gvkvxo5mqDn6','nanhtuan1003@gmail.com',NULL,10,50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbmh0dWFuMTAwM0BnbWFpbC5jb20iLCJpYXQiOjE3MDI0ODAyMDcsImV4cCI6MTcwMjQ4MDI2N30.HF-Zvej8W4L8o4i8xXBJ2wTHt2VvW8G1pEekdgEmxz4',1,NULL),(37,'lehung2001','$2b$10$BlpYY/oMTHSqYXVXuZ2pwOr7po70kuZqiMAbz/LwJpsbROFgUDu6C','admin@gmail.com',NULL,10,50,NULL,1,NULL),(38,'baolan0598@gmail.com','$2b$10$LTE80kHIXk6Fm268Am0SXeYJv.NWwbNkIhItFFsYNavfuI5G6oMnu','baolan0598@gmail.com',NULL,10,50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhb2xhbjA1OThAZ21haWwuY29tIiwiaWF0IjoxNzAyMDQ0NjMxLCJleHAiOjE3MDIwNDU1MzF9.uTFXqXca4551kJFRExL3lBYXzRSqHw0DtKjoRNLVSm0',NULL,NULL),(39,' vaposaw914@tohup.com','$2b$10$LTfZhOWWOs935X8Rs1F2puQyioTENatrLQNr8v97Lvo9oP3RKUaV.','vaposaw914@tohup.com',NULL,10,50,NULL,1,NULL),(40,'admin','$2b$10$C8lg8GcWCLGNKUsRECs3LeD81vSOhZqWm7KjOsqQMpOzTxcEcGN4.','admin123@gmail.com',NULL,10,50,NULL,NULL,NULL),(41,'ghh','$2b$10$DljSrtgql8NPk.TSYa4prOsoeqHwLZ3rWlZVnatZWjcvcqf5eqtFG','ghh@gmail.com',NULL,10,50,NULL,NULL,NULL),(42,'nguyenlehung','$2b$10$/yrVbKNmRSjdkcOqMnWJLuBoisp.T6SI4bAJxZFUx22Dmd.Pz2QCi','test123@gmail.com',NULL,10,50,NULL,1,NULL),(43,'kkk','$2b$10$UDtJMwb6/gk8nUQ7MBHzEugcIUWoKqTM8lIydRAqebNgnNdi3hSTK','ppp@gmail.com',NULL,10,50,NULL,NULL,NULL),(44,'test1@gmail.co','$2b$10$BkxNw8/9tP7Rs2/ZOGGOWuavUD4WuLtzMSWzga331EL84s/9HFWaS','test1@gmail.com',NULL,10,50,NULL,1,NULL),(45,'nanhtuan1002@gmail.com','$2b$10$dQQgey/Biu/8Pr12GKtkM.KE9kh7PI5g7OExlJVxSk5tG.S7UmWke','nanhtuan1002@gmail.com',NULL,10,50,NULL,1,NULL),(46,'test','$2b$10$K/WNRdPQSwLv1j3NuxS.wOziaq.qLnoNJnXr1EB1r3x/JzDo71.Dy','lehung@gmail.com',NULL,10,50,NULL,1,NULL),(47,'admin','$2b$10$hetkh8Vjrvs/W4UA16TDFeDsulBrWZW340HxmDF/mPOc1lOZlRS.W','lamlthe153027@fpt.edu.vn',NULL,10,50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbWx0aGUxNTMwMjdAZnB0LmVkdS52biIsImlhdCI6MTcwMjQ2NzM2MiwiZXhwIjoxNzAyNDY4MjYyfQ.MrI8RV0ZJ7mZ-TQr8j10-QW-0TH-ZTR_Q2n496P0W2c',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxhbWx0aGUxNTMwMjdAZnB0LmVkdS52biIsImlhdCI6MTcwMjQ2NjI5NiwiZXhwIjoxNzAyNDY3MTk2fQ.zgN0YywuvEJtGbLKQSh29zIHJJiW00swQxud2idDk9Y'),(48,'test1@gmail.com','$2b$10$VqfGn1PeV1fsxOvsBCQPnOOx.1LOREeFKfDkoDIEApF/DdgBclheK','123456',NULL,10,50,NULL,0,NULL),(49,'asfasfas','$2b$10$Z3MmdgcFFFGRy2KfMFmIYe3f9QkV30b4DRjIdWt8id6OYJaRojspm','ewfewfewfw',NULL,10,50,NULL,0,NULL),(50,'test1@gmail.com','$2b$10$SdmgX.fGguwx7nPIR2ltIOGhJhioqwtovqfQdxBfufedOe2KnppM.','regergegw',NULL,10,50,NULL,0,NULL),(60,'nhatanh','$2b$10$ZbHC1tCMPLY5dDohPD0iT.GMqRVJgTaioNSY6xXzcJ/XtcuPWDLJS','na2@gmail.com',NULL,10,50,NULL,0,NULL),(62,'nhatanh','$2b$10$MCAcvbbkpjAO34jUOutbku96cpDqkye630lM.gqznr4xrohHAnPdS','na1@gmail.com',NULL,10,50,NULL,0,NULL),(63,'nhatanh','$2b$10$5gxWF2BYov0D3eTKV3KPpu5k1u4.ZWWm7AhWWRWyBd7SNeNXdh2iW','na@gmail.com',NULL,10,50,NULL,0,NULL),(64,'123','$2b$10$ESeIyNAa0zZ1AUQSK2WUseIB33vcYP9MQw1OBsCQNua9lZFeSSUU.','123@gmail.com',NULL,10,50,NULL,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MDIxMTA0NzQsImV4cCI6MTcwMjExMTM3NH0.19YhfrRRTXzrGTVbHWSpXqpx0OTfgf8wqgGWHiQzbD8'),(65,'dqwwqd','$2b$10$DzTy0BWG/DBJ815QGYTbNu/U/1/REn3qfyoRA1kX7qeTSX5mhg3Xe','1234@gmail.com',NULL,10,50,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzRAZ21haWwuY29tIiwiaWF0IjoxNzAyMTEyMjEwLCJleHAiOjE3MDIxMTMxMTB9.8tES7W6P_Z3-krczkkKZFCFRG9u59dWBuOmiDN-8vz0'),(66,'12345','$2b$10$u04qwYSY.Z9GPvsSTVr3wuwXlBDTLpwIC/Wzl5qD6GJn89oe/F38i','12345@gmail.com',NULL,10,50,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1QGdtYWlsLmNvbSIsImlhdCI6MTcwMjExMjQyMCwiZXhwIjoxNzAyMTEzMzIwfQ.kWgLMvzKKzg-sDgishw0u90J-JJDNew3xP87wehvN3s'),(67,'nhatanh','$2b$10$Sl3zKp3vVxrpjZ3bdb/gqOGOMlGXyqFtrfYvuC8uRrAmt8I/7RUBG','n@gmail.com',NULL,10,50,NULL,1,NULL),(68,'Tuấn','$2b$10$47/BMIBuLOGEgLdejLCcae/MSEChdWeo2wSaQ5j4z0djaQPWGy6/S','tuannahe150029@fpt.edu.vn',NULL,10,50,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1YW5uYWhlMTUwMDI5QGZwdC5lZHUudm4iLCJpYXQiOjE3MDI0ODAxNjMsImV4cCI6MTcwMjQ4MDIyM30.bJxUlGroWrNS_BxTgGPAZJL6m3474cxyxdvYvIW2dDY',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR1YW5uYWhlMTUwMDI5QGZwdC5lZHUudm4iLCJpYXQiOjE3MDIxMTI3NDEsImV4cCI6MTcwMjExMzY0MX0.9v4y5cLAvnGan_3kn3fa88T9bEUTb3ffIlejTixTCy4'),(69,'nhatanh','$2b$10$LDNphsB9melXECcxBzn07OGiU9daAeEnZPswTsCq.Qc1aP7Fk3KZm','a@gmail.com',NULL,10,50,NULL,0,NULL),(70,'2e12e12','$2b$10$4/MkA18VAyc1M9aKDdJO0OTAnOajxMXX43b.9yU/uRdFvZj6PIREe','e1221e21@32.com',NULL,10,50,NULL,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImUxMjIxZTIxQDMyLmNvbSIsImlhdCI6MTcwMjExODQ0NiwiZXhwIjoxNzAyMTE5MzQ2fQ.YCeZP4gqIhbLkK9r7_ckiKZ-OGZu0JswFG0kcJXoVXw'),(71,'23124','$2b$10$ia4sryQPbeo3j/Pyyo2KxOWjDL9fSZPA8zw.mHipLiH6ukwiTZloG','323432@96.com',NULL,10,50,NULL,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjMyMzQzMkA5Ni5jb20iLCJpYXQiOjE3MDIxMTg1ODksImV4cCI6MTcwMjExOTQ4OX0.yqDT3jqi2hfX5plCPQVIVL6-jDZZzgvya6_99tu4gno'),(72,'Tài khoản test gửi thông báo','$2b$10$8j8d27SJXiNBy36seSiJd.20LI2W2XW26cSs9qFf9GnHdqOJfZT46','testmes@gmail.com',NULL,10,50,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RtZXNAZ21haWwuY29tIiwiaWF0IjoxNzAyMTMxNDk4LCJleHAiOjE3MDIxMzIzOTh9.EQmcecXZ0A4NkITT-DNa7no8E5etAFM6g0Tsv-rrVvs'),(78,'nguyenlehung','$2b$10$nZYjkdMvXu/JdGgtG4rJh.swpWV/c..ZFwmJB.6EKwRB88Ok7VP9O','nguyenlehung2602@gmail.com',NULL,10,50,NULL,1,NULL),(79,'nanhtuan1003@outlook.com','$2b$10$RMnGYRMmLfcavMNFKJ7F7u.GFd.R8YO0qKsdimkW85lkBYuWd18v2','nanhtuan1003@outlook.com',NULL,10,50,NULL,1,NULL),(80,'test@gmail.com','$2b$10$DaIk2kmqA6mZmEHXgADwyuE94cAYvk1/LAsndpIXchkUEhNZ6vaQu','test@gmail.com',NULL,10,50,NULL,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzAyNTkzODcyLCJleHAiOjE3MDI1OTQ3NzJ9.PTNpbc1k_GUkAY_l6ay7vs0siO4zybq7Ake9xBkBbpE'),(81,'luu tung lam','$2b$10$PK1VVZdYPng2OBX5riPVWuSuP7gkKhy9FtBymLjE0TWHnf9kj0w46','luutunglam2001@gmail.com',NULL,5,5,NULL,1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albumphoto`
--

LOCK TABLES `albumphoto` WRITE;
/*!40000 ALTER TABLE `albumphoto` DISABLE KEYS */;
INSERT INTO `albumphoto` VALUES (138,'3223','795176','day la update','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(149,'update','544556','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(150,'3223','968143','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(152,'Tết Nguyên Đán 2022','215847','ngày tết sum vầy của Lưu tộc','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(153,'3223','645631','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(154,'3223','645631','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(155,'Giỗ tổ hùng vương','215847','null','/uploads/images/album-photo/a76c366f7ba1509235e148d7bd40e2.jpg'),(157,'3223','755100','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(159,'3223','543739','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(160,'Giỗ tổ họ Lưu','215847','null','/uploads/images/album-photo/52559e78026f2b3e949847068a8816.jpg'),(161,'3223','755100','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(162,'3223','755100','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(163,'Tết Nguyên Đán 2023','215847','Tết sum vầy của thành viên dòng họ Lưu','/uploads/images/album-photo/47cb9f6a774328be751fc81aa662f7.png'),(164,'Giỗ tổ hùng vương 2023','215847','null','/uploads/images/album-photo/849ed73a0c97a4061205f1641d08dd.jpg'),(165,'3223','543739','update doi thu 2','/uploads/images/album-photo/9482a3a6b4a3357565535c7704f09c.jpg'),(169,'wqdwq','131717','dqwdqw','/uploads/images/album-photo/c311d5031df98cb06efd446d54d5c7.png'),(171,'Đời thứ 2','127451','day la doi thu 2',NULL),(172,'Đời thứ 2','131717','day la doi thu 2',NULL),(173,'Đời thứ 2','207693','day la doi thu 2',NULL),(174,'Đời thứ 2','237062','day la doi thu 2',NULL),(175,'Đời thứ 2','543739','day la doi thu 2',NULL),(176,'Đời thứ 2','544556','day la doi thu 2',NULL),(177,'Đời thứ 2','571539','day la doi thu 2',NULL),(178,'Đời thứ 2','632561','day la doi thu 2',NULL),(179,'Đời thứ 2','645631','day la doi thu 2',NULL),(180,'Đời thứ 2','665575','day la doi thu 2',NULL),(181,'Đời thứ 2','127451','day la doi thu 2','\\uploads\\images\\album-photo\\8ad8397eac29c5626a3dd4850b2800.jpg'),(183,'Đời thứ 2','131717','day la doi thu 2','\\uploads\\images\\album-photo\\87d2b6052269648d500a2604b36e2e.jpeg'),(184,'Đời thứ 2','237062','day la doi thu 2','\\uploads\\images\\album-photo\\80a6e71c76a8bcf4d830abd6313d23.png'),(185,'Đời thứ 2','543739','day la doi thu 2','\\uploads\\images\\album-photo\\fbb8292668d4fc5613d833935d8dd7.jpg'),(186,'Đời thứ 2','544556','day la doi thu 2','\\uploads\\images\\album-photo\\8270d6b13bf803fd4065721369a76c.jpg'),(187,'Đời thứ 2','632561','day la doi thu 2','\\uploads\\images\\album-photo\\03c6ad9dbdb61e89fc6b45e435d935.jpg'),(188,'Đời thứ 2','571539','day la doi thu 2','\\uploads\\images\\album-photo\\49ca0fd802126b23ed25ec657331aa.jpeg'),(189,'Đời thứ 2','665575','day la doi thu 2','\\uploads\\images\\album-photo\\4f2d540f1ce1467b4e394934a3b3e8.jpeg'),(190,'Đời thứ 2','645631','day la doi thu 2','\\uploads\\images\\album-photo\\6f5e161da8a6bcfb95b9ba9a0866f3.png'),(192,'aaaaa','237062',NULL,NULL),(193,'aaaaa','127451',NULL,NULL),(195,'aaaaa','207693',NULL,NULL),(198,'aa','543739','aa',NULL),(201,'5ge','131717','wegew','/uploads/images/album-photo/67c51a5f4f3e3dfc22a43ad9b89878.png'),(202,'â','141263','aa',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=343 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (205,1778,NULL,'+840383802676','nanhtuan1003@gmail.com',NULL,NULL),(206,1871,'Bà Rịa – Vũng Tàu-Côn Đảo-Côn Đảo',NULL,NULL,NULL,NULL),(207,1875,'Lào Cai-Bảo Yên-Bảo Yên-Bảo Yên-Bảo Yên-Bảo Yên',NULL,NULL,NULL,NULL),(208,1891,'Bình Phước-Bù Đốp-Bù Đốp',NULL,NULL,NULL,NULL),(209,1894,'Hà Nội-Ba Đình',NULL,NULL,NULL,NULL),(210,1904,'Cao Bằng-Hạ Lang',NULL,NULL,NULL,NULL),(211,1902,'Cà Mau-Cà Mau',NULL,NULL,NULL,NULL),(212,1820,NULL,NULL,'tuannahe150029@fpt.edu.vn',NULL,NULL),(213,1921,NULL,NULL,'baolan0598@gmail.com',NULL,'retr4354gdf'),(217,1977,'Cần Thơ-Cái Răng-Cái Răng',NULL,NULL,NULL,NULL),(218,1978,'Bình Phước-Chơn Thành',NULL,NULL,NULL,NULL),(219,1863,'Lào Cai-Lào Cai-Lào Cai-Lào Cai-Lào Cai','+84+84+84+84',NULL,NULL,NULL),(220,1865,'Lào Cai-Lào Cai-Lào Cai-Lào Cai-Lào Cai-Lào Cai',NULL,NULL,NULL,NULL),(221,1867,'An Giang-An Phú-An Phú',NULL,NULL,NULL,NULL),(222,1869,'An Giang-Châu Phú-Châu Phú',NULL,NULL,NULL,NULL),(223,1879,'An Giang-Châu Đốc-Châu Đốc-Châu Đốc',NULL,NULL,NULL,NULL),(224,1880,'Bình Dương-Bàu Bàng-Bàu Bàng-Bàu Bàng',NULL,NULL,NULL,NULL),(225,1881,NULL,NULL,NULL,NULL,NULL),(226,1878,'Lào Cai-Lào Cai-Lào Cai-Lào Cai',NULL,NULL,NULL,NULL),(227,1882,'Lào Cai-Bảo Thắng-Bảo Thắng-Bảo Thắng-Bảo Thắng-Bảo Thắng-Bảo Thắng',NULL,NULL,NULL,NULL),(228,1874,'Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu',NULL,NULL,NULL,NULL),(229,1884,'Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu-Bạc Liêu',NULL,NULL,NULL,NULL),(230,1876,'Bà Rịa – Vũng Tàu-Bà Rịa-Bà Rịa-Bà Rịa-Bà Rịa',NULL,NULL,NULL,NULL),(231,1896,'Bắc Ninh-Bắc Ninh',NULL,NULL,NULL,NULL),(232,1911,'Bắc Ninh-Bắc Ninh',NULL,NULL,NULL,NULL),(233,1897,'An Giang-An Phú',NULL,NULL,NULL,NULL),(234,1899,'Ninh Thuận-Thuận Nam',NULL,NULL,NULL,NULL),(235,1914,'Ninh Thuận-Thuận Nam',NULL,NULL,NULL,NULL),(236,1908,'Hà Nam-Bình Lục',NULL,NULL,NULL,NULL),(237,1888,'Bắc Giang-Bắc Giang',NULL,NULL,NULL,NULL),(238,1893,'Hà Nam-Bình Lục',NULL,NULL,NULL,NULL),(239,1890,'Bình Dương-Bàu Bàng-Bàu Bàng',NULL,'luutunglam2001@gmail.com',NULL,NULL),(240,1966,'Bình Dương-Bàu Bàng-Bàu Bàng',NULL,NULL,NULL,NULL),(241,1900,'Hà Giang-Mèo Vạc',NULL,NULL,NULL,NULL),(242,1916,'Vĩnh Long-Long Hồ',NULL,NULL,NULL,NULL),(243,1887,'Bắc Kạn-Ba Bể-Ba Bể-Ba Bể-Ba Bể',NULL,NULL,NULL,NULL),(244,1905,'Bắc Giang-Bắc Giang',NULL,NULL,NULL,NULL),(245,1919,'Cao Bằng-Bảo Lạc',NULL,NULL,NULL,NULL),(248,2039,NULL,NULL,NULL,NULL,NULL),(249,1903,'Cao Bằng-Bảo Lạc',NULL,NULL,NULL,NULL),(255,2030,NULL,NULL,NULL,'2234','234'),(257,1950,NULL,NULL,NULL,NULL,NULL),(258,2069,NULL,'+840383802676','tuannahe150029@fpt.edu.vn',NULL,NULL),(259,2070,NULL,'+840369984848','anhtnhe150123@fpt.edu.vn',NULL,NULL),(260,2075,NULL,'+840813701669','khoipvhe160628@fpt.edu.vn',NULL,NULL),(261,2073,NULL,'+840353612090','hungnlhe153107@fpt.edu.vn',NULL,NULL),(262,2074,NULL,'+84(866) 978-616','lamlthe153027@fpt.edu.vn',NULL,NULL),(265,1967,'Đà Nẵng-Hải Châu',NULL,NULL,NULL,NULL),(266,1983,'Đà Nẵng-Cẩm Lệ',NULL,NULL,NULL,NULL),(267,1970,'Cần Thơ-Bình Thủy',NULL,NULL,NULL,NULL),(268,1984,'Bình Thuận-Đức Linh',NULL,NULL,NULL,NULL),(269,1971,'Lào Cai-Lào Cai',NULL,NULL,NULL,NULL),(270,1985,'Lào Cai-Lào Cai-Lào Cai',NULL,NULL,NULL,NULL),(271,1972,'Hà Giang-Bắc Mê-Bắc Mê',NULL,NULL,NULL,NULL),(272,1986,'Hà Giang-Bắc Mê-Bắc Mê-Bắc Mê',NULL,NULL,NULL,NULL),(273,1973,'Bình Thuận-La Gi',NULL,NULL,NULL,NULL),(274,1987,'Bình Thuận-La Gi-La Gi',NULL,NULL,NULL,NULL),(275,1974,'Thành phố Hồ Chí Minh-Quận 1-Quận 1',NULL,NULL,NULL,NULL),(276,1988,'Thành phố Hồ Chí Minh-Quận 1-Quận 1',NULL,NULL,NULL,NULL),(277,1975,'Bình Phước-Bù Gia Mập',NULL,NULL,NULL,NULL),(278,1979,'Hà Tĩnh-Cẩm Xuyên',NULL,NULL,NULL,NULL),(279,1990,'Hà Tĩnh-Cẩm Xuyên',NULL,NULL,NULL,NULL),(280,1980,'Đà Nẵng-Cẩm Lệ-Ngũ Hành Sơn',NULL,NULL,NULL,NULL),(281,1991,'Đà Nẵng-Ngũ Hành Sơn',NULL,NULL,NULL,NULL),(282,1981,'Đồng Nai-Biên Hòa-Biên Hòa',NULL,NULL,NULL,NULL),(283,1982,'Đồng Nai-Biên Hòa-Biên Hòa',NULL,NULL,NULL,NULL),(284,2092,'Đà Nẵng-Cẩm Lệ',NULL,NULL,NULL,NULL),(285,1992,'Bà Rịa – Vũng Tàu-Bà Rịa',NULL,NULL,NULL,NULL),(286,1993,'Bà Rịa – Vũng Tàu-Bà Rịa',NULL,NULL,NULL,NULL),(287,1994,'Lào Cai-Lào Cai-Lào Cai-Lào Cai-Lào Cai','+84353 612 090','hungnlhe153107@fpt.edu.vn',NULL,NULL),(288,1995,'Lào Cai-Lào Cai',NULL,NULL,NULL,NULL),(289,1997,'Đồng Tháp-Cao Lãnh-Cao Lãnh-Cao Lãnh','+840383 802 676','tuannahe150029@fpt.edu.vn',NULL,NULL),(290,1998,'Bạc Liêu-Vĩnh Lợi',NULL,NULL,NULL,NULL),(291,2000,'Hải Phòng-Đồ Sơn-Đồ Sơn-Đồ Sơn','+840369 984 848','anhtnhe150123@fpt.edu.vn',NULL,NULL),(292,2001,'Bình Phước-Bình Long-Bình Long-Bình Long','+840813 701 669','khoipvhe160628@fpt.edu.vn',NULL,NULL),(293,2002,'Bắc Giang-Hiệp Hòa',NULL,NULL,NULL,NULL),(294,2003,'An Giang-Phú Tân-Phú Tân-Phú Tân','+840866 978 616','lamlthe153027@fpt.edu.vn',NULL,NULL),(295,2004,'An Giang-Tịnh Biên',NULL,NULL,NULL,NULL),(296,2006,NULL,NULL,NULL,NULL,NULL),(297,2007,NULL,NULL,NULL,NULL,NULL),(298,2005,NULL,NULL,NULL,NULL,NULL),(301,2110,'Hà Nội','+84+84+84+84null','nguyenlehung2602@gmail.com',NULL,NULL),(302,2112,NULL,'+84+84','khoipvhe160628@fpt.edu.vn',NULL,NULL),(304,1821,'Hà Nội',NULL,NULL,'test','123'),(312,2122,NULL,'+84+84(383) 802-676','nanhtuan1003@gmail.com',NULL,NULL),(313,2123,'Bình Phước','+84null','nanhtuan1003@outlook.com',NULL,NULL),(330,2170,NULL,NULL,NULL,NULL,NULL),(334,3224,NULL,'+84353 612 090','nguyenlehung2602@gmail.com',NULL,NULL),(335,3225,NULL,'+84353 612 090','nguyenlehung2602@gmail.com',NULL,NULL),(336,3227,NULL,'+84353 612 090','nguyenlehung2602@gmail.com',NULL,NULL),(337,3223,NULL,'+84353 612 090',NULL,NULL,NULL),(338,3226,NULL,NULL,'nguyenlehung2602@gmail.com',NULL,NULL),(339,3236,NULL,NULL,'nguyenlehung2602@gmail.com',NULL,NULL),(340,3331,NULL,NULL,NULL,NULL,NULL),(341,3343,NULL,NULL,NULL,NULL,NULL),(342,3344,NULL,NULL,'lamlthe153027@fpt.edu.vn',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (18,2139,'11111111','111111111111','1111-11-11 00:00:00','1212-12-12 00:00:00');
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
  `Token` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`EventAttendanceID`),
  KEY `EventID` (`EventID`),
  KEY `MemberID` (`MemberID`),
  CONSTRAINT `eventattendance_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `eventfamily` (`EventID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=700 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventattendance`
--

LOCK TABLES `eventattendance` WRITE;
/*!40000 ALTER TABLE `eventattendance` DISABLE KEYS */;
INSERT INTO `eventattendance` VALUES (565,43,1542,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTU0MiwiZXZlbnRJZCI6NDMsImlhdCI6MTcwMTg2MzgwNCwiZXhwIjoxNzAyNzI3ODA0fQ.kqN174XQKuLD-6pHnT0Tb9elzdRVsjPuxG8-QNzv9GE'),(566,43,1523,-1,NULL),(569,NULL,1762,NULL,NULL),(571,NULL,1762,NULL,NULL),(572,NULL,1763,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTc2MywiZXZlbnRJZCI6NDIsImlhdCI6MTcwMTg4NzczMSwiZXhwIjoxNzAxOTc0MTMxfQ.jSzXPkoVwigZ-jCeBprm2nJUaqMRTvryXMQcFGXFmnc'),(573,NULL,1762,NULL,NULL),(574,NULL,1763,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTc2MywiZXZlbnRJZCI6NDIsImlhdCI6MTcwMTg4NzczMSwiZXhwIjoxNzAxOTc0MTMxfQ.jSzXPkoVwigZ-jCeBprm2nJUaqMRTvryXMQcFGXFmnc'),(579,44,1820,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTgyMCwiZXZlbnRJZCI6NDQsImlhdCI6MTcwMjA0NDU1NSwiZXhwIjoxNzAyNDc2NTU1fQ.AbnGnE8xSmNW_cgU5zn8go3_wSaaEydKJyPB4X-kRP0'),(580,44,1921,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTkyMSwiZXZlbnRJZCI6NDQsImlhdCI6MTcwMjA0NDU1NSwiZXhwIjoxNzAyNDc2NTU1fQ.6NzuD3ZNPE2oxyyTjWHSArQnTZhC-2gCPwgyxP0Rm1g'),(581,44,1812,NULL,NULL),(582,44,1820,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTgyMCwiZXZlbnRJZCI6NDQsImlhdCI6MTcwMjA0NDU1NSwiZXhwIjoxNzAyNDc2NTU1fQ.AbnGnE8xSmNW_cgU5zn8go3_wSaaEydKJyPB4X-kRP0'),(583,44,1921,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTkyMSwiZXZlbnRJZCI6NDQsImlhdCI6MTcwMjA0NDU1NSwiZXhwIjoxNzAyNDc2NTU1fQ.6NzuD3ZNPE2oxyyTjWHSArQnTZhC-2gCPwgyxP0Rm1g'),(584,44,1922,NULL,NULL),(589,45,1950,-1,NULL),(590,45,1950,-1,NULL),(591,45,1950,-1,NULL),(592,45,1950,-1,NULL),(593,45,1950,-1,NULL),(594,45,1950,-1,NULL),(595,45,1950,-1,NULL),(634,53,2065,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjA2NSwiZXZlbnRJZCI6NTMsImlhdCI6MTcwMjEzNDMxOSwiZXhwIjoxNzAyMjIwNzE5fQ.sX5Xk2BkpGXVOTrzXO4CWmJx8mjPrzStYak9ygsMcfQ'),(635,53,2078,-1,NULL),(636,54,2088,-1,NULL),(637,54,2089,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjA4OSwiZXZlbnRJZCI6NTQsImlhdCI6MTcwMjEzNzgxNCwiZXhwIjoxNzAyMjI0MjE0fQ.ShVHGM3_1YJrZXF53yjiRiPU2HQn9lanrW_gbFUotMA'),(655,57,1904,-1,NULL),(656,57,1916,-1,NULL),(657,57,1919,-1,NULL),(658,57,1972,-1,NULL),(659,57,1973,-1,NULL),(660,57,1974,-1,NULL),(661,57,1977,-1,NULL),(662,57,1978,-1,NULL),(663,57,1979,-1,NULL),(664,57,1980,-1,NULL),(665,57,1981,-1,NULL),(666,57,1982,-1,NULL),(667,57,1985,-1,NULL),(668,57,1986,-1,NULL),(669,57,1987,-1,NULL),(670,57,1990,-1,NULL),(671,57,1991,-1,NULL),(672,57,1994,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTk5NCwiZXZlbnRJZCI6NTcsImlhdCI6MTcwMjI5OTUxOCwiZXhwIjoxNzAyMzg1OTE4fQ.oD9KDk-cUD4_si6wa16i3kP9q_-_eTO99VAjhT9ZNQg'),(673,57,1995,-1,NULL),(674,57,1997,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MTk5NywiZXZlbnRJZCI6NTcsImlhdCI6MTcwMjI5OTUxOCwiZXhwIjoxNzAyMzg1OTE4fQ.Y5S2Jf21wirTfcSfQdbjA7uHS6uMDYs4tX0FZgLYdfk'),(675,57,1998,-1,NULL),(676,57,2000,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjAwMCwiZXZlbnRJZCI6NTcsImlhdCI6MTcwMjI5OTUxOCwiZXhwIjoxNzAyMzg1OTE4fQ.hMQhIzuwAgtfHkGnKLG7REpZfwC66XFNEr_VWR6gkGY'),(677,57,2001,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjAwMSwiZXZlbnRJZCI6NTcsImlhdCI6MTcwMjI5OTUxOCwiZXhwIjoxNzAyMzg1OTE4fQ.KiZKQSTAC8fiTq0G6c8UIDvkSgiJA6tfb6BXthDvT-g'),(678,57,2002,-1,NULL),(679,57,2003,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjAwMywiZXZlbnRJZCI6NTcsImlhdCI6MTcwMjI5OTUxOCwiZXhwIjoxNzAyMzg1OTE4fQ.24jwg9Z6qpd91CUX6de7QUQjXS3uRRcKqkIvOEuTj-A'),(680,57,2004,-1,NULL),(681,57,2005,-1,NULL),(682,57,2006,-1,NULL),(683,57,2007,-1,NULL),(684,57,2103,-1,NULL),(685,78,2069,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjA2OSwiZXZlbnRJZCI6NzgsImlhdCI6MTcwMjQ3Mzg0MywiZXhwIjoxNzAyNTYwMjQzfQ.XUo6vxqvW8fg2WFjDVXDQOOuZmuXW5ZDdtYYpD7QIPY'),(686,55,2099,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MjA5OSwiZXZlbnRJZCI6NTUsImlhdCI6MTcwMjQ3NjU4MiwiZXhwIjoxNzAyNDc2NjQyfQ.8r6va2nRrNSOIkbHxdEGnLvmVIg2s9Vkah5yT0nhwjs'),(687,55,2097,-1,NULL),(688,88,3344,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MzM0NCwiZXZlbnRJZCI6OTUsImlhdCI6MTcwMjg5NzUyMywiZXhwIjoxNzAyOTgzOTIzfQ.gVzZIEoG9lBbBAHW6ymEynr9hqlRQLGRcR0i2YfS0n8'),(689,88,3343,-1,NULL),(690,88,3342,-1,NULL),(691,88,3341,-1,NULL),(696,95,3342,-1,NULL),(697,95,3343,-1,NULL),(698,95,3344,-1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJZCI6MzM0NCwiZXZlbnRJZCI6OTUsImlhdCI6MTcwMjg5NzUyMywiZXhwIjoxNzAyOTgzOTIzfQ.gVzZIEoG9lBbBAHW6ymEynr9hqlRQLGRcR0i2YfS0n8'),(699,95,3341,-1,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventfamily`
--

LOCK TABLES `eventfamily` WRITE;
/*!40000 ALTER TABLE `eventfamily` DISABLE KEYS */;
INSERT INTO `eventfamily` VALUES (38,'giỗ tổ2','544556',0,'2023-11-21 00:00:00','2023-11-21 00:00:00','Đây là ngày giỗ tổ cụ',1,'Tất cả mọi người phải có mặt đầy đủ','Nhà ông long'),(39,'giỗ tổ2','544556',0,'2023-11-21 00:00:00','2023-11-21 00:00:00','Đây là ngày giỗ tổ cụ',1,'Tất cả mọi người phải có mặt đầy đủ','Nhà ông long'),(41,'giỗ tổ2','795176',0,'2023-11-21 00:00:00','2023-11-21 00:00:00','Đây là ngày giỗ tổ cụ',1,'Tất cả mọi người phải có mặt đầy đủ','Nhà ông long'),(43,'s','131717',0,'2023-11-30 23:59:00','2023-12-05 01:01:00','s',1,'s','2'),(44,'aaa','968143',1,'2023-12-06 01:01:00','2023-12-29 01:01:00',NULL,0,NULL,'ggg'),(45,'dqwwq','645631',0,'2023-12-13 11:01:00','2023-12-13 01:01:00','cscw',1,'qưdwq','12'),(49,'1','544556',0,'1212-12-12 01:01:00','1313-12-13 02:02:00',NULL,0,NULL,'1'),(53,'Sự kiện vô cùng quan trọng','543739',1,'2023-12-14 01:01:00','2023-12-31 02:02:00','1',1,'1','Nhà tôi'),(54,'1','543739',1,'2023-12-21 01:01:00','2023-12-22 01:01:00','1',1,'2','2'),(55,'Important','543739',1,'2023-12-29 01:01:00','2023-12-30 02:12:00','123',1,'2','1'),(57,'Tết 2024','215847',1,'2024-10-02 08:30:00','2024-11-02 15:30:00','Tết sum vầy của dòng họ Lưu',1,NULL,'Nhà thờ họ'),(58,'Giỗ dòng họ','215847',0,'2023-12-07 07:30:00','2023-12-14 02:00:00','Ngày giỗ tổ của dòng họ Lưu',1,'','Nhà thờ họ'),(63,'Giỗ tổ hùng vương','215847',0,'2023-12-12 08:00:00','2023-12-14 13:30:00',NULL,0,NULL,'Nhà thờ họ'),(65,'1','544556',0,'2023-12-12 01:01:00','2023-12-12 02:02:00','1',1,NULL,'1'),(66,'2','544556',1,'2024-12-15 01:01:00','2024-12-16 01:01:00','1',1,NULL,'1'),(78,'1','755100',1,'2023-12-11 01:01:00','2023-12-21 01:01:00','1',1,'1','1'),(79,'123','755100',1,'2023-12-18 12:12:00','2023-12-20 12:12:00','123',1,'12','12'),(80,'1','127451',0,'2023-12-11 01:01:00','2023-12-15 01:01:00','1',1,'1','1'),(86,'1','131717',1,'2023-12-13 01:01:00','2023-12-21 01:01:00','1',1,'1','1'),(88,'Ngày giỗ tổ họ','141263',1,'2024-02-13 07:00:00','2024-02-13 08:00:00',NULL,0,NULL,'Lào Cai'),(95,'Tết','141263',1,'2222-02-22 07:00:00','2222-02-22 09:00:00',NULL,0,NULL,'Lào Cai');
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
  PRIMARY KEY (`HistoryID`),
  KEY `history_idx` (`CodeID`),
  CONSTRAINT `history` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2896 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyhistory`
--

LOCK TABLES `familyhistory` WRITE;
/*!40000 ALTER TABLE `familyhistory` DISABLE KEYS */;
INSERT INTO `familyhistory` VALUES (32,'543739','Lịch sử đầu tiên','2023-12-22 00:00:00','2023-12-23 00:00:00'),(33,'543739','Lịch sử thứ 2','2022-06-15 00:00:00','2022-12-29 00:00:00'),(34,'544556','1','1111-11-11 00:00:00','1212-12-12 00:00:00'),(35,'544556','rewrwq','2023-12-25 00:00:00','2023-12-29 00:00:00'),(36,'544556','ad','2023-12-01 00:00:00','2023-12-02 00:00:00'),(37,'645631','dewdwe','2023-12-14 00:00:00','2023-12-29 00:00:00'),(38,'645631','qwdwq','2023-12-27 00:00:00','2023-12-29 00:00:00'),(39,'645631','hh','2023-12-20 00:00:00','2023-12-21 00:00:00'),(40,'215847','\nTrước năm 1760, ba anh em họ Lưu từ miền Trung vào miền Nam lập nghiệp Gia phả họ Lưu được lập vào khoảng năm 1860 do cụ Lưu Tánh Thiện sinh năm 1823 vợ bà Lê Thị Côn, lúc đương thời là Tri Phủ của Triều Nguyễn, cụ Lưu Tánh Thiện đổ cử nhân vào đời thứ 4 trong phổ hệ Lưu Gia cho nên Thuỷ Tổ họ Lưu lúc bấy giờ không biết rõ được năm sinh, mà chỉ ghi nhớ được ngày mất là mùng 10 tháng giêng năm 1797. Thời bây giờ phổ hệ Lưu Gia được viết bằng chữ nho trên vải lụa, mực đen, theo ông Lưu Vĩnh Lữ đời thứ 8 nhân Hồng Kông đề nghị có thể gọi vị Tổ Lưu Tánh Thiện là Thánh Tổ là vị tổ đầu tiên lập gia phả.','1760-12-31 00:00:00','1860-03-21 00:00:00'),(41,'755100','2r2','2023-11-29 00:00:00','2023-12-12 00:00:00'),(42,'755100','wqfqwfqw','2023-12-07 00:00:00','2023-12-21 00:00:00'),(43,'755100','qfqwf3434334','2022-06-09 00:00:00','2023-12-28 00:00:00'),(44,'215847','Đến năm 1948, phổ hệ Lưu Gia ông Lưu Vĩnh Hỹ giao lại cho con là ông Lưu Hoàng Linh đời thứ 7 vợ là bà Vương Thị Hương, di tích ông Lưu Hoàng Linh và Lưu Trí Phương lập mộ cho cha mẹ là ông Lưu Vĩnh Hỹ và bà Nguyễn Thị Hân có ghi trên bia mộ, cũng từ đây phổ hệ Lưu Gia được dịch ra chữ quốc ngữ. ','1947-12-31 00:00:00','1948-01-01 00:00:00'),(45,'215847','Theo tư liệu ngoài di tích lưu truyền lại trên bia mộ, vào năm 1917 lăng mộ Cụ Thủy Tổ họ Lưu (ông, bà) được tu sửa do Cao Tổ Lưu Đình Ngoạn đời thứ 5, giỗ cụ Thủy Tổ được xác định từ đây. Sau đó Cao Tổ Lưu Đình Ngoạn giao lễ giỗ này lại cho cụ Lưu Vĩnh Tăng đời thứ 6. Khi cụ Lưu Vĩnh Tăng mất, lễ giỗ cụ Thủy Tổ do ông Lưu Văn Huấn tự Ba Đại, giỗ liên tục tại thị xã Vĩnh Long và ở đường Cao Đạt Quận 5, TP. Hồ Chí Minh đến ngày đoàn tụ cùng các con ở nước ngoài (khoảng năm 1984 - 1985). Nhắc lại khi thiếm ba Nguyễn Thị Huệ, vợ chú Ba Đại đi đoàn tụ.','1917-03-01 00:00:00','1985-03-21 00:00:00'),(46,'215847','Xây dựng nhà thờ họ Lưu ở TP Lào Cai,tỉnh Lào Cai','1938-12-31 00:00:00','1940-03-01 00:00:00'),(47,'215847','Kỷ niệm 50 năm thành lập nhà thờ họ Lưu tại thành phố Lào Cai,tỉnh Lào Cai','1990-01-01 00:00:00','1990-01-25 00:00:00'),(48,'755100','edd','2023-12-14 00:00:00','2023-12-15 00:00:00'),(54,'543739','This is super description',NULL,NULL),(55,'665575','This is super description',NULL,NULL),(56,'665575','111',NULL,NULL),(57,'665575','111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(58,'665575','111','1980-05-24 11:00:00','1980-06-24 00:00:00'),(59,'665575','111',NULL,'1980-06-24 00:00:00'),(60,'665575','111','1980-05-24 00:00:00',NULL),(61,'665575','111',NULL,'1980-06-24 00:00:00'),(62,'665575','111','1980-05-24 00:00:00',NULL),(63,'665575','tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk','1980-05-24 00:00:00','1980-06-24 00:00:00'),(64,'665575','tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk','1980-05-24 00:00:00','1980-06-24 00:00:00'),(65,'665575','1','1980-05-24 00:00:00','1980-06-24 00:00:00'),(66,'215847','52555555555222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222225555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222255555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555','1111-11-11 00:00:00','2222-02-22 00:00:00'),(67,'665575','-111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(68,'665575','111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(69,'665575','@111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(70,'665575','!111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(71,'665575','#111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(72,'665575','$111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(73,'665575','%111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(74,'665575','^111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(75,'665575','&111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(76,'665575','*111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(77,'665575','(111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(78,'665575',')111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(79,'665575','-111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(80,'665575','+111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(81,'665575','_111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(82,'665575','=111','1980-05-24 00:00:00','1980-06-24 00:00:00'),(83,'127451','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(85,'237062','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(86,'543739','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(87,'571539','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(88,'632561','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(89,'645631','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(90,'755100','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(91,'795176','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(92,'968143','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(93,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(94,'7551003','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(133,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(134,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(135,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(136,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(137,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(138,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(139,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(140,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(141,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(142,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(143,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(144,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(145,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(146,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(147,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(148,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(149,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(150,'665575','This is GG','1980-05-24 00:00:00','1980-06-24 00:00:00'),(2493,'207693','Test','1754-08-05 00:00:00','1938-03-26 00:00:00'),(2494,'207693','Test','1590-07-17 00:00:00','1839-05-30 00:00:00'),(2495,'207693','Test','1792-08-06 00:00:00','1813-03-18 00:00:00'),(2522,'207693','Test','1524-12-01 00:00:00','1881-11-20 00:00:00'),(2523,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2524,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2525,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2526,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2527,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2528,'207693','1.2312312312321124e305','2020-11-11 00:00:00','2020-11-11 00:00:00'),(2561,'207693','Test','1725-10-03 00:00:00','1829-05-19 00:00:00'),(2562,'207693','Test','1614-04-18 00:00:00','1857-02-05 00:00:00'),(2563,'207693','Test','1691-04-01 00:00:00','1961-05-17 00:00:00'),(2590,'207693','Test','1600-01-23 00:00:00','1946-05-11 00:00:00'),(2622,'207693','Test','1616-11-04 00:00:00','1869-05-25 00:00:00'),(2623,'207693','Test','1783-09-21 00:00:00','1886-01-18 00:00:00'),(2624,'207693','Test','1778-10-10 00:00:00','1873-11-07 00:00:00'),(2651,'207693','Test','1738-05-26 00:00:00','1824-02-29 00:00:00'),(2683,'207693','Test','1670-09-25 00:00:00','1965-09-24 00:00:00'),(2684,'207693','Test','1766-05-31 00:00:00','1808-05-09 00:00:00'),(2685,'207693','Test','1787-09-24 00:00:00','2008-03-01 00:00:00'),(2712,'207693','Test','1590-12-27 00:00:00','1960-03-11 00:00:00'),(2744,'207693','Test','1583-02-21 00:00:00','1849-08-07 00:00:00'),(2745,'207693','Test','1630-09-12 00:00:00','1835-01-02 00:00:00'),(2746,'207693','Test','1567-09-26 00:00:00','1899-08-29 00:00:00'),(2773,'207693','Test','1505-02-23 00:00:00','1803-01-24 00:00:00'),(2805,'207693','Test','1773-08-02 00:00:00','1866-12-06 00:00:00'),(2806,'207693','Test','1765-11-24 00:00:00','1944-12-10 00:00:00'),(2807,'207693','Test','1599-10-15 00:00:00','1893-11-01 00:00:00'),(2834,'207693','Test','1629-10-10 00:00:00','1972-03-17 00:00:00'),(2866,'207693','Test','1799-06-30 00:00:00','1840-11-01 00:00:00'),(2867,'207693','Test','1704-04-08 00:00:00','1998-05-24 00:00:00'),(2868,'207693','Test','1641-03-27 00:00:00','1830-04-05 00:00:00'),(2895,'207693','Test','1590-08-07 00:00:00','1930-08-22 00:00:00');
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
  `Dob` date DEFAULT NULL,
  `LunarDob` date DEFAULT NULL,
  `BirthPlace` text,
  `IsDead` tinyint NOT NULL,
  `Dod` date DEFAULT NULL,
  `LunarDod` date DEFAULT NULL,
  `PlaceOfDeath` text,
  `GraveSite` text,
  `Note` longtext,
  `Generation` int DEFAULT NULL,
  `BloodType` varchar(3) DEFAULT NULL,
  `Male` tinyint NOT NULL,
  `CodeID` varchar(20) DEFAULT NULL,
  `Image` varchar(200) DEFAULT NULL,
  `RoleID` int DEFAULT NULL,
  PRIMARY KEY (`MemberID`),
  KEY `religion_idx` (`ReligionID`),
  KEY `Nationality_idx` (`NationalityID`),
  KEY `FamilyTree_idx` (`CodeID`),
  KEY `parentid` (`FatherID`,`MotherID`),
  KEY `memberRole` (`RoleID`),
  CONSTRAINT `familyMember` FOREIGN KEY (`CodeID`) REFERENCES `familytree` (`CodeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_RoleID` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`),
  CONSTRAINT `memberRole` FOREIGN KEY (`RoleID`) REFERENCES `role` (`RoleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Nationality` FOREIGN KEY (`NationalityID`) REFERENCES `nationality` (`NationalityID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `religion` FOREIGN KEY (`ReligionID`) REFERENCES `religion` (`ReligionID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3372 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familymember`
--

LOCK TABLES `familymember` WRITE;
/*!40000 ALTER TABLE `familymember` DISABLE KEYS */;
INSERT INTO `familymember` VALUES (1769,1764,NULL,'dwqqw',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'632561',NULL,3),(1778,NULL,NULL,'fwwf',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,0,'632561',NULL,3),(1802,NULL,NULL,'1',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'632561',NULL,3),(1817,NULL,NULL,'Tổ phụ','1',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'665575',NULL,1),(1818,NULL,NULL,'Vợ tổ phụ 1','2',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,0,'665575',NULL,3),(1819,1817,1818,'1','1',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'665575',NULL,3),(1820,NULL,NULL,'hh','hh',1,'1',1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'968143',NULL,1),(1821,1817,NULL,'John Doe3',NULL,2,NULL,NULL,NULL,'1980-11-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',2,'A',1,'665575',NULL,3),(1822,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1823,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1824,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1825,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1826,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1827,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1828,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1829,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1830,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1831,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1832,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1833,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1834,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1835,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1836,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1837,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1838,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1839,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1840,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1841,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1842,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1843,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1844,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1845,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1846,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1847,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1848,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1849,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1850,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1851,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1852,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1853,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1854,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1855,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1856,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1857,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1858,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1859,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1861,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1862,NULL,NULL,'John Doe3','Johnny',2,'New York',NULL,NULL,'1980-01-24','1980-03-15','New York Hospital',1,'1980-01-24','2000-04-24','Nam Dinh','Khong biet','day la note',0,'A',1,'968143',NULL,3),(1863,NULL,NULL,'Lưu Văn Vây','Lưu Văn Vây',1,'1',1,1,'1843-11-11','1843-09-20',NULL,1,'1920-11-09','1920-09-29',NULL,NULL,NULL,1,'A',1,'215847',NULL,1),(1865,NULL,NULL,'Trần Thị Ước',NULL,1,'1',1,1,'1844-02-03','1843-12-15',NULL,1,'1927-11-11','1927-10-18',NULL,NULL,NULL,1,'B',0,'215847',NULL,3),(1867,1863,1865,'Lưu Hồng Tâm','Lưu Hồng Tâm',1,'1',1,1,'1860-12-05','1860-10-23',NULL,1,NULL,NULL,NULL,NULL,NULL,2,'O',1,'215847',NULL,3),(1869,1863,1865,'Lưu Đức Thắng',NULL,2,'2',1,1,'1862-05-04','1862-04-06',NULL,1,'1930-12-05','1930-10-16',NULL,NULL,NULL,2,'AB',1,'215847',NULL,3),(1871,1863,1865,'Lưu Quang Thi',NULL,3,'3',1,1,'1866-05-09','1866-03-25',NULL,1,'1923-08-04','1923-06-22',NULL,NULL,NULL,2,'O',1,'215847','/uploads/images/member-photo/d0a2d2031cd9f1c424912335f100c6.jpg',3),(1874,1863,1865,'Lưu Đức Tài',NULL,5,'',1,1,'1880-05-04','1880-03-26',NULL,1,'1943-06-02','1943-04-30',NULL,NULL,NULL,2,'A',1,'215847',NULL,3),(1875,1863,1865,'Lưu Thị Nguyệt','Lưu Thị Nguyệt',6,'',1,1,'1882-07-01','1882-05-16',NULL,1,'1956-08-02','1956-06-26',NULL,NULL,NULL,2,'O',0,'215847',NULL,3),(1876,1863,1865,'Lưu Văn Thái',NULL,7,'',1,1,'1885-02-06','1884-12-22',NULL,1,'1963-05-07','1963-04-14',NULL,NULL,NULL,2,'O',1,'215847',NULL,3),(1878,1863,1865,'Lưu Đức Thiện','Lưu Đức Thiện',4,'',1,1,'1868-01-06','1867-12-12',NULL,1,'1939-12-22','1939-11-12',NULL,NULL,NULL,2,'O',1,'215847',NULL,3),(1879,NULL,NULL,'Nguyễn Thị Thu Hòa','Nguyễn Thị Thu Hòa',3,'',1,1,'1861-11-02','1861-10-01',NULL,1,'1920-12-06','1920-10-27',NULL,NULL,NULL,2,'O',0,'215847',NULL,3),(1880,NULL,NULL,'Đồng Thị Hoa','Đồng Thị Hoa',1,'',1,1,'1864-12-09','1864-11-11',NULL,1,'1920-01-05','1919-11-15',NULL,NULL,NULL,2,'B',0,'215847',NULL,3),(1881,NULL,NULL,'Phạm Thị Huế','Phạm Thị Huế',1,'',1,1,'1866-01-03','1865-11-17',NULL,1,'1934-07-02','1934-05-21',NULL,NULL,NULL,2,'O',0,'215847',NULL,3),(1882,NULL,NULL,'Nguyễn Thị Thủy','Nguyễn Thị Thủy',1,'',1,1,'1871-07-03','1871-05-16',NULL,1,'1938-06-02','1938-05-05',NULL,NULL,NULL,2,'A',0,'215847',NULL,3),(1884,NULL,NULL,'Nguyễn Minh Thu','Nguyễn Minh Thu',1,'',1,1,'1885-03-05','1885-01-19',NULL,1,'1943-07-01','1943-05-29',NULL,NULL,NULL,2,'AB',0,'215847',NULL,3),(1887,NULL,NULL,'Trần Thị Huê','Trần Thị Huê',1,'',1,1,'1878-08-04','1878-07-06',NULL,1,'1960-02-06','1960-01-10',NULL,NULL,NULL,2,'A',0,'215847',NULL,3),(1888,1867,1879,'Lưu Thế Anh','Lưu Thế Anh',1,'',1,1,'1886-09-02','1886-08-05',NULL,1,'1972-04-09','1972-02-26',NULL,NULL,NULL,3,'O',1,'215847',NULL,3),(1890,1867,1879,'Lưu Tùng Lâm','Lưu Tùng Lâm',2,'',1,1,'1894-11-06','1894-10-09',NULL,1,'1994-05-07','1994-03-27',NULL,NULL,NULL,3,'O',1,'215847',NULL,3),(1891,1869,1880,'Lưu Hồng Nhung','Lưu Hồng Nhung',1,'',1,1,'1885-07-11','1885-05-29',NULL,1,'1959-12-02','1959-11-03',NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1893,1869,1880,'Lưu Xuân Long','Lưu Xuân Long',2,'2',1,1,'1894-01-21','1893-12-15',NULL,1,'1967-02-07','1966-12-28',NULL,NULL,NULL,3,'B',1,'215847','/uploads/images/member-photo/d42baa1c9fafde854bdf1d4e84e9e9.jpg',3),(1894,1871,1881,'Lưu Thị Thảo','Lưu Thị Thảo',1,'1',1,1,'1890-12-06','1890-10-25',NULL,1,'1981-06-07','1981-05-06',NULL,NULL,NULL,3,'A',0,'215847',NULL,3),(1896,1871,1881,'Lưu Anh Tuấn',NULL,2,'2',1,1,'1898-06-01','1898-04-13',NULL,1,'1968-07-23','1968-06-28',NULL,NULL,NULL,3,'A',1,'215847','/uploads/images/member-photo/cf84bcf24303a3c10dafd43c6517ae.jpg',3),(1897,1878,1882,'Lưu Thùy Dương','Lưu Thùy Dương',1,'1',1,1,'1898-09-30','1898-08-15',NULL,1,'1988-01-31','1987-12-13',NULL,NULL,NULL,3,'O',0,'215847','/uploads/images/member-photo/f40040eda10ca33acaea5d2e03f307.jpg',3),(1899,1878,1882,'Lưu Đức Việt','Lưu Đức Việt',2,'2',1,1,'1904-07-02','1904-05-19',NULL,1,'1985-03-09','1985-02-18',NULL,NULL,NULL,3,'B',1,'215847',NULL,3),(1900,1874,1884,'Lưu Trường Giang','Lưu Trường Giang',1,'1',1,1,'1923-08-01','1923-06-19',NULL,1,'2002-09-26','2002-08-20',NULL,NULL,NULL,3,'AB',1,'215847',NULL,3),(1902,1874,1884,'Lưu Phương Linh','Lưu Phương Linh',2,'2',1,1,'1927-07-01','1927-06-03',NULL,1,'1991-07-02','1991-05-21',NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1903,1876,1887,'Lưu Hoàng Hà','Lưu Hoàng Hà',1,'1',1,1,'1925-02-07','1925-01-15',NULL,1,'1987-07-02','1987-06-07',NULL,NULL,NULL,3,'O',1,'215847',NULL,3),(1904,1876,1887,'Lưu Thùy Trang','Lưu Thùy Trang',2,'2',1,1,'1927-01-07','1926-12-04',NULL,0,NULL,NULL,NULL,NULL,NULL,3,'AB',0,'215847',NULL,3),(1905,NULL,NULL,'Lê Thị Lung Linh',NULL,1,'',1,1,'1889-06-02','1889-05-04',NULL,1,'1979-02-08','1979-01-12',NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1908,NULL,NULL,'Hoàng Thị Linh','Hoàng Thị Linh',1,'',1,1,'1894-01-12','1893-12-06',NULL,1,'1974-12-05','1974-10-22',NULL,NULL,NULL,3,'O',0,'215847','/uploads/images/member-photo/2a71ac3fd9d28c4098269275929254.jpg',3),(1911,NULL,NULL,'Phạm Thị Khánh ',NULL,1,'',1,1,'1904-07-01','1904-05-18',NULL,1,'1977-09-16','1977-08-04',NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1914,NULL,NULL,'Lê Thị Phượng','Lê Thị Phượng',1,'1',1,1,'1911-09-02','1911-07-10',NULL,1,'1984-07-12','1984-06-14',NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1916,NULL,NULL,'Trần Thị Lệ','Trần Thị Lệ',1,'1',1,1,'1929-07-01','1929-05-25',NULL,0,NULL,NULL,NULL,NULL,NULL,3,'A',0,'215847',NULL,3),(1919,NULL,NULL,'Mai Xuân Hương','Mai Xuân Hương',1,'1',1,1,'1929-12-06','1929-11-06',NULL,0,NULL,NULL,NULL,NULL,NULL,3,'O',0,'215847',NULL,3),(1921,1820,NULL,'re',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'O',1,'968143',NULL,3),(1922,1921,NULL,'wer',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,'B',1,'968143',NULL,3),(1923,1922,NULL,'gs','gdsdgs',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,'A',1,'968143',NULL,3),(1924,NULL,NULL,'et','ge',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'968143',NULL,3),(1950,NULL,NULL,'e2112',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'645631',NULL,1),(1958,1950,NULL,'r232',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'645631',NULL,3),(1959,1958,NULL,'23r3r2',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'645631',NULL,3),(1966,NULL,NULL,'Vũ Huyền Trang',NULL,1,'',1,1,'1899-07-01','1899-05-24',NULL,1,'1923-07-02','1923-05-19',NULL,NULL,NULL,3,'AB',0,'215847',NULL,3),(1967,1888,1905,'Lưu Anh Dũng','Lưu Anh Dũng',1,NULL,1,1,'1900-05-01','1900-04-03',NULL,1,'1982-01-06','1981-12-12',NULL,NULL,NULL,4,'A',1,'215847',NULL,3),(1970,1888,1905,'Lưu Anh Minh','Lưu Anh Minh',2,NULL,1,1,'1904-05-01','1904-03-16',NULL,1,'1999-05-16','1999-04-02',NULL,NULL,NULL,4,'O',1,'215847',NULL,3),(1971,1890,1966,'Lưu Đức Tùng','Lưu Đức Tùng',1,NULL,1,1,'1924-05-01','1924-03-28',NULL,1,'2000-02-05','2000-01-01',NULL,NULL,NULL,4,'B',1,'215847',NULL,3),(1972,1890,1966,'Lưu Hoàng Anh','Lưu Hoàng Anh',2,NULL,1,1,'1932-05-01','1932-03-26',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',1,'215847','/uploads/images/member-photo/7fdd58e3d087e990dfe993265986fd.jpg',3),(1973,1893,1908,'Lưu Văn Đức','Lưu Văn Đức',1,NULL,1,1,'1927-05-01','1927-04-01',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'B',1,'215847','/uploads/images/member-photo/da6c9274106e262ed8d62fb403b24a.jpg',3),(1974,1896,1911,'Lưu Huy Hoàng','Lưu Huy Hoàng',1,NULL,1,1,'1928-05-25','1928-04-07',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',1,'215847','/uploads/images/member-photo/9a187103a94c575e44159c34a7f083.jpg',3),(1975,1899,1914,'Lưu Quỳnh Như','Lưu Quỳnh Như',1,NULL,1,1,'1932-05-01','1932-03-26',NULL,1,'2012-05-01','2012-04-11',NULL,NULL,NULL,4,'O',0,'215847',NULL,3),(1977,1896,1911,'Lưu Thị Ngọc Ánh','Lưu Thị Ngọc Ánh',2,'2',1,1,'1938-06-02','1938-05-05',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'A',0,'215847','/uploads/images/member-photo/00e4b11f6b4381d55e5e28cbd5846d.jpg',3),(1978,1899,1914,'Lưu Thị Thu Hiền','Lưu Thị Thu Hiền',2,'2',1,1,'1938-04-01','1938-03-01',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/226a57f126f4486ebb5ee3d86883fe.jpg',3),(1979,1900,1916,'Lưu Vinh Quang','Lưu Vinh Quang',1,NULL,1,1,'1946-04-11','1946-03-10',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'B',1,'215847',NULL,3),(1980,1900,1916,'Lưu Hồng Phúc','Lưu Hồng Phúc',2,NULL,1,1,'1951-06-21','1951-05-18',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'AB',1,'215847',NULL,3),(1981,1903,1919,'Lưu Ngọc Thanh','Lưu Ngọc Thanh',1,NULL,1,1,'1955-11-01','1955-09-17',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'B',0,'215847','/uploads/images/member-photo/a71473db992cb88c737883d2985515.jpg',3),(1982,1903,1919,'Lưu Thanh Nhi','Lưu Thanh Nhi',2,NULL,1,1,'1959-06-16','1959-05-11',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'A',0,'215847','/uploads/images/member-photo/99d8347fae8cba0467dcb16fe2f6ec.jpg',3),(1983,NULL,NULL,'Lê Ngọc Hiền','Lê Ngọc Hiền',1,NULL,1,1,'1911-12-01','1911-10-11',NULL,1,'2002-06-15','2002-05-05',NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/abfd75bc3d20c6e23317a19a08f0cf.jpg',3),(1984,NULL,NULL,'Nguyễn Ngọc Mai','Nguyễn Ngọc Mai',1,NULL,1,1,'1911-01-26','1910-12-27',NULL,1,'1992-06-12','1992-05-12',NULL,NULL,NULL,4,'B',0,'215847','/uploads/images/member-photo/5dbffce0eb88148fd8579e378836fc.jpg',3),(1985,NULL,NULL,'Phạm Thanh Hồng','Phạm Thanh Hồng',1,NULL,1,1,'1929-12-01','1929-11-01',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/9be85766a488ed846481d680066445.jpg',3),(1986,NULL,NULL,'Trần Vũ Thảo Linh','Trần Vũ Thảo Linh',1,NULL,1,1,'1940-12-22','1940-11-24',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/0014edb221741bec39713311003958.jpg',3),(1987,NULL,NULL,'Tào Thị Ngọc','Tào Thị Ngọc',1,NULL,1,1,'1938-04-16','1938-03-16',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'B',0,'215847','/uploads/images/member-photo/752e1ee4317eb09e47f2d6d95c653f.jpg',3),(1988,NULL,NULL,'Tạ Ngọc Huyền','Tạ Ngọc Huyền',1,NULL,1,1,'1936-04-11','1936-03-20',NULL,1,'1995-01-05','1994-12-05',NULL,NULL,NULL,4,'A',0,'215847','/uploads/images/member-photo/c442d611d5a20ee579f34cf600a67d.jpg',3),(1990,NULL,NULL,'Vũ Hồng Ngọc','Vũ Hồng Ngọc',1,NULL,1,1,'1950-04-01','1950-02-15',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/768d242f007dba0cf6060b063be780.jpg',3),(1991,NULL,NULL,'Tôn Khánh Huyền','Tôn Khánh Huyền',1,NULL,1,1,'1959-05-01','1959-03-24',NULL,0,NULL,NULL,NULL,NULL,NULL,4,'B',0,'215847','/uploads/images/member-photo/679077d6940ed9c952521e320c5cba.jpg',3),(1992,1967,1983,'Lưu Ngọc Như','Lưu Ngọc Như',1,NULL,1,1,'1929-05-11','1929-04-03',NULL,1,'1941-11-07','1941-09-19',NULL,NULL,NULL,5,'O',0,'215847',NULL,3),(1993,1967,1983,'Lưu Đức Nam','Lưu Đức Nam',2,NULL,1,1,'1935-08-25','1935-07-27',NULL,1,'1955-07-22','1955-06-04',NULL,NULL,NULL,5,'A',1,'215847',NULL,3),(1994,1970,1984,'Lưu Hoàng Hải','Lưu Hoàng Hải',1,NULL,1,1,'1933-05-11','1933-04-17',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',1,'215847','/uploads/images/member-photo/c30346e85e1d032ed7f16b305df212.jpg',3),(1995,1971,1985,'Lưu Ngọc Vũ','Lưu Ngọc Vũ',1,NULL,1,1,'1946-02-06','1946-01-05',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'AB',1,'215847','/uploads/images/member-photo/e9d09d98a7e808a12c6cdb876ba45c.png',3),(1997,1971,1985,'Lưu Đức Long','Lưu Đức Long',2,NULL,1,1,'1949-05-05','1949-04-08',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'AB',1,'215847','/uploads/images/member-photo/874cdbcfefa5b6b020caa5e70ee77c.jpg',3),(1998,1972,1986,'Lưu Thị Trà','Lưu Thị Trà',1,NULL,1,1,'1956-06-22','1956-05-14',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'B',0,'215847','/uploads/images/member-photo/c2ff13f186be9295797aa1fc66fad2.jpg',3),(2000,1972,1986,'Lưu Việt Phong','Lưu Việt Phong',2,NULL,1,1,'1962-12-05','1962-11-09',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',1,'215847',NULL,3),(2001,1973,1987,'Lưu Hoàng Luân','Lưu Hoàng Luân',1,NULL,1,1,'1949-11-06','1949-09-16',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',1,'215847','/uploads/images/member-photo/191b88a00421869808fe1ed61ddebe.jpg',3),(2002,1973,1987,'Lưu Hồng Hạnh','Lưu Hồng Hạnh',2,NULL,1,1,'1956-06-30','1956-05-22',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',0,'215847','/uploads/images/member-photo/d1ccb5540602f7902ae5c6f543467d.jpg',3),(2003,1974,1988,'Lưu Ngọc Vy','Lưu Ngọc Vy',1,NULL,1,1,'1958-04-22','1958-03-04',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'B',0,'215847','/uploads/images/member-photo/67eafd5ffd7e3dbcd1a2bb365e8dd5.jpg',3),(2004,1974,1988,'Lưu Thúy Ngân','Lưu Thúy Ngân',2,NULL,1,1,'1961-05-21','1961-04-08',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'AB',0,'215847','/uploads/images/member-photo/6d543c0723e28ca9b60943587c93dd.jpg',3),(2005,1980,NULL,'Lưu Thu Phương','Lưu Thu Phương',1,NULL,1,1,'1974-03-12','1974-02-19',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',0,'215847',NULL,3),(2006,1979,1990,'Lưu Ngọc Hân','Lưu Ngọc Hân',1,NULL,1,1,'1967-04-11','1967-03-02',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'O',0,'215847','/uploads/images/member-photo/97a22ee6d9c1b28120e21f206a7dd0.jpg',3),(2007,1979,1990,'Lưu Trung Hiếu','Lưu Trung Hiếu',2,NULL,1,1,'1971-04-24','1971-03-29',NULL,0,NULL,NULL,NULL,NULL,NULL,5,'B',1,'215847',NULL,3),(2030,NULL,NULL,'jtyyty',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,0,'645631',NULL,3),(2035,1961,2030,'dwq',NULL,3,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'645631',NULL,3),(2039,NULL,NULL,'wefwe',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,'A',0,'645631',NULL,3),(2068,NULL,NULL,'Empty Data',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'755100','/uploads/images/member-photo/cfc1305650ce04c8a1d709e1d1b74f.png',1),(2069,2068,NULL,'Tuấn',NULL,1,'1',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'755100',NULL,3),(2070,2068,NULL,'Nhật Anh',NULL,2,'2',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'755100','/uploads/images/member-photo/5f5e48f51763424e1a6f7f7c7bf1f0.jpg',3),(2073,2068,NULL,'Hùng',NULL,3,'3',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'755100','/uploads/images/member-photo/7e23458101c1640555d265de448205.jpg',3),(2074,2068,NULL,'Lâm',NULL,4,'4',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'755100','/uploads/images/member-photo/68e3e3df175fedc91bddefe1cd8e7e.png',3),(2075,2068,NULL,'Khôi',NULL,5,'5',1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'755100',NULL,3),(2092,NULL,NULL,'Trần Thị Thanh','Trần Thị Thanh',2,NULL,1,1,'1907-11-02','1907-09-27',NULL,1,'1966-01-06','1965-12-15',NULL,NULL,NULL,4,'O',0,'215847','/uploads/images/member-photo/839cf097203d8e7d771e974a3e3116.jpg',3),(2098,1962,NULL,'fwe',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'645631',NULL,3),(2106,NULL,NULL,'John Doe â','Johnny??',7,'  New York  ',NULL,NULL,'1980-05-24','1980-02-15','New York Hospital123',1,'1980-05-24','2000-11-24','Nam Dinh1','Khong biet',' dây la note ',0,'A',0,'968143',NULL,3),(2107,NULL,NULL,'John Doe â','Johnny??',7,'  New York  ',NULL,NULL,'1980-05-24','1980-02-15','New York Hospital123',3,'1980-05-24','2000-11-24','Nam Dinh1','Khong biet',' dây la note ',0,'A',0,'968143',NULL,3),(2108,NULL,NULL,'John Doe â','@#Johnny??',7,'  New York  ',NULL,NULL,'1980-05-24','1980-02-15','New York Hospital123',1,'1980-05-24','2000-11-24','Nam Dinh1','Khong biet',' dây la note ',0,'A',0,'968143',NULL,3),(2109,NULL,NULL,'John Doe â','@#Johnny??',7,'@#  New York 3  ',NULL,NULL,'1980-05-24','1980-02-15','New York Hospital123',1,'1980-05-24','2000-11-24','Nam Dinh1','Khong biet',' dây la note ',0,'A',0,'968143',NULL,3),(2110,2001,NULL,'Lưu Lê Hùng',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,6,NULL,1,'215847',NULL,3),(2112,1970,1984,'Lưu Việt Khôi',NULL,2,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5,NULL,1,'215847',NULL,3),(2113,NULL,1992,'Lưu quang hải',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,6,NULL,1,'215847',NULL,3),(2114,NULL,NULL,'Quach hoàng Trung',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5,NULL,1,'215847',NULL,3),(2115,NULL,1998,'Bùi Việt Thắng',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,6,NULL,1,'215847',NULL,3),(2116,NULL,NULL,'Bùi Trung Nam',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5,NULL,1,'215847',NULL,3),(2118,2035,NULL,'qwewq',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'645631',NULL,3),(2119,NULL,NULL,'qweqwe',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,0,'645631',NULL,3),(2122,2069,NULL,'Gmail Tuan',NULL,1,NULL,1,1,NULL,NULL,NULL,0,'2023-12-18','2023-11-06',NULL,NULL,NULL,3,NULL,1,'755100',NULL,3),(2123,2122,NULL,'Outlook Tuan',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'755100',NULL,3),(2139,NULL,NULL,'hh','hh',NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5,NULL,1,'215847',NULL,3),(2144,NULL,NULL,'aaa','aaaa',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'215847',NULL,3),(2170,NULL,NULL,'weewew',NULL,3,NULL,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,1,NULL,0,'131717','/uploads/images/member-photo/9c12bfa4ce7b023fe2246c0d295aae.png',1),(3085,NULL,NULL,'qfwqw',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'127451',NULL,1),(3086,3085,NULL,'qwfqw',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'127451',NULL,3),(3216,NULL,NULL,'Cụ tổ 1123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3217,NULL,NULL,'2',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0,'543739',NULL,3),(3218,NULL,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3219,NULL,NULL,'231',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3220,NULL,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3221,NULL,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3222,NULL,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3223,NULL,NULL,'13',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3224,NULL,NULL,'123222222',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3225,NULL,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3226,NULL,NULL,'2',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3227,NULL,NULL,'2',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3228,NULL,NULL,'dd','dd',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3229,NULL,NULL,'ddd','ddd',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3230,NULL,NULL,'dd','dd',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3231,NULL,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3232,NULL,NULL,'g','g',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3233,NULL,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3234,NULL,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3235,NULL,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'543739',NULL,3),(3236,3235,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'543739','\\uploads\\images\\member-photo\\5d20513f2b89ced0a67d1e4e96f766.png',1),(3237,3236,NULL,'f','f',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'543739',NULL,3),(3319,NULL,2170,'gr',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'131717','/uploads/images/member-photo/e178308d753f23d1f36665e553b116.jpg',3),(3320,NULL,NULL,'gre',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,0,'131717','/uploads/images/member-photo/ed3588eaa20dcec235f50afcc69b6f.png',3),(3331,NULL,NULL,'12',NULL,1,NULL,1,1,'1111-12-10','1111-11-08',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'544556',NULL,3),(3333,NULL,NULL,'121','12',NULL,'1212',1,1,'1213-01-05','1212-12-12',NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0,'544556',NULL,3),(3336,NULL,NULL,'12313',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'544556',NULL,3),(3337,NULL,NULL,'12312',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,0,'544556',NULL,3),(3338,NULL,NULL,'1',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'544556','/uploads/images/member-photo/19bc3e6c562e6091a41bd7c82744af.jpg',1),(3341,NULL,NULL,'Nguyễn Hoàng Anh',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,1,'141263',NULL,1),(3342,NULL,NULL,'Lê Thị Hà',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,0,'141263',NULL,3),(3343,3341,NULL,'Nguyễn Thị Thanh',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,0,'141263',NULL,3),(3344,3341,3342,'Nguyễn Tùng Lâm',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'141263',NULL,3),(3346,NULL,NULL,'Nguyễn Văn An',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,0,NULL,1,'141263',NULL,3),(3349,NULL,NULL,'22',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,1,NULL,0,'544556',NULL,3),(3350,3338,NULL,'123',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'544556',NULL,3),(3351,3350,NULL,'23232',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,0,'544556',NULL,3),(3352,NULL,NULL,'2333333333333333',NULL,NULL,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'544556',NULL,3),(3353,3352,3351,'444',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'544556',NULL,3),(3356,3338,NULL,'33',NULL,2,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,2,NULL,1,'544556',NULL,3),(3357,3319,3320,'fewewfew',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'131717',NULL,3),(3360,3319,3320,'ewfwe',NULL,2,NULL,1,1,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,3,NULL,1,'131717',NULL,3),(3361,3360,NULL,'efwewf',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,1,'131717',NULL,3),(3362,3361,3371,'fewfew',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,5,NULL,1,'131717',NULL,3),(3363,3362,NULL,'fewew',NULL,1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,6,NULL,1,'131717',NULL,3),(3371,NULL,NULL,'efwew','wef',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,4,NULL,0,'131717',NULL,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=432 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `familyphoto`
--

LOCK TABLES `familyphoto` WRITE;
/*!40000 ALTER TABLE `familyphoto` DISABLE KEYS */;
INSERT INTO `familyphoto` VALUES (307,149,'\\uploads\\images\\family-photo\\dee32ebcc767f4c6e098afdbe4b1e7.jpg'),(308,149,'\\uploads\\images\\family-photo\\a0b54a2fc837be04c86b95f785585e.png'),(309,149,'\\uploads\\images\\family-photo\\9b1db464eb319ea9655d94fbcb7333.jpg'),(310,150,'\\uploads\\images\\family-photo\\061703e07b640c917e099058eaa723.png'),(313,152,'/uploads/images/family-photo/16113bba10f9f9f5efeef87b704f65.jpg'),(314,152,'/uploads/images/family-photo/0436b547424248ca82d96a8bc3cf37.jpg'),(315,155,'/uploads/images/family-photo/e1156ad3443b4f2004039c130050ef.jpeg'),(317,155,'/uploads/images/family-photo/392904ecb77db8a385ddd1a8abd369.jpg'),(318,155,'/uploads/images/family-photo/98c501a89490a55e67bfcf63f768f2.jpg'),(319,155,'/uploads/images/family-photo/4697dee691fe0b84215a128e4b4646.jpg'),(320,152,'/uploads/images/family-photo/e8ad65c7856e9cd80bf30e258bce1f.jpg'),(321,152,'/uploads/images/family-photo/0f898e4c95fbe0cf07623e426f866c.jpg'),(322,152,'/uploads/images/family-photo/766120107980b089b2da3b9a045daa.jpg'),(324,155,'/uploads/images/family-photo/f975058a261185709216bcfb33ea97.jpg'),(325,155,'/uploads/images/family-photo/a8e61995e9e4889c6caa2fc6337e6f.jpg'),(326,155,'/uploads/images/family-photo/335d9c9f087f7ef7b3f5d3c6f00b45.jpg'),(327,155,'/uploads/images/family-photo/1c73120412c83f4ddc127abf8ac232.jpg'),(328,155,'/uploads/images/family-photo/78a7d1f2453b597557c0f8d67fd2af.jpg'),(329,155,'/uploads/images/family-photo/ac99b79edaba1bf39d91c6ecc23761.jpg'),(330,155,'/uploads/images/family-photo/793cf541e1eea0475b4daaf0742773.jpg'),(331,152,'/uploads/images/family-photo/a2a2ebfc067a25a3add7d5f1fd2ac1.jpg'),(332,152,'/uploads/images/family-photo/fc94c89393478e3a743e650640261d.jpg'),(333,152,'/uploads/images/family-photo/833441e7113975faed80873d7a198a.jpg'),(334,152,'/uploads/images/family-photo/1858c14d9c36569bd63a301539c75b.jpg'),(335,152,'/uploads/images/family-photo/3af3566d0ce8329606261a693a2791.jpg'),(336,152,'/uploads/images/family-photo/ea7814b9709ae1e9c8d65d9ad42a6a.jpg'),(337,152,'/uploads/images/family-photo/7c05292582ab21e1f05684e167088b.jpg'),(354,159,'\\uploads\\images\\family-photo\\2941286e9ccf97ef24e0b90fd1cbfd.jpg'),(355,159,'\\uploads\\images\\family-photo\\9440a39448b7936e60e1b22d9fd571.jpg'),(356,165,'\\uploads\\images\\family-photo\\3d1c81262c458cfc5f8dbed8f1431f.jpg'),(357,165,'\\uploads\\images\\family-photo\\ca68fc27c1b1496b7cc8bb390198f8.jpg'),(358,165,'\\uploads\\images\\family-photo\\c2ad75ba7fb2fb4d4fd831e0742158.jpg'),(359,160,'/uploads/images/family-photo/be54d8262447998fa82cdf5374f586.jpg'),(360,160,'/uploads/images/family-photo/fd838cc004930b463887c35a700d2f.jpg'),(361,160,'/uploads/images/family-photo/76d104daac0d3bca482d36f4aafef7.jpg'),(362,160,'/uploads/images/family-photo/f5d99720d6782f13311249425c796f.jpg'),(363,160,'/uploads/images/family-photo/b432632d05e82b813480824b16340f.jpg'),(364,160,'/uploads/images/family-photo/b9db0f1e884d456362240a6392a1e9.jpg'),(365,163,'/uploads/images/family-photo/40aea127ceebb5cba58d5b747b3351.jpg'),(366,163,'/uploads/images/family-photo/6e0d81a1dc06a1def2ff9dac70b10b.jpg'),(367,163,'/uploads/images/family-photo/55460daf3a11e8d5bcbac22f6d677c.jpg'),(368,163,'/uploads/images/family-photo/84b3b1ca1ccdfca3caa78f91bc3c80.jpg'),(369,163,'/uploads/images/family-photo/3b2217da3b7cc301ca118874a5568d.jpg'),(370,164,'/uploads/images/family-photo/0ad8911b2a86a0ce647e8ba91fec8c.jpg'),(371,164,'/uploads/images/family-photo/b4a38abb879e87be75f56d05ea1e7a.jpg'),(372,164,'/uploads/images/family-photo/4506569257da7c8ed969f3e14b107b.jpg'),(373,164,'/uploads/images/family-photo/29f48c202147b3fd581b9fa4f3e0cf.jpg'),(374,164,'/uploads/images/family-photo/ad4e60cd6502b95028a98ec16bca5d.jpg'),(376,162,'/uploads/images/family-photo/1cceea37bb9d5eec9dc9bb275d69df.jpg'),(377,162,'/uploads/images/family-photo/f6260d18fb906221b4f0f6c709024e.jpg'),(382,162,'/uploads/images/family-photo/208b9bada691f1bd93660ebe68d2bd.png'),(383,162,'/uploads/images/family-photo/4fba15d5dcee826f0ee0e9e783694f.png'),(384,162,'/uploads/images/family-photo/b2068224a25939d5aa2b644a8051b5.png'),(385,161,'/uploads/images/family-photo/bceedc45d0b7da08e5138ce73762f4.jpg'),(386,161,'/uploads/images/family-photo/07a44ae258fc691e3d82a57f64aed2.jpg'),(387,161,'/uploads/images/family-photo/94a6daa38c417c65af343e59c1833a.jpg'),(388,161,'/uploads/images/family-photo/efc6a3b3d71d939d1a9d1ef41f06f3.jpg'),(389,161,'/uploads/images/family-photo/58ec63ed974f87adc61a31fa33b326.png'),(390,161,'/uploads/images/family-photo/7e718fb1071789fb152b3faa3adbc5.png'),(391,157,'/uploads/images/family-photo/1f5325dad0bb1064948fe2a14e807d.jpg'),(392,157,'/uploads/images/family-photo/a7caba5039b3b71c61e0451dee14ae.jpg'),(401,154,'/uploads/images/family-photo/5f824af10d18926d1e4abefa1d15e6.jpg'),(402,154,'/uploads/images/family-photo/798d3e23144135af07ace803b440d7.jpg'),(403,154,'/uploads/images/family-photo/24211d91ead0ad59b5e4c4d31339ce.jpg'),(404,154,'/uploads/images/family-photo/ad803cc33469dd12e566f9dd26eba4.jpg'),(416,154,NULL),(417,154,NULL),(418,154,NULL),(419,154,NULL),(425,154,'\\uploads\\images\\family-photo\\e79417b5501cad65746cdb0d5d98a3.jpeg');
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
INSERT INTO `familytree` VALUES ('127451','123','123','2023-12-12 00:00:00'),('131717','Nguyễn','123','2023-12-19 00:00:00'),('141263','Nguyễn','Kinh','1002-03-21 00:00:00'),('207693','wqe','qwe','2023-12-13 00:00:00'),('215847','Lưu','Kinh','2023-12-07 00:00:00'),('237062','Nguyễn ','Mường','2023-12-30 00:00:00'),('543739','Nguyễn','Mường','2023-12-19 00:00:00'),('544556','Phùng','Kinh','2023-12-15 00:00:00'),('571539','Nguyễn ','Mường','2023-12-08 00:00:00'),('632561','N','1','1111-11-11 00:00:00'),('645631','Nguyễn','Kinh','2023-12-28 00:00:00'),('665575','Nguyễn','Mường','2023-12-13 00:00:00'),('755100','123','123','2023-12-14 00:00:00'),('7551003','tuan','tuan',NULL),('795176','hh','hh','2023-11-30 00:00:00'),('854631','123','123','2023-12-08 00:00:00'),('968143','Vũ','Kinh','2023-12-08 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job`
--

LOCK TABLES `job` WRITE;
/*!40000 ALTER TABLE `job` DISABLE KEYS */;
INSERT INTO `job` VALUES (22,1950,'234','234','234','234',NULL,NULL),(25,2069,'2131','2123','123',NULL,'2024-01-04 00:00:00','2023-12-23 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marriage`
--

LOCK TABLES `marriage` WRITE;
/*!40000 ALTER TABLE `marriage` DISABLE KEYS */;
INSERT INTO `marriage` VALUES (213,1769,1778,'131717',1),(226,1817,1818,'665575',1),(227,1863,1865,'215847',1),(229,1867,1879,'215847',1),(230,1869,1880,'215847',1),(231,1871,1881,'215847',1),(232,1878,1882,'215847',1),(234,1874,1884,'215847',1),(236,1876,1887,'215847',1),(237,1888,1905,'215847',1),(239,1893,1908,'215847',1),(241,1896,1911,'215847',1),(243,1899,1914,'215847',1),(244,1900,1916,'215847',1),(246,1903,1919,'215847',1),(255,1890,1966,'215847',1),(256,1967,1983,'215847',1),(257,1970,1984,'215847',1),(258,1971,1985,'215847',1),(259,1972,1986,'215847',1),(260,1973,1987,'215847',1),(261,1974,1988,'215847',1),(263,1979,1990,'215847',1),(264,1980,1991,'215847',1),(284,1967,2092,'215847',2),(291,2114,1992,'215847',1),(292,2116,1998,'215847',1),(294,2118,2119,'645631',1),(304,2139,2004,'215847',1),(346,3216,3217,'543739',1),(347,3319,3320,'131717',1),(353,3331,3333,'544556',1),(356,3336,3337,'544556',1),(357,3341,3342,'141263',1),(359,3338,3349,'544556',1),(360,3352,3351,'544556',1),(361,3361,3371,'131717',1);
/*!40000 ALTER TABLE `marriage` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationemail`
--

LOCK TABLES `notificationemail` WRITE;
/*!40000 ALTER TABLE `notificationemail` DISABLE KEYS */;
INSERT INTO `notificationemail` VALUES (20,'Chủ đề 1','Đây là chức năng gửi sms','2023-12-09 12:40:24','543739'),(21,'Sự kiện giỗ ông tổ','Ngày 15/12/2023 vào lúc 09:30 sẽ bắt đầu tổ chức tại 252, đường Ngô Quyền,phường Cốc Lếu, TP Lào Cai,tỉnh Lào Cai. Mọi người chú ý thu xếp thời gian để có mặt đúng giờ','2023-12-09 19:25:11','215847'),(22,'1','1','2023-12-10 09:03:10','544556'),(23,'fwqqwf','qwfqwfqw','2023-12-13 14:39:49','755100');
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificationhistory`
--

LOCK TABLES `notificationhistory` WRITE;
/*!40000 ALTER TABLE `notificationhistory` DISABLE KEYS */;
INSERT INTO `notificationhistory` VALUES (17,'đÂY LÀ CHỨC NĂNG TESTSMSS','2023-12-09 12:39:39','543739'),(18,'hello chao cau','2023-12-09 14:36:44','755100'),(19,'Chúng tôi xin trân trọng thông báo về sự kiện lớn dành cho dòng họ - một cơ hội quý báu để tập trung và chia sẻ những khoảnh khắc quan trọng cùng nhau.  THÔNG TIN CHI TIẾT:  Ngày: Thứ Sáu, 15/12/2023 Thời gian: 09:30 sáng Địa điểm: 252, Đường Ngô Quyền, Phường Cốc Lếu, TP Lào Cai, Tỉnh Lào Cai Đây là một sự kiện mang tính chất trọng đại và yêu cầu sự chú ý đặc biệt từ mỗi thành viên trong gia đình. Việc có mặt đúng giờ, tức là vào lúc 09:30 sáng, là không thể bỏ qua và rất quan trọng để chúng ta có thể bắt đầu sự kiện một cách suôn sẻ và đúng theo kế hoạch.','2023-12-09 19:28:39','215847'),(20,'Chúng tôi xin trân trọng thông báo về sự kiện lớn dành cho dòng họ - một cơ hội quý báu để tập trung và chia sẻ những khoảnh khắc quan trọng cùng nhau.  THÔNG TIN CHI TIẾT:  Ngày: Thứ Sáu, 15/12/2023 Thời gian: 09:30 sáng Địa điểm: 252, Đường Ngô Quyền, Phường Cốc Lếu, TP Lào Cai, Tỉnh Lào Cai Đây là một sự kiện mang tính chất trọng đại và yêu cầu sự chú ý đặc biệt từ mỗi thành viên trong gia đình. Việc có mặt đúng giờ, tức là vào lúc 09:30 sáng, là không thể bỏ qua và rất quan trọng để chúng ta có thể bắt đầu sự kiện một cách suôn sẻ và đúng theo kế hoạch.','2023-12-09 19:28:41','215847'),(21,'123','2023-12-16 15:17:31','543739'),(22,'Test sms','2023-12-16 15:19:11','543739'),(23,'Testtttt','2023-12-16 15:20:08','543739'),(24,'123123','2023-12-16 15:21:28','543739');
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
INSERT INTO `roleaccount` VALUES (1,'Quản trị viên'),(2,'Người quản lý'),(3,'Người xem');
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

-- Dump completed on 2023-12-18 19:04:14
