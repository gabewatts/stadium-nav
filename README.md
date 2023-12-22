# My Stadium Navigator

**Group N**: *Final Project* - 12/01/23

## MyStadiumNav  

The target audience of this app are event-goes who would like their information saved in one place and offline.  

A user is able to sign-up, sign-in from a created account, edit profile settings, add event tickets to their account, send tickets across accounts, view all levels of information associated with their ticket(s), offline, and installable technology. These implementations have been accomplished through a RESTful architecture, saving information to the browser's localStorage, caching as FetchFirst, and service workers.  

Secure authentication is done by saving a user to an account they created and authorized using JWT tokens, hashing, and secret keys. Additionally, known password and salt saved in the database are hidden from the frontend. API request are make from the frontend to call different mysql queries to a database. This database contains initializations at the applications start up to establish objects. Middleware is in place to allow required authentication to access pages within the application.  
