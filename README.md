POST /register-user: username, password, reserved_cars
response: User registered successfully.

POST /register-company: name, password
response: Company registered successfully.

POST /login-user: username, password
response: id, username, reserved_cars

POST /login-company: username, password
response: id, name, cars

POST /add-car: company_id, name, price
response: Car added successfully


