POST
/templates/
Create Template

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "key": "string",
  "description": "string",
  "config": {
    "additionalProp1": {}
  }
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "key": "string",
  "description": "string",
  "config": {
    "additionalProp1": {}
  },
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/templates/
Get Templates

Parameters
Try it out
Name	Description
only_active
boolean
(query)
Default value : true


true
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "string",
    "key": "string",
    "description": "string",
    "config": {
      "additionalProp1": {}
    },
    "is_active": true
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/templates/{id}
Get Template


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "key": "string",
  "description": "string",
  "config": {
    "additionalProp1": {}
  },
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/templates/{id}
Update Template


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name": "string",
  "key": "string",
  "description": "string",
  "config": {
    "additionalProp1": {}
  },
  "is_active": true
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "key": "string",
  "description": "string",
  "config": {
    "additionalProp1": {}
  },
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/templates/{id}
Delete Template


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Authentication


POST
/auth/register-restaurant
Register Restaurant

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "owner_name": "string",
  "email": "user@example.com",
  "password": "stringst",
  "restaurant_name_en": "string",
  "restaurant_name_ar": "string",
  "restaurant_phone": "string",
  "template_id": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/auth/login
Login

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "password": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/auth/refresh
Refresh

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "refresh_token": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "access_token": "string",
  "refresh_token": "string",
  "token_type": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/auth/logout
Logout

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "refresh_token": "string"
}
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Tables


POST
/tables/
Create Table


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "table_number": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "table_number": "string",
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/tables/
Get Tables


Parameters
Try it out
Name	Description
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/tables/{id}
Update Table


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "table_number": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "table_number": "string",
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Menu


PUT
/menu/restaurants/{id}
Update Restaurant


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "address_en": "string",
  "address_ar": "string",
  "phone": "string",
  "image_path": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "address_en": "string",
  "address_ar": "string",
  "phone": "string",
  "image_path": "string",
  "id": "string",
  "owner_id": "string",
  "image_url": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/restaurants/{id}/image
Upload Restaurant Image


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

multipart/form-data
file *
string($binary)
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "address_en": "string",
  "address_ar": "string",
  "phone": "string",
  "image_path": "string",
  "id": "string",
  "owner_id": "string",
  "image_url": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/restaurants
Get Restaurants


Get restaurants with optional filters.

Parameters
Try it out
Name	Description
owner_id
string($uuid)
(query)
owner_id
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "name_en": "string",
    "name_ar": "string",
    "address_en": "string",
    "address_ar": "string",
    "phone": "string",
    "image_path": "string",
    "id": "string",
    "owner_id": "string",
    "image_url": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_categories
Create Category


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "parent_id": "string",
  "display_order": 0
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "parent_id": "string",
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/menu_categories
Get Categories


Get menu categories with optional filters.

Parameters
Try it out
Name	Description
parent_id
string($uuid)
(query)
parent_id
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "name_en": "string",
    "name_ar": "string",
    "parent_id": "string",
    "display_order": 0,
    "id": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/menu/menu_categories/{id}
Update Category


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "parent_id": "string",
  "display_order": 0
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "parent_id": "string",
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/menu/menu_categories/{id}
Delete Category


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_items
Create Menu Item


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "category_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "description_en": "string",
  "description_ar": "string",
  "base_price": 0,
  "is_available": true,
  "stock_quantity": 0
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "category_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "description_en": "string",
  "description_ar": "string",
  "base_price": "string",
  "is_available": true,
  "stock_quantity": 0,
  "id": "string",
  "image_url": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/menu_items
Get Menu Items


Get menu items with optional filters.

Parameters
Try it out
Name	Description
category_id
string($uuid)
(query)
category_id
is_available
boolean
(query)

--
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "category_id": "string",
    "name_en": "string",
    "name_ar": "string",
    "description_en": "string",
    "description_ar": "string",
    "base_price": "string",
    "is_available": true,
    "stock_quantity": 0,
    "id": "string",
    "image_url": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/menu/menu_items/{id}
