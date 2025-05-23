The Printful API v2 (beta) has arrived — discover its new features.

About the Printful API
Localisation
Authorization
Public App authorization
OAuth API
Catalog API
Products API
Product Templates API
Orders API
File Library API
Shipping Rate API
Ecommerce Platform Sync API
Country/State Code API
Tax Rate API
Webhook API
Store Information API
Mockup Generator API
Warehouse Products API
Reports API
Approval Sheets API
Common
Other resources
Tutorials
Errors
Examples
Catalog API examples
Filter products by single category ID
Filter products by multiple category IDs
Using size guides
Product containing Unlimited Color option
Products API examples
Product Templates API
Orders API examples
File Library API examples
Ecommerce Platform Sync API examples
Mockup Generator API examples

API Documentation | Printful (1.0)
Download OpenAPI specification:Download
Printful developer support: URL: 
About the Printful API
The Printful API is a RESTful API, that uses an HTTP protocol for communication. HTTP GET, POST, PUT and DELETE methods are used to access the API resources.
Requests and responses
Request endpoint
All API requests have to be sent to this URL:
https://api.printful.com/
If you are using a proxy, make sure that all requests have host header set to api.printful.com.
Request parameters
Some mandatory parameters (like object identifiers) must be included in the request URL path
GET /orders/123
Additional parameters can be passed as GET variables:
GET /orders?offset=10&limit=5
For POST and PUT requests, a more complex data structure can be passed as JSON encoded data in the request body:
POST /orders

{"recipient":{...},"items":[...]}
Response body
The response body is always a JSON object that contains a response status code (identical to the HTTP status code) and the result of the action. If the status code is 200, then the action was successful.
{
 "code": 200, //Response status code
 "result":{
 //API method return data
 //...
 }
}
Sometimes the response includes paging information to allow to browse larger result sets by adding offset and limit GET parameters to the request URL.
{
 "code": 200, //Response status code
 "result":[
 {
 //Item 11
 },
 {
 //Item 12
 }
 ]
 "paging": {
 "total": 12, //Total items available
 "offset": 10, //Items skipped from the beginning
 "limit": 20 //Number of items per page
 }
}
Error response
If the API call is not successful, then the response code is not in the 2xx range and the result attribute contains an error description.
{
 "code": 404,
 "result": "Not Found",
 "error": {
 "reason": "NotFound",
 "message": "Not Found"
 }
}
In general, response codes in the 4xx range indicate an error that resulted from the provided information (e.g. a required parameter was missing, etc.), and codes in the 5xx range indicate an error with Printful's servers.
Timestamps
All timestamps from the API are returned as integers in UNIX timestamp format.
Rate Limits
Printful API has a general rate limit of 120 API calls per minute. Additionally, endpoints that perform resource intensive operations (such as mockup generator) have a lower allowed request limit.
Localisation
Some of the resources returned by the API are translated into several languages. By default, they are returned in English in the API responses.
If you want to get a response with texts in another language, you can use the X-PF-Language HTTP header. Its value should be the long version of the locale to use (e.g. es\_ES for Spanish). Possible localisation parameters:
en\_US
en\_GB
en\_CA
es\_ES
fr\_FR
de\_DE
it\_IT
ja\_JP
Example
Product details (GET https://api.printful.com/products/71) response with default locale (en\_US):
{
 "code": 200,
 "result": {
 "product": {
 "type\_name": "T-Shirt",
 "title": "Unisex Staple T-Shirt | Bella + Canvas 3001",
 ...
 }
 }
}
Product details response with Spanish locale (X-PF-Language: es\_ES):
{
 "code": 200,
 "result": {
 "product": {
 ...
 "type\_name": "Camiseta",
 "title": "Camiseta esencial unisex | Bella + Canvas 3001",
 ...
 }
 }
}
Authorization
Private tokens and public apps
There are two different ways of using Printful OAuth - Private token and Public App. If you are developing an API solution for your personal store, you should choose Private Token. But if you are building an Public App that will be used by a wider audience, you should be choosing Public App.
Client types
There are two different client types - Store and Account. Store access level client is only able to access the specific store. For Private tokens this store is specified when the token is created, but for Public apps this store is specified when the app is installed. Account level tokens on the other hand can manage all the stores associated with the account. For the endpoints that require specific store context, requests should contain X-PF-Store-Id header. Account level access currently is only available for Private tokens.
Scopes
Scopes are used to limit access to specific resources and their methods. Scopes are defined in the developer portal when creating a Private Token or Public App. Customers on Public App installation grant screen will see all requested permissions, so be thoughtful about which scopes to request.
List of currently available scopes
Developer Portal
 is specifically designed for developers that want to interact with the Printful API. In the Developer Portal, it's possible to create and manage your Public Apps and Private tokens.
Acquiring Private Tokens
Private OAuth tokens can be generated in the Developer Portal's . These tokens do not require refreshing and are valid until they expire or are deleted manually. Usage of these tokens is described below.
Acquiring OAuth tokens for Public Apps
For public apps to make requests on behalf of the customer, they must first acquire access tokens. In order to acquire these tokens, developers must follow these steps:
create an app in  of developer portals
generate app-specific installation URL with Client id, Client secret, and other parameters
redirect the user to app installation url
once the users returns to redirect\_url, use code parameter to acquire OAuth tokens
Public App authorization
Public App installation flow
Public App installation starts with a user redirection to an app-specific installation URL. Installation URL has to be generated in the following format:
https://www.printful.com/oauth/authorize?client\_id={clientId}&state={stateValue}&redirect\_url={redirectUrl}
In this URL, the customer is asked to register or log in to an existing account. After authorization, the customer is redirected to the OAuth grant screen. This screen shows information about your app, and the customer is asked to accept the requested scopes. If the customer rejects the app installation, he is redirected back to your provided redirect\_url with success=0 parameter. If the customer accepts app installation, he is redirected to your redirect\_url with state={stateValue}&code={authorizationCode}&success=1 parameters.
After receiving authorization code, apps should request access and refresh tokens. To request these tokens, the app should make a POST request to https://www.printful.com/oauth/token page with the following parameters:
grant\_type=authorization\_code
client\_id={clientId}
client\_secret={clientSecret}
code={authorizationCode}
If the request is successful the following response is returned:
{
 "access\_token": "smk\_GN0I1Os3OdfqzjJnTOWn1wlbqqq2Y2Pc10TS",
 "expires\_at": "1562157895",
 "token\_type": "bearer",
 "refresh\_token": "902LmW0sWNlY-mbrLhb6AgexkI6K4OFo3Hknak8HDhTy\_ifB5SdoLH1QgV9"
}
Refreshing tokens
The access\_token will expire in one hour. When access\_token expires you must refresh it with the refresh\_token. After refreshing tokens, you will receive a new set of access\_token and refresh\_token. If tokens are not refreshed within 90 days, refresh\_token will expire, and the app will have to ask the user to reauthorize it. To refresh tokens you must make a POST request to https://www.printful.com/oauth/token with the parameters:
grant\_type=refresh\_token
client\_id={clientId}
client\_secret={clientSecret}
refresh\_token={refreshToken}
The successful refresh request will result in a similar response that you received previously:
{
 "access\_token": "smk\_GN0I1Os3OdfqzjJnTOWn1wlbqqq2Y2Pc10TS",
 "expires\_at": "1562157895",
 "token\_type": "bearer",
 "refresh\_token": "902LmW0sWNlY-mbrLhb6AgexkI6K4OFo3Hknak8HDhTy\_ifB5SdoLH1QgV9"
}
OAuth API
OAuth API allows receiving data for token
Get scopes for token
Returns a list of scopes associated with the token
Authorizations:
OAuth
Responses
200
OK
Response Schema: application/json
401
Unauthorized
403
Forbidden
get/oauth/scopes
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/oauth/scopes' --header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
403
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"scopes": []
}
}
Catalog API
Printful has a substantial catalog of blank Products and Variants. A Product can describe a specific type, model and manufacturer of the item, while the Variant specifies the more detailed attributes of the product like the exact size/color of a T-shirt or the dimensions of a poster. Moreover, each item in the Printful Catalog has a unique Variant ID. When managing Sync Products or orders, you will need to specify the Variant ID of the specific blank item, hence you can use this API resource to find the needed Variant ID.
It is critically important to always refer to the Variant IDs (NOT Product IDs) when creating products or orders. Mixing up and using the Product ID instead of the Variant ID can lead to an entirely different product created or item ordered. The Product entity is only meant to allow of easier browsing of what Printful offers.
You can also use this API resource to find out the types of print files a product can be configured for as well as the additional price each print file would cost (e.g. the back print or inside label print for T-shirts). Moreover, some product types allow for additional options (e.g. embroidery type and thread colors) - these options are listed in the responses as well.
Please note that the current Catalog API does not reflect the discounted pricing available in the Printful subscription plans.
Important: Jewelry products are not supported via API.
Rate limiting: For unauthenticated usages, up to 30 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.
Size guides
The  endpoint will return size guide data for the selected product.
There are three types of size tables available, as described by the following table:
Not each table type might be available for the selected product.

Get Products
Returns list of Products available in the Printful
query Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/products
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/products'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Get Variant
Returns information about a specific Variant and its Product
path Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/products/variant/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/products/variant/4018'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"variant": {},
"product": {}
}
}
Get Product
Returns information about a specific product and a list of variants for this product.
path Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/products/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/products/71'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"product": {},
"variants": []
}
}
Get Product Size Guide
Returns information about the size guide for a specific product.
path Parameters
query Parameters
Responses
200
OK
Response Schema: application/json
404
Not found
get/products/{id}/sizes
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/products/71/sizes'
Response samples
200
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"product\_id": 13,
"available\_sizes": [],
"size\_tables": []
}
}
Get Categories
Returns list of Catalog Categories available in the Printful
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/categories
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/categories'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Get Category
Returns information about a specific category.
path Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/categories/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/categories/24'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 24,
"parent\_id": 6,
"image\_url": "",
"size": "small",
"title": "T-Shirts"
}
}
Products API
The Products API resource lets you create, modify and delete products in a Printful store based on the Manual orders / API platform (you can create such store by going to the Stores section at your Printful dashboard.)
Important: Jewelry products are not supported via API.
To configure products and variants at a Printful store based on Shopify, WooCommerce or another supported integration platform, please see .
To manage Warehouse products, please see .
The basics
Each product in your Printful store must contain one or multiple variants (imagine multiple sizes or colors of the same t-shirt design). Furthermore, for each variant, you have to specify both a blank product variant from our Printful Catalog and a print file. These two properties together with price and External ID (more on that later) will allow the variant to be purchasable. Please, see the following sections for more details. Finally, please note that for technical reasons a product in your Printful store is called a Sync Product and a variant of that product is called a Sync Variant. The maximum supported amount of Sync Variants a Sync Product can have is 100.
Assigning a blank product variant
Printful has a substantial catalog of blank products and variants, where each variant (e.g. size and color combination of a particular product) has a unique ID, which we call variant\_id. You can browse through the catalog via Catalog API to find a specific variant\_id. Moreover, when creating a Sync Product at your Printful store, each of its Sync Variants must be associated with a variant\_id from the Printful Catalog. Furthermore, to assign a specific variant\_id to a specific Sync Variant, simply add it to the HTTP request body (see examples at the specific endpoint).
Assigning a single print file
There are two ways to assign a print file to a Sync Variant. One is to specify the File ID if the file already exists in the File library of the authorized store;
Limitations
Important: The Products API is not intended and will never support creating and managing products in external platforms such as Shopify, WooCommerce and others. For managing your products from external platforms please refer to 
{
 ...
 "files": [
 {
 "id": 12345
 }
 ],
 ...
}
The second and most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused.
{
 ...
 "files": [
 {
 "url": "http://example.com/t-shirts/123/front.pdf"
 }
 ],
 ...
}
Moreover, each Sync Variant has to be linked with one or multiple print files. The available file types for each product are available from the Printful Catalogue API. You can add one file for each type by specifying the type attribute. For the default type, this attribute can be skipped.
...
"files":[
 {
 "type": "default",
 "url": "http://example.com/t-shirts/123/front.pdf"
 },
 {
 "type": "back"
 "url": "http://example.com/t-shirts/123/back.pdf"
 }
],
...
Remember that using additional files can increase the price of the item.
External ID
When creating a Sync Product and/or Sync Variant you can specify an External ID, which you can then use as a reference when managing or even ordering the specific Sync Product or Sync Variant. In particular, when requesting a specific Sync Product and Sync Variant, you can use either the internal Printful ID or your External ID (prefixed with an @ symbol) at the request URL.
Native inside label
Printful previously allowed customers to upload a fully customized inside label. Since these labels had to contain specific information about fabric composition, manufacturing, etc. to meet the legal requirements, users usually encountered issues to get their labels printed.
Inside labels are printed on the inside of the garment and require the removal of the original manufacturer's tag. They're only available for apparel with tear-away labels. An inside label must include the country of manufacturing origin, original garment size, and material information. To use our native label template you only need to upload a graphic (such as your brand's logo). The mandatory content will be generated and placed automatically.
...
"files":[
 {
 "type": "label\_inside",
 "url": "http://example.com/logo/123/image.jpg",
 "options": [{
 "id": "template\_type",
 "value": "native"
 }]
 },
],
...
Printful previously supported fully customized inside labels. These have now been deprecated. The ability to create orders with fully customized inside labels has been limited to only users who were actively using them in their stores before April 2020. This feature is no longer accessible to new users.

Get Sync Products
Returns a list of Sync Product objects from your custom Printful store.
Authorizations:
OAuth
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/store/products
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/store/products' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"paging": {
"total": 100,
"offset": 10,
"limit": 100
},
"result": [
{}
]
}
Create a new Sync Product
Creates a new Sync Product together with its Sync Variants ().
Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/store/products
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"sync\_product": {
"external\_id": "4235234213",
"name": "T-shirt",
"thumbnail": "​http://your-domain.com/path/to/thumbnail.png",
"is\_ignored": true
},
"sync\_variants": [
{}
]
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"name": "T-shirt",
"variants": 10,
"synced": 10,
"thumbnail\_url": "​https://your-domain.com/path/to/image.png",
"is\_ignored": true
}
}
Get a Sync Product
Get information about a single Sync Product and its Sync Variants.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/store/products/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/store/products/{sync\_product\_id}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_product": {},
"sync\_variants": []
}
}
Delete a Sync Product
Deletes a Sync Product with all of its Sync Variants
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
delete/store/products/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request DELETE 'https://api.printful.com/store/products/161636638' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_product": {},
"sync\_variants": []
}
}
Modify a Sync Product
Modifies an existing Sync Product with its Sync Variants.
Please note that in the request body you only need to specify the fields that need to be changed. Furthermore, if you want to update existing sync variants, then in the sync variants array you must specify the IDs of all existing sync variants. All omitted existing sync variants will be deleted. All new sync variants without an ID will be created. See examples for more insights.
Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.

Authorizations:
OAuth
path Parameters
header Parameters
Request Body schema: application/json
required
PUT request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
put/store/products/{id}
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"sync\_product": {
"external\_id": "4235234213",
"name": "T-shirt",
"thumbnail": "​http://your-domain.com/path/to/thumbnail.png",
"is\_ignored": true
},
"sync\_variants": [
{}
]
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"name": "T-shirt",
"variants": 10,
"synced": 10,
"thumbnail\_url": "​https://your-domain.com/path/to/image.png",
"is\_ignored": true
}
}
Get a Sync Variant
Get information about a single Sync Variant.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/store/variants/{id}
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 10,
"external\_id": "12312414",
"sync\_product\_id": 71,
"name": "Red T-Shirt",
"synced": true,
"variant\_id": 3001,
"retail\_price": "29.99",
"currency": "USD",
"is\_ignored": true,
"sku": "SKU1234",
"product": {},
"files": [],
"options": [],
"main\_category\_id": 24,
"warehouse\_product\_id": 3002,
"warehouse\_product\_variant\_id": 3002,
"size": "XS",
"color": "White",
"availability\_status": "active"
}
}
Delete a Sync Variant
Deletes a single Sync Variant.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
delete/store/variants/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request DELETE 'https://api.printful.com/store/variants/1781126754' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [ ]
}
Modify a Sync Variant
Modifies an existing Sync Variant.
Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.

Authorizations:
OAuth
path Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
put/store/variants/{id}
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"id": 10,
"external\_id": "12312414",
"variant\_id": 3001,
"retail\_price": "29.99",
"is\_ignored": true,
"sku": "SKU1234",
"files": [
{}
],
"options": [
{}
],
"availability\_status": "active"
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 10,
"external\_id": "12312414",
"sync\_product\_id": 71,
"name": "Red T-Shirt",
"synced": true,
"variant\_id": 3001,
"retail\_price": "29.99",
"currency": "USD",
"is\_ignored": true,
"sku": "SKU1234",
"product": {},
"files": [],
"options": [],
"main\_category\_id": 24,
"warehouse\_product\_id": 3002,
"warehouse\_product\_variant\_id": 3002,
"size": "XS",
"color": "White",
"availability\_status": "active"
}
}
Create a new Sync Variant
Creates a new Sync Variant for an existing Sync Product ().
Authorizations:
OAuth
path Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
post/store/products/{id}/variants
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"external\_id": "12312414",
"variant\_id": 3001,
"retail\_price": "29.99",
"is\_ignored": true,
"sku": "SKU1234",
"files": [
{}
],
"options": [
{}
],
"availability\_status": "active"
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 10,
"external\_id": "12312414",
"sync\_product\_id": 71,
"name": "Red T-Shirt",
"synced": true,
"variant\_id": 3001,
"retail\_price": "29.99",
"currency": "USD",
"is\_ignored": true,
"sku": "SKU1234",
"product": {},
"files": [],
"options": [],
"main\_category\_id": 24,
"warehouse\_product\_id": 3002,
"warehouse\_product\_variant\_id": 3002,
"size": "XS",
"color": "White",
"availability\_status": "active"
}
}
Product Templates API
The Product Templates API resource lets you retrieve the product templates information.
External Product ID
In case of a single template retrieval it is possible to get it by the External Product ID. In order to do this, the ID needs to be prepended with the '@' character. Here are the examples of how to get the template data by the Template ID and by the External Product ID.
GET /product-templates/11001 - reference by Printful Template ID
GET /product-templates/@988123 - reference by External ID

Get product template list
Returns a list of templates.
Authorizations:
OAuth
query Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/product-templates
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/product-templates' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"items": []
},
"paging": {
"total": 100,
"offset": 10,
"limit": 100
}
}
Get product template
Get information about a single product template
Authorizations:
OAuth
path Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/product-templates/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/product-templates/{template\_id}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 0,
"product\_id": 0,
"external\_product\_id": "string",
"title": "string",
"available\_variant\_ids": [],
"option\_data": [],
"colors": [],
"sizes": [],
"mockup\_file\_url": "string",
"placements": [],
"created\_at": 0,
"updated\_at": 0,
"placement\_option\_data": []
}
}
Delete product template
Delete product template by ID or External Product ID
Authorizations:
OAuth
path Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
delete/product-templates/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request DELETE 'https://api.printful.com/product-templates/{template\_id}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"success": true
}
}
Orders API
The Orders API is the most important part of the Printful API - it allows you to create new orders and confirm them for fulfillment.
Important: Jewelry products are not supported via API.
Order life cycle and statuses
Each order will go through different states while being processed. The following order status types indicate those states:
To sum up, the API allows you to create orders with status draft and then move them to state pending (both steps can be done with a single action). You are only charged for orders that have been confirmed. If the order encounters a problem after it has been submitted, then it is moved to the failed state so that the problem can be fixed and the order can be resubmitted.
Asynchronous order cost calculation
Most of the times, when you submit an order, we'll perform the cost calculation and return it in the response.
However, we might not be able to calculate all the costs immediately, for example if the order contains a new advanced embroidery design. If that's the case, we'll automatically put your order on hold, calculate the order costs once it's possible, and then remove the order from hold.
Such an order will return to a draft status (even if it was created with the auto-confirm option) and will need to be confirmed.
You can subscribe to the order\_remove\_hold event (see ) to be notified when the order is removed from hold.
External ID
External ID is an optional feature that allows you to link your Printful order with the Order ID from your system without the need to store additional data on your side. External ID can be up to 32 characters long and contain digits, Latin alphabet letters, dashes and underscores, however it is recommended to use integer numbers. Each order's External ID must be unique within the store.
To use the External ID feature, you just add the external\_id attribute when creating the order. Later, when you need to access the order through the API, you can reference it by both the Order ID and by External ID (if you prefix it with the @ symbol).
GET /orders/11001 - reference by Printful Order ID
GET /orders/@988123 - reference by External ID
GET /orders/@AA123123 - reference by External ID
You can assign the external\_id attribute to line items as well. In this case they have to be unique per order.
Specifying products
There are three general ways to specify a product’s variant when creating, updating or estimating an order:
(A) Using an existing product variant (sync variant) in your Printful store or warehouse. To specify the existing product please use its sync\_variant\_id or external\_variant\_id, or warehouse\_product\_variant\_id.
 
(B) Using a Catalog API variant without adding a product to the store. This method can be used when a Printful store has no products in it. To construct a variant on-the-fly retrieve a specific variant\_id from the  together with print files and an additional options.

(C) Using an existing template ID. This method can be used when a Printful store has assigned templates without the need to create products. To create an order please use the product\_template\_id and variant\_id that will be added to the order.

Adding print files
There are two ways to assign a print file to the item. One is to specify the File ID if the file already exists in the file library of the authorized store:
...
"files": [
 {
 "id": 12345
 },
],
...
The second and the most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused.
...
"files": [
 {
 "url": "http://example.com/t-shirts/123/front.pdf"
 },
],
...
Specifying file position
You can specify the image position inside the print area by providing a position object.
Important
Each print area has specific dimensions, by default Orders API will assume that your file has to stick to those limitations and not exceed them. In some cases you would want to position your file outside the print area - to be able to do so use the limit\_to\_print\_area and set it to: false.
limit\_to\_print\_area determines if the image can cross the print area border. If limit\_to\_print\_area is set to true then the request will result in 400 Bad Request with "Invalid position" in error.message once the image crosses the print area borders. If limit\_to\_print\_area is set to false then it will be possible to place image partially or fully outside the print area.
The (0,0) point is always located in top left corner of the print area.
Steps
1.Retrieve printfile dimensions Printfiles
...
"printfiles":
 [
 {
 "printfile\_id": 1,
 "width": 1800,
 "height": 2400,
 "dpi": 150,
 "fill\_mode": "fit",
 "can\_rotate": false
 }
 ],
