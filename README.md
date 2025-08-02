# TravelPals
A webapp that helps you plan your travels and take inspiration from others
travelpals-backend/
├── services/                        # All microservices
│   ├── auth-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   │
│   ├── trip-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── middleware/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   │
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   │
│   ├── media-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── .env
│   │
│   └── social-service/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── .env
│
├── gateway/
│   └── api-gateway/
│       ├── src/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── index.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── .env
│
├── libs/                            # Shared code
│   ├── types/
│   │   ├── trip.d.ts
│   │   ├── user.d.ts
│   │   └── auth.d.ts
│   ├── utils/
│   │   ├── verifyToken.ts
│   │   └── logger.ts
│   └── env/
│       └── loadEnv.ts
│
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.service
│   └── Dockerfile.gateway
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── lint.yml
│
├── .env.example                     # Env var template for all services
├── tsconfig.base.json              # Shared base TS config
├── package.json                    # Root-level scripts (optional)
└── README.md


// commands to run

// install microservice dependencies
npm init -y
npm install express dotenv @supabase/supabase-js
npm install -D typescript ts-node-dev @types/node @types/express       

// install db dependencies
npm install @supabase/supabase-js

