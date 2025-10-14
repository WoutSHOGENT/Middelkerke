CREATE TABLE `reservations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date NOT NULL,
	`user_id` int unsigned NOT NULL,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `reservations` ADD CONSTRAINT `reservations_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;