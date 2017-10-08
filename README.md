#Soil-Health-Web-Application

Installation and Test
---------------

Requirements
	* Postgres/Postgis: https://www.postgresql.org/download/
	* Apache2: https://httpd.apache.org/
	* PHP:
	* Composer: https://getcomposer.org/download/

First install composer

	$ curl -sS https://getcomposer.org/installer | php
	$ sudo mv composer.phar /usr/local/bin/composer

Clone the repository from github

	$ git clone https://github.com/CAPSELLA/Soil-Health-Web-Application
	$ cd Soil-Health-Web-Application/capsella

Install the dependencies using composer

	$ composer update
