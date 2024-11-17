# bitfount-test
React application that allows the user to create reminders.
This is a basic functionality app to create repeating reminders for any day of the week. The layout of this app is kept minimal for the ease of use.

# Setup
## Backend
1. ```npm install``` to install all the libraries on the backend
2. ```npx ts-node src/server.ts``` to start the server
## Frontend
1. ```npm install``` to install all the libraries on the frontend-app
2. ```npm start```  to start the frontend app

### Demo Login account
* Username - testuser
* Password - testuser
* (You can create your own account via register page)

#### Please allow push notification to see the reminders

## App functioanlities
1. Login and register for users.
2. Adding reminders that are repeating every week on the particular day.
3. Push notification to popup even when the app tab is not focused on the browser.
4. Ability to delete the reminder that you may not need.

# Future Improvements
1. Add some more validation on every field of the form.
2. Change the time format from 24hr format to 12hr format.
3. Functionality to edit the already created reminders.
4. Functionality to add non-repeating reminders.
5. More validations on the register and login form.
6. Add functionality to add reminders for every day of the week as a single reminder rather than seven different reminders.
7. Adding pagination to the reminders list when it grows more than 5/10 reminders.