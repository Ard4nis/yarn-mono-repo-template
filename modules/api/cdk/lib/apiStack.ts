import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class DummyAPIStack extends cdk.Stack {
    constructor(scope: Construct, id: string, properties?: cdk.StackProps) {
        super(scope, id, properties);

        // Create an S3 bucket
        const bucket = new s3.Bucket(this, 'DummyBucket', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        });

        // Create a Lambda function
        const handler = new lambda.Function(this, 'DummyHandler', {
            runtime: lambda.Runtime.NODEJS_18_X,
            code: lambda.Code.fromAsset('dist'),
            handler: 'index.handler',
            memorySize: 128,
            timeout: cdk.Duration.seconds(30),
            environment: {
                PROPS: JSON.stringify(properties),
                BUCKET_NAME: bucket.bucketName,
            },
        });

        // Grant the Lambda function read access to the bucket
        bucket.grantRead(handler);
    }
}
