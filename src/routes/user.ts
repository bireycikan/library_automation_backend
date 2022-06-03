import express from "express";
const router = express.Router();

// postgresql client
import { pool } from "../db/postgresql/index.js"

/**
 * List of Users
 * GET /users
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from Users order by username asc");
    if (!result.rowCount) {
      return res.status(200).json({ message: "No users found in the database" })
    }

    const userData = result.rows;

    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})

/**
 * List specific User
 * GET /users/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "user id must be supplied in the route" });
    }

    const result = await pool.query("select * from Users where id = $1", [userId]);
    if (!result.rowCount) {
      return res.status(200).json({ message: "No user found with given id" })
    }

    const userData = result.rows[0];

    res.status(200).json(userData)
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})

/**
 * Create a new User
 * POST /users
 */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "name field is missing" })
    }

    const result = await pool.query("insert into Users (userName) values ($1)", [name]);

    res.status(200).json({ message: "User was added successfuly" })
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})


export default router;