# Repository Information
The 'mobile/SpotsOnClick' directory stores the Android project that contains a WebView.
The 'public' directory stores the HTML files that utilize the REST API (server.js).

# Description
Our project provides all information about the most famous spots in all cities depending on what the database provides, it saves longitude and latitude. We created the database using mLab, six routes, a website, and a mobile app containing a WebView. To view the project, [click here].

# Cloud Database Design
- **The database name is:** spotsonclick
- **The collection names are:** spots, users
- **The documents inside spots contain keys including:**
-- name
-- description
-- image_url
-- city
-- location

- **The documents inside users contain keys including:**
-- username
-- display_name
-- email

- The database is hosted on mLab. 
- The full project is hosted on EvenNode.

# User Resource Routes
| Routes | Method | Description |
| ------ | ------ | ------ |
| /users | POST | Adds data to the ‘users’ collection in the database. |
| /users | GET | Gets all the users from the ‘users’ collection. |
| /users/:id | GET | Gets the user matching the parameter :id from the ‘users’ collection. |
| /users/:id | PATCH | Modifies the changed data for the user matching the parameter :id. |
| /users/:id | DELETE | Removes the user matching the parameter :id from ‘users’ collection. |
| /search/users/?key=x&value=y | GET | Search for users where key is (x) and value is (y) in the ‘users’ collection. |

# Spots Resource Routes
| Routes | Method | Description |
| ------ | ------ | ------ |
| /spots | POST | Adds data to the ‘spots’ collection in the database. |
| /spots | GET | Gets all the spots from the ‘spots’ collection. |
| /spots/:id | GET | Gets the spot matching the parameter :id from the ‘spots’ collection. |
| /spots/:id | PATCH | Modifies the changed data for the spot matching the parameter :id. |
| /spots/:id | DELETE | Removes the spot matching the parameter :id from ‘spots’ collection. |
| /search/spots/?key=x&value=y | GET | Search for spots where key is (x) and value is (y) in the ‘spots’ collection. |

# Architecture Diagram
![Architecture Diagram](https://i.imgur.com/GwGGDSq.jpg)

The SpotsOnClick application will have CRUD (Create, Read, Update, Delete) operations. POST is create, GET is read. PATCH is update and DELETE is delete. 

   [click here]: <http://spotsonclick.eu-4.evennode.com/>