//import * as bcrypt from 'bcrypt';
import { Request, Response } from "express";
import mongo from "../../config/db";

var ObjectId = require("mongodb").ObjectId;

export default class UserController {
  public createProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        var project = {
          name: req.body.name,
          owner: req.body.owner, // Owner user _id
          description: req.body.description,
          githubUrl: req.body.githubUrl,
          siteUrl: req.body.siteUrl,
          logoUrl: req.body.logoUrl,
        };

        mongo
          .db()
          .collection("projects")
          .insertOne(project)
          .then((result) => {
            res.status(200).send({
              success: true,
              data: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public updateProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        var project = {
          name: req.body.name,
          owner: new ObjectId(req.body.owner), // Owner user _id
          description: req.body.description,
          githubUrl: req.body.githubUrl,
          siteUrl: req.body.siteUrl,
          logoUrl: req.body.logoUrl,
          collabs: req.body.collabs,
          superCollabs: req.body.superCollabs,
        };
        mongo
          .db()
          .collection("projects")
          .updateOne({ _id: new ObjectId(req.params._id) }, { $set: project })
          .then((result) => {
            if (result.matchedCount === 0) {
              res.status(404).send({
                success: false,
                message: "Project not found",
              });
            } else if (result.modifiedCount === 0) {
              res.status(400).send({
                success: false,
                message: "Project not updated",
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
            res.status(500).send({
              success: false,
              message: err,
            });
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public deleteProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        mongo
          .db()
          .collection("projects")
          .deleteOne({
            _id: new ObjectId(req.params._id),
          })
          .then((result) => {
            if (result.deletedCount === 0) {
              res.status(404).send({
                success: false,
                message: "Project not found",
              });
            } else {
              res.status(200).send({
                success: true,
                data: result,
              });
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({
              success: false,
              message: err.message,
            });
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public getProject = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.log(err);
        mongo
          .db()
          .collection("projects")
          .findOne({
            _id: new ObjectId(req.params._id),
          })
          .then((result) => {
            if (result === null) {
              res.status(201).send({
                success: false,
                message: "Project not found",
              });
            } else {
              res.status(200).send({
                success: true,
                data: result,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message: err.message,
            });
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public getAllProjects = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);
        mongo
          .db()
          .collection("projects")
          .find()
          .toArray((err, result) => {
            if (err) {
              console.error(err);
              res.status(500).send({
                success: false,
                message: err.message,
              });
            } else {
              res.status(200).send({
                success: true,
                data: result,
              });
            }
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public createTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        var ticket = req.body;

        ticket = {
          ...ticket,
          project: new ObjectId(req.params._id),
          createdBy: new ObjectId(ticket.createdBy),
          deadline: new Date(ticket.deadline),
        };

        mongo
          .db()
          .collection("tickets")
          .insertOne(ticket)
          .then((result) => {
            res.status(200).send({
              success: true,
              data: result,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public updateTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);
        var ticket = req.body;
        ticket = {
          ...ticket,
          _id: new ObjectId(ticket._id),
          project: new ObjectId(ticket.projectId),
          createdBy: new ObjectId(ticket.createdBy),
          assignedTo: new ObjectId(ticket.assignedTo),
          deadline: new Date(ticket.deadline),
        };

        mongo
          .db()
          .collection("tickets")
          .updateOne({ _id: new ObjectId(ticket._id) }, { $set: ticket })
          .then((result) => {
            if (result.matchedCount === 0) {
              res.status(201).send({
                success: false,
                message: "Ticket not found",
              });
            } else if (result.modifiedCount === 0) {
              res.status(202).send({
                success: false,
                message: "Ticket not updated",
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
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public deleteTicket = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);
        mongo
          .db()
          .collection("tickets")
          .deleteOne({
            _id: new ObjectId(req.body._id),
          })
          .then((result) => {
            if (result.deletedCount === 0) {
              res.status(201).send({
                success: false,
                message: "Ticket not found",
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
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public getTickets = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);
        mongo
          .db()
          .collection("tickets")
          .find({
            project: new ObjectId(req.params._id),
          })
          .sort([["_id", -1]])
          .toArray((err, result) => {
            err && console.error(err);

            if (result.length === 0) {
              res.status(201).send({
                success: false,
                message: "Tickets not found",
              });
            } else {
              res.status(200).send({
                success: true,
                data: result,
              });
            }
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public addUser = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);

        mongo
          .db()
          .collection("projects")
          .updateOne(
            { _id: new ObjectId(req.params._id) },
            {
              $set: {
                collabs: req.body.collabs.map((_id) => new ObjectId(_id)),
                superCollabs: req.body.superCollabs.map(
                  (_id) => new ObjectId(_id)
                ),
              },
            }
          )
          .then((result) => {
            if (result.matchedCount === 0) {
              res.status(201).send({
                success: false,
                message: "Project not found",
              });
            } else if (result.modifiedCount === 0) {
              res.status(202).send({
                success: false,
                message: "Project not updated",
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
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };

  public removeUser = async (req: Request, res: Response): Promise<any> => {
    try {
      await mongo.connect((err) => {
        err && console.error(err);

        mongo
          .db()
          .collection("projects")
          .findOne({
            _id: new ObjectId(req.params._id),
          })
          .then((project) => {
            if (project) {
              project = {
                ...project,
                collabs: project.collabs.filter(
                  (_id) => _id.toString() !== req.body._id
                ),
                superCollabs: project.superCollabs.filter(
                  (_id) => _id.toString() !== req.body._id
                ),
              };
              mongo
                .db()
                .collection("projects")
                .updateOne(
                  { _id: new ObjectId(req.params._id) },
                  { $set: project }
                )
                .then((result) => {
                  if (result.matchedCount === 0) {
                    res.status(201).send({
                      success: false,
                      message: "Users not found",
                    });
                  } else if (result.modifiedCount === 0) {
                    res.status(202).send({
                      success: false,
                      message: "Users not updated",
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
            } else {
              res.status(201).send({
                success: false,
                message: "Project not found",
              });
            }
          });
      });
    } catch (e) {
      console.error(e);
      res.status(500).send({
        success: false,
        message: e.message,
      });
    }
  };
}
