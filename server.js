const app = required("./app");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`This app listening on port ${port}!`);
});
