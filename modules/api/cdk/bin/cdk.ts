#!/usr/bin/env node
import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { DummyAPIStack } from '../lib/apiStack';

const app = new App();
new DummyAPIStack(app, 'DummyStack', {});
