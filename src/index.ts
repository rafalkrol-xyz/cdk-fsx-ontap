import { Stack, aws_fsx as fsx } from 'aws-cdk-lib';
import { ISubnet, SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export interface FsxOntapProps {
  /**
   * Name of the FSx for NetApp ONTAP Storage Virtual Machine (SVM).
   * Also used in resource ID creation, e.g. `${name}-resource-type`.
   * @default 'fsx-ontap'
   */
  readonly name?: string;
  /**
   * Path to mount the FSx for NetApp ONTAP instance.
   * @default '/mnt/fsx'
   */
  readonly mountPath?: string;
  /**
   * Name of the mount point.
   * @default '/datavol'
   */
  readonly mountName?: string;
  /**
   * Amazon FSx for NetApp ONTAP accepts either one or two subnets.
   * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html
   */
  readonly privateSubnets: ISubnet[];
  readonly fsxAdminPasswordSecretName: string;
  readonly fsxSecurityGroup: SecurityGroup;
}

export class FsxOntap extends Construct {
  readonly dnsName: string | undefined;
  readonly mountPath: string = '/mnt/fsx';
  readonly mountName: string = '/datavol';

  constructor(scope: Construct, id: string, props: FsxOntapProps) {
    super(scope, id);

    const name = props.name ?? 'fsx-ontap';

    if (props.mountName) {
      this.mountName = props.mountName;
    }

    if (props.mountPath) {
      this.mountPath = props.mountPath;
    }

    if (props.privateSubnets.length !== 2 && props.privateSubnets.length !== 1) {
      throw new Error('FSx for NetApp ONTAP accepts either one or two subnets.');
    }

    const fsxAdminPassword = Secret.fromSecretNameV2(
      this,
      `${name}-admin-password`,
      props.fsxAdminPasswordSecretName).secretValue.toString();

    const cfnFileSystem = new fsx.CfnFileSystem(this, `${name}-filesystem`, {
      fileSystemType: 'ONTAP',
      subnetIds: props.privateSubnets.map(s => s.subnetId),

      ontapConfiguration: {
        fsxAdminPassword,
        deploymentType: props.privateSubnets.length === 2 ? 'MULTI_AZ_1' : 'SINGLE_AZ_1',
        diskIopsConfiguration: {
          iops: 40000,
          mode: 'USER_PROVISIONED',
        },
        preferredSubnetId: props.privateSubnets[0].subnetId,
        routeTableIds: props.privateSubnets.map(s => s.routeTable.routeTableId),
        throughputCapacity: 256,
      },
      securityGroupIds: [props.fsxSecurityGroup.securityGroupId],
      storageCapacity: 10240,
      storageType: 'SSD',
    });

    const svm = new fsx.CfnStorageVirtualMachine(this, `${name}-svm`, {
      name,
      fileSystemId: cfnFileSystem.ref,
      rootVolumeSecurityStyle: 'MIXED',
    });

    new fsx.CfnVolume(this, `${name}-volume`, {
      name: `${name}-volume`,
      volumeType: 'ONTAP',
      ontapConfiguration: {
        junctionPath: this.mountName,
        securityStyle: 'MIXED',
        sizeInMegabytes: '102400',
        storageVirtualMachineId: svm.ref,
        storageEfficiencyEnabled: 'true',
      },
    });

    this.dnsName = `${svm.logicalId}.${cfnFileSystem.ref}.fsx.${Stack.of(this).region}.amazonaws.com`;
  }
}
