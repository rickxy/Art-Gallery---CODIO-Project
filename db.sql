CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255),
  `email` varchar(255),
  `created_at` timestamp,
  `country_code` int
);

CREATE TABLE `offer_items` (
  `order_id` int,
  `art_id` int,
  `quantity` int DEFAULT 1
);

CREATE TABLE `orders` (
  `id` int PRIMARY KEY,
  `user_id` int UNIQUE NOT NULL,
  `status` varchar(255),
  `created_at` varchar(255) COMMENT 'When order created'
);

CREATE TABLE `gallery` (
  `id` int PRIMARY KEY,
  `name` varchar(255),
  `merchant_id` int NOT NULL,
  `price` int,
  `status` ENUM ('out_of_stock', 'in_stock', 'running_low'),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `merchants` (
  `id` int,
  `country_code` int,
  `merchant_name` varchar(255),
  `created at` varchar(255),
  `admin_id` int,
  PRIMARY KEY (`id`, `country_code`)
);

CREATE TABLE `merchant_periods` (
  `id` int PRIMARY KEY,
  `merchant_id` int,
  `country_code` int,
  `start_date` datetime,
  `end_date` datetime
);

ALTER TABLE `users` ADD FOREIGN KEY (`country_code`) REFERENCES `countries` (`code`);

ALTER TABLE `merchants` ADD FOREIGN KEY (`country_code`) REFERENCES `countries` (`code`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

ALTER TABLE `order_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `merchants` ADD FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`);

ALTER TABLE `merchant_periods` ADD FOREIGN KEY (`merchant_id`, `country_code`) REFERENCES `merchants` (`id`, `country_code`);

CREATE INDEX `product_status` ON `products` (`merchant_id`, `status`);

CREATE UNIQUE INDEX `products_index_1` ON `products` (`id`);
