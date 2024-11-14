import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class DummyApiGateway extends Construct {
    public readonly api: apigateway.RestApi;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        // Create the API Gateway
        this.api = new apigateway.RestApi(this, 'DummyApi', {
            restApiName: 'Dummy API',
            description: 'A dummy API Gateway for testing purposes',
            deployOptions: {
                stageName: 'dev',
            },
        });

        // Add a dummy resource and method
        const dummyResource = this.api.root.addResource('dummy');
        dummyResource.addMethod(
            'GET',
            new apigateway.MockIntegration({
                integrationResponses: [
                    {
                        statusCode: '200',
                        responseTemplates: {
                            'application/json': JSON.stringify({
                                message: 'This is a dummy response',
                                timestamp: '$context.requestTime',
                            }),
                        },
                    },
                ],
                requestTemplates: {
                    'application/json': '{ "statusCode": 200 }',
                },
            }),
            {
                methodResponses: [
                    {
                        statusCode: '200',
                        responseModels: {
                            'application/json': apigateway.Model.EMPTY_MODEL,
                        },
                    },
                ],
            }
        );
    }
}
