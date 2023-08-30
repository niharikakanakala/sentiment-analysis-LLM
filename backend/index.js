const app = require('./app'); // Import the app instance

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
