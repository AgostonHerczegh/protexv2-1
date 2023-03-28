-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2023 at 04:38 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `protexv2`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  `region` varchar(255) NOT NULL,
  `postal` varchar(20) NOT NULL,
  `tel` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`id`, `user_id`, `address_name`, `city`, `address`, `country_id`, `region`, `postal`, `tel`) VALUES
(1, 14, 'rgererfgd', 'gfgergerg', 'fgdg', 1, 'ergerger', 'rgre43', 'dfgfgdf'),
(2, 14, 'sdadada', 'ad', 'fgdgasdsad', 44, 'ergerger', 'rgre43', '2321432423');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'Albania'),
(2, 'Andorra'),
(3, 'Austria'),
(4, 'Belarus'),
(5, 'Belgium'),
(6, 'Bosnia and Herzegovina'),
(7, 'Bulgaria'),
(8, 'Croatia'),
(9, 'Cyprus'),
(10, 'Czech Republic'),
(11, 'Denmark'),
(12, 'Estonia'),
(13, 'Finland'),
(14, 'France'),
(15, 'Germany'),
(16, 'Greece'),
(17, 'Magyarország'),
(18, 'Iceland'),
(19, 'Ireland'),
(20, 'Italy'),
(21, 'Kosovo'),
(22, 'Latvia'),
(23, 'Liechtenstein'),
(24, 'Lithuania'),
(25, 'Luxembourg'),
(26, 'Malta'),
(27, 'Moldova'),
(28, 'Monaco'),
(29, 'Montenegro'),
(30, 'Netherlands'),
(31, 'North Macedonia'),
(32, 'Norway'),
(33, 'Poland'),
(34, 'Portugal'),
(35, 'Romania'),
(36, 'Russia'),
(37, 'San Marino'),
(38, 'Serbia'),
(39, 'Slovakia'),
(40, 'Slovenia'),
(41, 'Spain'),
(42, 'Sweden'),
(43, 'Switzerland'),
(44, 'Ukraine'),
(45, 'United Kingdom'),
(46, 'Vatican City');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `order_time` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `price` int(11) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `product_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `img_url`, `category`, `product_url`) VALUES
(1, 'Compact Whey Protein fehérjepor', 'Finom, könnyen oldódó és intenzív ízvilágú tejsavó fehérje komplex, Digezyme® emésztőenzimmel.', 6490, 'compact-1000.webp', 1, 'CompactWheyProtein1000'),
(2, 'Vegan Protein ízesített növényi fehérje italpor', 'Fantasztikusan finom és krémes, gyorsan oldódó Vegán borsó, rizs és tökfehérje mátrix 19 gramm fehérjetartalommal adagonként, hozzáadott cukor nélkül, két féle ízben.', 3990, 'Pure-Gold-Vegan-Protein-izesitett-novenyi-feherje-italpor-banan.webp', 1, 'VeganProteinBanan'),
(3, 'Pure Gold Magic Vegan fehérjepor', 'Gyorsan oldódó, minden eddiginél krémesebb Pure Gold Vegán, borsó-, barnarizs-, mandula- és organikus sütőtök fehérje.', 5990, 'magic-vegan_3d.webp', 1, 'PureGoldMagicVegan'),
(4, '100% WHEY PROTEIN FEHÉRJE 4X1 KG (4 KG)', 'Alkottunk Nektek egy olyan krémes fehérje komplexet, amiben tejsavófehérje koncentrátum van, ami biztosítja az aminosavak teljes spektrumát izmaidnak, nem mellesleg 4 finom ízben is kipróbálhatjátok.\r\n\r\n Ha a napi fehérjebeviteled kiegészítésre szorul, akkor a Builder 100% Whey egy kiváló megoldás lehet számodra, hiszen a finom ízek mellett egy adaggal 20 gramm minőségi fehérjét is nyerünk.', 26990, '16153_fff6a0777aba.webp', 1, '100whey4kg'),
(25, 'BioCell Collagen® II-es típusú hidrolizált kollagén - NOW Foods', 'A BioCell Collagen® II-es típusú hidrolizált kollagén egyedülálló komplexe támogatja a csont- és izomrendszert és a bőr egészségét. Jól felszívódó, hidrolizált kollagént és kondroitin-szulfátot tartalmaz, ami hozzájárul a porcok és a kötőszövet egészségének fenntartásához. A termékben hialuronsav is található a fiatalos és rugalmas bőr megőrzésére. A készítmény remek választás mindenkinek, aki problémamentes mozgásra vágyik, és tenni akar a jó megjelenésért.', 12690, '3008_mainimage_2.webp', 2, 'biocell-collagenr-ii-es-tipusu-hidrolizalt-kollagen-now-foods'),
(26, 'Colla Pink - BeastPink', 'A Colla Pink egy szépségital minden nő számára, aki szeretne megfelelő gondot fordítani a megjelenésére, a mozgásszervi rendszerére és az általános szépségére. Ennek a komplex tápálékkiegészítőnek a fő összetevői a kollagén peptidek, amelyeket hialuronsav, szőlőmagkivonat, valamint válogatott vitaminok és ásványi anyagok kombinációja egészít ki. Ébreszd fel a szépségedet és nőies önbizalmadat ennek a finom italnak köszönhetően.', 5690, 'colla_pink_jahoda.webp', 2, 'colla-pink-beastpink');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `idcategory` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`idcategory`, `category_name`) VALUES
(1, 'feherje'),
(2, 'kollagen'),
(3, 'amino'),
(4, 'kreatin'),
(5, 'vitamin'),
(6, 'testsulymgt'),
(7, 'edzeselotti'),
(8, 'tomegnovelo'),
(9, 'etelsnack'),
(10, 'tesztoszteron'),
(11, 'probacsomag'),
(12, 'ruha'),
(13, 'osszes');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `product_id` int(11) NOT NULL,
  `db` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`product_id`, `db`) VALUES
(1, 26),
(2, 31),
(3, 0),
(4, 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('USER','ADMIN') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `user_type`) VALUES
(14, 'kutya', 'kutya@kutya.com', '$2a$10$urBEtBeYcp3NyiBE58DRYOUZbesj61DAaAQ1ESOqy0UK8K25DHH2i', 'ADMIN'),
(15, 'user', 'user@gmail.com', '$2a$10$YUkc5BU2iKvXwMUODCZRf.da.vBrmYbJ3sx8sWgsKvzDQOQCgDrTa', 'USER'),
(16, 'teszt', 'teszt@teszt.com', '$2a$10$VIOcS.C4GhhjlwJHOXJfM.9wqkcGK4HWzfVLk0BvsvZWNzpfhGh.e', 'USER'),
(17, 'admin', 'admin@admin.com', '$2a$10$AOtIrNpLNcFvvIrWWhIZhO9Fdq5EEJGd0g.dxS5gMefDMCgYvLZR2', 'ADMIN');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `country_id` (`country_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`idcategory`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `idcategory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `fk_address_country` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `fk_address_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `product_categories` (`idcategory`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
