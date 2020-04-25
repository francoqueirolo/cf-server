# cf-server
npm install express-generator@4.16.0 -g

# run mongodb server
mongod --dbpath=data --bind_ip 127.0.0.1

# update field in mongo db
mongo
use conFusion
db.users.find().pretty()
db.users.update({"username": "franco"}, {$set: {"admin": true}})
