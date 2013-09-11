SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `intravires` DEFAULT CHARACTER SET utf8 ;
USE `intravires` ;

-- -----------------------------------------------------
-- Table `intravires`.`user_statistics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`user_statistics` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`user_statistics` (
  `statistics_id` INT NOT NULL ,
  `occupation` VARCHAR(45) NULL DEFAULT NULL ,
  `school` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(45) NULL DEFAULT NULL ,
  `citation_statisticscol` VARCHAR(45) NULL DEFAULT NULL ,
  `average_usage_time` TIME NULL DEFAULT NULL ,
  `login_count` INT NULL DEFAULT NULL ,
  PRIMARY KEY (`statistics_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`users` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT ,
  `email` VARCHAR(50) NULL DEFAULT NULL ,
  `firstname` VARCHAR(45) NULL ,
  `lastname` VARCHAR(45) NULL ,
  `create_date` DATETIME NULL DEFAULT NULL ,
  `active` TINYINT(1) NULL DEFAULT NULL ,
  `password_salt` CHAR(64) NULL DEFAULT NULL ,
  `password_hash` BLOB NULL DEFAULT NULL ,
  `email_salt` CHAR(64) NULL DEFAULT NULL ,
  `email_hash` BLOB NULL DEFAULT NULL ,
  `occupation` VARCHAR(45) NULL DEFAULT NULL ,
  `school` VARCHAR(45) NULL DEFAULT NULL ,
  PRIMARY KEY (`user_id`) ,
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`citation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`citation` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`citation` (
  `citation_id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `title` VARCHAR(45) NULL DEFAULT NULL ,
  `comments` VARCHAR(45) NULL DEFAULT NULL ,
  `citation` VARCHAR(45) NULL DEFAULT NULL ,
  `formtype` VARCHAR(45) NULL ,
  `date_created` DATETIME NULL DEFAULT NULL ,
  `date_modified` TIMESTAMP NULL DEFAULT NULL ,
  `finished` TINYINT(1) NULL DEFAULT NULL ,
  PRIMARY KEY (`citation_id`, `user_id`) ,
  INDEX `fk_citation_user1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_citation_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`tag` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`tag` (
  `tag_id` INT NOT NULL ,
  `category` VARCHAR(45) NULL DEFAULT NULL ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`tag_id`) ,
  INDEX `fk_tag_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_tag_citation1`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`subscription`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`subscription` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`subscription` (
  `idpayment` INT NOT NULL ,
  `subscriptiontype` VARCHAR(45) NULL DEFAULT NULL ,
  `renew` TINYINT(1) NULL DEFAULT NULL ,
  `date_start` VARCHAR(45) NULL DEFAULT NULL ,
  `date_end` VARCHAR(45) NULL DEFAULT NULL ,
  `duration` TIMESTAMP NULL DEFAULT NULL ,
  `amount` VARCHAR(45) NULL DEFAULT NULL ,
  `user_user_id` INT NOT NULL ,
  PRIMARY KEY (`idpayment`, `user_user_id`) ,
  INDEX `fk_subscription_user1_idx` (`user_user_id` ASC) ,
  CONSTRAINT `fk_subscription_user1`
    FOREIGN KEY (`user_user_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`payment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`payment` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`payment` (
  `payment_id` INT NOT NULL ,
  `status_ok` TINYINT(1) NULL DEFAULT NULL COMMENT 'credit card ok?' ,
  `credit_card_no` INT NULL DEFAULT NULL ,
  `credit_card_type` VARCHAR(45) NULL DEFAULT NULL ,
  `date_exp` VARCHAR(45) NULL DEFAULT NULL ,
  `paymentcol` VARCHAR(45) NULL DEFAULT NULL ,
  `csv` SMALLINT NULL DEFAULT NULL ,
  `name` VARCHAR(45) NULL DEFAULT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`payment_id`, `user_id`) ,
  INDEX `fk_payment_user1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_payment_user1`
    FOREIGN KEY (`user_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`sessions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`sessions` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`sessions` (
  `session_id` CHAR(128) NOT NULL ,
  `atime` TIMESTAMP NOT NULL DEFAULT current_timestamp ,
  `data` TEXT NULL DEFAULT NULL ,
  PRIMARY KEY (`session_id`) ,
  UNIQUE INDEX `session_id_UNIQUE` (`session_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`us_case`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`us_case` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`us_case` (
  `us_case_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `styleofcause` VARCHAR(45) NULL DEFAULT NULL ,
  `parallelcitation` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(45) NULL DEFAULT NULL ,
  `court` VARCHAR(45) NULL DEFAULT NULL ,
  `shortform` VARCHAR(45) NULL DEFAULT NULL ,
  `judge` VARCHAR(45) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteInput` VARCHAR(45) NULL DEFAULT NULL ,
  `citingStyle` VARCHAR(45) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(45) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(45) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL COMMENT 'docket or citation of case appealed' ,
  `result` VARCHAR(500) NULL DEFAULT NULL ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(45) NULL DEFAULT NULL ,
  PRIMARY KEY (`us_case_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation10`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`journal_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`journal_article` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`journal_article` (
  `journal_article_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `authors` VARCHAR(45) NULL DEFAULT NULL ,
  `title` VARCHAR(45) NULL DEFAULT NULL ,
  `citation` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointPara` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointParaCheck` TINYINT(1) NULL DEFAULT NULL ,
  `pinpointPage` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointPageCheck` TINYINT(1) NULL DEFAULT NULL ,
  `pinpointFoot1` VARCHAR(45) NULL DEFAULT NULL ,
  `pinponitFoot2` VARCHAR(45) NULL DEFAULT NULL ,
  PRIMARY KEY (`journal_article_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation11`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`uk_case`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`uk_case` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`uk_case` (
  `uk_case_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `styleofcause` VARCHAR(45) NULL ,
  `parallelcitation` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(45) NULL DEFAULT NULL ,
  `court` VARCHAR(45) NULL DEFAULT NULL ,
  `shortform` VARCHAR(45) NULL DEFAULT NULL ,
  `judge` VARCHAR(45) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteReporter` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteParapageNumber` VARCHAR(45) NULL DEFAULT NULL ,
  `citingStyle` VARCHAR(45) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(45) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(45) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL DEFAULT NULL COMMENT 'docket or citation of case appealed' ,
  `result` VARCHAR(500) NULL DEFAULT NULL ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(45) NULL ,
  PRIMARY KEY (`uk_case_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation110`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`book` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`book` (
  `book_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NULL DEFAULT NULL ,
  `authors` VARCHAR(45) NULL DEFAULT NULL ,
  `editors` VARCHAR(45) NULL DEFAULT NULL ,
  `verbatim` VARCHAR(45) NULL DEFAULT NULL ,
  `title` VARCHAR(45) NULL DEFAULT NULL ,
  `place` VARCHAR(45) NULL DEFAULT NULL ,
  `noplace` VARCHAR(45) NULL DEFAULT NULL ,
  `publisher` VARCHAR(45) NULL DEFAULT NULL ,
  `nopublisher` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(45) NULL DEFAULT NULL ,
  `noyear` VARCHAR(45) NULL DEFAULT NULL ,
  `volume` VARCHAR(45) NULL DEFAULT NULL ,
  `edition` VARCHAR(45) NULL DEFAULT NULL ,
  `dateconsulted` VARCHAR(45) NULL DEFAULT NULL ,
  `extra` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointPara` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointPage` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointPageCheck` TINYINT(1) NULL DEFAULT NULL ,
  `pinpointParaCheck` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointFoot1` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointFoot2` VARCHAR(45) NULL DEFAULT NULL ,
  `pinpointChapter` VARCHAR(45) NULL DEFAULT NULL ,
  PRIMARY KEY (`book_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation111`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`canada_case`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`canada_case` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`canada_case` (
  `canada_case_id` INT NOT NULL AUTO_INCREMENT ,
  `user_id` INT NOT NULL ,
  `citation_id` INT NOT NULL ,
  `styleofcause` VARCHAR(45) NULL ,
  `parallelcitation` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(45) NULL DEFAULT NULL ,
  `court` VARCHAR(45) NULL DEFAULT NULL ,
  `shortform` VARCHAR(45) NULL DEFAULT NULL ,
  `judge` VARCHAR(45) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteReporter` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteParapageNumber` VARCHAR(45) NULL DEFAULT NULL ,
  `citingStyle` VARCHAR(45) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(45) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(45) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(45) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL DEFAULT NULL COMMENT 'docket or citation of case appealed' ,
  `result` VARCHAR(500) NULL DEFAULT NULL ,
  PRIMARY KEY (`canada_case_id`, `user_id`, `citation_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation12`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `intravires` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
