#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { ClientStack } from '../lib/clientStack';

const app = new App();
new ClientStack(app, 'ClientStack');
