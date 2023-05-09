# ---------------------------------------------------------------------------- #
#                                  Build stage                                 #
# ---------------------------------------------------------------------------- #

FROM node:19.8.1-alpine3.17 AS build

# --------------------------------- Arguments -------------------------------- #

ARG GITHUB_TOKEN

# -------------------- Install and cache app dependencies -------------------- #

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN GITHUB_TOKEN=${GITHUB_TOKEN} npm ci

# --------------------------------- Build app -------------------------------- #

COPY . .
RUN npm run build


# ---------------------------------------------------------------------------- #
#                                  Final stage                                 #
# ---------------------------------------------------------------------------- #

FROM joseluisq/static-web-server:2.15.0 as release
COPY --from=build /app/dist /public
