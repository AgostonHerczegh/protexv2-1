/*function getSessionUsername(req) {
    return req.session.username;
}

function checkUserType() {
    const username = getSessionUsername(); // Assuming you've defined this function already
  
    // Query the SQL database to get the user's user_type value
    const sqlQuery = 'SELECT `username` FROM `users` WHERE `user_type` = "ADMIN"';
    // Execute the query and retrieve the user's data from the database
    const user = executeSqlQuery(sqlQuery);
  
    // Check if the user's user_type is "ADMIN"
    if (user && user.user_type === "ADMIN") {
      return true;
    } else {
      return false;
    }
  }
  
  // Call the checkUserType function and show/hide the "admin-panel" div based on the result
  if (checkUserType()) {
    document.getElementById("admin-panel").style.display = "block";
  } else {
    document.getElementById("admin-panel").style.display = "none";
  }
  */