...
2.Specify file position for specific print placement while creating an order. Use items -> files -> position object as in the example:
...
"items": [
 {
 "variant\_id":4011,
 "quantity":"1",
 "files": [
 {
 "type": "front",
 "url": "http://example.com/t-shirts/123/front.pdf",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0,
 "limit\_to\_print\_area": true
 }
 }
 ]
 }
]
...
Example of positioning the 450x450 image on the front placement
Specifying multiple files per item
Each item in the order has to be linked with one or multiple files. The available file types for each product are available from the .
You can add one file for each type by specifying the type attribute. For the default type, this attribute can be skipped.
...
"files":[
 {
 "type": "default",
 "url": "http://example.com/t-shirts/123/front.pdf"
 },
 {
 "type": "back"
 "url": "http://example.com/t-shirts/123/back.pdf"
 },
 {
 "type": "preview"
 "url": "http://example.com/t-shirts/123/preview.png"
 }
],
...
Remember that using additional files can increase the price of the item.
Creating orders from a template
Orders API allows also creating orders based on the product template created in the Printful account without the need to add the product to the Printful store.
To retrieve available templates for your account please use the .
To create an order from a template you need to specify a variant or variants that will be added to the order. It is possible to use multiple templates with different variants in one request. To achieve that please use the items object below:
 ...
 "items": [
 {
 "variant\_id": 4012,
 "quantity": 1,
 "product\_template\_id": 123456789
 },
 {
 "variant\_id": 1,
 "quantity": 2,
 "product\_template\_id": 11235813
 },
 ]
 ...
Important note: you can only create orders from templates for variant IDs from the Catalog API.
More examples are available .
Retail costs
Printful allows you to specify your retail costs for the order so that the packing slip for international orders can contain your correct retail prices. To enable retail costs, each item in the order has to contain the retail\_price attribute. You can also specify a custom discount sum, shipping costs and taxes in the retail\_costs object when creating the order. If the retail costs are missing, the packing slip will contain the Printful prices instead.
Native inside label
Printful previously allowed customers to upload a fully customized inside label. Since these labels had to contain specific information about fabric composition, manufacturing, etc. to meet the legal requirements, users usually encountered issues to get their labels printed.
Inside labels are printed on the inside of the garment and require the removal of the original manufacturer's tag. They're only available for apparel with tear-away labels. An inside label must include the country of manufacturing origin, original garment size, and material information. To use our native label template you only need to upload a graphic (such as your brand's logo). The mandatory content will be generated and placed automatically.
...
"files":[
 {
 "type": "label\_inside",
 "url": "http://example.com/logo/123/image.jpg",
 "options": [{
 "id": "template\_type",
 "value": "native"
 }]
 },
],
...
Printful previously supported fully customized inside labels. These have now been deprecated. The ability to create orders with fully customized inside labels has been limited to only users who were actively using them in their stores before April 2020. This feature is no longer accessible to new users.
Ordering embroidery products
Embroidery is a technique which uses colored threads, sewn into a product, to recreate provided design. In order to use embroidery technique you first need to check if selected product support embroidery technique.
In order to do that you need to use  to determine if the selected product or variant contains EMBROIDERY technique.
"techniques": [
 {
 "key": "EMBROIDERY",
 "display\_name": "Embroidery",
 "is\_default": true
 }
 ]
After that you need to also get list of available embroidery placements. Those are listed under file property with embroidery\_ prefix. You can get list of all available placements in .
Example of file property
To create an order using embroidery technique you can:
Provide thread colors manually 
Use automatic thread color detection 
Finally, you can make an order using embroidery technique . Depending on the placement that you've used you need to specify the correct .
Packing slip
The packing slip fields can be configured at the store level and overridden for a specific order.
The packing slip settings can be found in Dashboard at Settings > Stores > Branding > Packing slip section.
To override the packing slip settings for the order, you can use packing\_slip or gift fields.
Below you can find an example or a packing slip for a shipment with explained fields.

Field annotations:
(1) Barcode unique for the shipment.
(2) Store logo defined in the store settings or overridded using packing\_slip.logo\_url field.
(3) The date of the shipment.
(4) Packing slip number consisting of order and shipment IDs in Printful database, divided with a hyphen.
(5) The country from which the shipment is made. If the recipient is in the United States, this field will be absent.
(6) Recipient address with phone, without email address.
(7) Store name. This can be overridden using packing\_slip.store\_name.
(8) The address to which the shipment should be returned. By default it will be a Printful’s return address, but you can set your own address in the store settings (Settings > Stores > Returns > Return address section).
(9) The customer service phone number defined in the store settings or overridden using packing\_slip.phone field.
(10) The customer service email address defined in the store settings or overridden using packing\_slip.email field.
(11) Gift message. This is only present if the gift field was provided in the order request.
(12) The order creation date.
(13) Printful Order ID which can be overridden using packing\_slip.custom\_order\_id field.
(14) The list of order items with quantities. The items’ display names are localized, using the recipient’s country and include variant information such as color and size e.g. „Unisex Staple T-Shirt | Bella + Canvas 3001 ( Lilac / M)”.
(15) The packing slip message defined in the store settings or overridden using packing\_slip.message field.
More Orders API examples
See the  for more sample requests on how Orders API can be used in different scenarios.
Custom border color option
Stickers can have a different border color which can be set by using the thread\_colors\_outline option. This option is available in options for stickers. To showcase the usage we will use the order flow which will create order with a sticker that will have a red border color:
Endpoint POST https://api.printful.com/orders
Request body
Get list of orders
Returns list of order objects from your store
Authorizations:
OAuth
query Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/orders
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/orders' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"paging": {
"total": 100,
"offset": 10,
"limit": 100
},
"result": [
{}
]
}
Create a new order
Creates a new order and optionally submits it for fulfillment ()
Authorizations:
OAuth
query Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/orders
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"external\_id": "4235234213",
"shipping": "STANDARD",
"recipient": {
"name": "John Smith",
"company": "John Smith Inc",
"address1": "19749 Dearborn St",
"address2": "string",
"city": "Chatsworth",
"state\_code": "CA",
"state\_name": "California",
"country\_code": "US",
"country\_name": "United States",
"zip": "91311",
"phone": "2312322334",
"email": "firstname.secondname@domain.com",
"tax\_number": "123.456.789-10"
},
"items": [
{}
],
"retail\_costs": {
"currency": "USD",
"subtotal": "10.00",
"discount": "0.00",
"shipping": "5.00",
"tax": "0.00"
},
"gift": {
"subject": "To John",
"message": "Have a nice day"
},
"packing\_slip": {
"email": "your-name@your-domain.com",
"phone": "+371 28888888",
"message": "Message on packing slip",
"logo\_url": "​http://www.your-domain.com/packing-logo.png",
"store\_name": "Your store name",
"custom\_order\_id": "kkk2344lm"
}
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"store": 10,
"status": "draft",
"shipping": "STANDARD",
"shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
"created": 1602607640,
"updated": 1602607640,
"recipient": {},
"items": [],
"branding\_items": [],
"incomplete\_items": [],
"costs": {},
"retail\_costs": {},
"pricing\_breakdown": [],
"shipments": [],
"gift": {},
"packing\_slip": {}
}
}
Get order data
Returns order data by ID or External ID.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/orders/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request GET 'https://api.printful.com/orders/{order\_id}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"store": 10,
"status": "draft",
"shipping": "STANDARD",
"shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
"created": 1602607640,
"updated": 1602607640,
"recipient": {},
"items": [],
"branding\_items": [],
"incomplete\_items": [],
"costs": {},
"retail\_costs": {},
"pricing\_breakdown": [],
"shipments": [],
"gift": {},
"packing\_slip": {}
}
}
Cancel an order
Cancels pending order or draft. Charged amount is returned to the store owner's credit card.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
delete/orders/{id}
Request samples
Curl
PrintfulSdk
Copy
curl --location --request DELETE 'https://api.printful.com/orders/{order\_id}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"store": 10,
"status": "draft",
"shipping": "STANDARD",
"shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
"created": 1602607640,
"updated": 1602607640,
"recipient": {},
"items": [],
"branding\_items": [],
"incomplete\_items": [],
"costs": {},
"retail\_costs": {},
"pricing\_breakdown": [],
"shipments": [],
"gift": {},
"packing\_slip": {}
}
}
Update order data
Updates unsubmitted order and optionally submits it for the fulfillment.
Note that you need to post only the fields that need to be changed, not all required fields.
If items array is given in the update data, the items will be:
a) updated, if the update data contains the item id or external\_id parameter that alreay exists
b) deleted, if the request doesn't contain the item with previously existing id
c) created as new if the id is not given or does not already exist
Authorizations:
OAuth
path Parameters
query Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
put/orders/{id}
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"external\_id": "4235234213",
"shipping": "STANDARD",
"recipient": {
"name": "John Smith",
"company": "John Smith Inc",
"address1": "19749 Dearborn St",
"address2": "string",
"city": "Chatsworth",
"state\_code": "CA",
"state\_name": "California",
"country\_code": "US",
"country\_name": "United States",
"zip": "91311",
"phone": "2312322334",
"email": "firstname.secondname@domain.com",
"tax\_number": "123.456.789-10"
},
"items": [
{}
],
"retail\_costs": {
"currency": "USD",
"subtotal": "10.00",
"discount": "0.00",
"shipping": "5.00",
"tax": "0.00"
},
"gift": {
"subject": "To John",
"message": "Have a nice day"
},
"packing\_slip": {
"email": "your-name@your-domain.com",
"phone": "+371 28888888",
"message": "Message on packing slip",
"logo\_url": "​http://www.your-domain.com/packing-logo.png",
"store\_name": "Your store name",
"custom\_order\_id": "kkk2344lm"
}
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"store": 10,
"status": "draft",
"shipping": "STANDARD",
"shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
"created": 1602607640,
"updated": 1602607640,
"recipient": {},
"items": [],
"branding\_items": [],
"incomplete\_items": [],
"costs": {},
"retail\_costs": {},
"pricing\_breakdown": [],
"shipments": [],
"gift": {},
"packing\_slip": {}
}
}
Confirm draft for fulfillment
Approves for fulfillment an order that was saved as a draft. Store owner's credit card is charged when the order is submitted for fulfillment.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
post/orders/{id}/confirm
Request samples
Curl
PrintfulSdk
Copy
curl --location --request POST 'https://api.printful.com/orders/{order\_id}/confirm' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 13,
"external\_id": "4235234213",
"store": 10,
"status": "draft",
"shipping": "STANDARD",
"shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
"created": 1602607640,
"updated": 1602607640,
"recipient": {},
"items": [],
"branding\_items": [],
"incomplete\_items": [],
"costs": {},
"retail\_costs": {},
"pricing\_breakdown": [],
"shipments": [],
"gift": {},
"packing\_slip": {}
}
}
Estimate order costs
Calculates the estimated order costs including item costs, print costs (back prints, inside labels etc.), shipping and taxes
Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/orders/estimate-costs
Request samples
Payload
Curl
PrintfulSdk
Content type
application/json
Copy
Expand allCollapse all
{
"external\_id": "4235234213",
"shipping": "STANDARD",
"recipient": {
"name": "John Smith",
"company": "John Smith Inc",
"address1": "19749 Dearborn St",
"address2": "string",
"city": "Chatsworth",
"state\_code": "CA",
"state\_name": "California",
"country\_code": "US",
"country\_name": "United States",
"zip": "91311",
"phone": "2312322334",
"email": "firstname.secondname@domain.com",
"tax\_number": "123.456.789-10"
},
"items": [
{}
],
"retail\_costs": {
"currency": "USD",
"subtotal": "10.00",
"discount": "0.00",
"shipping": "5.00",
"tax": "0.00"
},
"gift": {
"subject": "To John",
"message": "Have a nice day"
},
"packing\_slip": {
"email": "your-name@your-domain.com",
"phone": "+371 28888888",
"message": "Message on packing slip",
"logo\_url": "​http://www.your-domain.com/packing-logo.png",
"store\_name": "Your store name",
"custom\_order\_id": "kkk2344lm"
}
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"costs": {},
"retail\_costs": {}
}
}
File Library API
To avoid the need to upload every file again when the same item is ordered, your print files are stored in the File Library and can be reused.
You can use this API to directly add files to the library, and later use File IDs when creating orders. However, the more convenient way is to specify the files by URL at the same time the order is created.
Most probably you will never need to use this API - just specify the file URL when creating orders and the files will be added automatically.
File processing can be very time-consuming, so they are processed asynchronously. After you add a file, it is saved with the status waiting and downloaded and processed later. Afterward, the status is changed to ok if the file was loaded successfully and was a valid image file or failed if the process did not succeed. Some file metadata fields like dimensions and resolution are only filled in after the file has been processed.
If an order with a file has been confirmed before the file was processed, and the file turns out to be invalid, then the order is reverted to a failed state and needs to be corrected and confirmed again.
If you try to add a file that has an identical URL to an already existing file, then no new file is created, and the system returns the old one without refreshing its contents.
Remember
If you have changed the original, make sure that the URL is changed as well for future orders, otherwise the old version will be reused.
You can add a “last modified” timestamp to the end of the URL to ensure that the URL is different for changed files.
Files that are added through the API can be set not to show up in the File library on the web, just set the visible attribute to false when creating them.
Caution: API endpoint "Get list of files" (/files) is removed and can no longer be used. Calling this endpoint will return a HTTP 410 (Gone) response.
Add a new file
Adds a new File to the library by providing URL of the file.
If a file with identical URL already exists, then the original file is returned. If a file does not exist, a new file is created.

Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/files
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"type": "default",
"url": "​https://www.example.com/files/tshirts/example.png",
"options": [
{}
],
"filename": "shirt1.png",
"visible": true
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"type": "default",
"id": 10,
"url": "​https://www.example.com/files/tshirts/example.png",
"options": [],
"hash": "ea44330b887dfec278dbc4626a759547",
"filename": "shirt1.png",
"mime\_type": "image/png",
"size": 45582633,
"width": 1000,
"height": 1000,
"dpi": 300,
"status": "ok",
"created": 1590051937,
"thumbnail\_url": "",
"preview\_url": "",
"visible": true,
"is\_temporary": false
}
}
Get file
Returns information about the given file.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/files/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/files/{123}' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"type": "default",
"id": 10,
"url": "​https://www.example.com/files/tshirts/example.png",
"options": [],
"hash": "ea44330b887dfec278dbc4626a759547",
"filename": "shirt1.png",
"mime\_type": "image/png",
"size": 45582633,
"width": 1000,
"height": 1000,
"dpi": 300,
"status": "ok",
"created": 1590051937,
"thumbnail\_url": "",
"preview\_url": "",
"visible": true,
"is\_temporary": false
}
}
Return available thread colors from provided image URL
Returns colors in hexadecimal format.
Returned thread colors are matched as closely as possible to provided image colors.

Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/files/thread-colors
Request samples
Payload
Curl
Content type
application/json
Copy
{
"file\_url": ""
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"thread\_colors": [
"#FFFFFF"
]
}
Shipping Rate API
The Shipping rate API calculates the shipping rates for an order based on the recipient's location and the contents of the order.
The returned shipping rate ID can be used to specify the shipping method when creating an order.
See  for information about the Country codes.
See  for information about the Variant IDs.
Rate limiting: The default rate limit is 120 requests per 60 seconds.
Warning: If the summary item quantity count exceeds 100 then the rate limit is changed to 5 requests per 60 seconds.
A 60 seconds lockout is applied if request count is exceeded.
Calculate shipping rates
Returns available shipping options and rates for the given list of products.
Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
post/shipping/rates
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"recipient": {
"address1": "19749 Dearborn St",
"city": "Chatsworth",
"country\_code": "US",
"state\_code": "CA",
"zip": "91311",
"phone": "string"
},
"items": [
{}
],
"currency": "USD",
"locale": "en\_US"
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Ecommerce Platform Sync API
The ecommerce platform sync API allows you to automatically assign Printful products and print files to the products in your online store (Shopify, Woocommerce, etc.) that is linked to Printful.
Sync Products & Sync Variants explained
Each product in your store can contain one or multiple variants (some ecommerce platforms would call these options) that the customer can purchase (imagine multiple sizes or colors of the same t-shirt design). When you link your ecommerce store to Printful, we create a copy of your product and variant lists on our side - we call it Sync Products and Sync Variants.
Similar to your store, products that are sold by Printful also consist of multiple variants. Each t-shirt model is available in many sizes and colors.

The purpose of Sync Variants is to let you link each variant from your store that will be fulfilled by Printful with a design file(s) and specific variant from Printful product catalogue. When synced products are ordered, we'll know which Printful product needs to be printed, and the order is imported into Printful for fulfillment.
You can configure each Sync Variant in the Printful Dashboard manually. However, that can be quite a tedious and repetitive task if your store sells hundreds of products. This API is designed to help you automate this process.
Remember
Product data is not imported to Printful immediately after the product is created/updated in your ecommerce platform. Depending on the platform, it can take from a couple of seconds up to a few hours for the products to be available on Printful. Before the products are imported, you will not be able to update product information through this API.
External ID
External ID is a feature that allows you to reference Sync Products and Sync Variants by using the ID from your store.
When requesting Sync Products and Sync Variants, you can use both the Printful ID and your External ID (if you prefix it with the @ symbol).
GET /sync/products/11001 - reference by Printful Sync Product ID
GET /sync/products/@988123 - reference by Shopify (or other platform's) Product ID
GET /sync/variant/123456 - reference by Printful Sync Variant ID
GET /sync/variant/@123123 - reference by Shopify (or other platform's) Variant ID
Specifying products
To specify the exact variant of the product, you have to use the variant\_id attribute of the order item. Each available unique item (including size/color) has its own Variant ID that can be acquired through the .
Adding print files
There are two ways to assign a print file to the item. One is to specify the File ID if the file already exists in the file library of the authorized store:
...
"files":
 [
 {
 "id": 12345
 },
 ],
...
Second, and the most convenient method is to specify the file URL. If a file with the same URL already exists, it will be reused:
...
"files":
 [
 {
 "url": "http://example.com/t-shirts/123/front.pdf"
 },
 ],
...
Specifying multiple files per item
Each item in the order has to be linked with one or multiple files. The available file types for each product are available from the .
You can add one file for each type by specifying the type attribute. For the default type, this attribute can be skipped.
...
"files":
 [
 {
 "type": "default",
 "url": "http://example.com/t-shirts/123/front.pdf"
 },
 {
 "type": "back",
 "url": "http://example.com/t-shirts/123/back.pdf"
 }
 ],
...
Remember that using additional files can increase the price of the item.

Get list of Sync Products
Returns list of Sync Product objects from your store.
Authorizations:
OAuth
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/sync/products
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/sync/products' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"paging": {
"total": 100,
"offset": 10,
"limit": 100
},
"result": [
{}
]
}
Get a Sync Product
Get information about a single Sync Product and its Sync Variants
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/sync/products/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/sync/products/161636640' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_product": {},
"sync\_variants": []
}
}
Delete a Sync Product
Deletes a Sync Product with all of its Sync Variants
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
delete/sync/products/{id}
Request samples
Curl
Copy
curl --location --request DELETE 'https://api.printful.com/sync/products/161636640' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_product": {},
"sync\_variants": []
}
}
Get a Sync Variant
Get information about a single Sync Variant
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/sync/variant/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/sync/variant/1781126748' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_variant": {},
"sync\_product": {}
}
}
Modify a Sync Variant
Modifies an existing Sync Variant.
Please note that in the request body you only need to specify the fields that need to be changed. See examples for more insights.
Rate limiting: Up to 10 requests per 60 seconds. A 60 seconds lockout is applied if request count is exceeded.

