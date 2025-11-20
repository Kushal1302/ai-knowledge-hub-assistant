# ---------------------------
# 1. Build Stage
# ---------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build
RUN npm prune --production


# ---------------------------
# 2. Runtime Stage (distroless)
# ---------------------------
FROM gcr.io/distroless/nodejs20

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Distroless expects ENTRY directly = JS file
CMD ["dist/index.js"]
