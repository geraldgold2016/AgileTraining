package AgileTraining.Backend.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

public class CryptoUtils {

    private static final String SECRET_KEY = "your-secret-key"; // Usa una chiave sicura

    // Decrittografa una password crittografata
    public static String decrypt(String encryptedText) {
        try {
            System.out.println("Encrypted Text: " + encryptedText); // Log del testo criptato
            byte[] decodedKey = SECRET_KEY.getBytes("UTF-8");
            SecretKeySpec secretKey = new SecretKeySpec(decodedKey, "AES");
            Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            String decryptedText = new String(decryptedBytes, "UTF-8");
            System.out.println("Decrypted Text: " + decryptedText); // Log del testo decriptato
            return decryptedText;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error while decrypting");
        }
    }
    
}