Authorizations:
OAuth
path Parameters
header Parameters
Request Body schema: application/json
required
PUT request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
put/sync/variant/{id}
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"variant\_id": 3001,
"retail\_price": "29.99",
"sku": "SKU1234",
"is\_ignored": false,
"files": [
{}
],
"options": [
{}
]
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_variant": {},
"sync\_product": {}
}
}
Delete a Sync Variant
Deletes configuraton information (variant\_id, print files and options) and disables automatic order importing for this Sync Variant.
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
delete/sync/variant/{id}
Request samples
Curl
Copy
curl --location --request DELETE 'https://api.printful.com/sync/variant/1781126748' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"sync\_variant": {},
"sync\_product": {}
}
}
Country/State Code API
To create an order, you have to use country and state codes to specify the recipient address. Both country code and state code are mandatory for orders to the USA, Canada and Australia. For other countries only the country code is needed to create an order.
Country codes are based on the ISO 3166-1 alpha-2 standard and are two letters long.
State codes are based on the ISO 3166-2 standard by omitting the country code part of the code and are used only for the USA, Canada, Japan and Australia.
All state/country codes that Printful accepts can be listed by this API.
Retrieve country list
Returns list of countries and states that are accepted by the Printful.
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/countries
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/countries'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Tax Rate API
Get a list of countries for tax calculation
Retrieve state list that requires sales tax calculation
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/tax/countries
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/tax/countries'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Calculate tax rate Deprecated
Calculates sales tax rate for given address if required
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
404
Not found
post/tax/rates
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"recipient": {
"country\_code": "US",
"state\_code": "CA",
"city": "Chatsworth",
"zip": "91311"
}
}
Response samples
200
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"required": true,
"rate": 0.095,
"shipping\_taxable": false
}
}
Webhook API
Webhooks are an API feature that allows your system to receive notifications about certain events.
When an event occurs, the Printful server () will make a POST request to your defined URL that will contain a JSON object in the request body. Your server has to respond with HTTP status 2xx OK, otherwise, the request will be retried in increasing intervals (after 1, 4, 16, 64, 256 and 1024 minutes).
The JSON object will always contain these attributes:
Please use  to test your webhook event receiver.
To set up webhooks, use API requests described below:
Package shipped Webhook
Is called when a shipment with all or part of the ordered items is shipped.
If the order is shipped in multiple shipments, this event will be called for every shipment sent.
If some items are reshipped, a shipping notification will be sent again for the same items.
Request Body schema: application/json
Package shipped.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "package\_shipped",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"shipment": {},
"order": {}
}
}
Package returned Webhook
Is called when a shipment is processed as returned to the fulfillment facility. To learn more about the reasons why a shipment might be returned, take a look at Printful's Return Policy
Request Body schema: application/json
Package returned.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "package\_returned",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"shipment": {},
"order": {}
}
}
Order created Webhook
Is called when the order is first created.
Request Body schema: application/json
Order created.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_created",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"order": {}
}
}
Order updated Webhook
Is called when an existing order gets updated for any reason - including things that are covered with other webhooks like order\_canceled.
Request Body schema: application/json
Order updated.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_updated",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"order": {}
}
}
Order failed Webhook
Is called when a confirmed order changes its status to failed.
It can happen, for example, if printfiles can not be downloaded, are not valid image files or when there is a payment failure.
Request Body schema: application/json
Order failed.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_failed",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"order": {}
}
}
Order canceled Webhook
Is called when a confirmed order changes its status to canceled.
It can happen when a submitted order is canceled from the dashboard or through the API or when the order is canceled by the Printful staff.
Request Body schema: application/json
Order canceled.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_canceled",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"order": {}
}
}
Product synced Webhook
Is called when a new product or variant is imported from the store's ecommerce integration.
See 
Request Body schema: application/json
Product synced.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "product\_synced",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"sync\_product": {}
}
}
Product updated Webhook
Is called when a new product or variant is created or updated in any way.
See 
Request Body schema: application/json
Product updated.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "product\_updated",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"sync\_product": {}
}
}
Product deleted Webhook
Is called when a new product or variant is deleted.
See 
Request Body schema: application/json
Product deleted.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "product\_deleted",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"sync\_product": {}
}
}
Stock updated Webhook
Is called when stock is updated for some of a product's variants.
Contains product id and ids of it's discontinued variants and variants that are out of stock. Variant ids that are not present should be considered as active and in stock.
Request Body schema: application/json
Stock updated.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "stock\_updated",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"product\_id": 9001,
"variant\_stock": {}
}
}
Order put hold Webhook
Is called when order is put on hold.
Request Body schema: application/json
Order put on hold.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_put\_hold",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"order": {}
}
}
Order put hold approval Webhook
Is called when order is put on hold and there are changes that must be approved by the customer before fulfillment. Will contain a confirm hash that can be used to approve changes with the Approval Sheets Api.
Request Body schema: application/json
Order put on hold because it needs customer approval. You will receive an approval sheet with suggested changes and a confirmation hash so you can approve the changes if you agree with them.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_put\_hold\_approval",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"approval\_files": [],
"order": {}
}
}
Order remove hold Webhook
Is called when order is removed from hold.
Request Body schema: application/json
Order removed from on hold.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_remove\_hold",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"reason": "string",
"order": {}
}
}
Order refunded Webhook
Is called when a confirmed order has been refunded.
Request Body schema: application/json
Order refunded.
Responses
2xx
Data received
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"type": "order\_refunded",
"created": 1622456737,
"retries": 2,
"store": 12,
"data": {
"amount": "13.50",
"order": {}
}
}
Get webhook configuration
Returns configured webhook URL and list of webhook event types enabled for the store
Authorizations:
OAuth
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/webhooks
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/webhooks' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"url": "​https://www.example.com/printful/webhook",
"types": [],
"params": {}
}
}
Set up webhook configuration
Use this endpoint to enable a webhook URL for a store and select webhook event types that will be sent to this URL.
Note that only one webhook URL can be active for a store, so calling this method disables all existing webhook configuration.
Setting up the  webhook requires passing IDs for products that need to be monitored for changes. Stock update webhook will only include information for specified products. These product IDs need to be set up using the params property.
Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/webhooks
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"url": "​https://www.example.com/printful/webhook",
"types": [
"package\_shipped",
"stock\_updated"
],
"params": {
"stock\_updated": {}
}
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"url": "​https://www.example.com/printful/webhook",
"types": [],
"params": {}
}
}
Disable webhook support
Removes the webhook URL and all event types from the store.
Authorizations:
OAuth
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
delete/webhooks
Request samples
Curl
Copy
curl --location --request DELETE 'https://api.printful.com/webhooks' \
--header 'Content-Type: application/json'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"url": "​https://www.example.com/printful/webhook",
"types": [],
"params": {}
}
}
Store Information API
Change packing slip
Modifies packing slip information of the currently authorized Printful store.
Authorizations:
OAuth
header Parameters
Request Body schema: application/json
required
POST request body
Any of 
OrderPackingSlipOrderPackingSlipOrderPackingSlipOrderPackingSlip
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/store/packing-slip
Request samples
Payload
Curl
Content type
application/json
Copy
{
"email": "your-name@your-domain.com",
"phone": "+371 28888888",
"message": "Message on packing slip",
"logo\_url": "​http://www.your-domain.com/packing-logo.png",
"store\_name": "Your store name",
"custom\_order\_id": "kkk2344lm"
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"packing\_slip": {}
}
}
Get basic information about stores
Get basic information about stores depending on the token access level
Authorizations:
OAuth
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
403
Forbidden
get/stores
Response samples
200
400
401
403
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"paging": {
"total": 100,
"offset": 10,
"limit": 100
},
"result": [
{}
]
}
Get basic information about a store
Get basic information about a store based on provided ID
Authorizations:
OAuth
path Parameters
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
403
Forbidden
get/stores/{id}
Response samples
200
400
401
403
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 10,
"type": "native",
"name": "My Store"
}
}
Mockup Generator API
To generate mockups, first, you need to decide on which products you want them. API methods on retrieving products and variants can be found in the .
Note: Remember to distinguish the difference between a product id and a variant id. Some API endpoints require an id from a variant and some from a product.
Important: Jewelry products are not supported via API.
Print files
A print file defines resolution which should be used to create a mockup or to submit an actual order.
Information about product variant print files can be retrieved from the .
For example, a 10×10 poster requires a 1500×1500 pixel print file to produce a 150 DPI print. You can use higher resolution files to achieve a better result, but keep the side aspect ratio the same as the defined for the print file. That means, if you use a 3000×3000 pixel file, it will produce a 300 DPI print. But if you use a 3000×1500 pixel file ( different aspect ratio) on a 10×10 poster, some cropping will occur. Print file's fill\_mode parameter defines if cropping will happen, or the file will be fitted on the resulting print area of the product.
Some print files can be rotated. can\_rotate field defines this feature. This mostly applies to wall art products and should be used if you want to generate a horizontal or a vertical product mockup.
Wall art print files are defined horizontally. If you wish to create a vertical mockup, you can rotate the file's print file and the generated mockup will be in the given orientation. For example, 16×12 poster print file is 2400×1800 pixels which generate it horizontally. If you wish to get a vertical mockup, you create the print file as 1800×2400 pixels. The same strategy applies when you submit an order.
Print files are often re-used for multiple variants and products. For example, a 14×14 poster uses the same print file as a framed poster. Most of the t-shirt front prints use the same print file too.
Note: When you generate mockups there is no need to provide a full-sized print file. Mockups are generated up to 2000px wide, so you can downscale your print file to 2000px. This will reduce the processing time on your and Printful's side. Print file image file size limit: 50MB.
Mockup generation
Mockup generation requires some time, that is why it cannot happen in real-time.
When you request a mockup to be generated, a task is created and you receive the task key which can then be used to retrieve the generated mockup list. We cannot guarantee that after a certain time the mockups will be generated, so you will have to check frequently if the task is done. The first request for a result should not be sooner than 10 seconds. So plan that the generation task will be done in two steps - creating a task and the checking with intervals if the task is ready.
Important
URLs to mockup images are temporary, they will expire after 72h, so you have to store them on your server.
Process flow
Decide which product variants you want to generate.
Retrieve the list of print files for chosen product and variants. Use the variant print file mappings to determine which print file you need to generate for specific placement on a specific product's variant.
Upload your file to a public URL that matches the print file size ratio (or provide positions for the generation request)
Create a mockup generation task and store the task key.
Use the task key to check if the task is completed. If still pending, repeat after an interval.
When the task is done, download and store mockups on your server. Mockup URLs are temporary and will be removed after a day.
Available techniques
The /mockup-generator/printfiles/{id} and /mockup-generator/templates/{id} endpoint accept technique parameter.
The following table presents the available values of this parameter.
Usage example
Let's take an example. You want to offer users to design of their t-shirt.
We'll pick this shirt as an example 
Its product id is 71.
Let's fetch some variants available for this shirt: https://api.printful.com/products/71
We'll choose a white and black shirt in M, L, XL sizes. Respective variant ids: 4012, 4013, 4014, 4017, 4018 and 4019.
Next, we need to get the print file sizes for these variants: https://api.printful.com/mockup-generator/printfiles/71
We see that there are two placements available for this product - front and back. Posters, for example, will only have one placement called default.
By looking up our picked variant ids, we see that they all use the same print file for back and front prints:
{
 "product\_id": 71,
 "available\_placements": {
 "front": "Front print",
 "back": "Back print",
 "label\_outside": "Outside label"
 },
 "printfiles": [
 {
 "printfile\_id": 1,
 "width": 1800,
 "height": 2400,
 "dpi": 150,
 "fill\_mode": "fit",
 "can\_rotate": false
 }
 ],
 "variant\_printfiles": [
 {
 "variant\_id": 4012,
 "placements": {
 "front": 1,
 "back": 1
 }
 }
 ]
}
dpi For given width and height, this is the resulting DPI on the actual product.
fill\_mode Possible values: "fit" or "cover". Indicates in what mode mockups will be generated.
can\_rotate Posters, for example, allow rotation. If you pass the image in horizontal positions.
placements.front Printfile id.
We can see that the full print file size is 1800×2400 for back and front prints for chosen variants.
When we know the size of the print file, we need to calculate the positions. Position values are relative here, image size does not have to match the width and height of positions. When mockup is generated we will fit the position area inside the print area or will cover it, depending on the print file fill\_mode value.
Positions given below would result in a square image centered vertically within the print area.
{
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
}
area\_width Relative width of the print area.
area\_height Relative height of the print area.
width Relative width of your image.
height Relative height of your image.
top Relative image top offset within the area.
left Relative image left offset within the area.
Important
For posters, canvas, and other products which print files allow rotation (can\_rotate value in ) you can flip width and height to create a product mockup that is horizontal or vertical.
Once we have calculated the positions, we can perform the actual mockup generation using the : POST to https://api.printful.com/mockup-generator/create-task/71 with body parameters:
{
 "variant\_ids": [
 4012,
 4013,
 4014,
 4017,
 4018,
 4019
 ],
 "format": "jpg",
 "files": [
 {
 "placement": "front",
 "image\_url": "http://your-site/path-to-front-printfile.jpg",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 },
 {
 "placement": "back",
 "image\_url": "http://your-site/path-to-back-printfile.jpg",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ]
}
In response, you will receive the task key and current task status:
{
 "task\_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 "status": "pending"
}
After an interval of a few seconds, you can try to check for the result by calling a GET request on https://api.printful.com/mockup-generator/task?task\_key=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx If the task is completed, the response will be like this:
{
 "task\_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 "status": "completed",
 "mockups": [
 {
 "variant\_ids": [
 4011,
 4012,
 4013
 ],
 "placement": "front",
 "mockup\_url": "https://url-to/front-mockup.png"
 },
 {
 "variant\_ids": [
 4011,
 4012,
 4013
 ],
 "placement": "back",
 "mockup\_url": "https://url-to/back-mockup.png"
 },
 {
 "variant\_ids": [
 4016,
 4017,
 4018
 ],
 "placement": "front",
 "mockup\_url": "https://url-to/front-mockup.png"
 },
 {
 "variant\_ids": [
 4016,
 4017,
 4018
 ],
 "placement": "back",
 "mockup\_url": "https://url-to/back-mockup.png"
 }
 ]
}
At this point, you just have to download the mockup URLs and store them on your server and you're good to go!
Layout templates
If you wish to build your mockup generator UI, this is the place to start. Using the  you can get template images and positions necessary to create a tool where your users can position their files on.
If you want to create a mug generator, for example, you call the endpoint /mockup-generator/templates/19 with mug product ID. By looking at the variant mapping field, we can determine that for variant 1320 11oz mug we have to use the template with ID 919. This is what template structure looks like:
{
 "template\_id": 919,
 "image\_url": "https://www.printful.com/files/generator/40/11oz\_template.png",
 "background\_url": null,
 "background\_color": null,
 "printfile\_id": 43,
 "template\_width": 560,
 "template\_height": 295,
 "print\_area\_width": 520,
 "print\_area\_height": 202,
 "print\_area\_top": 18,
 "print\_area\_left": 20,
 "is\_template\_on\_front": true
}
printfile\_id We can retrieve the actual printfile size from the printfiles endpoint.
template\_width This is the main container width, pixels.
template\_height Main container height.
print\_area\_width Inner area where positioning happens.
print\_area\_height Inner area.
print\_area\_top Offset from the main container.
print\_area\_left Offset from the main container.
is\_template\_on\_front This indicates if we should show the user image below or above the template image.
Given this information, we can create a simple HTML markup:



![Printful logo](https://printful.com/static/images/layout/logo-printful.png)



Which would look like this in the browser:

To generate mockups with positions above, we perform a POST request to https://api.printful.com/mockup-generator/create-task/19 with body parameters:
{
 "variant\_ids": [
 1320
 ],
 "format": "jpg",
 "files": [
 {
 "placement": "default",
 "image\_url": "https://www.printful.test/static/images/layout/logo-printful.png",
 "position": {
 "area\_width": 520,
 "area\_height": 202,
 "width": 140,
 "height": 63,
 "top": 77,
 "left": 43
 }
 }
 ]
}
area\_width Value of print\_area\_width in the template.
area\_height Value of print\_area\_height in the template.
width Image width.
height Image height.
top Image top offset in area.
left Image left offset in area.
Choosing mockup styles
To choose which mockup styles to generate, you have to specify options and option\_groups parameters in the request. If these parameters are not present in the request, the system will generate the first available mockup. If you are not planning to utilize all available mockups, it is advised to limit the requested mockups. Not limiting requested mockups will cause bigger task processing times and overall resource waste.
To find available options and option\_groups for a given product, you have to use /mockup-generator/printfiles/{id} endpoint and search for options and option\_groups fields in the response. See examples below.
{
 "variant\_ids": [4021],
 "format": "png",
 "option\_groups": ["Flat"],
 "options": ["Front"],
 "files": [
 {
 "placement": "front",
 "image\_url": "https://www.printful.com/static/images/layout/logo-printful.png"
 }
 ]
}
Using lifelike effect
Lifelike is a feature that simulates how dark designs will look over dark colour products and is only used in mockup generation. For that, an extra file with special effect is created for each placement.
{
 "variant\_ids": [4018],
 "format": "png",
 "product\_options": {
 "lifelike": true
 },
 "files": [
 {
 "placement": "front",
 "image\_url": "https://www.printful.com/static/images/layout/logo-printful.png"
 }
 ]
}
Create a mockup generation task
Creates an asynchronous mockup generation task. Generation result can be retrieved using mockup generation task retrieval endpoint.
Rate limiting: Up to 10 requests per 60 seconds for established stores; 2 requests per 60 seconds for new stores. Currently available rate is returned in response headers. A 60 seconds lockout is applied if request count is exceeded. We also limit the number of files that may be generated to 20,000 files per account in a 24-hour period.
Authorizations:
OAuth
path Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
post/mockup-generator/create-task/{id}
Request samples
Payload
Curl
Content type
application/json
Copy
Expand allCollapse all
{
"variant\_ids": [
4012,
4013,
4014,
4017,
4018,
4019
],
"format": "jpg",
"width": 0,
"product\_options": { },
"option\_groups": [
"string"
],
"options": [
"string"
],
"files": [
{}
],
"product\_template\_id": 123
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"task\_key": "123456",
"status": "completed",
"error": "string",
"mockups": [],
"printfiles": []
}
}
Retrieve product variant printfiles
List of printfiles available for products variants. Printfile indicates what file resolution should be used to create a mockup or submit an order.
This endpoint uses DTG as a default printing technique for products with more than one technique available. For products with DTG and more techniques available please specify the correct technique in query by using the `technique` parameter. For more information read the .
Authorizations:
OAuth
path Parameters
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/mockup-generator/printfiles/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/mockup-generator/printfiles/1' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"product\_id": 71,
"available\_placements": {},
"printfiles": [],
"variant\_printfiles": [],
"option\_groups": [],
"options": []
}
}
Mockup generation task result
Returns asynchronous mockup generation task result. If generation task is completed, it will contain a list of generated mockups.
Authorizations:
OAuth
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/mockup-generator/task
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/mockup-generator/task?task\_key=3123' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"task\_key": "123456",
"status": "completed",
"error": "string",
"mockups": [],
"printfiles": []
}
}
Layout templates
Retrieve list of templates that can be used for client-side positioning.
This endpoint uses DTG as a default printing technique for product layouts with more than one technique available. For products with DTG and more techniques available please specify the correct technique in query by using the `technique` parameter. For more information read the .
Authorizations:
OAuth
path Parameters
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/mockup-generator/templates/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/mockup-generator/templates/71' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"version": 1,
"min\_dpi": 300,
"variant\_mapping": [],
"templates": [],
"conflicting\_placements": []
}
}
Warehouse Products API
Warehouse Products API
Get a list of your warehouse products
Returns a list of warehouse products from your store
The response for this endpoint was documented as paginated, although it was not paginated. The behavior will be fixed and the paginated result will be set as the default. Currently to get paginated results please send trueor 1 in X-PF-Force-Pagination header.
Authorizations:
OAuth
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
get/warehouse/products
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/warehouse/products?query=some?offset=0&limit=100' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
],
"paging": {
"total": 100,
"offset": 10,
"limit": 100
}
}
Get warehouse product data
Returns warehouse product data by ID
Authorizations:
OAuth
path Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
401
Unauthorized
404
Not found
get/warehouse/products/{id}
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/warehouse/products/12' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 12,
"name": "Some product name",
"status": "draft",
"currency": "USD",
"image\_url": "url.to/your/image/location.png",
"retail\_price": 12.99,
"variants": []
}
}
Reports API
The Reports API lets you retrieve reports like the statistics related to the orders fulfilled for your stores.
Get statistics
Returns statistics for specified report types.
You need to specify the report types you want to retrieve in the report\_types query parameter as a comma-separated list, e.g. report\_types=sales\_and\_costs,profit.
Note: You cannot get statistics for a period longer than 6 months.
Example
To get statistics in the default currency of a store for sales\_and\_costs and profit reports for August 2022, you can use the following URL: .
Report types
Currently, the following report types are available:
The response structure for the specific reports is documented in the response schema (result.store\_statistics.[reportName]).
Authorizations:
OAuth
query Parameters
header Parameters
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
get/reports/statistics
Request samples
Curl
Copy
curl --location --request GET 'https://api.printful.com/reports/statistics?report\_types=sales\_and\_costs,profit&date\_from=2022-08-01&date\_to=2022-08-31&currency=PLN' \
--header 'Authorization: Bearer {oauth\_token}'
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"store\_statistics": []
}
}
Approval Sheets API
Approval Sheets API
Retrieve a list of approval sheets
Retrieve a list of approval sheets confirming suggested changes to files of on hold orders.
header Parameters
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
get/approval-sheets
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": [
{}
]
}
Approve a design
Uses the confirm hash of an approval sheet to approve a design and remove the hold on an order
query Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
404
Not found
post/approval-sheets
Request samples
Payload
Content type
application/json
Copy
{
"status": "approved"
}
Response samples
200
400
401
404
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"message": "Design approval submitted successfully"
}
}
Submit changes to an approval sheet
Use this to submit alternative changes to a design that has an approval sheet
query Parameters
header Parameters
Request Body schema: application/json
required
POST request body
Responses
200
OK
Response Schema: application/json
400
Bad Request
401
Unauthorized
post/approval-sheets/changes
Request samples
Payload
Content type
application/json
Copy
Expand allCollapse all
{
"message": "The design needs to be aligned to the left",
"files": [
{}
]
}
Response samples
200
400
401
Content type
application/json
Copy
Expand allCollapse all
{
"code": 200,
"result": {
"id": 2,
"status": "waiting\_for\_action",
"confirm\_hash": "a14e51714be01f98487fcf5131727d31",
"submitted\_design": "",
"recommended\_design": "",
"approval\_sheet": ""
}
}
Common
Options
Options allow for additional modification of how product will look.
List of currently available thread color options
List of currently available Text thread color options
List of currently available other options
List of currently available file options
Placements
Complete list of every placement
Embroidery
Manually defining thread colors
Whenever the embroidery placement is used it's also necessary to specify thread colors which should be used. Thread color option must be matched with .
To determine what thread colors could be used you can use  and then adjust thread colors manually according to your taste.
Note that you can specify max 6 thread colors
"files": [
 {
 "type": "embroidery\_outside\_left",
 "url": "https://www.printful.com/static/images/layout/printful-logo.png"
 }
],
"options": [
 {
 "id": "thread\_colors\_outside\_left",
 "value": ["#FFFFFF", "#000000", "#96A1A8", "#A67843", "#FFCC00", "#E25C27"]
 }
]
Automatic thread color
Instead of providing thread colors manually you can also use the auto\_thread\_color which will match available thread colors to provided image.
"files": [
 {
 "type": "embroidery\_outside\_left",
 "url": "https://www.printful.com/static/images/layout/printful-logo.png",
 "options": [
 {
 "id": "auto\_thread\_color",
 "value": true
 }
 ]
 }
]
Unlimited color
When using the embroidery technique you are limited to a range of predefined thread colors. If you would like to use an unlimited range of thread colors please use Unlimited Color (additional cost will be added). To use Unlimited Color add for each file object an extra parameter in options with id: full\_color. While using Unlimited Color you don’t need to specify thread colors. The full\_color option can be used in Orders, Products, Mockup Generator and Ecommerce Platform Sync API.
"items": [
 {
 "variant\_id": 4468,
 "quantity": 1,
 "files": [
 {
 "type": "embroidery\_back",
 "url": "https://www.printful.com/static/images/layout/printful-logo.png",
 "options": [
 {
 "id": "full\_color",
 "value": true
 }
 ]
 }
 ]
 }
]
Unlimited color is available for selected products. To distinguish products with unlimited color option and pricing please see catalog  response for a product with this option available.

