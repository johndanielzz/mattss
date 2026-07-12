const res = await fetch("http://localhost:3000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test-" + Date.now() + "@example.com",
    password: "testpass123"
  })
});

const body = await res.text();
console.log("STATUS:", res.status);
console.log("BODY:", body);