# Welcome to Test Project!

The Project is built with React.js , Node.js and Mysql database

# Files Details

There are two folder structure in this project
1.api
2.client

## Create files and folders

1.api folder has our server and database code
2.client has our react.js code

## Configurations

please edit the configuration file in api folder -> db.js this should look like this

export const db = mysql.createConnection({

host: "localhost",

user: "root",

password: "password",

database: "blog",

});
change your mysql database user and password accordingly and don't forget to make a blog database

also install the dotenv package from npm and make a .env file in your root folder and save the details of your rapidApi like this

rapidAPI = your api key

rapidAPIHOST = your host

descriptionurl = https://apidojo-booking-v1.p.rapidapi.com/properties/get-description

autocompleteurl= https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete

propertylisturl= https://apidojo-booking-v1.p.rapidapi.com/properties/list

## Schema for a blog table should be like this:

id int AI PK

firstName varchar(45)

lastName varchar(45)

countryFrom varchar(45)

wentToTrip varchar(45)

date date

stayedInHotel varchar(45)

activities varchar(45)

img varchar(80)

## if not comfortable making schema just check the dump folder which has data and schema

#run npm install in root of both project
