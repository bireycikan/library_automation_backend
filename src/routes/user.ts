import Joi from "joi";
import express from "express";
const router = express.Router();

// middlewares
import { checkUserID } from "../middlewares/checkUserId.js";

// postgresql client
import { pool } from "../db/postgresql/index.js"


// user schema definition
const userSchema = Joi.object({
  name: Joi.string().required()
})


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
router.get("/:id", checkUserID, async (req, res) => {
  try {
    const result = await pool.query("select * from Users where id = $1", [req.params.id]);
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
    try {
      const value = await userSchema.validateAsync(req.body);
      const result = await pool.query("insert into Users (userName) values ($1)", [value.name]);

      res.status(201).json({ message: "User was added successfuly" })
    } catch (err) {
      throw err;
    }
  } catch (err) {
    res.status(400).json({ message: "Something failed", details: err });
  }
})


export default router;