Other resources
Developer support
If you have a technical question related to our API you can contact our Developer Support at .
Once we have successfully got your question you will receive the following auto generated message:
Dear xyz,

This is an automated response to let you know that we are processing your request.

A support representative will review your question as soon as possible to provide an answer.

The waiting time for the first response shouldn't exceed 24 hours, excluding weekends and holidays.

However, it is usually sent much faster if the ticket was created during the business hours (Monday-Friday, 9 am to 5 pm CET/CEST).
If you don't receive that auto generated message please try to use a different email or register a ticket using our .
Bug reporting
We appreciate your help in reporting any bugs you may find. It helps us keep Printful running more securely and smoothly for Printful and all of our customers.
To report a development bug, add the following information:
A detailed description of the bug;
A video or screenshots for extra clarification (PoC);
Instructions on how to replicate the bug.
To report a security vulnerability (bug bounty):
Note: We only accept vulnerabilities with CVSSv3 score >= 5.0 through e-mail communication. CVSSv3 score must be included in the subject of the e-mail.
Detailed instructions on how to replicate the bug (PoC);
A screen capture of the bug execution on Printful resource either attached or linked;
Links to references and corresponding CVEs.
Disclaimer: Any external testing that negatively affects the Printful asset's Confidentiality, Integrity, or Availability while performing tests without prior agreement will be classified as unlawful and further Legal actions from Printful may follow.
We recommend signing up for our HackerOne bug bounty program for long-term cooperation.

Types of bugs:
Development bugs: All functional bugs report to: 
Security vulnerabilities: All bugs that may impact the security report to: 
Webhook Simulator
 is a tool that allows you to test your webhook functionality. It will send a selected event type to your webhook URL. This way you will be able to easily develop and test your webhook handlers.
Tutorials
Make your first order through the API
Introduction
In this tutorial, we're going to show you how to start making orders through the Printful API. You will learn to send postcards to friends or customers through the API, and select new images or addresses for every order.
You'll be able to take the lessons learned here and start making orders for any kind of product for your customers.
Set up
Before anything else make sure you have created a native or "manual order platform store" if you haven't already.
Go to this link: .
Click the "Create" button under "Manual order platform/API"
Choose a name and click continue
As well as this you will need to create an OAuth token for this store.
Go to the developer portal: 
Sign in with your Printful account
Go to this link: 
Make sure you have set the access level to "A single store" and select your store
Make sure you have the following scopes selected for this tutorial:
orders ("View and manage orders of the authorized store")
Fill in all other fields as you please
Create your token
You will receive an access key, you will only see the token once, store it securely
To double-check that your token works, and that you have the right store selected, try running the following command replacing {your\_token} with the access token created in the developer portal.
curl --location --request GET 'https://api.printful.com/stores' \
--header 'Authorization: Bearer {your\_token}'
You should see your store in the response. If you don't see the right store there, or you get an error, double-check the token is correct and if necessary create a new token
Making an order
Before starting let's figure out what we need to make an order through the Printful API.
According to  there are only two fields in the create orders request that are absolutely required, the recipient object and the items array. So let's focus on those for now.
The recipient
Let's start with the recipient, this will depend on the location you want to send it to. Mine will look like this:
{
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
}
Not all state and country codes are accepted by Printful, so I double-check to make sure that AU and NSW are accepted by running this curl command:
curl --location --request GET 'https://api.printful.com/countries' \
--header 'Authorization: Bearer {your\_token}'
{
 "code": 200,
 "result": [
 {
 "name": "Australia",
 "code": "AU",
 "states": [
 ...,
 {
 "code": "NSW",
 "name": "New South Wales"
 },
 ...
 ]
 }
 ],
 "extra": []
}
Sure enough, both codes are there.
Note: If your recipient isn't in the US, Australia, or Canada the state code is not necessary. .
The items
We only want one item, but first, we have to find the variant\_id of that item.
Let's first see if we can find a category that might have postcards in it, with this command:
curl --location --request GET 'https://api.printful.com/categories' \
--header 'Authorization: Bearer {your\_token}'
Thankfully there's a postcard category.
{
 "code": 200,
 "result": [
 ...,
 {
 "id": 197,
 "parent\_id": 190,
 "image\_url": "https://s3-printful.stage.printful.dev/upload/catalog\_category/da/da6caac995335b87ace2d79af70eef5f\_t?v=1652883254",
 "title": "Postcards"
 },
 ...
 ],
 "extra": []
}
Now let's see what options there are in that category
curl --location --request GET 'https://api.printful.com/products?category\_id=197' \
--header 'Authorization: Bearer {your\_token}'
{
 "id": 433,
 "main\_category\_id": 197,
 "type": "POSTCARD",
 "type\_name": "Standard Postcard",
 "title": "Standard Postcard",
 "brand": null,
 "model": "Standard Postcard",
 "image": "https://s3-printful.stage.printful.dev/products/433/product\_1602054891.jpg",
 "variant\_count": 1,
 "currency": "USD",
 "options": [],
 "dimensions": null,
 "is\_discontinued": false,
 "avg\_fulfillment\_time": null,
 "techniques": [
 {
 "key": "DIGITAL",
 "display\_name": "Digital printing",
 "is\_default": true
 }
 ],
 "files": [
 {
 "id": "default",
 "type": "default",
 "title": "Print file",
 "additional\_price": null
 },
 {
 "id": "preview",
 "type": "mockup",
 "title": "Mockup",
 "additional\_price": null
 }
 ],
 "description": "These postcards are made from thick high-quality matte paper, so they serve as a great addition to a gift or just a thoughtful written note to a friend.\n• Cardboard paper\n• Paper weight: 7.67–10.32 oz/yd² (260–350 g/m²)\n• Size: 4″ × 6″ (101 × 152 mm)\n• Paper thickness: 0.013″ (0.34 mm)\n• Coated outer surface\n• Blank product materials sourced from Sweden, US, Brazil, or China",
 "catalog\_categories": {
 "0": 197,
 "1": 5,
 "2": 122,
 "4": 213,
 "5": 230,
 "6": 242
 }
}
The standard option looks good so let's get some more information about the product with:
curl --location --request GET 'https://api.printful.com/products/433' \
--header 'Authorization: Bearer {your\_token}'
{
 "code": 200,
 "result": {
 "product": {
 ...
 },
 "variants": [
 {
 "id": 11513,
 "product\_id": 433,
 "name": "Standard Postcards (4″×6″)",
 "size": "4″×6″",
 "color": null,
 "color\_code": null,
 "color\_code2": null,
 "image": "https://s3-printful.stage.printful.dev/products/433/11513\_1592384192.jpg",
 "price": "1.50",
 "in\_stock": true,
 "availability\_regions": {
 "US": "United States",
 "EU": "Europe",
 "EU\_LV": "Latvia",
 "AU": "Australia"
 },
 "availability\_status": [
 {
 "region": "US",
 "status": "in\_stock"
 },
 {
 "region": "EU",
 "status": "in\_stock"
 },
 {
 "region": "EU\_LV",
 "status": "in\_stock"
 },
 {
 "region": "AU",
 "status": "in\_stock"
 }
 ]
 }
 ]
 },
 "extra": []
}
Our choice here should be easy, there is only one variant, and it's available in the region we need to send it to.
Now we can add this id (11513) to an item in our order payload.
{
 ...,
 "items": [
 {
 "variant\_id": 11513
 }
 ]
}
Next, we need to add a files array to the item and decide on the "quantity" we want to print (let's just print 1 for now). This way Printful knows what to print, and how many items should be sent to the recipient.
{
 "variant\_id": 11513,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
}
Putting it all together
Now we can finish our orders payload and create our first order. The final payload should look like this:
{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 11513,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
 }
 ]
}
We can now make a POST request to https://api.printful.com/orders with this payload, and we'll get a draft order using a request like this:
curl --location --request POST 'https://api.printful.com/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 11513,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
 }
 ]
}'
Now your order is ready to be made, you will even be able to see the draft already in your dashboard here: https://www.printful.com/dashboard/default/orders
Confirming an order
To confirm the order we need the id of our new order, it should have been returned by the response to the request above. If you've lost it, you can find it again by making a GET request to https://www.api.printful.com/orders and find your order in the returned list.
curl --location --request GET 'https://api.printful.com/orders' \
--header 'Authorization: Bearer {your\_token}'
Assuming you haven't made any other orders it will probably be the first item returned in that list.
Once you have your order id you can confirm the order and have it sent to fulfillment.
Note: If you do want the order to be fulfilled remember to . If billing is not set up first the order will fail.
Warning: Do not run the following command if you do not want to be charged for this order.
curl --location --request POST 'https://api.printful.com/orders/{your\_order\_id}/confirm' \
--header 'Authorization: Bearer {your\_token}' \
Automatically confirming new orders
Now I want to be able to send these postcards in one step, without needing to confirm every time.
To do that, all I have to do is add confirm=1 as a query parameter to the POST request. So that the request looks like this: POST https://api.printful.com/orders?confirm=1
Now, whenever I need to send a postcard with a new image I just change the item file URL in this request:
Warning: Do not run the following command if you do not want to be charged for this order.
curl --location --request POST 'https://api.printful.com/orders?confirm=1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "recipient name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 11513,
 "quantity": 1,
 "files": [
 {
 "url": "{change\_this\_url}"
 }
 ]
 }
 ]
}'
If I then wanted to send it to someone else all I'd need to do is change the address object.
Next steps
Try making some more draft requests like this for different items, and see how they look in the dashboard. Try moving the requests into an application you've already created so that your customers can make orders through a UI.
If you'd like to sell your own products that you've pre-built for your store you can follow our tutorial on .
Creating products for your store through the API
Set up
To follow along with this tutorial, you will need to do the following:
Make sure you have created a native or "manual order platform store" if you haven't already.
Go to this link: .
Click the "Create" button under "Manual order platform/API"
Choose a name and click continue
As well as this you will need to create an OAuth token for this store.
Go to the developer portal: 
Sign in with your Printful account
Go to this link: 
Make sure you have set the access level to "A single store" and select your store
Make sure you have the following scopes selected:
orders View and manage orders of the authorized store
sync\_products View and manage store products
Fill in all other fields as you please
Create your token
You will receive an access token, you will only see the token once, store it securely
To double-check that your token works, and that you have the right store selected, try running the following command replacing {your\_token} with the access token created in the developer portal.
curl --location --request GET 'https://api.printful.com/stores' \
--header 'Authorization: Bearer {your\_token}'
You should see your store there. If you don't see the right store there, or you get an error, double-check the token is correct and if necessary create a new token
Get Sync Products
I've created a new store, "My Photos Store", and I want to start selling landscapes.
The first thing I want to do is see what products I have in my store. To do this I will use the , which lets me create, modify and delete products in my Printful store.
So I make this request with curl.
curl --location --request GET 'https://api.printful.com/store/products' \
--header 'Authorization: Bearer {your\_token}'
And it looks like I have no products in my store yet.
Note: If you've already created some products you'll see them here.
{
 "code": 200,
 "result": [],
 "extra": [],
 "paging": {
 "total": 0,
 "offset": 0,
 "limit": 20
 }
}
To create a new product for our store we'll need to make a post request to that same endpoint.
According to , there are two required fields, an object sync\_product and an array sync\_variants.
The product only has one required field, name, and the variants only require the id and files fields to be present.
So to make a simple first product, let's try and build an object like this:
{
 "sync\_product": {
 "name": "string"
 },
 "sync\_variants": [
 {
 "variant\_id": 1,
 "files": [
 {
 "url": "string"
 }
 ]
 }
 ]
}
Our first step is to figure out the variant\_ids that we need.
The Printful catalog
My main goal is to sell landscape photos, so let's check the  to see if there's anything suitable for that.
curl --location --request GET 'https://api.printful.com/categories' \
--header 'Authorization: Bearer {your\_token}'
{
 "code": 200,
 "result": {
 "categories": [
 ...
 {
 "id": 55,
 "parent\_id": 21,
 "image\_url": "https://s3-printful.stage.printful.dev/upload/catalog\_category/6f/6f2f0c50f2558af01e4f8eebbc09a66d\_t?v=1652883254",
 "title": "Posters"
 },
 {
 "id": 56,
 "parent\_id": 21,
 "image\_url": "https://s3-printful.stage.printful.dev/upload/catalog\_category/34/347883396e6a71fdb25121f20c85e2b3\_t?v=1652883254",
 "title": "Framed posters"
 },
 {
 "id": 57,
 "parent\_id": 21,
 "image\_url": "https://s3-printful.stage.printful.dev/upload/catalog\_category/7c/7c2dd885646f3971b7199ac833a0232f\_t?v=1652883254",
 "title": "Canvas prints"
 },
 ...
 ]
 },
 "extra": []
}
Posters, Framed Posters and Canvas prints all sound suitable. Though I'd prefer my photos framed before sending them to customers, so I will look into the category with id 56.
See if you can find a product that suits your needs best from the list returned from the /categories endpoint.
To see all options for framed posters let's use the category\_id (56) with the .
We can pass the id of the category we're interested in as a query parameter, so I'll pass 56 in as a parameter with a request:
curl --location --request GET 'https://api.printful.com/products?category\_id=56' \
--header 'Authorization: Bearer {your\_token}'
This returns 4 products in an array:
{
 "code": 200,
 "result": [
 {
 "id": 2,
 "main\_category\_id": 56,
 "title": "Enhanced Matte Paper Framed Poster (in)",
 ...
 },
 {
 "id": 304,
 "main\_category\_id": 56,
 "title": "Enhanced Matte Paper Framed Poster (cm)",
 ...
 },
 {
 "id": 366,
 "main\_category\_id": 56,
 "title": "Framed Poster with Frame Mat (cm)",
 ...
 },
 {
 "id": 172,
 "main\_category\_id": 56,
 "title": "Premium Luster Photo Paper Framed Poster (in)",
 ...
 }
 ],
 "extra": []
}
This will give us a lot of information about the products, but all we really need at this point is the id.
I'm interested in that "Premium Luster Photo Paper Framed Poster (in)" product, so to find what variants are available to me, I'll search for it by its id (172) and find the variant\_ids I'm looking for.
curl --location --request GET 'https://api.printful.com/products/172' \
--header 'Authorization: Bearer {your\_token}'
{
 "code": 200,
 "result": {
 "product": {
 "id": 172,
 "main\_category\_id": 56,
 "type": "FRAMED-POSTER",
 "type\_name": "Premium Luster Photo Paper Framed Poster (in)",
 "title": "Premium Luster Photo Paper Framed Poster (in)",
 ...
 },
 "variants": [
 ...,
 {
 "id": 10760,
 "product\_id": 172,
 "name": "Premium Luster Photo Paper Framed Poster (White/8″×10″)",
 "size": "8″×10″",
 "color": "White",
 "color\_code": "#ffffff",
 "color\_code2": null,
 "image": "https://s3-printful.stage.printful.dev/products/172/10760\_1565081295.jpg",
 "price": "23.00",
 "in\_stock": true,
 "availability\_regions": {
 "US": "United States",
 "EU": "Europe",
 "EU\_LV": "Latvia",
 "AU": "Australia",
 "UK": "United Kingdom"
 },
 "availability\_status": [
 {
 "region": "US",
 "status": "in\_stock"
 },
 {
 "region": "EU",
 "status": "in\_stock"
 },
 {
 "region": "EU\_LV",
 "status": "in\_stock"
 },
 {
 "region": "AU",
 "status": "in\_stock"
 },
 {
 "region": "UK",
 "status": "in\_stock"
 }
 ]
 }
 ]
 },
 "extra": []
}
The final variant with id 10760 is in stock in all the regions I want to sell in and a small 8x10 sounds like a great first product for my store.
Your first sync product and sync variant
Now we can finish this payload from before:
{
 "sync\_product": {
 "name": "string"
 },
 "sync\_variants": [
 {
 "variant\_id": 1,
 "files": [
 {
 "url": "string"
 }
 ]
 }
 ]
}
I'll name my product "Framed Landscape Poster" so my object will look like this:
{
 "sync\_product": {
 "name": "Framed Landscape Poster"
 },
 "sync\_variants": [
 {
 "variant\_id": 10760,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
 }
 ]
}
So let's post that object to the Products endpoint:
curl --location --request POST 'https://api.printful.com/store/products' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "sync\_product": {
 "name": "Framed Landscape Poster"
 },
 "sync\_variants": [
 {
 "variant\_id": 10760,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
 }
 ]
}'
And now we'll get our product back looking like this:
{
 "code": 200,
 "result": {
 "id": 280896090,
 "external\_id": "6308d1498007d7",
 "name": "Framed Landscape Poster",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": null,
 "is\_ignored": false
 },
 "extra": []
}
And when I go back to see the products in my store
curl --location --request GET 'https://api.printful.com/store/products' \
--header 'Authorization: Bearer {your\_token}'
I see the new product:
{
 "code": 200,
 "result": [
 {
 "id": 280896090,
 "external\_id": "6308d1498007d7",
 "name": "Framed Landscape Poster",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": null,
 "is\_ignored": false
 }
 ],
 "extra": [],
 "paging": {
 "total": 1,
 "offset": 0,
 "limit": 20
 }
}
And I can see more details about the product with this request now.
Note: Replace the {your\_product\_id} at the end with the id of your sync product, i.e.
curl --location --request GET 'https://api.printful.com/store/products/{your\_product\_id}' \
--header 'Authorization: Bearer {your\_token}'
For me, the request will look like this, but you will have a different id:
curl --location --request GET 'https://api.printful.com/store/products/280896090' \
--header 'Authorization: Bearer {your\_token}'
{
 "code": 200,
 "result": {
 "sync\_product": {
 "id": 280896090,
 "external\_id": "6308d1498007d7",
 "name": "Framed Landscape Poster",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": null,
 "is\_ignored": false
 },
 "sync\_variants": [
 {
 "id": 3374445206,
 "external\_id": "6308d14981f197",
 "sync\_product\_id": 280896090,
 "name": "Framed Landscape Poster - Black / 10″×10″",
 "synced": true,
 "variant\_id": 6883,
 "warehouse\_product\_id": null,
 "warehouse\_product\_variant\_id": null,
 "retail\_price": null,
 "sku": null,
 "currency": "USD",
 "product": {
 "variant\_id": 6883,
 "product\_id": 172,
 "image": "https://s3-printful.stage.printful.dev/products/172/6883\_1527683114.jpg",
 "name": "Premium Luster Photo Paper Framed Poster (Black/10″×10″)"
 },
 "files": [
 {
 "id": 450621845,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/posters/poster\_1.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1661516795,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": [],
 "is\_ignored": false
 }
 ]
 },
 "extra": []
}
Ordering the new product
Now that I have the product in my store, I can very easily order one of my sync variants as an item using only the sync\_variant\_id.
The payload might look something like this
{
 "recipient": {
 "name": "name",
 "address1": "address",
 "city": "city",
 "state\_code": "STATE\_CODE",
 "country\_code": "COUNTRY\_CODE",
 "zip": "2200"
 },
 "items": [
 {
 "sync\_variant\_id": 3374445206,
 "quantity": 1,
 }
 ]
}
We can make a draft order with this command:
Note: You will need to swap {your\_sync\_variant\_id} out with your own sync\_variant\_id
curl --location --request POST 'https://api.printful.com/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "name",
 "address1": "address",
 "city": "city",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "sync\_variant\_id": {your\_sync\_variant\_id},
 "quantity": 1
 }
 ]
}
'
Next steps
To learn more about making an order see: .
Ordering a Direct to Garment (DTG) and an Embroidery Product through the API
Introduction
In this tutorial, we're going to make an order and design one of Printful's most popular items, the Unisex Staple T-Shirt | Bella + Canvas 3001. You will learn how to define file placements and product options when ordering DTG and embroidery products.
Set up
Before anything else make sure you have created a native or "manual order platform store" if you haven't already.
Go to this link: 
Click the "Create" button under "Manual order platform/API"
Choose a name and click continue
As well as this you will need to create an OAuth token for this store.
Go to the developer portal: 
Sign in with your Printful account
Go to this link: 
Make sure you have set the access level to "A single store" and select your store
Make sure you have the following scopes selected for this tutorial:
orders ("View and manage orders of the authorized store")
Fill in all other fields as you please
Create your token
You will receive an access key, you will only see the token once, store it securely
To double-check that your token works and that you have the right store selected, try running the following command replacing your\_token with the access token created in the developer portal.
curl --location --request GET 'https://api.printful.com/stores' \
--header 'Authorization: Bearer {your\_token}'
You should see your store in the response. If you don't see the right store there, or you get an error, double-check the token is correct and if necessary create a new token.
Making the order
We won't go through all the details on how to make an order in this tutorial, instead we will start with the following JSON object, which we can use as the basis for constructing an order.
{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 4035,
 "quantity": 1
 }
 ]
}
The recipient object describes where, and to whom, I want to send the order. Inside the items array I have one object with variant\_id 4035 which is this T-Shirt:

