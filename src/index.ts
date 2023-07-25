import { Stack, aws_fsx as fsx, CfnOutput } from 'aws-cdk-lib';
import { SecurityGroup, Vpc, Peer, Port } from 'aws-cdk-lib/aws-ec2';
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
   * VPC in which the FSx for NetApp ONTAP instance will be created.
   */
  readonly vpc: Vpc;
  readonly securityGroupSource: SecurityGroup;
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

    const vpc = props.vpc;
    /**
    * Amazon FSx for NetApp ONTAP accepts either one or two subnets.
    * NB, this construct requires them to be private ones.
    * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html
    */
    const privateSubnetsForFsx = vpc.privateSubnets.slice(0, 2);

    if (privateSubnetsForFsx.length !== 2 && privateSubnetsForFsx.length !== 1) {
      throw new Error('FSx for NetApp ONTAP accepts either one or two subnets. Moreover, they must be private subnets!');
    }

    // Create a random password for the FSx for NetApp ONTAP admin user.
    const fsxAdminPassword = new Secret(this, `${name}`, {
      generateSecretString: {
        excludePunctuation: true,
      },
    });

    const fsxSecurityGroup = new SecurityGroup(this, `${name}-fsx-security-group`, {
      vpc,
      description: 'The security group for the FSx for NetApp ONTAP service',
      allowAllOutbound: true,
    });
    this.addIngressToFsxFromSourceSg(props.securityGroupSource, fsxSecurityGroup);

    const cfnFileSystem = new fsx.CfnFileSystem(this, `${name}-filesystem`, {
      fileSystemType: 'ONTAP',
      subnetIds: privateSubnetsForFsx.map(s => s.subnetId),

      ontapConfiguration: {
        fsxAdminPassword: fsxAdminPassword.secretValue.toString(),
        deploymentType: privateSubnetsForFsx.length === 2 ? 'MULTI_AZ_1' : 'SINGLE_AZ_1',
        diskIopsConfiguration: {
          iops: 40000,
          mode: 'USER_PROVISIONED',
        },
        preferredSubnetId: privateSubnetsForFsx[0].subnetId,
        routeTableIds: privateSubnetsForFsx.map(s => s.routeTable.routeTableId),
        throughputCapacity: 256,
      },
      securityGroupIds: [fsxSecurityGroup.securityGroupId],
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

  private replaceDashesWithUnderscores(str: string): string {
    return str.replace(/-/g, '_');
  }

  private removeNonAlphanumericOrUnderscores(str: string): string {
    return str.replace(/[^a-zA-Z0-9_]/g, '');
  }

  private trimStringAt203rdCharacter(str: string): string {
    return str.substring(0, 202);
  }

  /**
  * Configure Security Group for FsX
  * @see https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/limit-access-security-groups.html
  */
  private addIngressToFsxFromSourceSg(securityGroupSource: SecurityGroup, fsxSecurityGroup: SecurityGroup): void {
    fsxSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(2049), 'allow 2049 inbound from anywhere');
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.icmpPing());
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(22));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(111));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(135));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(139));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(161));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(162));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(443));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(445));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(635));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(749));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(2049));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(3260));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(4045));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(4046));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(11104));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.tcp(11105));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(111));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(135));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(137));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(139));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(161));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(162));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(635));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(2049));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(4045));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(4046));
    fsxSecurityGroup.addIngressRule(securityGroupSource, Port.udp(4049));
  }
}
