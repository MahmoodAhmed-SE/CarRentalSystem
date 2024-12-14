POST /register-user: username, password
response: User registered successfully.

POST /register-company: name, password
response: Company registered successfully.

POST /login-user: username, password
response: id, username

POST /login-company: username, password
response: id, name, cars

POST /add-car: company_id, name, price_per_day
response: Car added successfully


GET /list-available-cars
response: [
    {
        "_id": "-",
        "company_id": "--",
        "name": "-",
        "price": 0, 
        "rental_status": false, 
        "__v": 0
    },
]

GET /list-all-cars
response: [
    {
        "_id": "-",
        "company_id": "--",
        "name": "-",
        "price": 0, 
        "rental_status": false, // *and true*
    },
]

POST /list-company-cars: {
    axios: company_id

    response: [
        {
            "_id": "-",
            "company_id": "--",
            "name": "-",
            "price": 0, 
            "rental_status": false, // *and true*
        },
    ]
}


GET /car-details: {
    axios: car_id

    response: {
        "_id":"674de536cc8ec62c2c850d23",
        "company_id":"674de46bcc8ec62c2c850d1d",
        "name":"Toyota Camry",
        "rental_status":true,"__v":0,
        "price_per_day":12
    }
}

POST /reserve-car: {
    axios: user_id, car_id, cost, days

    response: "User or Car not found"
    response: "Car is already reserved."
    response: "Insufficient budget to complete the transaction."
    response: "Reservation has been made successfully!"
}

DELETE /remove-car: {
    axios: car_id,
    response: 
}


PUT /update-car: {
    axios: id, car_name, price_per_day
}

POST /user-rented-cars: {
    axios: user_id
    []
}