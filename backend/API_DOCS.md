## Users Search – `GET /api/users`

**Query params**
- `q` (string, optional): free-text query, matches name, skills, company, branch (case-insensitive, partial).
- `role` (STUDENT | ALUMNI | ALL, default ALL)
- `page` (number, default 1)
- `limit` (number, default 10)
- `sort` (string, one of `name_asc`, `created_desc`, `created_asc`)

**Example request**

`GET /api/users?q=react&role=ALUMNI&page=1&limit=10&sort=name_asc`

**Example response**

```json
{
  "items": [
    {
      "id": "65f9...",
      "name": "Jane Doe",
      "role": "ALUMNI",
      "profilePic": "https://...",
      "graduationYear": 2020,
      "branch": "CSE",
      "degree": "B.Tech",
      "company": "Google",
      "position": "SDE",
      "connections": ["..."]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

## Connection Requests

### Send request – `POST /api/connections`

Body:

```json
{ "toUserId": "<targetUserId>" }
```

Response:

```json
{
  "request": {
    "id": "abc123",
    "fromUserId": "...",
    "toUserId": "...",
    "status": "PENDING"
  }
}
```

### Accept – `POST /api/connections/:id/accept`
### Decline – `POST /api/connections/:id/decline`

### Incoming – `GET /api/connections/incoming`
### Sent – `GET /api/connections/sent`

## Messaging (REST polling)

### Get/create direct thread – `POST /api/chat/direct`

Body:

```json
{ "otherUserId": "<userId>" }
```

Response:

```json
{ "id": "threadId", "title": "Direct:..." }
```

### List messages – `GET /api/chat/:threadId/messages`

### Create message – `POST /api/chat/:threadId/messages`

Body:

```json
{ "content": "Hello!" }
```

## Posts

### List posts – `GET /posts`

Response items include:

```json
{
  "id": "...",
  "author": { "id": "...", "name": "John" },
  "content": "Post body",
  "likes": 2,
  "comments": [
    {
      "id": "...",
      "author": { "id": "...", "name": "Jane" },
      "content": "Nice post!"
    }
  ]
}
```

### Like post – `POST /posts/:id/like`

### Comment on post – `POST /posts/:id/comment`

Body:

```json
{ "content": "Nice!" }
```

## Example JWT fetch patterns from Next.js

Using localStorage token (as in this project):

```js
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const res = await fetch(`${API_BASE}/api/users?q=react`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Using httpOnly cookie instead:

```js
const res = await fetch(`${API_BASE}/api/users?q=react`, {
  credentials: "include", // cookie sent automatically
});
```


