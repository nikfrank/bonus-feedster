Cani.core.boot({

    s3:{
	Bucket:'dre-images',
	initOn:['cognito: fb-login']
    },

    dynamo:{
	schemas:{
	    item:{
		fields:{usr:'S', url:'S'},
		table:{
		    arn:'arn:aws:dynamodb:eu-west-1:735148112467:table/rss',
		    hashKey:'usr', rangeKey:'url',
		    indices:[]
		}
	    }
	},
	awsConfigPack:{region: 'eu-west-1'},
	initOn:['cognito: fb-login']
    },
    cognito:{
	provider:'fb',
	IdentityPoolId:'eu-west-1:9846efee-7f6b-42b5-bccf-30ba52d889c4',
	AWSregion:'eu-west-1'
    },

    fb:{
	App:'1636311319942770'
    }
});

