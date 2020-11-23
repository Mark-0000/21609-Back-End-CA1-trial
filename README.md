# 21609-Back-End-CA1

lines 1 - 16 
defining required libraries like mongodb, express and body parser
declaring constant variables like database url, database name, db and col for usage
creating objects for functions express and body-parser


lines 116-124
connecting to database
assigning values to variables db and col


MONGODB OPERATIONS


lines  127 - 156
CRUD - create
constructing document/object hotel to be inserted
3 hotel objects
inserting onjects as json to the database

lines 161 - 166
CRUD - read
declaring variable filter to filter collection
asigning hotelque to the value of filter if it exists
logging the output

lines 171 - 179
CRUD - update
defining the value to be updated
using the filter from read method, we are updating the values 

lines 182 - 186
CRUD - delete
delete by name declared
usde delete method

lines 188 - 198
use port 3000
catch and finally to end the  async function run()

APPLICATION EXPECTANCIES

lines 204 - 216
creating an object constructor hotel

lines 25 - 43
app.get()
create async function to use crud methods
send back to postman using res.send()

lines 46 - 56
app.post()
creating object myhotel
inserting myhotel object to databse

lines 60 - 94
app.put()
to be honest, i have no idea what's going in in this method

lines 97 - 112
app.delete()
to be honest, i have no idea what's going in in this method
