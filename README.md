![estate3](https://github.com/user-attachments/assets/1a018f48-558b-4e25-8013-b6c939888a6b)

Estate_Agency
=====================
***Estate_Agency*** is an application for a real estate agency website.
The company provides a wide spectre of real estates, such as `houses`, `cottages`, `empty lots`, `apartments`
***
The application allows you to log in as a realtor and as a user. The realtor can add, delete and edit existing listings for sale, while the user can view all the ads and choose the ones they like.
***
There are two servers in the application - Vite server (React components) and Kestrel server (ASP.NET Core - .NET 9.0)
Vite sends an axios request to Kestrel server. Then processing occurs at the business logic level. ASP.NET application has Repository class with DBcontext operations to gain data from MySQL server, where the data is stored

Main files description
=====================
File/Directory Name            | Content
-------------------------------|----------------------
Client_side                    | Contains all files and React components related to direct work with the client
Server_side                    | ASP.NET Core server files for processing business logic and accessing the database
package.json                   | All client-side dependencies and NPM installs
main.jsx                       | Main page with all navigations and global usings
requests.js                    | Contains all axios reguest to server-side app
...\src\components\Common      | Common pages for client and realtor
...\src\components\Realtor     | All .jsx files related to realtor functional
...\src\components\User        | All .jsx files related to client user functional
EstateController.cs            | Business logic holder, uses Repository.cs to access database
EstateController.cs            | Business logic holder, uses Repository.cs to access database
UserRequest.cs                 | Contains contracts according to which axios requests are generated
StringCipher.cs                | Allows you to encrypt login and password according to a specified key
Repository.cs                  | Uses DBcontext to provide open methods for interacting with database
