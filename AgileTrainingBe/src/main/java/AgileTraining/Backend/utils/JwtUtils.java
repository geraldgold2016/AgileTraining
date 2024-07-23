package AgileTraining.Backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemReader;

import java.io.*;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Properties;
import java.util.UUID;

public class JwtUtils {


/*
    private static PrivateKey getPrivateKey() {

        Properties props = new Properties();
        try {
            props.load(new FileInputStream(new File("key.properties")));
            String privateKeyURL = props.getProperty("private");
            PemReader reader = new PemReader(new FileReader(privateKeyURL));
            PemObject pemObject = reader.readPemObject();
            byte[] content = pemObject.getContent();

            PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(content);

            PrivateKey pk = KeyFactory.getInstance("RSA").generatePrivate(spec);

            return pk;

        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            e.printStackTrace();

            return null;
        }
    }
*/


    private static PrivateKey getPrivateKey() {
        Properties props = new Properties();
        try (InputStream is = JwtUtils.class.getClassLoader().getResourceAsStream("key.properties")) {
            if (is == null) {
                throw new RuntimeException("key.properties file not found in classpath");
            }
            props.load(is);
            String privateKeyURL = props.getProperty("private");
            try (InputStream keyStream = JwtUtils.class.getClassLoader().getResourceAsStream(privateKeyURL)) {
                if (keyStream == null) {
                    throw new RuntimeException(privateKeyURL + " file not found in classpath");
                }
                PemReader reader = new PemReader(new InputStreamReader(keyStream));
                PemObject pemObject = reader.readPemObject();
                byte[] content = pemObject.getContent();
                PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(content);
                return KeyFactory.getInstance("RSA").generatePrivate(spec);
            }
        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to load private key", e);
        }
    }




//    private static PublicKey getPublicKey() {
//
//        Properties props = new Properties();
//        try {
//    props.load(new FileInputStream(new File("key.properties")));
//
//
//
//            String publicURL = props.getProperty("public");
//
//            PemReader reader = new PemReader(new FileReader(publicURL));
//            X509EncodedKeySpec spec = new X509EncodedKeySpec(reader.readPemObject().getContent());
//            return KeyFactory.getInstance("RSA").generatePublic(spec);
//
//        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
//
//            e.printStackTrace();
//            return null;
//        }
//    }




    public static String generateToken(String username) {
        try {
            return Jwts.builder().claim("username", username)
                    .setId(UUID.randomUUID().toString()).setIssuedAt(Date.from(Instant.now()))
                    .setExpiration(Date.from(Instant.now().plus(1, ChronoUnit.HOURS))).signWith(getPrivateKey())
                    .compact();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate token", e);
        }
    }

    public static Jws<Claims> verifyToken(String jwt) {
        try {
            return Jwts.parserBuilder().setSigningKey(getPublicKey()).build().parseClaimsJws(jwt);
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify token", e);
        }
    }

        private static PublicKey getPublicKey() {
            Properties props = new Properties();
            try (InputStream is = JwtUtils.class.getClassLoader().getResourceAsStream("key.properties")) {
                if (is == null) {
                    throw new RuntimeException("key.properties file not found in classpath");
                }
                props.load(is);
                String publicURL = props.getProperty("public");
                try (InputStream keyStream = JwtUtils.class.getClassLoader().getResourceAsStream(publicURL)) {
                    if (keyStream == null) {
                        throw new RuntimeException(publicURL + " file not found in classpath");
                    }
                    PemReader reader = new PemReader(new InputStreamReader(keyStream));
                    X509EncodedKeySpec spec = new X509EncodedKeySpec(reader.readPemObject().getContent());
                    return KeyFactory.getInstance("RSA").generatePublic(spec);
                }
            } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
                throw new RuntimeException("Failed to load public key", e);
            }
        }



//    public static String generateToken(String username) {
//        try {
//            return Jwts.builder().claim("username", username)
//                    .setId(UUID.randomUUID().toString()).setIssuedAt(Date.from(Instant.now()))
//                    .setExpiration(Date.from(Instant.now().plus(1, ChronoUnit.HOURS))).signWith(getPrivateKey())
//                    .compact();
//        } catch (Exception e) {
//            return null;
//        }
//    }
//
//    public static Jws<Claims> verifyToken(String jwt) {
//
//        try {
//            return Jwts.parserBuilder().setSigningKey(getPublicKey()).build().parseClaimsJws(jwt);
//        } catch (Exception e) {
//            return null;
//        }
//    }


/*
    public static String genJWT(String nome, String cognome) {

        try {
            return Jwts.builder().claim("nome", nome).claim("cognome", cognome).setId(UUID.randomUUID().toString())
                    .setIssuedAt(Date.from(Instant.now()))
                    .setExpiration(Date.from(Instant.now().plus(1, ChronoUnit.HOURS))).signWith(getPrivateKey())
                    .compact();
        } catch (Exception e) {
            return null;
        }
    }

*/

}