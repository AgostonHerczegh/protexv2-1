TYPE=TRIGGERS
triggers='CREATE DEFINER=`root`@`localhost` TRIGGER remove_quantity\nAFTER INSERT ON order_items\nFOR EACH ROW\nBEGIN\n    UPDATE stock\n    SET db = db - NEW.quantity\n    WHERE product_id = NEW.product_id;\nEND'
sql_modes=1098907648
definers='root@localhost'
client_cs_names='utf8mb4'
connection_cl_names='utf8mb4_unicode_ci'
db_cl_names='utf8_hungarian_ci'
created=1680047963186603
