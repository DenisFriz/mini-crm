# MINI-CRM API Project

## 🚀 Getting Started

Clone the project

```bash
git clone https://github.com/DenisFriz/mini-crm.git
```

Change directory

```bash
cd mini-crm/
```

Install dependencies

```bash
npm install
```

To start the project, run:

```bash
npm run docker:up
```

To run backend logic tests:

```bash
npm run backend:tests
```

After startup, open:

Frontend:

```bash
http://localhost:3000/leads
```

Swagger:

```bash
http://localhost:3001/api/docs
```

📌 API Testing Examples
GET

```bash
http://localhost:3001/api/leads
```

```bash
Response:
{
"data": [],
"total": 0,
"page": 1,
"limit": 10
}
```

POST

```bash
http://localhost:3001/api/leads
```

Response:

```bash
{
"name": "John Doe",
"email": "john@example.com
",
"company": "Acme Inc.",
"status": "NEW",
"value": 1000,
"notes": "Important client"
}
```

POST

```bash
http://localhost:3001/api/leads/{id}/comments
```

Response:

```bash
{
"leadId": "69dfb7ab96d836a9430653b3",
"text": "ytuuyttuytuy",
"_id": "69dfb81b96d836a9430653b4",
"createdAt": "2026-04-15T16:08:59.034Z",
"__v": 0
}
```
