# CDK FSx ONTAP

## Overview

[An AWS Cloud Development Kit (CDK) construct](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html)
for deploying shared file storage using
[Amazon FSx for Netapp ONTAP](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/what-is-fsx-ontap.html).

## Acknowledgements

This project utilizes [projen](https://github.com/projen/projen) (_star it on GitHub_)
and was created by following [this guide by hayao-k](https://dev.to/aws-builders/a-beginner-s-guide-to-create-aws-cdk-construct-library-with-projen-5eh4)
(_like it on Dev.to_).

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### FsxOntap <a name="FsxOntap" id="cdk-fsx-ontap.FsxOntap"></a>

#### Initializers <a name="Initializers" id="cdk-fsx-ontap.FsxOntap.Initializer"></a>

```typescript
import { FsxOntap } from 'cdk-fsx-ontap'

new FsxOntap(scope: Construct, id: string, props: FsxOntapProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fsx-ontap.FsxOntap.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntap.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntap.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-fsx-ontap.FsxOntapProps">FsxOntapProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-fsx-ontap.FsxOntap.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-fsx-ontap.FsxOntap.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-fsx-ontap.FsxOntap.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-fsx-ontap.FsxOntapProps">FsxOntapProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-fsx-ontap.FsxOntap.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-fsx-ontap.FsxOntap.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-fsx-ontap.FsxOntap.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-fsx-ontap.FsxOntap.isConstruct"></a>

```typescript
import { FsxOntap } from 'cdk-fsx-ontap'

FsxOntap.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-fsx-ontap.FsxOntap.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fsx-ontap.FsxOntap.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-fsx-ontap.FsxOntap.property.mountName">mountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntap.property.mountPath">mountPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntap.property.dnsName">dnsName</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-fsx-ontap.FsxOntap.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `mountName`<sup>Required</sup> <a name="mountName" id="cdk-fsx-ontap.FsxOntap.property.mountName"></a>

```typescript
public readonly mountName: string;
```

- *Type:* string

---

##### `mountPath`<sup>Required</sup> <a name="mountPath" id="cdk-fsx-ontap.FsxOntap.property.mountPath"></a>

```typescript
public readonly mountPath: string;
```

- *Type:* string

---

##### `dnsName`<sup>Optional</sup> <a name="dnsName" id="cdk-fsx-ontap.FsxOntap.property.dnsName"></a>

```typescript
public readonly dnsName: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### FsxOntapProps <a name="FsxOntapProps" id="cdk-fsx-ontap.FsxOntapProps"></a>

#### Initializer <a name="Initializer" id="cdk-fsx-ontap.FsxOntapProps.Initializer"></a>

```typescript
import { FsxOntapProps } from 'cdk-fsx-ontap'

const fsxOntapProps: FsxOntapProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.fsxAdminPasswordSecretName">fsxAdminPasswordSecretName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.fsxSecurityGroup">fsxSecurityGroup</a></code> | <code>aws-cdk-lib.aws_ec2.SecurityGroup</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.privateSubnets">privateSubnets</a></code> | <code>aws-cdk-lib.aws_ec2.PrivateSubnet[]</code> | Amazon FSx for NetApp ONTAP accepts either one or two subnets. |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.mountName">mountName</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.mountPath">mountPath</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-fsx-ontap.FsxOntapProps.property.name">name</a></code> | <code>string</code> | *No description.* |

---

##### `fsxAdminPasswordSecretName`<sup>Required</sup> <a name="fsxAdminPasswordSecretName" id="cdk-fsx-ontap.FsxOntapProps.property.fsxAdminPasswordSecretName"></a>

```typescript
public readonly fsxAdminPasswordSecretName: string;
```

- *Type:* string

---

##### `fsxSecurityGroup`<sup>Required</sup> <a name="fsxSecurityGroup" id="cdk-fsx-ontap.FsxOntapProps.property.fsxSecurityGroup"></a>

```typescript
public readonly fsxSecurityGroup: SecurityGroup;
```

- *Type:* aws-cdk-lib.aws_ec2.SecurityGroup

---

##### `privateSubnets`<sup>Required</sup> <a name="privateSubnets" id="cdk-fsx-ontap.FsxOntapProps.property.privateSubnets"></a>

```typescript
public readonly privateSubnets: PrivateSubnet[];
```

- *Type:* aws-cdk-lib.aws_ec2.PrivateSubnet[]

Amazon FSx for NetApp ONTAP accepts either one or two subnets.

> [https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html](https://docs.aws.amazon.com/fsx/latest/ONTAPGuide/high-availability-AZ.html)

---

##### `mountName`<sup>Optional</sup> <a name="mountName" id="cdk-fsx-ontap.FsxOntapProps.property.mountName"></a>

```typescript
public readonly mountName: string;
```

- *Type:* string

---

##### `mountPath`<sup>Optional</sup> <a name="mountPath" id="cdk-fsx-ontap.FsxOntapProps.property.mountPath"></a>

```typescript
public readonly mountPath: string;
```

- *Type:* string

---

##### `name`<sup>Optional</sup> <a name="name" id="cdk-fsx-ontap.FsxOntapProps.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

---


