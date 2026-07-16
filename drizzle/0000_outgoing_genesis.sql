CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text DEFAULT '' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`cadence` text DEFAULT 'monthly' NOT NULL,
	`seo_title` text DEFAULT '' NOT NULL,
	`seo_description` text DEFAULT '' NOT NULL,
	`keywords` text DEFAULT '' NOT NULL,
	`published_at` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE TABLE `kittens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`sex` text DEFAULT '' NOT NULL,
	`born` text DEFAULT '' NOT NULL,
	`standard` text DEFAULT '' NOT NULL,
	`tica` text DEFAULT 'Registered' NOT NULL,
	`show_quality` text DEFAULT '' NOT NULL,
	`availability` text DEFAULT '' NOT NULL,
	`mother` text DEFAULT '' NOT NULL,
	`breed` text DEFAULT 'Minuet' NOT NULL,
	`price` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'available' NOT NULL,
	`image_url` text DEFAULT '/hero-cattery.png' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
