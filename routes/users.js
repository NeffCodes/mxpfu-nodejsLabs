const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users},null,4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email;
  const user = users.filter(u => u.email === email)

  if(!user.length) res.send('Could not find user')
  res.send(user)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  const new_user = req.query
  users.push(new_user)
  res.send(`New user ${new_user.firstName} ${new_user.lastName} added.`)
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  const email = req.params.email

  //sort users
  const sorted_users = users.sort( (a,b) => {
    if(a.email === email) return -1
    return 1
  });

  //remove user that matches
  let user = null;
  if(sorted_users[0].email === email){
    user = sorted_users.shift()
  }
  if(!user) res.send(`Could not find user with address ${email}`)

  //update user
  new_user = { ...user,...req.query}

  //add to users list
  users.push(new_user)
  res.send(`User with email ${email} updated.`)
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email

  //sort users
  const sorted_users = users.sort( (a,b) => {
    if(a.email === email) return -1
    return 1
  });

  //remove user that matches
  let user = null;
  if(sorted_users[0].email === email){
    user = sorted_users.shift()
  }

  if(!user) res.send(`Could not find user with address ${email}`)
  res.send(`Removed user with email ${email}`)
});

module.exports=router;
