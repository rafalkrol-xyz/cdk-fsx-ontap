import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Vpc, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { FsxOntap } from '../src/index';

const mockApp = new App();
const stack = new Stack(mockApp);

const vpc = new Vpc(stack, 'VPC', {
  maxAzs: 2,
});
const ec2SecurityGroup = new SecurityGroup(stack, 'ec2SecurityGroup', {
  vpc,
  description: 'It can connect to FSx ONTAP',
  allowAllOutbound: true,
});
new FsxOntap(stack, 'FsxOntap', {
  vpc,
  securityGroupSource: ec2SecurityGroup,
});

const template = Template.fromStack(stack);
describe('FsxOntap in a basic setup (i.e. only default values)', () => {
  test('should create an AWS Secrets Manager secret', () => {
    template.resourceCountIs('AWS::SecretsManager::Secret', 1);
  });

  test('should create a Security Group', () => {
    template.resourceCountIs('AWS::EC2::SecurityGroup', 1);
  });

  test('should create an FSx ONTAP filesystem', () => {
    template.resourceCountIs('AWS::FSx::FileSystem', 1);
    template.hasResourceProperties('AWS::FSx::FileSystem', {
      FileSystemType: 'ONTAP',
    });
  });

  test('should create an FSx ONTAP Storage Virtual Machine', () => {
    template.resourceCountIs('AWS::FSx::StorageVirtualMachine', 1);
    template.hasResourceProperties('AWS::FSx::StorageVirtualMachine', {
      RootVolumeSecurityStyle: 'MIXED',
    });
  });

  test('should create an FSx ONTAP volume', () => {
    template.resourceCountIs('AWS::FSx::Volume', 1);
  });
});
