function postValidation(req, res, next) {
//   console.log("request body", req.body);
//   console.log("title:", req.body.title);
//   console.log("status:", req.body.status);

  if (typeof req.body.title !== "string") {
    return res.send({ msg: "type must be string" });
  } else if (typeof req.body.status !== "string") {
    return res.send({ msg: "type must be string" });
  } else if (req.body.title === "" || req.body.title === null) {
    return res.send({ msg: "Title should not be empty" });
  } else if (
    req.body.status !== "completed" &&
    req.body.status !== "initiated"
  ) {
    return res.send({ msg: "Status must be either completed or initiated" });
  } else {
    next();
  }
}

module.exports = { postValidation };
