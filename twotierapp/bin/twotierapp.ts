#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TwotierappStack } from '../lib/twotierapp-stack';

const app = new cdk.App();
new TwotierappStack(app, 'TwotierappStack');
