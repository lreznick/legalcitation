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
  `user_statistics_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `number_of_logins` INT NULL ,
  PRIMARY KEY (`user_statistics_id`, `user_id`) ,
  INDEX `fk_user_statistics_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_statistics_users1`
    FOREIGN KEY (`user_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `age` VARCHAR(45) NULL ,
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
  `title` BLOB NULL DEFAULT NULL ,
  `comments` BLOB NULL DEFAULT NULL ,
  `citation` BLOB NULL DEFAULT NULL ,
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
  PRIMARY KEY (`tag_id`) )
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
-- Table `intravires`.`journal_article`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`journal_article` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`journal_article` (
  `journal_article_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `authors` VARCHAR(250) NULL DEFAULT NULL ,
  `title` VARCHAR(250) NULL DEFAULT NULL ,
  `citation` VARCHAR(250) NULL DEFAULT NULL ,
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
  `styleofcause` VARCHAR(250) NULL ,
  `parallelcitation` VARCHAR(250) NULL DEFAULT NULL ,
  `year` VARCHAR(25) NULL DEFAULT NULL ,
  `court` VARCHAR(100) NULL DEFAULT NULL ,
  `shortform` VARCHAR(100) NULL DEFAULT NULL ,
  `judge` VARCHAR(100) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteReporter` VARCHAR(100) NULL DEFAULT NULL ,
  `pinciteParapageNumber` VARCHAR(25) NULL DEFAULT NULL ,
  `citingStyle` VARCHAR(250) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(250) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(25) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(100) NULL DEFAULT NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL DEFAULT NULL COMMENT 'docket or citation of case appealed' ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(250) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(25) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(100) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(250) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(25) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(25) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(250) NULL ,
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
  `authors` VARCHAR(250) NULL DEFAULT NULL ,
  `editors` VARCHAR(100) NULL DEFAULT NULL ,
  `verbatim` VARCHAR(100) NULL DEFAULT NULL ,
  `title` VARCHAR(100) NULL DEFAULT NULL ,
  `place` VARCHAR(100) NULL DEFAULT NULL ,
  `noplace` VARCHAR(45) NULL DEFAULT NULL ,
  `publisher` VARCHAR(100) NULL DEFAULT NULL ,
  `nopublisher` VARCHAR(45) NULL DEFAULT NULL ,
  `year` VARCHAR(25) NULL DEFAULT NULL ,
  `noyear` VARCHAR(45) NULL DEFAULT NULL ,
  `volume` VARCHAR(25) NULL DEFAULT NULL ,
  `edition` VARCHAR(25) NULL DEFAULT NULL ,
  `dateconsulted` VARCHAR(45) NULL DEFAULT NULL ,
  `extra` VARCHAR(100) NULL DEFAULT NULL ,
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
-- Table `intravires`.`dictionary`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`dictionary` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`dictionary` (
  `dictionary_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `title` VARCHAR(250) NULL DEFAULT NULL ,
  `edition` VARCHAR(45) NULL ,
  `word` VARCHAR(45) NULL ,
  PRIMARY KEY (`dictionary_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation112`
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
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `styleofcause` VARCHAR(250) NULL ,
  `parallelcitation` VARCHAR(250) NULL DEFAULT NULL ,
  `year` VARCHAR(25) NULL DEFAULT NULL ,
  `court` VARCHAR(100) NULL DEFAULT NULL ,
  `shortform` VARCHAR(100) NULL DEFAULT NULL ,
  `judge` VARCHAR(100) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `pinciteReporter` VARCHAR(100) NULL DEFAULT NULL ,
  `pinciteParapageNumber` VARCHAR(25) NULL DEFAULT NULL ,
  `citingStyle` VARCHAR(250) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(250) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(25) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(100) NULL DEFAULT NULL ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(250) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(25) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(100) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(250) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(25) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(25) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(250) NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL DEFAULT NULL COMMENT 'docket or citation of case appealed' ,
  PRIMARY KEY (`canada_case_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation1100`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`us_case`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`us_case` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`us_case` (
  `us_case_id` INT NOT NULL AUTO_INCREMENT ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `styleofcause` VARCHAR(250) NULL ,
  `parallelcitation` VARCHAR(250) NULL DEFAULT NULL ,
  `year` VARCHAR(25) NULL ,
  `court` VARCHAR(100) NULL DEFAULT NULL ,
  `shortform` VARCHAR(100) NULL DEFAULT NULL ,
  `judge` VARCHAR(100) NULL DEFAULT NULL ,
  `judgeDissenting` TINYINT(1) NULL DEFAULT NULL ,
  `pinciteInput` VARCHAR(45) NULL ,
  `citingStyle` VARCHAR(250) NULL DEFAULT NULL ,
  `citingParallel` VARCHAR(250) NULL DEFAULT NULL ,
  `citingYear` VARCHAR(25) NULL DEFAULT NULL ,
  `citingCourt` VARCHAR(100) NULL DEFAULT NULL ,
  `historyaff1` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel1` VARCHAR(250) NULL DEFAULT NULL ,
  `historyYear1` VARCHAR(25) NULL DEFAULT NULL ,
  `historyCourt1` VARCHAR(100) NULL DEFAULT NULL ,
  `historyaff2` VARCHAR(45) NULL DEFAULT NULL ,
  `historyParallel2` VARCHAR(250) NULL DEFAULT NULL ,
  `historyCourt2` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear2` VARCHAR(25) NULL DEFAULT NULL ,
  `historyaff3` VARCHAR(45) NULL DEFAULT NULL ,
  `historyCourt3` VARCHAR(100) NULL DEFAULT NULL ,
  `historyYear3` VARCHAR(25) NULL DEFAULT NULL ,
  `historyParallel3` VARCHAR(250) NULL ,
  `leaveSelection` VARCHAR(45) NULL DEFAULT NULL ,
  `leaveCourt` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Court= court appealed to' ,
  `leaveDocket` VARCHAR(45) NULL DEFAULT NULL COMMENT 'docket or citation of case appealed' ,
  PRIMARY KEY (`us_case_id`, `citation_id`, `user_id`) ,
  INDEX `fk_canadian_case_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  CONSTRAINT `fk_canadian_case_citation11000`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`citation_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`citation_categories` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`citation_categories` (
  `citation_category_id` INT NOT NULL ,
  `category_name` VARCHAR(50) NULL ,
  PRIMARY KEY (`citation_category_id`) ,
  CONSTRAINT `fk_citation_categories_users1`
    FOREIGN KEY (`citation_category_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`tag_has_citation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`tag_has_citation` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`tag_has_citation` (
  `tag_id` INT NOT NULL ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`tag_id`, `citation_id`, `user_id`) ,
  INDEX `fk_tag_has_citation_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  INDEX `fk_tag_has_citation_tag1_idx` (`tag_id` ASC) ,
  CONSTRAINT `fk_tag_has_citation_tag1`
    FOREIGN KEY (`tag_id` )
    REFERENCES `intravires`.`tag` (`tag_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tag_has_citation_citation1`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`citation_categories_has_citation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`citation_categories_has_citation` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`citation_categories_has_citation` (
  `citation_category_id` INT NOT NULL ,
  `citation_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  PRIMARY KEY (`citation_category_id`, `citation_id`, `user_id`) ,
  INDEX `fk_citation_categories_has_citation_citation1_idx` (`citation_id` ASC, `user_id` ASC) ,
  INDEX `fk_citation_categories_has_citation_citation_categories1_idx` (`citation_category_id` ASC) ,
  CONSTRAINT `fk_citation_categories_has_citation_citation_categories1`
    FOREIGN KEY (`citation_category_id` )
    REFERENCES `intravires`.`citation_categories` (`citation_category_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_citation_categories_has_citation_citation1`
    FOREIGN KEY (`citation_id` , `user_id` )
    REFERENCES `intravires`.`citation` (`citation_id` , `user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`reset_password`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`reset_password` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`reset_password` (
  `user_id` INT NOT NULL ,
  `email_salt` BLOB NULL ,
  `email_hash` BLOB NULL ,
  PRIMARY KEY (`user_id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`user_statistics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`user_statistics` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`user_statistics` (
  `user_statistics_id` INT NOT NULL ,
  `user_id` INT NOT NULL ,
  `number_of_logins` INT NULL ,
  PRIMARY KEY (`user_statistics_id`, `user_id`) ,
  INDEX `fk_user_statistics_users1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_user_statistics_users1`
    FOREIGN KEY (`user_id` )
    REFERENCES `intravires`.`users` (`user_id` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`user_session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `intravires`.`user_session` ;

CREATE  TABLE IF NOT EXISTS `intravires`.`user_session` (
  `user_id` INT NOT NULL ,
  `session_id` CHAR(128) NOT NULL ,
  PRIMARY KEY (`user_id`, `session_id`) )
ENGINE = InnoDB;

USE `intravires` ;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
