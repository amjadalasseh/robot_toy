# Candidate Service

[![candidate-service Status](http://teamcity-1153349733.ap-southeast-2.elb.amazonaws.com/app/rest/builds/buildType:Moonshot_CandidateService_1Build/statusIcon "candidate-service")](http://teamcity-1153349733.ap-southeast-2.elb.amazonaws.com/viewType.html?buildTypeId=Moonshot_CandidateService_1Build)

Stores and retreives attributes of a candidate

## Usage
### Build & Test
    $ npm run build
### Build & Publish Docker
    $ ./scripts/docker.sh [version] candidate-service
### Package Elastic Beanstalk
    $ ./scripts/package.sh [version] [environment] [logstash-server]
### Deploy
    $ ./scripts/deploy.sh [version] [environment]
### Smoke Test
    $ npm run smoke
### Debug (dev environment)
    $ cp dev.env .env
    $ npm start