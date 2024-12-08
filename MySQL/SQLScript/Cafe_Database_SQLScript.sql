set FOREIGN_KEY_CHECKS=0;
set SQL_MODE = 'NO_ZERO_DATE';

/* *********************************************************************************************
The final_project rental database model consists of several tables including information about customer orders,
customer information, food items, cafe locations, and cafe events

	-- cart (cart_id, customer_id, item_id, item_name, item_price, quanitity, total_price)
			---------
    -- customers(customer_id, username, email, password, phone, birthdate)
				------------
	-- event_registration(fname, lname, location, event_name)
			
    -- events(event_id, name, date_time)
			  --------
	-- items(item_id, name, price, calories, category, description, url)
			 -------
	-- locations(location_id, location_add, town_city, state, zipcode, image_url)
			   -----------
	-- order(order_id, customer_id, item_id, location_id)
			---------
	-- rewards(customer_id, visits_til_reward)
    
**************************************************************** */

-- ====
-- CART
-- ====
-- altered cart to create primary key as cart_id and add foreing keys customer_id and item_id
alter table cart
add constraint PK_constraint primary key(cart_id),
add foreign key(customer_id) references customers(customer_id) on delete cascade,
add foreign key(item_id) references items(item_id) on delete cascade;

-- =========
-- CUSTOMERS
-- =========
--  altered customers to modify phone and password datatype to varchar and create primary key as customer_id
alter table customers
modify phone varchar(50),
modify password varchar(50),
add constraint PK_constraint primary key(customer_id);


-- ==================
-- EVENT_REGISTRATION	
-- ==================
-- altered event registaion to add foreign key event_name
alter table event_registration
add foreign key(event_name) references event_registration(event_name) on delete cascade;

-- ======
-- EVENTS
-- ======
-- altered events to modify date_time to datatype datetime and create primary key as event_id
alter table events
modify date_time datetime,
add constraint PK_constraint primary key(event_id);


-- =====
-- ITEMS
-- =====
-- altered items to create primary key as item_id and added constraints on  price (price >= 0), calories (calories >= 0) and
-- category (cateogory can only be one of the listed categories)
alter table items
add constraint PK_constraint primary key(item_id),
add constraint CHK_price check(price >= 0),
add constraint CHK_calories check(calories >= 0),
add constraint CHK_category check(category in ('soup', 'sandwich', 'salad', 'bakery', 'hot_drink', 'cold_drink'));


-- =========
-- LOCATIONS
-- =========
-- altered locations to modify zipcode to datatype varchar due to postal codes sometimes using '-', create primary key as location_id and 
-- add constraint on location_id to be between 1 and 5.
alter table locations
modify zipcode varchar(50),
add constraint PK_constraint primary key(location_id),
add constraint CHK_location_id check(location_id between 1 and 5);


-- =====
-- ORDER
-- =====
-- altered order to create primary key as order_id and foreign key user_id and item_id
-- table order error order does not exist
alter table `order`
add constraint PK_constraint primary key(order_id),
add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
add foreign key(item_id) references items(item_id) on delete cascade,
add foreign key(location_id) references locations(location_id) on delete cascade;


-- =======
-- REWARDS
-- =======
-- altered rewards to create foreign key customer_id and add constraint on visits_til_reward between 0 and 5
alter table rewards
add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
add constraint CHK_visits_til_reward check(visits_til_reward between 0 and 5);
