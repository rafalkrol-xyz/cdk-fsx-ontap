import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Rafal Krol',
  authorAddress: 'ameotoko1+github@gmail.com',
  homepage: 'https://rafalkrol.xyz',
  repositoryUrl: 'https://github.com/rafalkrol-xyz/cdk-fsx-ontap',
  majorVersion: 1,
  cdkVersion: '2.85.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'cdk-fsx-ontap',
  projenrcTs: true,
  publishToPypi: {
    distName: 'rafalkrol-xyz.cdk-fsx-ontap',
    module: 'rafalkrol-xyz.cdk_fsx_ontap',
  },
  license: 'MIT',
  keywords: ['awscdk', 'aws', 'cdk', 'fsx', 'ontap'],
  gitignore: ['.DS_Store', 'cdk.out', 'cdk.context.json'],
});

project.synth();
