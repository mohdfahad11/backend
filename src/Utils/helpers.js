export const httpResponse = (res) => {
  return (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else res.send(data)
  }
}