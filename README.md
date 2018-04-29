# es6-general-cli

A simple CLI for scaffolding Web projects.

一个用于创建Web项目的简单脚手架。（包括但不限于 原生ES6 | React | Vue ）

### Installation(安装)

Prerequisites(先决条件): [Node.js](https://nodejs.org/en/) (>=6.x) , npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g es6-general-cli
```

### Usage(使用)

``` bash
$ es6 init <template-name> <project-name>
$ es6 init <模板名称> <项目名称>
```

Example:

``` bash
$ es6 init react my-project
```
### Custom Templates(客户模板)

It's unlikely to make everyone happy with the official templates. You can simply fork an official template and then use it via `es6-general-cli` with:

如果您不满意官方的模板，您只需要fork一个官方的模板，然后通过以下方式使用：
``` bash
es6 init username/repo my-project
```

Where `username/repo` is the GitHub repo shorthand for your fork.

此处 `username/repo` 就是您fork的 GitHub 仓库地址.


The shorthand repo notation is passed to [download-git-repo](https://github.com/flipxfx/download-git-repo) so you can also use things like `bitbucket:username/repo` for a Bitbucket repo and `username/repo#branch` for tags or branches.

If you would like to download from a private repository use the `--clone` flag and the cli will use `git clone` so your SSH keys are used.

仓库地址是通过 [download-git-repo](https://github.com/flipxfx/download-git-repo) 来解析，所以您也可以使用其他仓库地址。例如使用Bitbucket仓库 `bitbucket:username/repo`，或者使用对应不同标签/分支的仓库 `username/repo#branch`.

如果您想下载一个私有的仓库，请使用 `--clone` 标记。那么您的此脚手架将通过 `git clone` 去下载 SSH Keys 对应的模板。

### Local Templates(本地模板)

Instead of a GitHub repo, you can also use a template on your local file system:

除了GitHub仓库，您也可以使用您本地的模板：

``` bash
es6 init ~/fs/path/to-custom-template my-project
```

### Writing Custom Templates from Scratch(编写客户模板的标准)

- A template repo **must** have a `template` directory that holds the template files.

     一个模板仓库 **必须** 有一个 `template` 目录， 包含所有模板文件。

- A template repo **may** have a `bootstrap.js` file for the template. It can contain the following fields:
    
    一个模板仓库 **必须** 有一个 `bootstrap.js` 文件，它可以设置以下方面的内容：

  - `prompts`: used to collect user options data;
     
     `prompts`: 用于采集使用者相关配置的提示;

  - `filters`: used to conditional filter files to render.
     
     `filters`: 用于设置初始化时的过滤条件;
  
  - `ignore`: used to ignore files to render.
     
     `ignore`: 用于设置初始化时需要忽略的文件;

  - `completeMessage`: the message to be displayed to the user when the template has been generated. You can include custom instruction here.

     `completeMessage`: 当模板被创建时展示给使用者的消息，您也可以在此处添加客户模板的相关指示、介绍。
     
#### prompts(提示)

The `prompts` field in the metadata file should be an object hash containing prompts for the user. For each entry, the key is the variable name and the value is an [Inquirer.js question object](https://github.com/SBoudrias/Inquirer.js/#question). Example:

``` json
{
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    }
  }
}
```

After all prompts are finished, all files inside `template` will be rendered using [ejs](https://github.com/mde/ejs), with the prompt results as the data.

##### Conditional Prompts

A prompt can be made conditional by adding a `when` field, which should be a JavaScript expression evaluated with data collected from previous prompts. For example:

``` json
{
  "prompts": {
    "lint": {
      "type": "confirm",
      "message": "Use a linter?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick a lint config",
      "choices": [
        "standard",
        "airbnb",
        "none"
      ]
    }
  }
}
```

The prompt for `lintConfig` will only be triggered when the user answered yes to the `lint` prompt.