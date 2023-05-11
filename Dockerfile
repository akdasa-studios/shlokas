# ---------------------------------------------------------------------------- #
#                                  Build stage                                 #
# ---------------------------------------------------------------------------- #

FROM node:19.8.1-alpine3.17 AS build

# --------------------------------- Arguments -------------------------------- #

ARG GITHUB_TOKEN
ARG ENVIRONMENT=prod

# -------------------- Install and cache app dependencies -------------------- #

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN echo "GT = ${GITHUB_TOKEN}" && GITHUB_TOKEN=${GITHUB_TOKEN} npm ci

# --------------------------------- Build app -------------------------------- #

COPY . .
RUN npm run build:${ENVIRONMENT}


# ---------------------------------------------------------------------------- #
#                                  Final stage                                 #
# ---------------------------------------------------------------------------- #

FROM joseluisq/static-web-server:2.15.0 as release
ENV SERVER_FALLBACK_PAGE=/public/index.html
COPY --from=build /app/dist /public
