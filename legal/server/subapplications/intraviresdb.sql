SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `intravires` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `intravires` ;

-- -----------------------------------------------------
-- Table `intravires`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`users` (
  `user_id` INT NULL DEFAULT 1,
  `email` VARCHAR(50) NULL,
  `create_date` DATETIME NULL,
  `active` TINYINT(1) NULL,
  `salt` CHAR(64) NULL,
  `hash` BLOB NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`pincite`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`pincite` (
  `idpincite` INT NOT NULL,
  `select` VARCHAR(45) NULL COMMENT 'pinpoint to paragraph\npinpoint to page\ncite to\n',
  `parapage_number` VARCHAR(5) NULL COMMENT 'page or paragraph number\nno more than 5 digits',
  `reporter` VARCHAR(45) NULL COMMENT '1 or two',
  PRIMARY KEY (`idpincite`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`citation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`citation` (
  `idcitation` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `comments` VARCHAR(45) NULL,
  `date_created` DATETIME NULL,
  `date_modified` TIMESTAMP NULL,
  `citationcol` VARCHAR(45) NULL,
  `finished` TINYINT(1) NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`idcitation`, `user_user_id`),
  INDEX `fk_citation_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_citation_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `intravires`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`canadian_case`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`canadian_case` (
  `idcanadian_case` INT NOT NULL,
  `pincite_idpincite` INT NOT NULL,
  `styleofcause` VARCHAR(45) NULL,
  `parallelcitation` VARCHAR(45) NULL,
  `year` VARCHAR(45) NULL,
  `court` VARCHAR(45) NULL,
  `shortform` VARCHAR(45) NULL,
  `judge` VARCHAR(45) NULL,
  `judge_descending` TINYINT(1) NULL,
  `canadian_casecol` VARCHAR(45) NULL,
  `citing_styleofcause` VARCHAR(45) NULL,
  `citing_parallelcitations` VARCHAR(45) NULL,
  `citing_year` VARCHAR(45) NULL,
  `citing_court` VARCHAR(45) NULL,
  `leavetoappeal_status` VARCHAR(45) NULL,
  `leavetoappeal_court` VARCHAR(45) NULL COMMENT 'Court= court appealed to',
  `leavetoappeal_docket` VARCHAR(45) NULL COMMENT 'docket or citation of case appealed',
  `result` VARCHAR(500) NULL,
  `citation_idcitation` INT NOT NULL,
  `citation_user_user_id` INT NOT NULL,
  PRIMARY KEY (`idcanadian_case`, `pincite_idpincite`, `citation_idcitation`, `citation_user_user_id`),
  INDEX `fk_canadian_case_pincite_idx` (`pincite_idpincite` ASC),
  INDEX `fk_canadian_case_citation1_idx` (`citation_idcitation` ASC, `citation_user_user_id` ASC),
  CONSTRAINT `fk_canadian_case_pincite`
    FOREIGN KEY (`pincite_idpincite`)
    REFERENCES `intravires`.`pincite` (`idpincite`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_canadian_case_citation1`
    FOREIGN KEY (`citation_idcitation` , `citation_user_user_id`)
    REFERENCES `intravires`.`citation` (`idcitation` , `user_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`history` (
  `idhistory` INT NOT NULL,
  `status_1` VARCHAR(45) NULL,
  `parallelcitations_1` VARCHAR(45) NULL,
  `year_1` VARCHAR(45) NULL,
  `court_1` VARCHAR(45) NULL,
  `status_2` VARCHAR(45) NULL,
  `parallelcitations_2` VARCHAR(45) NULL,
  `year_2` VARCHAR(45) NULL,
  `court_2` VARCHAR(45) NULL,
  `status_3` VARCHAR(45) NULL,
  `parallelcitations_3` VARCHAR(45) NULL,
  `year_3` VARCHAR(45) NULL,
  `court_3` VARCHAR(45) NULL,
  `canadian_case_idcanadian_case` INT NOT NULL,
  `canadian_case_pincite_idpincite` INT NOT NULL,
  `canadian_case_citation_idcitation` INT NOT NULL,
  `canadian_case_citation_user_user_id` INT NOT NULL,
  PRIMARY KEY (`idhistory`, `canadian_case_idcanadian_case`, `canadian_case_pincite_idpincite`, `canadian_case_citation_idcitation`, `canadian_case_citation_user_user_id`),
  INDEX `fk_history_canadian_case1_idx` (`canadian_case_idcanadian_case` ASC, `canadian_case_pincite_idpincite` ASC, `canadian_case_citation_idcitation` ASC, `canadian_case_citation_user_user_id` ASC),
  CONSTRAINT `fk_history_canadian_case1`
    FOREIGN KEY (`canadian_case_idcanadian_case` , `canadian_case_pincite_idpincite` , `canadian_case_citation_idcitation` , `canadian_case_citation_user_user_id`)
    REFERENCES `intravires`.`canadian_case` (`idcanadian_case` , `pincite_idpincite` , `citation_idcitation` , `citation_user_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`tag` (
  `idtags` INT NOT NULL,
  `category` VARCHAR(45) NULL,
  `citation_idcitation` INT NOT NULL,
  `citation_user_user_id` INT NOT NULL,
  PRIMARY KEY (`idtags`),
  INDEX `fk_tag_citation1_idx` (`citation_idcitation` ASC, `citation_user_user_id` ASC),
  CONSTRAINT `fk_tag_citation1`
    FOREIGN KEY (`citation_idcitation` , `citation_user_user_id`)
    REFERENCES `intravires`.`citation` (`idcitation` , `user_user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`subscription`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`subscription` (
  `idpayment` INT NOT NULL,
  `subscriptiontype` VARCHAR(45) NULL,
  `renew` TINYINT(1) NULL,
  `date_start` VARCHAR(45) NULL,
  `date_end` VARCHAR(45) NULL,
  `duration` TIMESTAMP NULL,
  `amount` VARCHAR(45) NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`idpayment`, `user_user_id`),
  INDEX `fk_subscription_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_subscription_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `intravires`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`payment` (
  `idpayment` INT NOT NULL,
  `status_ok` TINYINT(1) NULL COMMENT 'credit card ok?',
  `credit_card_no` INT NULL,
  `credit_card_type` VARCHAR(45) NULL,
  `date_exp` VARCHAR(45) NULL,
  `paymentcol` VARCHAR(45) NULL,
  `csv` SMALLINT NULL,
  `name` VARCHAR(45) NULL,
  `user_user_id` INT NOT NULL,
  PRIMARY KEY (`idpayment`, `user_user_id`),
  INDEX `fk_payment_user1_idx` (`user_user_id` ASC),
  CONSTRAINT `fk_payment_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `intravires`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `intravires`.`citation_statistics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `intravires`.`citation_statistics` (
  `idcitation_statistics` INT NOT NULL,
  PRIMARY KEY (`idcitation_statistics`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- ------------------------------------------------------
-- Table 'intravires'.'sessions'
-- ------------------------------------------------------

create table `intravires`.`sessions` (
    `session_id` char(128) UNIQUE NOT NULL,
    `atime` timestamp NOT NULL default current_timestamp,
    `data` text
);

