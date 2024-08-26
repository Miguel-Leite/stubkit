# **StubKit**

**StubKit** is a command-line tool (CLI) for generating code files from predefined or custom templates. With support for different frameworks like NestJS and the ability to add your own templates, StubKit makes it easy to quickly create files based on design patterns.

## **Features**

- Support for predefined templates for popular frameworks like NestJS.
- Possibility to add and use custom templates.
- Generation of code files based on templates and parameters provided by the user.
- Simple and intuitive CLI.

## **Installation**

### **1. Install StubKit**

You can install StubKit globally using npm:

```bash
npm install -g stubkit
```

Or, if you prefer, clone the repository and install locally:

```bash

git clone https://github.com/Miguel-Leite/stubkit.git
cd stubkit
npm install
npm link

```

## Available and Unavailable Templates

This section lists available and unavailable templates in StubKit for several popular technologies. The tool offers support for automatic file creation based on predefined templates, facilitating application development by following consistent standards.

- **NestJS**:

  - [x] Controller
  - [ ] Service
  - [ ] Module
  - [ ] Middleware
  - [ ] DTO (Data Transfer Object)
  - [ ] Guard
  - [ ] Pipe

- **Express**:

  - [ ] Controller
  - [ ] Middleware
  - [ ] Router
  - [ ] Service

- **React**:

  - [ ] Component
  - [ ] Hook
  - [ ] Context
  - [ ] Reducer

- **Angular**:

  - [ ] Component
  - [ ] Service
  - [ ] Module
  - [ ] Directive
  - [ ] Pipe

- **Vue.js**:

  - [ ] Component
  - [ ] Vuex Store
  - [ ] Directive

- **Laravel**:

  - [ ] Controller
  - [ ] Model
  - [ ] Migration
  - [ ] Seeder

- **Django**:
  - [ ] Model
  - [ ] View
  - [ ] Template

## **Use**

### **1. Create a New File**

To create a new file based on a template, use the create command:

```bash
stubkit create <type> <name> [framework]
```

- **< type>**: The type of file to be created (e.g. controller, service).
- **< name>**: The name of the file to be created.
- **[framework] (optional)\***: The framework for which the template should be used (e.g. nestjs). If not specified, the default is default.

#### Example:

```bash

stubkit create controller User nestjs

stubkit create controller User nestjs --path ./src/controllers/

```

This will create a new controller file called User.controller.ts using the template specific to NestJS.

### **2. Add a New Template**

To add a new custom template, use the add-template command:

```bash
stubkit add-template <type> <name>
```

- **< type>**: The type of file to be created (e.g. controller, service).
- **< name>**: The name of the file to be created.

#### Example:

```bash
stubkit add-template <type> <name>
```

## **Settings**

### **Environment Variables**

You can configure the path of custom templates using the USER_TEMPLATES_PATH environment variable.

```bash
export USER_TEMPLATES_PATH=./path/to/your/templates/
```

## **Contribution**

If you want to contribute to StubKit, follow these steps:

1. Fork the repository.
2. Create a branch for your feature or fix (git checkout -b feature/nova-feature).
3. Make your changes and commit (git commit -am 'Add new feature').
4. Push it to the branch (git push origin feature/nova-feature).
   Open a pull request.

Make sure to follow the coding standard and add tests for any new functionality or fixes.

## **License**

This project is licensed under the MIT License.
