INSERT INTO account (account_firstname, account_lastname, account_email,  account_password)
VALUES (
    'Tony',
    'Start',
    ' tony@starkent.com',
    'Iam1ronM@n'
);

UPDATE
    account
SET
    account_type = 'Admin'
WHERE
    account_id = 2; -- *** Usando la Primary Key para un solo registro ***


	
DELETE FROM
account
WHERE
account_id = 1;


UPDATE
    inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')

WHERE
    inv_id = 5;


SELECT
  i.make,
  i.model,
  c.classification_name
FROM
  inventory AS i
INNER JOIN
  classification AS c
  ON i.classification_id = c.classification_id
WHERE
  c.classification_name = 'Sport';

UPDATE inventory
SET
  inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');