Described in JSON like this:
{
 "id": 4035,
 "product\_id": 71,
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (Asphalt / 2XL)",
 "size": "2XL",
 "color": "Asphalt",
 "color\_code": "#52514f",
 "color\_code2": null,
 "image": "https://s3-printful.stage.printful.dev/products/71/4035\_1581408351.jpg",
 "price": "12.55",
 "in\_stock": true,
 "availability\_regions": {
 "US": "United States",
 "EU": "Europe",
 "EU\_LV": "Latvia",
 "EU\_ES": "Spain",
 "AU": "Australia",
 "CA": "Canada",
 "UK": "United Kingdom"
 },
 "availability\_status": [
 {
 "region": "US",
 "status": "in\_stock"
 },
 {
 "region": "EU",
 "status": "in\_stock"
 },
 {
 "region": "EU\_LV",
 "status": "in\_stock"
 },
 {
 "region": "EU\_ES",
 "status": "stocked\_on\_demand"
 },
 {
 "region": "AU",
 "status": "in\_stock"
 },
 {
 "region": "CA",
 "status": "in\_stock"
 },
 {
 "region": "UK",
 "status": "in\_stock"
 }
 ]
}
If you'd like more detail, we have a tutorial to help you .
Adding placements
We already know what we want to order. But now we want to add our design to the image. I want to print the following design on the right sleeve and the back of the T-Shirt.

First let's make sure that's actually possible, by making a request to the variants endpoint.
curl --location --request GET 'https://api.printful.com/products/variant/4035' \
--header 'Authorization: Bearer {your\_token}'
Note: You could also do this with a request to the Products endpoint as this information will be the same for each variant of a product.
curl --location --request GET 'https://api.printful.com/products/71' \
--header 'Authorization: Bearer {your\_token}'
You will see what file placements are available under result.product.files. As of writing this tutorial the following placements are available:
...
"files": [
 {
 "id": "embroidery\_chest\_left",
 "type": "embroidery\_chest\_left",
 "title": "Left chest",
 "additional\_price": "2.60"
 },
 {
 "id": "embroidery\_large\_center",
 "type": "embroidery\_large\_center",
 "title": "Large center",
 "additional\_price": "3.25"
 },
 {
 "id": "embroidery\_chest\_center",
 "type": "embroidery\_chest\_center",
 "title": "Center chest",
 "additional\_price": "2.60"
 },
 {
 "id": "embroidery\_sleeve\_left\_top",
 "type": "embroidery\_sleeve\_left\_top",
 "title": "Left sleeve top",
 "additional\_price": "2.60"
 },
 {
 "id": "embroidery\_sleeve\_right\_top",
 "type": "embroidery\_sleeve\_right\_top",
 "title": "Right sleeve top",
 "additional\_price": "2.60"
 },
 {
 "id": "default",
 "type": "front",
 "title": "Front print",
 "additional\_price": null
 },
 {
 "id": "front\_large",
 "type": "front\_large",
 "title": "Large front print",
 "additional\_price": "5.25"
 },
 {
 "id": "back",
 "type": "back",
 "title": "Back print",
 "additional\_price": "5.25"
 },
 {
 "id": "label\_outside",
 "type": "label\_outside",
 "title": "Outside label",
 "additional\_price": "2.20"
 },
 {
 "id": "label\_inside",
 "type": "label\_inside",
 "title": "Inside label",
 "additional\_price": "2.20"
 },
 {
 "id": "sleeve\_left",
 "type": "sleeve\_left",
 "title": "Left sleeve",
 "additional\_price": "2.20"
 },
 {
 "id": "sleeve\_right",
 "type": "sleeve\_right",
 "title": "Right sleeve",
 "additional\_price": "2.20"
 },
 {
 "id": "preview",
 "type": "mockup",
 "title": "Mockup",
 "additional\_price": null
 }
],
...
Thankfully "Right sleeve" (sleeve\_right) and "Back print" (back) are among the available options for this product.
 ...
 {
 "id": "back",
 "type": "back",
 "title": "Back print",
 "additional\_price": "5.25"
 },
 ...
 {
 "id": "sleeve\_right",
 "type": "sleeve\_right",
 "title": "Right sleeve",
 "additional\_price": "2.20"
 },
 ...
The most important thing here is the type field, that's what we will use to indicate where we want our files to be placed.
Adding the image placements to the items
Now we can add our designs to the item object. To do that we need a files array containing the source of our images.
In our  on making orders, we already added a file to an item, and it looked like this:
{
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 {
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ]
}
This won't work for us though, because it doesn't specify the placement. The above payload will use the default placement because no other was specified. If we use the default the image will be printed on the front for this product.
To have the placement on the back instead, let's add a type field to the file object
{
 "type": "back",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
}
Then we can add another object to the files array doing the same but with sleeve\_right as the type so that our final item looks like this.
{
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 { 
 "type": "back",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 },
 { 
 "type": "sleeve\_right",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ]
}
Ordering the product
We can already make our order as a draft with this request:
curl --location --request POST 'https://api.printful.com/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 { 
 "type": "back",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 },
 { 
 "type": "sleeve\_right",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ]
 }
 ]
}'
In the response, you'll find a link to the order in the dashboard.
...
"dashboard\_url": "https://www.printful.com/dashboard?order\_id={your\_order\_id}"
...
In the dashboard, you'll be able to view the order and see how your item looks on a mockup. You may have to wait for the mockup to be generated.
Note: This can be done programmatically through the API as well, using the Mockup Generator API.
File position
The print file on the back placement didn't look how I expected. I wanted the image towards the top and the middle. So, I will update the order and pass a position object along with the item using a PUT request to the orders endpoint.
The position object looks like this:
{
 "area\_width": 1200,
 "area\_height": 1600,
 "width": 300,
 "height": 100,
 "top": 100,
 "left": 450
}
This object creates an invisible background for your image, which you can use to place your image in a more specific location. area\_width and area\_height are used to create the area your image will be placed on top of. width and height can be used to resize your image. top and left refer to how far away the image should be placed from the top and left respectively.
These numbers are relative and don't refer to centimeters, inches, or pixels. So the following placement object is the same as the previous one:
{
 "area\_width": 12,
 "area\_height": 16,
 "width": 3,
 "height": 1,
 "top": 1,
 "left": 4.5
}
This is the request I make to update the order:
curl --location --request PUT 'https://api.printful.com/orders/{your\_order\_id}' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "items": [
 {
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 { 
 "type": "back",
 "url": "https://printful.com/static/images/layout/logo-printful.png",
 "position": {
 "area\_width": 1200,
 "area\_height": 1600,
 "width": 300,
 "height": 100,
 "top": 100,
 "left": 450
 }
 },
 { 
 "type": "sleeve\_right",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ]
 }
 ]
}'
Adding embroidery
Now that I have an order with direct to garment prints made, I'd also like to have my design embroidered.
For the embroidered version of the T-Shirt I'd like the design to be on the chest towards the left, where a pocket might be on another shirt. Thankfully, we've already seen that top left is an option for this shirt
{
 "id": "embroidery\_chest\_left",
 "type": "embroidery\_chest\_left",
 "title": "Left chest",
 "additional\_price": "2.60"
}
So let's try and make our previous POST request again, but this time with only the embroidery\_chest\_left file type:
curl --location --request POST 'https://api.printful.com/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ]
 }
 ]
}'
Unfortunately, embroidery items work a bit differently, so if we make that request we'll get this error:
{
 "code": 400,
 "result": "Item 0: thread\_colors\_chest\_left option is missing or incorrect! Allowed values: #FFFFFF, #000000, #96A1A8, #A67843, #FFCC00, #E25C27, #CC3366, #CC3333, #660000, #333366, #005397, #3399FF, #6B5294, #01784E, #7BA35A",
 "error": {
 "reason": "BadRequest",
 "message": "Item 0: thread\_colors\_chest\_left option is missing or incorrect! Allowed values: #FFFFFF, #000000, #96A1A8, #A67843, #FFCC00, #E25C27, #CC3366, #CC3333, #660000, #333366, #005397, #3399FF, #6B5294, #01784E, #7BA35A"
 }
}
There are only so many colors available when using embroidery, so the thread\_colors need to be set in the request. If you don't want to do that manually you can pass the auto\_thread\_color into the files options array.
"type": "embroidery\_chest\_left",
"url": "https://printful.com/static/images/layout/logo-printful.png"
"options": [
 {
 "id": "auto\_thread\_color",
 "value": true
 }
]
Note: The options are a property of the file object not the item
If that option is passed into the request, Printful will choose the colors closest to those in the file.
However, in this case, I'd like more control over the thread colors. I'd like a black and white effect, so I need to add the option thread\_colors\_chest\_left to the item along with the first two allowed values from the error message.
{
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ],
 "options": [
 {
 "id": "thread\_colors\_chest\_left",
 "value": ["#000000", "#FFFFFF"]
 }
 ]
}
Note: The options are a property of the item object not of the file.
Now to make that order we can make a request like this:
curl --location --request POST 'https://api.printful.com/orders' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "recipient": {
 "name": "recipients name",
 "address1": "12 address avenue, Bankstown",
 "city": "Sydney",
 "state\_code": "NSW",
 "country\_code": "AU",
 "zip": "2200"
 },
 "items": [
 {
 "variant\_id": 4035,
 "quantity": 1,
 "files": [
 {
 "type": "embroidery\_chest\_left",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 }
 ],
 "options": [
 {
 "id": "thread\_colors\_chest\_left",
 "value": ["#000000", "#FFFFFF"]
 }
 ]
 }
 ]
}'
Next steps
We've made these orders, but we haven't confirmed them yet, so they are just drafts. For more information on making orders, you can look through the documentation  or follow our other tutorial .
Or if you would like these items to be more reusable as items in your store you can follow our tutorial on .
Creating Mockups in the API
Introduction
In our previous tutorials we created products that can be ordered by ourselves or our customers. However, if we're going to order a product, or offer it to a customer, we'll want to know what it looks like first. That's where mockups come in.
In this tutorial, we're going to create mockups for some of the products we built in previous tutorials.
Set up
Before anything else make sure you have created a native or "manual order platform store" if you haven't already.
Go to this link: 
Click the "Create" button under "Manual order platform/API"
Choose a name and click create
As well as this you will need to create an OAuth token for this store.
Go to the developer portal: 
Sign in with your Printful account
Go to this link: 
Make sure you have set access level to "A single store" and select your store
Make sure you have the following scopes selected for this tutorial:
orders ("View and manage orders of the authorized store")
Fill in all other fields as you please
Create your token
You will receive an access key, you will only see the token once, store it securely
Deciding which variants to generate
In one of our previous tutorials, . Let's make some mockups for that same T-Shirt.
When we originally made the T-Shirt, we only had the Asphalt color, but I'd also like to display a Black and White variant as well. So, I find the id of the T-Shirt product I want, 71, and make a GET request to https://api.printful.com/products/71.
curl --location --request GET 'https://api.printful.com/products/71' \
--header 'Authorization: Bearer {your\_token}'
This will provide you with, among other things, a list of variants. Among those variants, you will find the Asphalt variant 4035 we created in the previous tutorial. We will also find a variant with the color black 4020 and a variant with the color white 4015.
Now we need to get the files from our previous tutorial and put them into a new files array using the format of the .
So if we had files from an order that looked like this:
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "url": "https://printful.com/static/images/layout/logo-printful.png"
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ]
Our new files array will look like this:
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "image\_url": "https://printful.com/static/images/layout/logo-printful.png",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ]
To generate the mockups for these variants we can put these files and variant\_ids in a single POST request to https://api.printful.com/mockup-generator/create-task/{product\_id}.
curl --location --request POST 'https://api.printful.com/mockup-generator/create-task/71' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "variant\_ids": [
 4035,
 4020,
 4015
 ],
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "image\_url": "https://printful.com/static/images/layout/logo-printful.png",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ]
}'
This will give you a response like this:
{
 "code" : 200,
 "extra" : [],
 "result" : {
 "status" : "pending",
 "task\_key" : "gt-421699980"
 }
}
You'll notice that there are no mockups in the response, instead, you receive a task\_key which you can use to retrieve the actual mockup:
curl --location --request GET 'https://api.printful.com/mockup-generator/task?task\_key=gt-421699980' \
--header 'Authorization: Bearer {your\_token}'
{
 "code" : 200,
 "extra" : [],
 "result" : {
 "mockups" : [
 {
 "extra" : [
 {
 "option" : "Front",
 "option\_group" : "Men's",
 "title" : "Front",
 "url" : "https://printful-upload.s3-accelerate.amazonaws.com/tmp/ca321525cfd907188c2266fb6a41cf94/unisex-staple-t-shirt-black-front-634d3ec02e655.png"
 },
 {
 "option" : "Front",
 "option\_group" : "Flat",
 "title" : "Front",
 "url" : "https://printful-upload.s3-accelerate.amazonaws.com/tmp/a3560e3a7558374cfdb2bb6c53ccee18/unisex-staple-t-shirt-black-front-634d3ec02e945.png"
 }
 ],
 "mockup\_url" : "https://printful-upload.s3-accelerate.amazonaws.com/tmp/e2a9e33986914a13096d60847be8a5b0/unisex-staple-t-shirt-black-zoomed-in-634d3ec02dafc.png",
 "placement" : "embroidery\_chest\_left",
 "variant\_ids" : [
 4020
 ]
 },
 {
 ...
 "variant\_ids" : [
 4035
 ]
 },
 {
 ...
 "variant\_ids" : [
 4015
 ]
 }
 ],
 "printfiles" : [
 {
 "placement" : "embroidery\_chest\_left",
 "url" : "https://printful-upload.s3-accelerate.amazonaws.com/tmp/81aabb08df3df89bf67edbd0540fcbe1/printfile\_embroidery\_chest\_left.png",
 "variant\_ids" : [
 4020,
 4035,
 4015
 ]
 }
 ],
 "status" : "completed",
 "task\_key" : "gt-421709941"
 }
}
And that's it, now we have three mockups for each variant, one is an image of the front of the T-Shirt with no model, and the other two are the front of the T-Shirt with a model.
The only problem is that these default mockups only give me one kind of model or style To change the style of my mockups I'll need to find the options and option\_groups that will help create different mockup styles.
Options and Option Groups
What are options and option\_groups?
In the context of mockup generation options, generally speaking, refer to the part of the product being displayed. option\_groups refers to the "style" of the mockup. For example "Front" refers to an option but "Wrinkled" or "On Hanger" are option\_groups.
Finding options and option\_groups
To find what options and option\_groups are available I make a request to mockup-generator/printfiles/{product\_id}:
curl --location --request GET 'https://api.printful.com/mockup-generator/printfiles/71' \
--header 'Authorization: Bearer {your\_token}' 
Giving the following response:
{
 "code" : 200,
 "extra" : [],
 "result" : {
 "available\_placements" : {
 ...
 },
 "option\_groups" : [
 "Couple's",
 "Flat",
 "Flat 2",
 "Flat Lifestyle",
 "Folded",
 "Halloween",
 "Holiday season",
 "Men's",
 "Men's 2",
 "Men's 3",
 "Men's 4",
 "Men's 5",
 "Men's Lifestyle",
 "Men's Lifestyle 2",
 "Men's Lifestyle 3",
 "Men's Lifestyle 4",
 "On Hanger",
 "Product details",
 "Red, white & blue",
 "Spring/summer vibes",
 "Valentine's Day",
 "Women's",
 "Women's 2",
 "Women's 3",
 "Women's 4",
 "Women's 5",
 "Women's Lifestyle",
 "Women's Lifestyle 2",
 "Women's Lifestyle 3",
 "Wrinkled"
 ],
 "options" : [
 ...
 "Front",
 ...
 ],
 "printfiles" : [
 ...
 ],
 "product\_id" : 71,
 "variant\_printfiles" : [
 ...
 ]
 }
}
I'd like to have mockups for both genders, so I've already created "Men's" mockups. So, I can make the request again, specifying that I want the "Women's" option\_group
curl --location --request POST 'https://api.printful.com/mockup-generator/create-task/71' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "variant\_ids": [
 4035,
 4020,
 4015
 ],
 "files": [
 { 
 "type": "embroidery\_chest\_left",
 "image\_url": "https://upload.wikimedia.org/wikipedia/commons/0/06/Ercole\_de%27\_roberti%2C\_san\_michele\_arcangelo\_louvre\_01.jpg",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ],
 "options": ["Front"],
 "option\_groups": ["Women'\''s"]

}'
Repeating the steps from before, results in new mockups for each variant, but now with a different model.
If I also want to receive additional styles (option\_groups) I just need to add it to the option groups. For example, these option groups will give me mockups for "Men's 2", "Women's" and "Couple's".
 "option\_groups": ["Men's 2", "Women's", "Couple's"]
Mismatched options
It is possible to add options or option\_groups that don't produce any mockups.
For example, if I try and make the previous request with "options": ["Back"] I will receive a 400 error:
{
 "code" : 400,
 "error" : {
 "message" : "No variants to generate. Option filters may exclude all variants or variants are not available. Alternatively, make sure that variants belong to given product id.",
 "reason" : "BadRequest"
 },
 "result" : "No variants to generate. Option filters may exclude all variants or variants are not available. Alternatively, make sure that variants belong to given product id."
}
This is because all the print files are on the front, so Printful can't produce a mockup for the "Back".
But if our request had a print file on the back the request would succeed for. For example:
curl --location --request POST 'https://api.printful.com/mockup-generator/create-task/71' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "variant\_ids": [
 4035,
 4020,
 4015
 ],
 "files": [
 {
 "type": "back",
 "image\_url": "https://upload.wikimedia.org/wikipedia/commons/0/06/Ercole\_de%27\_roberti%2C\_san\_michele\_arcangelo\_louvre\_01.jpg",
 "position": {
 "area\_width": 1800,
 "area\_height": 2400,
 "width": 1800,
 "height": 1800,
 "top": 300,
 "left": 0
 }
 }
 ],
 "options": ["Back"],
 "option\_groups": ["Women'\''s"]

}'
Multiple options and option\_groups
It is also possible to have multiple options. For example, assuming we have the right variants and print files, the following combination would produce mockups of the back and front of the product, for "Men's" "Women's".
 "options": ["Front", "Back"],
 "option\_groups": ["Men's 2", "Women's"]
