// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class HelloWorld {
    public static void main(String[] args) {
        String s = "abcdef";
        byte[] bytes = s.getBytes();
        char a,b,c,d;
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        StringBuilder base64 = new StringBuilder();
        for(int i = 0 ; i < bytes.length;i += 3){
            int mask = 0;
            mask |= bytes[i];
            mask <<= 8;
            mask |= bytes[i+1];
            mask <<= 8;
            mask |= bytes[i+2];
            
            d = charset.charAt(mask & 63);
            mask >>= 6;
            c = charset.charAt(mask & 63);
            mask >>= 6;
            b = charset.charAt(mask & 63);
            mask >>= 6;
            a = charset.charAt(mask & 63);
            base64.append(a).append(b).append(c).append(d);
            
        }
        System.out.println(base64);
    }
}
