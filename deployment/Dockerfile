FROM node:18.17.1-bullseye as build

ARG NPM_LOG_LEVEL
ARG NPM_FORCE_INSTALL
ARG NODE_OPTIONS
ENV NODE_OPTIONS=${NODE_OPTIONS}

WORKDIR /code/9antraFormationFront/
COPY . /code/
# RUN ls -al /code/9antraFormationFront
RUN cd /code/9antraFormationFront/ && rm -rf node_modules && npm i ${NPM_FORCE_INSTALL} ${NPM_LOG_LEVEL} && npm run build-prod ${NPM_LOG_LEVEL}
FROM nginx:latest
COPY --from=build /code/9antraFormationFront/dist/*/ /usr/share/nginx/html
COPY --from=build /code/9antraFormationFront/deployment/nginx.conf /etc/nginx/conf.d/kantra-formation.conf
CMD nginx -g 'daemon off;'
EXPOSE 80