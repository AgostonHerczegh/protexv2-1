TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER `insert_stock` AFTER INSERT ON `products` FOR EACH ROW BEGIN\n    INSERT INTO stock (product_id, db) VALUES (NEW.id, 25);\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8_hungarian_ci'
created=1680027306258129
