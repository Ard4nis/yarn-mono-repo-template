# Yarn Modern Monorepo Template

A template repository for creating TypeScript monorepos using Yarn workspaces with AWS infrastructure support. Configured with Plug'n'Play (PnP) and Zero-Installs for optimal performance and reproducible builds.

## Features

-   📦 Yarn Workspaces with PnP and Zero-Installs
-   🚀 VS Code fully configured for PnP development
-   💅 Prettier code formatting
-   🪝 Husky pre-commit hooks with ESLint, Prettier and Conventional Commits
-   ☁️ AWS CDK infrastructure setup
-   🎯 TypeScript support
-   ⚛️ React application template (with Vite)
-   🔧 Shared utilities module

## Project Structure

The monorepo contains the following packages:

-   `api/` - Backend API services
-   `aws/` - AWS CDK infrastructure code
-   `web/` - React frontend application (built with Vite)
-   `utils/` - Shared utilities

## Yarn Modern Features

-   **Plug'n'Play**: Faster, more reliable dependency resolution
-   **Zero-Installs**: Dependencies committed to git for instant setup
-   **VS Code Integration**: Pre-configured TypeScript, ESLint, and Prettier support
-   **.yarnrc.yml**: Optimized for modern Yarn features

## Commit Guidelines

This repo uses conventional commits. All commits must follow the pattern:

```
type(scope): description
```

Example: `feat(api): add new endpoint`

## Development

-   All code changes require tests
-   Follow TypeScript best practices
-   Use provided ESLint and Prettier configuration

## GitHub Repository Setup

After creating a new repository from this template, configure the following settings:

### Repository Features

1. Go to `Settings > General > Features`
    - [ ] Disable Issues (if using Jira/other tools)
    - [ ] Disable Projects (if using Jira/other tools)

### Pull Request Settings

1. Navigate to `Settings > General > Pull Requests`
    - [ ] Allow squash merging
    - [ ] Allow merge commits
    - [x] Allow rebase merging
    - [x] Automatically delete head branches

### Repository Rules

1. Go to `Settings > Rules > Rulesets > New rule`
2. Configure ruleset for `main` branch:
    - Target branches: Default
    - Name: "main"
    - Rules to enforce:
        - [x] Require a pull request
            - [x] Require approvals (1)
            - [x] Dismiss stale pull request approvals
        - [x] Require status checks
        - [x] Block force pushes
        - [x] Block deletions
    - Bypass: Repository admins only

Note: With rebase-only merges enabled, branch protection is simplified while maintaining security. Repository admins can bypass these rules by default.

### Security & Analysis

1. Navigate to `Settings > Security & analysis`
    - [x] Enable dependency graph
    - [x] Enable Dependabot alerts
    - [x] Enable Dependabot security updates
