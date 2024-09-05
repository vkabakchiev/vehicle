-- Database: testDB

--DROP DATABASE IF EXISTS "testDB";

CREATE DATABASE "vehicleDB"
WITH
OWNER = postgres
ENCODING = 'UTF8'
LC_COLLATE = 'en_US.UTF-8'
LC_CTYPE = 'en_US.UTF-8'
TABLESPACE = pg_default
CONNECTION LIMIT = -1
IS_TEMPLATE = False;

/*
DROP TABLE IF EXISTS vehicle;
 CREATE TABLE vehicle (
    vehicle_id SERIAL PRIMARY KEY,
    carmark_id INTEGER,
    carmodel_id INTEGER,
    transport_id INTEGER,
    regno VARCHAR(8),
    win VARCHAR(25),
    motor_no VARCHAR(25),
    reg_year INTEGER,
    modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    city VARCHAR(100),
    axes_number INTEGER,
    fuel VARCHAR(50),
    motor_capacity INTEGER,
    power_kw real,
    power_hp real,
    max_mass_camp real,
    bruto_ton real,
    EURO_CAT VARCHAR(20),
    user_date DATE,
    user_id INTEGER,
    max_posible_mass real,
    isactive BOOLEAN
);
*/
DROP TABLE IF EXISTS vehicle;
CREATE TABLE vehicle (
    vehicle_id SERIAL PRIMARY KEY,
    carmark VARCHAR(255),
    carmodel VARCHAR(255),
    regno VARCHAR(8),
    win VARCHAR(25),
    motor_no VARCHAR(50),
    reg_year INTEGER,
    city VARCHAR(255),
    axes_number INTEGER,
    fuel VARCHAR(50),
    motor_capacity INTEGER,
    power_kw INTEGER,
    power_hp INTEGER,
    max_mass_camp INTEGER,
    bruto_ton INTEGER,
    EURO_CAT VARCHAR(50),
    max_posible_mass INTEGER,
    isactive BOOLEAN
);






DROP TABLE IF EXISTS transport;
CREATE TABLE transport (
    transport_id SERIAL PRIMARY KEY,
    transport_name VARCHAR (50),
    isactive BOOLEAN
);
/*
DROP TABLE IF EXISTS carmark;
CREATE TABLE carmark (
    carmark_id SERIAL PRIMARY KEY,
    markname VARCHAR (50),
    transport_id INTEGER
);

DROP TABLE IF EXISTS  carmodel;
CREATE TABLE carmodel (
    carmodel_id SERIAL PRIMARY KEY,
    carmark_id INTEGER,
    carmodelcode INTEGER,
    carmodelname VARCHAR,
    isactive BOOLEAN
);
*/
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    createdt_ad DATE,
    modified DATE,
    isactive BOOLEAN,
    admin BOOLEAN DEFAULT FALSE

);

DROP TABLE IF EXISTS items;
 CREATE TABLE items(
   items_id INTEGER,
    user_id INTEGER,
    vehicle_id INTEGER,
    date_from DATE,
    date_to DATE,
    probeg INTEGER,
    opisaninie VARCHAR,
    item VARCHAR,
    stoinost real
);

ALTER TABLE users
ADD COLUMN admin BOOLEAN DEFAULT FALSE;
UPDATE users
SET admin = TRUE
WHERE email = 'viktorkabakchiev@gmail.com';