However, you should attempt to limit the number of options and option\_groups you provide here as much as possible. Otherwise, you may get combinations that don't match resulting in unexpected results that you won't see until after generation.
The following request will not give 400, instead, it will produce the "Front" mockups and ignore the "Back" mockups.
curl --location --request POST 'https://api.printful.com/mockup-generator/create-task/71' \
--header 'Authorization: Bearer {your\_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
 "variant\_ids": [
 ...
 ],
 "files": [
 {
 "type": "embroidery\_chest\_left",
 ...
 }
 ],
 "options": ["Front", "Back"],
 "option\_groups": ["Men'\''s 2", "Women'\''s"]
}'
Without the 400 message you may think you are producing mockups that are actually impossible to produce. If these requests are part of a larger system, it could mean that you end up promising mockups to your users that are actually impossible.
Additionally, mockup generation can be slow, each new option group will add new mockups multiplied by the amount of variants and options you have. In a user facing application generating too many mockups for users might be unacceptably slow.
It is usually safer to make multiple requests with limited than one large request that attempts to generate a large range of different mockups
Next Steps
Now that you've created a basic mockup try and create some mockups for your products. After that you can save the results somewhere on your server and use your new mockups however you like.
You could also update the thumbnail of one of your existing store products.
curl --location --request PUT 'https://api.printful.com/store/products/{sync\_product\_id}' \
--header 'Authorization: Bearer {your\_token}' \
--data-raw '{
 "sync\_product": {
 "thumbnail": "{url\_of\_your\_new\_mockup}"
 }
}'
If you don't have any products in your store yet, check out our tutorial on that subject, . .
Integrating with ECommerce Platforms through the API
Introduction
In this tutorial, we will show you how to integrate with your ECommerce Sync Products through the API. We will retrieve our products, update sync variants, and send out notifications.
Suppose we have a new store that is selling a range of products with a design that changes every year, it could be for a conference or maybe for a holiday like Christmas. We have a very large range of products and at the moment our designers have to update all the products manually every year. We want to offer our designers a way to update all of these products at once through the API.
Set up
Before anything else make sure you have created a store using one of our integrations. You can choose a platform here: , and find additional tutorials to help you set it up.
As well as this you will need to create an OAuth token for this store.
Go to the developer portal: 
Sign in with your Printful account
Go to this link: 
Make sure you have set access level to "A single store" and select your store
Make sure you have the following scopes selected for this tutorial:
webhooks ("View and manage store webhooks")
sync\_products ("View and manage store products")
Fill in all other fields as you please
Create your token
You will receive an access key, you will only see the token once, store it securely
Limitations
For the most part, the ECommerce API works just like the Products API, but there are a couple of important limitations. These limitations are explained here: . But, for the purposes of this tutorial, the most important thing is that it’s not possible to create new sync products directly through the API.
Retrieving Products and Variants
First, let's find the products from last year's Christmas sale
curl --location --request GET 'https://api.printful.com/sync/products' \
--header 'Authorization: Bearer {your\_token} \ 
{
 "code": 200,
 "result": [
 {
 "id": 290959495,
 "external\_id": "christmas\_636b6f729a37c7",
 "name": "Unisex t-shirt | Christmas",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://files.cdn.printful.com/files/thumbnail/christmas.png",
 "is\_ignored": false
 },
 ...
 ],
 "extra": [],
 "paging": {
 "total": 143,
 "offset": 0,
 "limit": 20
 }
}
Now we will need to loop through these products to find the variants.
curl --location --request GET 'https://api.printful.com/sync/products/{id} \
--header 'Authorization: Bearer {your\_token} \
For that first product we might get a list of variants that looks like this
{
 "code": 200,
 "result": {
 "sync\_product": {
 "id": 290959495,
 "external\_id": "636b6f729a37c7",
 "name": "Unisex t-shirt | Christmas",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://files.cdn.printful.com/files/6bf/6bfceb21e5fa7a854ff915ca66ca3a79\_preview.png",
 "is\_ignored": false
 },
 "sync\_variants": [
 {
 "id": 3590218032,
 "external\_id": "636b6f729a3867",
 "sync\_product\_id": 290959495,
 "name": "Unisex t-shirt | Christmas",
 "synced": true,
 "variant\_id": 9575,
 "main\_category\_id": 24,
 "warehouse\_product\_id": 330125,
 "warehouse\_product\_variant\_id": 394380,
 "retail\_price": "37.25",
 "sku": "636B6F729A302",
 "currency": "EUR",
 "product": {
 "variant\_id": 9575,
 "product\_id": 71,
 "image": "https://s3-printful.stage.printful.dev/products/71/9575\_1581408916.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (Black Heather / XS)"
 },
 "files": [
 {
 "id": 490457488,
 "type": "default",
 "hash": null,
 "url": "https://example.com/file\_for\_christmas\_2022.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "ok",
 "created": 1681472128,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true,
 "is\_temporary": false
 }
 ],

 ],
 "options": [
 ...
 ],
 "is\_ignored": false
 }
 ]
 },
 "extra": []
}
Updating a Sync Variant
As you can see from the request above the image is for 2022, , and we want to update so that we use the new 2023 image. For that all we need to do is send a PUT request to the endpoint
curl --location --request PUT 'https://api.printful.com/sync/variant/3590218032' \
--header 'Authorization: Bearer {your\_token} \
--data '{
 "files": [
 {
 "type": "default",
 "url": "https://example.com/file\_for\_christmas\_2023.jpg"
 }
 ]
}'
This will replace the original 2022 files with the new 2023 files.
Now, rather than changing each product individually the designers could simply send you the new design, or use your custom UI. You will then be able to loop through all the relevant variants, replacing the old file for each variant.
Note when looping through anything within the API remember to keep within the 
Setting Up a Webhook For Newly Synced Products
Webhooks are another opportunity for the automation of your ECommmerce website through the API. Suppose you want to inform your customers everytime your team creates a new Sync Product. This can be automated using webhooks.
First, you will need to listen for webhooks coming from Printful. We can’t help with setting up a server to do that, but you can use our .
The webhook you will be listening for is: product\_synced. To configure the webhook make the following request
curl --location -X POST 'https://api.printful.com/webhooks' \
--header 'Authorization: Bearer {your\_token} \
--data '{
 "url": "https://your.site/path/to/webhook-listener",
 "types": [
 "product\_synced"
 ]
}'
Now, whenever a new product is synced to Printful, Printful will POST to the new product to that endpoint in this format:
{
 "type": "product\_synced",
 "created": 1681473307,
 "retries": 1,
 "store": {your\_store\_id},
 "data": {
 "sync\_product": {
 "id": 4567234,
 "external\_id": "christmas\_collection-1234",
 "name": "Mug | Christmas",
 "variants": 1,
 "synced": 1
 }
 }
}
Now, whenever you receive the webhook you can send updates to your customers about the new product that was just synced.
Next steps
After updating your products you may also want to .
If you have a Native Store, you should check .
Errors
General errors
API Errors
Products API
Orders API
File Library API
Shipping Rates API
Ecommerce platform Sync API
Tax Rate API
Store Information API
Mockup Generator API
Examples
Catalog API examples
Filter products by single category ID
The IDs of the categories may be retrieved using the GET /categories endpoint. We're going to list products belonging to the "Samsung cases" category (ID: 62).
Request URL: 
Response data
Filter products by multiple category IDs
The following request will fetch iPhone cases (ID: 50) and Samsung cases (ID: 62).
Request URL: 
Response data
Using size guides
In this example, we'll fetch the size guides for the "Women's Basic Organic T-Shirt | SOL'S 02077" product (ID: 561).
We use the default en\_US locale and don't provide the unit parameter, so the measurement values will be returned in inches.
URL: 
Whole response body
Now, we'll take a closer look at the objects related to all three types of size tables.
Measure yourself size table
This object provides all measurements for the end customers to be able to measure themselves and see what size they should buy.
The corresponding response fragment
...
{
 "type": "measure\_yourself",
 "unit": "inches",
 "description": "Measurements are provided by suppliers.  
  
US customers should order a size up as the EU sizes for this supplier correspond to a smaller size in the US market.

\nProduct measurements may vary by up to 2\" (5 cm). 

",
 "image\_url": "https://s3-printful.stage.printful.dev/upload/measure-yourself/6a/6a4fe322f592f2b91d5a735d7ff8d1c0\_t?v=1652962720",
 "image\_description": "###### **A Length**

\nPlace the end of the tape beside the collar at the top of the tee (Highest Point Shoulder). Pull the tape measure to the bottom of the shirt.

\n###### B Chest

\nMeasure yourself around the fullest part of your chest. Keep the tape measure horizontal.

",
 "measurements": [
 {
 "type\_label": "Length",
 "values": [
 {
 "size": "S",
 "value": "25.2"
 },
 {
 "size": "M",
 "value": "26"
 },
 {
 "size": "L",
 "value": "26.7"
 },
 {
 "size": "XL",
 "value": "27.6"
 },
 {
 "size": "2XL",
 "value": "28.3"
 }
 ]
 },
 {
 "type\_label": "Chest",
 "values": [
 {
 "size": "S",
 "min\_value": "34",
 "max\_value": "37"
 },
 {
 "size": "M",
 "min\_value": "36",
 "max\_value": "39"
 },
 {
 "size": "L",
 "min\_value": "39",
 "max\_value": "42"
 },
 {
 "size": "XL",
 "min\_value": "41",
 "max\_value": "44"
 },
 {
 "size": "2XL",
 "min\_value": "43",
 "max\_value": "46"
 }
 ]
 }
 ]
},
...
The measurement image with the descriptions for the product as seen in the web version of the size guides:

The size chart from the web version:

Product measurements size table
This object provides all product measurements so the end customer can measure a product they own and see what size they should buy.
The corresponding response fragment
The measurement image with the descriptions for the product as seen in the web version of the size guides:

The size chart from the web version:

International size conversion
This object provides information what international (US, EU, UK) sizes correspond to the product sizes.
The corresponding response fragment
The international size conversion table from the web version:

