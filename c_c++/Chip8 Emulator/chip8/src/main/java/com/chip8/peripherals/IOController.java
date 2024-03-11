package com.chip8.peripherals;

import java.awt.Dimension;
import java.awt.GridLayout;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

import com.chip8.peripherals.input.Keypad;
import com.chip8.peripherals.output.Display;

public class IOController {
    Display display = new Display();;
    Keypad keys = new Keypad();
    public IOController(){
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("CHIP-8 Display");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.getContentPane().add(display);
            frame.pack();
            frame.setVisible(true);
        });

        SwingUtilities.invokeLater(() -> {
            JPanel keyPanel = new JPanel(new GridLayout(4, 4, 2, 2));
            keyPanel.setPreferredSize(new Dimension(260, 160));
            keys.getButtons().stream().forEach(btn -> keyPanel.add(btn));
            JFrame frame = new JFrame("CHIP-8 Keypad");
            frame.add(keyPanel);
            frame.pack();
            frame.setVisible(true);
        });
       
    }

    public Display getDisplay(){
        return display;
    }

    public Keypad getKeypad(){
        return keys;
    }
}
