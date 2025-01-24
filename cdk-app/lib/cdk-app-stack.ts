import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Construct } from 'constructs';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'CdkAppQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'CdkAppTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    const s3Key = new kms.Key(this, 'MyKey', {
      enableKeyRotation: true,
      rotationPeriod: Duration.days(180), // Default is 365 days
    });

    const bucket = new s3.Bucket(this, 'MyFirstBucket', {
    bucketName: "sushmametrojan23",
    versioned: true,
    encryption: s3.BucketEncryption.KMS,
    encryptionKey: s3Key,

    });
  }
}
