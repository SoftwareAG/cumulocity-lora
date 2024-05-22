package lora.ns.actility.common;

import java.security.SecureRandom;
import java.util.Random;
import lombok.experimental.UtilityClass;

@UtilityClass
public class RandomUtils {

    private static final String HEX_ALPHABET = "0123456789abcdef";
    private static final Random RANDOM = new SecureRandom();

    public static String generateRandomHexString(int length) {
        return RANDOM.ints(length, 0, HEX_ALPHABET.length())
            .mapToObj(HEX_ALPHABET::charAt)
            .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append)
            .toString();
    }
}
