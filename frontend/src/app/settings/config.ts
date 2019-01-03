// the configuration of the backend service.
export interface Config {
    AWSRegion: string,
    dynamoDBURL: string,
    tableName: string
}
