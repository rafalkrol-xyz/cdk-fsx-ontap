import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Rafal Krol',
  authorAddress: 'ameotoko1+github@gmail.com',
  cdkVersion: '2.85.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-fsx-ontap',
  projenrcTs: true,
  repositoryUrl: 'git@github.com:rafalkrol-xyz/cdk-fsx-ontap.git',
  publishToPypi: {
    distName: 'cdk-fsx-ontap',
    module: 'cdk_fsx_ontap',
  },
  license: 'MIT',
  keywords: ['awscdk', 'aws', 'cdk', 'fsx', 'ontap'],
  gitignore: ['.DS_Store', 'cdk.out', 'cdk.context.json'],
});

project.synth();
