package AgileTraining.Backend.utils;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("file:${user.home}/Desktop/CredenzialiAWS/credenzialiAWS.properties")
public class S3Config 
{

    @Value("${aws.access.key.id}")
    private String accessKey;

    @Value("${aws.secret.access.key}")
    private String secretKey;

    @Value("${aws.region}")
    private String region;

    public void printAWSConfig() 
    {
        System.out.println("AWS Access Key: " + accessKey);
        System.out.println("AWS Secret Key: " + secretKey);
        System.out.println("AWS Region: " + region);
    }
    
    @Bean
    public AmazonS3 amazonS3() 
    {
    	//System.out.println("Path to properties file: " + System.getProperty("user.home") + "/Desktop/CredenzeialiAWS/credenzialiAWS.properties");
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder.standard()
                .withRegion(region) 
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }
}
