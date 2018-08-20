# Project UP

Do not forget to set db options in ./config/config.js

If you need to change count rows, change arguments in call of addPackage functions in ./custom-seed.js file

```
npm i
NODE_ENV=development
npm run db:init
npm run dev:start
```

# API

**book**

1. GET http://localhost:8000/book
2. POST http://localhost:8000/book
3. PATCH http://localhost:8000/book/{id}

**author**

1. GET http://localhost:8000/author
2. POST http://localhost:8000/author
3. PATCH http://localhost:8000/author/{id}

**store**

1. GET http://localhost:8000/store
2. POST http://localhost:8000/store
3. PATCH http://localhost:8000/store/{id}

**search**

1. GET http://localhost:8000/search?q={query}


### what else need

add logging

add tests