Product containing Unlimited Color option
The following request will fetch Bella Canvas 3001 product (ID: 71).
Request URL: 
Response data
Products API examples
Create a new Sync Product
Using multiple placements
Request body:
{
 "sync\_product": {
 "name": "API product Bella",
 "thumbnail": "https://example.com/image.jpg"
 },
 "sync\_variants": [
 {
 "retail\_price": "21.00",
 "variant\_id": 4011,
 "files": [
 {
 "url": "https://example.com/image.jpg"
 },
 {
 "type": "back",
 "url": "https://example.com/image.jpg"
 }
 ]
 },
 {
 "retail\_price": "21.00",
 "variant\_id": 4012,
 "files": [
 {
 "url": "https://example.com/image.jpg"
 },
 {
 "type": "back",
 "url": "https://example.com/image.jpg"
 }
 ]
 }
 ]
}
Response data
Using inside label
Create a new Sync Product with native inside label.
Request body:
{
 "sync\_product": {
 "name": "API product custom"
 },
 "sync\_variants": [
 {
 "retail\_price": "19.00",
 "variant\_id": 9575,
 "files": [
 {
 "type": "front",
 "url": "https://picsum.photos/200/300"
 },
 {
 "type": "label\_inside",
 "url": "https://picsum.photos/200/300",
 "options": [{
 "id": "template\_type",
 "value": "native"
 }]
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
 }
 ]
}
Response data
Modify a Sync Product
Update a Sync Product's Name and Thumbnail.
Request body:
{
 "sync\_product": {
 "name": "API product new name",
 "thumbnail": "https://example.com/image.jpg"
 }
}
Response data
{
 "code": 200,
 "result": {
 "id": 79348721,
 "external\_id": "e9460f6c67",
 "name": "API product new name",
 "variants": 2,
 "synced": 2
 }
}
Update a Sync Product and one of its Sync Variants.
Request body:
{
 "sync\_product": {
 "name": "API product new name",
 "thumbnail": "https://example.com/image.jpg"
 },
 "sync\_variants": [
 {
 "id": 866914574
 },
 {
 "id": 866914580,
 "retail\_price": 21,
 "files": [
 {
 "url": "https://example.com/image.jpg"
 },
 {
 "type": "back",
 "url": "https://example.com/image.jpg"
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 79348721,
 "external\_id": "e9460f6c67",
 "name": "API product",
 "variants": 2,
 "synced": 2
 }
}
Modify a Sync Variant
Update price of an existing Sync Variant.
Request body:
{
 "retail\_price": "29.00"
}
Response data
{
 "code": 200,
 "result": {
 "id": 866914574,
 "external\_id": "5bd967595a1174",
 "sync\_product\_id": 79348721,
 "name": "API product",
 "synced": true,
 "variant\_id": 4011,
 "retail\_price": "29.00",
 "currency": "",
 "product": {
 "variant\_id": 4011,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/4012\_1517927381.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / S)"
 },
 "files": [
 {
 "id": 76564075,
 "type": "default",
 "hash": "7d6a2367c1e338750e68dc66b20cba1a",
 "url": "https://example.com/image.jpg",
 "filename": "76564075.jpg",
 "mime\_type": "image/jpeg",
 "size": 8245,
 "width": 200,
 "height": 300,
 "dpi": null,
 "status": "ok",
 "created": 1539341673,
 "thumbnail\_url": "https://s3.dev.printful.com/files/7d6/7d6a2367c1e338750e68dc66b20cba1a\_thumb.png",
 "preview\_url": "https://s3.dev.printful.com/files/7d6/7d6a2367c1e338750e68dc66b20cba1a\_preview.png",
 "visible": true
 },
 {
 "id": 76564075,
 "type": "back",
 "hash": "7d6a2367c1e338750e68dc66b20cba1a",
 "url": "https://example.com/image.jpg",
 "filename": "76564075.jpg",
 "mime\_type": "image/jpeg",
 "size": 8245,
 "width": 200,
 "height": 300,
 "dpi": null,
 "status": "ok",
 "created": 1539341673,
 "thumbnail\_url": "https://s3.dev.printful.com/files/7d6/7d6a2367c1e338750e68dc66b20cba1a\_thumb.png",
 "preview\_url": "https://s3.dev.printful.com/files/7d6/7d6a2367c1e338750e68dc66b20cba1a\_preview.png",
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
 }
}
Add a native inside label to an existing Sync Variant.
Request body:
{
 "files": [
 {
 "type": "label\_inside",
 "url": "https://picsum.photos/200/300",
 "options": [{
 "id": "template\_type",
 "value": "native"
 }]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 1817548049,
 "external\_id": "5e8dbb006e62d5",
 "sync\_product\_id": 162979476,
 "name": "lucia - White / XL",
 "synced": true,
 "variant\_id": 4014,
 "retail\_price": "19.00",
 "currency": "USD",
 "product": {
 "variant\_id": 4014,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/4014\_1581412553.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / XL)"
 },
 "files": [
 {
 "id": 185425196,
 "type": "label\_inside",
 "hash": null,
 "url": "https://picsum.photos/200/300",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1586351368,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 },
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "text\_thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 },
 {
 "id": "text\_thread\_colors\_chest\_left",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_center",
 "value": []
 },
 {
 "id": "text\_thread\_colors\_chest\_center",
 "value": []
 }
 ]
 }
}
Update the variant t-shirt to have only front print instead of both front and back prints.
Request body:
{
 "files": [
 {
 "type": "default",
 "url": "https://example.com/image.jpg"
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 866914574,
 "external\_id": "5bd967595a1174",
 "sync\_product\_id": 79348721,
 "name": "API product",
 "synced": true,
 "variant\_id": 4011,
 "retail\_price": "29.00",
 "currency": "",
 "product": {
 "variant\_id": 4011,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/4012\_1517927381.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / S)"
 },
 "files": [
 {
 "id": 76564159,
 "type": "default",
 "hash": "ebd559858e5703088de8900ce99c37d3",
 "url": "https://example.com/image.jpg",
 "filename": "76564159.jpg",
 "mime\_type": "image/jpeg",
 "size": 11246,
 "width": 200,
 "height": 300,
 "dpi": null,
 "status": "ok",
 "created": 1540797879,
 "thumbnail\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_thumb.png",
 "preview\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_preview.png",
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
 }
}
Create a new Sync Variant
Request body:
{
 "external\_id": "my-external-id",
 "retail\_price": "19.00",
 "variant\_id": 4011,
 "files": [
 {
 "type": "default",
 "url": "https://example.com/image.jpg"
 },
 {
 "type": "back",
 "url": "https://example.com/image.jpg"
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 866914592,
 "external\_id": "my-external-id",
 "sync\_product\_id": 79348732,
 "name": "API product Bella",
 "synced": true,
 "variant\_id": 4011,
 "retail\_price": "19.00",
 "currency": "USD",
 "product": {
 "variant\_id": 4011,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/4012\_1517927381.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / S)"
 },
 "files": [
 {
 "id": 76564159,
 "type": "default",
 "hash": "ebd559858e5703088de8900ce99c37d3",
 "url": "https://example.com/image.jpg",
 "filename": "76564159.jpg",
 "mime\_type": "image/jpeg",
 "size": 11246,
 "width": 200,
 "height": 300,
 "dpi": null,
 "status": "ok",
 "created": 1540797879,
 "thumbnail\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_thumb.png",
 "preview\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_preview.png",
 "visible": true
 },
 {
 "id": 76564159,
 "type": "back",
 "hash": "ebd559858e5703088de8900ce99c37d3",
 "url": "https://example.com/image.jpg",
 "filename": "76564159.jpg",
 "mime\_type": "image/jpeg",
 "size": 11246,
 "width": 200,
 "height": 300,
 "dpi": null,
 "status": "ok",
 "created": 1540797879,
 "thumbnail\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_thumb.png",
 "preview\_url": "https://s3.dev.printful.com/files/ebd/ebd559858e5703088de8900ce99c37d3\_preview.png",
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
 }
}
Create a new Sync Variant with a native inside label.
Please note that the inside label type must be specified in the file options.
Request body:
{
 "retail\_price": "19.00",
 "variant\_id": 4025,
 "files": [
 {
 "type": "default",
 "url": "https://example.com/image.jpg"
 },
 {
 "type": "label\_inside",
 "url": "https://example.com/image.jpg",
 "options": [{
 "id": "template\_type",
 "value": "native"
 }]
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 1817548049,
 "external\_id": "5e8dbb006e62d5",
 "sync\_product\_id": 162979476,
 "name": "lucia - White / XL",
 "synced": true,
 "variant\_id": 4014,
 "retail\_price": "19.00",
 "currency": "USD",
 "product": {
 "variant\_id": 4014,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/4014\_1581412553.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / XL)"
 },
 "files": [
 {
 "id": 185425195,
 "type": "default",
 "hash": null,
 "url": "https://example.com/image.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1586346752,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 },
 {
 "id": 185425195,
 "type": "label\_inside",
 "hash": null,
 "url": "https://example.com/image.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1586346752,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "text\_thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 },
 {
 "id": "text\_thread\_colors\_chest\_left",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_center",
 "value": []
 },
 {
 "id": "text\_thread\_colors\_chest\_center",
 "value": []
 }
 ]
 }
}
Filter products by single category ID
The IDs of the categories may be retrieved using the GET /categories endpoint. We're going to list products belonging to the "T-shirts" category (ID: 24).
Request URL: 
Response data
{
 "code": 200,
 "result": [
 {
 "id": 277353234,
 "external\_id": "62f35549aeefa2",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353233,
 "external\_id": "62f26ed43060d9",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353218,
 "external\_id": "62e139cbdf6946",
 "name": "API product Bella Test 1",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353216,
 "external\_id": "62e0fd3e89b655",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 }
 ],
 "extra": [],
 "paging": {
 "total": 194,
 "offset": 0,
 "limit": 20
 },
}
Filter products by multiple category IDs
The following request will fetch T-shirts cases (ID: 24) and Dad hats (ID: 42).
Request URL: 
Response data
{
 "code": 200,
 "result": [
 {
 "id": 277353234,
 "external\_id": "62f35549aeefa2",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353233,
 "external\_id": "62f26ed43060d9",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353218,
 "external\_id": "62e139cbdf6946",
 "name": "API product Bella Test 1",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353216,
 "external\_id": "62e0fd3e89b655",
 "name": "API product Bella Test 1",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353215,
 "external\_id": "62de751d178f83",
 "name": "API product custom",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353214,
 "external\_id": "62de40d6dfc335",
 "name": "API product custom",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353213,
 "external\_id": "62de40c4a73325",
 "name": "API product custom",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353212,
 "external\_id": "62de40b67313e3",
 "name": "API product custom",
 "variants": 1,
 "synced": 1,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353211,
 "external\_id": "62de40ac1c6694",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353210,
 "external\_id": "62dd5e06eff211",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353209,
 "external\_id": "62dd5db6314647",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353208,
 "external\_id": "62dd5d6ab15749",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353207,
 "external\_id": "62dd5d29d70bd6",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353206,
 "external\_id": "62dd5cba7b4dc2",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353205,
 "external\_id": "62dd5c2d1df034",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": null,
 "is\_ignored": false
 },
 {
 "id": 277353204,
 "external\_id": "62dd5b3ca4f9a8",
 "name": "API product Bella Test 1",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://picsum.photos/200/300",
 "is\_ignored": false
 },
 {
 "id": 277353203,
 "external\_id": "62dd5ad498ea59",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/",
 "is\_ignored": false
 },
 {
 "id": 277353202,
 "external\_id": "62dd5a839ad745",
 "name": "API product custom",
 "variants": 2,
 "synced": 2,
 "thumbnail\_url": null,
 "is\_ignored": false
 }
 ],
 "extra": [],
 "paging": {
 "total": 194,
 "offset": 0,
 "limit": 20
 },
}
Product Templates API
Get Template List
Response data
{
 "code": 200,
 "result": {
 "items": [
 {
 "id": 24966053,
 "product\_id": 328,
 "external\_product\_id": null,
 "title": "All-Over Print Men's Athletic T-shirt",
 "available\_variant\_ids": [
 9952,
 9958
 ],
 "option\_data": [
 {
 "id": "stitch\_color",
 "value": "white"
 },
 {
 "id": "text\_thread\_colors\_front",
 "value": [
 "#000000"
 ]
 }
 ],
 "colors": [
 {
 "color\_name": "White",
 "color\_codes": [
 "#ffffff"
 ]
 }
 ],
 "sizes": [
 "XS",
 "S"
 ],
 "mockup\_file": {
 "imageURL": "https://example.com/upload/product-templates/d1/d1341a6efb49f59cc58172ce1c15eb20\_l",
 "thumbnailURL": "https://example.com/upload/product-templates/d1/d1341a6efb49f59cc58172ce1c15eb20\_t",
 "imageSVG": null,
 "imageDownloadURL": null,
 "status": "done",
 "pusherKey": null
 },
 "created\_at": 1644848286,
 "updated\_at": 1644849302
 }
 ]
 },
 "extra": [],
 "paging": {
 "total": 2558,
 "offset": 0,
 "limit": 1
 },
 "debug": []
}
Get Template Details
Response data
{
 "code": 200,
 "result": {
 "id": 25029900,
 "product\_id": 19,
 "external\_product\_id": null,
 "title": "White glossy mug",
 "available\_variant\_ids": [
 1320
 ],
 "option\_data": [
 {
 "id": "text\_thread\_colors\_default",
 "value": [
 "#EAD6BB",
 "#EAD6BB"
 ]
 }
 ],
 "colors": [
 {
 "color\_name": "White",
 "color\_codes": []
 }
 ],
 "sizes": [
 "11oz"
 ],
 "mockup\_file": {
 "imageURL": "https://example.com/upload/product-templates/e8/e88de2eb2c0cc4933bcbc8866ef5ad47\_l",
 "thumbnailURL": "https://example.com/upload/product-templates/e8/e88de2eb2c0cc4933bcbc8866ef5ad47\_t",
 "imageSVG": null,
 "imageDownloadURL": null,
 "status": "done",
 "pusherKey": null
 },
 "created\_at": 1645021359,
 "updated\_at": 1645021359
 },
 "extra": [],
 "debug": []
}
Orders API examples
Using a catalog variant
Create an order containing an item, which shall be constructed on-the-fly and based on a print file and a variant\_id from Printful Catalog.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 1,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_1.jpg"
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 21510,
 "external\_id": null,
 "status": "draft",
 "shipping": "STANDARD",
 "created": 1390825082,
 "updated": 1390825082,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "items": [
 {
 "id": 17621,
 "external\_id": null,
 "variant\_id": 1,
 "quantity": 1,
 "price": "13.00",
 "retail\_price": null,
 "name": "Unframed Poster 18×24",
 "product": {
 "variant\_id": 1,
 "product\_id": 1,
 "image": "https://www.printful.com/storage/products/poster\_18x24.jpg",
 "name": "Unframed Poster 18×24"
 },
 "files": [
 {
 "id": 11818,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/posters/poster\_1.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390823900,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": []
 }
 ],
 "costs": {
 "subtotal": "13.00",
 "discount": "0.00",
 "shipping": "7.95",
 "tax": "1.17",
 "total": "22.12"
 },
 "retail\_costs": {
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "total": null
 },
 "shipments": []
 }
}
Using a sync variant
Create an order containing an item, which is based on a pre-configured sync variant from the authorized Printful store and is referenced by its sync variant ID. Please note, that the existing sync variant must be configured (synced) for this to work.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "sync\_variant\_id": 1,
 "quantity": 1
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 11360229,
 "external\_id": null,
 "store": 952434,
 "status": "draft",
 "error": null,
 "shipping": "PRINTFUL\_FAST",
 "created": 1539584164,
 "updated": 1539584164,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "notes": null,
 "items": [
 {
 "id": 7253102,
 "external\_id": null,
 "variant\_id": 4011,
 "sync\_variant\_id": 866913817,
 "external\_variant\_id": "5bc04fbe956147",
 "quantity": 1,
 "price": "12.95",
 "retail\_price": null,
 "name": "Short-Sleeve Unisex T-Shirt - S",
 "product": {
 "variant\_id": 4011,
 "product\_id": 71,
 "image": "https://www.printful.com/products/71/4012\_1517927381.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / S)"
 },
 "files": [
 {
 "id": 76564071,
 "type": "default",
 "hash": "1c43709da13e3480049379d41e473ad9",
 "url": null,
 "filename": "printfile-23aeb205.png",
 "mime\_type": "image/png",
 "size": 18660,
 "width": 1800,
 "height": 2400,
 "dpi": 150,
 "status": "ok",
 "created": 1539329978,
 "thumbnail\_url": "https://www.printful.com/files/1c4/1c43709da13e3480049379d41e473ad9\_thumb.png",
 "preview\_url": "https://www.printful.com/files/1c4/1c43709da13e3480049379d41e473ad9\_preview.png",
 "visible": false
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false
 }
 ],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": true,
 "costs": {
 "currency": "USD",
 "subtotal": "12.95",
 "discount": "0.00",
 "shipping": "2.60",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "1.35",
 "vat": "0.00",
 "total": "16.90"
 },
 "retail\_costs": {
 "currency": "USD",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard?order\_id=11360229"
 },
 "extra": []
}
Using sync variant with external ID
Create an order containing an item, which is based on a pre-configured sync variant from the authorized Printful store and is referenced by its external ID. Please note, that the existing Sync Variant must be configured (synced) for this to work.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "external\_variant\_id": "5bc04fbe956148",
 "quantity": 1
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 11360229,
 "external\_id": null,
 "store": 952434,
 "status": "draft",
 "error": null,
 "shipping": "PRINTFUL\_FAST",
 "created": 1539584164,
 "updated": 1539584164,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "notes": null,
 "items": [
 {
 "id": 7253102,
 "external\_id": null,
 "variant\_id": 4011,
 "sync\_variant\_id": 866913817,
 "external\_variant\_id": "5bc04fbe956147",
 "quantity": 1,
 "price": "12.95",
 "retail\_price": null,
 "name": "Short-Sleeve Unisex T-Shirt - S",
 "product": {
 "variant\_id": 4011,
 "product\_id": 71,
 "image": "https://www.printful.com/products/71/4012\_1517927381.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (White / S)"
 },
 "files": [
 {
 "id": 76564071,
 "type": "default",
 "hash": "1c43709da13e3480049379d41e473ad9",
 "url": null,
 "filename": "printfile-23aeb205.png",
 "mime\_type": "image/png",
 "size": 18660,
 "width": 1800,
 "height": 2400,
 "dpi": 150,
 "status": "ok",
 "created": 1539329978,
 "thumbnail\_url": "https://www.printful.com/files/1c4/1c43709da13e3480049379d41e473ad9\_thumb.png",
 "preview\_url": "https://www.printful.com/files/1c4/1c43709da13e3480049379d41e473ad9\_preview.png",
 "visible": false
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_chest\_left",
 "value": []
 }
 ],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false
 }
 ],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": true,
 "costs": {
 "currency": "USD",
 "subtotal": "12.95",
 "discount": "0.00",
 "shipping": "2.60",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "1.35",
 "vat": "0.00",
 "total": "16.90"
 },
 "retail\_costs": {
 "currency": "USD",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard?order\_id=11360229"
 }
}
Using a product template
To create an order from a template, you need to know the IDs or External Product IDs of the product template(s) you want to use. You can find them by calling GET /product-templates or in the address bar when viewing the template in dashboard.
Specifying one variant from a product template ID
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 11325,
 "quantity": 1,
 "product\_template\_id": 123456789
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 83445633,
 "external\_id": null,
 "store": 4485069,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (2-4 business days after fulfillment)",
 "created": 1667914568,
 "updated": 1667914568,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "Brīvības iela 1",
 "address2": null,
 "city": "Riga",
 "state\_code": null,
 "state\_name": null,
 "country\_code": "LV",
 "country\_name": "Latvia",
 "zip": "1010",
 "phone": null,
 "email": null,
 "tax\_number": null
 },
 "notes": null,
 "items": [
 {
 "id": 56514363,
 "external\_id": null,
 "variant\_id": 11325,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "19.00",
 "retail\_price": null,
 "name": "Men's Curved Hem T-Shirt | Bella + Canvas 3003 (Black / S)",
 "product": {
 "variant\_id": 11325,
 "product\_id": 415,
 "image": "https://s3-printful.stage.printful.dev/products/415/11325\_1591685336.jpg",
 "name": "BELLA + CANVAS 3003 Fast Fashion Jersey Curved Hem Tee (Black / S)"
 },
 "files": [
 {
 "id": 487204563,
 "type": "default",
 "hash": "8cc82d028560643ca41df0315db64ec1",
 "url": null,
 "filename": "Motivational\_posters\_4\_Won-with-it-(20)-(1).jpg",
 "mime\_type": "image/jpeg",
 "size": 1727730,
 "width": 7201,
 "height": 9001,
 "dpi": 300,
 "status": "ok",
 "created": 1667907555,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/files/8cc/8cc82d028560643ca41df0315db64ec1\_thumb.png",
 "preview\_url": "https://s3-printful.stage.printful.dev/files/8cc/8cc82d028560643ca41df0315db64ec1\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487204565,
 "type": "sleeve\_right",
 "hash": "ecf7982f2671ccfd2038a2228fda24dc",
 "url": null,
 "filename": "ed176bfb8272eac737256d6186ce403f.png",
 "mime\_type": "image/png",
 "size": 4012,
 "width": 600,
 "height": 525,
 "dpi": 150,
 "status": "ok",
 "created": 1667907619,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/printfile-preview/487204565/ed176bfb8272eac737256d6186ce403f\_thumb.png",
 "preview\_url": "https://s3-printful.stage.printful.dev/printfile-preview/487204565/ed176bfb8272eac737256d6186ce403f\_preview.png",
 "visible": false,
 "is\_temporary": false
 },
 {
 "id": 487208045,
 "type": "preview",
 "hash": null,
 "url": null,
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1667914568,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 123456789
 }
 ],
 "branding\_items": [],
 "incomplete\_items": [],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "GBP",
 "subtotal": "19.00",
 "discount": "0.00",
 "shipping": "3.39",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "0.00",
 "vat": "4.71",
 "total": "27.10"
 },
 "retail\_costs": {
 "currency": "GBP",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard?order\_id=83445633"
 }
}
Specifying multiple variants from a product template ID
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 6882,
 "quantity": 1,
 "product\_template\_id": 111222333
 },
 {
 "variant\_id": 1350,
 "quantity": 2,
 "product\_template\_id": 11235813
 },
 {
 "variant\_id": 4398,
 "quantity": 1,
 "product\_template\_id": 11235813
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 83445637,
 "external\_id": null,
 "store": 4485069,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (2-4 business days after fulfillment)",
 "created": 1667915130,
 "updated": 1667915130,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "Brīvības iela 1",
 "address2": null,
 "city": "Riga",
 "state\_code": null,
 "state\_name": null,
 "country\_code": "LV",
 "country\_name": "Latvia",
 "zip": "1010",
 "phone": null,
 "email": null,
 "tax\_number": null
 },
 "notes": null,
 "items": [
 {
 "id": 56514369,
 "external\_id": null,
 "variant\_id": 6882,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "18.75",
 "retail\_price": null,
 "name": "Premium Luster Photo Paper Framed Poster (in) (Black / 8″×10″)",
 "product": {
 "variant\_id": 6882,
 "product\_id": 172,
 "image": "https://s3-printful.stage.printful.dev/products/172/6882\_1527683092.jpg",
 "name": "Premium Luster Photo Paper Framed Poster (Black/8″×10″)"
 },
 "files": [
 {
 "id": 487203842,
 "type": "default",
 "hash": "8cc82d028560643ca41df0315db64ec1",
 "url": null,
 "filename": "Motivational\_posters\_4\_Won-with-it-(10)-(6)-(19).jpg",
 "mime\_type": "image/jpeg",
 "size": 1727730,
 "width": 7201,
 "height": 9001,
 "dpi": 300,
 "status": "ok",
 "created": 1667906016,
 "thumbnail\_url": "https://s3-printful.stage.printful.dev/files/8cc/8cc82d028560643ca41df0315db64ec1\_thumb.png",
 "preview\_url": "https://s3-printful.stage.printful.dev/files/8cc/8cc82d028560643ca41df0315db64ec1\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208085,
 "type": "preview",
 "hash": null,
 "url": null,
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1667915129,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 111222333
 },
 {
 "id": 56514370,
 "external\_id": null,
 "variant\_id": 1350,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 2,
 "price": "23.50",
 "retail\_price": null,
 "name": "Enhanced Matte Paper Framed Poster (in) (Black / 12″×16″)",
 "product": {
 "variant\_id": 1350,
 "product\_id": 2,
 "image": "https://s3-printful.stage.printful.dev/products/2/1350\_1527683296.jpg",
 "name": "Enhanced Matte Paper Framed Poster (Black/12″×16″)"
 },
 "files": [
 {
 "id": 487207998,
 "type": "default",
 "hash": "d4024345dec7d649058a50948935ad05",
 "url": null,
 "filename": "d81aec33ca3a7ebf24c4ada1647e3ed0-(1).png",
 "mime\_type": "image/png",
 "size": 773995,
 "width": 1650,
 "height": 1650,
 "dpi": null,
 "status": "ok",
 "created": 1667911881,
 "thumbnail\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208083,
 "type": "preview",
 "hash": null,
 "url": null,
 "filename": "enhanced-matte-paper-framed-poster-(in)-black-12x16-transparent-636a5d67f10a6.png",
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1667915109,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 11235813
 },
 {
 "id": 56514371,
 "external\_id": null,
 "variant\_id": 4398,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "24.75",
 "retail\_price": null,
 "name": "Enhanced Matte Paper Framed Poster (in) (Black / 12″×18″)",
 "product": {
 "variant\_id": 4398,
 "product\_id": 2,
 "image": "https://s3.staging.printful.com/products/2/4398\_1527683145.jpg",
 "name": "Enhanced Matte Paper Framed Poster (Black/12″×18″)"
 },
 "files": [
 {
 "id": 487207998,
 "type": "default",
 "hash": "d4024345dec7d649058a50948935ad05",
 "url": null,
 "filename": "d81aec33ca3a7ebf24c4ada1647e3ed0-(1).png",
 "mime\_type": "image/png",
 "size": 773995,
 "width": 1650,
 "height": 1650,
 "dpi": null,
 "status": "ok",
 "created": 1667911881,
 "thumbnail\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208084,
 "type": "preview",
 "hash": null,
 "url": null,
 "filename": "enhanced-matte-paper-framed-poster-(in)-black-12x18-transparent-636a5d690c2c8.png",
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1667915109,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 11235813
 }
 ],
 "branding\_items": [],
 "incomplete\_items": [],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "GBP",
 "subtotal": "90.50",
 "discount": "0.00",
 "shipping": "16.54",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "0.00",
 "vat": "22.49",
 "total": "129.53"
 },
 "retail\_costs": {
 "currency": "GBP",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard?order\_id=83445637"
 }
}
Using External Product ID
The Product Template may be specified by the associated External Product ID. You can mix it with Product Template IDs for different items but for one item, only one of the identifier fields must be present.
The External Product ID is used only to specify the template. The Item will be associated with the template and only its ID will be present in the response.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 6882,
 "quantity": 1,
 "product\_template\_id": 111222333
 },
 {
 "variant\_id": 1350,
 "quantity": 2,
 "external\_product\_id": "fibonacci"
 },
 {
 "variant\_id": 4398,
 "quantity": 1,
 "external\_product\_id": "fibonacci"
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 83445641,
 "external\_id": null,
 "store": 4485069,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (2-4 business days after fulfillment)",
 "created": 1667916052,
 "updated": 1667916052,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "Brīvības iela 1",
 "address2": null,
 "city": "Riga",
 "state\_code": null,
 "state\_name": null,
 "country\_code": "LV",
 "country\_name": "Latvia",
 "zip": "1010",
 "phone": null,
 "email": null,
 "tax\_number": null
 },
 "notes": null,
 "items": [
 {
 "id": 56514375,
 "external\_id": null,
 "variant\_id": 6882,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "18.75",
 "retail\_price": null,
 "name": "Premium Luster Photo Paper Framed Poster (in) (Black / 8″×10″)",
 "product": {
 "variant\_id": 6882,
 "product\_id": 172,
 "image": "https://s3.staging.printful.com/products/172/6882\_1527683092.jpg",
 "name": "Premium Luster Photo Paper Framed Poster (Black/8″×10″)"
 },
 "files": [
 {
 "id": 487203842,
 "type": "default",
 "hash": "8cc82d028560643ca41df0315db64ec1",
 "url": null,
 "filename": "Motivational\_posters\_4\_Won-with-it-(10)-(6)-(19).jpg",
 "mime\_type": "image/jpeg",
 "size": 1727730,
 "width": 7201,
 "height": 9001,
 "dpi": 300,
 "status": "ok",
 "created": 1667906016,
 "thumbnail\_url": "https://s3.staging.printful.com/files/8cc/8cc82d028560643ca41df0315db64ec1\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/8cc/8cc82d028560643ca41df0315db64ec1\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208085,
 "type": "preview",
 "hash": "b0c646ddb59f66d6d043021d0f7c4dd5",
 "url": null,
 "filename": "premium-luster-photo-paper-framed-poster-(in)-black-8x10-transparent-636a5d7e97726.png",
 "mime\_type": "image/png",
 "size": 169640,
 "width": 1000,
 "height": 1000,
 "dpi": null,
 "status": "ok",
 "created": 1667915129,
 "thumbnail\_url": "https://s3.staging.printful.com/files/b0c/b0c646ddb59f66d6d043021d0f7c4dd5\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/b0c/b0c646ddb59f66d6d043021d0f7c4dd5\_preview.png",
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 111222333
 },
 {
 "id": 56514376,
 "external\_id": null,
 "variant\_id": 1350,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 2,
 "price": "23.50",
 "retail\_price": null,
 "name": "Enhanced Matte Paper Framed Poster (in) (Black / 12″×16″)",
 "product": {
 "variant\_id": 1350,
 "product\_id": 2,
 "image": "https://s3.staging.printful.com/products/2/1350\_1527683296.jpg",
 "name": "Enhanced Matte Paper Framed Poster (Black/12″×16″)"
 },
 "files": [
 {
 "id": 487207998,
 "type": "default",
 "hash": "d4024345dec7d649058a50948935ad05",
 "url": null,
 "filename": "d81aec33ca3a7ebf24c4ada1647e3ed0-(1).png",
 "mime\_type": "image/png",
 "size": 773995,
 "width": 1650,
 "height": 1650,
 "dpi": null,
 "status": "ok",
 "created": 1667911881,
 "thumbnail\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208083,
 "type": "preview",
 "hash": "74563a236db28cccc22f3a5554ede2fa",
 "url": null,
 "filename": "enhanced-matte-paper-framed-poster-(in)-black-12x16-transparent-636a5d67f10a6.png",
 "mime\_type": "image/png",
 "size": 274306,
 "width": 1000,
 "height": 1000,
 "dpi": null,
 "status": "ok",
 "created": 1667915109,
 "thumbnail\_url": "https://s3.staging.printful.com/files/745/74563a236db28cccc22f3a5554ede2fa\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/745/74563a236db28cccc22f3a5554ede2fa\_preview.png",
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 11235813
 },
 {
 "id": 56514377,
 "external\_id": null,
 "variant\_id": 4398,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "24.75",
 "retail\_price": null,
 "name": "Enhanced Matte Paper Framed Poster (in) (Black / 12″×18″)",
 "product": {
 "variant\_id": 4398,
 "product\_id": 2,
 "image": "https://s3.staging.printful.com/products/2/4398\_1527683145.jpg",
 "name": "Enhanced Matte Paper Framed Poster (Black/12″×18″)"
 },
 "files": [
 {
 "id": 487207998,
 "type": "default",
 "hash": "d4024345dec7d649058a50948935ad05",
 "url": null,
 "filename": "d81aec33ca3a7ebf24c4ada1647e3ed0-(1).png",
 "mime\_type": "image/png",
 "size": 773995,
 "width": 1650,
 "height": 1650,
 "dpi": null,
 "status": "ok",
 "created": 1667911881,
 "thumbnail\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/d40/d4024345dec7d649058a50948935ad05\_preview.png",
 "visible": true,
 "is\_temporary": false
 },
 {
 "id": 487208084,
 "type": "preview",
 "hash": "d1021840b0e9514038e9440edbfef4ec",
 "url": null,
 "filename": "enhanced-matte-paper-framed-poster-(in)-black-12x18-transparent-636a5d690c2c8.png",
 "mime\_type": "image/png",
 "size": 277513,
 "width": 1000,
 "height": 1000,
 "dpi": null,
 "status": "ok",
 "created": 1667915109,
 "thumbnail\_url": "https://s3.staging.printful.com/files/d10/d1021840b0e9514038e9440edbfef4ec\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/d10/d1021840b0e9514038e9440edbfef4ec\_preview.png",
 "visible": false,
 "is\_temporary": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock": false,
 "product\_template\_id": 11235813
 }
 ],
 "branding\_items": [],
 "incomplete\_items": [],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "GBP",
 "subtotal": "90.50",
 "discount": "0.00",
 "shipping": "16.54",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "0.00",
 "vat": "22.49",
 "total": "129.53"
 },
 "retail\_costs": {
 "currency": "GBP",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard?order\_id=83445641"
 }
}
Using customized retail prices
Create an order with external order ID, custom item names, and retail price information. Order with external ID and customized item names and prices.
Request body:
{
 "external\_id": "9887112",
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 2,
 "quantity": 1,
 "name": "Niagara Falls poster",
 "retail\_price": "19.99",
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_2.jpg"
 }
 ]
 },
 {
 "variant\_id": 1,
 "quantity": 3,
 "name": "Grand Canyon poster",
 "retail\_price": "17.99",
 "files": [
 {
 "url": "http://example.com/files/posters/poster\_3.jpg"
 }
 ]
 }
 ],
 "retail\_costs": {
 "shipping": "24.50"
 }
}
Response data
{
 "code": 200,
 "result": {
 "id": 21509,
 "external\_id": "9887112",
 "status": "draft",
 "shipping": "STANDARD",
 "created": 1390825006,
 "updated": 1390825006,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "items": [
 {
 "id": 17619,
 "external\_id": null,
 "variant\_id": 2,
 "quantity": 1,
 "price": "18.00",
 "retail\_price": "19.99",
 "name": "Niagara Falls poster",
 "product": {
 "variant\_id": 2,
 "product\_id": 1,
 "image": "https://www.printful.com/storage/products/poster\_24x36.jpg",
 "name": "Unframed Poster 24×36"
 },
 "files": [
 {
 "id": 11819,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/posters/poster\_2.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390824712,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": []
 },
 {
 "id": 17620,
 "external\_id": null,
 "variant\_id": 1,
 "quantity": 3,
 "price": "13.00",
 "retail\_price": "17.99",
 "name": "Grand Canyon poster",
 "product": {
 "variant\_id": 1,
 "product\_id": 1,
 "image": "https://www.printful.com/storage/products/poster\_18x24.jpg",
 "name": "Unframed Poster 18×24"
 },
 "files": [
 {
 "id": 11820,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/posters/poster\_3.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390824712,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": []
 }
 ],
 "costs": {
 "subtotal": "57.00",
 "discount": "0.00",
 "shipping": "9.95",
 "tax": "5.13",
 "total": "72.08"
 },
 "retail\_costs": {
 "subtotal": "73.96",
 "discount": "0.00",
 "shipping": "24.50",
 "tax": "0.00",
 "total": "98.46"
 },
 "shipments": []
 }
}
Using multiple print placements
Create an order from a catalog variant that uses both front and back print files specified.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 1118,
 "quantity": 1,
 "files": [
 {
 "type": "front",
 "url": "http://example.com/files/tshirts/shirt\_front.png"
 },
 {
 "type": "back",
 "url": "http://example.com/files/tshirts/shirt\_back.png"
 }
 ],
 "options": []
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 21516,
 "external\_id": null,
 "status": "draft",
 "shipping": "STANDARD",
 "created": 1390825437,
 "updated": 1390825437,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "items": [
 {
 "id": 17627,
 "external\_id": null,
 "variant\_id": 1118,
 "quantity": 1,
 "price": "20.50",
 "retail\_price": null,
 "name": "Alternative 1070 Short Sleeve Men T-Shirt (Black / M)",
 "product": {
 "variant\_id": 1118,
 "product\_id": 14,
 "image": "https://www.printful.com/storage/products/14/1095.jpg",
 "name": "Alternative 1070 Short Sleeve Men T-Shirt (Black / M)"
 },
 "files": [
 {
 "id": 11822,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/tshirts/shirt\_front.png",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390825349,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 },
 {
 "id": 11823,
 "type": "back",
 "hash": null,
 "url": "http://example.com/files/tshirts/shirt\_back.png",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390825349,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": []
 }
 ],
 "costs": {
 "subtotal": "20.50",
 "discount": "0.00",
 "shipping": "5.50",
 "tax": "1.85",
 "total": "27.85"
 },
 "retail\_costs": {
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "total": null
 },
 "shipments": []
 }
}
Using all-over products
Create an order containing a pair of leggings with the "Stitch color" option specified.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [{
 "variant\_id": 7983,
 "quantity": 1,
 "name": "Leggings",
 "retail\_price": "19.99",
 "files": [{
 "url": "https://example.com/id/858/2000/2009.jpg"
 },
 {
 "url": "https://example.com/id/858/2000/2009.jpg",
 "type": "label\_inside"
 }
 ],
 "options": [{"id":"stitch\_color", "value": "white"}]
 }]
}
Response data
{
 "code": 200,
 "result": {
 "id": 22481169,
 "external\_id": null,
 "store": 1633247,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
 "created": 1575645857,
 "updated": 1575645857,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "notes": null,
 "items": [
 {
 "id": 13516941,
 "external\_id": null,
 "variant\_id": 9144,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "26.99",
 "retail\_price": null,
 "name": "All-Over Print Men's Leggings (XS)",
 "product": {
 "variant\_id": 9144,
 "product\_id": 288,
 "image": "https://www.printful.com/products/288/9144\_1532344185.jpg",
 "name": "All-Over Print Men's Leggings (XS)"
 },
 "files": [
 {
 "id": 138304686,
 "type": "default",
 "hash": "c27a71ab4008c83eba9b554775aa12ca",
 "url": "http://example.com/files/leggings/leggings\_mockup.jpg",
 "filename": "QmTQo4cxDZ5MoszQAK93JyhFedeMuj7j4x5P7tQnvRi4A5.png",
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1575645853,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": [
 {
 "id": "stitch\_color",
 "value": "black"
 }
 ],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock\_eu": false,
 "out\_of\_stock": false
 }
 ],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "EUR",
 "subtotal": "26.99",
 "discount": "0.00",
 "shipping": "3.65",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "2.82",
 "vat": "0.00",
 "total": "33.46"
 },
 "retail\_costs": {
 "currency": "EUR",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard/default/orders?order\_id=22481169"
 },
 "extra": []
}
Using embroidery products
Create an order containing a hat with the embroidery type and thread colors specified.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 8746,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/hats/hats\_mockup.jpg"
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": ["#FFFFFF", "#A67843"]
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 22481172,
 "external\_id": null,
 "store": 1387102,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
 "created": 1575647137,
 "updated": 1575647137,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "notes": null,
 "items": [
 {
 "id": 13516944,
 "external\_id": null,
 "variant\_id": 8746,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "12.57",
 "retail\_price": null,
 "name": "Yupoong 6606 Retro Trucker Cap (White)",
 "product": {
 "variant\_id": 8746,
 "product\_id": 252,
 "image": "https://www.printful.com/products/252/8746\_1543592826.jpg",
 "name": "Yupoong 6606 Retro Trucker Cap (White)"
 },
 "files": [
 {
 "id": 138304687,
 "type": "default",
 "hash": "c27a71ab4008c83eba9b554775aa12ca",
 "url": "http://example.com/files/hats/hats\_mockup.jpg",
 "filename": "QmTQo4cxDZ5MoszQAK93JyhFedeMuj7j4x5P7tQnvRi4A5.png",
 "mime\_type": "image/png",
 "size": 37257,
 "width": 2480,
 "height": 2480,
 "dpi": 300,
 "status": "ok",
 "created": 1575646661,
 "thumbnail\_url": "https://www.printful.com/files/c27/c27a71ab4008c83eba9b554775aa12ca\_thumb.png",
 "preview\_url": "https://www.printful.com/files/c27/c27a71ab4008c83eba9b554775aa12ca\_preview.png",
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": [
 "#FFFFFF",
 "#A67843"
 ]
 },
 {
 "id": "text\_thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 }
 ],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock\_eu": false,
 "out\_of\_stock": false
 }
 ],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "EUR",
 "subtotal": "12.57",
 "discount": "0.00",
 "shipping": "3.65",
 "digitization": "5.75",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "1.91",
 "vat": "0.00",
 "total": "23.88"
 },
 "retail\_costs": {
 "currency": "EUR",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.com/dashboard/default/orders?order\_id=22481172"
 },
 "extra": []
}
Using full color option
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 8746,
 "quantity": 1,
 "files": [
 {
 "url": "http://example.com/files/hats/hats\_mockup.jpg",
 "type": "embroidery\_front",
 "options": [
 {
 "id": "full\_color",
 "value": true
 }
 ]
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 77329346,
 "external\_id": null,
 "store": 7158238,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
 "created": 1657290197,
 "updated": 1657290197,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null,
 "tax\_number": null
 },
 "notes": null,
 "items": [
 {
 "id": 51123823,
 "external\_id": null,
 "variant\_id": 8746,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "18.50",
 "retail\_price": null,
 "name": "Retro Trucker Hat | Yupoong 6606 (White)",
 "product": {
 "variant\_id": 8746,
 "product\_id": 252,
 "image": "https://s3.staging.printful.com/products/252/8746\_1585041861.jpg",
 "name": "Yupoong 6606 Retro Trucker Cap (White)"
 },
 "files": [
 {
 "id": 438932922,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/hats/hats\_mockup.jpg",
 "filename": "hats\_mockup.jpg",
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "failed",
 "created": 1657290187,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": false
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock\_eu": false,
 "out\_of\_stock": false
 }
 ],
 "branding\_items": [],
 "incomplete\_items": [],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "CAD",
 "subtotal": "18.50",
 "discount": "0.00",
 "shipping": "4.99",
 "digitization": "9.60",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "2.93",
 "vat": "0.00",
 "total": "36.02"
 },
 "retail\_costs": {
 "currency": "CAD",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.test/dashboard?order\_id=77329346"
 },
}
T-shirt with an inside label
Create an order containing a t-shirt with a native inside label. Please note that the inside label type must be specified in the file options.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "id": 16303890,
 "variant\_id": 6950,
 "quantity": 1,
 "files": [
 {
 "type": "front",
 "url": "http://www.example.com/media/prints/38/large.jpg"
 },
 {
 "type": "label\_inside",
 "url": "http://www.example.com/media/image\_123.jpg",
 "options": [
 {
 "id": "template\_type",
 "value": "native"
 }
 ]
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 30931362,
 "external\_id": null,
 "store": 493,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
 "created": 1586183759,
 "updated": 1586183759,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null
 },
 "notes": null,
 "items": [
 {
 "id": 17915289,
 "external\_id": null,
 "variant\_id": 6950,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "20.51",
 "retail\_price": null,
 "name": "Unisex Premium T-Shirt | Bella + Canvas 3001 (Athletic Heather / L)",
 "product": {
 "variant\_id": 6950,
 "product\_id": 71,
 "image": "https://s3.dev.printful.com/products/71/6950\_1581408454.jpg",
 "name": "Bella + Canvas 3001 Unisex Short Sleeve Jersey T-Shirt with Tear Away Label (Athletic Heather / L)"
 },
 "files": [
 {
 "id": 183409147,
 "type": "default",
 "hash": null,
 "url": "http://www.example.com/media/prints/38/large.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1586183758,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 },
 {
 "id": 183409148,
 "type": "label\_inside",
 "hash": null,
 "url": "http://www.example.com/media/image\_123.jpg",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1586183758,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": [],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock\_eu": false,
 "out\_of\_stock": false
 }
 ],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "CAD",
 "subtotal": "20.51",
 "discount": "0.00",
 "shipping": "5.70",
 "digitization": "0.00",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "2.15",
 "vat": "0.00",
 "total": "28.36"
 },
 "retail\_costs": {
 "currency": "CAD",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.test/dashboard?order\_id=30931362"
 },
 "extra": [],
}
Embroidery patch
Create an order containing the embroidery patch.
Request body:
{
 "recipient": {
 "name": "John Doe",
 "address1": "19749 Dearborn St",
 "city": "Chatsworth",
 "state\_code": "CA",
 "country\_code": "US",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 12983,
 "quantity": 1,
 "files": [
 {
 "url": "https://pbs.twimg.com/profile\_images/1073247505381552129/53OmqmtE\_400x400.jpg",
 "type": "embroidery\_patch\_front"
 }
 ],
 "options": [
 {
 "id": "thread\_colors\_outline",
 "value": [
 "#A67843"
 ]
 },
 {
 "id": "thread\_colors\_patch\_front",
 "value": [
 "#96A1A8",
 "#3399FF",
 "#E25C27",
 "#CC3333",
 "#333366",
 "#000000"
 ]
 }
 ]
 }
 ]
}
Response data
{
 "code": 200,
 "result": {
 "id": 77329716,
 "external\_id": null,
 "store": 7158238,
 "status": "draft",
 "error": null,
 "errorCode": 0,
 "shipping": "STANDARD",
 "shipping\_service\_name": "Flat Rate (3-4 business days after fulfillment)",
 "created": 1658333148,
 "updated": 1658333148,
 "recipient": {
 "name": "John Doe",
 "company": null,
 "address1": "19749 Dearborn St",
 "address2": null,
 "city": "Chatsworth",
 "state\_code": "CA",
 "state\_name": "California",
 "country\_code": "US",
 "country\_name": "United States",
 "zip": "91311",
 "phone": null,
 "email": null,
 "tax\_number": null
 },
 "notes": null,
 "items": [
 {
 "id": 51124091,
 "external\_id": null,
 "variant\_id": 12983,
 "sync\_variant\_id": null,
 "external\_variant\_id": null,
 "quantity": 1,
 "price": "11.50",
 "retail\_price": null,
 "name": "Embroidered Patches (White / Circular ⌀3 in)",
 "product": {
 "variant\_id": 12983,
 "product\_id": 516,
 "image": "https://s3.staging.printful.com/products/516/12983\_1631709382.jpg",
 "name": "Embroidered Patches (White / Circular ⌀3 in)"
 },
 "files": [
 {
 "id": 438932260,
 "type": "embroidery\_patch\_front",
 "hash": "9740034e67529e49e4db9329c733b0ea",
 "url": "https://pbs.twimg.com/profile\_images/1073247505381552129/53OmqmtE\_400x400.jpg",
 "filename": "53OmqmtE\_400x400.jpg",
 "mime\_type": "image/jpeg",
 "size": 10045,
 "width": 400,
 "height": 400,
 "dpi": null,
 "status": "ok",
 "created": 1655901818,
 "thumbnail\_url": "https://s3.staging.printful.com/files/974/9740034e67529e49e4db9329c733b0ea\_thumb.png",
 "preview\_url": "https://s3.staging.printful.com/files/974/9740034e67529e49e4db9329c733b0ea\_preview.png",
 "visible": true
 }
 ],
 "options": [
 {
 "id": "embroidery\_type",
 "value": "flat"
 },
 {
 "id": "thread\_colors",
 "value": [
 "#96A1A8",
 "#3399FF",
 "#E25C27",
 "#CC3333",
 "#333366",
 "#000000"
 ]
 },
 {
 "id": "text\_thread\_colors",
 "value": []
 },
 {
 "id": "thread\_colors\_3d",
 "value": []
 },
 {
 "id": "thread\_colors\_patch\_front",
 "value": []
 },
 {
 "id": "text\_thread\_colors\_patch\_front",
 "value": []
 },
 {
 "id": "thread\_colors\_outline",
 "value": [
 "#A67843"
 ]
 }
 ],
 "sku": null,
 "discontinued": false,
 "out\_of\_stock\_eu": false,
 "out\_of\_stock": false
 }
 ],
 "branding\_items": [],
 "incomplete\_items": [],
 "is\_sample": false,
 "needs\_approval": false,
 "not\_synced": false,
 "has\_discontinued\_items": false,
 "can\_change\_hold": false,
 "costs": {
 "currency": "CAD",
 "subtotal": "11.50",
 "discount": "0.00",
 "shipping": "5.09",
 "digitization": "9.60",
 "additional\_fee": "0.00",
 "fulfillment\_fee": "0.00",
 "tax": "2.20",
 "vat": "0.00",
 "total": "28.39"
 },
 "retail\_costs": {
 "currency": "CAD",
 "subtotal": null,
 "discount": null,
 "shipping": null,
 "tax": null,
 "vat": null,
 "total": null
 },
 "shipments": [],
 "gift": null,
 "packing\_slip": null,
 "dashboard\_url": "https://www.printful.test/dashboard?order\_id=77329716"
 },
}
Using Knitwear Product
In v1 of the API the color\_reduction\_mode is not available to be specified and it will always default to solid.
Create an order with an order for a knitwear product.
{
 "recipient": {
 "name": "john smith",
 "company": "john smith inc",
 "address1": "19749 dearborn st",
 "city": "chatsworth",
 "state\_code": "ca",
 "country\_code": "us",
 "country\_name": "united states",
 "zip": "91311"
 },
 "items": [
 {
 "variant\_id": 19633,
 "quantity": 1,
 "files": [
 {
 "type": "front",
 "url": "https://picsum.photos/200"
 }
 ],
 "options": [
 {
 "id": "yarn\_colors",
 "value": [
 "#090909",
 "#48542e"
 ]
 },
 {
 "id": "trim\_color",
 "value": "#dcd3cc"
 },
 {
 "id": "base\_color",
 "value": "#dda032"
 }
 ]
 }
 ]
}
Response data
The resulting mockup should look as follows:

File Library API examples
Add a new file
Add file to the print file library, file name will be detected from URL. After creation file is not processed instantly.
Request body:
{
 "url": "http://www.example.com/files/tshirts/example.png"
}
Response data:
{
 "code": 200,
 "result": {
 "id": 11816,
 "type": "default",
 "hash": null,
 "url": "http://www.example.com/files/tshirts/example.png",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1390819101,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
}
Add file to the mockup library, and specify file name manually
Request body:
{
 "type": "preview",
 "url": "http://www.example.com/files/tshirts/example.png",
 "filename": "shirt1.png"
}
Add file to the library, but not show up in the web interface.
Request body:
{
 "url": "http://www.example.com/files/tshirts/example.png",
 "visible": 0
}
Suggest thread colors
Get suggested thread colors for provided image URL
Request body:
{
 "file\_url": "http://www.example.com/files/tshirts/example.png"
}
Response data:
{
 "code": 200,
 "result": {
 "thread\_colors": [
 "#FFFFFF",
 "#000000",
 "#96A1A8",
 "#CC3333",
 "#E25C27"
 ]
 },
}
Ecommerce Platform Sync API examples
Modify a Sync Variant
Links Sync Variant with T-shirt with front and back images.
Request body:
{
 "variant\_id": 1118,
 "files": [
 {
 "url": "http://example.com/files/tshirts/shirt\_front.png"
 },
 {
 "type": "back",
 "url": "http://example.com/files/tshirts/shirt\_back.png"
 }
 ],
 "options": []
}
Response data
{
 "code": 200,
 "result": {
 "sync\_variant": {
 "id": 4699529,
 "external\_id": "1117068664",
 "sync\_product\_id": 1055835,
 "name": "Michael Jackson T-Shirt - Medium",
 "synced": true,
 "variant\_id": 1118,
 "product": {
 "variant\_id": 1118,
 "product\_id": 14,
 "image": "https://files.cdn.printful.com/products/14/1095.jpg",
 "name": "Alternative 1070 Short Sleeve Men T-Shirt (Black / M)"
 },
 "files": [
 {
 "id": 304995,
 "type": "default",
 "hash": null,
 "url": "http://example.com/files/tshirts/shirt\_front.png",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1426839420,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 },
 {
 "id": 304996,
 "type": "back",
 "hash": null,
 "url": "http://example.com/files/tshirts/shirt\_back.png",
 "filename": null,
 "mime\_type": null,
 "size": 0,
 "width": null,
 "height": null,
 "dpi": null,
 "status": "waiting",
 "created": 1426839420,
 "thumbnail\_url": null,
 "preview\_url": null,
 "visible": true
 }
 ],
 "options": []
 },
 "sync\_product": {
 "id": 1055835,
 "external\_id": "409040684",
 "name": "Michael Jackson T-Shirt",
 "variants": 1,
 "synced": 1
 }
 }
}
Mockup Generator API examples
Retrieve product variant print files with default technique
URI: GET /mockup-generator/printfiles/162
Response data
{
 "code": 200,
 "result": {
 "product\_id": 162,
 "available\_placements": {
 "front": "Front print",
 "back": "Back print",
 "label\_outside": "Outside label",
 "label\_inside": "Inside label",
 "sleeve\_left": "Left sleeve",
 "sleeve\_right": "Right sleeve"
 },
 "printfiles": [
 {
 "printfile\_id": 1,
 "width": 1800,
 "height": 2400,
 "dpi": 150,
 "fill\_mode": "fit",
 "can\_rotate": false
 },
 ...
 ],
 "variant\_printfiles": [
 {
 "variant\_id": 6584,
 "placements": {
 "front": 1,
 "back": 1,
 "label\_outside": 90,
 "label\_inside": 71,
 "sleeve\_left": 130,
 "sleeve\_right": 130
 }
 },
 ...
 ],
 "option\_groups": [
 "Couple's",
 "Flat",
 "Flat 2",
 "Flat 3",
 "Flat Lifestyle",
 "Holiday season",
 "Labels",
 "Men's",
 "Men's 2",
 "Men's 3",
 "Men's 4",
 "On Hanger",
 "Spring/summer vibes",
 "Women's",
 "Women's 2",
 "Women's 3",
 "Women's 4"
 ],
 "options": [
 "Back",
 "Back 2",
 "Front",
 "Front 2",
 "Inside label",
 "Left",
 "Left Front",
 "Outside label",
 "Right",
 "Right Back",
 "Right Front"
 ]
 }
}
Retrieve product variant printfiles with specified technique
URI: GET /mockup-generator/printfiles/162?technique=EMBROIDERY
Response data
{
 "code": 200,
 "result": {
 "product\_id": 162,
 "available\_placements": {
 "embroidery\_chest\_center": "Center chest",
 "embroidery\_chest\_left": "Left chest"
 },
 "printfiles": [
 {
 "printfile\_id": 136,
 "width": 1200,
 "height": 1200,
 "dpi": 300,
 "fill\_mode": "fit",
 "can\_rotate": false
 }
 ],
 "variant\_printfiles": [
 {
 "variant\_id": 6584,
 "placements": {
 "embroidery\_chest\_center": 136,
 "embroidery\_chest\_left": 136
 }
 },
 ...
 ],
 "option\_groups": [
 "Couple's",
 "Flat",
 "Flat 2",
 "Flat 3",
 "Flat Lifestyle",
 "Holiday season",
 "Men's",
 "Men's 2",
 "Men's 3",
 "Men's 4",
 "On Hanger",
 "Spring/summer vibes",
 "Women's",
 "Women's 2",
 "Women's 3",
 "Women's 4"
 ],
 "options": [
 "Front",
 "Front 2",
 "Zoomed-in",
 "Zoomed-in 2"
 ]
 }
}
Get layout templates with default technique
URI: GET /mockup-generator/templates/162
Response data
{
 "code": 200,
 "result": {
 "version": 100,
 "variant\_mapping": [
 {
 "variant\_id": 6584,
 "templates": [
 {
 "placement": "front",
 "template\_id": 7597
 },
 {
 "placement": "back",
 "template\_id": 7617
 },
 {
 "placement": "label\_outside",
 "template\_id": 3521
 },
 {
 "placement": "label\_inside",
 "template\_id": 47233
 },
 {
 "placement": "sleeve\_left",
 "template\_id": 7684
 },
 {
 "placement": "sleeve\_right",
 "template\_id": 7685
 }
 ]
 },
 ...
 ],
 "templates": [
 {
 "template\_id": 7597,
 "image\_url": "https://printful-mockups-dev.s3.amazonaws.com/56-bella-canvas-3413/medium/onman/front/03\_bc3413\_onman\_front\_shadows\_whitebg.png?v=1646372077",
 "background\_url": "https://printful-mockups-dev.s3.amazonaws.com/56-bella-canvas-3413/medium/onman/front/01\_bc3413\_onman\_front\_solidblack.png?v=1646372077",
 "background\_color": null,
 "printfile\_id": 1,
 "template\_width": 1000,
 "template\_height": 1000,
 "print\_area\_width": 299,
 "print\_area\_height": 399,
 "print\_area\_top": 228,
 "print\_area\_left": 350,
 "is\_template\_on\_front": true,
 "orientation": "any"
 },
 ...
 ],
 "min\_dpi": 75,
 "conflicting\_placements": [
 {
 "placement": "back",
 "conflicts": [
 "label\_outside"
 ]
 },
 {
 "placement": "label\_outside",
 "conflicts": [
 "back",
 "label\_inside"
 ]
 },
 {
 "placement": "label\_inside",
 "conflicts": [
 "label\_outside"
 ]
 }
 ]
 }
}
Get layout templates with specified technique
URI: GET /mockup-generator/templates/162?technique=EMBROIDERY
Response data
{
 "code": 200,
 "result": {
 "version": 100,
 "variant\_mapping": [
 {
 "variant\_id": 6584,
 "templates": [
 {
 "placement": "embroidery\_chest\_center",
 "template\_id": 53432
 },
 {
 "placement": "embroidery\_chest\_left",
 "template\_id": 12221
 }
 ]
 },
 ...
 ],
 "templates": [
 {
 "template\_id": 53432,
 "image\_url": "https://printful-mockups-dev.s3.amazonaws.com/56-bella-canvas-3413/medium/onman/embroidery\_chest\_left/zoomed/04\_bc3413\_onman\_front\_zoomed\_shadows.png?v=1646372077",
 "background\_url": "https://printful-mockups-dev.s3.amazonaws.com/56-bella-canvas-3413/medium/onman/embroidery\_chest\_left/zoomed/01\_bc3413\_onman\_front\_zoomed\_solidblack.png?v=1646372077",
 "background\_color": null,
 "printfile\_id": 136,
 "template\_width": 1000,
 "template\_height": 1000,
 "print\_area\_width": 173,
 "print\_area\_height": 173,
 "print\_area\_top": 464,
 "print\_area\_left": 425,
 "is\_template\_on\_front": true,
 "orientation": "any"
 },
 ...
 ],
 "min\_dpi": 150,
 "conflicting\_placements": [
 {
 "placement": "embroidery\_chest\_center",
 "conflicts": [
 "embroidery\_chest\_left",
 "embroidery\_large\_center"
 ]
 },
 {
 "placement": "embroidery\_chest\_left",
 "conflicts": [
 "embroidery\_chest\_center",
 "embroidery\_large\_center"
 ]
 }
 ]
 }
}

