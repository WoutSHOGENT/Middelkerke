CREATE TABLE `users` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_user_email_unique` UNIQUE(`email`)
);
