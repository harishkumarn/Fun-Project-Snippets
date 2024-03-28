package com.chip8.peripherals.output;

import com.chip8.engine.Processor;
import javax.swing.*;
import java.awt.*;

public class Display extends JPanel{
    private int WIDTH = 64;
    private int HEIGHT = 32;
    private int SCALE = 10;
    private byte[][] pixels  = new byte[WIDTH][HEIGHT];
    public static int spriteStart = 0x100;

    public Display(){
        setPreferredSize(new Dimension(WIDTH * SCALE, HEIGHT * SCALE));
    }

    private static int[][] spriteData = new int[][]{
            {0xF0, 0x90, 0x90, 0x90, 0xF0},
            {0x20, 0x60, 0x20, 0x20, 0x70},
            {0xF0, 0x10, 0xF0, 0x80, 0xF0},
            {0xF0, 0x10, 0xF0, 0x10, 0xF0},
            {0x90, 0x90, 0xF0, 0x10, 0x10},
            {0xF0, 0x80, 0xF0, 0x10, 0xF0},
            {0xF0, 0x80, 0xF0, 0x90, 0xF0},
            {0xF0, 0x10, 0x20, 0x40, 0x40},
            {0xF0, 0x90, 0xF0, 0x90, 0xF0},
            {0xF0, 0x90, 0xF0, 0x10, 0xF0},
            {0xF0, 0x90, 0xF0, 0x90, 0x90},
            {0xE0, 0x90, 0xE0, 0x90, 0xE0},
            {0xF0, 0x80, 0x80, 0x80, 0xF0},
            {0xE0, 0x90, 0x90, 0x90, 0xE0},
            {0xF0, 0x80, 0xF0, 0x80, 0xF0},
            {0xF0, 0x80, 0xF0, 0x80, 0x80} 
    };

    public static int getSpriteAddress(int num){
        return spriteStart + num * 5;
    }

    public void initSpriteData(Processor chip8){
        int c = 0 ;
        for(int i = 0 ; i < 16;++i){
            for(int j = 0 ; j < 5;++j){
                chip8.memory[spriteStart + c] = spriteData[i][j];
                c++;
            }
        }
    }
    private void clearPixels(){
        for(int i = 0; i < WIDTH;++i ){
            for(int j = 0; j < HEIGHT;++j){
                pixels[i][j] = 0;
            }
        }
    }
    public void clearDisplay(){
        clearPixels();
        repaint();
    }

    public int setSprite(int x, int y, int[] bytes){
        int flag = 0;
        for(int i = 0 ; i < bytes.length;++i){
            for(int j = 0 ; j < 8;++j){
                int x_pos = (x+7-j) % WIDTH;
                int y_pos = (y+i) % HEIGHT;
                if(pixels[x_pos][y_pos] == 1 && (bytes[i] & (1 << j)) >= 1){
                    flag = 1;
                }
                pixels[x_pos][y_pos] ^= ( (bytes[i] & (1 << j)) >= 1) ? 1 : 0;
            }
        }
        repaint();
        return flag;
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        for (int x = 0; x < WIDTH; x++) {
            for (int y = 0; y < HEIGHT; y++) {
                if (pixels[x][y] == 1) {
                    g.setColor(Color.WHITE);
                } else {
                    g.setColor(Color.BLACK);
                }
                g.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
            }
        }
    }
}