import { Router } from "express";
import { Request, Response } from "express";

const home: Router = Router();

// API Home Page
home.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    var title = `express-typescript-boilerplate`;
    res
      .status(200)
      .send(
        `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></head><body><div class="min-vh-100 m-md-0 m-5 d-md-flex align-items-center justify-content-center "><div class="col-md-2"><img height="200px" src="/images/logo.png" alt="" srcset=""></div><h3 class="mt-5 mt-md-0 text-md-left">Welcome to the<br><span class="fw-bold h1">${title}</span></h3></div><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script></body></html>`
      );
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
});

export default home;
