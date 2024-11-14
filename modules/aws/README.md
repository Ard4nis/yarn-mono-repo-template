# AWS Module

This module contains all AWS CDK constructs and infrastructure code for the yarn monorepo project.

## Overview

The AWS module centralizes all cloud infrastructure definitions using AWS CDK (Cloud Development Kit). It provides reusable constructs that can be used across different services in the monorepo.

## Structure

```
aws/
├── docs/               # Diagrams of the full architecture
├── src/                # Source code
│   ├── constructs/     # Reusable CDK constructs
│   └── utils/          # Helper utilities
├── package.json        # Module dependencies
└── tsconfig.json       # TypeScript configuration
```

## Features

-   Reusable CDK constructs for common infrastructure patterns
-   Infrastructure as Code (IaC) using TypeScript
-   Type-safe infrastructure definitions
-   Best practices for AWS resource management

## Documentation

Refer to individual construct and stack documentation in the source code for detailed implementation information.

## CDK Bootstrap

CDK Bootstrap creates a required stack containing resources needed for CDK deployments. There are two approaches to bootstrap your AWS account:

### Option 1: Manual Bootstrap via CloudFormation

1. Generate bootstrap template:

```bash
cdk bootstrap --show-template > bootstrap-template.yaml
```

2. Create stack in AWS Console:
    - Navigate to CloudFormation service
    - Click "Create stack"
    - Choose "Upload a template file"
    - Upload your `bootstrap-template.yaml`
    - Follow the stack creation wizard

### Option 2: AWS CloudShell Bootstrap

1. Access AWS CloudShell:

    - Open AWS Console
    - Click CloudShell icon in top navigation bar

2. Run bootstrap command:

```bash
cdk bootstrap
```

### Notes

-   Bootstrap stack only needs to be created once per account/region
-   Contains required resources:
    -   S3 bucket for assets
    -   IAM roles for deployments
    -   ECR repositories
-   Must be completed before any `cdk deploy` commands

## GitHub OIDC Setup

After CDK Bootstrap, configure GitHub OIDC authentication:

1. Create CloudFormation template `github-oidc.yaml`:

```yaml
Parameters:
    GithubOrg:
        Type: String
        Default: Ard4nis
    FullRepoName:
        Type: String
        Default: Ard4nis/yarn-mono-repo-template

Resources:
    Role:
        Type: AWS::IAM::Role
        Properties:
            RoleName: GithubDeploymentRole
            ManagedPolicyArns: [arn:aws:iam::aws:policy/AdministratorAccess]
            AssumeRolePolicyDocument:
                Statement:
                    - Effect: Allow
                      Action: sts:AssumeRoleWithWebIdentity
                      Principal:
                          Federated: !Ref GithubOidc
                      Condition:
                          StringLike:
                              token.actions.githubusercontent.com:sub: !Sub repo:${FullRepoName}:*

    GithubOidc:
        Type: AWS::IAM::OIDCProvider
        Properties:
            Url: https://token.actions.githubusercontent.com
            ThumbprintList: [6938fd4d98bab03faadb97b34396831e3780aea1]
            ClientIdList:
                - !Sub https://github.com/${GithubOrg}
                - sts.amazonaws.com

Outputs:
    Role:
        Value: !GetAtt Role.Arn
```

2. Deploy template:

    - Navigate to CloudFormation
    - Create stack with new resources
    - Upload `github-oidc.yaml`
    - Set parameters for your org/repo
    - Note the output Role ARN

3. Use Role ARN in GitHub Actions:
    - Add as repository secret `AWS_ROLE_ARN`
    - Reference in workflow files

Note: Complete this setup after CDK Bootstrap and before running workflows.
