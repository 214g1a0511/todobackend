function patchValidation(req, res, next) {
    console.log(req.body.status)
  if (typeof req.body.status !== "string") {
    console.log("type",typeof req.body.status);

    return res.send({ msg: "type must be string" });
  }
  // console.log(req.body.status)

  else if (req.body.status === "" || req.body.status === null) {
    console.log("null",typeof req.body.status);

    return res.send({ msg: "Status is undefinded or null" });
  } 
  else if(req.body.status!=="completed" && req.body.status!=="initiated" ){
    return res.send({"msg":"status must be either completed ot initiated "})
  }
  
  else{
    next();
  }
}

module.exports = { patchValidation };
