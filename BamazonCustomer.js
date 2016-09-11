/* INCLUDE REQUIRED NPM PACKAGES */
var inquirer = require('inquirer');
var mysql = require('mysql');

// Database connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Bamazon'
});

/* MAIN BAMAZON DATABASE FUNCTION */
function bamazon()
{
    // Displays all data from Products table
    connection.query('SELECT * FROM Products', function(err, res) {

        // Prints out table columns
        console.log('ID Product Name\tDepartment Name\tPrice\tStock');
        for(var i = 0; i < res.length; i++){
            
            // Displays data from database under their respective column 
            var item = res[i];
            console.log('#'+item.ItemID + '   ' + item.ProductName + '\t' + item.DepartmentName + '\t' + item.Price + '\t' + item.StockQuantity);
        }

        // Inquier user for ID and how many of the available items they'd like to purchase
        inquirer.prompt([
        {
            name: 'id',
            message: 'Enter ID of item you would like to purchase:'
        },
        {
            name : 'quantity',
            message: 'Enter quantity you would like to purchase:'
        }]).then(function(answer)
        {
            // Call purchaseItem function
            purchaseItem(answer.id, answer.quantity, res);
        });
    });
}

/* PURCHASE ITEM FUNCTION */
function purchaseItem(id, quantity, res)
{
    // Preserve and reuse results 
    var item = res[id-1];
    
    /* VALIDATION FOR INSUFFICENT QUANTITY OF ITEM - IF NO ITEM EXISTS, END CONNECTION! */
    if(item.StockQuantity == 0 || (item.StockQuantity - quantity < 0))
        connection.end(function(err){console.log('Insufficient quantity!')});
    else
    {
        // Update Products table
        connection.query('UPDATE Products SET ? WHERE ?',
        [
            {
                StockQuantity: (item.StockQuantity - quantity)
            },
            {
                ItemID: id
            }
        ],
        function(err, res2)
        {
            // Displays total purchases to user
            connection.end(function(err){
            	console.log('Purchase Total: $' + (quantity * item.Price));
            });
        });
    }
}
// Fires up bamazon function
bamazon();