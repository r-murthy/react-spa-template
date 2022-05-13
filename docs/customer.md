# Create customer

As a user

I want to create a customer record

### UI

GET /customers/new

### Notes

- Redirect to dummy /customers/<customer_id> on success
- Use REST endpoint - PUT /api/customer to get customer information

# Show customer

As a client

I want to get all details of a customer

So that I can seek any information regarding my customer

### UI

GET /customers/<customer_id>

### Notes

- Show details within editable form. User must be able to edit and update record
- Use REST endpoint /api/customers/<customer_id> to get the result

# List customers

As a user

I want to list all my customers

So that I can find customers I'm looking for

### UI

GET /customers

### Notes

- Create left sidepane with menu option Customers pointing to /customers
- Provide link to open /customers/<customer_id> for each entry
- Use REST endpoint - GET /api/customers

# Paginate customers

As a user

I want to list all my customers by pages

So that I can see small list of customers at a time

### UI

GET /customers?page=3

### Notes

- Make page size configurable
- Show page no, prev, next links on each page
- Use REST endpoint - GET /api/customers?page=1 to get the results
