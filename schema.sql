-- MySQL dump 10.13  Distrib 5.7.24, for Linux (x86_64)
--
-- Host: localhost    Database: github_analyzer
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `github_profiles`
--

DROP TABLE IF EXISTS `github_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `github_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `followers` int DEFAULT NULL,
  `following` int DEFAULT NULL,
  `public_repos` int DEFAULT NULL,
  `public_gists` int DEFAULT NULL,
  `profile_url` varchar(255) DEFAULT NULL,
  `account_created_at` datetime DEFAULT NULL,
  `analyzed_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `account_age` int DEFAULT NULL,
  `popularity_score` int DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `blog` varchar(500) DEFAULT NULL,
  `bio` text,
  `twitter_username` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `profile_completeness` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `github_profiles`
--

LOCK TABLES `github_profiles` WRITE;
/*!40000 ALTER TABLE `github_profiles` DISABLE KEYS */;
INSERT INTO `github_profiles` VALUES (6,'torvalds','Linus Torvalds',305458,0,11,1,'https://github.com/torvalds','2011-09-03 15:26:22','2026-06-02 13:54:20',15,610927,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(7,'gaearon','dan',90799,174,296,82,'https://github.com/gaearon','2011-05-25 18:18:31','2026-06-02 13:54:47',15,181894,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(8,'viggu777','MOHAN VIGNESH',0,1,11,0,'https://github.com/viggu777','2024-08-28 11:53:32','2026-06-02 18:59:14',2,11,NULL,'Vizag','',NULL,NULL,NULL,33);
/*!40000 ALTER TABLE `github_profiles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-03  0:45:27
