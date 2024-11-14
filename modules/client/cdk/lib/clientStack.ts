import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class ClientStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string) {
        super(scope, id, props);

        // Create an S3 bucket for website hosting
        const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
            bucketName: 'my-static-website-bucket',
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY, // NOT recommended for production
        });

        // Create CloudFront distribution
        const distribution = new cloudfront.Distribution(this, 'WebsiteDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(websiteBucket),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
            defaultRootObject: 'index.html',
        });

        // Deploy site contents to S3
        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
            sources: [s3deploy.Source.asset('../build')], // Adjust this path to your build output
            destinationBucket: websiteBucket,
            distribution,
            distributionPaths: ['/*'],
        });

        // Output the CloudFront URL
        new cdk.CfnOutput(this, 'DistributionUrl', {
            value: distribution.distributionDomainName,
            description: 'Website URL',
        });
    }
}
