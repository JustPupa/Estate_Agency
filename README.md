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
File/Directory Name     | Content
-----------------------------------|----------------------
Client_side                        | Contains all files and React components related to direct work with the client
Server_side                        | ASP.NET Core server files for processing business logic and accessing the database
package.json                       | All client-side dependencies and NPM installs
main.jsx                           | Main page with all navigations and global usings
requests.js                        | Contains all axios reguest to server-side app
requests.js                        | Contains all axios reguest to server-side app
Client_side\src\components\Common\ | Common pages for client and realtor
Client_side\src\components\Realtor\| All .jsx files related to realtor functional
Client_side\src\components\User\   | All .jsx files related to client user functional
