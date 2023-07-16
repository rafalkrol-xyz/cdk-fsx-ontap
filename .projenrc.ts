import { awscdk } from 'projen';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Rafal Krol',
  authorAddress: 'ameotoko1+github@gmail.com',
  cdkVersion: '2.1.0',
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

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

project.synth();
