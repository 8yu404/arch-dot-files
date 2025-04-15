#!/usr/bin/env fish

# List of VSCode extensions to install

set -x NODE_EXTRA_CA_CERTS /etc/ssl/certs/ca-certificates.crt

set extensions alfredbirk.tailwind-documentation \
    bierner.emojisense \
    bierner.markdown-mermaid \
    bmalehorn.vscode-fish \
    bodil.file-browser \
    bradlc.vscode-tailwindcss \
    catppuccin.catppuccin-vsc \
    christian-kohler.path-intellisense \
    codezombiech.gitignore \
    davidanson.vscode-markdownlint \
    donjayamanne.githistory \
    dsznajder.es7-react-js-snippets \
    editorconfig.editorconfig \
    eg2.vscode-npm-script \
    esbenp.prettier-vscode \
    foxundermoon.shell-format \
    gencer.html-slim-scss-css-class-completion \
    gruntfuggly.todo-tree \
    irongeek.vscode-env \
    jebbs.plantuml \
    mechatroner.rainbow-csv \
    mhutchie.git-graph \
    ms-python.black-formatter \
    ms-python.isort \
    # ms-python.pylint \
    ms-python.python \
    ms-toolsai.jupyter \
    ms-vscode.hexeditor \
    njpwerner.autodocstring \
    oderwat.indent-rainbow \
    pkief.markdown-checkbox \
    pkief.material-icon-theme \
    redhat.vscode-xml \
    shardulm94.trailing-spaces \
    streetsidesoftware.code-spell-checker \
    styled-components.vscode-styled-components \
    stylelint.vscode-stylelint \
    tamasfe.even-better-toml \
    timonwong.shellcheck \
    wix.vscode-import-cost \
    yzhang.markdown-all-in-one \
    zainchen.json
    # golang.go \
    # zxh404.vscode-proto3 \
    # rust-lang.rust-analyzer \

# Install each extension
for extension in $extensions
    echo "Installing $extension..."
    code --install-extension $extension
end

echo "All extensions installed."
