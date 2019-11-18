GET- Reads query parameter passed through url in the prod_id=# format.  Returns Product name from products table and all associated images for product from images table.
URL example localhost:3003/images?prod_id=1

Delete - Reads query parameter passed through url. Deletes all data associated with that product number from products and images table
URL example localhost:3003/images?prod_id=55

Post- Created a new item and writes it to the database tables.  What is added is currently hard coded as this is a media centered component and we are not focusing on adding an image loader to the front end right now.
URL example localhost:3003/images

Put- Updated the name of the product passed in through the url query parameters
URL example localhost:3003/images?prod_id=90
