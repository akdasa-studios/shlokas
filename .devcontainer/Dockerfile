FROM node:18.12

ARG USERNAME=user
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG GITHUB_TOKEN

# Install necessary apps
RUN apt-get update && apt-get install -y git fish sudo

# Create the user
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}
USER ${USERNAME}

# Copy files
WORKDIR /workspaces
COPY --chown=${USER_UID}:${USER_GID} . .
RUN npm install

# Invinite development loop
CMD ["/bin/bash", "-c", "while true; sleep 1000; done"]
