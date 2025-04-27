# Website powered by Hugo

## Compile Locally

Download the prebuilt binary of Hugo generator in [github](https://github.com/gohugoio/hugo/releases/) and add `hugo` to your path.
If you use one package manager, you can also use follow [the official guide on installation](https://gohugo.io/installation/).

### Clone the main repository

```sh
git clone https://url/of/this/repo.git
cd your-repo
```

### Initialize and update submodules (if using theme submodules)
```
git submodule update --init --recursive
```
Install Dependencies
Theme Dependencies (if applicable)
If the site uses a theme stored as a submodule (e.g., in themes/):


### Ensure submodules are updated

```
git submodule update --remote "themes/hugo-academia"
```

### Basic production build (output to ./public/)

```
hugo --minify -e production
```

### Troubleshoot

- Theme Not Found:Ensure theme submodules are initialized: git submodule update --init.
- Version Mismatch:Check Hugo version with hugo version and match it with the project’s required version (see hugo.mod).
- Missing Assets:Clear the cache: hugo clean before rebuilding.
- For further issues, check the Hugo Documentation or open an issue in this repository.
- Let me know if you need to customize any part (e.g., specific theme setup, deployment targets, or additional commands)!

## Deploy to Github

follow [this official guide](https://gohugo.io/host-and-deploy/host-on-github-pages/). 
