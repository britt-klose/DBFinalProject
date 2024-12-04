set SQL_SAFE_UPDATES=0;
set FOREIGN_KEY_CHECKS=0;
set SQL_MODE = 'NO_ZERO_DATE';
use cafe;
/* *********************************************************************************************
The final_project rental database model consists of several tables including information about customer orders,
customer information, food items, cafe locations, customer reward history, and cafe events

	-- customers_10(customer_id, first_name, last_name, phone, email, password)
				------------
	-- events(event_id, name, date, time)
			  --------
	-- items(item_id, name, price, calories, category, description)
			 -------
	-- locations(location_id, address, town_city, state, zipcode)
			   ------------
	-- occuring(location_id, event_id)
    
	-- order(order_id, customer_id, item_id, location_id)
	
    	-- reserve(reservation_id, customer_id, event_id, spots_left)
			   --------------
	-- rewards(customer_id, visits_til_reward)
**************************************************************** */
-- =========
-- CUSTOMERS
-- =========
--  altered customers to modify phone and password datatype to varchar and create primary key as customer_id
alter table customers_10
modify phone varchar(50),
modify password varchar(50),
add constraint PK_constraint primary key(customer_id);

drop table customers_10; 

create table if not exists customers(
customer_id int primary key,
username varchar(100) not null,
email varchar(100) not null,
password varchar(100) not null, 
phone varchar(100) not null,
birthdate date
);

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

Drop table items;

create table if not exists items(
item_id int primary key,
name varchar(100) not null,
price double not null,
calories int not null,
category varchar(100) not null,
description varchar(250) not null,
url varchar(300) not null, 

constraint CHK_category check(category in ('soup', 'sandwich', 'salad', 'bakery', 'hot_drink', 'cold_drink')),
constraint CHK_price check(price >= 0),
constraint CHK_calories check(calories >= 0)
);



-- =========
-- LOCATIONS
-- =========
-- altered locations to modify zipcode to datatype varchar due to postal codes sometimes using '-', create primary key as location_id and 
-- add constraint on location_id to be between 1 and 5.
alter table locations
modify zipcode varchar(50),
add constraint PK_constraint primary key(location_id),
add constraint CHK_location_id check(location_id between 1 and 5);


-- =========
-- OCCURRING
-- =========
-- altered occuring to modify foreign keys location_id and event_id and 
-- add constraint on location_id to be between 1 and 5.
alter table occurring
add foreign key(location_id) references locations(location_id) on delete cascade,
add foreign key(event_id) references events(event_id) on delete cascade;


-- =====
-- ORDER
-- =====
-- altered order to create primary key as order_id and foreign key user_id and item_id
-- table order error order does not exist
alter table `order`
add constraint PK_constraint primary key(order_id),
add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
add foreign key(item_id) references items(item_id) on delete cascade,
add foreign key(location_id) reference locations(location_id) on delete cascade;


-- =======
-- RESERVE
-- =======
-- altered occurring to modify foreign keys customer_id and event_id and add constraint on spots_left between 0 and 100
alter table reserve
add constraint PK_constraint primary key(reservation_id),
add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
add foreign key(event_id) references events(event_id) on delete cascade,
add constraint CHK_spots_left check(spots_left between 0 and 100);


-- =======
-- REWARDS
-- =======
-- altered rewards to create foreign key customer_id and add constraint on visits_til_reward between 0 and 5
alter table rewards
add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
add constraint CHK_visits_til_reward check(visits_til_reward between 0 and 5);



-- set SQL_SAFE_UPDATES=0;
-- set FOREIGN_KEY_CHECKS=0;
-- set SQL_MODE = 'NO_ZERO_DATE';

-- /* *********************************************************************************************
-- The final_project rental database model consists of several tables including information about customer orders,
-- customer information, food items, cafe locations, customer reward history, and cafe events

-- 	-- customers_10(customer_id, first_name, last_name, phone, email, password)
-- 				------------
-- 	-- events(event_id, name, date, time)
-- --------
-- 	-- items(item_id, name, price, calories, category, description)
-- 		-------
-- 	-- locations(location_id, address, town_city, state, zipcode)
-- 			------------
-- 	-- occuring(location_id, event_id)
    
-- 	-- order(order_id, customer_id, item_id, location_id)
	
--     -- reserve(reservation_id, customer_id, event_id, spots_left)
-- 			--------------
-- 	-- rewards(customer_id, visits_til_reward)
-- **************************************************************** */
-- -- =========
-- -- CUSTOMERS
-- -- =========
-- --  altered customers to modify phone and password datatype to varchar and create primary key as customer_id
-- alter table customers_10
-- modify phone varchar(50),
-- modify password varchar(50),
-- add constraint PK_constraint primary key(customer_id);


-- -- ======
-- -- EVENTS
-- -- ======
-- -- altered events to modify date_time to datatype datetime and create primary key as event_id
-- alter table events
-- modify date_time datetime,
-- add constraint PK_constraint primary key(event_id);


-- -- =====
-- -- ITEMS
-- -- =====
-- -- altered items to create primary key as item_id and added constraints on  price (price >= 0), calories (calories >= 0) and
-- -- category (cateogory can only be one of the listed categories)
-- alter table items
-- add constraint PK_constraint primary key(item_id),
-- add constraint CHK_price check(price >= 0),
-- add constraint CHK_calories check(calories >= 0),
-- add constraint CHK_category check(category in ('soup', 'sandwich', 'salad', 'bakery', 'hot_drink', 'cold_drink'));


-- -- =========
-- -- LOCATIONS
-- -- =========
-- -- altered locations to modify zipcode to datatype varchar due to postal codes sometimes using '-', create primary key as location_id and 
-- -- add constraint on location_id to be between 1 and 5.
-- alter table locations
-- modify zipcode varchar(50),
-- add constraint PK_constraint primary key(location_id),
-- add constraint CHK_location_id check(location_id between 1 and 5);


-- -- =========
-- -- OCCURRING
-- -- =========
-- -- altered occuring to modify foreign keys location_id and event_id and 
-- -- add constraint on location_id to be between 1 and 5.
-- alter table occurring
-- add foreign key(location_id) references locations(location_id) on delete cascade,
-- add foreign key(event_id) references events(event_id) on delete cascade;


-- -- =====
-- -- ORDER
-- -- =====
-- -- altered order to create primary key as order_id and foreign key user_id and item_id
-- -- table order error order does not exist
-- alter table `order`
-- add constraint PK_constraint primary key(order_id),
-- add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
-- add foreign key(item_id) references items(item_id) on delete cascade,
-- add foreign key(location_id) reference locations(location_id) on delete cascade;


-- -- =======
-- -- RESERVE
-- -- =======
-- -- altered occurring to modify foreign keys customer_id and event_id and add constraint on spots_left between 0 and 100
-- alter table reserve
-- add constraint PK_constraint primary key(reservation_id),
-- add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
-- add foreign key(event_id) references events(event_id) on delete cascade,
-- add constraint CHK_spots_left check(spots_left between 0 and 100);


-- -- =======
-- -- REWARDS
-- -- =======
-- -- altered rewards to create foreign key customer_id and add constraint on visits_til_reward between 0 and 5
-- alter table rewards
-- add foreign key(customer_id) references customers_10(customer_id) on delete cascade,
-- add constraint CHK_visits_til_reward check(visits_til_reward between 0 and 5);
