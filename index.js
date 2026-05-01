const express = require("express");
const app = express();

app.use(express.json());

let users = [];


app.use((req, res, next) => {
  console.log("Request received at:", new Date().toLocaleTimeString());
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Server Running"});
});


app.get("/users", (req, res) => {
  res.json({ message: "All users", users: users });
});

app.get("/users", (req, res) => {
  res.json({ users });
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.json({ message: "Fields missing" });
  if (users.find(u => u.email === email)) return res.json({ message: "Email exists" });
  users.push({ name, email });
  res.json({ message: "User added" });
});

app.delete("/users/:id", (req, res) => {
  const index = req.params.id;
  if (!users[index]) return res.json({ message: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ message: "All fields required" });
  if (email === "admin@gmail.com" && password === "1234") return res.json({ message: "Login Success" });
  res.json({ message: "Invalid Credentials" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});