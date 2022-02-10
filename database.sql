CREATE DATABASE IF NOT EXISTS `seiheki_test` DEFAULT CHARSET UTF8MB4;

CREATE TABLE IF NOT EXISTS `records`(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `score` INT UNSIGNED NOT NULL,
    `ip` VARCHAR(20),
    `position` VARCHAR(200),
    `real` BOOLEAN NOT NULL DEFAULT 1, /* 是否可信，由用户定义 */
    `hentai` INT UNSIGNED
)ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS `kano_rank` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `system` varchar(255) NOT NULL,
  `area` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `attempts` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;