Update Menu Item


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "description_en": "string",
  "description_ar": "string",
  "base_price": 0,
  "image_path": "string",
  "is_available": true,
  "stock_quantity": 0,
  "category_id": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "category_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "description_en": "string",
  "description_ar": "string",
  "base_price": "string",
  "is_available": true,
  "stock_quantity": 0,
  "id": "string",
  "image_url": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/menu/menu_items/{id}
Delete Menu Item


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_items/{id}/image
Upload Menu Item Image


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

multipart/form-data
file *
string($binary)
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "category_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "description_en": "string",
  "description_ar": "string",
  "base_price": "string",
  "is_available": true,
  "stock_quantity": 0,
  "id": "string",
  "image_url": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_item_sizes
Create Size


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price": 0,
  "display_order": 0
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price": "string",
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/menu_item_sizes
Get Sizes


Get menu item sizes with optional filters.

Parameters
Try it out
Name	Description
menu_item_id
string($uuid)
(query)
menu_item_id
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "menu_item_id": "string",
    "name_en": "string",
    "name_ar": "string",
    "price": "string",
    "display_order": 0,
    "id": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/menu/menu_item_sizes/{id}
Update Size


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "price": 0,
  "display_order": 0
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price": "string",
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_item_options
Create Option


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "type": "string",
  "is_required": false,
  "display_order": 0
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "type": "string",
  "is_required": false,
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/menu_item_options
Get Options


Get menu item options with optional filters.

Parameters
Try it out
Name	Description
menu_item_id
string($uuid)
(query)
menu_item_id
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "menu_item_id": "string",
    "name_en": "string",
    "name_ar": "string",
    "type": "string",
    "is_required": false,
    "display_order": 0,
    "id": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/menu/menu_item_options/{id}
Update Option


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "type": "string",
  "is_required": true,
  "display_order": 0
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "menu_item_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "type": "string",
  "is_required": false,
  "display_order": 0,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/menu/menu_item_option_values
Create Option Value


Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "option_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price_modifier": 0,
  "is_default": false
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "option_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price_modifier": "0",
  "is_default": false,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/menu/menu_item_option_values
Get Option Values


Get menu item option values with optional filters.

Parameters
Try it out
Name	Description
option_id
string($uuid)
(query)
option_id
limit
integer
(query)
Default value : 10

10
offset
integer
(query)
Default value : 0

0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "option_id": "string",
    "name_en": "string",
    "name_ar": "string",
    "price_modifier": "0",
    "is_default": false,
    "id": "string"
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/menu/menu_item_option_values/{id}
Update Option Value


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Request body

