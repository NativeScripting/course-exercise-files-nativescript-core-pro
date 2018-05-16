import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Express, Router, Request, Response } from "express";
import { PtLoginModel, PtAuthToken } from "./app/models/domain";
import { newGuid } from "./app/util/guid";

const app: Express = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hi there, welcome to NativeScripting!" });
});

router.post("/auth", (req: Request, res: Response) => {
  if (req.body) {
    if (req.body.loginModel) {
      const loginModel = <PtLoginModel>req.body.loginModel;

      const foundUser = loginModel.password === "nuvious";

      if (foundUser) {
        const now = new Date();
        const expireDate = new Date(now.setFullYear(now.getFullYear() + 1));
        const authToken: PtAuthToken = {
          dateExpires: expireDate,
          access_token: newGuid()
        };
        res.json({
          user: foundUser,
          authToken: authToken
        });
      } else {
        res.status(401);
        res.json(null);
      }
    } else {
      res.status(401);
      res.json(null);
    }
  } else {
    res.status(401);
    res.json(null);
  }
});

// RPS API functions
router.get("/backlog", (req: Request, res: Response) => {
  //Return backlog items
});

app.use("/api", router);

const httpServer = http.createServer(app);
const port = 8080;

httpServer.listen(port, err => {
  if (err) {
    console.error(err);
  }
});
