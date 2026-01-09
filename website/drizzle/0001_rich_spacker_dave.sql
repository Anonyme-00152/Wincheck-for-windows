CREATE TABLE `alert_configs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`alertType` varchar(50) NOT NULL,
	`enabled` int NOT NULL DEFAULT 1,
	`threshold` int,
	`emailNotification` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `alert_configs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alert_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`alertType` varchar(50) NOT NULL,
	`message` text NOT NULL,
	`severity` enum('info','warning','critical') NOT NULL DEFAULT 'info',
	`emailSent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alert_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hardware_info` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`cpuModel` varchar(255),
	`cpuCores` int,
	`cpuThreads` int,
	`cpuFrequency` varchar(100),
	`gpuModel` varchar(255),
	`ramCapacity` int,
	`ramType` varchar(100),
	`ramSpeed` varchar(100),
	`storageTotal` int,
	`osVersion` varchar(255),
	`osArchitecture` varchar(50),
	`motherboard` varchar(255),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hardware_info_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `optimization_reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`recommendations` text,
	`estimatedGain` int,
	`applied` int NOT NULL DEFAULT 0,
	`appliedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `optimization_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `process_monitoring` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`processName` varchar(255) NOT NULL,
	`processId` int NOT NULL,
	`cpuUsage` int NOT NULL,
	`memoryUsage` int NOT NULL,
	`status` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `process_monitoring_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `scan_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`scanType` varchar(50) NOT NULL,
	`status` enum('pending','running','completed','failed') NOT NULL DEFAULT 'pending',
	`issuesFound` int NOT NULL DEFAULT 0,
	`spaceRecoverable` int DEFAULT 0,
	`details` text,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `scan_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`cpuUsage` int NOT NULL,
	`ramUsage` int NOT NULL,
	`ramTotal` int NOT NULL,
	`diskUsage` int NOT NULL,
	`diskFree` int NOT NULL,
	`networkDown` int NOT NULL,
	`networkUp` int NOT NULL,
	`temperature` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `system_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `alert_configs` ADD CONSTRAINT `alert_configs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `alert_history` ADD CONSTRAINT `alert_history_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `hardware_info` ADD CONSTRAINT `hardware_info_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `optimization_reports` ADD CONSTRAINT `optimization_reports_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `process_monitoring` ADD CONSTRAINT `process_monitoring_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `scan_results` ADD CONSTRAINT `scan_results_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_metrics` ADD CONSTRAINT `system_metrics_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;