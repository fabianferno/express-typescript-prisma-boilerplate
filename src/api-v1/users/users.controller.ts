//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import mongo from "../../config/db";

var ObjectId = require("mongodb").ObjectId;

export default class UserController {
  public upsertUser = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        var user = req.body;
        var updatedUser = {
          name: user.name,
          email: user.email,
          sub: user.sub,
        };
        mongo
          .db()
          .collection("users")
          .updateOne(
            { email: user.email },
            { $set: updatedUser },
            { upsert: true }
          )
          .then((result) => {
            mongo
              .db()
              .collection("users")
              .findOne(
                {
                  email: {
                    $eq: user.email, // Check if the email is the same
                  },
                },
                {
                  sort: { email: 1 }, // Sort by email ascending
                }
              )
              .then((userData) => {
                console.log(userData);
                if (userData === null) {
                  res.status(201).send({
                    success: false,
                    message: "User not found",
                  });
                } else {
                  res.status(200).send({
                    success: true,
                    data: userData,
                  });
                }
              });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  };

  public getUser = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        const result = mongo
          .db()
          .collection("users")
          .findOne(
            {
              email: {
                $eq: req.params.email, // Check if the email is the same
              },
            },
            {
              sort: { email: 1 }, // Sort by email ascending
            }
          )
          .then((result) => {
            if (result === null) {
              res.status(201).send({
                success: false,
                message: "User not found",
              });
            } else {
              res.status(200).send({
                success: true,
                data: result,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  };

  public getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      try {
        await mongo.connect((err) => {
          err && console.log(err);
          mongo
            .db()
            .collection("users")
            .find()
            .sort([["_id", -1]])
            .toArray((err, result) => {
              err && console.log(err);

              res.status(200).send({
                success: true,
                data: result,
              });
            });
        });
      } catch (e) {
        console.log(e);
        res.status(500).send({
          success: false,
          message: e,
        });
      }
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };

  public getProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        mongo
          .db()
          .collection("projects")
          .find({
            $or: [
              {
                owner: req.params._id,
              },
              {
                superCollabs: req.params._id,
              },
            ],
          })
          .sort([["_id", -1]])
          .toArray((err, result) => {
            err && console.log(err);
            var owned = result == null ? [] : result;
            mongo
              .db()
              .collection("projects")
              .find(
                {
                  collabs: req.params._id,
                },
                { sort: { _id: -1 } }
              )
              .toArray((err, result) => {
                err && console.log(err);

                var assigned = result == null ? [] : result;
                var projects = { owned: owned, assigned: assigned };

                if (
                  projects.owned.length === 0 &&
                  projects.assigned.length === 0
                ) {
                  res.status(201).send({
                    success: true,
                    message: "User has no projects",
                  });
                } else {
                  res.status(200).send({
                    success: true,
                    data: projects,
                  });
                }
              });
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.toString(),
      });
    }
  };
}
