[![Build Status](https://app.travis-ci.com/Vhonani24/registration_numbers_webapp.svg?branch=master)](https://app.travis-ci.com/Vhonani24/registration_numbers_webapp)
Registration_numbers_webapp:
    • This web-app displays valid car registration numbers from Cape Town, Paarl and Bellville.
    • The number plates are displayed with rounded corners and a yellow background, with a black border.
    • Users are able to add to add unique number plates to the app(No duplicates).
    • No number plates will be added if the input field is empty.
    • New added registration numbers are displayed at the bottom of the app.
      Setup
To run this example locally you will need to have installed:
    • NodeJS version 12+ install it using nvm
    • npm
    • PostgreSQL
You can use apt-get to install all of the above.

Node JS

You need NodeJs version 8+ install it using nvm - nvm install 8
Install PostgreSQL
You can install PostgreSQL on Ubuntu using these commands:
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

Database setup

Once you have all the above installed you need to setup the database.
Create a database called registrations and username - with a password . Enter the password when prompted after executing the create user command.
sudo -u postgres createdb registrations;
sudo -u postgres create user username -P;
Now run psql as the postgres user:
sudo -u postgres psql;
Grant the username user access to the registrations database by running this command:
grant all privileges on database registrations to user;
Type in \q to exit psql as the postgres user.
Connect to your database using: psql -d registrations
Execute these SQL commands to create the towns and regNumber table in your database.
You can copy and paste the script below into psql or your can run the database script inside psql using \i database.sql

create table towns(
id serial not null primary key,
name text not null,
start text not null
);
create table regNumber(
id serial not null primary key,
reg text not null,
town_id int not null,
foreign key (town_id) references towns(id)
);

insert into towns(name,start) values('Cape Town','CA');
insert into towns(name,start) values('Bellville','CY');
insert into towns(name,start) values('Paarl','CJ');



To do this on your own project create sql file containing the table create scripts that's in your projects root folder. Run the scripts using \i <your script file here>
You see which tables are in the database by using this command:
\dt
You can see the columns of a database using this:
\d+ <table_name_here>
To see all the columns in the products table do this:
\d+ regNumber
Use it
Now you should be ready to run the application.
Open a terminal window in the root of the CRUD application and type
sudo npm install
This will install all the modules that the application depends on.
To start the application: node index.js
If there were no errors, open http://localhost:8000 in a web browser and Create, Read, Update and Delete some products.
Link the tables together using SQL.
The web pages use handlebar.js templates

Deployment

To deploy the application to Heroku install the Heroku command line utility and create a Heroku account.
Initialize your application as a Heroku app by using: heroku create
Create a PostgreSQL database on Heroku for you app using this command:
heroku addons:create heroku-postgresql:hobby-dev
See more info about the created database using: heroku pg:info
To connect to the PostgreSQL database on Heroku by runnning:
heroku pg:psql
Create the towns and regNumber tables in the Heroku remote database by running the script above.
To deploy your app run this command:
git push heroku master
Open the deployed app in a browser running this command :
heroku open
To see the log files to look for deployment issue use:
heroku logs

Note that the application is using two environment variables to be able to deploy to Heroku
    • process.env.PORT
    • process.env.DATABASE_URL



