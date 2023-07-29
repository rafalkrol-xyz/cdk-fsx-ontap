/**
 * This is a basic example of how to create an FSxOntap construct.
 * You can test it out by running the following commands from the root of this repository:
 *
 * ```bash
 * # build project
 * npx projen build
 * # synthesize
 * cdk synth --app lib/examples/basic.js
 * # diff
 * cdk diff --app lib/examples/basic.js
 * # deploy
 * cdk deploy --app lib/examples/basic.js
 * # destroy
 * cdk destroy --app lib/examples/basic.js
 * ```
 */
import * as cdk from 'aws-cdk-lib';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { FsxOntap } from '../index';

// create a CDK app
const app = new cdk.App();
// create a CDK stack through which the FSxOntap construct will be created,
// together with a VPC and a Security Group.
const stack = new cdk.Stack(app, 'FsxOntapStack', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});

// create a vpc with two private subnets
const vpc = new Vpc(stack, 'VPC', {
  maxAzs: 2,
});

// create a security group from which the connection to FSx ONTAP will be allowed
const ec2SecurityGroup = new SecurityGroup(stack, 'ec2SecurityGroup', {
  vpc,
  description: 'It can connect to FSx ONTAP',
  allowAllOutbound: true,
});

// create an FSxOntap construct
new FsxOntap(stack, 'FsxOntap', {
  vpc,
  securityGroupSource: ec2SecurityGroup,
});
