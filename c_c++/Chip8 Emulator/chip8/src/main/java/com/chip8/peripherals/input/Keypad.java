package com.chip8.peripherals.input;

import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import javax.swing.JButton;
import javax.swing.JFrame;
import java.util.ArrayList;
import java.util.HashMap;


public class Keypad extends JFrame{

    AtomicInteger ai = new AtomicInteger(16);
    static Map<String, Byte> keyBindings  = new HashMap<String,Byte>(){{
        put("0",(byte) 0x0);
        put("1",(byte) 0x1);
        put("2",(byte) 0x2);
        put("3",(byte) 0x3);
        put("4",(byte) 0x4);
        put("5",(byte) 0x5);
        put("6",(byte) 0x6);
        put("7",(byte) 0x7);
        put("8",(byte) 0x8);
        put("9",(byte) 0x9);
        put("A",(byte) 0xA);
        put("B",(byte) 0xB);
        put("C",(byte) 0xC);
        put("D",(byte) 0xD);
        put("E",(byte) 0xE);
        put("F",(byte) 0xF);
    }};
    public List<JButton> getButtons(){
        List<JButton> buttons = new ArrayList<JButton>();
        String[][] keys = new String[][]{
            {"1","2","3","C"},
            {"4","5","6","D"},
            {"7","8","9","E"},
            {"A","0","B","F"}};
        for(String[] row : keys){
            for(String btn  : row){
                JButton inputButton = new JButton(btn);
                inputButton.addActionListener(e -> {
                    setAsyncKey(keyBindings.get(btn));
                });
                buttons.add(inputButton);
            }
        }
        return buttons;
    }

    public synchronized int getAsyncKey(){
        int key = ai.get();
        ai.set(16);
        return key;
    }

    public synchronized void setAsyncKey(byte c){
        ai.set(c);
    }

    public  byte getSyncKey(){
       while(ai.get() == 16);
       return (byte)ai.get();
    }
}