application/json
Example Value
Schema
{
  "name_en": "string",
  "name_ar": "string",
  "price_modifier": 0,
  "is_default": true
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "option_id": "string",
  "name_en": "string",
  "name_ar": "string",
  "price_modifier": "0",
  "is_default": false,
  "id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/menu/menu_item_option_values/{id}
Delete Option Value


Parameters
Try it out
Name	Description
id *
string($uuid)
(path)
id
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Staff


POST
/staff/
Create Staff


Parameters
Try it out
Name	Description
role *
string
(query)
Available values : manager, cashier, waiter, kitchen


manager
Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "password": "string",
  "owner_name": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "email": "user@example.com",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/staff/
Get Staff


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links

GET
/staff/{staff_id}
Get Staff By Id


Parameters
Try it out
Name	Description
staff_id *
string($uuid)
(path)
staff_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "email": "user@example.com",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PUT
/staff/{staff_id}
Update Staff


Parameters
Try it out
Name	Description
staff_id *
string($uuid)
(path)
staff_id
Request body

application/json
Example Value
Schema
{
  "additionalProp1": {}
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "email": "user@example.com",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "is_active": true
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/staff/{staff_id}
Delete Staff


Parameters
Try it out
Name	Description
staff_id *
string($uuid)
(path)
staff_id
Responses
Code	Description	Links
204	
Successful Response

No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links
Customer Auth


POST
/customer/verify
Verify Customer

Orders


POST
/orders
Create Order


Create a new order (cart). customer_id and restaurant_id extracted from JWT.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "table_id": "string"
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "order_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/orders
List Orders

List orders with filters.

Parameters
Try it out
Name	Description
restaurant_id
string | (string | null)($uuid)
(query)
restaurant_id
customer_id
string | (string | null)($uuid)
(query)
customer_id
status
string | (string | null)
(query)
status
limit
integer
(query)
Default value : 10

10
maximum: 100
minimum: 1
offset
integer
(query)
Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "restaurant_id": "string",
    "table_id": "string",
    "customer_id": "string",
    "status": "draft",
    "total_price": "string",
    "payment_status": "unpaid",
    "payment_method": "cash",
    "customer_note": "string",
    "items": []
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/orders/{order_id}/items
Add Item To Order


Add an item to an existing order. Verifies order belongs to customer.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Request body

application/json
Example Value
Schema
{
  "menu_item_id": "string",
  "size_id": "string",
  "options": [
    {
      "option_id": "string",
      "value_id": "string"
    }
  ],
  "quantity": 1
}
Responses
Code	Description	Links
201	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "menu_item_id": "string",
  "size_id": "string",
  "quantity": 0,
  "price": "string",
  "total": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/orders/{order_id}/cancel
Cancel Order


Cancel an order. Only pending or confirmed orders can be cancelled.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "order_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/orders/history
Get Order History


Get order history for the authenticated customer at their restaurant.

Parameters
Try it out
Name	Description
limit
integer
(query)
Default value : 10

10
maximum: 100
minimum: 1
offset
integer
(query)
Default value : 0

0
minimum: 0
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": "string",
    "restaurant_id": "string",
    "table_id": "string",
    "customer_id": "string",
    "status": "draft",
    "total_price": "string",
    "payment_status": "unpaid",
    "payment_method": "cash",
    "customer_note": "string",
    "items": []
  }
]
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PATCH
/orders/{order_id}/items/{item_id}
Update Cart Item


Update quantity of an item in the cart. Only works for draft orders.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
item_id *
string($uuid)
(path)
item_id
quantity *
integer
(query)
New quantity

quantity
minimum: 1
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "menu_item_id": "string",
  "size_id": "string",
  "quantity": 0,
  "price": "string",
  "total": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

DELETE
/orders/{order_id}/items/{item_id}
Remove Cart Item


Remove an item from the cart. Only works for draft orders.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
item_id *
string($uuid)
(path)
item_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
"string"
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

POST
/orders/{order_id}/checkout
Checkout Order


Checkout an order (finalize cart). Converts draft order to pending.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Request body

application/json
Example Value
Schema
{
  "payment_method": "cash",
  "customer_note": "string"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "order_id": "string"
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

GET
/orders/{order_id}
Get Order Details

Get full details of an order.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "restaurant_id": "string",
  "table_id": "string",
  "customer_id": "string",
  "status": "draft",
  "total_price": "string",
  "payment_status": "unpaid",
  "payment_method": "cash",
  "customer_note": "string",
  "items": []
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PATCH
/orders/{order_id}/status
Update Order Status

Update order status.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Request body

application/json
Example Value
Schema
{
  "status": "draft"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "restaurant_id": "string",
  "table_id": "string",
  "customer_id": "string",
  "status": "draft",
  "total_price": "string",
  "payment_status": "unpaid",
  "payment_method": "cash",
  "customer_note": "string",
  "items": []
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}
No links

PATCH
/orders/{order_id}/payment
Update Payment Status

Update payment status.

Parameters
Try it out
Name	Description
order_id *
string($uuid)
(path)
order_id
Request body

application/json
Example Value
Schema
{
  "payment_status": "unpaid"
}
Responses
Code	Description	Links
200	
Successful Response

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": "string",
  "restaurant_id": "string",
  "table_id": "string",
  "customer_id": "string",
  "status": "draft",
  "total_price": "string",
  "payment_status": "unpaid",
  "payment_method": "cash",
  "customer_note": "string",
  "items": []
}
No links
422	
Validation Error

Media type

application/json
Example Value
Schema
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}