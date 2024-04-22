const express = require("express");
const router = express.Router();
const client = require("../database/mongoDB");
const userDB = client.db("usersDB");
const usersColl = userDB.collection("users");
const { ObjectId } = require("mongodb");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );

    router.get("/", async (req, res) => {
      const users = usersColl.find();
      const result = await users.toArray();
      res.send(result);
    });

    router.get("/user/:userID", async (req, res) => {
      const userId = req.params.userID;
      const singleUser = await usersColl.findOne({ _id: new ObjectId(userId) });
      res.json(singleUser);
    });

    router.post("/", async (req, res) => {
      const user = req.body;
      const result = await usersColl.insertOne(user);
      console.log("Data inserted successfully");
      const findNewUser = await usersColl.findOne({ _id: result.insertedId });
      res.send(findNewUser);
    });

    router.put("/user/:userID", async (req, res) => {
      const userId = req.params.userID;
      const updatedUser = req.body;
      const filter = { _id: new ObjectId(userId) };
      const options = { upsert: true };
      const updateUserInDB = {
        $set: {
          name: updatedUser.name,
          email: updatedUser.email,
        },
      };
      const result = await usersColl.updateOne(filter, updateUserInDB, options);
      res.send(result);
    });

    router.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const deleteResult = await usersColl.deleteOne({ _id: new ObjectId(id) });
      console.log(deleteResult);
      res.send(deleteResult);
    });
  } catch (err) {
    console.error(err);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run();

module.exports = router;
