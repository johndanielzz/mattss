@echo off
cd /d "f:\lkjhgc\GOOGLE MAP JOB FINDER"
node -e "fetch('http://localhost:3000/api/auth/register', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'Test',email:'test-' + Date.now() + '@example.com',password:'testpass123'})}).then(r => r.text().then(b => {console.log('Status:', r.status);console.log('Body:', b)})).catch(e => console.log('Error:', e.message))" > test-output.txt 2>&1
type test-output.txt